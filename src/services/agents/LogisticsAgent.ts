/**
 * CinePlus - LogisticsAgent (Agente 2: Finanzas & Salas Comerciales)
 * Especialista en tarifas en Soles (S/.), formatos de sala (2D/3D/XD) y disponibilidad en cines de Perú.
 */

import { Movie } from '../../domain/Movie';
import { LlmService } from '../llm/LlmService';
import type { AgentMessage } from './types';

export interface ShowtimeDataSummary {
  theaterName: string;
  city: string;
  formats: string[];
  minPrice: number;
  maxPrice: number;
  availableHours: string[];
}

export class LogisticsAgent {
  private llm = LlmService.getInstance();

  public async evaluate(
    movie: Movie,
    showtimeData: ShowtimeDataSummary[] = []
  ): Promise<AgentMessage> {
    // Si no hay datos específicos de funciones para la película, usar datos representativos de cines peruanos
    const defaultData: ShowtimeDataSummary = {
      theaterName: 'Cineplanet / Cinemark',
      city: 'Huánuco / Perú',
      formats: ['2D', 'XD / 3D'],
      minPrice: 18.0,
      maxPrice: 26.0,
      availableHours: ['16:00', '18:45', '21:15'],
    };

    const targetShowtime = showtimeData[0] || defaultData;
    const priceRangeStr = `S/. ${targetShowtime.minPrice.toFixed(2)} - S/. ${targetShowtime.maxPrice.toFixed(2)}`;

    const systemPrompt =
      'Eres el Asesor Financiero y de Cartelera de CinePlus en Perú. Tu labor es aconsejar al usuario ' +
      'si vale la pena pagar la entrada en sala o esperar a plataformas de streaming, analizando ' +
      'los precios en Soles (S/.), formatos de pantalla (2D, XD, 3D) y la conveniencia de los horarios. ' +
      'Sé analítico, directo y pragmático con el bolsillo del espectador.';

    const userPrompt =
      `Evalúa la conveniencia comercial de ir al cine a ver "${movie.title}".\n` +
      `Duración: ${movie.runtime || 120} minutos.\n` +
      `Sede principal de referencia: ${targetShowtime.theaterName} (${targetShowtime.city}).\n` +
      `Rango de precios: ${priceRangeStr}.\n` +
      `Formatos disponibles: ${targetShowtime.formats.join(', ')}.\n` +
      `Horarios clave: ${targetShowtime.availableHours.join(', ')}.\n` +
      `Redacta tu dictamen comercial en 3 oraciones indicando qué formato conviene y si el costo justifica la experiencia en sala.`;

    const result = await this.llm.generateTextWithMetadata(userPrompt, {
      provider: 'openrouter',
      model: 'deepseek/deepseek-chat',
      systemPrompt,
      temperature: 0.6,
    });

    return {
      id: `msg_logistics_${Date.now()}`,
      role: 'LOGISTICS',
      agentName: 'Renzo Carranza',
      agentTitle: 'Asesor Comercial (DeepSeek / OpenRouter)',
      avatar: '🎟️',
      badgeColor: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
      content: result.text,
      metrics: {
        'Motor de IA': result.providerUsed,
        'Entrada Promedio': `S/. ${((targetShowtime.minPrice + targetShowtime.maxPrice) / 2).toFixed(2)}`,
        'Formato Recomendado': targetShowtime.formats[1] || targetShowtime.formats[0] || '2D',
        'Sede Referencial': targetShowtime.theaterName,
      },
      timestamp: new Date(),
    };
  }
}
