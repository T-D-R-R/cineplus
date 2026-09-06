import { Search, Flame, Trophy, Calendar, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMovies, type MovieCategory } from '../hooks/useMovies';
import { MovieGrid } from '../components/movie/MovieGrid';

export function HomePage() {
  const {
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
    isSearching,
  } = useMovies('now_playing');

  const categories: { key: MovieCategory; label: string; icon: typeof Flame }[] = [
    { key: 'now_playing', label: '🔥 En Cartelera', icon: Flame },
    { key: 'top_rated', label: '🏆 Más Valoradas', icon: Trophy },
    { key: 'upcoming', label: '📅 Próximos Estrenos', icon: Calendar },
  ];

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden cinema-gradient border border-amber-500/20 p-6 sm:p-12 text-center shadow-2xl">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> ESTRENOS Y CRÍTICAS EN VIVO
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Descubre el Mejor Cine en <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-500">CinePlus</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Explora miles de películas directamente desde TMDb, consulta salas y horarios cercanos en el mapa interactivo y comparte tu reseña en nuestra base de datos en tiempo real.
          </p>

          {/* Barra de Búsqueda Instantánea con Debounce */}
          <div className="max-w-xl mx-auto relative pt-2">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por título (ej: Dune, Deadpool, Avatar)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 shadow-xl transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 p-1 text-slate-400 hover:text-white"
                  title="Limpiar búsqueda"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {isSearching && (
              <p className="text-xs text-amber-400/90 mt-2 text-left font-medium">
                Mostrando resultados en tiempo real para: "{searchQuery}"
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Selector de Categorías (Pestañas) */}
      {!isSearching && (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map(({ key, label }) => {
            const isSelected = category === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setCategory(key);
                  setPage(1);
                }}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                    : 'glass-panel text-slate-300 hover:text-white hover:bg-slate-850'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* Encabezado de Sección */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {isSearching
              ? `Resultados para "${searchQuery}"`
              : category === 'top_rated'
              ? '🏆 Películas Mejor Valoradas'
              : category === 'upcoming'
              ? '📅 Próximos Estrenos Oficiales'
              : '🎬 Cartelera en Vivo'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isSearching
              ? 'Datos sincronizados en tiempo real con TMDb'
              : 'Actualizado directamente con la base de datos global de cine'}
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-lg glass-panel text-slate-300">
          Página {page} de {totalPages}
        </span>
      </div>

      {/* Mensaje de Error si ocurre */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-semibold text-center">
          {error}
        </div>
      )}

      {/* Cuadrícula de Películas */}
      <MovieGrid movies={movies} loading={loading} />

      {/* Controles de Paginación */}
      {!loading && movies.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-6">
          <button
            disabled={page <= 1}
            onClick={() => {
              setPage((p: number) => Math.max(1, p - 1));
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-xl glass-panel text-xs font-bold text-slate-300 hover:text-white hover:border-amber-500/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>

          <span className="text-xs font-bold text-amber-400 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
            {page} / {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => {
              setPage((p: number) => p + 1);
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-xl glass-panel text-xs font-bold text-slate-300 hover:text-white hover:border-amber-500/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            Siguiente <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
