import { useState, useEffect, useCallback } from 'react';
import { Movie } from '../domain/Movie';
import { tmdbService } from '../services/TmdbService';

export function useMovieDetail(movieId: number | string | undefined) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!movieId) {
      setError('ID de película no especificado.');
      setLoading(false);
      return;
    }

    const numId = Number(movieId);
    if (isNaN(numId) || numId <= 0) {
      setError('ID de película inválido.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await tmdbService.getMovieDetails(numId);
      setMovie(result);
    } catch (err: unknown) {
      console.error('Error en useMovieDetail:', err);
      setError((err as Error).message || 'No fue posible cargar los detalles de la película.');
      setMovie(null);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    movie,
    loading,
    error,
    refresh: fetchDetail,
  };
}
