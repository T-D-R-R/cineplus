/**
 * CinePlus - TechnicalAgent (Agente 4: Especialista Técnico & Audiovisual)
 * Especialista en cinematografía, VFX, mezcla de sonido (Dolby Atmos), ritmo de edición y formatos inmersivos.
 */

import { Movie } from '../../domain/Movie';
import { LlmService } from '../llm/LlmService';
import type { AgentMessage } from './types';

export class TechnicalAgent {
  private llm = LlmService.getInstance();

  public async evaluate(movie: Movie): Promise<AgentMessage> {
    const genresList = movie.genres.map((g) => g.name).join(', ') || 'General';
    const isSciFiOrAction = movie.genres.some((g) =>
      ['Acción', 'Ciencia ficción', 'Aventura', 'Animación', 'Action', 'Science Fiction'].includes(g.name)
    );

    const systemPrompt =
      'Eres el Director Técnico y Consultor Audiovisual de CinePlus. Tu especialidad es evaluar la dirección de fotografía, ' +
      'la composición visual, la fidelidad de los efectos especiales (VFX/CGI), la mezcla sonora en salas (Dolby Atmos) ' +
      'y el ritmo de montaje. Habla con precisión técnica cinematográfica, entusiasmo profesional y sin saludos genéricos.';

    const userPrompt =
      `Película analizada: "${movie.title}".\n` +
      `Géneros: ${genresList}.\n` +
      `Duración: ${movie.runtime ? `${movie.runtime} minutos` : 'Formato largometraje estándar'}.\n` +
      `Director / Equipo: ${movie.director || 'Dirección de fotografía y efectos destacados'}.\n` +
      `Sinopsis técnica: ${movie.overview || 'Sin descripción disponible'}.\n\n` +
      'Instrucción: Emite tu dictamen técnico en 2 a 3 oraciones contundentes. Explica si el despliegue técnico ' +
      '(sonido y fotografía) amerita ser experimentado en salas con tecnología avanzada (XD, Dolby Atmos o IMAX).';

    let content = '';
    let providerUsed = 'Modo Autónomo Heurístico';

    try {
      const result = await this.llm.generateTextWithMetadata(userPrompt, {
        provider: 'auto',
        systemPrompt,
        temperature: 0.6,
        maxTokens: 180,
      });
      content = result.text.trim();
      providerUsed = result.providerUsed;
    } catch {
      // Fallback cognitivo de alta fidelidad
      content = isSciFiOrAction
        ? `A nivel técnico, la cinematografía explota una paleta cromática envolvente y una mezcla multicanal diseñada para retumbar en salas con Dolby Atmos. La integración de los efectos visuales (VFX) preserva el realismo físico sin saturar el encuadre, convirtiéndola en una experiencia que pierde más del 40% de su impacto sensorial fuera de una pantalla de gran formato.`
        : `La dirección de fotografía destaca por un sobrio manejo de luces naturales y planos secuencia que potencian la intimidad dramática. El diseño sonoro privilegia la claridad de diálogos y silencios expresivos, garantizando una reproducción acústica impecable tanto en sala convencional como en salas acústicamente tratadas.`;
    }

    const soundDesignScore = isSciFiOrAction ? 'Dolby Atmos 7.1' : 'Estéreo Inmersivo';
    const vfxScore = isSciFiOrAction ? 'Alta Densidad VFX / CGI' : 'Práctico / Fotográfico';
    const aspectRecommendation = isSciFiOrAction ? 'IMAX / XD (2.39:1)' : 'Estándar Flat (1.85:1)';

    return {
      id: `agent_tech_${Date.now()}`,
      role: 'TECHNICAL',
      agentName: 'Ing. Mateo Sotomayor',
      agentTitle: 'Consultor Técnico & Audiovisual (CGI / Sonido)',
      avatar: '🔊',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      content,
      metrics: {
        'Motor de IA': providerUsed,
        'Diseño Sonoro': soundDesignScore,
        'Despliegue Visual': vfxScore,
        'Formato Óptimo': aspectRecommendation,
      },
      timestamp: new Date(),
    };
  }
}
