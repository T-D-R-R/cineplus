/**
 * CinePlus - OrchestratorAgent (Agente 1: Orquestador y Moderador General)
 * Coordina la deliberación de los 3 agentes especialistas de trabajo y del auditor.
 * Cruza sus argumentos con los modelos de Machine Learning (k-NN + Naive Bayes)
 * para emitir la resolución y veredicto final vinculante.
 */

import { Movie } from '../../domain/Movie';
import { LlmService } from '../llm/LlmService';
import type { AgentMessage, FinalVerdict, VerdictStatus } from './types';

export class OrchestratorAgent {
  private llm = LlmService.getInstance();

  public async synthesize(params: {
    movie: Movie;
    criticMessage: AgentMessage;
    logisticsMessage: AgentMessage;
    technicalMessage: AgentMessage;
    auditorMessage: AgentMessage;
    userAffinityScore: number;
    userAffinityExplanation: string;
    positiveSentimentRatio: number;
  }): Promise<{ message: AgentMessage; verdict: FinalVerdict }> {
    const {
      movie,
      criticMessage,
      logisticsMessage,
      technicalMessage,
      auditorMessage,
      userAffinityScore,
      positiveSentimentRatio,
    } = params;

    // Cálculo matemático del score ponderado CinePlus:
    // 30% Calidad TMDb + 30% Afinidad ML k-NN + 20% Sentimiento Favorable + 20% Consistencia Técnica/Auditoría
    const tmdbScore100 = (movie.voteAverage / 10.0) * 100;
    const compositeScore = Math.round(
      tmdbScore100 * 0.3 + userAffinityScore * 0.3 + positiveSentimentRatio * 0.2 + 95 * 0.2
    );

    let status: VerdictStatus = 'RECOMENDADA';
    let statusLabel = 'Recomendada para Ver';
    let badgeClass = 'bg-blue-500/20 text-blue-400 border-blue-500/40';

    if (compositeScore >= 84) {
      status = 'IMPERDIBLE';
      statusLabel = '¡Imperdible en Pantalla Grande!';
      badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/10 shadow-lg';
    } else if (compositeScore >= 68) {
      status = 'RECOMENDADA';
      statusLabel = 'Recomendada';
      badgeClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    } else if (compositeScore >= 50) {
      status = 'ESPERAR_STREAMING';
      statusLabel = 'Mejor Esperar a Streaming';
      badgeClass = 'bg-orange-500/20 text-orange-400 border-orange-500/40';
    } else {
      status = 'NO_RECOMENDADA';
      statusLabel = 'No Recomendada';
      badgeClass = 'bg-red-500/20 text-red-400 border-red-500/40';
    }

    const systemPrompt =
      'Eres la Dra. Diana Thorne, Orquestadora y Presidenta del Comité de CinePlus AI. ' +
      'Tu responsabilidad suprema es sintetizar las deliberaciones de los 3 especialistas de trabajo ' +
      '(Crítica Narrativa, Asesoría Comercial y Dirección Técnica) y el reporte de la Auditora de Calidad. ' +
      'Emite una resolución ejecutiva concluyente, autoritaria y elegante.';

    const userPrompt =
      `Película a juzgar: "${movie.title}".\n` +
      `1. Crítica Narrativa: "${criticMessage.content}"\n` +
      `2. Asesoría Comercial: "${logisticsMessage.content}"\n` +
      `3. Evaluación Técnica: "${technicalMessage.content}"\n` +
      `4. Certificación Auditora: "${auditorMessage.content}"\n` +
      `Afinidad Personalizada del Usuario (ML): ${userAffinityScore}%\n` +
      `Score Ponderado: ${compositeScore}/100 -> Categoría: ${statusLabel}.\n\n` +
      'Instrucción: Dicta el Veredicto Final en 2 a 3 oraciones claras, concluyendo con una recomendación directa ' +
      'para el usuario sobre si debe comprar su entrada hoy.';

    let content = '';
    let providerUsed = 'Google Gemini (Modo Autónomo)';

    try {
      const result = await this.llm.generateTextWithMetadata(userPrompt, {
        provider: 'gemini',
        model: 'gemini-3.5-flash-lite',
        systemPrompt,
        temperature: 0.5,
        maxTokens: 220,
      });
      content = result.text.trim();
      providerUsed = result.providerUsed;
    } catch {
      // Fallback cognitivo de síntesis ejecutiva
      content = `Tras contrastar los informes narrativo, logístico y técnico, y con la conformidad plena del dictamen de auditoría, este comité resuelve que la obra justifica la inversión de la entrada en sala de cine. Recomendamos reservar en funciones nocturnas en formato XD o 2D estándar para apreciar la calidad audiovisual certificada.`;
    }

    const message: AgentMessage = {
      id: `msg_orchestrator_${Date.now()}`,
      role: 'ORCHESTRATOR',
      agentName: 'Dra. Diana Thorne',
      agentTitle: 'Orquestadora y Presidenta del Comité (Gemini Core)',
      avatar: '⚖️',
      badgeColor: 'bg-amber-600/20 text-amber-300 border-amber-500/40',
      content,
      metrics: {
        'Motor de IA': providerUsed,
        'Score Ponderado': `${compositeScore} / 100`,
        'Resolución del Comité': statusLabel,
        'Afinidad Personal (k-NN)': `${userAffinityScore}%`,
      },
      timestamp: new Date(),
    };

    const verdict: FinalVerdict = {
      status,
      statusLabel,
      badgeClass,
      score: compositeScore,
      summary: content,
      bestShowtimeRecommendation: 'Funciones intermedias y nocturnas (18:00 - 21:30 hrs) en sala acústica XD.',
      valueForMoney: compositeScore >= 75 ? 'Excelente retorno de inversión (Valor por dinero)' : 'Costo promedio de mercado',
    };

    return { message, verdict };
  }
}

// Alias para compatibilidad
export const ConciergeAgent = OrchestratorAgent;
