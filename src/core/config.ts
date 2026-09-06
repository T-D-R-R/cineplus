/**
 * CinePlus - Configuración Centralizada
 * Lee variables de entorno (.env.local) con soporte de sobreescritura dinámica en localStorage.
 */

export interface AppConfig {
  tmdbApiKey: string;
  tmdbBaseUrl: string;
  tmdbImageBase: {
    poster: string;
    backdrop: string;
    profile: string;
  };
  supabaseUrl: string;
  supabaseAnonKey: string;
  googleMapsApiKey: string;
}

const STORAGE_KEY = 'cineplus_user_config';

function getStoredOverrides(): Partial<Record<'tmdbApiKey' | 'supabaseUrl' | 'supabaseAnonKey' | 'googleMapsApiKey', string>> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveConfigOverrides(overrides: {
  tmdbApiKey?: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  googleMapsApiKey?: string;
}): void {
  try {
    const current = getStoredOverrides();
    const updated = { ...current, ...overrides };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error guardando configuración en localStorage:', error);
  }
}

export function clearConfigOverrides(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error limpiando configuración de localStorage:', error);
  }
}

export function getConfig(): AppConfig {
  const overrides = getStoredOverrides();

  const tmdbApiKey = overrides.tmdbApiKey?.trim() || import.meta.env.VITE_TMDB_API_KEY || '';
  const supabaseUrl = overrides.supabaseUrl?.trim() || import.meta.env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = overrides.supabaseAnonKey?.trim() || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  const googleMapsApiKey = overrides.googleMapsApiKey?.trim() || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  return {
    tmdbApiKey,
    tmdbBaseUrl: 'https://api.themoviedb.org/3',
    tmdbImageBase: {
      poster: 'https://image.tmdb.org/t/p/w500',
      backdrop: 'https://image.tmdb.org/t/p/original',
      profile: 'https://image.tmdb.org/t/p/w185',
    },
    supabaseUrl,
    supabaseAnonKey,
    googleMapsApiKey,
  };
}

export const isTmdbConfigured = (): boolean => Boolean(getConfig().tmdbApiKey);
export const isSupabaseConfigured = (): boolean => Boolean(getConfig().supabaseUrl && getConfig().supabaseAnonKey);
export const isGoogleMapsConfigured = (): boolean => Boolean(getConfig().googleMapsApiKey);
