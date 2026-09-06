import { BaseEntity } from './BaseEntity';
import type { Actor, Genre, TmdbMovieDto, VideoTrailer } from './types';
import { formatCurrencyUSD, formatRuntime, formatDate } from '../core/utils';
import { getConfig } from '../core/config';

export type TheatricalStatus = 'IN_THEATERS' | 'UPCOMING' | 'OUT_OF_THEATERS' | 'UNKNOWN';

export class Movie extends BaseEntity {
  public readonly title: string;
  public readonly overview: string;
  public readonly posterPath: string | null;
  public readonly backdropPath: string | null;
  public readonly voteAverage: number;
  public readonly voteCount: number;
  public readonly releaseDate: string;
  public readonly genres: Genre[];
  public readonly runtime: number | null;
  public readonly budget: number | null;
  public readonly revenue: number | null;
  public readonly tagline: string | null;
  public readonly trailerKey: string | null;
  public readonly cast: Actor[];
  public readonly director: string | null;
  public readonly theatricalStatus: TheatricalStatus;
  public readonly peruReleaseDate: string | null;
  public readonly peruCertification: string | null;

  constructor(params: {
    id: number;
    title: string;
    overview: string;
    posterPath: string | null;
    backdropPath: string | null;
    voteAverage: number;
    voteCount?: number;
    releaseDate: string;
    genres?: Genre[];
    runtime?: number | null;
    budget?: number | null;
    revenue?: number | null;
    tagline?: string | null;
    trailerKey?: string | null;
    cast?: Actor[];
    director?: string | null;
    theatricalStatus?: TheatricalStatus;
    peruReleaseDate?: string | null;
    peruCertification?: string | null;
    createdAt?: Date | string | null;
  }) {
    super(params.id, params.createdAt);
    this.title = params.title;
    this.overview = params.overview || 'Sinopsis no disponible.';
    this.posterPath = params.posterPath;
    this.backdropPath = params.backdropPath;
    this.voteAverage = params.voteAverage;
    this.voteCount = params.voteCount ?? 0;
    this.releaseDate = params.releaseDate;
    this.genres = params.genres ?? [];
    this.runtime = params.runtime ?? null;
    this.budget = params.budget ?? null;
    this.revenue = params.revenue ?? null;
    this.tagline = params.tagline ?? null;
    this.trailerKey = params.trailerKey ?? null;
    this.cast = params.cast ?? [];
    this.director = params.director ?? null;
    this.theatricalStatus = params.theatricalStatus || 'UNKNOWN';
    this.peruReleaseDate = params.peruReleaseDate || null;
    this.peruCertification = params.peruCertification || null;
  }

  public get numericId(): number {
    return Number(this._id);
  }

  public getPosterUrl(size: 'w185' | 'w500' | 'original' = 'w500'): string {
    if (!this.posterPath) {
      return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60';
    }
    const config = getConfig();
    if (size === 'w185') return `${config.tmdbImageBase.profile}${this.posterPath}`;
    if (size === 'original') return `${config.tmdbImageBase.backdrop}${this.posterPath}`;
    return `${config.tmdbImageBase.poster}${this.posterPath}`;
  }

  public getBackdropUrl(): string {
    if (!this.backdropPath) {
      return this.getPosterUrl('original');
    }
    const config = getConfig();
    return `${config.tmdbImageBase.backdrop}${this.backdropPath}`;
  }

  public getYear(): string {
    if (!this.releaseDate) return 'N/A';
    return this.releaseDate.split('-')[0] || 'N/A';
  }

  public getFormattedRuntime(): string {
    return formatRuntime(this.runtime);
  }

  public getFormattedBudget(): string {
    return formatCurrencyUSD(this.budget);
  }

  public getFormattedRevenue(): string {
    return formatCurrencyUSD(this.revenue);
  }

  public getStarRating(): number {
    return Math.round((this.voteAverage / 2) * 10) / 10;
  }

  public getYoutubeTrailerUrl(): string | null {
    if (!this.trailerKey) return null;
    return `https://www.youtube.com/embed/${this.trailerKey}?autoplay=0&rel=0`;
  }

  public getTheatricalBadge(): { label: string; sublabel: string; color: 'emerald' | 'sky' | 'amber' } {
    const certText = this.peruCertification ? `Clasificación: ${this.peruCertification}` : '';
    const dateText = this.peruReleaseDate ? `Estreno en Perú: ${formatDate(this.peruReleaseDate)}` : '';
    const details = [certText, dateText].filter(Boolean).join(' • ');

    switch (this.theatricalStatus) {
      case 'IN_THEATERS':
        return {
          label: 'Confirmada en Cartelera en Cines de Perú',
          sublabel: details || 'Proyectándose actualmente en salas comerciales',
          color: 'emerald',
        };
      case 'UPCOMING':
        return {
          label: 'Próximo Estreno en Cines de Perú',
          sublabel: details || 'Próximamente en salas comerciales',
          color: 'sky',
        };
      case 'OUT_OF_THEATERS':
      default:
        return {
          label: 'Fin de Temporada en Cines de Perú',
          sublabel: 'Disponible actualmente en plataformas de Streaming / Formato Digital',
          color: 'amber',
        };
    }
  }

  public static fromTmdbDto(
    dto: TmdbMovieDto,
    theatricalInfo?: {
      status: TheatricalStatus;
      peruReleaseDate: string | null;
      peruCertification: string | null;
    }
  ): Movie {
    // Buscar trailer oficial de YouTube
    let trailerKey: string | null = null;
    if (dto.videos?.results) {
      const videos = dto.videos.results;
      const officialTrailer = videos.find(
        (v: VideoTrailer) => v.site === 'YouTube' && v.type === 'Trailer' && v.official
      );
      const anyTrailer = videos.find(
        (v: VideoTrailer) => v.site === 'YouTube' && v.type === 'Trailer'
      );
      const anyYoutube = videos.find((v: VideoTrailer) => v.site === 'YouTube');
      trailerKey = officialTrailer?.key || anyTrailer?.key || anyYoutube?.key || null;
    }

    // Reparto principal (primeros 8 actores)
    const cast: Actor[] = (dto.credits?.cast || [])
      .slice(0, 8)
      .map((c) => ({
        id: c.id,
        name: c.name,
        character: c.character,
        profilePath: c.profile_path,
      }));

    // Director
    const director =
      dto.credits?.crew?.find((person) => person.job === 'Director')?.name || null;

    // Calcular estatus teatral si no viene explícito
    let status: TheatricalStatus = theatricalInfo?.status || 'UNKNOWN';
    if (!theatricalInfo && dto.release_date) {
      const releaseTime = new Date(dto.release_date).getTime();
      const now = Date.now();
      const diffDays = (now - releaseTime) / (1000 * 3600 * 24);
      if (releaseTime > now) {
        status = 'UPCOMING';
      } else if (diffDays <= 120) {
        status = 'IN_THEATERS';
      } else {
        status = 'OUT_OF_THEATERS';
      }
    }

    return new Movie({
      id: dto.id,
      title: dto.title,
      overview: dto.overview,
      posterPath: dto.poster_path,
      backdropPath: dto.backdrop_path,
      voteAverage: dto.vote_average,
      voteCount: dto.vote_count,
      releaseDate: dto.release_date,
      genres: dto.genres || [],
      runtime: dto.runtime,
      budget: dto.budget,
      revenue: dto.revenue,
      tagline: dto.tagline,
      trailerKey,
      cast,
      director,
      theatricalStatus: status,
      peruReleaseDate: theatricalInfo?.peruReleaseDate || dto.release_date,
      peruCertification: theatricalInfo?.peruCertification || '14',
    });
  }

  public override toJson(): Record<string, unknown> {
    return {
      id: this.id,
      title: this.title,
      overview: this.overview,
      posterPath: this.posterPath,
      backdropPath: this.backdropPath,
      voteAverage: this.voteAverage,
      voteCount: this.voteCount,
      releaseDate: this.releaseDate,
      genres: this.genres,
      runtime: this.runtime,
      budget: this.budget,
      revenue: this.revenue,
      trailerKey: this.trailerKey,
      theatricalStatus: this.theatricalStatus,
      peruReleaseDate: this.peruReleaseDate,
      peruCertification: this.peruCertification,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
