import { BaseMapProvider, type CinemaWithShowtimes } from './BaseMapProvider';
import { Cinema } from '../../domain/Cinema';
import { getConfig } from '../../core/config';

// Declaración mínima para evitar errores de TypeScript con el objeto global google
declare global {
  interface Window {
    google?: any;
    __google_maps_callback?: () => void;
    gm_authFailure?: () => void;
  }
}

export class GoogleMapsProvider extends BaseMapProvider {
  private static sdkPromise: Promise<void> | null = null;
  private mapInstance: any = null;
  private userMarker: any = null;
  private cinemaMarkers: any[] = [];
  private infoWindow: any = null;
  private onAuthFailureCallback?: () => void;
  private dismissObserver: MutationObserver | null = null;
  private dismissInterval: any = null;

  public setOnAuthFailure(callback: () => void): void {
    this.onAuthFailureCallback = callback;
  }

  public async initialize(
    element: HTMLElement,
    center: { lat: number; lng: number },
    zoom = 12
  ): Promise<void> {
    this.container = element;

    // Registrar interceptor de fallo de autenticación / cuota de Google
    window.gm_authFailure = () => {
      console.warn('Google Maps reportó cuota diaria agotada o fallo de autenticación (gm_authFailure).');
      if (this.onAuthFailureCallback) {
        this.onAuthFailureCallback();
      }
    };

    // Silenciar ventana emergente (alert) intrusiva de advertencia de Google Maps
    if (typeof window !== 'undefined') {
      const originalAlert = window.alert;
      window.alert = function (message?: any) {
        if (
          typeof message === 'string' &&
          (message.includes('Google Maps') ||
            message.includes('propietario') ||
            message.includes('owner') ||
            message.includes('cargar Google Maps') ||
            message.includes('correctamente'))
        ) {
          console.warn('[CinePlus] Alerta emergente de Google Maps suprimida:', message);
          return;
        }
        originalAlert.apply(window, arguments as any);
      };
    }

    await this.loadSdk();

    if (!window.google?.maps) {
      throw new Error('Google Maps SDK no disponible');
    }

    element.innerHTML = '';

    const styledMapType = [
      { elementType: 'geometry', stylers: [{ color: '#171c26' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#171c26' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#8b9bb4' }] },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#273142' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#090d16' }],
      },
    ];

    this.mapInstance = new window.google.maps.Map(element, {
      center,
      zoom,
      styles: styledMapType,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
    });

    this.infoWindow = new window.google.maps.InfoWindow();
    this.setupAutoDismiss(element);
    this.isInitialized = true;
  }

  private setupAutoDismiss(element: HTMLElement): void {
    const dismissAllErrors = () => {
      // 1. Ocultar contenedores con clase gm-err
      const errContainers = document.querySelectorAll<HTMLElement>(
        '.gm-err-container, .gm-err-content, .gm-err-autocomplete, [class*="gm-err"]'
      );
      errContainers.forEach((container) => {
        container.style.setProperty('display', 'none', 'important');
        container.style.setProperty('visibility', 'hidden', 'important');
        container.style.setProperty('pointer-events', 'none', 'important');
        container.style.setProperty('opacity', '0', 'important');
        if (
          container.parentElement &&
          container.parentElement !== element &&
          container.parentElement !== document.body &&
          container.parentElement.children.length === 1
        ) {
          container.parentElement.style.setProperty('display', 'none', 'important');
          container.parentElement.style.setProperty('pointer-events', 'none', 'important');
        }
      });

      // 2. Hacer clic programático en el botón "Aceptar" / "Dismiss"
      const dismissButtons = document.querySelectorAll<HTMLButtonElement>(
        '.dismissButton, button[title*="Aceptar"], button[aria-label*="Aceptar"], .gm-err-container button'
      );
      dismissButtons.forEach((btn) => {
        try {
          btn.click();
        } catch {
          // Ignorar error si no es clickeable
        }
      });

      // 3. Revisar botones con texto "Aceptar", "OK" o "Dismiss"
      const allMapButtons = element.querySelectorAll<HTMLButtonElement>('button');
      allMapButtons.forEach((btn) => {
        const txt = btn.textContent?.trim().toLowerCase();
        if (txt === 'aceptar' || txt === 'ok' || txt === 'dismiss') {
          try {
            btn.click();
          } catch {
            // Ignorar
          }
        }
      });
    };

    dismissAllErrors();

    if (typeof MutationObserver !== 'undefined') {
      this.dismissObserver = new MutationObserver(() => {
        dismissAllErrors();
      });

      this.dismissObserver.observe(element, { childList: true, subtree: true });
      this.dismissObserver.observe(document.body, { childList: true, subtree: true });
    }

    let attempts = 0;
    this.dismissInterval = setInterval(() => {
      dismissAllErrors();
      attempts++;
      if (attempts > 40) {
        if (this.dismissInterval) {
          clearInterval(this.dismissInterval);
          this.dismissInterval = null;
        }
      }
    }, 100);
  }

  private loadSdk(): Promise<void> {
    if (window.google?.maps) {
      return Promise.resolve();
    }

    if (GoogleMapsProvider.sdkPromise) {
      return GoogleMapsProvider.sdkPromise;
    }

    const apiKey = getConfig().googleMapsApiKey;
    if (!apiKey) {
      return Promise.reject(new Error('No se ha proporcionado Google Maps API Key'));
    }

    GoogleMapsProvider.sdkPromise = new Promise((resolve, reject) => {
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) {
        if (window.google?.maps) {
          resolve();
        } else {
          existingScript.addEventListener('load', () => resolve());
          existingScript.addEventListener('error', () => {
            GoogleMapsProvider.sdkPromise = null;
            reject(new Error('Fallo al cargar script de Google Maps'));
          });
        }
        return;
      }

      const callbackName = '__google_maps_callback';
      window[callbackName] = () => {
        delete window[callbackName];
        resolve();
      };

      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
        apiKey
      )}&callback=${callbackName}&loading=async`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        GoogleMapsProvider.sdkPromise = null;
        reject(new Error('Fallo al cargar script de Google Maps'));
      };
      document.head.appendChild(script);
    });

    return GoogleMapsProvider.sdkPromise;
  }

  public renderUserMarker(lat: number, lng: number): void {
    if (!this.mapInstance || !window.google?.maps) return;

    if (this.userMarker) {
      this.userMarker.setMap(null);
    }

    this.userMarker = new window.google.maps.Marker({
      position: { lat, lng },
      map: this.mapInstance,
      title: 'Tu Ubicación Actual',
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#38bdf8',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
      },
    });
  }

  public renderCinemaMarkers(
    cinemas: CinemaWithShowtimes[],
    onSelectCinema?: (cinema: Cinema) => void
  ): void {
    if (!this.mapInstance || !window.google?.maps) return;

    // Limpiar marcadores previos
    this.cinemaMarkers.forEach((m) => m.setMap(null));
    this.cinemaMarkers = [];

    cinemas.forEach(({ cinema, showtimes, distanceKm }) => {
      const marker = new window.google.maps.Marker({
        position: { lat: cinema.latitude, lng: cinema.longitude },
        map: this.mapInstance,
        title: cinema.name,
        icon: {
          path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
          fillColor: '#f59e0b',
          fillOpacity: 1,
          scale: 1.5,
          strokeColor: '#090d16',
          strokeWeight: 1.5,
          anchor: new window.google.maps.Point(12, 22),
        },
      });

      marker.addListener('click', () => {
        const showtimesHtml = showtimes
          .map(
            (s) =>
              `<span style="background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); color: #f59e0b; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; margin-right: 4px; margin-bottom: 4px; display: inline-block;">${s.time} (${s.room})</span>`
          )
          .join('');

        const contentString = `
          <div style="background: #0f172a; color: #f8fafc; padding: 12px; border-radius: 10px; font-family: sans-serif; min-width: 220px; max-width: 280px;">
            <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold; color: #ffffff;">${cinema.name}</h4>
            <p style="margin: 0 0 6px 0; font-size: 12px; color: #94a3b8;">${cinema.address}</p>
            ${
              distanceKm !== undefined
                ? `<div style="font-size: 11px; color: #38bdf8; font-weight: 600; margin-bottom: 8px;">📍 A ${distanceKm} km de ti</div>`
                : ''
            }
            <div style="margin-top: 8px;">
              <div style="font-size: 11px; font-weight: bold; color: #cbd5e1; margin-bottom: 4px;">Funciones disponibles:</div>
              <div style="display: flex; flex-wrap: wrap;">${showtimesHtml}</div>
            </div>
            <a href="${cinema.getGoogleMapsUrl()}" target="_blank" rel="noopener noreferrer" style="display: block; margin-top: 10px; font-size: 11px; color: #f59e0b; text-decoration: none; font-weight: bold;">
              Ver cómo llegar en Google Maps ↗
            </a>
          </div>
        `;

        this.infoWindow.setContent(contentString);
        this.infoWindow.open(this.mapInstance, marker);

        if (onSelectCinema) {
          onSelectCinema(cinema);
        }
      });

      this.cinemaMarkers.push(marker);
    });
  }

  public centerOn(lat: number, lng: number, zoom?: number): void {
    if (!this.mapInstance) return;
    this.mapInstance.setCenter({ lat, lng });
    if (zoom) {
      this.mapInstance.setZoom(zoom);
    }
  }

  public closeInfoWindow(): void {
    if (this.infoWindow) {
      this.infoWindow.close();
    }
  }

  public destroy(): void {
    if (this.dismissObserver) {
      this.dismissObserver.disconnect();
      this.dismissObserver = null;
    }
    if (this.dismissInterval) {
      clearInterval(this.dismissInterval);
      this.dismissInterval = null;
    }
    if (this.cinemaMarkers) {
      this.cinemaMarkers.forEach((m) => m.setMap(null));
      this.cinemaMarkers = [];
    }
    if (this.userMarker) {
      this.userMarker.setMap(null);
      this.userMarker = null;
    }
    if (this.infoWindow) {
      this.infoWindow.close();
      this.infoWindow = null;
    }
    this.onAuthFailureCallback = undefined;
    if (window.gm_authFailure) {
      window.gm_authFailure = undefined;
    }
    this.isInitialized = false;
    this.mapInstance = null;
  }
}
