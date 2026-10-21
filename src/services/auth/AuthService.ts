import { SupabaseService } from '../SupabaseService';
import { User, type UserRole } from '../../domain/User';

const LOCAL_USER_STORAGE_KEY = 'cineplus_active_user_session';
const REGISTERED_USERS_KEY = 'cineplus_registered_users_db';

export interface DemoAccountPreset {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  description: string;
}

export const DEMO_PRESETS: DemoAccountPreset[] = [
  {
    id: 'demo-admin-01',
    name: 'Dr. Roberto Mendoza',
    email: 'admin@cineplus.pe',
    role: 'admin',
    description: 'Administrador del Sistema - Control Total, ML & APIs',
  },
  {
    id: 'demo-usuario-02',
    name: 'Carlos Alanya',
    email: 'usuario@cineplus.pe',
    role: 'usuario',
    description: 'Usuario Cinéfilo - Cartelera y Reseñas',
  },
];

type AuthListener = (user: User | null) => void;

export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private listeners: Set<AuthListener> = new Set();
  private inMemoryUsersDb: Array<{ id: string; email: string; name: string; role: UserRole; password?: string }> = [];

  private constructor() {
    this.restoreSession();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Restaura la sesión persistida desde Supabase o localStorage.
   */
  private async restoreSession(): Promise<void> {
    // 1. Intentar restaurar sesión activa desde Supabase si está disponible
    const supabase = SupabaseService.getInstance().getClient();
    if (supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const userMeta = session.user.user_metadata || {};
          this.currentUser = new User({
            id: session.user.id,
            email: session.user.email || 'usuario@cineplus.pe',
            name: userMeta.name || userMeta.full_name || session.user.email?.split('@')[0] || 'Usuario',
            role: (userMeta.role as UserRole) || 'usuario',
            avatarUrl: userMeta.avatar_url,
            isDemo: false,
          });
          this.persistLocalUser(this.currentUser);
          this.notifyListeners();
          return;
        }
      } catch (err) {
        console.warn('No se pudo verificar sesión de Supabase Auth:', err);
      }
    }

    // 2. Fallback a sesión local persistida en localStorage
    try {
      const stored = localStorage.getItem(LOCAL_USER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.currentUser = User.fromJson(parsed);
        this.notifyListeners();
      }
    } catch {
      this.currentUser = null;
    }
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Inicio de sesión con correo y contraseña.
   */
  public async loginWithEmail(email: string, password: string): Promise<User> {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Intentar con Supabase Auth si está configurado
    const supabase = SupabaseService.getInstance().getClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (!error && data.user) {
          const meta = data.user.user_metadata || {};
          const user = new User({
            id: data.user.id,
            email: data.user.email || cleanEmail,
            name: meta.name || meta.full_name || cleanEmail.split('@')[0],
            role: (meta.role as UserRole) || 'usuario',
            avatarUrl: meta.avatar_url,
            isDemo: false,
          });
          this.setCurrentUser(user);
          return user;
        }
      } catch (err) {
        console.warn('Error en Supabase signInWithPassword, intentando base local:', err);
      }
    }

    // 2. Si no hay Supabase o falla por falta de credenciales, verificar en la BD local de demo
    const localDb = this.getLocalUsersDb();
    const existing = localDb.find((u) => u.email === cleanEmail);

    if (existing) {
      if (existing.password && existing.password !== password) {
        throw new Error('Contraseña incorrecta. Por favor verifica tus credenciales.');
      }
      const user = new User({
        id: existing.id,
        email: existing.email,
        name: existing.name,
        role: existing.role,
        isDemo: true,
      });
      this.setCurrentUser(user);
      return user;
    }

    // 3. Si coincide con alguno de los presets de demo, permitir ingreso directo
    const preset = DEMO_PRESETS.find((p) => p.email === cleanEmail);
    if (preset) {
      const user = new User({
        id: preset.id,
        email: preset.email,
        name: preset.name,
        role: preset.role,
        isDemo: true,
      });
      this.setCurrentUser(user);
      return user;
    }

    throw new Error('Usuario no encontrado. Si no tienes cuenta aún, puedes registrarte en la pestaña "Crear Cuenta".');
  }

  /**
   * Registro de nuevo usuario con nombre, correo y contraseña.
   */
  public async registerWithEmail(
    name: string,
    email: string,
    password: string,
    role: UserRole = 'usuario'
  ): Promise<User> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName || cleanName.length < 2) {
      throw new Error('El nombre completo debe tener al menos 2 caracteres.');
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      throw new Error('Ingresa un correo electrónico válido.');
    }
    if (!password || password.length < 6) {
      throw new Error('La contraseña debe tener un mínimo de 6 caracteres.');
    }

    // 1. Intentar registrar en Supabase Auth
    const supabase = SupabaseService.getInstance().getClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              name: cleanName,
              full_name: cleanName,
              role,
            },
          },
        });

        if (!error && data.user) {
          const user = new User({
            id: data.user.id,
            email: cleanEmail,
            name: cleanName,
            role,
            isDemo: false,
          });
          this.setCurrentUser(user);
          this.saveToLocalDb(user, password);
          return user;
        }
        if (error && error.message) {
          console.warn('Supabase signUp error:', error.message);
        }
      } catch (err) {
        console.warn('Error registrando en Supabase Auth:', err);
      }
    }

    // 2. Registro local (Zero-Config / Modo Académico)
    const localDb = this.getLocalUsersDb();
    if (localDb.some((u) => u.email === cleanEmail)) {
      throw new Error('Este correo ya se encuentra registrado. Inicia sesión en su lugar.');
    }

    const newUser = new User({
      id: `user-${Date.now()}`,
      email: cleanEmail,
      name: cleanName,
      role,
      isDemo: true,
    });

    this.saveToLocalDb(newUser, password);
    this.setCurrentUser(newUser);
    return newUser;
  }

  /**
   * Inicio de sesión rápido en 1 Clic con preset de demostración.
   */
  public async loginAsDemo(rolePreset: 'admin' | 'docente' | 'usuario'): Promise<User> {
    const targetRole = rolePreset === 'docente' ? 'admin' : rolePreset;
    const preset = DEMO_PRESETS.find((p) => p.role === targetRole) || DEMO_PRESETS[0];
    const user = new User({
      id: preset.id,
      email: preset.email,
      name: preset.name,
      role: preset.role,
      isDemo: true,
    });
    this.setCurrentUser(user);
    return user;
  }

  /**
   * Cierre de sesión seguro.
   */
  public async logout(): Promise<void> {
    const supabase = SupabaseService.getInstance().getClient();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Error en Supabase signOut:', err);
      }
    }

    this.currentUser = null;
    try {
      localStorage.removeItem(LOCAL_USER_STORAGE_KEY);
    } catch {
      // Ignorar
    }
    this.notifyListeners();
  }

  /**
   * Suscribe un listener a cambios en la sesión.
   */
  public onAuthStateChanged(listener: AuthListener): () => void {
    this.listeners.add(listener);
    listener(this.currentUser);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private setCurrentUser(user: User): void {
    this.currentUser = user;
    this.persistLocalUser(user);
    this.notifyListeners();
  }

  private persistLocalUser(user: User): void {
    try {
      localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(user.toJson()));
    } catch {
      // Ignorar
    }
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      try {
        listener(this.currentUser);
      } catch (err) {
        console.error('Error en auth listener:', err);
      }
    }
  }

  // Base de datos de usuarios local en localStorage (soporte de fallback)
  private getLocalUsersDb(): Array<{ id: string; email: string; name: string; role: UserRole; password?: string }> {
    try {
      if (typeof localStorage === 'undefined') {
        return this.inMemoryUsersDb;
      }
      const raw = localStorage.getItem(REGISTERED_USERS_KEY);
      if (!raw) return this.inMemoryUsersDb;
      const parsed = JSON.parse(raw);
      // Combinar memoria y storage
      return Array.isArray(parsed) ? parsed : this.inMemoryUsersDb;
    } catch {
      return this.inMemoryUsersDb;
    }
  }

  private saveToLocalDb(user: User, password?: string): void {
    const record = {
      id: String(user.id),
      email: user.email,
      name: user.name,
      role: user.role,
      password,
    };
    this.inMemoryUsersDb.push(record);

    try {
      if (typeof localStorage !== 'undefined') {
        const db = this.getLocalUsersDb();
        if (!db.some((u) => u.email === user.email)) {
          db.push(record);
        }
        localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(db));
      }
    } catch {
      // Ignorar en entornos sin localStorage
    }
  }
}

export const authService = AuthService.getInstance();
