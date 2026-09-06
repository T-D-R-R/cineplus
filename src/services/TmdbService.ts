import { BaseApiService } from './BaseApiService';
import { Movie } from '../domain/Movie';
import type { TmdbMovieDto } from '../domain/types';
import { getConfig } from '../core/config';

// Datos Mock Enriquecidos para modo demostrativo / fallback
const MOCK_MOVIES: TmdbMovieDto[] = [
  {
    id: 693134,
    title: 'Dune: Parte Dos',
    overview:
      'Sigue el viaje mítico de Paul Atreides mientras se une a Chani y los Fremen en una guerra de venganza contra los conspiradores que destruyeron a su familia. Frente a una elección entre el amor de su vida y el destino del universo, Paul se esfuerza por evitar un futuro terrible que solo él puede prever.',
    poster_path: '/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
    backdrop_path: '/xOMo8BRK7PfcJv9JCnx7s520DRq.jpg',
    vote_average: 8.2,
    vote_count: 5200,
    release_date: '2024-02-27',
    runtime: 166,
    budget: 190000000,
    revenue: 714444358,
    tagline: 'Larga vida a los combatientes.',
    genres: [
      { id: 878, name: 'Ciencia Ficción' },
      { id: 12, name: 'Aventura' },
    ],
    credits: {
      cast: [
        { id: 1190668, name: 'Timothée Chalamet', character: 'Paul Atreides', profile_path: '/BE2sdjpgsa2rNTFa66f7upkaOP.jpg', order: 0 },
        { id: 505710, name: 'Zendaya', character: 'Chani', profile_path: '/r2Ja5B8vK8652QZ6m4q1X73q2yq.jpg', order: 1 },
        { id: 933238, name: 'Rebecca Ferguson', character: 'Lady Jessica', profile_path: '/su4N3z3dMeqo2h9rP3Vz7rX10P2.jpg', order: 2 },
        { id: 38940, name: 'Javier Bardem', character: 'Stilgar', profile_path: '/gr4Vd26H4f7fN5nC9f4o2N5N4K4.jpg', order: 3 },
      ],
      crew: [{ id: 137427, name: 'Denis Villeneuve', job: 'Director', department: 'Directing' }],
    },
    videos: {
      results: [
        { id: '1', key: 'Way9Dexny3w', name: 'Trailer Oficial', site: 'YouTube', type: 'Trailer', official: true },
      ],
    },
  },
  {
    id: 1022789,
    title: 'Intensa-Mente 2',
    overview:
      'Regresa a la mente de la recién graduada adolescente Riley, justo cuando la sede central está pasando por una repentina demolición para dar paso a algo totalmente inesperado: ¡nuevas emociones! Alegría, Tristeza, Furia, Temor y Desagrado no están seguros de cómo sentirse cuando aparece Ansiedad.',
    poster_path: '/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
    backdrop_path: '/stKGOmWZtiZ16r59Q6uqToGIIql.jpg',
    vote_average: 7.6,
    vote_count: 4800,
    release_date: '2024-06-12',
    runtime: 96,
    budget: 200000000,
    revenue: 1698000000,
    tagline: 'Haz espacio para nuevas emociones.',
    genres: [
      { id: 16, name: 'Animación' },
      { id: 10751, name: 'Familia' },
      { id: 35, name: 'Comedia' },
    ],
    credits: {
      cast: [
        { id: 23625, name: 'Amy Poehler', character: 'Alegría (voz)', profile_path: '/rwmvRonGuhA6c0v0Q7K1R5t2Z1y.jpg', order: 0 },
        { id: 1083010, name: 'Maya Hawke', character: 'Ansiedad (voz)', profile_path: '/x4n7l8B5N6Q3m9n0L1X8v4n7Q.jpg', order: 1 },
      ],
      crew: [{ id: 134567, name: 'Kelsey Mann', job: 'Director', department: 'Directing' }],
    },
    videos: {
      results: [
        { id: '2', key: 'LEjhY15eCx0', name: 'Trailer Oficial', site: 'YouTube', type: 'Trailer', official: true },
      ],
    },
  },
  {
    id: 533535,
    title: 'Deadpool & Wolverine',
    overview:
      'Un apático Wade Wilson se esfuerza por llevar una vida civilizada. Sus días como el mercenario moralmente flexible Deadpool quedaron atrás. Pero cuando su mundo natal se enfrenta a una amenaza existencial, Wade debe volver a ponerse el traje a regañadientes con un Wolverine aún más reacio.',
    poster_path: '/9TFSqghEHrlBMRR60hn2cuEZMr9.jpg',
    backdrop_path: '/yDHYTjA3R0ZLi7dm9Q4iWZDAR9Q.jpg',
    vote_average: 7.7,
    vote_count: 6100,
    release_date: '2024-07-24',
    runtime: 128,
    budget: 200000000,
    revenue: 1337000000,
    tagline: 'Juntos son dinamita.',
    genres: [
      { id: 28, name: 'Acción' },
      { id: 35, name: 'Comedia' },
      { id: 878, name: 'Ciencia Ficción' },
    ],
    credits: {
      cast: [
        { id: 10859, name: 'Ryan Reynolds', character: 'Wade Wilson / Deadpool', profile_path: '/h1co81Qa92CY0j1BGw8umTrbwm.jpg', order: 0 },
        { id: 6968, name: 'Hugh Jackman', character: 'Logan / Wolverine', profile_path: '/4XujBEqJhEHQegql9yXQdtk62N7.jpg', order: 1 },
      ],
      crew: [{ id: 17825, name: 'Shawn Levy', job: 'Director', department: 'Directing' }],
    },
    videos: {
      results: [
        { id: '3', key: '73_1biulkYk', name: 'Trailer Oficial', site: 'YouTube', type: 'Trailer', official: true },
      ],
    },
  },
  {
    id: 438631,
    title: 'Dune',
    overview:
      'Paul Atreides, un joven brillante y talentoso nacido con un gran destino más allá de su comprensión, debe viajar al planeta más peligroso del universo para asegurar el futuro de su familia y su pueblo.',
    poster_path: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    backdrop_path: '/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg',
    vote_average: 7.8,
    vote_count: 11000,
    release_date: '2021-09-15',
    runtime: 155,
    budget: 165000000,
    revenue: 402000000,
    tagline: 'Más allá del miedo, el destino espera.',
    genres: [
      { id: 878, name: 'Ciencia Ficción' },
      { id: 12, name: 'Aventura' },
    ],
    credits: {
      cast: [
        { id: 1190668, name: 'Timothée Chalamet', character: 'Paul Atreides', profile_path: '/BE2sdjpgsa2rNTFa66f7upkaOP.jpg', order: 0 },
        { id: 933238, name: 'Rebecca Ferguson', character: 'Lady Jessica', profile_path: '/su4N3z3dMeqo2h9rP3Vz7rX10P2.jpg', order: 1 },
      ],
      crew: [{ id: 137427, name: 'Denis Villeneuve', job: 'Director', department: 'Directing' }],
    },
    videos: {
      results: [
        { id: '4', key: 'n9xhJrPXop4', name: 'Trailer Oficial', site: 'YouTube', type: 'Trailer', official: true },
      ],
    },
  },
  {
    id: 933260,
    title: 'La Sustancia',
    overview:
      '¿Alguna vez has soñado con una versión mejor de ti misma? Más joven, más bella, más perfecta. Un solo producto puede cambiarlo todo: La Sustancia. Genera otra tú, una nueva versión con la que compartirás el tiempo.',
    poster_path: '/w1x9v3aBqN7jFwF1Y3d4b6bF9.jpg',
    backdrop_path: '/7h6r9uv8rXjG6gqfW0q9z7B4Y.jpg',
    vote_average: 7.3,
    vote_count: 2400,
    release_date: '2024-09-18',
    runtime: 141,
    budget: 17500000,
    revenue: 77000000,
    tagline: 'Si sigues las instrucciones, ¿qué podría salir mal?',
    genres: [
      { id: 27, name: 'Terror' },
      { id: 878, name: 'Ciencia Ficción' },
      { id: 18, name: 'Drama' },
    ],
    credits: {
      cast: [
        { id: 3416, name: 'Demi Moore', character: 'Elisabeth Sparkle', profile_path: '/v0vVv8uN8uV7n6B5b.jpg', order: 0 },
        { id: 1253360, name: 'Margaret Qualley', character: 'Sue', profile_path: '/v7n6B5b8uV7n6B5b.jpg', order: 1 },
      ],
      crew: [{ id: 154678, name: 'Coralie Fargeat', job: 'Director', department: 'Directing' }],
    },
    videos: {
      results: [
        { id: '5', key: 'LNlrGH5s7eE', name: 'Trailer Oficial', site: 'YouTube', type: 'Trailer', official: true },
      ],
    },
  },
];

export class TmdbService extends BaseApiService {
  private static instance: TmdbService;

  private constructor() {
    super(getConfig().tmdbBaseUrl);
  }

  public static getInstance(): TmdbService {
    if (!TmdbService.instance) {
      TmdbService.instance = new TmdbService();
    }
    return TmdbService.instance;
  }

  private getAuthQuery(): string {
    const key = getConfig().tmdbApiKey;
    return key ? `api_key=${encodeURIComponent(key)}` : '';
  }

  /**
   * Obtiene la cartelera actual (Now Playing).
   */
  public async getNowPlaying(page = 1): Promise<{ movies: Movie[]; page: number; totalPages: number }> {
    const authQuery = this.getAuthQuery();
    if (!authQuery) {
      // Fallback a mock data
      return {
        movies: MOCK_MOVIES.map((m) => Movie.fromTmdbDto(m)),
        page: 1,
        totalPages: 1,
      };
    }

    try {
      const data = await this.request<{
        page: number;
        results: TmdbMovieDto[];
        total_pages: number;
      }>(`/movie/now_playing?${authQuery}&language=es-MX&page=${page}`);

      return {
        movies: (data.results || []).map((dto) => Movie.fromTmdbDto(dto)),
        page: data.page,
        totalPages: data.total_pages,
      };
    } catch (error) {
      console.warn('Fallo al conectar con TMDb, usando respaldo local:', error);
      return {
        movies: MOCK_MOVIES.map((m) => Movie.fromTmdbDto(m)),
        page: 1,
        totalPages: 1,
      };
    }
  }

  /**
   * Búsqueda en tiempo real por título.
   */
  public async searchMovies(query: string, page = 1): Promise<{ movies: Movie[]; page: number; totalPages: number }> {
    if (!query.trim()) {
      return this.getNowPlaying(page);
    }

    const authQuery = this.getAuthQuery();
    if (!authQuery) {
      const q = query.toLowerCase();
      const filtered = MOCK_MOVIES.filter(
        (m) => m.title.toLowerCase().includes(q) || m.overview.toLowerCase().includes(q)
      );
      return {
        movies: filtered.map((m) => Movie.fromTmdbDto(m)),
        page: 1,
        totalPages: 1,
      };
    }

    try {
      const data = await this.request<{
        page: number;
        results: TmdbMovieDto[];
        total_pages: number;
      }>(`/search/movie?${authQuery}&language=es-MX&query=${encodeURIComponent(query)}&page=${page}`);

      return {
        movies: (data.results || []).map((dto) => Movie.fromTmdbDto(dto)),
        page: data.page,
        totalPages: data.total_pages,
      };
    } catch (error) {
      console.warn('Error en búsqueda TMDb, filtrando en respaldo local:', error);
      const q = query.toLowerCase();
      const filtered = MOCK_MOVIES.filter((m) => m.title.toLowerCase().includes(q));
      return {
        movies: filtered.map((m) => Movie.fromTmdbDto(m)),
        page: 1,
        totalPages: 1,
      };
    }
  }

  /**
   * Ficha técnica detallada con créditos y videos (append_to_response).
   */
  public async getMovieDetails(movieId: number): Promise<Movie> {
    const authQuery = this.getAuthQuery();
    if (!authQuery) {
      const found = MOCK_MOVIES.find((m) => m.id === Number(movieId)) || MOCK_MOVIES[0];
      return Movie.fromTmdbDto(found);
    }

    try {
      const data = await this.request<
        TmdbMovieDto & {
          release_dates?: {
            results: Array<{
              iso_3166_1: string;
              release_dates: Array<{
                certification: string;
                release_date: string;
                type: number;
              }>;
            }>;
          };
        }
      >(`/movie/${movieId}?${authQuery}&language=es-MX&append_to_response=credits,videos,release_dates`);

      // Analizar estado en cartelera en Perú (PE)
      let theatricalStatus: 'IN_THEATERS' | 'UPCOMING' | 'OUT_OF_THEATERS' | 'UNKNOWN' = 'IN_THEATERS';
      let peruReleaseDate: string | null = null;
      let peruCertification: string | null = null;

      if (data.release_dates?.results) {
        const peRelease =
          data.release_dates.results.find((r) => r.iso_3166_1 === 'PE') ||
          data.release_dates.results.find((r) => r.iso_3166_1 === 'MX') ||
          data.release_dates.results.find((r) => r.iso_3166_1 === 'US');

        if (peRelease && peRelease.release_dates.length > 0) {
          const theatrical =
            peRelease.release_dates.find((rd) => rd.type === 3 || rd.type === 2) ||
            peRelease.release_dates[0];

          peruReleaseDate = theatrical.release_date || data.release_date;
          peruCertification = theatrical.certification || '14';

          const releaseTime = new Date(peruReleaseDate).getTime();
          const now = Date.now();
          const diffDays = (now - releaseTime) / (1000 * 3600 * 24);

          if (releaseTime > now) {
            theatricalStatus = 'UPCOMING';
          } else if (diffDays <= 150) {
            theatricalStatus = 'IN_THEATERS';
          } else {
            theatricalStatus = 'OUT_OF_THEATERS';
          }
        }
      }

      return Movie.fromTmdbDto(data, {
        status: theatricalStatus,
        peruReleaseDate,
        peruCertification,
      });
    } catch (error) {
      console.warn(`Error obteniendo detalles de película ${movieId}, usando respaldo:`, error);
      const found = MOCK_MOVIES.find((m) => m.id === Number(movieId)) || MOCK_MOVIES[0];
      return Movie.fromTmdbDto(found);
    }
  }

  /**
   * Obtiene películas mejor valoradas (Top Rated).
   */
  public async getTopRated(page = 1): Promise<Movie[]> {
    const authQuery = this.getAuthQuery();
    if (!authQuery) {
      return [...MOCK_MOVIES]
        .sort((a, b) => b.vote_average - a.vote_average)
        .map((m) => Movie.fromTmdbDto(m));
    }

    try {
      const data = await this.request<{ results: TmdbMovieDto[] }>(
        `/movie/top_rated?${authQuery}&language=es-MX&page=${page}`
      );
      return (data.results || []).map((dto) => Movie.fromTmdbDto(dto));
    } catch {
      return MOCK_MOVIES.map((m) => Movie.fromTmdbDto(m));
    }
  }

  /**
   * Obtiene próximos estrenos (Upcoming).
   */
  public async getUpcoming(page = 1): Promise<Movie[]> {
    const authQuery = this.getAuthQuery();
    if (!authQuery) {
      return MOCK_MOVIES.map((m) => Movie.fromTmdbDto(m));
    }

    try {
      const data = await this.request<{ results: TmdbMovieDto[] }>(
        `/movie/upcoming?${authQuery}&language=es-MX&page=${page}`
      );
      return (data.results || []).map((dto) => Movie.fromTmdbDto(dto));
    } catch {
      return MOCK_MOVIES.map((m) => Movie.fromTmdbDto(m));
    }
  }
}

export const tmdbService = TmdbService.getInstance();
