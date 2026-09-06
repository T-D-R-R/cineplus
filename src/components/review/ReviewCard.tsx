import { User, Clock } from 'lucide-react';
import { Review } from '../../domain/Review';
import { StarRating } from '../common/StarRating';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  // Iniciales del usuario
  const initials = review.userName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800/90 space-y-3 hover:border-slate-700/80 transition-all">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar con Iniciales */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
            {initials || <User className="w-4 h-4" />}
          </div>

          <div>
            <h4 className="font-bold text-white text-sm">{review.userName}</h4>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {review.getFormattedTime()}
            </span>
          </div>
        </div>

        {/* Estrellas */}
        <StarRating rating={review.rating} size="sm" />
      </div>

      <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line pl-1">
        "{review.comment}"
      </p>
    </div>
  );
}
