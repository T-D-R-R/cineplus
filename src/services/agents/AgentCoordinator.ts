/**
 * CinePlus - AgentCoordinator (Arquitectura de 5 Agentes)
 * Orquestador principal del Comité Asesor CinePlus AI:
 * - 1 Orquestador / Moderador General (Dra. Diana Thorne)
 * - 3 Especialistas de Trabajo:
 *     1. Crítica de Arte y Narrativa (Lic. Valeria Morales + ML Naive Bayes)
 *     2. Asesor Comercial y Logístico (Econ. Renzo Carranza)
 *     3. Consultor Técnico y Audiovisual (Ing. Mateo Sotomayor)
 * - 1 Auditor de Calidad y Fact-Checking (Dra. Beatriz Véliz)
 */

import { Movie } from '../../domain/Movie';
import { MovieRecommender } from '../ml/MovieRecommender';
import { SupabaseService } from '../SupabaseService';
import { CriticAgent } from './CriticAgent';
import { LogisticsAgent, type ShowtimeDataSummary } from './LogisticsAgent';
import { TechnicalAgent } from './TechnicalAgent';
import { AuditorAgent } from './AuditorAgent';
import { OrchestratorAgent } from './ConciergeAgent';
import type { MultiAgentDeliberation } from './types';
import { REVIEWS_DATASET } from '../ml/data/reviewsDataset';

export class AgentCoordinator {
  private static instance: AgentCoordinator;
  private movieRecommender = MovieRecommender.getInstance();
  private supabaseService = SupabaseService.getInstance();

  private criticAgent = new CriticAgent();
  private logisticsAgent = new LogisticsAgent();
  private technicalAgent = new TechnicalAgent();
  private auditorAgent = new AuditorAgent();
  private orchestratorAgent = new OrchestratorAgent();

  private constructor() {}

  public static getInstance(): AgentCoordinator {
    if (!AgentCoordinator.instance) {
      AgentCoordinator.instance = new AgentCoordinator();
    }
    return AgentCoordinator.instance;
  }

  /**
   * Ejecuta la deliberación completa de los 5 Agentes para una película dada.
   * Permite enviar una función de callback para actualizar la barra de progreso en vivo.
   */
  public async deliberateMovie(
    movie: Movie,
    onStepUpdate?: (stepDescription: string) => void
  ): Promise<MultiAgentDeliberation> {
    // -------------------------------------------------------------
    // Paso 1: Cálculo de Machine Learning (Afinidad de Usuario k-NN)
    // -------------------------------------------------------------
    onStepUpdate?.('1/6 Calculando afinidad con el modelo de Machine Learning (k-NN)...');
    const { affinityScore, explanation } = this.movieRecommender.calculateUserAffinity(movie);

    // -------------------------------------------------------------
    // Paso 2: Agente 2 - Crítica Narrativa y Sentimiento (Naive Bayes)
    // -------------------------------------------------------------
    onStepUpdate?.('2/6 [Agente 2 - Crítica]: Evaluando libreto y sentimiento de la comunidad (Naive Bayes)...');
    
    let reviewTexts: string[] = [];
    const movieIdNum = Number(movie.id);
    try {
      const dbReviews = await this.supabaseService.getReviews(movieIdNum);
      if (dbReviews.length > 0) {
        reviewTexts = dbReviews.map((r) => r.comment);
      }
    } catch {
      // Ignorar si no hay conexión
    }

    if (reviewTexts.length === 0) {
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
    // Paso 3: Agente 3 - Asesor Comercial y Logístico (Cines en Soles)
    // -------------------------------------------------------------
    onStepUpdate?.('3/6 [Agente 3 - Comercial]: Cotizando salas peruanas (Huánuco, Huancayo, Lima) y tarifas en Soles...');
    
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
      // Respaldo
    }

    const logisticsMessage = await this.logisticsAgent.evaluate(movie, showtimesSummary);

    // -------------------------------------------------------------
    // Paso 4: Agente 4 - Consultor Técnico & Audiovisual (VFX/Sonido)
    // -------------------------------------------------------------
    onStepUpdate?.('4/6 [Agente 4 - Técnico]: Analizando cinematografía, VFX y diseño sonoro Dolby Atmos...');
    const technicalMessage = await this.technicalAgent.evaluate(movie);

    // -------------------------------------------------------------
    // Paso 5: Agente 5 - Auditora de Calidad y Fact-Checking
    // -------------------------------------------------------------
    onStepUpdate?.('5/6 [Agente 5 - Auditora]: Realizando Fact-Checking contra TMDb y auditando sesgos lógicos...');
    const { message: auditorMessage, auditMetrics } = await this.auditorAgent.audit({
      movie,
      criticMessage,
      logisticsMessage,
      technicalMessage,
      positiveSentimentRatio: sentimentSummary.positiveRatio,
    });

    // -------------------------------------------------------------
    // Paso 6: Agente 1 - Orquestadora y Resolución Vinculante
    // -------------------------------------------------------------
    onStepUpdate?.('6/6 [Agente 1 - Orquestadora]: Sintetizando los 4 reportes y redactando el Veredicto Final...');
    const { message: orchestratorMessage, verdict } = await this.orchestratorAgent.synthesize({
      movie,
      criticMessage,
      logisticsMessage,
      technicalMessage,
      auditorMessage,
      userAffinityScore: affinityScore,
      userAffinityExplanation: explanation,
      positiveSentimentRatio: sentimentSummary.positiveRatio,
    });

    onStepUpdate?.('¡Deliberación de los 5 agentes completada!');

    return {
      movie,
      userAffinityScore: affinityScore,
      userAffinityExplanation: explanation,
      sentimentStats: sentimentSummary,
      auditMetrics,
      messages: [criticMessage, logisticsMessage, technicalMessage, auditorMessage, orchestratorMessage],
      verdict,
      completedAt: new Date(),
    };
  }
}
