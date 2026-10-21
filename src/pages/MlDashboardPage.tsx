import { useState, useId } from 'react';
import {
  Activity,
  Trophy,
  Zap,
  PlusCircle,
  CheckCircle2,
  BarChart3,
  RefreshCw,
  Sparkles,
  Send,
  Database,
  SlidersHorizontal,
  Layers,
} from 'lucide-react';
import { mlBenchmarkService } from '../services/ml/benchmark/MlBenchmarkService';
import type {
  ComprehensiveBenchmarkReport,
  SentimentCategory,
  SinglePrediction,
} from '../services/ml/benchmark/types';
import type { TrainingReview } from '../services/ml/data/reviewsDataset';
import { useAuth } from '../context/AuthContext';

const QUICK_TEST_PHRASES = [
  {
    label: 'Crítica Muy Favorable',
    text: 'Una absoluta obra maestra, la fotografía y el sonido envolvente en sala son insuperables.',
    sentiment: 'positivo',
  },
  {
    label: 'Crítica Destructiva',
    text: 'Pésima película, lenta, aburrida y con un guion predecible que da sueño.',
    sentiment: 'negativo',
  },
  {
    label: 'Crítica Intermedia / Neutral',
    text: 'Cumple para pasar la tarde con palomitas, pero no aporta nada nuevo al género.',
    sentiment: 'neutral',
  },
  {
    label: 'Crítica Visual / Técnica',
    text: 'El despliegue de efectos especiales y VFX es asombroso, aunque los diálogos se quedan cortos.',
    sentiment: 'positivo',
  },
];

export function MlDashboardPage() {
  const { user, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState<'benchmark' | 'realtime' | 'ingestion'>('benchmark');
  const [report, setReport] = useState<ComprehensiveBenchmarkReport>(() =>
    mlBenchmarkService.getCachedReport()
  );
  const [isRecalculating, setIsRecalculating] = useState(false);

  // Estado del selector de Matriz de Confusión
  const [selectedMatrixModelId, setSelectedMatrixModelId] = useState<string>('naive_bayes');
  const matrixSelectId = useId();

  // Estado del Laboratorio en Tiempo Real
  const [inputText, setInputText] = useState(QUICK_TEST_PHRASES[0].text);
  const [livePredictions, setLivePredictions] = useState<Record<string, SinglePrediction>>(() =>
    mlBenchmarkService.predictRealTime(QUICK_TEST_PHRASES[0].text)
  );

  // Estado del Formulario de Ingesta en Caliente
  const [newTitle, setNewTitle] = useState('Dune: Parte Dos');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newSentiment, setNewSentiment] = useState<SentimentCategory>('positivo');
  const [ingestSuccessMsg, setIngestSuccessMsg] = useState<string | null>(null);
  const [recentIngested, setRecentIngested] = useState<TrainingReview[]>([]);

  // Ejecutar predicción en tiempo real
  const handleRunLivePrediction = (textToPredict: string) => {
    setInputText(textToPredict);
    const results = mlBenchmarkService.predictRealTime(textToPredict);
    setLivePredictions(results);
  };

  // Re-ejecutar benchmark
  const handleRefreshBenchmark = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      const updated = mlBenchmarkService.runComprehensiveBenchmark(0.2);
      setReport(updated);
      setIsRecalculating(false);
    }, 150);
  };

  // Ingestar nuevo dato en caliente
  const handleIngestSample = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || newComment.trim().length < 5) return;

    const newSample: TrainingReview = {
      id: Date.now(),
      tmdb_movie_id: 693134,
      titulo_pelicula: newTitle.trim() || 'Estreno Cartelera',
      nombre_usuario: isAuthenticated && user ? user.name : 'Evaluador Universitario',
      comentario: newComment.trim(),
      puntaje: newRating,
      sentimiento: newSentiment,
    };

    const updatedReport = mlBenchmarkService.ingestNewSample(newSample);
    setReport(updatedReport);
    setRecentIngested((prev) => [newSample, ...prev.slice(0, 4)]);
    setNewComment('');
    setIngestSuccessMsg(
      `¡Dato ingestada con éxito! El dataset subió a ${updatedReport.totalDatasetCount} muestras y los 5 modelos se re-entrenaron en caliente.`
    );
    setTimeout(() => setIngestSuccessMsg(null), 5000);
  };

  // Modelo seleccionado para la matriz de confusión
  const selectedModelForMatrix =
    report.models.find((m) => m.modelId === selectedMatrixModelId) || report.models[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Encabezado Principal del Dashboard */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-purple-950/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold tracking-wider">
              <Activity className="w-3.5 h-3.5" /> DASHBOARD DE MACHINE LEARNING EN TIEMPO REAL
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              CinePlus <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">ML Lab</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Plataforma de experimentación y evaluación comparativa entre <span className="text-white font-semibold">5 familias algorítmicas</span> sobre un dataset balanceado de reseñas en español, con soporte para <span className="text-emerald-400 font-semibold">Ingesta en Caliente (Online Learning)</span>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleRefreshBenchmark}
              disabled={isRecalculating}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-indigo-500/30 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <RefreshCw className={`w-4 h-4 text-indigo-400 ${isRecalculating ? 'animate-spin' : ''}`} />
              <span>Re-evaluar Benchmark (80/20)</span>
            </button>
          </div>
        </div>

        {/* Tarjetas de Métricas Rápidas Globales */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-400" /> Dataset Activo
            </span>
            <p className="text-2xl font-black text-white mt-1">
              {report.totalDatasetCount} <span className="text-xs font-normal text-slate-400">reseñas</span>
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-amber-500/30">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" /> Modelo Ganador
            </span>
            <p className="text-base sm:text-lg font-black text-amber-300 mt-1 truncate">
              {report.winner.modelName}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Exactitud (Accuracy)
            </span>
            <p className="text-2xl font-black text-emerald-300 mt-1">
              {report.winner.accuracy}% <span className="text-xs font-normal text-slate-400">(F1: {report.winner.f1Score}%)</span>
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Latencia de Inferencia
            </span>
            <p className="text-2xl font-black text-purple-300 mt-1">
              {report.winner.avgInferenceTimeMs} <span className="text-xs font-normal text-slate-400">ms / muestra</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Barra de Pestañas Principales (Diseño sin saturación) */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800">
        <button
          onClick={() => setActiveTab('benchmark')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'benchmark'
              ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>1. Comparativa de los 5 Algoritmos & Ganador</span>
        </button>

        <button
          onClick={() => setActiveTab('realtime')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'realtime'
              ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>2. Laboratorio de Inferencia en Tiempo Real</span>
        </button>

        <button
          onClick={() => setActiveTab('ingestion')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'ingestion'
              ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>3. Ingesta en Caliente (Online ML)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PESTAÑA 1: TABLA COMPARATIVA & MODELO GANADOR (BENCHMARK)                */}
      {/* ========================================================================= */}
      {activeTab === 'benchmark' && (
        <div className="space-y-6">
          {/* Tarjeta del Ganador con Explicación Científica */}
          <div className="glass-panel p-6 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-slate-900/60 to-indigo-500/10 shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Resolución Académica de Selección de Modelo
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Modelo Ganador: {report.winner.modelName} ({report.winner.algorithmFamily})
                </h3>
              </div>
            </div>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              {report.scientificVerdict}
            </p>
          </div>

          {/* Tabla Comparativa de los 5 Modelos */}
          <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                Matriz Comparativa de Rendimiento (Train/Test Split 80/20)
              </h3>
              <span className="text-xs text-slate-400">
                {report.trainCount} entrenamiento / {report.testCount} prueba
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900/90 text-slate-400 uppercase text-[11px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">Algoritmo</th>
                    <th className="py-3.5 px-4">Familia</th>
                    <th className="py-3.5 px-3 text-center">Accuracy</th>
                    <th className="py-3.5 px-3 text-center">Precision</th>
                    <th className="py-3.5 px-3 text-center">Recall</th>
                    <th className="py-3.5 px-3 text-center">F1-Score</th>
                    <th className="py-3.5 px-3 text-center">Entrenamiento</th>
                    <th className="py-3.5 px-3 text-center">Inferencia</th>
                    <th className="py-3.5 px-4 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {report.models.map((m) => (
                    <tr
                      key={m.modelId}
                      className={`transition-colors ${
                        m.isWinner
                          ? 'bg-amber-500/10 hover:bg-amber-500/15'
                          : 'hover:bg-slate-900/50'
                      }`}
                    >
                      <td className="py-4 px-4 sm:px-6 font-bold text-white flex items-center gap-2">
                        {m.isWinner && <Trophy className="w-4 h-4 text-amber-400 shrink-0" />}
                        <span>{m.modelName}</span>
                      </td>
                      <td className="py-4 px-4 text-slate-400 text-xs">{m.algorithmFamily}</td>
                      <td className="py-4 px-3 text-center font-bold text-emerald-400">
                        {m.accuracy}%
                      </td>
                      <td className="py-4 px-3 text-center text-slate-300">{m.precision}%</td>
                      <td className="py-4 px-3 text-center text-slate-300">{m.recall}%</td>
                      <td className="py-4 px-3 text-center font-bold text-indigo-400">
                        {m.f1Score}%
                      </td>
                      <td className="py-4 px-3 text-center text-slate-400 font-mono text-xs">
                        {m.trainingTimeMs} ms
                      </td>
                      <td className="py-4 px-3 text-center text-slate-400 font-mono text-xs">
                        {m.avgInferenceTimeMs} ms
                      </td>
                      <td className="py-4 px-4 text-center">
                        {m.isWinner ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold">
                            🏆 GANADOR
                          </span>
                        ) : (
                          <span className="text-slate-500 text-xs">Clasificado</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selector Desplegable de Matriz de Confusión (Para NO saturar la pantalla) */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  Inspección Detallada de Matriz de Confusión (Menú Desplegable)
                </h3>
                <p className="text-xs text-slate-400">
                  Selecciona cualquiera de los 5 algoritmos en la lista para ver sus aciertos y errores reales sobre el 20% de prueba.
                </p>
              </div>

              {/* Dropdown Selector */}
              <div className="flex items-center gap-2">
                <label htmlFor={matrixSelectId} className="text-xs font-semibold text-slate-300 whitespace-nowrap">
                  Ver Matriz de:
                </label>
                <select
                  id={matrixSelectId}
                  value={selectedMatrixModelId}
                  onChange={(e) => setSelectedMatrixModelId(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {report.models.map((m) => (
                    <option key={m.modelId} value={m.modelId}>
                      {m.modelName} {m.isWinner ? '🏆' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Matriz 3x3 Renderizada del Modelo Seleccionado */}
            <div className="grid md:grid-cols-2 gap-6 items-center pt-2">
              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs">
                  <thead>
                    <tr>
                      <th className="p-2 text-slate-500 font-normal">Real \ Predicho</th>
                      <th className="p-2 font-bold text-emerald-400">Positivo</th>
                      <th className="p-2 font-bold text-rose-400">Negativo</th>
                      <th className="p-2 font-bold text-amber-400">Neutral</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 text-left font-bold text-emerald-400">Real Positivo</td>
                      <td className="p-3 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        {selectedModelForMatrix.confusionMatrix.positivo.positivo}
                      </td>
                      <td className="p-3 rounded-lg bg-slate-900 text-slate-500 border border-slate-800">
                        {selectedModelForMatrix.confusionMatrix.positivo.negativo}
                      </td>
                      <td className="p-3 rounded-lg bg-slate-900 text-slate-500 border border-slate-800">
                        {selectedModelForMatrix.confusionMatrix.positivo.neutral}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-left font-bold text-rose-400">Real Negativo</td>
                      <td className="p-3 rounded-lg bg-slate-900 text-slate-500 border border-slate-800">
                        {selectedModelForMatrix.confusionMatrix.negativo.positivo}
                      </td>
                      <td className="p-3 rounded-lg bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                        {selectedModelForMatrix.confusionMatrix.negativo.negativo}
                      </td>
                      <td className="p-3 rounded-lg bg-slate-900 text-slate-500 border border-slate-800">
                        {selectedModelForMatrix.confusionMatrix.negativo.neutral}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-left font-bold text-amber-400">Real Neutral</td>
                      <td className="p-3 rounded-lg bg-slate-900 text-slate-500 border border-slate-800">
                        {selectedModelForMatrix.confusionMatrix.neutral.positivo}
                      </td>
                      <td className="p-3 rounded-lg bg-slate-900 text-slate-500 border border-slate-800">
                        {selectedModelForMatrix.confusionMatrix.neutral.negativo}
                      </td>
                      <td className="p-3 rounded-lg bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                        {selectedModelForMatrix.confusionMatrix.neutral.neutral}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Ficha Técnica del Modelo Seleccionado */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">
                    {selectedModelForMatrix.modelName}
                  </span>
                  <span className="text-[11px] text-indigo-400 font-semibold">
                    {selectedModelForMatrix.algorithmFamily}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {selectedModelForMatrix.theoreticalBasis}
                </p>
                <div className="pt-2 border-t border-slate-800 space-y-1">
                  <p className="font-bold text-emerald-400">Fortalezas:</p>
                  <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                    {selectedModelForMatrix.strengths.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 2: LABORATORIO DE PREDICCIÓN EN TIEMPO REAL                       */}
      {/* ========================================================================= */}
      {activeTab === 'realtime' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Simulador de Inferencia Simultánea en Tiempo Real
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Escribe cualquier crítica u opinión o pulsa una frase de prueba. Los 5 algoritmos calcularán su predicción, probabilidades y tiempo de respuesta en vivo.
              </p>
            </div>

            {/* Chips de Frases de Prueba Rápida */}
            <div className="flex flex-wrap gap-2">
              {QUICK_TEST_PHRASES.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleRunLivePrediction(chip.text)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-500/20 border border-slate-700/80 hover:border-indigo-500/40 text-xs text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>

            {/* Caja de Texto */}
            <div className="space-y-3">
              <textarea
                rows={3}
                value={inputText}
                onChange={(e) => handleRunLivePrediction(e.target.value)}
                placeholder="Escribe aquí tu reseña o comentario para evaluar en tiempo real..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              />
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Inferencia reactiva automática (evaluando los 5 modelos simultáneamente)</span>
                <button
                  type="button"
                  onClick={() => handleRunLivePrediction(inputText)}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" /> Forzar Re-evaluación
                </button>
              </div>
            </div>
          </div>

          {/* Tarjetas de Resultados Simultáneos de los 5 Modelos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {report.models.map((model) => {
              const pred = livePredictions[model.modelId];
              if (!pred) return null;

              const getSentimentBadge = (sent: SentimentCategory) => {
                switch (sent) {
                  case 'positivo':
                    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
                  case 'negativo':
                    return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
                  default:
                    return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
                }
              };

              return (
                <div
                  key={model.modelId}
                  className={`glass-panel p-5 rounded-2xl border transition-all space-y-3 ${
                    model.isWinner
                      ? 'border-amber-500/40 bg-amber-500/5 shadow-lg shadow-amber-500/5'
                      : 'border-slate-800 bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        {model.isWinner && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
                        {model.modelName}
                      </h4>
                      <p className="text-[10px] text-slate-400">{model.algorithmFamily}</p>
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${getSentimentBadge(
                        pred.sentiment
                      )}`}
                    >
                      {pred.sentiment.toUpperCase()} ({pred.confidence}%)
                    </span>
                  </div>

                  {/* Barras de Probabilidades Distribuidas */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Positivo:</span>
                      <strong className="text-emerald-400">
                        {(pred.probabilities.positivo * 100).toFixed(1)}%
                      </strong>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${pred.probabilities.positivo * 100}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Negativo:</span>
                      <strong className="text-rose-400">
                        {(pred.probabilities.negativo * 100).toFixed(1)}%
                      </strong>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full transition-all duration-300"
                        style={{ width: `${pred.probabilities.negativo * 100}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Neutral:</span>
                      <strong className="text-amber-400">
                        {(pred.probabilities.neutral * 100).toFixed(1)}%
                      </strong>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-300"
                        style={{ width: `${pred.probabilities.neutral * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Tiempo de Inferencia:</span>
                    <span className="font-mono text-slate-400 font-bold">
                      {pred.inferenceTimeMs.toFixed(3)} ms
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 3: INGESTA EN CALIENTE (ONLINE LEARNING EN VIVO)                  */}
      {/* ========================================================================= */}
      {activeTab === 'ingestion' && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Formulario de Ingesta en Tiempo Real */}
            <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-slate-900 to-slate-950 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <PlusCircle className="w-4 h-4" /> Flujo de Datos en Tiempo Real (Online Ingestion)
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Ingresar Nuevo Dato al Modelo Activo
                </h3>
                <p className="text-xs text-slate-400">
                  Agrega una nueva reseña al conjunto de datos. Al pulsar el botón, el modelo la incorporará, actualizará las estadísticas y recalculará el benchmark en milisegundos sin recargar la página.
                </p>
              </div>

              {ingestSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{ingestSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleIngestSample} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Título de la Película
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ej: Dune: Parte Dos"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Comentario / Reseña
                  </label>
                  <textarea
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ej: La ambientación sonora en sala fue increíblemente inmersiva..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Calificación (1 a 5)
                    </label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Estrellas)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 Estrellas)</option>
                      <option value={3}>⭐⭐⭐ (3 Estrellas)</option>
                      <option value={2}>⭐⭐ (2 Estrellas)</option>
                      <option value={1}>⭐ (1 Estrella)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Etiqueta Real de Sentimiento
                    </label>
                    <select
                      value={newSentiment}
                      onChange={(e) => setNewSentiment(e.target.value as SentimentCategory)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="positivo">POSITIVO (Favorable)</option>
                      <option value="negativo">NEGATIVO (Desfavorable)</option>
                      <option value="neutral">NEUTRAL (Intermedio)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Ingestar Dato y Re-entrenar Modelos en Vivo</span>
                </button>
              </form>
            </div>

            {/* Panel de Muestras Recientes Ingestadas en Caliente */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    Feed de Ingesta en Vivo
                  </h3>
                  <p className="text-xs text-slate-400">
                    Historial de datos incorporados en esta sesión sin recargar.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                  {report.totalDatasetCount} Total
                </span>
              </div>

              {recentIngested.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs space-y-2">
                  <Database className="w-8 h-8 mx-auto opacity-40" />
                  <p>Aún no se han ingresado muestras adicionales en esta sesión.</p>
                  <p className="text-slate-600">
                    Utiliza el formulario de la izquierda para observar la ingesta en tiempo real.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentIngested.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 animate-in slide-in-from-top-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white truncate">
                          {item.nombre_usuario} • {item.titulo_pelicula}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.sentimiento === 'positivo'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : item.sentimiento === 'negativo'
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {item.sentimiento.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{item.comentario}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
