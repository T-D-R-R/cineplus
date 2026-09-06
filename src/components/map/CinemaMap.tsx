import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Clock, ExternalLink, Sparkles, Building2, Ticket } from 'lucide-react';
import { Cinema } from '../../domain/Cinema';
import { Showtime } from '../../domain/Showtime';
import { createMapProvider, type BaseMapProvider, type CinemaWithShowtimes } from '../../services/map';
import { isGoogleMapsConfigured } from '../../core/config';

interface CinemaMapProps {
  cinemas: CinemaWithShowtimes[];
  userLocation: { lat: number; lng: number };
  loading?: boolean;
  onRefreshLocation?: () => void;
}

export function CinemaMap({
  cinemas,
  userLocation,
  loading = false,
  onRefreshLocation,
}: CinemaMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const providerRef = useRef<BaseMapProvider | null>(null);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);

  const googleMapsOk = isGoogleMapsConfigured();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Crear proveedor según configuración (LSP)
    const provider = createMapProvider();
    providerRef.current = provider;

    let isMounted = true;

    provider
      .initialize(mapContainerRef.current, userLocation, 12)
      .then(() => {
        if (!isMounted) return;
        provider.renderUserMarker(userLocation.lat, userLocation.lng);
        provider.renderCinemaMarkers(cinemas, (cinema) => {
          setSelectedCinema(cinema);
        });
      })
      .catch((err) => {
        console.warn('Error inicializando proveedor de mapa:', err);
      });

    return () => {
      isMounted = false;
      provider.destroy();
      providerRef.current = null;
    };
  }, [userLocation, cinemas]);

  // Actualizar marcadores si la lista cambia
  useEffect(() => {
    if (providerRef.current) {
      providerRef.current.renderCinemaMarkers(cinemas, (cinema) => {
        setSelectedCinema(cinema);
      });
    }
  }, [cinemas]);

  return (
    <section className="space-y-4" id="seccion-cines">
      {/* Cabecera de la Sección */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-rose-500" />
            <h3 className="text-xl font-bold text-white">Cines Cercanos en Tiempo Real</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Salas comerciales reales detectadas automáticamente según tus coordenadas GPS
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Badge de Modo */}
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-semibold border inline-flex items-center gap-1 ${
              googleMapsOk
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            {googleMapsOk ? 'Google Maps SDK' : 'GPS Dinámico Activo'}
          </span>

          {onRefreshLocation && (
            <button
              onClick={onRefreshLocation}
              className="px-3 py-1 rounded-xl glass-panel text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Navigation className="w-3 h-3 text-sky-400" /> Actualizar GPS
            </button>
          )}
        </div>
      </div>

      {/* Contenedor del Mapa */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lienzo del Mapa (2 columnas) */}
        <div className="lg:col-span-2 h-[380px] sm:h-[420px] rounded-3xl overflow-hidden glass-panel border border-slate-800 relative shadow-2xl">
          {loading && (
            <div className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center text-amber-400 text-xs font-semibold">
              Buscando cines cercanos vía GPS...
            </div>
          )}
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>

        {/* Lista Lateral de Cines (1 columna) */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3 h-[380px] sm:h-[420px] flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-400" /> Sedes Detectadas
            </span>
            <span className="text-xs font-semibold text-slate-400">{cinemas.length} cines</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {cinemas.map(({ cinema, showtimes, distanceKm }) => {
              const isSelected = selectedCinema?.id === cinema.id;

              return (
                <div
                  key={cinema.id}
                  onClick={() => setSelectedCinema(cinema)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/50 shadow-md shadow-amber-500/5'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-bold text-white text-sm truncate">{cinema.name}</h4>
                        {cinema.chain && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            {cinema.chain}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-xs line-clamp-1 mt-0.5">
                        {cinema.address} {cinema.city ? `• ${cinema.city}` : ''}
                      </p>
                    </div>
                    {distanceKm !== undefined && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-400 border border-sky-500/30 shrink-0">
                        {distanceKm} km
                      </span>
                    )}
                  </div>

                  {/* Horarios */}
                  <div>
                    <div className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" /> Funciones sugeridas:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {showtimes.map((st: Showtime) => (
                        <span
                          key={st.id}
                          className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold"
                          title={`${st.room} - ${st.format} (${st.language})`}
                        >
                          {st.time}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Acciones: Cartelera Oficial y Cómo llegar */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <a
                      href={cinema.getOfficialBillboardUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 cursor-pointer"
                      title={`Ver cartelera oficial y comprar entradas en ${cinema.chain || cinema.name}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Ticket className="w-3 h-3 text-amber-400" />
                      <span>Comprar Entradas</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>

                    <a
                      href={cinema.getGoogleMapsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Cómo llegar</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
