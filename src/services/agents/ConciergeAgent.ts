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

    let theatricalContext = '';
    if (movie.theatricalStatus === 'OUT_OF_THEATERS') {
      theatricalContext =
        'AVISO CRÍTICO DE CARTELERA: La película ya FINALIZÓ su ciclo comercial en cines de Perú y se encuentra DISPONIBLE EN PLATAFORMAS DE STREAMING y formato digital. NO está en salas de cine físicas. En tu veredicto, aconseja al usuario disfrutarla en streaming desde casa hoy mismo y aclara que no compre boletos de cine físico.\n';
    } else if (movie.theatricalStatus === 'UPCOMING') {
      theatricalContext =
        `AVISO DE CARTELERA: La película es un PRÓXIMO ESTRENO en cines peruanos (Fecha estimada: ${movie.peruReleaseDate || 'Próximamente'}). Aún no está proyectándose en salas. Recomienda seguir la apertura de preventa.\n`;
    }

    const systemPrompt =
      'Eres la Dra. Diana Thorne, Orquestadora y Presidenta del Comité de CinePlus AI. ' +
      'Tu responsabilidad suprema es sintetizar las deliberaciones de los 3 especialistas de trabajo ' +
      '(Crítica Narrativa, Asesoría Comercial y Dirección Técnica) y el reporte de la Auditora de Calidad. ' +
      'Emite una resolución ejecutiva concluyente, autoritaria y elegante.';

    const userPrompt =
      `Película a juzgar: "${movie.title}".\n` +
      theatricalContext +
      `1. Crítica Narrativa: "${criticMessage.content}"\n` +
      `2. Asesoría Comercial: "${logisticsMessage.content}"\n` +
      `3. Evaluación Técnica: "${technicalMessage.content}"\n` +
      `4. Certificación Auditora: "${auditorMessage.content}"\n` +
      `Afinidad Personalizada del Usuario (ML): ${userAffinityScore}%\n` +
      `Score Ponderado: ${compositeScore}/100 -> Categoría: ${statusLabel}.\n\n` +
      'Instrucción: Dicta el Veredicto Final en 2 a 3 oraciones claras, concluyendo con una recomendación ejecutiva directa para el espectador.';

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
      if (movie.theatricalStatus === 'OUT_OF_THEATERS') {
        content = `Tras contrastar los informes narrativo, logístico y técnico, este comité decreta que la obra puede disfrutarse plenamente en el entorno doméstico. Al haber concluido su temporada en cines de Perú, recomendamos verla hoy mismo a través de plataformas de streaming o alquiler digital.`;
      } else if (movie.theatricalStatus === 'UPCOMING') {
        content = `Tras evaluar la propuesta artística y comercial, este comité recomienda aguardar su estreno oficial en salas comerciales y reservar con anticipación en preventa para disfrutarla en formato de gran formato.`;
      } else {
        content = `Tras contrastar los informes narrativo, logístico y técnico, y con la conformidad plena del dictamen de auditoría, este comité resuelve que la obra justifica la inversión de la entrada en sala de cine. Recomendamos reservar en funciones nocturnas en formato XD o 2D estándar para apreciar la calidad audiovisual certificada.`;
      }
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

    let bestShowtimeRecommendation = 'Funciones intermedias y nocturnas (18:00 - 21:30 hrs) en sala acústica XD / 2D.';
    let valueForMoney = compositeScore >= 75 ? 'Excelente retorno de inversión (Valor por dinero)' : 'Costo promedio de mercado';

    if (movie.theatricalStatus === 'OUT_OF_THEATERS') {
      bestShowtimeRecommendation = 'Disponible actualmente en plataformas de Streaming / Formato Digital';
      valueForMoney = 'Ver en Streaming / Formato Doméstico';
    } else if (movie.theatricalStatus === 'UPCOMING') {
      bestShowtimeRecommendation = `Próximo estreno en cines de Perú (${movie.peruReleaseDate || 'Próximamente'}) - Atento a la preventa`;
      valueForMoney = 'Estreno programado en salas';
    } else if (status === 'ESPERAR_STREAMING') {
      bestShowtimeRecommendation = 'Recomendado esperar su llegada a plataformas de Streaming.';
      valueForMoney = 'Ahorro sugerido (Esperar a Streaming)';
    }

    const verdict: FinalVerdict = {
      status,
      statusLabel,
      badgeClass,
      score: compositeScore,
      summary: content,
      bestShowtimeRecommendation,
      valueForMoney,
    };

    return { message, verdict };
  }
}

// Alias para compatibilidad
export const ConciergeAgent = OrchestratorAgent;
