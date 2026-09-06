import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clapperboard, Flame, Trophy, Calendar, Settings, Sparkles, Menu, X } from 'lucide-react';
import { ConfigModal } from './ConfigModal';
import { isTmdbConfigured, isSupabaseConfigured } from '../../core/config';

export function Navbar() {
  const location = useLocation();
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Cartelera', icon: Flame },
    { to: '/top-rated', label: 'Top 10', icon: Trophy },
    { to: '/estrenos', label: 'Próximos Estrenos', icon: Calendar },
  ];

  const tmdbOk = isTmdbConfigured();
  const supabaseOk = isSupabaseConfigured();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-xl sm:text-2xl font-black text-white hover:text-amber-400 transition-colors shrink-0"
          >
            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-slate-950 shadow-md shadow-amber-500/20">
              <Clapperboard className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span>
              Cine<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Plus</span>
            </span>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Estado de APIs y Botón de Ajustes */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Badges de conexión */}
            <div className="hidden lg:flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                  tmdbOk
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400'
                }`}
                title={tmdbOk ? 'TMDb API Conectada' : 'TMDb en Modo Demo'}
              >
                <Sparkles className="w-3 h-3" /> TMDb {tmdbOk ? 'Live' : 'Demo'}
              </span>

              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                  supabaseOk
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400'
                }`}
                title={supabaseOk ? 'Supabase Conectado' : 'Supabase en Modo Local'}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${supabaseOk ? 'bg-emerald-400' : 'bg-slate-400'}`} />
                Supabase {supabaseOk ? 'Sync' : 'Local'}
              </span>
            </div>

            {/* Botón de Configuración */}
            <button
              onClick={() => setIsConfigOpen(true)}
              className="p-2 sm:p-2.5 rounded-xl glass-panel text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all cursor-pointer"
              title="Ajustes de Credenciales y APIs"
              aria-label="Abrir configuración"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Toggle Menú Móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl glass-panel text-slate-300 hover:text-white"
              aria-label="Menú de navegación"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-2 animate-in slide-in-from-top-2">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Modal de Configuración */}
      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onConfigChanged={() => window.location.reload()}
      />
    </>
  );
}
