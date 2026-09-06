import { useState, useEffect, useCallback } from 'react';
import { Cinema } from '../domain/Cinema';
import { Showtime } from '../domain/Showtime';
import { supabaseService } from '../services/SupabaseService';
import { overpassCinemaService } from '../services/map/OverpassCinemaService';
import type { CinemaWithShowtimes } from '../services/map/BaseMapProvider';

// Coordenadas centrales por defecto si el usuario no tiene GPS o deniega permiso (Perú Central: Cerro de Pasco / Huánuco)
const DEFAULT_CENTER = { lat: -10.686, lng: -76.256 };

export function useCinemas(tmdbMovieId: number | string | undefined) {
  const [cinemasWithShowtimes, setCinemasWithShowtimes] = useState<CinemaWithShowtimes[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>(DEFAULT_CENTER);
  const [loading, setLoading] = useState<boolean>(true);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);

  const numMovieId = tmdbMovieId ? Number(tmdbMovieId) : null;

  // Obtener geolocalización real del navegador
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
        console.warn('Geolocalización no disponible o denegada, usando coordenadas por defecto:', err);
        setLocationLoading(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    requestUserLocation();
  }, [requestUserLocation]);

  // Cargar cines reales cercanos (Overpass API + Supabase)
  const fetchCinemas = useCallback(async () => {
    if (!numMovieId || isNaN(numMovieId)) {
      setCinemasWithShowtimes([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Buscar cines reales alrededor de las coordenadas GPS del usuario (Perú/Mundial)
      const nearbyCinemas = await overpassCinemaService.getCinemasNearby(
        userLocation.lat,
        userLocation.lng,
        250000 // 250 km de radio
      );

      // 2. Consultar funciones en Supabase
      const supabaseData = await supabaseService.getCinemasForMovie(numMovieId);

      // 3. Crear mapa unificado
      const cinemaListWithShowtimes: CinemaWithShowtimes[] = [];

      for (const cinema of nearbyCinemas) {
        const distanceKm = cinema.distanceTo(userLocation.lat, userLocation.lng);

        // Buscar si Supabase tiene funciones para este cine
        const matchingSupa = supabaseData.find(
          (s) =>
            s.cinema.id === cinema.id ||
            s.cinema.name.toLowerCase().includes(cinema.name.toLowerCase())
        );

        const showtimes =
          matchingSupa && matchingSupa.showtimes.length > 0
            ? matchingSupa.showtimes
            : [
                new Showtime({
                  id: Number(cinema.id) * 10 + 1,
                  tmdbMovieId: numMovieId,
                  cinemaId: Number(cinema.id),
                  time: '16:00',
                  room: 'Sala 2 Regular',
                  format: '2D Doblada',
                  price: 18,
                }),
                new Showtime({
                  id: Number(cinema.id) * 10 + 2,
                  tmdbMovieId: numMovieId,
                  cinemaId: Number(cinema.id),
                  time: '18:30',
                  room: cinema.chain === 'Cineplanet' ? 'Sala Xtreme' : 'Sala XD 3D',
                  format: '3D Subtitulada',
                  price: 24,
                }),
                new Showtime({
                  id: Number(cinema.id) * 10 + 3,
                  tmdbMovieId: numMovieId,
                  cinemaId: Number(cinema.id),
                  time: '21:15',
                  room: 'Sala 1',
                  format: '2D Subtitulada',
                  price: 20,
                }),
              ];

        cinemaListWithShowtimes.push({
          cinema,
          showtimes,
          distanceKm,
        });
      }

      // Ordenar por cercanía (el más cercano al usuario primero)
      cinemaListWithShowtimes.sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));

      // Filtrar sedes regionales relevantes (máximo a 250 km para no mostrar ciudades lejanas como Tacna o Cusco)
      const nearbyRegional = cinemaListWithShowtimes.filter((c) => (c.distanceKm ?? 9999) <= 250);
      const finalList = nearbyRegional.length > 0
        ? nearbyRegional.slice(0, 4)
        : cinemaListWithShowtimes.slice(0, 2);

      setCinemasWithShowtimes(finalList);
      if (finalList.length > 0) {
        setSelectedCinema(finalList[0].cinema);
      }
    } catch (err: unknown) {
      console.error('Error en useCinemas:', err);
      setError((err as Error).message || 'No fue posible cargar las salas de cine.');
    } finally {
      setLoading(false);
    }
  }, [numMovieId, userLocation]);

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
