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
    const isOutOfTheaters = movie.theatricalStatus === 'OUT_OF_THEATERS';
    const isUpcoming = movie.theatricalStatus === 'UPCOMING';

    // Caso A: Película que ya finalizó su temporada en cines de Perú (Disponible en Streaming)
    if (isOutOfTheaters) {
      const systemPrompt =
        'Eres Renzo Carranza, Asesor Comercial y Financiero de CinePlus en Perú. ' +
        'Tu labor es brindar un dictamen comercial pragmático sobre el consumo de películas. ' +
        'Cuando una película ya finalizó su temporada en salas de cine y está en streaming, ' +
        'evalúa la conveniencia del catálogo digital/streaming y confirma que no se debe gastar en entradas de cine.';

      const userPrompt =
        `Evalúa la conveniencia comercial de "${movie.title}" (Duración: ${movie.runtime || 120} min).\n` +
        `ESTADO DE CARTELERA: Esta película ya FINALIZÓ SU TEMPORADA en cines comerciales de Perú y está DISPONIBLE ACTUALMENTE EN PLATAFORMAS DE STREAMING y formato digital doméstico. No tiene funciones en salas físicas.\n` +
        `Redacta tu dictamen comercial en 3 oraciones claras, indicando que el espectador puede disfrutarla desde casa en streaming sin gastar en boletos de sala (S/. 18 - S/. 26), analizando el costo-beneficio del entretenimiento doméstico.`;

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
        agentTitle: 'Asesor Comercial (DeepSeek V3)',
        avatar: '🎟️',
        badgeColor: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
        content: result.text,
        metrics: {
          'Motor de IA': result.providerUsed,
          'Estado Comercial': 'Fin de Temporada en Cines',
          'Disponibilidad': 'Streaming / Formato Digital',
          'Costo en Salas': 'S/. 0.00 (Fuera de Cartelera)',
          'Opción Sugerida': 'Disfrutar en Streaming',
        },
        timestamp: new Date(),
      };
    }

    // Caso B: Próximo Estreno (Aún no en salas)
    if (isUpcoming) {
      const systemPrompt =
        'Eres Renzo Carranza, Asesor Comercial de CinePlus en Perú. Evalúa las expectativas comerciales y preventa de próximos estrenos.';

      const userPrompt =
        `Evalúa el próximo estreno de "${movie.title}" en cines peruanos (Fecha estimada: ${movie.peruReleaseDate || 'Próximamente'}).\n` +
        `Redacta tu dictamen comercial en 3 oraciones sobre las expectativas de taquilla, si conviene esperar la preventa para sala XD o 2D y el presupuesto referencial en Soles (S/. 18 - 26).`;

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
        agentTitle: 'Asesor Comercial (DeepSeek V3)',
        avatar: '🎟️',
        badgeColor: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
        content: result.text,
        metrics: {
          'Motor de IA': result.providerUsed,
          'Estado Comercial': 'Próximo Estreno en Perú',
          'Estreno Estimado': movie.peruReleaseDate || 'Próximamente',
          'Formato Preventa': 'Sala XD / 2D',
          'Tarifa Referencial': 'S/. 18.00 - 26.00',
        },
        timestamp: new Date(),
      };
    }

    // Caso C: En Cartelera Activa en Cines
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
      `Rango de precios en Soles peruanos: ${priceRangeStr} por entrada.\n` +
      `Formatos disponibles: ${targetShowtime.formats.join(', ')}.\n` +
      `Horarios clave: ${targetShowtime.availableHours.join(', ')}.\n` +
      `Redacta tu dictamen comercial en 3 oraciones indicando qué formato conviene (2D o XD) y si el costo en Soles justifica la experiencia en sala.`;

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
      agentTitle: 'Asesor Comercial (DeepSeek V3)',
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
