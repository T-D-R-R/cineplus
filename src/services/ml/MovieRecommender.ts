/**
 * CinePlus - MovieRecommender (Machine Learning)
 * Sistema de Recomendación Basado en Contenido mediante K-Nearest Neighbors (k-NN)
 * y cálculo de Similitud Coseno sobre espacios vectoriales de películas.
 */

import { Movie } from '../../domain/Movie';
import { VectorMath } from './VectorMath';

// Mapeo canónico de los 19 IDs de género de TMDb
const TMDB_GENRE_IDS = [
  28,    // Acción
  12,    // Aventura
  16,    // Animación
  35,    // Comedia
  80,    // Crimen
  99,    // Documental
  18,    // Drama
  10751, // Familia
  14,    // Fantasía
  36,    // Historia
  27,    // Terror
  10402, // Música
  9648,  // Misterio
  10749, // Romance
  878,   // Ciencia Ficción
  10770, // Película de TV
  53,    // Suspenso
  10752, // Bélica
  37     // Western
];

export interface MovieRecommendation {
  movie: Movie;
  similarityScore: number; // Porcentaje 0 a 100%
  affinityReasons: string[];
}

export class MovieRecommender {
  private static instance: MovieRecommender;

  private constructor() {}

  public static getInstance(): MovieRecommender {
    if (!MovieRecommender.instance) {
      MovieRecommender.instance = new MovieRecommender();
    }
    return MovieRecommender.instance;
  }

  /**
   * Construye el vector de características (Feature Vector) de una película.
   * Dimensión: 19 (géneros one/multi-hot) + 1 (voteAverage normalizado) + 1 (factor de popularidad)
   */
  public extractFeatureVector(movie: Movie): number[] {
    const genreMap = new Set(movie.genres.map((g) => g.id));
    
    // 1. Vector multi-hot de géneros (peso x 2.0 por ser la feature más determinante)
    const genreVector = TMDB_GENRE_IDS.map((id) => (genreMap.has(id) ? 2.0 : 0.0));

    // 2. Calificación promedio normalizada (0.0 a 1.0) con peso 1.2
    const ratingNormalized = (movie.voteAverage / 10.0) * 1.2;

    // 3. Antigüedad / año de estreno normalizado (peso 0.5)
    const releaseYear = parseInt(movie.releaseDate?.slice(0, 4) || '2024', 10);
    const yearNormalized = VectorMath.minMaxScale(releaseYear, 1990, 2026) * 0.5;

    return [...genreVector, ratingNormalized, yearNormalized];
  }

  /**
   * Algoritmo K-Nearest Neighbors (k-NN) para encontrar las K películas más similares
   * a una película de referencia según su vector de contenido.
   */
  public getSimilarMovies(
    targetMovie: Movie,
    catalog: Movie[],
    k = 4
  ): MovieRecommendation[] {
    const targetVector = this.extractFeatureVector(targetMovie);
    const targetGenreNames = new Set(targetMovie.genres.map((g) => g.name.toLowerCase()));

    const candidates = catalog.filter((m) => m.id !== targetMovie.id);

    const scored = candidates.map((candidate) => {
      const candidateVector = this.extractFeatureVector(candidate);
      const rawSimilarity = VectorMath.cosineSimilarity(targetVector, candidateVector);
      
      // Similitud escalada a porcentaje 0 - 100%
      const percentage = Math.min(100, Math.max(0, Math.round(rawSimilarity * 100)));

      // Identificar razones explicables de afinidad
      const sharedGenres = candidate.genres
        .filter((g) => targetGenreNames.has(g.name.toLowerCase()))
        .map((g) => g.name);

      const reasons: string[] = [];
      if (sharedGenres.length > 0) {
        reasons.push(`Comparte ${sharedGenres.length > 1 ? 'los géneros' : 'el género'} ${sharedGenres.join(' y ')}`);
      }
      if (Math.abs(candidate.voteAverage - targetMovie.voteAverage) <= 0.8) {
        reasons.push(`Nivel de recepción similar (${candidate.voteAverage.toFixed(1)}/10)`);
      }

      return {
        movie: candidate,
        similarityScore: percentage,
        affinityReasons: reasons,
      };
    });

    // Ordenar de mayor a menor similitud (k-NN)
    return scored.sort((a, b) => b.similarityScore - a.similarityScore).slice(0, k);
  }

  /**
   * Calcula el porcentaje de afinidad de un usuario hacia una película
   * basándose en sus géneros preferidos o historial de películas favoritas.
   */
  public calculateUserAffinity(
    movie: Movie,
    userPreferredGenreIds: number[] = [878, 28, 12] // Defaults: Sci-Fi, Acción, Aventura
  ): { affinityScore: number; explanation: string } {
    if (movie.genres.length === 0) {
      return { affinityScore: 65, explanation: 'Afinidad estándar por catálogo general.' };
    }

    const preferredSet = new Set(userPreferredGenreIds);
    let matchCount = 0;
    const matchedNames: string[] = [];

    for (const g of movie.genres) {
      if (preferredSet.has(g.id)) {
        matchCount++;
        matchedNames.push(g.name);
      }
    }

    // Fórmula de afinidad ponderada por géneros coincidentes + calidad
    const genreRatio = matchCount / Math.max(1, movie.genres.length);
    const ratingBonus = (movie.voteAverage / 10.0) * 20; // Hasta 20 pts de bono
    const baseScore = genreRatio * 75 + ratingBonus;
    const finalScore = Math.min(99, Math.max(40, Math.round(baseScore)));

    let explanation = '';
    if (matchCount > 0) {
      explanation = `Coincide con tus géneros predilectos: ${matchedNames.join(', ')}.`;
    } else {
      explanation = `Explora géneros diferentes a tu historial habitual.`;
    }

    return { affinityScore: finalScore, explanation };
  }
}
