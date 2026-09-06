import { Film } from 'lucide-react';
import { Movie } from '../../domain/Movie';
import { MovieCard } from './MovieCard';
import { MovieGridSkeleton } from '../common/LoadingSkeleton';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  emptyMessage?: string;
}

export function MovieGrid({
  movies,
  loading = false,
  emptyMessage = 'No se encontraron películas para este criterio.',
}: MovieGridProps) {
  if (loading) {
    return <MovieGridSkeleton count={10} />;
  }

  if (movies.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 my-8 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
          <Film className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white">Sin resultados</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
