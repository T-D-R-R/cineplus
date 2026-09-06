import { BaseApiService } from '../BaseApiService';
import { Cinema } from '../../domain/Cinema';

// Red de cines peruanos y regionales de respaldo inmediato
const PERUVIAN_CINEMAS_SEED: Array<{
  id: number;
  name: string;
  chain: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  phone?: string;
  website?: string;
}> = [
  // Huánuco (Los dos cines más cercanos a Cerro de Pasco)
  {
    id: 101,
    name: 'Cineplanet Real Plaza Huánuco',
    chain: 'Cineplanet',
    address: 'Jr. Dos de Mayo 1380, C.C. Real Plaza',
    city: 'Huánuco',
    latitude: -9.919142,
    longitude: -76.24099,
    phone: '+51 1 624 9500',
    website: 'https://www.cineplanet.com.pe',
  },
  {
    id: 100,
    name: 'Cinemark Open Plaza Huánuco',
    chain: 'Cinemark',
    address: 'Jr. 2 de Mayo 125, C.C. Open Plaza',
    city: 'Huánuco',
    latitude: -9.93846,
    longitude: -76.24763,
    phone: '+51 1 610 0800',
    website: 'https://www.cinemark-peru.com',
  },
  // Huancayo (Junín)
  {
    id: 102,
    name: 'Cineplanet Real Plaza Huancayo',
    chain: 'Cineplanet',
    address: 'Av. Ferrocarril 1035, Huancayo',
    city: 'Huancayo',
    latitude: -12.06712,
    longitude: -75.21034,
    phone: '+51 1 624 9500',
    website: 'https://www.cineplanet.com.pe',
  },
  {
    id: 103,
    name: 'Cinemark Mall Aventura Huancayo',
    chain: 'Cinemark',
    address: 'Av. Ferrocarril con Jr. San Carlos, Huancayo',
    city: 'Huancayo',
    latitude: -12.05241,
    longitude: -75.22814,
    phone: '+51 1 610 0800',
    website: 'https://www.cinemark-peru.com',
  },
  // Tacna
  {
    id: 104,
    name: 'Cineplanet Tacna',
    chain: 'Cineplanet',
    address: 'Av. Prolongación Pinto 1300, Tacna',
    city: 'Tacna',
    latitude: -18.018442,
    longitude: -70.252969,
    phone: '+51 1 624 9500',
    website: 'https://www.cineplanet.com.pe',
  },
  {
    id: 105,
    name: 'Cinestar Tacna',
    chain: 'Cine Star',
    address: 'Av. Bolognesi 780, Tacna',
    city: 'Tacna',
    latitude: -18.013695,
    longitude: -70.237107,
    phone: '+51 1 719 0900',
    website: 'https://www.cinestar.com.pe',
  },
  // Lima Metropolitana
  {
    id: 106,
    name: 'Cineplanet San Miguel',
    chain: 'Cineplanet',
    address: 'Av. La Marina 2000, San Miguel',
    city: 'Lima',
    latitude: -12.0768,
    longitude: -77.0815,
    phone: '+51 1 624 9500',
    website: 'https://www.cineplanet.com.pe',
  },
  {
    id: 107,
    name: 'Cinemark Jockey Plaza',
    chain: 'Cinemark',
    address: 'Av. Javier Prado Este 4200, Surco',
    city: 'Lima',
    latitude: -12.08491,
    longitude: -76.975748,
    phone: '+51 1 610 0800',
    website: 'https://www.cinemark-peru.com',
  },
  {
    id: 108,
    name: 'Cinépolis Plaza Norte',
    chain: 'Cinépolis',
    address: 'Av. Tomás Valle con Panamericana Norte, Independencia',
    city: 'Lima',
    latitude: -11.99312,
    longitude: -77.061279,
    phone: '+51 1 613 0000',
    website: 'https://www.cinepolis.com.pe',
  },
  // Arequipa
  {
    id: 109,
    name: 'Cineplanet Mall Aventura Arequipa',
    chain: 'Cineplanet',
    address: 'Av. Porongoche 500, Paucarpata',
    city: 'Arequipa',
    latitude: -16.4258,
    longitude: -71.5186,
    phone: '+51 1 624 9500',
    website: 'https://www.cineplanet.com.pe',
  },
  // Trujillo
  {
    id: 110,
    name: 'Cineplanet Real Plaza Trujillo',
    chain: 'Cineplanet',
    address: 'Av. César Vallejo Oeste 1345, Trujillo',
    city: 'Trujillo',
    latitude: -8.1287,
    longitude: -79.0345,
    phone: '+51 1 624 9500',
    website: 'https://www.cineplanet.com.pe',
  },
  // Cusco
  {
    id: 111,
    name: 'Cineplanet Real Plaza Cusco',
    chain: 'Cineplanet',
    address: 'Av. Collasuyo 2964, Cusco',
    city: 'Cusco',
    latitude: -13.5249,
    longitude: -71.9442,
    phone: '+51 1 624 9500',
    website: 'https://www.cineplanet.com.pe',
  },
];

interface OverpassElement {
  id: number;
  type: string;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: {
    name?: string;
    brand?: string;
    operator?: string;
    'addr:street'?: string;
    'addr:housenumber'?: string;
    'addr:city'?: string;
    phone?: string;
    website?: string;
  };
}

export class OverpassCinemaService extends BaseApiService {
  private static instance: OverpassCinemaService;

  private constructor() {
    super('https://overpass-api.de/api', 10000); // 10 segundos timeout
  }

  public static getInstance(): OverpassCinemaService {
    if (!OverpassCinemaService.instance) {
      OverpassCinemaService.instance = new OverpassCinemaService();
    }
    return OverpassCinemaService.instance;
  }

  /**
   * Busca cines reales alrededor de una ubicación GPS usando OpenStreetMap Overpass API.
   * Si la consulta tarda o no devuelve nada, utiliza los cines reales peruanos registrados.
   */
  public async getCinemasNearby(
    lat: number,
    lng: number,
    radiusMeters = 200000 // 200 km para cubrir valles interandinos y regiones vecinas
  ): Promise<Cinema[]> {
    const query = `[out:json][timeout:8];(node["amenity"="cinema"](around:${radiusMeters},${lat},${lng});way["amenity"="cinema"](around:${radiusMeters},${lat},${lng}););out center 15;`;

    try {
      const response = await this.request<{ elements: OverpassElement[] }>(
        `/interpreter?data=${encodeURIComponent(query)}`
      );

      if (response.elements && response.elements.length > 0) {
        const foundCinemas: Cinema[] = [];

        for (const el of response.elements) {
          const latitude = el.lat ?? el.center?.lat;
          const longitude = el.lon ?? el.center?.lon;
          if (!latitude || !longitude) continue;

          const rawName = el.tags?.name || el.tags?.brand || el.tags?.operator || 'Cine Local';
          const chain = this.detectChain(rawName, el.tags?.brand);
          const city = el.tags?.['addr:city'] || 'Perú';
          const street = el.tags?.['addr:street'] || '';
          const number = el.tags?.['addr:housenumber'] || '';
          const address = street ? `${street} ${number}`.trim() : `Sede ${rawName}, ${city}`;

          foundCinemas.push(
            new Cinema({
              id: el.id,
              name: rawName,
              chain,
              address,
              city,
              latitude,
              longitude,
              phone: el.tags?.phone,
              website: el.tags?.website || this.getChainWebsite(chain),
            })
          );
        }

        if (foundCinemas.length > 0) {
          // Ordenar por distancia real desde el usuario
          foundCinemas.sort((a, b) => a.distanceTo(lat, lng) - b.distanceTo(lat, lng));
          const regionalCinemas = foundCinemas.filter((c) => c.distanceTo(lat, lng) <= 250);
          return regionalCinemas.length > 0 ? regionalCinemas.slice(0, 5) : foundCinemas.slice(0, 3);
        }
      }
    } catch (error) {
      console.warn('Consulta a Overpass API no disponible o agotada, usando sedes verificadas:', error);
    }

    // Fallback garantizado: Retornar sedes peruanas filtradas por cercanía regional al usuario
    const mappedCinemas = PERUVIAN_CINEMAS_SEED.map(
      (seed) =>
        new Cinema({
          id: seed.id,
          name: seed.name,
          chain: seed.chain,
          address: seed.address,
          city: seed.city,
          latitude: seed.latitude,
          longitude: seed.longitude,
          phone: seed.phone,
          website: seed.website,
        })
    );

    // Ordenar de menor a mayor distancia respecto a la ubicación del usuario
    mappedCinemas.sort((a, b) => a.distanceTo(lat, lng) - b.distanceTo(lat, lng));

    // Si hay cines a menos de 250 km (ej. Huánuco a ~84 km de Pasco), retornar únicamente los más cercanos (máx 4)
    const withinRegion = mappedCinemas.filter((c) => c.distanceTo(lat, lng) <= 250);
    if (withinRegion.length > 0) {
      return withinRegion.slice(0, 4);
    }

    // Si el usuario está en una zona remota sin cines a menos de 250 km, retornar solo los 2 más cercanos del país
    return mappedCinemas.slice(0, 2);
  }

  private detectChain(name: string, brand?: string): string {
    const text = `${name} ${brand || ''}`.toLowerCase();
    if (text.includes('cineplanet') || text.includes('planet')) return 'Cineplanet';
    if (text.includes('cinemark')) return 'Cinemark';
    if (text.includes('cinépolis') || text.includes('cinepolis')) return 'Cinépolis';
    if (text.includes('cinestar') || text.includes('cine star')) return 'Cine Star';
    if (text.includes('uvk')) return 'UVK Multicines';
    if (text.includes('movietime')) return 'Movie Time';
    return 'Cine Independiente';
  }

  private getChainWebsite(chain: string): string {
    switch (chain) {
      case 'Cineplanet':
        return 'https://www.cineplanet.com.pe';
      case 'Cinemark':
        return 'https://www.cinemark-peru.com';
      case 'Cinépolis':
        return 'https://www.cinepolis.com.pe';
      case 'Cine Star':
        return 'https://www.cinestar.com.pe';
      case 'UVK Multicines':
        return 'https://uvk.pe';
      default:
        return 'https://www.google.com';
    }
  }
}

export const overpassCinemaService = OverpassCinemaService.getInstance();
