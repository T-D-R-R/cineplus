import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // 0 a 5
  maxRating?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
}

export function StarRating({
  rating,
  maxRating = 5,
  interactive = false,
  onRate,
  size = 'md',
  showScore = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  const currentRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= Math.round(currentRating);

          return (
            <button
              type="button"
              key={starValue}
              disabled={!interactive}
              onClick={() => interactive && onRate && onRate(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              className={`${
                interactive ? 'cursor-pointer transition-transform hover:scale-110' : 'cursor-default'
              } p-0.5 focus:outline-none`}
              aria-label={`Calificar con ${starValue} estrellas`}
            >
              <Star
                className={`${starSizes[size]} transition-colors ${
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-transparent text-slate-600'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showScore && (
        <span className="text-xs font-bold text-amber-400 ml-1">
          {rating > 0 ? rating.toFixed(1) : 'S/C'}
        </span>
      )}
    </div>
  );
}
