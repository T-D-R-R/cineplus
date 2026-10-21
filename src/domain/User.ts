import { BaseEntity } from './BaseEntity';

export type UserRole = 'admin' | 'docente' | 'usuario' | 'critico';

export interface UserParams {
  id: string;
  email: string;
  name: string;
  role?: UserRole;
  avatarUrl?: string;
  isDemo?: boolean;
  createdAt?: Date | string | null;
}

/**
 * CinePlus - Entidad de Dominio: User
 * Representa al usuario autenticado (Supabase Auth o Modo Demo Académico).
 */
export class User extends BaseEntity {
  public readonly email: string;
  public readonly name: string;
  public readonly role: UserRole;
  public readonly avatarUrl?: string;
  public readonly isDemo: boolean;

  constructor(params: UserParams) {
    super(params.id, params.createdAt);
    this.email = params.email.trim().toLowerCase();
    this.name = params.name.trim();
    this.role = params.role || 'usuario';
    this.avatarUrl = params.avatarUrl;
    this.isDemo = Boolean(params.isDemo);
  }

  /**
   * Determina si el usuario tiene privilegios de Administrador / Docente del sistema.
   */
  public isAdmin(): boolean {
    return this.role === 'admin' || this.role === 'docente';
  }

  /**
   * Obtiene las iniciales del nombre (ej: "Juan Pérez" -> "JP")
   */
  public getInitials(): string {
    const parts = this.name.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (this.name[0] || 'U').toUpperCase();
  }

  /**
   * Etiqueta amigable según el rol del usuario
   */
  public getRoleLabel(): string {
    if (this.isAdmin()) {
      return 'Administrador del Sistema';
    }
    return 'Usuario Cinéfilo';
  }

  public override toJson(): Record<string, unknown> {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
      avatarUrl: this.avatarUrl,
      isDemo: this.isDemo,
      createdAt: this.createdAt.toISOString(),
    };
  }

  public static fromJson(json: Record<string, unknown>): User {
    return new User({
      id: String(json.id || ''),
      email: String(json.email || ''),
      name: String(json.name || ''),
      role: (json.role as UserRole) || 'usuario',
      avatarUrl: json.avatarUrl ? String(json.avatarUrl) : undefined,
      isDemo: Boolean(json.isDemo),
      createdAt: json.createdAt ? String(json.createdAt) : null,
    });
  }
}
