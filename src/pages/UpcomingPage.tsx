import { Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import { MovieGrid } from '../components/movie/MovieGrid';

export function UpcomingPage() {
  const { movies, loading, error } = useMovies('upcoming');

  return (
    <div className="space-y-8">
      {/* Cabecera */}
      <div className="space-y-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Cartelera
        </Link>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">Próximos Estrenos</h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Los lanzamientos cinematográficos más esperados que llegarán próximamente a las salas
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-semibold text-center">
          {error}
        </div>
      )}

      {/* Cuadrícula */}
      <MovieGrid movies={movies} loading={loading} />
    </div>
  );
}
