import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Film } from 'lucide-react';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { useReviews } from '../hooks/useReviews';
import { useCinemas } from '../hooks/useCinemas';
import { MovieHero } from '../components/movie/MovieHero';
import { CastList } from '../components/movie/CastList';
import { TrailerPlayer } from '../components/movie/TrailerPlayer';
import { CinemaMap } from '../components/map/CinemaMap';
import { ReviewForm } from '../components/review/ReviewForm';
import { ReviewList } from '../components/review/ReviewList';
import { MovieDetailSkeleton } from '../components/common/LoadingSkeleton';

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { movie, loading: movieLoading, error: movieError } = useMovieDetail(id);
  const {
    reviews,
    loading: reviewsLoading,
    submitting,
    submitReview,
  } = useReviews(id);
  const {
    cinemasWithShowtimes,
    userLocation,
    loading: cinemasLoading,
    refreshLocation,
  } = useCinemas(id);

  const scrollToTrailer = () => {
    document.getElementById('seccion-trailer')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCinemas = () => {
    document.getElementById('seccion-cines')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (movieLoading) {
    return <MovieDetailSkeleton />;
  }

  if (movieError || !movie) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 space-y-4 max-w-lg mx-auto my-12">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <Film className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white">Película no encontrada</h3>
        <p className="text-slate-400 text-sm">{movieError || 'No se encontró la película con el ID especificado.'}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a la Cartelera
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Botón Volver */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Cartelera
        </Link>
      </div>

      {/* 1. Hero Banner Dinámico */}
      <MovieHero
        movie={movie}
        onScrollToTrailer={scrollToTrailer}
        onScrollToCinemas={scrollToCinemas}
      />

      {/* 2. Reparto Principal */}
      <CastList cast={movie.cast} />

      {/* 3. Tráiler Oficial de YouTube */}
      <TrailerPlayer trailerUrl={movie.getYoutubeTrailerUrl()} title={movie.title} />

      {/* 4. Módulo de Cines y Horarios (Google Maps / Demo) */}
      <CinemaMap
        cinemas={cinemasWithShowtimes}
        userLocation={userLocation}
        loading={cinemasLoading}
        onRefreshLocation={refreshLocation}
      />

      {/* 5. Sección Comunitaria de Críticas (Supabase) */}
      <section className="space-y-6 pt-4 border-t border-slate-800/80">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Formulario de Nueva Reseña */}
          <ReviewForm onSubmit={submitReview} submitting={submitting} />

          {/* Lista de Opiniones Existentes */}
          <ReviewList reviews={reviews} loading={reviewsLoading} />
        </div>
      </section>
    </div>
  );
}
