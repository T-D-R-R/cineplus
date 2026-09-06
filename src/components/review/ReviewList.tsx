import { MessageSquare, Sparkles } from 'lucide-react';
import { Review } from '../../domain/Review';
import { ReviewCard } from './ReviewCard';

interface ReviewListProps {
  reviews: Review[];
  loading?: boolean;
}

export function ReviewList({ reviews, loading }: ReviewListProps) {
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((n) => (
          <div key={n} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="h-4 bg-slate-800 rounded w-1/4" />
            <div className="h-12 bg-slate-850 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-2xl text-center border border-slate-800 space-y-2">
        <Sparkles className="w-8 h-8 text-amber-400 mx-auto opacity-70" />
        <h4 className="text-white font-bold text-sm">Aún no hay críticas para esta película</h4>
        <p className="text-slate-400 text-xs">¡Sé el primero en compartir tu opinión con la comunidad!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-amber-400" />
          Opiniones de la Comunidad ({reviews.length})
        </h4>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
