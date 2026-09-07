import L from 'leaflet';
import { BaseMapProvider, type CinemaWithShowtimes } from './BaseMapProvider';
import { Cinema } from '../../domain/Cinema';
import { getPeruvianCityFromCoords } from '../../core/utils';

export class DemoMapsProvider extends BaseMapProvider {
  private map: L.Map | null = null;
  private userMarker: L.Marker | null = null;
  private cinemaMarkers: L.Marker[] = [];
  private userCoords: { lat: number; lng: number } | null = null;

  public async initialize(
    element: HTMLElement,
    center: { lat: number; lng: number },
    zoom = 10
  ): Promise<void> {
    this.container = element;
    this.userCoords = center;

    // Destruir mapa previo si existía en el contenedor
    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    element.innerHTML = '';

    // Inicializar mapa de Leaflet con OpenStreetMap
    this.map = L.map(element, {
      center: [center.lat, center.lng],
      zoom,
      zoomControl: true,
      attributionControl: false,
    });

    // Capa de mosaicos OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    this.isInitialized = true;
    this.renderUserMarker(center.lat, center.lng);

    // Ajuste de tamaño por si el contenedor tardó en renderizarse
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 200);
  }

  public renderUserMarker(lat: number, lng: number): void {
    if (!this.map) return;
    this.userCoords = { lat, lng };

    if (this.userMarker) {
      this.userMarker.remove();
      this.userMarker = null;
    }

    const cityName = getPeruvianCityFromCoords(lat, lng);

    // Ícono personalizado pulsante para la ubicación del usuario
    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `
        <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 28px; height: 28px; border-radius: 50%; background: rgba(14, 165, 233, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 14px; height: 14px; border-radius: 50%; background: #0284c7; border: 2.5px solid #ffffff; box-shadow: 0 0 10px #38bdf8;"></div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    this.userMarker = L.marker([lat, lng], { icon: userIcon, title: 'Tu Ubicación Actual' }).addTo(this.map);

    this.userMarker.bindPopup(`
      <div style="color: #0f172a; font-family: sans-serif; font-size: 12px; line-height: 1.4;">
        <strong style="color: #0284c7; font-size: 13px;">📍 Tu Ubicación Actual</strong><br/>
        <strong>${cityName}</strong><br/>
        <span style="color: #64748b; font-size: 11px;">Coordenadas: ${lat.toFixed(4)}, ${lng.toFixed(4)}</span>
      </div>
    `);
  }

  public renderCinemaMarkers(
    cinemas: CinemaWithShowtimes[],
    onSelectCinema?: (cinema: Cinema) => void
  ): void {
    if (!this.map) return;

    // Limpiar marcadores previos de cines
    this.cinemaMarkers.forEach((m) => m.remove());
    this.cinemaMarkers = [];

    const boundsPoints: L.LatLngExpression[] = [];

    if (this.userCoords) {
      boundsPoints.push([this.userCoords.lat, this.userCoords.lng]);
    }

    cinemas.forEach(({ cinema, distanceKm }) => {
      boundsPoints.push([cinema.latitude, cinema.longitude]);

      const cinemaIcon = L.divIcon({
        className: 'custom-cinema-marker',
        html: `
          <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
            <div style="background: #f59e0b; color: #0f172a; font-weight: 800; font-size: 11px; padding: 4px 8px; border-radius: 8px; border: 2px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.4); white-space: nowrap;">
              🎬 ${cinema.chain}
            </div>
            <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid #f59e0b;"></div>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [35, 28],
      });

      const marker = L.marker([cinema.latitude, cinema.longitude], {
        icon: cinemaIcon,
        title: cinema.name,
      }).addTo(this.map!);

      marker.bindPopup(`
        <div style="color: #0f172a; font-family: sans-serif; font-size: 12px; min-width: 190px;">
          <h4 style="margin: 0 0 4px 0; font-size: 13px; font-weight: bold; color: #0f172a;">${cinema.name}</h4>
          <p style="margin: 0 0 6px 0; color: #64748b; font-size: 11px;">${cinema.address}</p>
          ${
            distanceKm !== undefined
              ? `<div style="color: #0284c7; font-weight: bold; font-size: 11px; margin-bottom: 8px;">📍 A ${distanceKm} km de tu ubicación</div>`
              : ''
          }
          <div style="display: flex; gap: 6px; margin-top: 8px;">
            <a href="${cinema.getOfficialBillboardUrl()}" target="_blank" rel="noopener noreferrer" style="background: #f59e0b; color: #0f172a; font-weight: bold; font-size: 11px; padding: 4px 8px; border-radius: 6px; text-decoration: none;">
              Boletería Oficial ↗
            </a>
            <a href="${cinema.getGoogleMapsUrl()}" target="_blank" rel="noopener noreferrer" style="background: #e2e8f0; color: #0f172a; font-weight: bold; font-size: 11px; padding: 4px 8px; border-radius: 6px; text-decoration: none;">
              Ruta Maps ↗
            </a>
          </div>
        </div>
      `);

      marker.on('click', () => {
        if (onSelectCinema) {
          onSelectCinema(cinema);
        }
      });

      this.cinemaMarkers.push(marker);
    });

    // Ajustar la vista para mostrar tanto al usuario como a los cines cercanos
    if (boundsPoints.length > 1) {
      const bounds = L.latLngBounds(boundsPoints);
      this.map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    }
  }

  public centerOn(lat: number, lng: number, zoom = 13): void {
    if (!this.map) return;
    this.map.flyTo([lat, lng], zoom, { duration: 1 });
  }

  public destroy(): void {
    this.cinemaMarkers.forEach((m) => m.remove());
    this.cinemaMarkers = [];
    if (this.userMarker) {
      this.userMarker.remove();
      this.userMarker = null;
    }
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    this.container = null;
  }
}
