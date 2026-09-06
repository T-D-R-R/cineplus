import { useState, useEffect, useCallback, useRef } from 'react';
import { Movie } from '../domain/Movie';
import { tmdbService } from '../services/TmdbService';

export type MovieCategory = 'now_playing' | 'top_rated' | 'upcoming';

export function useMovies(initialCategory: MovieCategory = 'now_playing') {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [category, setCategory] = useState<MovieCategory>(initialCategory);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Debounce para la búsqueda en tiempo real (350ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
      setPage(1); // Reiniciar a página 1 al buscar
    }, 350);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const activeRequestRef = useRef<number>(0);

  const fetchMovies = useCallback(async () => {
    const requestId = ++activeRequestRef.current;
    setLoading(true);
    setError(null);

    try {
      if (debouncedQuery) {
        const result = await tmdbService.searchMovies(debouncedQuery, page);
        if (requestId === activeRequestRef.current) {
          setMovies(result.movies);
          setTotalPages(Math.min(result.totalPages, 20)); // Limitar para UX
        }
      } else {
        if (category === 'top_rated') {
          const result = await tmdbService.getTopRated(page);
          if (requestId === activeRequestRef.current) {
            setMovies(result);
            setTotalPages(10);
          }
        } else if (category === 'upcoming') {
          const result = await tmdbService.getUpcoming(page);
          if (requestId === activeRequestRef.current) {
            setMovies(result);
            setTotalPages(10);
          }
        } else {
          const result = await tmdbService.getNowPlaying(page);
          if (requestId === activeRequestRef.current) {
            setMovies(result.movies);
            setTotalPages(Math.min(result.totalPages, 20));
          }
        }
      }
    } catch (err: unknown) {
      if (requestId === activeRequestRef.current) {
        console.error('Error en useMovies:', err);
        setError((err as Error).message || 'No fue posible cargar las películas.');
      }
    } finally {
      if (requestId === activeRequestRef.current) {
        setLoading(false);
      }
    }
  }, [debouncedQuery, category, page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return {
    movies,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    page,
    setPage,
    totalPages,
    refresh: fetchMovies,
    isSearching: Boolean(debouncedQuery),
  };
}
