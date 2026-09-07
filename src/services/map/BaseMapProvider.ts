import { Cinema } from '../../domain/Cinema';
import { Showtime } from '../../domain/Showtime';
import { calculateHaversineDistance } from '../../core/utils';

export interface CinemaWithShowtimes {
  cinema: Cinema;
  showtimes: Showtime[];
  distanceKm?: number;
}

export abstract class BaseMapProvider {
  protected container: HTMLElement | null = null;
  protected isInitialized = false;

  public get isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Inicializa el lienzo del mapa centrado en coordenadas iniciales.
   */
  public abstract initialize(
    element: HTMLElement,
    center: { lat: number; lng: number },
    zoom?: number
  ): Promise<void>;

  /**
   * Renderiza el pin o indicador visual de la ubicación del usuario.
   */
  public abstract renderUserMarker(lat: number, lng: number): void;

  /**
   * Renderiza los marcadores de las sedes de cine con sus horarios de cartelera.
   */
  public abstract renderCinemaMarkers(
    cinemas: CinemaWithShowtimes[],
    onSelectCinema?: (cinema: Cinema) => void
  ): void;

  /**
   * Centra la cámara del mapa en coordenadas específicas.
   */
  public abstract centerOn(lat: number, lng: number, zoom?: number): void;

  /**
   * Limpia y destruye recursos asociados al mapa.
   */
  public abstract destroy(): void;

  /**
   * Método de cálculo de distancias compartido.
   */
  public calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    return calculateHaversineDistance(lat1, lon1, lat2, lon2);
  }
}
