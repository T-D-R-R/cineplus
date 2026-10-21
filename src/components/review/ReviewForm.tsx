import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageSquarePlus, LogIn, Sparkles, UserCheck } from 'lucide-react';
import { StarRating } from '../common/StarRating';
import { useAuth } from '../../context/AuthContext';

interface ReviewFormProps {
  onSubmit: (userName: string, comment: string, rating: number) => Promise<boolean>;
  submitting?: boolean;
}

export function ReviewForm({ onSubmit, submitting = false }: ReviewFormProps) {
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const [guestName, setGuestName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const authorName = (isAuthenticated && user ? user.name : guestName).trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!authorName || authorName.length < 2) {
      setLocalError('Por favor ingresa tu nombre (mínimo 2 caracteres) o inicia sesión.');
      return;
    }

    if (!comment.trim() || comment.trim().length < 5) {
      setLocalError('Por favor escribe tu reseña (mínimo 5 caracteres).');
      return;
    }

    const ok = await onSubmit(authorName, comment, rating);
    if (ok) {
      setComment('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-800/90 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <MessageSquarePlus className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-white">Escribir una Crítica</h3>
        </div>

        {isAuthenticated && user && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400">
            <UserCheck className="w-3.5 h-3.5" /> Sesión Iniciada
          </span>
        )}
      </div>

      {/* Banner de Invitación a Iniciar Sesión si no está autenticado */}
      {!isAuthenticated && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-xs text-amber-300">
            <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              <strong>¿Cansado de escribir tu nombre siempre?</strong> Inicia sesión y tus reseñas se asociarán a tu perfil automáticamente.
            </span>
          </div>
          <button
            type="button"
            onClick={() => openAuthModal('login')}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" /> Iniciar Sesión
          </button>
        </div>
      )}

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
        {/* Identidad del Autor y Calificación con Estrellas */}
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Autor de la Crítica
            </label>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                  {user.getInitials()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-amber-400/90">{user.getRoleLabel()}</p>
                </div>
              </div>
            ) : (
              <input
                type="text"
                placeholder="Ej: Sofía Gómez (o inicia sesión)"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                disabled={submitting}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
            )}
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

        {/* Textarea de Comentario */}
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
