import { useState, useEffect, useRef } from 'react';
import {
  Trophy,
  Zap,
  BarChart3,
  Activity,
  Sparkles,
  Cpu,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Info,
  Flame,
} from 'lucide-react';
import { mlBenchmarkService } from '../../services/ml/benchmark/MlBenchmarkService';
import type { MovieMlAnalysisResult } from '../../services/ml/benchmark/types';
import type { Review } from '../../domain/Review';
import { useAuth } from '../../context/AuthContext';

interface MovieMlDashboardProps {
  movieId: number | string;
  movieTitle: string;
  reviews: Review[];
}

interface InjectedReviewItem {
  id: string | number;
  userName: string;
  comment: string;
  rating: number;
  sentiment: string;
  isSimulated: boolean;
}

// Reseñas sintéticas para pruebas rápidas y benchmarking del administrador / docente
const DEMO_PRESET_REVIEWS = {
  positive: [
    { userName: 'Critico_Cinematografico', comment: 'Una dirección deslumbrante, fotografía impecable y un ritmo que te atrapa de principio a fin.', rating: 5, sentiment: 'positivo' },
    { userName: 'Audiencia_IMAX', comment: 'El diseño sonoro en Dolby Atmos y los efectos especiales justifican verla en la pantalla más grande posible.', rating: 5, sentiment: 'positivo' },
    { userName: 'Marcos_Vanguardia', comment: 'Actuaciones sublimes que transmiten emoción pura. De lo mejor del año sin ninguna duda.', rating: 5, sentiment: 'positivo' },
    { userName: 'Sofia_Cinefila', comment: 'Guion ingenioso, diálogos bien pulidos y un desenlace épico y sumamente conmovedor.', rating: 5, sentiment: 'positivo' },
    { userName: 'Roberto_Analista', comment: 'Una cátedra de narrativa visual. Cada plano está cuidadosamente estructurado con gran maestría.', rating: 5, sentiment: 'positivo' },
    { userName: 'Elena_Espectadora', comment: 'Inolvidable experiencia. El desarrollo de personajes es brillante, emotivo y auténtico.', rating: 5, sentiment: 'positivo' },
    { userName: 'Daniel_Estrenos', comment: 'Una joya absoluta con actuaciones memorables y una banda sonora perfecta.', rating: 5, sentiment: 'positivo' },
    { userName: 'Patricia_Arte', comment: 'Impresionante manejo del color y la tensión dramática. Cine de autor en su máxima expresión.', rating: 5, sentiment: 'positivo' },
    { userName: 'Lucas_Cineplus', comment: 'Sales de la sala totalmente conmovido e impactado por el poder del mensaje.', rating: 5, sentiment: 'positivo' },
    { userName: 'Camila_Filmica', comment: 'Grandiosa de principio a fin. Justifica con creces cada minuto de su duración.', rating: 5, sentiment: 'positivo' },
  ],
  neutral: [
    { userName: 'Observador_Cine', comment: 'Tiene momentos entretenidos y secuencias logradas, pero el mensaje de fondo queda algo difuso.', rating: 3, sentiment: 'neutral' },
    { userName: 'Guionista_Independiente', comment: 'Plantea ideas estimulantes en el papel, pero tropieza en su ejecución con un ritmo irregular.', rating: 3, sentiment: 'neutral' },
    { userName: 'Fan_Del_Genero', comment: 'Cumple como entretenimiento de fin de semana con palomitas, sin ser la obra maestra que muchos prometen.', rating: 3, sentiment: 'neutral' },
    { userName: 'Critico_Moderado', comment: 'Visualmente correcta y con buen reparto, aunque el guion abusa de fórmulas y clichés ya conocidos.', rating: 3, sentiment: 'neutral' },
    { userName: 'Espectador_Balanceado', comment: 'Ni tan mala como dicen sus detractores, ni tan brillante como afirman sus defensores. Es una película promedio.', rating: 3, sentiment: 'neutral' },
    { userName: 'Andres_Analitico', comment: 'Tiene altibajos notables: la primera mitad atrapa, pero el clímax se siente algo apresurado.', rating: 3, sentiment: 'neutral' },
    { userName: 'Mariana_Fila5', comment: 'Una producción pasable que no arriesga demasiado y se mantiene en terreno seguro.', rating: 3, sentiment: 'neutral' },
    { userName: 'Cinefilo_Indeciso', comment: 'Deja sensaciones encontradas: muy buena en apartados técnicos pero floja en emoción y empatía.', rating: 3, sentiment: 'neutral' },
    { userName: 'Hugo_Critico', comment: 'Entretiene a secas. Adecuada para una tarde de domingo sin demasiadas expectativas.', rating: 3, sentiment: 'neutral' },
    { userName: 'Valeria_Neutral', comment: 'Aspectos técnicos rescatables frente a un desenlace predecible que no sorprende.', rating: 3, sentiment: 'neutral' },
  ],
  negative: [
    { userName: 'Espectador_Decepcionado', comment: 'Una trama pretenciosa y sumamente lenta que no logra conectar con el espectador en ningún momento.', rating: 1, sentiment: 'negativo' },
    { userName: 'Critico_Estricto', comment: 'Personajes vacíos sin desarrollo creíble y diálogos clichés que dan vergüenza ajena.', rating: 2, sentiment: 'negativo' },
    { userName: 'Lucia_Aburrida', comment: 'Pésimo ritmo narrativo. La primera hora es completamente prescindible y el final es incoherente.', rating: 1, sentiment: 'negativo' },
    { userName: 'Carlos_Disconforme', comment: 'Efectos visuales mediocres y abuso de pantalla verde que arruinan cualquier intento de inmersión.', rating: 2, sentiment: 'negativo' },
    { userName: 'Valeria_Escéptica', comment: 'Una oportunidad desperdiciada con un guion simplón y resoluciones totalmente inverosímiles.', rating: 1, sentiment: 'negativo' },
    { userName: 'Javier_Desencanto', comment: 'Aburrida y monótona. No genera empatía con ningún personaje y se hace larguísima.', rating: 1, sentiment: 'negativo' },
    { userName: 'Raul_Exigente', comment: 'Guion flojo repleto de huecos argumentales que arruinan por completo la premisa.', rating: 2, sentiment: 'negativo' },
    { userName: 'Sonia_Desilusionada', comment: 'Una decepción total. El tráiler prometía algo innovador que la película nunca entrega.', rating: 1, sentiment: 'negativo' },
    { userName: 'Gabriel_CeroPuntos', comment: 'Pésimas decisiones de dirección y un montaje caótico que desorienta.', rating: 1, sentiment: 'negativo' },
    { userName: 'Monica_Critica', comment: 'Completamente olvidable. No aporta nada nuevo y desperdicia a sus actores.', rating: 2, sentiment: 'negativo' },
  ],
};

export function MovieMlDashboard({ movieId, movieTitle, reviews }: MovieMlDashboardProps) {
  const numericId = Number(movieId) || 0;
  const { user } = useAuth();
  const isAdmin = user?.isAdmin() || false;

  // Reseñas adicionales inyectadas temporalmente en memoria (para pruebas del docente)
  // IMPORTANTE: Se guardan ÚNICAMENTE en estado React (memoria RAM), NUNCA en Supabase
  const [injectedReviews, setInjectedReviews] = useState<InjectedReviewItem[]>([]);
  const [injectCount, setInjectCount] = useState<number>(5);

  // Estado del análisis de Machine Learning
  const [analysis, setAnalysis] = useState<MovieMlAnalysisResult | null>(null);
  const [isCompeting, setIsCompeting] = useState(false);
  const [competitionStep, setCompetitionStep] = useState<string>('');
  const [showDetails, setShowDetails] = useState(false);
  const [acceptanceDelta, setAcceptanceDelta] = useState<{
    prev: number;
    current: number;
    diff: number;
    latestReviewText?: string;
  } | null>(null);

  const prevAcceptanceRef = useRef<number | null>(null);

  // Función principal para evaluar los 5 modelos sobre esta película
  const runMovieEvaluation = (customInjected = injectedReviews) => {
    // Combinar estrictamente reseñas reales de Supabase + las simuladas temporalmente por el docente
    const allUserReviews = [
      ...customInjected,
      ...reviews.map((r) => ({
        id: r.id,
        userName: r.userName,
        comment: r.comment,
        rating: r.rating,
        sentiment: r.sentiment,
        isSimulated: false,
      })),
    ];

    const result = mlBenchmarkService.evaluateMovieDataset(numericId, movieTitle, allUserReviews);

    // Calcular delta con respecto a la evaluación anterior
    if (prevAcceptanceRef.current !== null && prevAcceptanceRef.current !== result.acceptanceRate && result.totalReviews > 0) {
      const diff = Number((result.acceptanceRate - prevAcceptanceRef.current).toFixed(1));
      setAcceptanceDelta({
        prev: prevAcceptanceRef.current,
        current: result.acceptanceRate,
        diff,
        latestReviewText: allUserReviews[0]?.comment,
      });
    }

    prevAcceptanceRef.current = result.acceptanceRate;
    setAnalysis(result);
  };

  // Efecto cuando cambia la película o entran nuevas reseñas de Supabase
  useEffect(() => {
    runMovieEvaluation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericId, movieTitle, reviews]);

  // Simulación paso a paso de la competencia AutoML
  const handleRunCompetition = () => {
    setIsCompeting(true);
    setCompetitionStep('1/5: Vectorizando n-gramas TF-IDF y lematizando reseñas...');

    setTimeout(() => {
      setCompetitionStep('2/5: Ajustando Naive Bayes (Laplace) y Regresión Logística (SGD)...');
    }, 200);

    setTimeout(() => {
      setCompetitionStep('3/5: Maximizando margen de hiperplano en SVM Lineal (Hinge Loss)...');
    }, 400);

    setTimeout(() => {
      setCompetitionStep('4/5: Calculando distancias coseno en k-NN y pureza Gini en Árbol CART...');
    }, 600);

    setTimeout(() => {
      setCompetitionStep('5/5: Evaluando F1-Score Macro y coronando Modelo Campeón...');
      runMovieEvaluation();
      setIsCompeting(false);
      setShowDetails(true);
    }, 850);
  };

  // Inyectar reseñas sintéticas (Herramienta aislada en memoria para el Docente / Administrador)
  const handleInjectReviews = (type: 'positive' | 'neutral' | 'negative') => {
    const pool = DEMO_PRESET_REVIEWS[type];
    const toAdd: InjectedReviewItem[] = [];
    for (let i = 0; i < injectCount; i++) {
      const template = pool[i % pool.length];
      toAdd.push({
        ...template,
        id: `sim-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
        userName: `${template.userName}_${Math.floor(Math.random() * 900 + 100)}`,
        isSimulated: true,
      });
    }
    const updated = [...toAdd, ...injectedReviews];
    setInjectedReviews(updated);
    runMovieEvaluation(updated);
  };

  // Eliminar reseñas sintéticas y volver a las reseñas reales de la base de datos
  const handleResetReviews = () => {
    setInjectedReviews([]);
    setAcceptanceDelta(null);
    runMovieEvaluation([]);
  };

  if (!analysis) {
    return (
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 animate-pulse">
        <div className="h-6 bg-slate-800 rounded w-1/3 mb-4"></div>
        <div className="h-16 bg-slate-800/50 rounded-2xl"></div>
      </div>
    );
  }

  const { championModel, allModels, acceptanceRate, sentimentBreakdown, totalReviews, predictions } =
    analysis;

  // Estado del termómetro
  const isHigh = acceptanceRate >= 75;
  const isMedium = acceptanceRate >= 50 && acceptanceRate < 75;

  return (
    <section className="glass-panel rounded-3xl p-6 lg:p-8 border border-amber-500/20 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 shadow-2xl relative overflow-hidden space-y-6">
      {/* Luz ambiental de fondo */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header con Badge de Estado y Título */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Cpu className="w-3.5 h-3.5" /> AutoML en Vivo & Inferencia de Sentimientos
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Activity className="w-3 h-3 animate-pulse" /> Tiempo Real
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Aceptación de Audiencia & Modelo Campeón
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            Predicción calculada sobre las críticas de <span className="text-amber-300 font-semibold">{movieTitle}</span> utilizando el algoritmo con mayor F1-Score.
          </p>
        </div>

        {/* Botón Principal: Hacer Competir los 5 Algoritmos (Solo Administrador) */}
        {isAdmin ? (
          <div className="flex items-center gap-3">
            <button
              onClick={handleRunCompetition}
              disabled={isCompeting}
              className={`px-5 py-3 rounded-2xl font-bold text-xs md:text-sm transition-all shadow-lg flex items-center gap-2 ${
                isCompeting
                  ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-wait'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20 hover:scale-105 active:scale-95'
              }`}
            >
              {isCompeting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Haciendo Competir Modelos...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Hacer Competir los 5 Algoritmos</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-medium">
              Inferencia AutoML en Vivo
            </span>
          </div>
        )}
      </div>

      {/* Banner de progreso de la competencia si está activa */}
      {isCompeting && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 animate-pulse flex items-center gap-3">
          <RefreshCw className="w-5 h-5 text-amber-400 animate-spin shrink-0" />
          <div className="text-xs md:text-sm font-semibold text-amber-200">
            {competitionStep}
          </div>
        </div>
      )}

      {/* 2. Banner de Delta de Aceptación (Aparece cuando una reseña altera el porcentaje) */}
      {acceptanceDelta && (
        <div
          className={`p-4 rounded-2xl border transition-all animate-in fade-in slide-in-from-top-2 duration-300 flex items-start gap-3 ${
            acceptanceDelta.diff > 0
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : acceptanceDelta.diff < 0
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              : 'bg-slate-800/40 border-slate-700 text-slate-300'
          }`}
        >
          <div className="p-2 rounded-xl bg-slate-950/50 shrink-0">
            {acceptanceDelta.diff > 0 ? (
              <ThumbsUp className="w-5 h-5 text-emerald-400" />
            ) : acceptanceDelta.diff < 0 ? (
              <ThumbsDown className="w-5 h-5 text-rose-400" />
            ) : (
              <Minus className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div className="text-xs md:text-sm space-y-1">
            <div className="font-bold flex items-center gap-2">
              <span>Impacto en Vivo tras Nueva Crítica:</span>
              <span className="font-mono text-base underline">
                {acceptanceDelta.prev}% ➔ {acceptanceDelta.current}%
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-black ${
                  acceptanceDelta.diff > 0
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : acceptanceDelta.diff < 0
                    ? 'bg-rose-500/20 text-rose-400'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {acceptanceDelta.diff > 0 ? `+${acceptanceDelta.diff}% ▲` : `${acceptanceDelta.diff}% ▼`}
              </span>
            </div>
            {acceptanceDelta.latestReviewText && (
              <p className="text-slate-400 italic line-clamp-1">
                &ldquo;{acceptanceDelta.latestReviewText}&rdquo;
              </p>
            )}
          </div>
        </div>
      )}

      {/* 3. Panel de Métricas Clave (Termómetro + Modelo Campeón + Estadísticas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Termómetro de Aceptación */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 bg-slate-950/40 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" /> Aceptación Comunitaria
            </span>
            {totalReviews > 0 ? (
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase ${
                  isHigh
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : isMedium
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {isHigh ? 'Aclamación' : isMedium ? 'Dividida' : 'Desfavorable'}
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-400">
                Sin Votos
              </span>
            )}
          </div>

          {totalReviews === 0 ? (
            <div className="py-4 text-center space-y-2">
              <div className="text-2xl font-bold text-slate-300">0% Aceptación</div>
              <p className="text-xs text-slate-500">
                Aún no hay reseñas registradas para esta película. Escribe una reseña abajo o usa los botones de simulación.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-baseline gap-3">
                <span
                  className={`text-4xl md:text-5xl font-black tracking-tight ${
                    isHigh ? 'text-emerald-400' : isMedium ? 'text-amber-400' : 'text-rose-400'
                  }`}
                >
                  {acceptanceRate}%
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Favorable ({sentimentBreakdown.positive} de {totalReviews} reseñas)
                </span>
              </div>

              {/* Barra de Distribución Tricolor */}
              <div className="space-y-1.5">
                <div className="w-full h-3 rounded-full bg-slate-800/80 overflow-hidden flex">
                  <div
                    style={{ width: `${sentimentBreakdown.positivePct}%` }}
                    className="bg-emerald-500 transition-all duration-500"
                    title={`Positivo: ${sentimentBreakdown.positivePct}%`}
                  />
                  <div
                    style={{ width: `${sentimentBreakdown.neutralPct}%` }}
                    className="bg-amber-500 transition-all duration-500"
                    title={`Neutral: ${sentimentBreakdown.neutralPct}%`}
                  />
                  <div
                    style={{ width: `${sentimentBreakdown.negativePct}%` }}
                    className="bg-rose-500 transition-all duration-500"
                    title={`Negativo: ${sentimentBreakdown.negativePct}%`}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span className="text-emerald-400 font-semibold">{sentimentBreakdown.positivePct}% Positivas</span>
                  <span className="text-amber-400 font-semibold">{sentimentBreakdown.neutralPct}% Neutrales</span>
                  <span className="text-rose-400 font-semibold">{sentimentBreakdown.negativePct}% Negativas</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Card 2: Algoritmo Campeón Actual */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-amber-500/[0.03] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" /> Algoritmo Campeón
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              AutoML Winner
            </span>
          </div>

          <div>
            <h3 className="text-lg font-black text-white leading-tight">
              {championModel.modelName}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Familia: {championModel.algorithmFamily}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800/60 text-center">
            <div className="p-2 rounded-xl bg-slate-900/60">
              <div className="text-[10px] uppercase font-bold text-slate-400">Accuracy</div>
              <div className="text-sm font-black text-emerald-400">{championModel.accuracy}%</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/60">
              <div className="text-[10px] uppercase font-bold text-slate-400">F1-Score</div>
              <div className="text-sm font-black text-amber-400">{championModel.f1Score}%</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/60">
              <div className="text-[10px] uppercase font-bold text-slate-400">Latencia</div>
              <div className="text-sm font-black text-cyan-400 font-mono">{championModel.avgInferenceTimeMs}ms</div>
            </div>
          </div>
        </div>

        {/* Card 3: Carga de Reseñas (Diferenciado por Rol) */}
        {isAdmin ? (
          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 bg-slate-950/40 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-cyan-400" /> Volumen de Críticas
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {totalReviews} analizadas
                </span>
              </div>

              <div className="mt-2 text-xs text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Críticas reales (Comunidad):</span>
                  <span className="font-bold text-white">{reviews.length}</span>
                </div>
                {injectedReviews.length > 0 && (
                  <div className="flex justify-between text-purple-300">
                    <span>Pruebas simuladas (Memoria):</span>
                    <span className="font-bold">+{injectedReviews.length}</span>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-slate-500 mt-2 italic">
                *Las pruebas con los botones viven en memoria RAM local; NO se guardan en la base de datos de usuarios.
              </p>
            </div>

            {/* Control de Cantidad y Botones de Inyección Rápida para Evaluación */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Cantidad a inyectar:</span>
                <div className="inline-flex rounded-lg bg-slate-900/80 p-0.5 border border-slate-800">
                  {[1, 3, 5, 10].map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setInjectCount(qty)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                        injectCount === qty
                          ? 'bg-cyan-500 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      +{qty}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => handleInjectReviews('positive')}
                  className="px-2 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors text-center"
                  title={`Inyecta ${injectCount} críticas sumamente positivas en memoria`}
                >
                  +{injectCount} Positivas
                </button>
                <button
                  type="button"
                  onClick={() => handleInjectReviews('neutral')}
                  className="px-2 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors text-center"
                  title={`Inyecta ${injectCount} críticas neutrales (3 estrellas) en memoria para retar a SVM y k-NN`}
                >
                  +{injectCount} Neutrales
                </button>
                <button
                  type="button"
                  onClick={() => handleInjectReviews('negative')}
                  className="px-2 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors text-center"
                  title={`Inyecta ${injectCount} críticas negativas en memoria`}
                >
                  +{injectCount} Negativas
                </button>
              </div>

              {injectedReviews.length > 0 && (
                <button
                  onClick={handleResetReviews}
                  className="w-full text-[11px] text-purple-300 hover:text-white flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 transition-colors font-semibold"
                >
                  <RefreshCw className="w-3 h-3" /> Limpiar {injectedReviews.length} pruebas (Volver a {reviews.length} reales)
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 bg-slate-950/40 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-cyan-400" /> Reseñas Analizadas
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {totalReviews} opiniones
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Cada crítica de la comunidad es procesada en tiempo real mediante Inteligencia Artificial y Machine Learning para estimar la recomendación global.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
              💡 <span className="text-slate-300 font-semibold">¿Eres Administrador o Docente?</span> Inicia sesión con cuenta de Administrador para calibrar modelos o simular volumen de opiniones.
            </div>
          </div>
        )}
      </div>

      {/* 4. Sección Desplegable: Justificación Científica y Tabla Comparativa de los 5 Modelos (Exclusivo Administrador) */}
      {isAdmin && (
        <div className="border-t border-slate-800/80 pt-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-xs md:text-sm font-bold text-slate-200 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" />
              <span>Panel de Auditoría Docente: Justificación Científica & Tabla de 5 Algoritmos</span>
            </div>
            {showDetails ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showDetails && (
            <div className="mt-4 space-y-5 animate-in fade-in duration-300">
              {/* Justificación Científica */}
              <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Trophy className="w-4 h-4" /> Justificación de la Victoria del Algoritmo
                </div>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {analysis.scientificExplanation}
                </p>
              </div>

              {/* Tabla Comparativa de los 5 Algoritmos */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 bg-slate-900/80">
                      <th className="py-3 px-4">Algoritmo</th>
                      <th className="py-3 px-3">Familia</th>
                      <th className="py-3 px-3 text-right">Accuracy</th>
                      <th className="py-3 px-3 text-right">Precision</th>
                      <th className="py-3 px-3 text-right">Recall</th>
                      <th className="py-3 px-3 text-right">F1-Score</th>
                      <th className="py-3 px-3 text-right">Latencia</th>
                      <th className="py-3 px-4 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {allModels.map((m) => {
                      const isWin = m.isWinner;
                      return (
                        <tr
                          key={m.modelId}
                          className={`transition-colors ${
                            isWin ? 'bg-amber-500/10 font-semibold' : 'hover:bg-slate-900/40'
                          }`}
                        >
                          <td className="py-3 px-4 flex items-center gap-2 font-medium text-white">
                            {isWin && <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                            <span>{m.modelName}</span>
                          </td>
                          <td className="py-3 px-3 text-slate-400">{m.algorithmFamily}</td>
                          <td className="py-3 px-3 text-right font-mono text-emerald-400">
                            {m.accuracy}%
                          </td>
                          <td className="py-3 px-3 text-right font-mono">{m.precision}%</td>
                          <td className="py-3 px-3 text-right font-mono">{m.recall}%</td>
                          <td className="py-3 px-3 text-right font-mono text-amber-400 font-bold">
                            {m.f1Score}%
                          </td>
                          <td className="py-3 px-3 text-right font-mono text-cyan-400">
                            {m.avgInferenceTimeMs} ms
                          </td>
                          <td className="py-3 px-4 text-center">
                            {isWin ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                🏆 Campeón
                              </span>
                            ) : (
                              <span className="text-slate-500 text-[11px]">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Muestras de Inferencia Recientes en las Críticas (Visible para todos) */}
      {predictions.length > 0 && (
        <div className="border-t border-slate-800/80 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Muestras de Críticas Calificadas por IA ({predictions.slice(0, 4).length} de {predictions.length})
            </span>
            <span className="text-[11px] text-slate-500">
              Modelo en funciones: <span className="text-amber-400 font-mono">{championModel.modelName}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {predictions.slice(0, 4).map((p, i) => {
              const isPos = p.predictedSentiment === 'positivo';
              const isNeg = p.predictedSentiment === 'negativo';
              return (
                <div
                  key={p.id || i}
                  className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate max-w-[170px]">
                      <span className="font-semibold text-slate-300 truncate">
                        {p.userName}
                      </span>
                      {isAdmin && (
                        p.isSimulated ? (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0">
                            Simulación
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
                            Real
                          </span>
                        )
                      )}
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        isPos
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : isNeg
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {p.predictedSentiment} ({p.confidence}%)
                    </span>
                  </div>
                  <p className="text-slate-400 line-clamp-2 italic">
                    &ldquo;{p.comment}&rdquo;
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
