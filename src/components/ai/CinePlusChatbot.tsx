import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Send,
  Bot,
  Brain,
  Scale,
  RefreshCw,
  ChevronDown,
  Zap,
  CheckCircle2,
  AlertCircle,
  Film,
  Star,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import { LlmService } from '../../services/llm/LlmService';
import { SentimentClassifier } from '../../services/ml/SentimentClassifier';
import { REVIEWS_DATASET } from '../../services/ml/data/reviewsDataset';
import { SupabaseService } from '../../services/SupabaseService';
import { TmdbService } from '../../services/TmdbService';
import type { Movie } from '../../domain/Movie';

interface AgentOpinion {
  agentName: string;
  role: 'CRITIC' | 'LOGISTICS' | 'TECHNICAL' | 'AUDITOR';
  avatar?: string;
  aiProvider: string;
  text: string;
}

interface RecommendedMovieCard {
  id: number;
  title: string;
  posterPath: string | null;
  voteAverage: number;
  genres: string[];
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  agentName?: string;
  aiProvider?: string;
  text: string;
  deliberation?: AgentOpinion[];
  recommendedMovies?: RecommendedMovieCard[];
  timestamp: Date;
}

interface ApiHealthState {
  testing: boolean;
  gemini?: { online: boolean; model?: string; latencyMs?: number; error?: string };
  openrouter?: { online: boolean; model?: string; latencyMs?: number; error?: string };
  tmdb?: { online: boolean; count: number };
}

const QUICK_PROMPTS = [
  '¿Vale la pena ver Dune 2 en sala XD?',
  '¿Cuánto cuesta el cine en Huánuco?',
  '¿Qué opina el comité de La Sustancia?',
  'Recomiéndame películas de terror o suspenso',
];

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  sender: 'assistant',
  agentName: 'Dra. Diana Thorne (Presidenta del Comité)',
  aiProvider: 'Comité de 5 Agentes',
  text: '¡Hola! Soy la Dra. Diana Thorne, Presidenta del Comité CinePlus AI. Coordino un equipo multidisciplinario de 5 agentes: Valeria Morales (Crítica Narrativa / Gemini), Renzo Carranza (Finanzas y Cartelera / DeepSeek V3), Ing. Mateo Sotomayor (Dirección Técnica / Meta LLaMA 3.3) y la Dra. Beatriz Véliz (Auditoría y Fact-Checking / Qwen 2.5). Pregúntame sobre cualquier película, cartelera en Soles (S/.) o salas de Huánuco y Perú. ¿En qué te podemos asesorar hoy?',
  timestamp: new Date(),
};

/**
 * Renderizador de texto con soporte ligero para negritas y viñetas
 */
function renderFormattedMessage(text: string) {
  const lines = text.split('\n');
  return lines.map((line, lIdx) => {
    const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('• ');
    const cleanLine = isBullet ? line.trim().replace(/^[-•]\s*/, '') : line;

    const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
    const content = parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} className="font-bold text-amber-300">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    if (isBullet) {
      return (
        <div key={lIdx} className="flex items-start gap-1.5 my-1 pl-1">
          <span className="text-amber-400 font-bold shrink-0">•</span>
          <span className="flex-1">{content}</span>
        </div>
      );
    }

    return (
      <span key={lIdx} className="block min-h-[1.1em]">
        {content}
      </span>
    );
  });
}

const KNOWN_MOVIES = [
  { id: 693134, title: 'Dune: Parte Dos', keywords: ['dune', 'duna', 'arrakis', 'chalamet'] },
  { id: 933260, title: 'La Sustancia', keywords: ['sustancia', 'substance', 'demi moore'] },
  { id: 533535, title: 'Deadpool & Wolverine', keywords: ['deadpool', 'wolverine', 'marvel'] },
  { id: 1022789, title: 'Intensa-Mente 2', keywords: ['intensa', 'mente', 'intensamente', 'inside out', 'ansiedad'] },
  { id: 872585, title: 'Oppenheimer', keywords: ['oppenheimer', 'nolan', 'bomba'] },
  { id: 346698, title: 'Barbie', keywords: ['barbie', 'ken', 'gerwig'] },
  { id: 763215, title: 'Damsel', keywords: ['damsel', 'millie bobby'] },
];

// Diccionario semántico de géneros para TMDb
const TMDB_GENRES: Record<string, { id: number; name: string; keywords: string[] }> = {
  terror: { id: 27, name: 'Terror', keywords: ['terror', 'horror', 'miedo', 'fantasma', 'posesion', 'gore', 'espanto'] },
  suspenso: { id: 53, name: 'Suspenso', keywords: ['suspenso', 'thriller', 'psicologico', 'tension', 'misterio'] },
  comedia: { id: 35, name: 'Comedia', keywords: ['comedia', 'risa', 'graciosa', 'humor', 'divertida'] },
  accion: { id: 28, name: 'Acción', keywords: ['accion', 'acción', 'peleas', 'disparos', 'adrenalina', 'artes marciales'] },
  aventura: { id: 12, name: 'Aventura', keywords: ['aventura', 'viaje', 'exploracion', 'mision'] },
  animacion: { id: 16, name: 'Animación', keywords: ['animacion', 'animación', 'dibujos', 'infantil', 'pixar', 'disney', 'anime'] },
  cienciaFiccion: { id: 878, name: 'Ciencia Ficción', keywords: ['ciencia ficcion', 'ciencia ficción', 'scifi', 'sci-fi', 'espacio', 'alien', 'futuro', 'robots'] },
  drama: { id: 18, name: 'Drama', keywords: ['drama', 'emotiva', 'triste', 'llorar', 'conmovedora'] },
  romance: { id: 10749, name: 'Romance', keywords: ['romance', 'romantica', 'amor', 'pareja'] },
  familia: { id: 10751, name: 'Familiar', keywords: ['familiar', 'familia', 'niños', 'hijos'] },
};

export function CinePlusChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [expandedDeliberations, setExpandedDeliberations] = useState<Record<string, boolean>>({});
  const [billboardMovies, setBillboardMovies] = useState<Movie[]>([]);
  const [healthState, setHealthState] = useState<ApiHealthState | null>(null);
  const [showHealthPanel, setShowHealthPanel] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Precargar cartelera real desde TMDb
  useEffect(() => {
    let active = true;
    async function loadBillboard() {
      try {
        const { movies } = await TmdbService.getInstance().getNowPlaying();
        if (active && movies && movies.length > 0) {
          setBillboardMovies(movies);
        }
      } catch (err) {
        console.warn('No se pudo precargar la cartelera en el chatbot:', err);
      }
    }
    loadBillboard();
    return () => {
      active = false;
    };
  }, []);

  // 2. Control de auto-scroll mejorado para ver la respuesta completa
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      const t1 = setTimeout(scrollToBottom, 60);
      const t2 = setTimeout(scrollToBottom, 200);
      const t3 = setTimeout(scrollToBottom, 500);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [messages, isOpen, loading]);

  const toggleDeliberation = (msgId: string) => {
    setExpandedDeliberations((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const handleResetChat = () => {
    setMessages([INITIAL_WELCOME_MESSAGE]);
    setExpandedDeliberations({});
  };

  // 3. Comprobación instantánea de APIs en vivo
  const handleCheckHealth = async () => {
    setHealthState({ testing: true });
    setShowHealthPanel(true);
    try {
      const tmdbData = await TmdbService.getInstance().getNowPlaying();
      const llmHealth = await LlmService.getInstance().checkApiHealth();
      setHealthState({
        testing: false,
        gemini: llmHealth.gemini,
        openrouter: llmHealth.openrouter,
        tmdb: { online: tmdbData.movies.length > 0, count: tmdbData.movies.length },
      });
    } catch {
      setHealthState({ testing: false });
    }
  };

  const handleSend = async (queryText: string) => {
    const textToSend = queryText.trim() || input.trim();
    if (!textToSend || loading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const llm = LlmService.getInstance();
      const sentimentClassifier = SentimentClassifier.getInstance();
      const supabase = SupabaseService.getInstance();
      const tmdb = TmdbService.getInstance();
      const lower = textToSend.toLowerCase();

      // 1. Detectar si el usuario preguntó por una película específica
      let matchedMovieData: { id: number; title: string; genres: string[]; overview: string } | null = null;

      for (const m of billboardMovies) {
        const titleNorm = m.title.toLowerCase();
        const cleanTitle = titleNorm.replace(/[:\-].*$/, '').trim();
        if (lower.includes(titleNorm) || (cleanTitle.length > 3 && lower.includes(cleanTitle))) {
          matchedMovieData = {
            id: Number(m.id),
            title: m.title,
            genres: m.genres.map((g) => g.name),
            overview: m.overview,
          };
          break;
        }
      }

      if (!matchedMovieData) {
        for (const m of KNOWN_MOVIES) {
          if (m.keywords.some((kw) => lower.includes(kw))) {
            matchedMovieData = {
              id: m.id,
              title: m.title,
              genres: ['Cine'],
              overview: '',
            };
            break;
          }
        }
      }

      // 2. Detectar si es una consulta sobre precios, cines o Huánuco
      const isCinemaPriceQuery =
        lower.includes('huanuco') ||
        lower.includes('huánuco') ||
        lower.includes('cuanto cuesta') ||
        lower.includes('cuánto cuesta') ||
        lower.includes('precio') ||
        lower.includes('tarifa') ||
        lower.includes('entrada') ||
        lower.includes('cineplanet') ||
        lower.includes('cinemark') ||
        lower.includes('sala');

      // CASO A: Pregunta general sobre cines / tarifas
      if (isCinemaPriceQuery && !matchedMovieData) {
        const cinemaPrompt =
          `El usuario pregunta en CinePlus Perú: "${textToSend}".\n` +
          `Datos verificados de cines en Huánuco:\n` +
          `- Cineplanet Real Plaza Huánuco (Jr. Dos de Mayo 1380): Entradas regulares de S/. 18.00 a S/. 22.00, salas XD a S/. 26.00. Martes y miércoles con descuento.\n` +
          `- Cinemark Open Plaza Huánuco (Jr. 2 de Mayo 125): Entradas estándar desde S/. 16.00 a S/. 20.00.\n` +
          `Responde como Diana Thorne (Moderadora de CinePlus) en 1 solo párrafo claro, cordial y directo con los precios en Soles (S/.) y recomendaciones para ahorrar.`;

        const res = await llm.generateTextWithMetadata(cinemaPrompt, {
          provider: 'openrouter',
          model: 'deepseek/deepseek-chat',
          maxTokens: 1200,
          systemPrompt:
            'Eres Diana Thorne, asesora y moderadora principal de CinePlus en Perú. Responde directamente la duda del usuario con precisión comercial y calidez.',
        });

        const assistantMsg: ChatMessage = {
          id: `resp_${Date.now()}`,
          sender: 'assistant',
          agentName: 'Diana Thorne (Comité CinePlus)',
          aiProvider: res.providerUsed,
          text: res.text,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
        return;
      }

      // CASO B: Pregunta sobre una película específica -> Deliberación Multi-Agente
      if (matchedMovieData) {
        const movieReviews = REVIEWS_DATASET.filter((r) => r.tmdb_movie_id === matchedMovieData!.id);
        const sampleReviewTexts = movieReviews.slice(0, 5).map((r) => r.comentario);

        let posCount = 0;
        for (const rev of sampleReviewTexts) {
          if (sentimentClassifier.predict(rev).sentiment === 'positivo') posCount++;
        }
        const posPct =
          sampleReviewTexts.length > 0 ? Math.round((posCount / sampleReviewTexts.length) * 100) : 80;

        let cinemaInfo = 'Cineplanet Real Plaza Huánuco (S/. 18.00 a S/. 26.00 en 2D y XD)';
        try {
          const cinemas = await supabase.getCinemasForMovie(matchedMovieData.id);
          if (cinemas.length > 0) {
            cinemaInfo = `${cinemas[0].cinema.name} (${cinemas[0].cinema.city}) - Entrada S/. ${cinemas[0].showtimes[0]?.price || 22}.00`;
          }
        } catch {
          // Fallback
        }

        // Consultar a los 4 especialistas en paralelo (Alta velocidad y robustez)
        const [criticRes, logisticsRes, technicalRes, auditorRes] = await Promise.all([
          // 1. Crítica Narrativa (Valeria Morales / Google Gemini)
          llm.generateTextWithMetadata(
            `Pregunta del usuario: "${textToSend}". Evalúa el valor cinematográfico, guion y tono de "${matchedMovieData.title}". Géneros: ${matchedMovieData.genres.join(', ')}. Recepción de la comunidad (Naive Bayes ML): ${posPct}% favorable. Responde en 2 oraciones concisas de análisis crítico.`,
            {
              provider: 'gemini',
              model: 'gemini-3.5-flash-lite',
              maxTokens: 250,
              systemPrompt: 'Eres Valeria Morales, Crítica Cinematográfica de CinePlus con Google Gemini. Analiza guion, actuaciones y valor de autor sin saludos.',
            }
          ),

          // 2. Asesor Comercial (Renzo Carranza / DeepSeek V3)
          llm.generateTextWithMetadata(
            `Pregunta del usuario: "${textToSend}". Analiza los costos y conveniencia para "${matchedMovieData.title}" en cines de Perú (Referencia: ${cinemaInfo}). Responde en 2 oraciones recomendando formato de sala (2D o XD) y presupuesto en Soles (S/.).`,
            {
              provider: 'openrouter',
              model: 'deepseek/deepseek-chat',
              maxTokens: 250,
              systemPrompt: 'Eres Renzo Carranza, Asesor Comercial de CinePlus con DeepSeek V3. Sé pragmático con tarifas en Soles (S/.) y salas peruanas sin saludos.',
            }
          ),

          // 3. Consultor Técnico & Audiovisual (Ing. Mateo Sotomayor / Meta LLaMA 3.3)
          llm.generateTextWithMetadata(
            `Pregunta del usuario: "${textToSend}". Evalúa el despliegue técnico de "${matchedMovieData.title}" (Géneros: ${matchedMovieData.genres.join(', ')}). Responde en 2 oraciones sobre la cinematografía, efectos visuales y si amerita sala con pantalla envolvente XD y sonido multicanal en Perú.`,
            {
              provider: 'openrouter',
              model: 'meta-llama/llama-3.3-70b-instruct',
              maxTokens: 250,
              systemPrompt: 'Eres el Ing. Mateo Sotomayor, Consultor Técnico con Meta LLaMA 3.3. Evalúa fotografía, efectos visuales y sonido envolvente en salas sin saludos.',
            }
          ),

          // 4. Auditora de Calidad & Fact-Checking (Dra. Beatriz Véliz / Qwen 2.5)
          llm.generateTextWithMetadata(
            `Pregunta del usuario: "${textToSend}". Audita y calibra constructivamente la evaluación de "${matchedMovieData.title}". Responde en 2 oraciones certificando la consistencia con TMDb y confirmando la disponibilidad de salas y formatos accesibles en la cartelera peruana.`,
            {
              provider: 'openrouter',
              model: 'qwen/qwen-2.5-72b-instruct',
              maxTokens: 250,
              systemPrompt: 'Eres la Dra. Beatriz Véliz, Auditora de Calidad con Qwen 2.5. Calibra constructivamente y certifica la consistencia para la cartelera en Perú sin saludos.',
            }
          ),
        ]);

        // 5. Orquestadora y Presidenta (Dra. Diana Thorne / Gemini Core)
        const conciergePrompt =
          `El usuario preguntó: "${textToSend}" sobre "${matchedMovieData.title}".\n` +
          `1. Crítica Narrativa (Valeria / Gemini): "${criticRes.text}"\n` +
          `2. Asesoría Comercial (Renzo / DeepSeek V3): "${logisticsRes.text}"\n` +
          `3. Dirección Técnica (Mateo / Meta LLaMA 3.3): "${technicalRes.text}"\n` +
          `4. Certificación de Auditoría (Beatriz / Qwen 2.5): "${auditorRes.text}"\n` +
          `Afinidad de audiencia (Naive Bayes ML): ${posPct}% favorable.\n\n` +
          `Tu tarea como Presidenta del Comité CinePlus: Redacta UNA SOLA respuesta ejecutiva y concluyente para el espectador en 1 o 2 párrafos concisos. Integra los aspectos artísticos, la recomendación de sala y los precios en Soles (S/.), dictando si le conviene verla hoy.`;

        const conciergeRes = await llm.generateTextWithMetadata(conciergePrompt, {
          provider: 'gemini',
          model: 'gemini-3.5-flash-lite',
          maxTokens: 450,
          systemPrompt:
            'Eres la Dra. Diana Thorne, Presidenta del Comité de CinePlus AI. Sintetiza las posturas de los 4 especialistas en un dictamen unificado, elegante y resolutivo.',
        });

        // Buscar si tenemos tarjeta de la película consultada
        const targetMovieInBillboard = billboardMovies.find(
          (m) =>
            Number(m.id) === matchedMovieData!.id ||
            m.title.toLowerCase().includes(matchedMovieData!.title.toLowerCase())
        );

        const movieCard: RecommendedMovieCard[] = targetMovieInBillboard
          ? [
              {
                id: Number(targetMovieInBillboard.id),
                title: targetMovieInBillboard.title,
                posterPath: targetMovieInBillboard.posterPath,
                voteAverage: targetMovieInBillboard.voteAverage,
                genres: targetMovieInBillboard.genres.map((g) => g.name),
              },
            ]
          : [];

        const assistantMsg: ChatMessage = {
          id: `resp_${Date.now()}`,
          sender: 'assistant',
          agentName: 'Dra. Diana Thorne (Resolución del Comité)',
          aiProvider: 'Comité de 5 Agentes',
          text: conciergeRes.text,
          recommendedMovies: movieCard.length > 0 ? movieCard : undefined,
          deliberation: [
            {
              agentName: 'Valeria Morales (Crítica Narrativa)',
              role: 'CRITIC',
              avatar: '🎬',
              aiProvider: criticRes.providerUsed,
              text: criticRes.text,
            },
            {
              agentName: 'Renzo Carranza (Finanzas y Cartelera)',
              role: 'LOGISTICS',
              avatar: '🎟️',
              aiProvider: logisticsRes.providerUsed,
              text: logisticsRes.text,
            },
            {
              agentName: 'Ing. Mateo Sotomayor (Dirección Técnica & VFX)',
              role: 'TECHNICAL',
              avatar: '🔊',
              aiProvider: technicalRes.providerUsed,
              text: technicalRes.text,
            },
            {
              agentName: 'Dra. Beatriz Véliz (Auditora de Calidad)',
              role: 'AUDITOR',
              avatar: '🛡️',
              aiProvider: auditorRes.providerUsed,
              text: auditorRes.text,
            },
          ],
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
        return;
      }

      // CASO C: Análisis Semántico de Género y Consulta Dinámica a TMDb
      let detectedGenreKey = '';
      for (const [key, meta] of Object.entries(TMDB_GENRES)) {
        if (meta.keywords.some((kw) => lower.includes(kw))) {
          detectedGenreKey = key;
          break;
        }
      }

      const activeGenreMeta = detectedGenreKey ? TMDB_GENRES[detectedGenreKey] : null;

      // 1. Filtrar películas en cartelera actual de TMDb que coincidan con el género
      let inTheatersGenreMatches: Movie[] = [];
      if (activeGenreMeta && billboardMovies.length > 0) {
        inTheatersGenreMatches = billboardMovies.filter((m) =>
          m.genres.some(
            (g) =>
              g.id === activeGenreMeta.id ||
              activeGenreMeta.keywords.some((kw) => g.name.toLowerCase().includes(kw))
          )
        );
      }

      // 2. Si se pidió un género específico, consultar TMDb Discover para traer las mejores del género
      let topGenreMoviesFromTmdb: Movie[] = [];
      if (activeGenreMeta) {
        try {
          topGenreMoviesFromTmdb = await tmdb.getMoviesByGenre(activeGenreMeta.id);
        } catch {
          // Fallback
        }
      }

      // Combinar recomendaciones para mostrar tarjetas en el chat
      const cardCandidates: Movie[] = [];
      // Primero las de cartelera
      for (const m of inTheatersGenreMatches) {
        if (!cardCandidates.some((c) => c.id === m.id)) cardCandidates.push(m);
      }
      // Luego las mejores de TMDb discover
      for (const m of topGenreMoviesFromTmdb) {
        if (!cardCandidates.some((c) => c.id === m.id)) cardCandidates.push(m);
        if (cardCandidates.length >= 4) break;
      }

      // Si no hubo género específico, usar las más populares de cartelera para tarjetas
      if (cardCandidates.length === 0 && billboardMovies.length > 0) {
        cardCandidates.push(...billboardMovies.slice(0, 4));
      }

      // Contexto enriquecido para el prompt de IA
      let promptContext = '';
      if (activeGenreMeta) {
        promptContext += `GÉNERO SOLICITADO POR EL USUARIO: "${activeGenreMeta.name}".\n`;
        if (inTheatersGenreMatches.length > 0) {
          promptContext += `Películas de ${activeGenreMeta.name} EN CARTELERA AHORA (Cineplanet / Cinemark):\n` +
            inTheatersGenreMatches.slice(0, 3).map((m) => `- "${m.title}" (TMDb: ${m.voteAverage}/10): ${m.overview.slice(0, 100)}...`).join('\n') + '\n';
        }
        if (topGenreMoviesFromTmdb.length > 0) {
          promptContext += `Otras películas destacadas de ${activeGenreMeta.name} en el catálogo de TMDb:\n` +
            topGenreMoviesFromTmdb.slice(0, 3).map((m) => `- "${m.title}" (Año: ${m.releaseDate.slice(0, 4)}, TMDb: ${m.voteAverage}/10): ${m.overview.slice(0, 100)}...`).join('\n') + '\n';
        }
      } else {
        promptContext += `Cartelera general actual en cines de Perú (TMDb):\n` +
          billboardMovies.slice(0, 6).map((m) => `- "${m.title}" (${m.genres.map((g) => g.name).join(', ')}) [TMDb: ${m.voteAverage}/10]`).join('\n') + '\n';
      }

      const generalPrompt =
        `Consulta del usuario en CinePlus: "${textToSend}"\n\n` +
        promptContext +
        `\nCines de referencia en Perú: Cineplanet Real Plaza (Huánuco, Huancayo, Lima - S/. 18.00 a 26.00) y Cinemark (S/. 16.00 a 22.00).\n\n` +
        `DIRECTRIZ ESTRICTA DE SEGURIDAD Y RESTRICCIÓN DE DOMINIO (GUARDRAIL):\n` +
        `Eres Diana Thorne, moderadora del Comité CinePlus AI (plataforma de cartelera y películas en Perú).\n` +
        `- Si la pregunta es sobre medicina, salud, política, recetas, matemáticas o temas externos:\n` +
        `  Rechaza amablemente la consulta con cordialidad, indicando que como IA de CinePlus tu especialidad se circunscribe estrictamente al cine y la cartelera peruana. Invita al usuario a consultar sobre películas.\n` +
        `- Si la pregunta solicita recomendaciones (generales o de un género como terror, acción, etc.):\n` +
        `  Analiza las películas proporcionadas de TMDb y recomienda 2 o 3 opciones destacadas. Coloca sus títulos exactos en **negrita**, menciona por qué verlas (actuaciones, atmósfera o impacto) e indica si están en cartelera o en catálogo. Menciona precios en Soles.\n` +
        `- Si la pregunta sí está relacionada con cine en general:\n` +
        `  Responde con calidez y criterio cinematográfico en 1 solo mensaje completo y conciso.`;

      const genRes = await llm.generateTextWithMetadata(generalPrompt, {
        provider: 'gemini',
        model: 'gemini-3.5-flash-lite',
        maxTokens: 1200,
        systemPrompt:
          'Eres Diana Thorne, Moderadora de CinePlus. Tienes una restricción estricta de dominio: SOLO atiendes consultas sobre cine, películas, cartelera en Soles y salas peruanas. Si recibes preguntas ajenas (como medicina, salud, política, etc.), declina con calidez y redirige al usuario hacia el cine.',
      });

      const cardsToAttach: RecommendedMovieCard[] = cardCandidates.slice(0, 4).map((m) => ({
        id: Number(m.id),
        title: m.title,
        posterPath: m.posterPath,
        voteAverage: m.voteAverage,
        genres: m.genres.map((g) => g.name),
      }));

      const assistantMsg: ChatMessage = {
        id: `resp_${Date.now()}`,
        sender: 'assistant',
        agentName: 'Diana Thorne (Comité CinePlus)',
        aiProvider: genRes.providerUsed,
        text: genRes.text,
        recommendedMovies: cardsToAttach.length > 0 ? cardsToAttach : undefined,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error procesando respuesta multi-agente en chat:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'assistant',
          text: 'Ocurrió un error consultando al comité. Por favor intenta nuevamente.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botón Flotante para Abrir/Cerrar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 hover:from-indigo-500 hover:to-amber-400 text-white shadow-xl shadow-indigo-950/60 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
        title="Abrir Comité de 5 Agentes"
      >
        <Bot className="w-6 h-6 animate-pulse" />
        <span className="hidden sm:inline text-xs font-black tracking-wider uppercase">
          {isOpen ? 'Cerrar Comité' : 'Comité de 5 Agentes'}
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
      </button>

      {/* Ventana Flotante de Chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[500px] h-[600px] max-h-[85vh] glass-panel rounded-3xl border border-indigo-500/40 shadow-2xl shadow-indigo-950/50 flex flex-col overflow-hidden bg-slate-950/95 backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300">
          {/* Header del Chat */}
          <div className="p-4 border-b border-slate-800 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  Comité de 5 Agentes
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    Live
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Deliberación en tiempo real (Gemini, DeepSeek, LLaMA, Qwen) + TMDb
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Botón de Limpiar / Reiniciar Chat */}
              <button
                onClick={handleResetChat}
                title="Reiniciar chat y limpiar historial"
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-slate-300 hover:text-white text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Limpiar</span>
              </button>

              {/* Botón de Diagnóstico de APIs */}
              <button
                onClick={handleCheckHealth}
                disabled={healthState?.testing}
                title="Comprobar estado en vivo de las APIs de IA y TMDb"
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-indigo-900/60 border border-slate-700/80 text-slate-300 hover:text-white text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Zap
                  className={`w-3.5 h-3.5 ${
                    healthState?.testing ? 'text-amber-400 animate-spin' : 'text-emerald-400'
                  }`}
                />
                <span className="hidden sm:inline">Probar APIs</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Panel de Diagnóstico Desplegable */}
          {showHealthPanel && (
            <div className="px-4 py-2.5 bg-slate-900/95 border-b border-indigo-500/30 text-[11px] flex items-center justify-between animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-bold text-slate-300 flex items-center gap-1">
                  <Film className="w-3 h-3 text-amber-400" /> TMDb:{' '}
                  <strong className="text-emerald-400">{billboardMovies.length} películas</strong>
                </span>
                <span className="font-bold text-slate-300 flex items-center gap-1">
                  {healthState?.testing ? (
                    <RefreshCw className="w-3 h-3 text-amber-400 animate-spin" />
                  ) : healthState?.gemini?.online ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-amber-400" />
                  )}
                  Gemini:{' '}
                  <strong
                    className={healthState?.gemini?.online ? 'text-emerald-400' : 'text-slate-400'}
                  >
                    {healthState?.testing
                      ? 'Probando...'
                      : healthState?.gemini?.online
                      ? `${healthState.gemini.latencyMs}ms`
                      : 'En espera'}
                  </strong>
                </span>
                <span className="font-bold text-slate-300 flex items-center gap-1">
                  {healthState?.testing ? (
                    <RefreshCw className="w-3 h-3 text-amber-400 animate-spin" />
                  ) : healthState?.openrouter?.online ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-amber-400" />
                  )}
                  OpenRouter (DeepSeek/LLaMA/Qwen):{' '}
                  <strong
                    className={healthState?.openrouter?.online ? 'text-emerald-400' : 'text-slate-400'}
                  >
                    {healthState?.testing
                      ? 'Probando...'
                      : healthState?.openrouter?.online
                      ? `${healthState.openrouter.latencyMs}ms`
                      : 'En espera'}
                  </strong>
                </span>
              </div>
              <button
                onClick={() => setShowHealthPanel(false)}
                className="text-slate-500 hover:text-slate-300 text-xs px-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Lista de Mensajes con Scroll Fluido y Estilizado */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs scrollbar-thin scrollbar-thumb-indigo-500/40 hover:scrollbar-thumb-indigo-400 scrollbar-track-slate-900/60"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.sender === 'assistant' && msg.agentName && (
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400">
                    <Scale className="w-3 h-3 text-amber-400" />
                    <strong className="text-slate-200">{msg.agentName}</strong>
                    {msg.aiProvider && (
                      <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[9px] text-indigo-300 border border-slate-700">
                        {msg.aiProvider}
                      </span>
                    )}
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-[92%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-sm shadow-md shadow-amber-500/20'
                      : 'glass-panel bg-slate-900/90 border border-slate-700 text-slate-100 rounded-tl-sm shadow-md'
                  }`}
                >
                  <div className="leading-relaxed">{renderFormattedMessage(msg.text)}</div>

                  {/* Mini-Tarjetas de Películas Recomendadas de TMDb */}
                  {msg.recommendedMovies && msg.recommendedMovies.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800 space-y-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400">
                        <Film className="w-3.5 h-3.5" />
                        <span>Película analizada en TMDb para tu consulta:</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {msg.recommendedMovies.map((m) => (
                          <Link
                            key={m.id}
                            to={`/pelicula/${m.id}`}
                            className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 transition-all group"
                          >
                            {m.posterPath ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w200${m.posterPath}`}
                                alt={m.title}
                                className="w-9 h-12 object-cover rounded-lg shrink-0 shadow"
                              />
                            ) : (
                              <div className="w-9 h-12 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                                <Film className="w-4 h-4 text-slate-500" />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <h4 className="text-[11px] font-bold text-white group-hover:text-amber-400 truncate transition-colors flex items-center gap-1">
                                <span className="truncate">{m.title}</span>
                                <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 shrink-0" />
                              </h4>
                              <div className="flex items-center gap-1 text-[9px] text-slate-400">
                                <span className="text-amber-400 font-semibold flex items-center gap-0.5">
                                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />{' '}
                                  {m.voteAverage.toFixed(1)}
                                </span>
                                <span>•</span>
                                <span className="truncate">{m.genres[0] || 'Cine'}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Panel Acordeón de Deliberación de los 5 Agentes */}
                  {msg.deliberation && msg.deliberation.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800">
                      <button
                        onClick={() => toggleDeliberation(msg.id)}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer select-none"
                      >
                        <Brain className="w-3.5 h-3.5" />
                        <span>
                          {expandedDeliberations[msg.id]
                            ? 'Ocultar deliberación del Comité'
                            : 'Ver deliberación del Comité (5 Agentes)'}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            expandedDeliberations[msg.id] ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {expandedDeliberations[msg.id] && (
                        <div className="mt-2.5 space-y-2 animate-in fade-in-50 duration-200">
                          {msg.deliberation.map((op, idx) => {
                            let roleColor = 'bg-slate-900 border-slate-700 text-slate-200';
                            if (op.role === 'CRITIC') {
                              roleColor = 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200';
                            } else if (op.role === 'LOGISTICS') {
                              roleColor = 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200';
                            } else if (op.role === 'TECHNICAL') {
                              roleColor = 'bg-purple-950/40 border-purple-500/30 text-purple-200';
                            } else if (op.role === 'AUDITOR') {
                              roleColor = 'bg-amber-950/40 border-amber-500/30 text-amber-200';
                            }

                            return (
                              <div
                                key={idx}
                                className={`p-2.5 rounded-xl border text-[11px] leading-relaxed ${roleColor}`}
                              >
                                <div className="flex items-center justify-between mb-1 text-[10px] font-bold">
                                  <span className="flex items-center gap-1.5">
                                    <span>{op.avatar || '🤖'}</span>
                                    <span>{op.agentName}</span>
                                  </span>
                                  <span className="opacity-80 font-normal px-1.5 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-[9px] text-white">
                                    {op.aiProvider}
                                  </span>
                                </div>
                                <p className="opacity-95">{op.text}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 p-3 rounded-2xl glass-panel text-indigo-400 text-xs animate-pulse max-w-sm">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>El Comité de 5 Agentes está deliberando en tiempo real...</span>
              </div>
            )}

            <div ref={messagesEndRef} className="h-2" />
          </div>

          {/* Preguntas Sugeridas Rápidas */}
          <div className="p-2 border-t border-slate-800/80 bg-slate-900/60 overflow-x-auto flex gap-1.5 no-scrollbar">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-800/80 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700/60 transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input de Envío */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Pregúntale al comité (ej: recomiéndame películas de terror)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white disabled:opacity-40 disabled:hover:bg-indigo-500 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
