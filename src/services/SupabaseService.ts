import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { BaseApiService } from './BaseApiService';
import { Review } from '../domain/Review';
import { Cinema } from '../domain/Cinema';
import { Showtime } from '../domain/Showtime';
import type { SupabaseCinemaRow, SupabaseReviewRow, SupabaseShowtimeRow } from '../domain/types';
import { getConfig } from '../core/config';

// Semillas locales de respaldo si aún no se han configurado las claves
const LOCAL_MOCK_CINEMAS: SupabaseCinemaRow[] = [
  {
    id: 1,
    nombre: 'Cine Colombia Titán Plaza',
    cadena: 'Cine Colombia',
    direccion: 'Av. Boyacá # 80-94, C.C. Titán Plaza',
    ciudad: 'Bogotá',
    latitud: 4.69578,
    longitud: -74.08643,
    telefono: '+57 601 7420101',
    sitio_web: 'https://www.cinecolombia.com',
  },
  {
    id: 2,
    nombre: 'Cinépolis Gran Estación',
    cadena: 'Cinépolis',
    direccion: 'Calle 26 # 62-47, C.C. Gran Estación',
    ciudad: 'Bogotá',
    latitud: 4.64684,
    longitud: -74.10397,
    telefono: '+57 601 5936300',
    sitio_web: 'https://www.cinepolis.com.co',
  },
  {
    id: 3,
    nombre: 'Cinemark Multiplaza',
    cadena: 'Cinemark',
    direccion: 'Av. Boyacá # 13-05, C.C. Multiplaza',
    ciudad: 'Bogotá',
    latitud: 4.65215,
    longitud: -74.12879,
    telefono: '+57 601 7443462',
    sitio_web: 'https://www.cinemark.com.co',
  },
  {
    id: 4,
    nombre: 'Cine Colombia Unicentro',
    cadena: 'Cine Colombia',
    direccion: 'Av. 15 # 124-30, C.C. Unicentro',
    ciudad: 'Bogotá',
    latitud: 4.70258,
    longitud: -74.04169,
    telefono: '+57 601 7420101',
    sitio_web: 'https://www.cinecolombia.com',
  },
  {
    id: 5,
    nombre: 'Cinépolis Plaza Central',
    cadena: 'Cinépolis',
    direccion: 'Carrera 65 # 11-50, C.C. Plaza Central',
    ciudad: 'Bogotá',
    latitud: 4.63241,
    longitud: -74.11652,
    telefono: '+57 601 5936300',
    sitio_web: 'https://www.cinepolis.com.co',
  },
];

const LOCAL_MOCK_SHOWTIMES: SupabaseShowtimeRow[] = [
  // Dune 2 (693134)
  { id: 1, tmdb_movie_id: 693134, cine_id: 1, hora: '14:30', sala: 'Sala IMAX Mega', formato: 'IMAX', precio: 26000 },
  { id: 2, tmdb_movie_id: 693134, cine_id: 1, hora: '18:00', sala: 'Sala IMAX Mega', formato: 'IMAX', precio: 26000 },
  { id: 3, tmdb_movie_id: 693134, cine_id: 1, hora: '21:30', sala: 'Sala IMAX Mega', formato: 'IMAX', precio: 26000 },
  { id: 4, tmdb_movie_id: 693134, cine_id: 2, hora: '16:45', sala: 'Sala 1', formato: '2D', precio: 18000 },
  { id: 5, tmdb_movie_id: 693134, cine_id: 2, hora: '20:15', sala: 'Sala VIP 2', formato: '2D', precio: 34000 },
  { id: 6, tmdb_movie_id: 693134, cine_id: 4, hora: '19:00', sala: 'Sala Dinamix 4D', formato: '4DX', precio: 28000 },
  // Intensamente 2 (1022789)
  { id: 7, tmdb_movie_id: 1022789, cine_id: 2, hora: '15:20', sala: 'Sala Junior', formato: '2D', precio: 16000 },
  { id: 8, tmdb_movie_id: 1022789, cine_id: 2, hora: '17:40', sala: 'Sala 3 MacroXE', formato: '3D', precio: 20000 },
  { id: 9, tmdb_movie_id: 1022789, cine_id: 3, hora: '16:30', sala: 'Sala 2', formato: '2D', precio: 15000 },
  // Deadpool & Wolverine (533535)
  { id: 10, tmdb_movie_id: 533535, cine_id: 1, hora: '19:10', sala: 'Sala 3', formato: '2D', precio: 18000 },
  { id: 11, tmdb_movie_id: 533535, cine_id: 3, hora: '21:00', sala: 'Sala XD', formato: '3D', precio: 23000 },
  // Dune 1 (438631)
  { id: 12, tmdb_movie_id: 438631, cine_id: 1, hora: '18:30', sala: 'Sala IMAX Mega', formato: 'IMAX', precio: 24000 },
  { id: 13, tmdb_movie_id: 438631, cine_id: 2, hora: '19:30', sala: 'Sala VIP 1', formato: '2D', precio: 32000 },
  // La Sustancia (933260)
  { id: 14, tmdb_movie_id: 933260, cine_id: 1, hora: '22:30', sala: 'Sala 5 Arte', formato: '2D', precio: 20000 },
];

const LOCAL_STORAGE_REVIEWS_KEY = 'cineplus_local_reviews_cache';

function getLocalReviews(): SupabaseReviewRow[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
    if (!raw) {
      const initial: SupabaseReviewRow[] = [
        {
          id: 1,
          tmdb_movie_id: 693134,
          nombre_usuario: 'María González',
          comentario:
            'Una obra maestra visual y sonora. La dirección de Denis Villeneuve y la fotografía crean una experiencia inmersiva sin precedentes.',
          puntaje: 5,
          creado_en: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
        },
        {
          id: 2,
          tmdb_movie_id: 693134,
          nombre_usuario: 'Carlos Ruiz',
          comentario: 'Actuaciones magistrales de Timothée Chalamet y Austin Butler. En sala IMAX es una locura total.',
          puntaje: 5,
          creado_en: new Date(Date.now() - 3600000 * 12).toISOString(),
        },
        {
          id: 3,
          tmdb_movie_id: 438631,
          nombre_usuario: 'Valentina Castro',
          comentario: 'La primera parte preparó todo a la perfección. Gran adaptación de la novela de Frank Herbert.',
          puntaje: 4,
          creado_en: new Date(Date.now() - 3600000 * 48).toISOString(),
        },
      ];
      localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export class SupabaseService extends BaseApiService {
  private static instance: SupabaseService;
  private client: SupabaseClient | null = null;

  private constructor() {
    super(getConfig().supabaseUrl || 'https://mock.supabase.co');
    this.initializeClient();
  }

  public static getInstance(): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService();
    }
    return SupabaseService.instance;
  }

  private initializeClient(): void {
    const { supabaseUrl, supabaseAnonKey } = getConfig();
    if (supabaseUrl && supabaseAnonKey) {
      try {
        this.client = createClient(supabaseUrl, supabaseAnonKey);
      } catch (error) {
        console.warn('Error inicializando cliente de Supabase:', error);
        this.client = null;
      }
    } else {
      this.client = null;
    }
  }

  /**
   * Obtiene todas las reseñas de una película dada.
   */
  public async getReviews(tmdbMovieId: number): Promise<Review[]> {
    this.initializeClient();

    if (this.client) {
      try {
        const { data, error } = await this.client
          .from('resenas')
          .select('*')
          .eq('tmdb_movie_id', tmdbMovieId)
          .order('creado_en', { ascending: false });

        if (error) throw error;
        return (data || []).map((row) => Review.fromSupabaseRow(row));
      } catch (error) {
        console.warn('Error consultando Supabase, usando almacenamiento local:', error);
      }
    }

    // Fallback local
    const local = getLocalReviews().filter((r) => r.tmdb_movie_id === Number(tmdbMovieId));
    return local.map((row) => Review.fromSupabaseRow(row));
  }

  /**
   * Guarda una nueva reseña en Supabase (o en almacenamiento local de respaldo).
   */
  public async createReview(review: Review): Promise<Review> {
    const validation = review.validate();
    if (!validation.isValid) {
      throw new Error(validation.errors.join(' '));
    }

    this.initializeClient();

    if (this.client) {
      try {
        const { data, error } = await this.client
          .from('resenas')
          .insert([
            {
              tmdb_movie_id: review.tmdbMovieId,
              nombre_usuario: review.userName,
              comentario: review.comment,
              puntaje: review.rating,
            },
          ])
          .select()
          .single();

        if (error) throw error;
        return Review.fromSupabaseRow(data);
      } catch (error) {
        console.warn('Error insertando en Supabase, guardando en respaldo local:', error);
      }
    }

    // Fallback local
    const current = getLocalReviews();
    const newRow: SupabaseReviewRow = {
      id: Date.now(),
      tmdb_movie_id: review.tmdbMovieId,
      nombre_usuario: review.userName,
      comentario: review.comment,
      puntaje: review.rating,
      creado_en: new Date().toISOString(),
    };
    current.unshift(newRow);
    localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(current));
    return Review.fromSupabaseRow(newRow);
  }

  /**
   * Obtiene los cines y sus funciones para una película específica.
   */
  public async getCinemasForMovie(
    tmdbMovieId: number
  ): Promise<{ cinema: Cinema; showtimes: Showtime[] }[]> {
    this.initializeClient();

    if (this.client) {
      try {
        const { data, error } = await this.client
          .from('funciones')
          .select('*, cines(*)')
          .eq('tmdb_movie_id', tmdbMovieId);

        if (!error && data && data.length > 0) {
          // Agrupar funciones por cine
          const cinemaMap = new Map<number, { cinema: Cinema; showtimes: Showtime[] }>();
          for (const item of data) {
            if (!item.cines) continue;
            const cineRow = item.cines as SupabaseCinemaRow;
            if (!cinemaMap.has(cineRow.id)) {
              cinemaMap.set(cineRow.id, {
                cinema: Cinema.fromSupabaseRow(cineRow),
                showtimes: [],
              });
            }
            cinemaMap.get(cineRow.id)!.showtimes.push(Showtime.fromSupabaseRow(item));
          }
          return Array.from(cinemaMap.values());
        }
      } catch (error) {
        console.warn('Error consultando funciones en Supabase, usando respaldo local:', error);
      }
    }

    // Fallback local
    const matchingShowtimes = LOCAL_MOCK_SHOWTIMES.filter(
      (s) => s.tmdb_movie_id === Number(tmdbMovieId)
    );

    // Si no hay funciones específicas para esta película, asignamos funciones en 2 cines al azar
    const showtimesToUse =
      matchingShowtimes.length > 0
        ? matchingShowtimes
        : [
            { id: 991, tmdb_movie_id: tmdbMovieId, cine_id: 1, hora: '16:00', sala: 'Sala 1', formato: '2D', precio: 18000 },
            { id: 992, tmdb_movie_id: tmdbMovieId, cine_id: 1, hora: '19:30', sala: 'Sala IMAX', formato: 'IMAX', precio: 25000 },
            { id: 993, tmdb_movie_id: tmdbMovieId, cine_id: 2, hora: '18:15', sala: 'Sala 3', formato: '2D', precio: 17000 },
          ];

    const cinemaMap = new Map<number, { cinema: Cinema; showtimes: Showtime[] }>();
    for (const st of showtimesToUse) {
      const cineRow = LOCAL_MOCK_CINEMAS.find((c) => c.id === st.cine_id) || LOCAL_MOCK_CINEMAS[0];
      if (!cinemaMap.has(cineRow.id)) {
        cinemaMap.set(cineRow.id, {
          cinema: Cinema.fromSupabaseRow(cineRow),
          showtimes: [],
        });
      }
      cinemaMap.get(cineRow.id)!.showtimes.push(Showtime.fromSupabaseRow(st));
    }

    return Array.from(cinemaMap.values());
  }

  /**
   * Obtiene todos los cines registrados.
   */
  public async getAllCinemas(): Promise<Cinema[]> {
    this.initializeClient();

    if (this.client) {
      try {
        const { data, error } = await this.client.from('cines').select('*');
        if (!error && data) {
          return data.map((row) => Cinema.fromSupabaseRow(row));
        }
      } catch (error) {
        console.warn('Error consultando todos los cines:', error);
      }
    }

    return LOCAL_MOCK_CINEMAS.map((row) => Cinema.fromSupabaseRow(row));
  }
}

export const supabaseService = SupabaseService.getInstance();
