import { BaseEntity } from './BaseEntity';
import type { SupabaseReviewRow } from './types';
import { formatRelativeTime } from '../core/utils';

export class Review extends BaseEntity {
  public readonly tmdbMovieId: number;
  public readonly userName: string;
  public readonly comment: string;
  public readonly rating: number; // 1 a 5 estrellas

  constructor(params: {
    id?: number | string;
    tmdbMovieId: number;
    userName: string;
    comment: string;
    rating: number;
    createdAt?: Date | string | null;
  }) {
    super(params.id || 0, params.createdAt);
    this.tmdbMovieId = params.tmdbMovieId;
    this.userName = params.userName.trim();
    this.comment = params.comment.trim();
    this.rating = Math.max(1, Math.min(5, Math.round(params.rating)));
  }

  public validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!this.userName || this.userName.length < 2) {
      errors.push('El nombre de usuario debe tener al menos 2 caracteres.');
    }
    if (!this.comment || this.comment.length < 5) {
      errors.push('La reseña debe tener al menos 5 caracteres.');
    }
    if (this.rating < 1 || this.rating > 5) {
      errors.push('La calificación debe estar entre 1 y 5 estrellas.');
    }
    if (!this.tmdbMovieId || this.tmdbMovieId <= 0) {
      errors.push('ID de película de TMDb no válido.');
    }
    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  public getFormattedTime(): string {
    return formatRelativeTime(this.createdAt);
  }

  public static fromSupabaseRow(row: SupabaseReviewRow): Review {
    return new Review({
      id: row.id,
      tmdbMovieId: row.tmdb_movie_id,
      userName: row.nombre_usuario,
      comment: row.comentario,
      rating: row.puntaje,
      createdAt: row.creado_en,
    });
  }

  public override toJson(): Record<string, unknown> {
    return {
      id: this.id,
      tmdb_movie_id: this.tmdbMovieId,
      nombre_usuario: this.userName,
      comentario: this.comment,
      puntaje: this.rating,
      creado_en: this.createdAt.toISOString(),
    };
  }
}
