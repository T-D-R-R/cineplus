/**
 * CinePlus - AgentCoordinator
 * Orquestador principal del Sistema Multi-Agente
 * Coordina la deliberación secuencial entre el Crítico, el Asesor Logístico y la Moderadora Jefe.
 */

import { Movie } from '../../domain/Movie';
import { MovieRecommender } from '../ml/MovieRecommender';
import { SupabaseService } from '../SupabaseService';
import { CriticAgent } from './CriticAgent';
import { LogisticsAgent, type ShowtimeDataSummary } from './LogisticsAgent';
import { ConciergeAgent } from './ConciergeAgent';
import type { MultiAgentDeliberation } from './types';
import { REVIEWS_DATASET } from '../ml/data/reviewsDataset';

export class AgentCoordinator {
  private static instance: AgentCoordinator;
  private movieRecommender = MovieRecommender.getInstance();
  private supabaseService = SupabaseService.getInstance();

  private criticAgent = new CriticAgent();
  private logisticsAgent = new LogisticsAgent();
  private conciergeAgent = new ConciergeAgent();

  private constructor() {}

  public static getInstance(): AgentCoordinator {
    if (!AgentCoordinator.instance) {
      AgentCoordinator.instance = new AgentCoordinator();
    }
    return AgentCoordinator.instance;
  }

  /**
   * Ejecuta la deliberación multi-agente completa para una película dada.
   * Permite enviar una función de progreso (callback) para actualizar la UI paso a paso.
   */
  public async deliberateMovie(
    movie: Movie,
    onStepUpdate?: (stepDescription: string) => void
  ): Promise<MultiAgentDeliberation> {
    // -------------------------------------------------------------
    // Paso 1: Cálculo de Machine Learning (Afinidad de Usuario)
    // -------------------------------------------------------------
    onStepUpdate?.('1/4 Calculando afinidad con el modelo de Machine Learning (k-NN)...');
    const { affinityScore, explanation } = this.movieRecommender.calculateUserAffinity(movie);

    // -------------------------------------------------------------
    // Paso 2: Recopilación y Análisis de Reseñas (ML Naive Bayes)
    // -------------------------------------------------------------
    onStepUpdate?.('2/4 El Agente Crítico está evaluando el guion y el sentimiento de la audiencia...');
    
    // Obtener reseñas reales de Supabase o filtrar del dataset local de 500 reseñas
    let reviewTexts: string[] = [];
    const movieIdNum = Number(movie.id);
    try {
      const dbReviews = await this.supabaseService.getReviews(movieIdNum);
      if (dbReviews.length > 0) {
        reviewTexts = dbReviews.map((r) => r.comment);
      }
    } catch {
      // Ignorar error si no hay conexión a Supabase
    }

    if (reviewTexts.length === 0) {
      // Usar reseñas del dataset que coincidan con la película o fallback general
      const matches = REVIEWS_DATASET.filter((r) => r.tmdb_movie_id === movieIdNum);
      if (matches.length > 0) {
        reviewTexts = matches.map((m) => m.comentario);
      } else {
        reviewTexts = [
          'Efectos visuales y ambientación de primer nivel en cada secuencia.',
          'Gran fidelidad al material de origen con momentos de enorme tensión cinematográfica.',
          'Una de las mejores experiencias en cartelera de este año.',
        ];
      }
    }

    const { message: criticMessage, sentimentSummary } = await this.criticAgent.evaluate(
      movie,
      reviewTexts
    );

    // -------------------------------------------------------------
    // Paso 3: Análisis Logístico y Financiero (Supabase / Precios)
    // -------------------------------------------------------------
    onStepUpdate?.('3/4 El Agente Comercial está cotizando cines, salas y tarifas en Soles...');
    
    const showtimesSummary: ShowtimeDataSummary[] = [];
    try {
      const cinemaGroups = await this.supabaseService.getCinemasForMovie(movieIdNum);
      if (cinemaGroups.length > 0) {
        for (const group of cinemaGroups) {
          const formats = new Set<string>();
          const prices: number[] = [];
          const hours: string[] = [];

          for (const st of group.showtimes) {
            formats.add(st.format || '2D');
            prices.push(st.price);
            hours.push(st.time);
          }

          showtimesSummary.push({
            theaterName: group.cinema.name,
            city: group.cinema.city || 'Huánuco',
            formats: formats.size > 0 ? Array.from(formats) : ['2D', 'XD'],
            minPrice: prices.length > 0 ? Math.min(...prices) : 18.0,
            maxPrice: prices.length > 0 ? Math.max(...prices) : 26.0,
            availableHours: hours.length > 0 ? hours.slice(0, 3) : ['16:00', '19:00', '21:30'],
          });
        }
      }
    } catch {
      // Usar datos por defecto
    }

    const logisticsMessage = await this.logisticsAgent.evaluate(movie, showtimesSummary);

    // -------------------------------------------------------------
    // Paso 4: Síntesis del Moderador y Veredicto Final Vinculante
    // -------------------------------------------------------------
    onStepUpdate?.('4/4 La Moderadora Jefe está redactando el Veredicto Final...');
    const { message: conciergeMessage, verdict } = await this.conciergeAgent.synthesize({
      movie,
      criticMessage,
      logisticsMessage,
      userAffinityScore: affinityScore,
      userAffinityExplanation: explanation,
      positiveSentimentRatio: sentimentSummary.positiveRatio,
    });

    onStepUpdate?.('¡Deliberación completada!');

    return {
      movie,
      userAffinityScore: affinityScore,
      userAffinityExplanation: explanation,
      sentimentStats: sentimentSummary,
      messages: [criticMessage, logisticsMessage, conciergeMessage],
      verdict,
      completedAt: new Date(),
    };
  }
}
