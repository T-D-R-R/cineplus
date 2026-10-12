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
  geminiApiKey: string;
  openrouterApiKey: string;
  grokApiKey: string;
}

const STORAGE_KEY = 'cineplus_user_config';

function getEnv(key: string): string {
  try {
    // Entorno Vite / Navegador
    if (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: Record<string, string> })?.env) {
      const val = (import.meta as unknown as { env: Record<string, string> }).env[key];
      if (val) return val;
    }
  } catch {
    // Entorno no-Vite
  }

  try {
    // Entorno Node / Scripts
    const nodeProcess = (globalThis as unknown as { process?: { env?: Record<string, string> } }).process;
    if (nodeProcess?.env?.[key]) {
      return nodeProcess.env[key] as string;
    }
  } catch {
    // Ignorar
  }

  return '';
}

function getStoredOverrides(): Partial<Record<'tmdbApiKey' | 'supabaseUrl' | 'supabaseAnonKey' | 'googleMapsApiKey' | 'geminiApiKey' | 'openrouterApiKey' | 'grokApiKey', string>> {
  try {
    if (typeof localStorage === 'undefined') return {};
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
  geminiApiKey?: string;
  openrouterApiKey?: string;
  grokApiKey?: string;
}): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const current = getStoredOverrides();
    const updated = { ...current, ...overrides };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error guardando configuración en localStorage:', error);
  }
}

export function clearConfigOverrides(): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error limpiando configuración de localStorage:', error);
  }
}

export function getConfig(): AppConfig {
  const overrides = getStoredOverrides();

  const tmdbApiKey = overrides.tmdbApiKey?.trim() || getEnv('VITE_TMDB_API_KEY');
  const supabaseUrl = overrides.supabaseUrl?.trim() || getEnv('VITE_SUPABASE_URL');
  const supabaseAnonKey = overrides.supabaseAnonKey?.trim() || getEnv('VITE_SUPABASE_ANON_KEY') || getEnv('VITE_SUPABASE_PUBLISHABLE_KEY');
  const googleMapsApiKey = overrides.googleMapsApiKey?.trim() || getEnv('VITE_GOOGLE_MAPS_API_KEY');
  // Las API Keys de LLM se ejecutan exclusivamente en el Backend Serverless (/api/chat)
  // por máxima seguridad, evitando que viajen al navegador o queden expuestas en el bundle.
  const geminiApiKey = overrides.geminiApiKey?.trim() || '';
  const openrouterApiKey = overrides.openrouterApiKey?.trim() || '';
  const grokApiKey = overrides.grokApiKey?.trim() || '';

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
    geminiApiKey,
    openrouterApiKey,
    grokApiKey,
  };
}

export const isTmdbConfigured = (): boolean => Boolean(getConfig().tmdbApiKey);
export const isSupabaseConfigured = (): boolean => Boolean(getConfig().supabaseUrl && getConfig().supabaseAnonKey);
export const isGoogleMapsConfigured = (): boolean => Boolean(getConfig().googleMapsApiKey);
export const isGeminiConfigured = (): boolean => true; // Gestionado por el backend seguro /api/chat
export const isOpenRouterConfigured = (): boolean => true; // Gestionado por el backend seguro /api/chat
export const isGrokConfigured = (): boolean => Boolean(getConfig().grokApiKey);

