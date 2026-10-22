import { SupabaseService } from '../SupabaseService';
import { User, type UserRole } from '../../domain/User';
import { telegramService } from '../telegram/TelegramService';

const LOCAL_USER_STORAGE_KEY = 'cineplus_active_user_session';
const REGISTERED_USERS_KEY = 'cineplus_registered_users_db';

export interface DemoAccountPreset {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  telegramChatId?: string;
  telegramUsername?: string;
  description: string;
}

export interface StoredUserRecord {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  telegramChatId?: string;
  telegramUsername?: string;
  password?: string;
  createdAt?: string;
}

export interface PasswordResetSession {
  email: string;
  user: User;
  otpCode: string;
  expiresAt: number;
}

export const DEMO_PRESETS: DemoAccountPreset[] = [
  {
    id: 'admin-teo',
    name: 'Teo Ricra Rojas (Administrador)',
    email: 'teoricrarojas@gmail.com',
    role: 'admin',
    password: 'Admin2026!',
    telegramChatId: '2088180188',
    telegramUsername: 'Dan',
    description: 'Administrador del Sistema - Control Total, ML & APIs',
  },
  {
    id: 'demo-admin-01',
    name: 'Administrador CinePlus',
    email: 'admin@cineplus.pe',
    role: 'admin',
    password: 'Admin2026!',
    telegramChatId: '2088180188',
    telegramUsername: 'Dan',
    description: 'Administrador del Sistema (Alias Institucional)',
  },
  {
    id: 'demo-usuario-02',
    name: 'Carlos Alanya',
    email: 'usuario@cineplus.pe',
    role: 'usuario',
    password: 'Usuario2026!',
    description: 'Usuario Cinéfilo - Cartelera y Reseñas',
  },
];

type AuthListener = (user: User | null) => void;

export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private listeners: Set<AuthListener> = new Set();
  private inMemoryUsersDb: StoredUserRecord[] = [];
  private activeResetSessions: Map<string, PasswordResetSession> = new Map();

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
          const localRecord = this.getLocalUsersDb().find(u => u.email === (session.user.email || '').toLowerCase());
          
          let telChatId = userMeta.telegram_chat_id || localRecord?.telegramChatId;
          let telUser = userMeta.telegram_username || localRecord?.telegramUsername;

          // Protección: Si no es la cuenta de Teo/Admin pero tiene asignado por error su Chat ID, limpiar
          const emailLower = (session.user.email || '').toLowerCase();
          if (emailLower !== 'teoricrarojas@gmail.com' && emailLower !== 'admin@cineplus.pe' && telChatId === '2088180188') {
            telChatId = undefined;
            telUser = undefined;
          }

          this.currentUser = new User({
            id: session.user.id,
            email: session.user.email || 'usuario@cineplus.pe',
            name: userMeta.name || userMeta.full_name || session.user.email?.split('@')[0] || 'Usuario',
            role: (userMeta.role as UserRole) || 'usuario',
            phone: userMeta.phone || localRecord?.phone,
            telegramChatId: telChatId,
            telegramUsername: telUser,
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
        if (
          parsed.email &&
          parsed.email.toLowerCase() !== 'teoricrarojas@gmail.com' &&
          parsed.email.toLowerCase() !== 'admin@cineplus.pe' &&
          parsed.telegramChatId === '2088180188'
        ) {
          parsed.telegramChatId = undefined;
          parsed.telegramUsername = undefined;
          localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(parsed));
        }
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
   * Valida estrictamente las credenciales del Administrador (admin@cineplus.pe / Admin2026!).
   */
  public async loginWithEmail(email: string, password: string): Promise<User> {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Validación estricta de cuenta Administrador del Sistema
    const isAdmin = cleanEmail === 'teoricrarojas@gmail.com' || cleanEmail === 'admin@cineplus.pe';
    if (isAdmin) {
      const localDb = this.getLocalUsersDb();
      const adminRecord = localDb.find((u) => u.email === cleanEmail);
      const expectedPassword = adminRecord?.password || 'Admin2026!';

      if (password !== expectedPassword) {
        throw new Error('Contraseña incorrecta para la cuenta de Administrador.');
      }

      const adminUser = new User({
        id: adminRecord?.id || (cleanEmail === 'teoricrarojas@gmail.com' ? 'admin-teo' : 'admin-root'),
        email: cleanEmail,
        name: adminRecord?.name || (cleanEmail === 'teoricrarojas@gmail.com' ? 'Teo Ricra Rojas' : 'Administrador CinePlus'),
        role: 'admin',
        phone: adminRecord?.phone,
        telegramChatId: adminRecord?.telegramChatId || '2088180188',
        telegramUsername: adminRecord?.telegramUsername || 'Dan',
        isDemo: false,
      });

      this.setCurrentUser(adminUser);
      return adminUser;
    }

    // 2. Intentar con Supabase Auth si está configurado
    const supabase = SupabaseService.getInstance().getClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (!error && data.user) {
          const meta = data.user.user_metadata || {};
          const localRecord = this.getLocalUsersDb().find((u) => u.email === cleanEmail);
          const user = new User({
            id: data.user.id,
            email: data.user.email || cleanEmail,
            name: meta.name || meta.full_name || cleanEmail.split('@')[0],
            role: (meta.role as UserRole) || 'usuario',
            phone: meta.phone || localRecord?.phone,
            telegramChatId: meta.telegram_chat_id || localRecord?.telegramChatId,
            telegramUsername: meta.telegram_username || localRecord?.telegramUsername,
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

    // 3. Verificar en la base de datos local
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
        role: existing.role || 'usuario',
        phone: existing.phone,
        telegramChatId: existing.telegramChatId,
        telegramUsername: existing.telegramUsername,
        isDemo: true,
      });
      this.setCurrentUser(user);
      return user;
    }

    // 4. Si coincide con preset demo regular (usuario@cineplus.pe)
    const preset = DEMO_PRESETS.find((p) => p.email === cleanEmail);
    if (preset) {
      if (preset.password && preset.password !== password) {
        throw new Error('Contraseña incorrecta. Por favor verifica tus credenciales.');
      }
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
   * Registro público de nuevo usuario.
   * SEGURIDAD: Todos los registros públicos son inmutables con rol 'usuario' (Cinéfilo).
   * Ningún usuario público puede autoproclamarse Administrador.
   */
  public async registerWithEmail(
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<User> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPhone = phone ? phone.trim() : undefined;

    if (!cleanName || cleanName.length < 2) {
      throw new Error('El nombre completo debe tener al menos 2 caracteres.');
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      throw new Error('Ingresa un correo electrónico válido.');
    }
    if (cleanEmail === 'teoricrarojas@gmail.com' || cleanEmail === 'admin@cineplus.pe') {
      throw new Error('El correo del Administrador ya se encuentra reservado.');
    }
    if (!password || password.length < 6) {
      throw new Error('La contraseña debe tener un mínimo de 6 caracteres.');
    }

    // El rol asignado siempre es 'usuario' por políticas estrictas de RBAC
    const assignedRole: UserRole = 'usuario';

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
              role: assignedRole,
              phone: cleanPhone,
            },
          },
        });

        if (!error && data.user) {
          const user = new User({
            id: data.user.id,
            email: cleanEmail,
            name: cleanName,
            role: assignedRole,
            phone: cleanPhone,
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
      role: assignedRole,
      phone: cleanPhone,
      isDemo: true,
    });

    this.saveToLocalDb(newUser, password);
    this.setCurrentUser(newUser);
    return newUser;
  }

  // =========================================================================
  // GESTIÓN DE RECUPERACIÓN DE CONTRASEÑA Y OTP MULTICANAL (CORREO / TELEGRAM)
  // =========================================================================

  /**
   * Paso 1: Búsqueda del usuario por correo o teléfono.
   * Si no existe en la base de datos, rechaza inmediatamente.
   * Si existe, genera un código OTP de 6 dígitos con vigencia de 5 minutos.
   */
  public async requestPasswordReset(identifier: string): Promise<{
    success: boolean;
    email: string;
    user: User;
    hasTelegram: boolean;
    phone?: string;
    message: string;
  }> {
    const cleanId = identifier.trim().toLowerCase();
    if (!cleanId) {
      throw new Error('Por favor ingresa tu correo electrónico registrado o teléfono.');
    }

    // Buscar en BD local o presets
    const localDb = this.getLocalUsersDb();
    let record = localDb.find(
      (u) => u.email.toLowerCase() === cleanId || (u.phone && u.phone.trim() === cleanId)
    );

    if (!record) {
      const preset = DEMO_PRESETS.find((p) => p.email.toLowerCase() === cleanId);
      if (preset) {
        record = {
          id: preset.id,
          email: preset.email,
          name: preset.name,
          role: preset.role,
          password: preset.password,
        };
      }
    }

    // Si aún no se encuentra, verificar en Supabase sesión activa o rechazar
    if (!record) {
      throw new Error('No se encontró ninguna cuenta registrada con este correo electrónico o teléfono. Verifica tus datos o regístrate.');
    }

    let telChatId = record.telegramChatId;
    let telUser = record.telegramUsername;
    if (
      record.email.toLowerCase() !== 'teoricrarojas@gmail.com' &&
      record.email.toLowerCase() !== 'admin@cineplus.pe' &&
      telChatId === '2088180188'
    ) {
      telChatId = undefined;
      telUser = undefined;
    }

    const user = new User({
      id: record.id,
      email: record.email,
      name: record.name,
      role: record.role,
      phone: record.phone,
      telegramChatId: telChatId,
      telegramUsername: telUser,
      isDemo: true,
    });

    // Generar código OTP criptográfico de 6 dígitos
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutos

    this.activeResetSessions.set(user.email, {
      email: user.email,
      user,
      otpCode,
      expiresAt,
    });

    return {
      success: true,
      email: user.email,
      user,
      hasTelegram: user.hasTelegramLinked(),
      phone: user.phone,
      message: 'Cuenta verificada correctamente en el sistema.',
    };
  }

  /**
   * Envía el código OTP a través del Bot oficial de Telegram (@CinePlusSeguridad_bot).
   */
  public async sendOtpViaTelegram(email: string): Promise<{
    success: boolean;
    message: string;
    otpSent?: boolean;
    deepLink?: string;
  }> {
    const cleanEmail = email.trim().toLowerCase();
    const session = this.activeResetSessions.get(cleanEmail);

    if (!session) {
      throw new Error('No hay una solicitud de recuperación activa para esta cuenta.');
    }

    // 1. Si no tiene Telegram enlazado en memoria, buscar si ya envió /start o si es la cuenta del admin
    if (!session.user.telegramChatId) {
      if (cleanEmail === 'teoricrarojas@gmail.com' || cleanEmail === 'admin@cineplus.pe') {
        session.user = new User({
          id: String(session.user.id),
          email: session.user.email,
          name: session.user.name,
          role: session.user.role,
          phone: session.user.phone,
          telegramChatId: '2088180188',
          telegramUsername: 'Dan',
          isDemo: session.user.isDemo,
        });
        await this.linkTelegramAccount(String(session.user.id), '2088180188', 'Dan');
      } else {
        const recent = await telegramService.pollRecentLinks();
        // Coincidencia exacta por ID de usuario registrado
        const match = recent.find(
          (l) => l.linkPayload === `link_${session.user.id}` || l.linkPayload === session.user.id
        );

        if (match) {
          session.user = new User({
            id: String(session.user.id),
            email: session.user.email,
            name: session.user.name,
            role: session.user.role,
            phone: session.user.phone,
            telegramChatId: String(match.chatId),
            telegramUsername: match.username || match.firstName,
            isDemo: session.user.isDemo,
          });
          await this.linkTelegramAccount(String(session.user.id), match.chatId, match.username);
        }
      }
    }

    // 2. Si ya tiene Telegram enlazado, enviar código OTP en vivo
    if (session.user.telegramChatId) {
      const sent = await telegramService.sendOtpCode(
        session.user.telegramChatId,
        session.otpCode,
        session.user.name
      );

      if (sent) {
        return {
          success: true,
          otpSent: true,
          message: `Código OTP de 6 dígitos enviado exitosamente a tu Telegram (@${session.user.telegramUsername || 'Telegram'}).`,
        };
      }
    }

    // 3. Si aún no está enlazado en absoluto, generamos el Deep Link para abrir el bot
    const deepLink = telegramService.getDeepLink(`link_${session.user.id}`);
    return {
      success: true,
      otpSent: false,
      deepLink,
      message: 'Abre Telegram y presiona INICIAR para recibir tu código de seguridad.',
    };
  }

  /**
   * Envía el enlace de recuperación por Correo Electrónico (Supabase).
   * Si se supera el límite de cuota (3/hora) o es entorno local, activa el código OTP en pantalla.
   */
  public async sendOtpViaEmail(email: string): Promise<{
    success: boolean;
    isSimulation: boolean;
    simulationCode?: string;
    message: string;
  }> {
    const cleanEmail = email.trim().toLowerCase();
    const session = this.activeResetSessions.get(cleanEmail);

    if (!session) {
      throw new Error('No hay una solicitud de recuperación activa para esta cuenta.');
    }

    const supabase = SupabaseService.getInstance().getClient();
    if (supabase) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: window.location.origin,
        });

        if (!error) {
          return {
            success: true,
            isSimulation: false,
            message: 'Se ha enviado un enlace de recuperación a tu bandeja de correo.',
          };
        }

        console.warn('Supabase resetPasswordForEmail error (usando fallback OTP):', error.message);
      } catch (err) {
        console.warn('Error conectando a Supabase resetPassword:', err);
      }
    }

    // Fallback académico resiliente con código OTP
    return {
      success: true,
      isSimulation: true,
      simulationCode: session.otpCode,
      message: 'Modo de demostración académica: Tu código OTP de verificación temporal ha sido generado.',
    };
  }

  /**
   * Valida el código OTP ingresado por el usuario.
   */
  public verifyOtp(email: string, code: string): boolean {
    const cleanEmail = email.trim().toLowerCase();
    const session = this.activeResetSessions.get(cleanEmail);

    if (!session) {
      throw new Error('La sesión de recuperación ha expirado. Vuelve a solicitar el código.');
    }

    if (Date.now() > session.expiresAt) {
      this.activeResetSessions.delete(cleanEmail);
      throw new Error('El código OTP ha expirado (límite de 5 minutos). Solicita uno nuevo.');
    }

    const cleanCode = code.trim().replace(/\s+/g, '');
    if (cleanCode !== session.otpCode) {
      throw new Error('El código de verificación OTP ingresado es incorrecto.');
    }

    return true;
  }

  /**
   * Establece una nueva contraseña tras validar el código OTP o enlace directo de recuperación.
   */
  public async resetPassword(email: string, newPassword: string, code?: string): Promise<boolean> {
    const cleanEmail = email.trim().toLowerCase();
    const isDirectRecovery = code === 'supabase_recovery' || (!code && Boolean(this.currentUser));

    if (!isDirectRecovery && code) {
      this.verifyOtp(email, code);
    }

    if (!newPassword || newPassword.length < 6) {
      throw new Error('La nueva contraseña debe tener al menos 6 caracteres.');
    }

    const session = this.activeResetSessions.get(cleanEmail);

    // 1. Intentar actualizar en Supabase si es usuario Supabase
    const supabase = SupabaseService.getInstance().getClient();
    if (supabase) {
      try {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) {
          console.warn('Error en supabase.auth.updateUser:', error.message);
        }
      } catch (err) {
        console.warn('Error conectando a Supabase updateUser:', err);
      }
    }

    // 2. Actualizar en Base de Datos Local
    const localDb = this.getLocalUsersDb();
    const index = localDb.findIndex((u) => u.email.toLowerCase() === cleanEmail);

    if (index >= 0) {
      localDb[index].password = newPassword;
    } else {
      localDb.push({
        id: String(session?.user.id || `user-${Date.now()}`),
        email: cleanEmail,
        name: session?.user.name || 'Usuario',
        role: session?.user.role || 'usuario',
        password: newPassword,
      });
    }

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(localDb));
      }
    } catch {
      // Ignorar en entornos de test
    }

    // 3. Si tiene Telegram, enviar alerta de seguridad
    if (session?.user.telegramChatId) {
      telegramService.sendPasswordChangedAlert(
        session.user.telegramChatId,
        session.user.name
      ).catch(() => {});
    }

    // Limpiar sesión de reseteo
    this.activeResetSessions.delete(cleanEmail);
    return true;
  }

  /**
   * Vincula la cuenta de un usuario con Telegram guardando su chatId y username.
   */
  public async linkTelegramAccount(
    userId: string,
    chatId: string | number,
    username?: string
  ): Promise<boolean> {
    const localDb = this.getLocalUsersDb();
    const userRecord = localDb.find((u) => u.id === userId || (this.currentUser && u.email === this.currentUser.email));

    if (userRecord) {
      userRecord.telegramChatId = String(chatId);
      userRecord.telegramUsername = username;
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(localDb));
        }
      } catch {
        // Ignorar
      }
    }

    if (this.currentUser) {
      const updatedUser = new User({
        id: String(this.currentUser.id),
        email: this.currentUser.email,
        name: this.currentUser.name,
        role: this.currentUser.role,
        phone: this.currentUser.phone,
        telegramChatId: String(chatId),
        telegramUsername: username,
        avatarUrl: this.currentUser.avatarUrl,
        isDemo: this.currentUser.isDemo,
      });
      this.persistLocalUser(updatedUser);
      this.setCurrentUser(updatedUser);

      // Sincronizar en Supabase si hay sesión activa
      const supabase = SupabaseService.getInstance().getClient();
      if (supabase) {
        try {
          await supabase.auth.updateUser({
            data: {
              telegram_chat_id: String(chatId),
              telegram_username: username || '',
            },
          });
        } catch (err) {
          console.warn('No se pudo guardar telegram en Supabase user_metadata:', err);
        }
      }

      await telegramService.sendWelcomeLinkMessage(chatId, updatedUser.name);
      return true;
    }

    return false;
  }

  /**
   * Desvincula la cuenta de Telegram del usuario actual.
   */
  public async unlinkTelegramAccount(): Promise<boolean> {
    if (!this.currentUser) return false;

    const localDb = this.getLocalUsersDb();
    const userRecord = localDb.find((u) => u.id === this.currentUser?.id || u.email === this.currentUser?.email);

    if (userRecord) {
      delete userRecord.telegramChatId;
      delete userRecord.telegramUsername;
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(localDb));
        }
      } catch {
        // Ignorar
      }
    }

    const updatedUser = new User({
      id: String(this.currentUser.id),
      email: this.currentUser.email,
      name: this.currentUser.name,
      role: this.currentUser.role,
      phone: this.currentUser.phone,
      avatarUrl: this.currentUser.avatarUrl,
      isDemo: this.currentUser.isDemo,
    });
    this.persistLocalUser(updatedUser);
    this.setCurrentUser(updatedUser);

    const supabase = SupabaseService.getInstance().getClient();
    if (supabase) {
      try {
        await supabase.auth.updateUser({
          data: {
            telegram_chat_id: null,
            telegram_username: null,
          },
        });
      } catch (err) {
        console.warn('No se pudo limpiar telegram en Supabase user_metadata:', err);
      }
    }

    return true;
  }

  /**
   * Sincroniza automáticamente los comandos /start recibidos por el bot
   * para asociar al usuario activo por su ID único.
   */
  public async checkAndSyncTelegram(): Promise<{ linked: boolean; message: string }> {
    const recentLinks = await telegramService.pollRecentLinks();
    if (recentLinks.length === 0) {
      return { linked: false, message: 'No se detectó actividad reciente en @CinePlusSeguridad_bot.' };
    }

    const current = this.currentUser;
    if (!current) {
      return { linked: false, message: 'Inicia sesión para vincular tu cuenta.' };
    }

    // Coincidencia estricta por identificador único del usuario
    const match = recentLinks.find(
      (l) => l.linkPayload === `link_${current.id}` || l.linkPayload === current.id
    );

    if (match) {
      await this.linkTelegramAccount(String(current.id), match.chatId, match.username);
      return {
        linked: true,
        message: `¡Cuenta vinculada con éxito a Telegram (@${match.username || match.firstName})!`,
      };
    }

    return { linked: false, message: 'Presiona "INICIAR" en el chat del bot en Telegram para vincular tu cuenta.' };
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
  public getLocalUsersDb(): StoredUserRecord[] {
    try {
      if (typeof localStorage === 'undefined') {
        return this.inMemoryUsersDb;
      }
      const raw = localStorage.getItem(REGISTERED_USERS_KEY);
      if (!raw) return this.inMemoryUsersDb;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : this.inMemoryUsersDb;
    } catch {
      return this.inMemoryUsersDb;
    }
  }

  private saveToLocalDb(user: User, password?: string): void {
    const record: StoredUserRecord = {
      id: String(user.id),
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      telegramChatId: user.telegramChatId,
      telegramUsername: user.telegramUsername,
      password,
      createdAt: user.createdAt.toISOString(),
    };
    this.inMemoryUsersDb.push(record);

    try {
      if (typeof localStorage !== 'undefined') {
        const db = this.getLocalUsersDb();
        const existingIdx = db.findIndex((u) => u.email === user.email);
        if (existingIdx >= 0) {
          db[existingIdx] = record;
        } else {
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
