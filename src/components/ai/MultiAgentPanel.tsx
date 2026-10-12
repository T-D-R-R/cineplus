import { useState } from 'react';
import { Bot, Sparkles, Brain, Scale, Ticket, MessageSquareCheck, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { Movie } from '../../domain/Movie';
import { AgentCoordinator } from '../../services/agents/AgentCoordinator';
import type { MultiAgentDeliberation } from '../../services/agents/types';

interface MultiAgentPanelProps {
  movie: Movie;
}

export function MultiAgentPanel({ movie }: MultiAgentPanelProps) {
  const [deliberation, setDeliberation] = useState<MultiAgentDeliberation | null>(null);
  const [loading, setLoading] = useState(false);
  const [stepMessage, setStepMessage] = useState('');
  const [expanded, setExpanded] = useState(true);

  const runDeliberation = async () => {
    setLoading(true);
    setDeliberation(null);
    try {
      const coordinator = AgentCoordinator.getInstance();
      const result = await coordinator.deliberateMovie(movie, (step) => {
        setStepMessage(step);
      });
      setDeliberation(result);
    } catch (error) {
      console.error('Error durante la deliberación multi-agente:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="glass-panel rounded-3xl border border-indigo-500/30 overflow-hidden shadow-2xl shadow-indigo-950/20 bg-gradient-to-b from-slate-900/90 to-slate-950/90">
      {/* Cabecera del Panel */}
      <div className="p-6 sm:p-8 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/40">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold tracking-wide">
            <Bot className="w-3.5 h-3.5" /> SISTEMA MULTI-AGENTE & MACHINE LEARNING
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            Comité Asesor CinePlus AI
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Tres agentes autónomos deliberan en tiempo real sobre guion, costos en salas peruanas y viabilidad comercial, respaldados por un modelo supervisado de <span className="text-indigo-400 font-semibold">Naive Bayes</span> y afinidad <span className="text-indigo-400 font-semibold">k-NN</span>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={runDeliberation}
            disabled={loading}
            className={`cursor-pointer inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-lg ${
              loading
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-indigo-500/25 hover:scale-105 active:scale-95'
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                <span>Deliberando...</span>
              </>
            ) : deliberation ? (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Volver a Consultar</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Iniciar Deliberación de IA</span>
              </>
            )}
          </button>

          {deliberation && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-3 rounded-2xl glass-panel text-slate-400 hover:text-white transition-colors"
              title={expanded ? 'Colapsar panel' : 'Expandir panel'}
            >
              {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Estado de Carga con Pasos de los Agentes */}
      {loading && (
        <div className="p-8 sm:p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto animate-pulse">
            <Brain className="w-8 h-8 animate-bounce" />
          </div>
          <h3 className="text-lg font-bold text-white">Deliberando en el Comité...</h3>
          <p className="text-indigo-400 text-sm font-medium animate-pulse">{stepMessage}</p>
          <div className="w-48 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-progress" />
          </div>
        </div>
      )}

      {/* Invitación Inicial si no se ha ejecutado */}
      {!loading && !deliberation && (
        <div className="p-8 sm:p-12 text-center space-y-4 bg-slate-950/40">
          <div className="w-14 h-14 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-slate-400 flex items-center justify-center mx-auto">
            <Bot className="w-7 h-7" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">¿Te conviene ver esta película en cartelera hoy?</h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            Haz clic en <strong className="text-indigo-400">"Iniciar Deliberación de IA"</strong> para que el comité de agentes debata los precios en soles, salas de Perú y el sentimiento colectivo.
          </p>
        </div>
      )}

      {/* Resultados de la Deliberación */}
      {!loading && deliberation && expanded && (
        <div className="p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
          {/* Fila 1: Métricas de Machine Learning (k-NN + Naive Bayes) */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Tarjeta ML: Afinidad de Usuario (k-NN) */}
            <div className="glass-panel rounded-2xl p-5 border border-indigo-500/20 bg-indigo-950/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                  <Brain className="w-4 h-4" /> Machine Learning (k-NN)
                </span>
                <span className="text-lg font-black text-indigo-300">
                  {deliberation.userAffinityScore}% Afinidad
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                  style={{ width: `${deliberation.userAffinityScore}%` }}
                />
              </div>
              <p className="text-xs text-slate-300">{deliberation.userAffinityExplanation}</p>
            </div>

            {/* Tarjeta ML: Sentimiento Colectivo (Naive Bayes con 500 reseñas) */}
            <div className="glass-panel rounded-2xl p-5 border border-emerald-500/20 bg-emerald-950/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <MessageSquareCheck className="w-4 h-4" /> Sentimiento Audiencia (Naive Bayes)
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  {deliberation.sentimentStats.dominantSentiment}
                </span>
              </div>
              
              {/* Barra de Distribución de Sentimiento */}
              <div className="w-full h-2.5 bg-slate-800 rounded-full flex overflow-hidden">
                <div
                  className="bg-emerald-500 transition-all duration-1000"
                  style={{ width: `${deliberation.sentimentStats.positiveRatio}%` }}
                  title={`Positivo: ${deliberation.sentimentStats.positiveRatio}%`}
                />
                <div
                  className="bg-amber-500 transition-all duration-1000"
                  style={{ width: `${deliberation.sentimentStats.neutralRatio}%` }}
                  title={`Neutral: ${deliberation.sentimentStats.neutralRatio}%`}
                />
                <div
                  className="bg-rose-500 transition-all duration-1000"
                  style={{ width: `${deliberation.sentimentStats.negativeRatio}%` }}
                  title={`Negativo: ${deliberation.sentimentStats.negativeRatio}%`}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Positivo: {deliberation.sentimentStats.positiveRatio}%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Neutral: {deliberation.sentimentStats.neutralRatio}%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Negativo: {deliberation.sentimentStats.negativeRatio}%
                </span>
              </div>
            </div>
          </div>

          {/* Fila 2: Intercambio de Diálogo de los 3 Agentes */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Bot className="w-4 h-4 text-indigo-400" /> Deliberación del Panel de Agentes
            </h3>

            <div className="grid gap-4">
              {deliberation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className="glass-panel rounded-2xl p-5 border border-slate-800 bg-slate-900/50 space-y-3 transition-all hover:border-slate-700"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                        {msg.avatar}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white">{msg.agentName}</h4>
                        <p className="text-xs text-slate-400">{msg.agentTitle}</p>
                      </div>
                    </div>

                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${msg.badgeColor}`}>
                      {msg.role === 'CRITIC' ? 'Crítica de Arte' : msg.role === 'LOGISTICS' ? 'Cartelera y Finanzas' : 'Juez Conciliador'}
                    </span>
                  </div>

                  <p className="text-slate-200 text-sm leading-relaxed pl-1 sm:pl-12">
                    {msg.content}
                  </p>

                  {/* Chips de Métricas Clave del Agente */}
                  {msg.metrics && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 sm:pl-12">
                      {Object.entries(msg.metrics).map(([key, val]) => (
                        <span
                          key={key}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/80 text-[11px] text-slate-300 font-medium"
                        >
                          <span className="text-slate-500 font-normal">{key}:</span>
                          <strong className="text-white">{val}</strong>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Fila 3: Veredicto Final Vinculante */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-slate-900/60 to-purple-500/10 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400/90">
                    Resolución Vinculante CinePlus AI
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {deliberation.verdict.statusLabel}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold">Puntaje Ponderado:</span>
                <span className="text-2xl font-black text-amber-400">
                  {deliberation.verdict.score}
                  <span className="text-xs font-normal text-slate-500">/100</span>
                </span>
              </div>
            </div>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {deliberation.verdict.summary}
            </p>

            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-emerald-400" />
                {deliberation.verdict.bestShowtimeRecommendation}
              </span>
              <span className="font-semibold text-slate-300">
                {deliberation.verdict.valueForMoney}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
