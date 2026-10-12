/**
 * CinePlus - LlmService (Multi-Provider AI Gateway)
 * Soporta de manera desacoplada:
 * 1. Google Gemini (Google AI Studio)
 * 2. OpenRouter (DeepSeek / Qwen / LLaMA)
 * 3. xAI Grok (Directo o vía OpenRouter)
 * Con modo heurístico autónomo de respaldo para evaluaciones sin claves.
 */

import { getConfig } from '../../core/config';

export type AiProvider = 'gemini' | 'openrouter' | 'grok' | 'auto';

export interface LlmGenerationOptions {
  provider?: AiProvider;
  model?: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface LlmGenerationResult {
  text: string;
  providerUsed: string;
  modelUsed: string;
  isRealApi: boolean;
}

export class LlmService {
  private static instance: LlmService;

  private constructor() {}

  public static getInstance(): LlmService {
    if (!LlmService.instance) {
      LlmService.instance = new LlmService();
    }
    return LlmService.instance;
  }

  /**
   * Genera texto orquestando la llamada a través del Backend Serverless Seguro (/api/chat)
   * protegiendo las API Keys para que nunca viajen al navegador ni se expongan con F12.
   */
  public async generateTextWithMetadata(
    prompt: string,
    options: LlmGenerationOptions = {}
  ): Promise<LlmGenerationResult> {
    const targetProvider = options.provider || 'auto';

    // 1. ARQUITECTURA SEGURA: Llamada al Proxy Backend Serverless (/api/chat)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          systemPrompt: options.systemPrompt,
          provider: options.provider,
          model: options.model,
          temperature: options.temperature,
          maxTokens: options.maxTokens,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.text) {
          return {
            text: data.text,
            providerUsed: data.providerUsed || 'CinePlus AI Serverless',
            modelUsed: data.modelUsed || options.model || 'serverless-proxy',
            isRealApi: Boolean(data.isRealApi),
          };
        }
      }
    } catch {
      // Si el servidor backend no responde (modo preview sin serverless), usar fallback local
    }

    const config = getConfig();

    // 2. Ruta Directa OpenRouter (Si se configuró clave en cliente para testing)
    if (
      (targetProvider === 'openrouter' || targetProvider === 'auto') &&
      config.openrouterApiKey
    ) {
      try {
        const model = options.model || 'deepseek/deepseek-chat';
        const res = await this.callOpenRouter(prompt, config.openrouterApiKey, model, options);
        if (res) {
          return {
            text: res,
            providerUsed: 'OpenRouter (DeepSeek)',
            modelUsed: model,
            isRealApi: true,
          };
        }
      } catch (err) {
        console.warn('Error llamando a OpenRouter API:', err);
      }
    }

    // 2. Ruta xAI Grok
    if ((targetProvider === 'grok' || targetProvider === 'auto') && config.grokApiKey) {
      try {
        const model = options.model || 'grok-2-latest';
        const res = await this.callGrok(prompt, config.grokApiKey, model, options);
        if (res) {
          return {
            text: res,
            providerUsed: 'xAI Grok',
            modelUsed: model,
            isRealApi: true,
          };
        }
      } catch (err) {
        console.warn('Error llamando a xAI Grok API:', err);
      }
    }

    // Si se pidió Grok pero no hay clave de xAI directa, revisar si OpenRouter puede ejecutarlo
    if (targetProvider === 'grok' && config.openrouterApiKey) {
      try {
        const res = await this.callOpenRouter(
          prompt,
          config.openrouterApiKey,
          'x-ai/grok-2-1212',
          options
        );
        if (res) {
          return {
            text: res,
            providerUsed: 'xAI Grok (vía OpenRouter)',
            modelUsed: 'x-ai/grok-2',
            isRealApi: true,
          };
        }
      } catch (err) {
        console.warn('Error en fallback OpenRouter para Grok:', err);
      }
    }

    // 3. Ruta Google Gemini
    if (
      (targetProvider === 'gemini' || targetProvider === 'auto' || !config.openrouterApiKey) &&
      config.geminiApiKey
    ) {
      try {
        const candidateModels = [
          options.model || 'gemini-3.5-flash',
          'gemini-3.5-flash-lite',
          'gemini-flash-lite-latest',
          'gemini-3.8-flash',
        ];
        for (const model of candidateModels) {
          const res = await this.callGemini(prompt, config.geminiApiKey, model, options);
          if (res) {
            return {
              text: res,
              providerUsed: 'Google Gemini',
              modelUsed: model,
              isRealApi: true,
            };
          }
        }
      } catch (err) {
        console.warn('Error llamando a Google Gemini API:', err);
      }
    }

    // 4. Modo Autónomo / Fallback Contextual (Sin claves)
    const fallbackText = this.generateContextualFallback(prompt, options.systemPrompt);
    return {
      text: fallbackText,
      providerUsed:
        targetProvider === 'openrouter'
          ? 'DeepSeek (Modo Autónomo)'
          : targetProvider === 'grok'
          ? 'xAI Grok (Modo Autónomo)'
          : 'Google Gemini (Modo Autónomo)',
      modelUsed: options.model || 'cognitive-heuristic-v1',
      isRealApi: false,
    };
  }

  /**
   * Método de compatibilidad para llamadas simples que esperan solo string.
   */
  public async generateText(prompt: string, options: LlmGenerationOptions = {}): Promise<string> {
    const res = await this.generateTextWithMetadata(prompt, options);
    return res.text;
  }

  /**
   * Diagnóstico de conectividad en tiempo real de las APIs de IA (Gemini y DeepSeek).
   */
  public async checkApiHealth(): Promise<{
    gemini: { configured: boolean; online: boolean; model: string; latencyMs: number; error?: string };
    openrouter: { configured: boolean; online: boolean; model: string; latencyMs: number; error?: string };
  }> {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'health' }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    const config = getConfig();
    return {
      gemini: { configured: Boolean(config.geminiApiKey), online: false, model: '', latencyMs: 0 },
      openrouter: { configured: Boolean(config.openrouterApiKey), online: false, model: '', latencyMs: 0 },
    };
  }

  // ---------------------------------------------------------------------------
  // Conectores HTTP REST a las APIs Externas
  // ---------------------------------------------------------------------------

  private async callGemini(
    prompt: string,
    apiKey: string,
    model: string,
    options: LlmGenerationOptions
  ): Promise<string | null> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
      apiKey
    )}`;

    const contents = [];
    if (options.systemPrompt) {
      contents.push({
        role: 'user',
        parts: [{ text: `[INSTRUCCIÓN DEL SISTEMA]: ${options.systemPrompt}` }],
      });
      contents.push({
        role: 'model',
        parts: [{ text: 'Entendido. Cumpliré estrictamente con este rol y directrices.' }],
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: prompt }],
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: options.temperature ?? 0.7,
          maxOutputTokens: options.maxTokens ?? 1200,
        },
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
    }
    return null;
  }

  private async callOpenRouter(
    prompt: string,
    apiKey: string,
    model: string,
    options: LlmGenerationOptions
  ): Promise<string | null> {
    const url = 'https://openrouter.ai/api/v1/chat/completions';
    const messages = [];

    if (options.systemPrompt) {
      messages.push({ role: 'system', content: options.systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://cineplus-psi.vercel.app',
        'X-Title': 'CinePlus AI Multi-Agent',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 1200,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data?.choices?.[0]?.message?.content?.trim() || null;
    }
    return null;
  }

  private async callGrok(
    prompt: string,
    apiKey: string,
    model: string,
    options: LlmGenerationOptions
  ): Promise<string | null> {
    const url = 'https://api.x.ai/v1/chat/completions';
    const messages = [];

    if (options.systemPrompt) {
      messages.push({ role: 'system', content: options.systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 1200,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data?.choices?.[0]?.message?.content?.trim() || null;
    }
    return null;
  }

  /**
   * Generador heurístico de respaldo cuando no se suministran claves.
   */
  private generateContextualFallback(prompt: string, systemPrompt = ''): string {
    const spLower = systemPrompt.toLowerCase();
    const pLower = prompt.toLowerCase();

    const isRecommendation =
      pLower.includes('recomienda') ||
      pLower.includes('recomiéndame') ||
      pLower.includes('sugiere') ||
      pLower.includes('qué ver') ||
      pLower.includes('que ver') ||
      pLower.includes('película para ver') ||
      pLower.includes('pelicula para ver');

    const isOffTopic =
      pLower.includes('medicina') ||
      pLower.includes('médico') ||
      pLower.includes('salud') ||
      pLower.includes('receta') ||
      pLower.includes('politica') ||
      pLower.includes('política') ||
      pLower.includes('leyes');

    if (isOffTopic) {
      return '¡Hola! Como moderadora del Comité CinePlus, mi labor está enfocada exclusivamente en el análisis cinematográfico, cartelera en Soles y salas en Perú. No estoy facultada para emitir opiniones sobre salud, medicina ni disciplinas externas. Te invito a consultarme sobre películas de estreno, directores o funciones de cine. ¿Qué película te gustaría explorar hoy?';
    }

    if (isRecommendation) {
      return '¡Por supuesto! Para hoy en CinePlus te recomiendo dos grandes alternativas de la cartelera: si buscas suspenso psicológico e impacto visual, "La Sustancia" es el estreno más aclamado y comentado del momento; y si prefieres una épica de ciencia ficción, "Dune: Parte Dos" en sala XD de Cineplanet te brindará una inmersión audiovisual espectacular. ¿Qué género prefieres hoy?';
    }

    // 1. Prioridad: Moderador / Juez
    if (spLower.includes('moderador') || spLower.includes('veredicto') || spLower.includes('conciliador')) {
      return (
        'Tras contrastar la evaluación cinematográfica y la viabilidad económica en salas peruanas, ' +
        'el comité concluye que esta obra reúne méritos suficientes para ser disfrutada en pantalla grande. ' +
        'Recomendamos adquirir boletos en horario nocturno para una inmersión completa.'
      );
    }

    // 2. Prioridad: Asesor Comercial / Logístico
    if (
      spLower.includes('financiero') ||
      spLower.includes('logístico') ||
      spLower.includes('logistico') ||
      spLower.includes('cartelera') ||
      spLower.includes('comercial')
    ) {
      return (
        'En las salas comerciales de Perú (Huánuco, Huancayo y Lima), el rango de tarifas oscila entre S/. 18.00 y S/. 28.00 ' +
        'para salas estándar y XD. La duración del largometraje y su ambición técnica justifican plenamente la inversión del boleto.'
      );
    }

    // 3. Prioridad: Crítico de Arte
    if (spLower.includes('crítico') || spLower.includes('critico') || spLower.includes('narrativa')) {
      return (
        'Desde el ángulo puramente cinematográfico, la obra demuestra un notable virtuosismo en la escala visual, ' +
        'la ambientación y la dirección actoral. El ritmo se mantiene firme y el análisis de la comunidad corrobora ' +
        'que estamos ante una de las propuestas más estimulantes de la temporada.'
      );
    }

    return `Análisis generado con éxito para: "${prompt.slice(0, 80)}..."`;
  }
}
