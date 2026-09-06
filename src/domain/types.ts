/**
 * CinePlus - Tipos e Interfaces de Dominio
 */

export interface Genre {
  id: number;
  name: string;
}

export interface Actor {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
}

export interface VideoTrailer {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

// DTOs de TMDb API
export interface TmdbMovieDto {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids?: number[];
  genres?: Genre[];
  runtime?: number;
  budget?: number;
  revenue?: number;
  tagline?: string;
  status?: string;
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
      order: number;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      department: string;
    }>;
  };
  videos?: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
      official: boolean;
    }>;
  };
}

// Filas de Supabase
export interface SupabaseCinemaRow {
  id: number;
  nombre: string;
  cadena: string;
  direccion: string;
  ciudad?: string;
  latitud: number;
  longitud: number;
  telefono?: string;
  sitio_web?: string;
  creado_en?: string;
}

export interface SupabaseShowtimeRow {
  id: number;
  tmdb_movie_id: number;
  cine_id: number;
  hora: string;
  sala: string;
  formato: string;
  idioma?: string;
  precio: number;
  creado_en?: string;
  cines?: SupabaseCinemaRow;
}

export interface SupabaseReviewRow {
  id: number;
  tmdb_movie_id: number;
  nombre_usuario: string;
  comentario: string;
  puntaje: number;
  creado_en: string;
}
