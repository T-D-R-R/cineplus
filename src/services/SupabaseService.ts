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
    nombre: 'Cineplanet Real Plaza Huánuco',
    cadena: 'Cineplanet',
    direccion: 'Jr. Crespo y Castillo 480, C.C. Real Plaza',
    ciudad: 'Huánuco',
    latitud: -9.9306,
    longitud: -76.2422,
    telefono: '+51 1 624 9500',
    sitio_web: 'https://www.cineplanet.com.pe',
  },
  {
    id: 2,
    nombre: 'Cinemark Real Plaza Huancayo',
    cadena: 'Cinemark',
    direccion: 'Av. Ferrocarril 1035, C.C. Real Plaza',
    ciudad: 'Huancayo',
    latitud: -12.0683,
    longitud: -75.2100,
    telefono: '+51 1 610 0000',
    sitio_web: 'https://www.cinemark-peru.com',
  },
  {
    id: 3,
    nombre: 'Cineplanet San Miguel',
    cadena: 'Cineplanet',
    direccion: 'Av. La Marina 2000, C.C. Plaza San Miguel',
    ciudad: 'Lima',
    latitud: -12.0772,
    longitud: -77.0805,
    telefono: '+51 1 624 9500',
    sitio_web: 'https://www.cineplanet.com.pe',
  },
  {
    id: 4,
    nombre: 'Cinépolis Plaza Norte',
    cadena: 'Cinépolis',
    direccion: 'Av. Alfredo Mendiola 1400, C.C. Plaza Norte',
    ciudad: 'Lima',
    latitud: -12.0064,
    longitud: -77.0592,
    telefono: '+51 1 219 4000',
    sitio_web: 'https://www.cinepolis.com.pe',
  },
  {
    id: 5,
    nombre: 'Cine Star Huánuco',
    cadena: 'Cine Star',
    direccion: 'Jr. General Prado 645',
    ciudad: 'Huánuco',
    latitud: -9.9285,
    longitud: -76.2410,
    telefono: '+51 1 719 3000',
    sitio_web: 'https://www.cinestar.com.pe',
  },
];

const LOCAL_MOCK_SHOWTIMES: SupabaseShowtimeRow[] = [
  // Dune 2 (693134)
  { id: 1, tmdb_movie_id: 693134, cine_id: 1, hora: '14:30', sala: 'Sala XD Laser', formato: 'XD', precio: 26.0 },
  { id: 2, tmdb_movie_id: 693134, cine_id: 1, hora: '18:00', sala: 'Sala XD Laser', formato: 'XD', precio: 26.0 },
  { id: 3, tmdb_movie_id: 693134, cine_id: 1, hora: '21:30', sala: 'Sala 1', formato: '2D', precio: 19.0 },
  { id: 4, tmdb_movie_id: 693134, cine_id: 2, hora: '16:45', sala: 'Sala 1', formato: '2D', precio: 18.0 },
  { id: 5, tmdb_movie_id: 693134, cine_id: 2, hora: '20:15', sala: 'Sala XD Prime', formato: 'XD', precio: 28.0 },
  { id: 6, tmdb_movie_id: 693134, cine_id: 3, hora: '19:00', sala: 'Sala XD', formato: 'XD', precio: 26.0 },
  // Intensamente 2 (1022789)
  { id: 7, tmdb_movie_id: 1022789, cine_id: 2, hora: '15:20', sala: 'Sala 2', formato: '2D', precio: 16.0 },
  { id: 8, tmdb_movie_id: 1022789, cine_id: 2, hora: '17:40', sala: 'Sala 3 Real3D', formato: '3D', precio: 22.0 },
  { id: 9, tmdb_movie_id: 1022789, cine_id: 1, hora: '16:30', sala: 'Sala 2', formato: '2D', precio: 17.0 },
  // Deadpool & Wolverine (533535)
  { id: 10, tmdb_movie_id: 533535, cine_id: 1, hora: '19:10', sala: 'Sala 3', formato: '2D', precio: 18.0 },
  { id: 11, tmdb_movie_id: 533535, cine_id: 3, hora: '21:00', sala: 'Sala XD', formato: '3D', precio: 24.0 },
  // Dune 1 (438631)
  { id: 12, tmdb_movie_id: 438631, cine_id: 1, hora: '18:30', sala: 'Sala XD Laser', formato: 'XD', precio: 24.0 },
  { id: 13, tmdb_movie_id: 438631, cine_id: 2, hora: '19:30', sala: 'Sala Prime', formato: '2D', precio: 25.0 },
  // La Sustancia (933260)
  { id: 14, tmdb_movie_id: 933260, cine_id: 1, hora: '22:30', sala: 'Sala 5', formato: '2D', precio: 20.0 },
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
   * Expone el cliente de Supabase (por ejemplo para Supabase Auth).
   */
  public getClient(): SupabaseClient | null {
    this.initializeClient();
    return this.client;
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
            { id: 991, tmdb_movie_id: tmdbMovieId, cine_id: 1, hora: '16:00', sala: 'Sala 1', formato: '2D', precio: 18.0 },
            { id: 992, tmdb_movie_id: tmdbMovieId, cine_id: 1, hora: '19:30', sala: 'Sala XD Laser', formato: 'XD', precio: 25.0 },
            { id: 993, tmdb_movie_id: tmdbMovieId, cine_id: 2, hora: '18:15', sala: 'Sala 3', formato: '2D', precio: 17.0 },
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
