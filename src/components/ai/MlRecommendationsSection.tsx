import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Brain, Star } from 'lucide-react';
import { Movie } from '../../domain/Movie';
import { MovieRecommender, type MovieRecommendation } from '../../services/ml/MovieRecommender';
import { TmdbService } from '../../services/TmdbService';

interface MlRecommendationsSectionProps {
  currentMovie: Movie;
}

export function MlRecommendationsSection({ currentMovie }: MlRecommendationsSectionProps) {
  const [recommendations, setRecommendations] = useState<MovieRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSimilar() {
      setLoading(true);
      try {
        const tmdb = TmdbService.getInstance();
        const { movies } = await tmdb.getNowPlaying(1);
        if (isMounted) {
          const recommender = MovieRecommender.getInstance();
          const similar = recommender.getSimilarMovies(currentMovie, movies, 4);
          setRecommendations(similar);
        }
      } catch (error) {
        console.error('Error calculando recomendaciones por ML:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadSimilar();

    return () => {
      isMounted = false;
    };
  }, [currentMovie]);

  if (loading || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6 pt-4 border-t border-slate-800/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold tracking-wide mb-2">
            <Brain className="w-3.5 h-3.5" /> FILTRADO BASADO EN CONTENIDO (k-NN)
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            Películas Similares según Machine Learning
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Calculado mediante similitud coseno sobre vectores de género, calificación y recepción de audiencia.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {recommendations.map(({ movie, similarityScore, affinityReasons }) => (
          <Link
            key={movie.id}
            to={`/pelicula/${movie.id}`}
            className="group glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/20 flex flex-col"
          >
            {/* Poster con Badge de Similitud */}
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
              {movie.posterPath ? (
                <img
                  src={movie.getPosterUrl('w500')}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
                  Sin Póster
                </div>
              )}

              {/* Insignia de Afinidad Matemática */}
              <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md border border-purple-500/40 text-[11px] font-black text-purple-300 shadow-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {similarityScore}% Match
              </div>

              {/* Calificación */}
              <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-amber-400 flex items-center gap-1 border border-slate-800">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {movie.voteAverage.toFixed(1)}
              </div>
            </div>

            {/* Información */}
            <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                  {movie.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">
                  {movie.genres.map((g) => g.name).join(', ')}
                </p>
              </div>

              {affinityReasons[0] && (
                <div className="pt-2 border-t border-slate-800/80">
                  <p className="text-[10px] text-purple-300/80 leading-tight">
                    • {affinityReasons[0]}
                  </p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
