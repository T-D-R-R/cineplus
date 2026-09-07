import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Clock, ExternalLink, Sparkles, Building2, Ticket } from 'lucide-react';
import { Cinema } from '../../domain/Cinema';
import { Showtime } from '../../domain/Showtime';
import { createMapProvider, DemoMapsProvider, GoogleMapsProvider, type BaseMapProvider, type CinemaWithShowtimes } from '../../services/map';
import { isGoogleMapsConfigured } from '../../core/config';
import { getPeruvianCityFromCoords } from '../../core/utils';

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

  const [mapReady, setMapReady] = useState(false);

  const googleMapsOk = isGoogleMapsConfigured();
  const userCity = getPeruvianCityFromCoords(userLocation.lat, userLocation.lng);

  // 1. Inicializar el mapa UNA SOLA VEZ al montar el contenedor
  useEffect(() => {
    if (!mapContainerRef.current) return;

    let isCancelled = false;
    const provider = createMapProvider();
    providerRef.current = provider;

    const activateFallback = (reason: string) => {
      console.warn(`Activando panel interactivo de respaldo (${reason})`);
      if (isCancelled || !mapContainerRef.current) return;
      const fallback = new DemoMapsProvider();
      providerRef.current = fallback;
      fallback
        .initialize(mapContainerRef.current, userLocation, 12)
        .then(() => {
          if (isCancelled) return;
          setMapReady(true);
          fallback.renderUserMarker(userLocation.lat, userLocation.lng);
          if (cinemas.length > 0) {
            fallback.renderCinemaMarkers(cinemas, (c: Cinema) => {
              setSelectedCinema(c);
            });
          }
        });
    };

    // Si es Google Maps, interceptar cuando la API de Google reporta cuota agotada
    if (provider instanceof GoogleMapsProvider) {
      provider.setOnAuthFailure(() => {
        activateFallback('Cuota diaria de Google Maps agotada');
      });
    }

    provider
      .initialize(mapContainerRef.current, userLocation, 12)
      .then(() => {
        if (isCancelled) return;
        setMapReady(true);
        provider.renderUserMarker(userLocation.lat, userLocation.lng);
        if (cinemas.length > 0) {
          provider.renderCinemaMarkers(cinemas, (cinema: Cinema) => {
            setSelectedCinema(cinema);
          });
        }
      })
      .catch((err) => {
        activateFallback(err?.message || 'Fallo de inicialización de Google Maps');
      });

    return () => {
      isCancelled = true;
      provider.destroy();
      providerRef.current = null;
      setMapReady(false);
    };
  }, []); // Montaje único

  // 2. Actualizar marcador del usuario cuando el GPS detecta nuevas coordenadas
  useEffect(() => {
    if (mapReady && providerRef.current) {
      providerRef.current.renderUserMarker(userLocation.lat, userLocation.lng);
      providerRef.current.centerOn(userLocation.lat, userLocation.lng);
    }
  }, [mapReady, userLocation.lat, userLocation.lng]);

  // 3. Actualizar marcadores de cines cuando se cargan las salas
  useEffect(() => {
    if (mapReady && providerRef.current && cinemas.length > 0) {
      providerRef.current.renderCinemaMarkers(cinemas, (cinema) => {
        setSelectedCinema(cinema);
      });
    }
  }, [mapReady, cinemas]);

  const handleCenterOnUser = () => {
    setSelectedCinema(null);
    if (providerRef.current) {
      providerRef.current.centerOn(userLocation.lat, userLocation.lng, 12);
      (providerRef.current as any).closeInfoWindow?.();
    }
  };

  return (
    <section className="space-y-4" id="seccion-cines">
      {/* Cabecera de la Sección con Ubicación Detectada */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-rose-500" />
            <h3 className="text-xl font-bold text-white">Cines Cercanos en Tiempo Real</h3>
          </div>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-xs text-slate-400">
              Salas comerciales detectadas por satélite:
            </span>
            {/* Chip Dinámico con Ciudad y Coordenadas del Usuario */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-semibold shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              <Navigation className="w-3 h-3 text-sky-400" />
              <span>Tu ubicación: <strong className="text-white">{userCity}</strong> ({userLocation.lat.toFixed(3)}, {userLocation.lng.toFixed(3)})</span>
            </span>
          </div>
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

          {/* Botón Volver a mi ubicación */}
          <button
            type="button"
            onClick={handleCenterOnUser}
            className="px-3 py-1 rounded-xl glass-panel text-xs text-sky-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer border border-sky-500/30 hover:border-sky-500/50"
            title="Centrar mapa en mi posición GPS"
          >
            <Navigation className="w-3 h-3 text-sky-400" /> Mi Ubicación
          </button>

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
          {/* Botón flotante interactivo: Volver a mi posición */}
          <button
            type="button"
            onClick={handleCenterOnUser}
            className="absolute top-3.5 left-3.5 z-10 px-3.5 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-sky-500/40 hover:border-sky-400 text-sky-300 hover:text-white text-xs font-bold transition-all shadow-xl backdrop-blur-md flex items-center gap-2 cursor-pointer group hover:scale-[1.02]"
            title="Centrar mapa en mi posición actual"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
            </span>
            <Navigation className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-45 transition-transform" />
            <span>Volver a mi ubicación</span>
          </button>

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
            {selectedCinema ? (
              <button
                type="button"
                onClick={handleCenterOnUser}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer underline transition-colors"
                title="Deseleccionar y volver a mi posición"
              >
                Volver a mi posición
              </button>
            ) : (
              <span className="text-xs font-semibold text-slate-400">{cinemas.length} cines</span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {cinemas.map(({ cinema, showtimes, distanceKm }) => {
              const isSelected = selectedCinema?.id === cinema.id;

              return (
                <div
                  key={cinema.id}
                  onClick={() => {
                    setSelectedCinema(cinema);
                    providerRef.current?.centerOn(cinema.latitude, cinema.longitude, 13);
                  }}
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

                  {/* Horarios o Estado de Programación */}
                  {showtimes.length > 0 ? (
                    <div>
                      <div className="text-[11px] font-medium text-emerald-400 mb-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-400" /> Funciones disponibles:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {showtimes.map((st: Showtime) => (
                          <span
                            key={st.id}
                            className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold"
                            title={`${st.room} - ${st.format} (${st.language}) • S/. ${st.price.toFixed(2)}`}
                          >
                            {st.time}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1.5 rounded-xl border border-slate-800/80">
                        <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>Consultar programación en web oficial</span>
                      </div>
                    </div>
                  )}

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
                      <span>{showtimes.length > 0 ? 'Comprar Entradas' : 'Ver Cartelera'}</span>
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
