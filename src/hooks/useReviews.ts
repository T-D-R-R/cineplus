import { useState, useEffect, useCallback } from 'react';
import { Review } from '../domain/Review';
import { supabaseService } from '../services/SupabaseService';

export function useReviews(tmdbMovieId: number | string | undefined) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const numMovieId = tmdbMovieId ? Number(tmdbMovieId) : null;

  const fetchReviews = useCallback(async () => {
    if (!numMovieId || isNaN(numMovieId)) {
      setReviews([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await supabaseService.getReviews(numMovieId);
      setReviews(data);
    } catch (err: unknown) {
      console.error('Error en useReviews:', err);
      setError((err as Error).message || 'No fue posible cargar las críticas.');
    } finally {
      setLoading(false);
    }
  }, [numMovieId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const submitReview = async (
    userName: string,
    comment: string,
    rating: number
  ): Promise<boolean> => {
    if (!numMovieId || isNaN(numMovieId)) {
      setError('ID de película inválido para publicar reseña.');
      return false;
    }

    const reviewEntity = new Review({
      tmdbMovieId: numMovieId,
      userName,
      comment,
      rating,
    });

    const validation = reviewEntity.validate();
    if (!validation.isValid) {
      setError(validation.errors.join(' '));
      return false;
    }

    setSubmitting(true);
    setError(null);
    setSubmitSuccess(false);

    try {
      const savedReview = await supabaseService.createReview(reviewEntity);
      setReviews((prev) => [savedReview, ...prev]);
      setSubmitSuccess(true);
      return true;
    } catch (err: unknown) {
      console.error('Error publicando reseña:', err);
      setError((err as Error).message || 'Error al guardar la reseña en Supabase.');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    reviews,
    loading,
    submitting,
    error,
    submitSuccess,
    submitReview,
    refresh: fetchReviews,
  };
}
