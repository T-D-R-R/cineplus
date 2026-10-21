/**
 * CinePlus - Tipos para el Motor de Benchmarking de Machine Learning
 * Soporta la evaluación comparativa de 5 algoritmos supervisados de clasificación de texto.
 */

import type { TrainingReview } from '../data/reviewsDataset';

export type SentimentCategory = 'positivo' | 'negativo' | 'neutral';

export interface SinglePrediction {
  modelId: string;
  modelName: string;
  sentiment: SentimentCategory;
  confidence: number; // 0 a 100%
  probabilities: Record<SentimentCategory, number>;
  inferenceTimeMs: number;
}

export interface ModelBenchmarkResult {
  modelId: string;
  modelName: string;
  algorithmFamily: string;
  accuracy: number; // 0 - 100%
  precision: number; // 0 - 100%
  recall: number; // 0 - 100%
  f1Score: number; // 0 - 100%
  trainingTimeMs: number;
  avgInferenceTimeMs: number;
  confusionMatrix: Record<SentimentCategory, Record<SentimentCategory, number>>;
  theoreticalBasis: string;
  strengths: string[];
  weaknesses: string[];
  isWinner?: boolean;
}

export interface ComprehensiveBenchmarkReport {
  models: ModelBenchmarkResult[];
  winner: ModelBenchmarkResult;
  scientificVerdict: string;
  totalDatasetCount: number;
  trainCount: number;
  testCount: number;
  splitRatio: string;
  classDistribution: Record<SentimentCategory, number>;
  evaluatedAt: Date;
}

export interface ITextClassifier {
  readonly id: string;
  readonly name: string;
  readonly family: string;
  readonly theoreticalBasis: string;
  readonly strengths: string[];
  readonly weaknesses: string[];

  train(trainData: TrainingReview[]): { trainingTimeMs: number };
  predict(text: string): SinglePrediction;
}
