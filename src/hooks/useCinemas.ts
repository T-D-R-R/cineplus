import { useState, useEffect, useCallback } from 'react';
import { Cinema } from '../domain/Cinema';
import { supabaseService } from '../services/SupabaseService';
import type { CinemaWithShowtimes } from '../services/map/BaseMapProvider';

// Coordenadas centrales por defecto si el usuario no tiene GPS o deniega permiso
const DEFAULT_CENTER = { lat: 4.69578, lng: -74.08643 };

export function useCinemas(tmdbMovieId: number | string | undefined) {
  const [cinemasWithShowtimes, setCinemasWithShowtimes] = useState<CinemaWithShowtimes[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>(DEFAULT_CENTER);
  const [loading, setLoading] = useState<boolean>(true);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);

  const numMovieId = tmdbMovieId ? Number(tmdbMovieId) : null;

  // Obtener geolocalización del navegador
  const requestUserLocation = useCallback(() => {
    if (!navigator.geolocation) return;

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);
        setLocationLoading(false);
      },
      (err) => {
        console.warn('Geolocalización no disponible o denegada, usando coordenadas centrales:', err);
        setLocationLoading(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    requestUserLocation();
  }, [requestUserLocation]);

  // Cargar cines y funciones desde Supabase
  const fetchCinemas = useCallback(async () => {
    if (!numMovieId || isNaN(numMovieId)) {
      setCinemasWithShowtimes([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await supabaseService.getCinemasForMovie(numMovieId);

      // Calcular distancia a cada cine y ordenar por cercanía
      const mapped: CinemaWithShowtimes[] = data.map(({ cinema, showtimes }) => {
        const distanceKm = cinema.distanceTo(userLocation.lat, userLocation.lng);
        return {
          cinema,
          showtimes,
          distanceKm,
        };
      });

      mapped.sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));

      setCinemasWithShowtimes(mapped);
      if (mapped.length > 0 && !selectedCinema) {
        setSelectedCinema(mapped[0].cinema);
      }
    } catch (err: unknown) {
      console.error('Error en useCinemas:', err);
      setError((err as Error).message || 'No fue posible cargar las salas de cine.');
    } finally {
      setLoading(false);
    }
  }, [numMovieId, userLocation, selectedCinema]);

  useEffect(() => {
    fetchCinemas();
  }, [fetchCinemas]);

  return {
    cinemasWithShowtimes,
    userLocation,
    loading,
    locationLoading,
    error,
    selectedCinema,
    setSelectedCinema,
    refreshLocation: requestUserLocation,
    refreshCinemas: fetchCinemas,
  };
}
