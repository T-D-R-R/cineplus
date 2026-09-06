import { BaseMapProvider } from './BaseMapProvider';
import { GoogleMapsProvider } from './GoogleMapsProvider';
import { DemoMapsProvider } from './DemoMapsProvider';
import { isGoogleMapsConfigured } from '../../core/config';

/**
 * Fábrica de proveedores de mapas (LSP / OCP).
 * Retorna GoogleMapsProvider si hay una clave configurada, o DemoMapsProvider en modo fallback.
 */
export function createMapProvider(): BaseMapProvider {
  if (isGoogleMapsConfigured()) {
    return new GoogleMapsProvider();
  }
  return new DemoMapsProvider();
}

export * from './BaseMapProvider';
export * from './GoogleMapsProvider';
export * from './DemoMapsProvider';
