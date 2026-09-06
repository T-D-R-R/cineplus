import { Clapperboard, Heart, Film, Database, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/70 py-12 mt-16 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo y descripción */}
          <div className="space-y-2 text-center md:text-left">
            <Link to="/" className="inline-flex items-center gap-2.5 text-xl font-black text-white">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-slate-950">
                <Clapperboard className="w-5 h-5" />
              </div>
              <span>Cine<span className="text-amber-400">Plus</span></span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm">
              Plataforma web dinámica de consulta de cine, reseñas en vivo y localización de salas con horarios.
            </p>
          </div>

          {/* Enlaces de Navegación */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-300">
            <Link to="/" className="hover:text-amber-400 transition-colors">Cartelera</Link>
            <Link to="/top-rated" className="hover:text-amber-400 transition-colors">Top 10</Link>
            <Link to="/estrenos" className="hover:text-amber-400 transition-colors">Próximos Estrenos</Link>
            <a href="https://developer.themoviedb.org" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
              TMDb Docs ↗
            </a>
          </div>
        </div>

        {/* Créditos de APIs y Atribuciones */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-amber-400" /> TMDb API
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" /> Supabase PostgreSQL
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> Google Maps
            </span>
          </div>

          <p className="flex items-center gap-1 text-slate-400">
            Hecho con <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> para los amantes del cine © 2026 CinePlus.
          </p>
        </div>
      </div>
    </footer>
  );
}
