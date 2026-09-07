import { BaseMapProvider, type CinemaWithShowtimes } from './BaseMapProvider';
import { Cinema } from '../../domain/Cinema';

export class DemoMapsProvider extends BaseMapProvider {
  private userCoords: { lat: number; lng: number } | null = null;
  private cinemas: CinemaWithShowtimes[] = [];
  private selectedCinemaId: number | string | null = null;
  private onSelectCallback?: (cinema: Cinema) => void;

  public async initialize(
    element: HTMLElement,
    center: { lat: number; lng: number },
    _zoom = 13
  ): Promise<void> {
    this.container = element;
    this.userCoords = center;
    this.isInitialized = true;
    this.renderDom();
  }

  public renderUserMarker(lat: number, lng: number): void {
    this.userCoords = { lat, lng };
    this.renderDom();
  }

  public renderCinemaMarkers(
    cinemas: CinemaWithShowtimes[],
    onSelectCinema?: (cinema: Cinema) => void
  ): void {
    this.cinemas = cinemas;
    this.onSelectCallback = onSelectCinema;
    if (cinemas.length > 0 && !this.selectedCinemaId) {
      this.selectedCinemaId = cinemas[0].cinema.id;
    }
    this.renderDom();
  }

  public centerOn(lat: number, lng: number): void {
    this.userCoords = { lat, lng };
    this.renderDom();
  }

  public destroy(): void {
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.cinemas = [];
    this.container = null;
  }

  private renderDom(): void {
    if (!this.container) return;

    const selectedItem = this.cinemas.find((c) => c.cinema.id === this.selectedCinemaId) || this.cinemas[0];

    this.container.innerHTML = `
      <div style="height: 100%; width: 100%; display: flex; flex-direction: column; background: #0b1120; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); font-family: system-ui, sans-serif;">
        <!-- Cabecera del Mapa Demo -->
        <div style="background: rgba(15, 23, 42, 0.9); padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px #10b981;"></span>
            <span style="font-size: 13px; font-weight: bold; color: #e2e8f0;">Modo Interactivo: Sedes y Horarios Cercanos</span>
            ${
              this.userCoords
                ? `<span style="font-size: 11px; color: #38bdf8;">(📍 Tu GPS: ${this.userCoords.lat.toFixed(2)}, ${this.userCoords.lng.toFixed(2)})</span>`
                : ''
            }
          </div>
          <span style="font-size: 11px; padding: 3px 8px; border-radius: 6px; background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3);">
            ${this.cinemas.length} cines con función
          </span>
        </div>

        <!-- Contenedor Principal: Cuadrícula y Lista -->
        <div style="flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 16px; overflow: hidden;">
          <!-- Columna Izquierda: Lista de Cines con selección -->
          <div style="overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 4px;">
            ${this.cinemas
              .map(({ cinema, distanceKm }) => {
                const isSelected = cinema.id === this.selectedCinemaId;
                return `
                <div data-cinema-id="${cinema.id}" class="cinema-demo-item" style="cursor: pointer; padding: 12px; border-radius: 10px; transition: all 0.2s; background: ${
                  isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(30, 41, 59, 0.6)'
                }; border: 1px solid ${
                  isSelected ? '#f59e0b' : 'rgba(255, 255, 255, 0.05)'
                };">
                  <div style="font-size: 13px; font-weight: bold; color: ${isSelected ? '#f59e0b' : '#f8fafc'};">${cinema.name}</div>
                  <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">${cinema.address}</div>
                  ${
                    distanceKm !== undefined
                      ? `<div style="font-size: 11px; color: #38bdf8; font-weight: 600; margin-top: 4px;">📍 A ${distanceKm} km de tu ubicación</div>`
                      : ''
                  }
                </div>
              `;
              })
              .join('')}
          </div>

          <!-- Columna Derecha: Detalle de Salas y Horarios del Cine Seleccionado -->
          <div style="background: rgba(15, 23, 42, 0.8); border-radius: 12px; padding: 16px; border: 1px solid rgba(255, 255, 255, 0.08); display: flex; flex-direction: column; justify-content: space-between;">
            ${
              selectedItem
                ? `
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                      <h4 style="margin: 0; font-size: 15px; font-weight: bold; color: #ffffff;">${selectedItem.cinema.name}</h4>
                      <p style="margin: 2px 0 0 0; font-size: 12px; color: #94a3b8;">${selectedItem.cinema.address}</p>
                    </div>
                    <span style="font-size: 11px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; padding: 3px 8px; border-radius: 6px; font-weight: bold;">
                      ${selectedItem.cinema.chain}
                    </span>
                  </div>

                  <div style="margin-top: 16px;">
                    <div style="font-size: 12px; font-weight: bold; color: #e2e8f0; margin-bottom: 8px;">Horarios y Salas disponibles:</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                      ${selectedItem.showtimes
                        .map(
                          (s) => `
                        <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 8px; padding: 6px 10px; text-align: center;">
                          <div style="font-size: 13px; font-weight: bold; color: #f59e0b;">${s.time}</div>
                          <div style="font-size: 10px; color: #cbd5e1; margin-top: 2px;">${s.room}</div>
                          <div style="font-size: 10px; color: #94a3b8; font-weight: 600;">${s.getFormattedPrice()}</div>
                        </div>
                      `
                        )
                        .join('')}
                    </div>
                  </div>
                </div>

                <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 11px; color: #64748b;">Coordenadas: ${selectedItem.cinema.latitude.toFixed(3)}, ${selectedItem.cinema.longitude.toFixed(3)}</span>
                  <a href="${selectedItem.cinema.getGoogleMapsUrl()}" target="_blank" rel="noopener noreferrer" style="font-size: 12px; color: #f59e0b; text-decoration: none; font-weight: bold; display: inline-flex; align-items: center; gap: 4px;">
                    Abrir en Google Maps ↗
                  </a>
                </div>
              `
                : '<div style="color: #94a3b8; font-size: 13px; text-align: center; margin: auto;">Selecciona un cine para ver horarios</div>'
            }
          </div>
        </div>
      </div>
    `;

    // Vincular clics de selección
    const items = this.container.querySelectorAll('.cinema-demo-item');
    items.forEach((item) => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-cinema-id');
        if (id) {
          this.selectedCinemaId = isNaN(Number(id)) ? id : Number(id);
          const found = this.cinemas.find((c) => String(c.cinema.id) === String(id));
          if (found && this.onSelectCallback) {
            this.onSelectCallback(found.cinema);
          }
          this.renderDom();
        }
      });
    });
  }
}
