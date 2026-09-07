import { BaseEntity } from './BaseEntity';
import type { SupabaseCinemaRow } from './types';
import { calculateHaversineDistance } from '../core/utils';

export class Cinema extends BaseEntity {
  public readonly name: string;
  public readonly chain: string;
  public readonly address: string;
  public readonly city: string;
  public readonly latitude: number;
  public readonly longitude: number;
  public readonly phone: string | null;
  public readonly website: string | null;

  constructor(params: {
    id: number | string;
    name: string;
    chain: string;
    address: string;
    city?: string;
    latitude: number;
    longitude: number;
    phone?: string | null;
    website?: string | null;
    createdAt?: Date | string | null;
  }) {
    super(params.id, params.createdAt);
    this.name = params.name;
    this.chain = params.chain;
    this.address = params.address;
    this.city = params.city || 'Bogotá';
    this.latitude = Number(params.latitude);
    this.longitude = Number(params.longitude);
    this.phone = params.phone ?? null;
    this.website = params.website ?? null;
  }

  public distanceTo(userLat: number, userLng: number): number {
    return calculateHaversineDistance(userLat, userLng, this.latitude, this.longitude);
  }

  public getGoogleMapsUrl(): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${this.name}, ${this.address}`
    )}`;
  }

  public getOfficialBillboardUrl(): string {
    const lower = `${this.name} ${this.chain} ${this.city} ${this.address}`.toLowerCase();

    // Sedes específicas de Huánuco
    if ((lower.includes('cinemark') && lower.includes('huánuco')) || (lower.includes('cinemark') && lower.includes('huanuco'))) {
      return 'https://www.cinemark-peru.com/cines/cinemark-huanuco';
    }
    if ((lower.includes('cineplanet') && lower.includes('huánuco')) || (lower.includes('cineplanet') && lower.includes('huanuco'))) {
      return 'https://www.cineplanet.com.pe/cines/cineplanet-huanuco';
    }

    // Sedes de Huancayo
    if ((lower.includes('cineplanet') && lower.includes('huancayo'))) {
      return 'https://www.cineplanet.com.pe/cines/cineplanet-real-plaza-huancayo';
    }
    if ((lower.includes('cinemark') && lower.includes('huancayo'))) {
      return 'https://www.cinemark-peru.com/cines/cinemark-mall-aventura-huancayo';
    }

    if (this.website && !this.website.endsWith('.com.pe') && !this.website.endsWith('.com')) {
      return this.website;
    }
    if (lower.includes('cineplanet')) return 'https://www.cineplanet.com.pe';
    if (lower.includes('cinemark')) return 'https://www.cinemark-peru.com';
    if (lower.includes('cinestar') || lower.includes('cine star')) return 'https://www.cinestar.com.pe';
    if (lower.includes('uvk')) return 'https://uvk.pe';
    if (lower.includes('cinerama')) return 'https://www.cinerama.com.pe';
    if (lower.includes('movie time') || lower.includes('movietime')) return 'https://www.movietime.com.pe';
    if (lower.includes('cinepolis') || lower.includes('cinépolis')) return 'https://www.cinepolis.com.pe';
    return this.website || `https://www.google.com/search?q=${encodeURIComponent(`${this.name} cartelera entradas`)}`;
  }

  public static fromSupabaseRow(row: SupabaseCinemaRow): Cinema {
    return new Cinema({
      id: row.id,
      name: row.nombre,
      chain: row.cadena,
      address: row.direccion,
      city: row.ciudad,
      latitude: Number(row.latitud),
      longitude: Number(row.longitud),
      phone: row.telefono,
      website: row.sitio_web,
      createdAt: row.creado_en,
    });
  }

  public override toJson(): Record<string, unknown> {
    return {
      id: this.id,
      nombre: this.name,
      cadena: this.chain,
      direccion: this.address,
      ciudad: this.city,
      latitud: this.latitude,
      longitud: this.longitude,
      telefono: this.phone,
      sitio_web: this.website,
      creado_en: this.createdAt.toISOString(),
    };
  }
}
