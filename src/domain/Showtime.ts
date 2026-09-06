import { BaseEntity } from './BaseEntity';
import type { SupabaseShowtimeRow } from './types';

export class Showtime extends BaseEntity {
  public readonly tmdbMovieId: number;
  public readonly cinemaId: number;
  public readonly time: string; // ej: '18:30'
  public readonly room: string; // ej: 'Sala IMAX'
  public readonly format: string; // '2D', '3D', 'IMAX', '4DX'
  public readonly language: string; // 'Doblada', 'Subtitulada'
  public readonly price: number;

  constructor(params: {
    id: number | string;
    tmdbMovieId: number;
    cinemaId: number;
    time: string;
    room?: string;
    format?: string;
    language?: string;
    price?: number;
    createdAt?: Date | string | null;
  }) {
    super(params.id, params.createdAt);
    this.tmdbMovieId = params.tmdbMovieId;
    this.cinemaId = params.cinemaId;
    this.time = params.time;
    this.room = params.room || 'Sala Estándar';
    this.format = params.format || '2D';
    this.language = params.language || 'Doblada';
    this.price = params.price ?? 18000;
  }

  public getFormattedPrice(): string {
    const val = this.price > 100 ? this.price / 1000 : this.price;
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(val);
  }

  public static fromSupabaseRow(row: SupabaseShowtimeRow): Showtime {
    return new Showtime({
      id: row.id,
      tmdbMovieId: row.tmdb_movie_id,
      cinemaId: row.cine_id,
      time: row.hora,
      room: row.sala,
      format: row.formato,
      language: row.idioma,
      price: Number(row.precio),
      createdAt: row.creado_en,
    });
  }

  public override toJson(): Record<string, unknown> {
    return {
      id: this.id,
      tmdb_movie_id: this.tmdbMovieId,
      cine_id: this.cinemaId,
      hora: this.time,
      sala: this.room,
      formato: this.format,
      idioma: this.language,
      precio: this.price,
      creado_en: this.createdAt.toISOString(),
    };
  }
}
