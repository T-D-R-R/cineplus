/**
 * CinePlus - CriticAgent (Agente 1: Crítico Cinematográfico)
 * Especialista en narrativa, dirección, aspectos visuales y métricas de sentimiento de la comunidad.
 */

import { Movie } from '../../domain/Movie';
import { LlmService } from '../llm/LlmService';
import { SentimentClassifier } from '../ml/SentimentClassifier';
import type { AgentMessage } from './types';

export class CriticAgent {
  private llm = LlmService.getInstance();
  private sentimentClassifier = SentimentClassifier.getInstance();

  public async evaluate(
    movie: Movie,
    sampleReviews: string[] = []
  ): Promise<{
    message: AgentMessage;
    sentimentSummary: {
      positiveRatio: number;
      neutralRatio: number;
      negativeRatio: number;
      totalReviewsAnalyzed: number;
      dominantSentiment: string;
    };
  }> {
    // 1. Ejecutar análisis de sentimientos con Machine Learning (Naive Bayes) sobre las reseñas
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;

    for (const reviewText of sampleReviews) {
      const pred = this.sentimentClassifier.predict(reviewText);
      if (pred.sentiment === 'positivo') positiveCount++;
      else if (pred.sentiment === 'negativo') negativeCount++;
      else neutralCount++;
    }

    const total = Math.max(1, sampleReviews.length);
    const positiveRatio = Math.round((positiveCount / total) * 100);
    const negativeRatio = Math.round((negativeCount / total) * 100);
    const neutralRatio = 100 - positiveRatio - negativeRatio;

    let dominant = 'Mayormente Positivo';
    if (negativeRatio > positiveRatio && negativeRatio > neutralRatio) {
      dominant = 'Mayormente Crítico / Negativo';
    } else if (neutralRatio > positiveRatio) {
      dominant = 'Opiniones Divididas / Neutral';
    }

    // 2. Construir prompt para el LLM
    const genresList = movie.genres.map((g) => g.name).join(', ') || 'General';
    const castNames = movie.cast.slice(0, 3).map((a) => a.name).join(', ') || 'Elenco estelar';
    const directorName = movie.director || 'Dirección de renombre';

    const systemPrompt =
      'Eres el Crítico Cinematográfico Senior de CinePlus. Tu especialidad es evaluar la dirección, ' +
      'el arco de los personajes, el tono y la solidez del guion, apoyándote en métricas de audiencia. ' +
      'Sé perspicaz, apasionado y directo. No uses saludos genéricos.';

    const userPrompt =
      `Evalúa la película "${movie.title}".\n` +
      `Director: ${directorName}.\n` +
      `Elenco principal: ${castNames}.\n` +
      `Géneros: ${genresList}.\n` +
      `Calificación media: ${movie.voteAverage.toFixed(1)}/10.\n` +
      `Duración: ${movie.runtime || 120} minutos.\n` +
      `Sinopsis: ${movie.overview}\n` +
      `Análisis de Sentimiento de la Comunidad (ML Naive Bayes): ${positiveRatio}% Positivo, ${neutralRatio}% Neutral, ${negativeRatio}% Negativo.\n` +
      `Redacta tu dictamen crítico en 3 a 4 oraciones destacando si cinematográficamente vale la pena.`;

    const result = await this.llm.generateTextWithMetadata(userPrompt, {
      provider: 'gemini',
      model: 'gemini-3.5-flash-lite',
      systemPrompt,
      temperature: 0.65,
    });

    const message: AgentMessage = {
      id: `msg_critic_${Date.now()}`,
      role: 'CRITIC',
      agentName: 'Valeria Morales',
      agentTitle: 'Crítica de Arte (Google Gemini)',
      avatar: '🎬',
      badgeColor: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30',
      content: result.text,
      metrics: {
        'Motor de IA': result.providerUsed,
        'Calificación TMDb': `${movie.voteAverage.toFixed(1)} / 10`,
        'Recepción Comunidad (ML)': `${positiveRatio}% Favorable`,
        'Director': directorName,
      },
      timestamp: new Date(),
    };

    return {
      message,
      sentimentSummary: {
        positiveRatio,
        neutralRatio,
        negativeRatio,
        totalReviewsAnalyzed: sampleReviews.length,
        dominantSentiment: dominant,
      },
    };
  }
}
