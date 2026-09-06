import { Users, User } from 'lucide-react';
import type { Actor } from '../../domain/types';
import { getConfig } from '../../core/config';

interface CastListProps {
  cast: Actor[];
}

export function CastList({ cast }: CastListProps) {
  if (!cast || cast.length === 0) return null;

  const config = getConfig();

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-amber-400" />
        <h3 className="text-xl font-bold text-white">Reparto Principal</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {cast.map((actor) => (
          <div
            key={actor.id}
            className="glass-panel p-3 rounded-xl border border-slate-800/80 flex items-center gap-3 hover:border-slate-700 transition-colors"
          >
            {/* Foto del Actor */}
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-slate-800 flex items-center justify-center border border-slate-700">
              {actor.profilePath ? (
                <img
                  src={`${config.tmdbImageBase.profile}${actor.profilePath}`}
                  alt={actor.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <User className="w-5 h-5 text-slate-500" />
              )}
            </div>

            {/* Nombre y Personaje */}
            <div className="min-w-0">
              <h4 className="font-semibold text-white text-xs sm:text-sm truncate">{actor.name}</h4>
              <p className="text-amber-400/90 text-[11px] truncate">{actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
