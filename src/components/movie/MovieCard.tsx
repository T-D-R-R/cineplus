import { Link } from 'react-router-dom';
import { Star, Calendar, ArrowRight, Clock } from 'lucide-react';
import { Movie } from '../../domain/Movie';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="group relative glass-panel rounded-2xl overflow-hidden border border-slate-800/80 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col h-full">
      {/* Contenedor del Póster con Efecto Zoom */}
      <Link to={`/pelicula/${movie.id}`} className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900 block">
        <img
          src={movie.getPosterUrl('w500')}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Fallback elegante
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60';
          }}
        />

        {/* Badge de Puntuación */}
        <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-amber-400 font-bold text-xs flex items-center gap-1 shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{movie.voteAverage > 0 ? movie.voteAverage.toFixed(1) : 'S/C'}</span>
        </div>

        {/* Badge de Año */}
        <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-slate-300 text-xs font-semibold flex items-center gap-1">
          <Calendar className="w-3 h-3 text-slate-400" />
          <span>{movie.getYear()}</span>
        </div>

        {/* Overlay hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
            Ver Ficha y Cines <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>

      {/* Información de la Película */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <Link to={`/pelicula/${movie.id}`}>
            <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-amber-400 transition-colors">
              {movie.title}
            </h3>
          </Link>

          {/* Badges de Géneros */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {movie.genres.slice(0, 2).map((g) => (
                <span
                  key={g.id}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/50"
                >
                  {g.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Botón de Acción */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
          {movie.runtime && movie.runtime > 0 ? (
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-500/70" />
              {movie.getFormattedRuntime()}
            </span>
          ) : (
            <span />
          )}
          <Link
            to={`/pelicula/${movie.id}`}
            className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 text-xs font-bold transition-colors border border-amber-500/20 inline-flex items-center gap-1 ml-auto"
          >
            Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}

