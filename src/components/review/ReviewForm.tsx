import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageSquarePlus } from 'lucide-react';
import { StarRating } from '../common/StarRating';

interface ReviewFormProps {
  onSubmit: (userName: string, comment: string, rating: number) => Promise<boolean>;
  submitting?: boolean;
}

export function ReviewForm({ onSubmit, submitting = false }: ReviewFormProps) {
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!userName.trim() || userName.trim().length < 2) {
      setLocalError('Por favor ingresa tu nombre (mínimo 2 caracteres).');
      return;
    }

    if (!comment.trim() || comment.trim().length < 5) {
      setLocalError('Por favor escribe tu reseña (mínimo 5 caracteres).');
      return;
    }

    const ok = await onSubmit(userName, comment, rating);
    if (ok) {
      setComment('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-800/90 space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <MessageSquarePlus className="w-5 h-5 text-amber-400" />
        <h3 className="text-lg font-bold text-white">Escribir una Crítica</h3>
      </div>

      {showSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          ¡Tu reseña ha sido guardada en Supabase con éxito!
        </div>
      )}

      {localError && (
        <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {localError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre y Estrellas */}
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Tu Nombre o Apodo
            </label>
            <input
              type="text"
              placeholder="Ej: Sofía Gómez"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={submitting}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Tu Calificación:
            </label>
            <div className="py-1">
              <StarRating rating={rating} interactive onRate={setRating} size="md" />
            </div>
          </div>
        </div>

        {/* Textarea */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Comentario / Opinión
          </label>
          <textarea
            rows={3}
            placeholder="¿Qué te pareció la película? Dirección, actuaciones, efectos..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={submitting}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
          />
        </div>

        {/* Botón de Enviar */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <span>Guardando en Supabase...</span>
            ) : (
              <>
                <Send className="w-4 h-4" /> Publicar Crítica
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
