import { Star, Clock, Calendar, Play, MapPin, DollarSign, Clapperboard } from 'lucide-react';
import { Movie } from '../../domain/Movie';

interface MovieHeroProps {
  movie: Movie;
  onScrollToTrailer?: () => void;
  onScrollToCinemas?: () => void;
}

export function MovieHero({ movie, onScrollToTrailer, onScrollToCinemas }: MovieHeroProps) {
  return (
    <section className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
      {/* Imagen Backdrop de Fondo con Degradado */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.getBackdropUrl()}
          alt={movie.title}
          className="w-full h-full object-cover object-center opacity-25 filter blur-xs scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
      </div>

      {/* Contenido en Primer Plano */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
          {/* Póster */}
          <div className="w-56 sm:w-64 lg:w-72 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 aspect-[2/3] bg-slate-950">
            <img
              src={movie.getPosterUrl('w500')}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Información Principal */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              {movie.tagline && (
                <p className="text-amber-400 text-sm font-semibold tracking-wider uppercase">
                  "{movie.tagline}"
                </p>
              )}
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {movie.title}
              </h1>
            </div>

            {/* Badges y Metadatos */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs sm:text-sm">
              {/* Calificación */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{movie.voteAverage.toFixed(1)} / 10</span>
                <span className="text-[11px] text-slate-400 font-normal">({movie.voteCount} votos)</span>
              </div>

              {/* Año */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel text-slate-300 font-medium">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{movie.getYear()}</span>
              </div>

              {/* Duración */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel text-slate-300 font-medium">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{movie.getFormattedRuntime()}</span>
              </div>

              {/* Presupuesto */}
              {movie.budget && movie.budget > 0 ? (
                <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl glass-panel text-emerald-400 font-medium">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>{movie.getFormattedBudget()}</span>
                </div>
              ) : null}
            </div>

            {/* Géneros */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/60"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Sinopsis */}
            <div className="space-y-2 max-w-3xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Sinopsis Oficial</h4>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {/* Director */}
            {movie.director && (
              <div className="text-xs text-slate-400 flex items-center justify-center lg:justify-start gap-2">
                <Clapperboard className="w-4 h-4 text-amber-400" />
                <span>Director: <strong className="text-white">{movie.director}</strong></span>
              </div>
            )}

            {/* Botones de Acción */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              {movie.trailerKey && (
                <button
                  onClick={onScrollToTrailer}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-slate-950" /> Ver Tráiler Oficial
                </button>
              )}

              <button
                onClick={onScrollToCinemas}
                className="px-6 py-3 rounded-xl glass-panel hover:bg-slate-800/80 text-slate-200 font-semibold text-sm transition-all border border-slate-700 flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-rose-400" /> Ver Cines y Horarios
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
