/**
 * CinePlus - ConciergeAgent (Agente 3: Moderador y Juez Supremo)
 * Sintetiza los argumentos del Crítico y del Asesor Financiero con la afinidad del modelo ML
 * para emitir el veredicto final vinculante.
 */

import { Movie } from '../../domain/Movie';
import { LlmService } from '../llm/LlmService';
import type { AgentMessage, FinalVerdict, VerdictStatus } from './types';

export class ConciergeAgent {
  private llm = LlmService.getInstance();

  public async synthesize(params: {
    movie: Movie;
    criticMessage: AgentMessage;
    logisticsMessage: AgentMessage;
    userAffinityScore: number;
    userAffinityExplanation: string;
    positiveSentimentRatio: number;
  }): Promise<{ message: AgentMessage; verdict: FinalVerdict }> {
    const { movie, criticMessage, logisticsMessage, userAffinityScore, positiveSentimentRatio } = params;

    // Cálculo matemático del score ponderado CinePlus:
    // 35% Calidad TMDb (escala 0-100) + 35% Afinidad ML del Usuario + 30% Sentimiento Favorable de la comunidad
    const tmdbScore100 = (movie.voteAverage / 10.0) * 100;
    const compositeScore = Math.round(
      tmdbScore100 * 0.35 + userAffinityScore * 0.35 + positiveSentimentRatio * 0.3
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
      'Eres el Moderador Jefe y Conciliador de CinePlus. Tu misión es tomar la opinión del Crítico Cinematográfico ' +
      'y del Asesor Financiero, cruzarlas con el perfil de afinidad del usuario y dictar una conclusión firme ' +
      'y definitiva. Habla con autoridad, claridad y calidez.';

    const userPrompt =
      `Película a juzgar: "${movie.title}".\n` +
      `Postura del Crítico: "${criticMessage.content}"\n` +
      `Postura del Asesor Comercial: "${logisticsMessage.content}"\n` +
      `Afinidad Personalizada del Usuario (ML): ${userAffinityScore}%\n` +
      `Puntaje Ponderado Final: ${compositeScore}/100.\n` +
      `Categoría asignada: ${statusLabel}.\n` +
      `Redacta el veredicto final en 3 oraciones concisas, aconsejando qué decisión debe tomar el usuario hoy.`;

    const result = await this.llm.generateTextWithMetadata(userPrompt, {
      provider: 'grok',
      model: 'grok-2-latest',
      systemPrompt,
      temperature: 0.5,
    });

    const message: AgentMessage = {
      id: `msg_concierge_${Date.now()}`,
      role: 'CONCIERGE',
      agentName: 'Diana Thorne',
      agentTitle: 'Moderadora Jefe (xAI Grok)',
      avatar: '⚖️',
      badgeColor: 'bg-amber-600/20 text-amber-400 border-amber-500/30',
      content: result.text,
      metrics: {
        'Motor de IA': result.providerUsed,
        'Score Combinado': `${compositeScore} / 100`,
        'Decisión del Comité': statusLabel,
        'Afinidad Personal': `${userAffinityScore}%`,
      },
      timestamp: new Date(),
    };

    const verdict: FinalVerdict = {
      status,
      statusLabel,
      badgeClass,
      score: compositeScore,
      summary: result.text,
      bestShowtimeRecommendation: 'Funciones nocturnas (18:30 - 21:30 hrs) en sala acústica.',
      valueForMoney: compositeScore >= 75 ? 'Excelente relación calidad-precio' : 'Costo regular respecto a la oferta',
    };

    return { message, verdict };
  }
}
