/**
 * CinePlus - Clean Architecture Domain
 * Clase Base Abstracta para todas las entidades del negocio (POO / Herencia).
 */

export abstract class BaseEntity {
  protected readonly _id: number | string;
  protected readonly _createdAt: Date;

  constructor(id: number | string, createdAt?: Date | string | null) {
    this._id = id;
    if (createdAt instanceof Date) {
      this._createdAt = createdAt;
    } else if (typeof createdAt === 'string') {
      const parsed = new Date(createdAt);
      this._createdAt = isNaN(parsed.getTime()) ? new Date() : parsed;
    } else {
      this._createdAt = new Date();
    }
  }

  public get id(): number | string {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  /**
   * Serialización de la entidad a objeto plano.
   */
  public abstract toJson(): Record<string, unknown>;

  /**
   * Valida la consistencia básica de la entidad.
   */
  public isValid(): boolean {
    return Boolean(this._id);
  }
}
