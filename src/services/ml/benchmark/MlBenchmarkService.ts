/**
 * CinePlus - MlBenchmarkService
 * Suite de Benchmarking y Comparación de 5 Algoritmos de Machine Learning:
 * 1. Multinomial Naive Bayes (Laplace)
 * 2. Regresión Logística (SGD + L2)
 * 3. Support Vector Machine (Linear SVM)
 * 4. k-Nearest Neighbors (k-NN con TF-IDF)
 * 5. Árbol de Decisión (CART con Gini)
 * Soporta evaluación Train/Test split y predicción en Tiempo Real (Online Ingestion).
 */

import { REVIEWS_DATASET, type TrainingReview } from '../data/reviewsDataset';
import type {
  ITextClassifier,
  SentimentCategory,
  ModelBenchmarkResult,
  ComprehensiveBenchmarkReport,
  SinglePrediction,
} from './types';
import { NaiveBayesClassifier } from './models/NaiveBayesClassifier';
import { LogisticRegressionClassifier } from './models/LogisticRegressionClassifier';
import { SupportVectorMachineClassifier } from './models/SupportVectorMachineClassifier';
import { KnnTextClassifier } from './models/KnnTextClassifier';
import { DecisionTreeClassifier } from './models/DecisionTreeClassifier';

const CATEGORIES: SentimentCategory[] = ['positivo', 'negativo', 'neutral'];

export class MlBenchmarkService {
  private static instance: MlBenchmarkService;

  private models: ITextClassifier[];
  private activeDataset: TrainingReview[];
  private cachedReport: ComprehensiveBenchmarkReport | null = null;
  private isTrained = false;

  private constructor() {
    this.models = [
      new NaiveBayesClassifier(),
      new LogisticRegressionClassifier(),
      new SupportVectorMachineClassifier(),
      new KnnTextClassifier(),
      new DecisionTreeClassifier(),
    ];
    this.activeDataset = [...REVIEWS_DATASET];
  }

  public static getInstance(): MlBenchmarkService {
    if (!MlBenchmarkService.instance) {
      MlBenchmarkService.instance = new MlBenchmarkService();
    }
    return MlBenchmarkService.instance;
  }

  /**
   * Ejecuta el Benchmark Comparativo Completo sobre el conjunto de datos (Train/Test Split).
   */
  public runComprehensiveBenchmark(testRatio = 0.2): ComprehensiveBenchmarkReport {
    // 1. División estratificada Train / Test (80% / 20%)
    const { trainSet, testSet } = this.stratifiedSplit(this.activeDataset, testRatio);

    const results: ModelBenchmarkResult[] = [];

    for (const model of this.models) {
      // A. Medir tiempo de entrenamiento
      const { trainingTimeMs } = model.train(trainSet);

      // B. Evaluar sobre el conjunto de prueba independiente
      let correctCount = 0;
      let totalInferenceTime = 0;

      const confusionMatrix: Record<SentimentCategory, Record<SentimentCategory, number>> = {
        positivo: { positivo: 0, negativo: 0, neutral: 0 },
        negativo: { positivo: 0, negativo: 0, neutral: 0 },
        neutral: { positivo: 0, negativo: 0, neutral: 0 },
      };

      for (const sample of testSet) {
        const trueLabel = (sample.sentimiento as SentimentCategory) || 'neutral';
        const pred = model.predict(sample.comentario);
        totalInferenceTime += pred.inferenceTimeMs;

        confusionMatrix[trueLabel][pred.sentiment]++;
        if (pred.sentiment === trueLabel) {
          correctCount++;
        }
      }

      const totalTest = testSet.length;
      const accuracy = Number(((correctCount / totalTest) * 100).toFixed(1));
      const avgInferenceTimeMs = Number((totalInferenceTime / totalTest).toFixed(3));

      // C. Cálculo de Métricas Macro (Precision, Recall y F1-Score)
      const { precision, recall, f1Score } = this.calculateMacroMetrics(confusionMatrix);

      results.push({
        modelId: model.id,
        modelName: model.name,
        algorithmFamily: model.family,
        accuracy,
        precision,
        recall,
        f1Score,
        trainingTimeMs: Number(trainingTimeMs.toFixed(2)),
        avgInferenceTimeMs,
        confusionMatrix,
        theoreticalBasis: model.theoreticalBasis,
        strengths: model.strengths,
        weaknesses: model.weaknesses,
      });
    }

    // 2. Determinar científicamente el modelo ganador
    // Ponderación académica: 55% F1-Score + 30% Accuracy + 15% Eficiencia de Inferencia
    let bestCompositeScore = -1;
    let winningIndex = 0;

    results.forEach((res, idx) => {
      // Normalizar latencia (menor es mejor)
      const speedScore = Math.max(0, 100 - res.avgInferenceTimeMs * 10);
      const composite = res.f1Score * 0.55 + res.accuracy * 0.3 + speedScore * 0.15;

      if (composite > bestCompositeScore) {
        bestCompositeScore = composite;
        winningIndex = idx;
      }
    });

    results[winningIndex].isWinner = true;
    const winner = results[winningIndex];

    // 3. Justificación científica
    const scientificVerdict =
      `El modelo ganador del benchmark es "${winner.modelName}" con una Exactitud global (Accuracy) del ${winner.accuracy}% ` +
      `y un F1-Score Macro del ${winner.f1Score}%. ` +
      `En el procesamiento de lenguaje natural en español con vocabulario disperso y 500 reseñas balanceadas, ` +
      `${winner.theoreticalBasis} ` +
      `Su velocidad de inferencia de ${winner.avgInferenceTimeMs} ms por reseña garantiza un rendimiento óptimo ` +
      `para despliegues en tiempo real y sistemas de streaming de reseñas en vivo.`;

    const classDistribution: Record<SentimentCategory, number> = { positivo: 0, negativo: 0, neutral: 0 };
    for (const d of this.activeDataset) {
      const s = (d.sentimiento as SentimentCategory) || 'neutral';
      classDistribution[s]++;
    }

    this.cachedReport = {
      models: results,
      winner,
      scientificVerdict,
      totalDatasetCount: this.activeDataset.length,
      trainCount: trainSet.length,
      testCount: testSet.length,
      splitRatio: `${Math.round((1 - testRatio) * 100)}% Entrenamiento / ${Math.round(testRatio * 100)}% Prueba`,
      classDistribution,
      evaluatedAt: new Date(),
    };

    this.isTrained = true;
    return this.cachedReport;
  }

  /**
   * Predice en Tiempo Real una reseña simultáneamente con los 5 algoritmos.
   */
  public predictRealTime(text: string): Record<string, SinglePrediction> {
    if (!this.isTrained) {
      this.runComprehensiveBenchmark();
    }

    const predictions: Record<string, SinglePrediction> = {};
    for (const model of this.models) {
      predictions[model.id] = model.predict(text);
    }
    return predictions;
  }

  /**
   * Agrega un nuevo dato en caliente (Online Ingestion) y recalcula el benchmark al instante.
   */
  public ingestNewSample(sample: TrainingReview): ComprehensiveBenchmarkReport {
    this.activeDataset.unshift(sample);
    // Invalidar caché y re-ejecutar benchmark con la muestra incorporada
    return this.runComprehensiveBenchmark();
  }

  public getActiveDatasetCount(): number {
    return this.activeDataset.length;
  }

  public getActiveDataset(): TrainingReview[] {
    return this.activeDataset;
  }

  public getCachedReport(): ComprehensiveBenchmarkReport {
    if (!this.cachedReport) {
      return this.runComprehensiveBenchmark();
    }
    return this.cachedReport;
  }

  /**
   * División estratificada para garantizar proporciones balanceadas de clases en Train y Test.
   */
  private stratifiedSplit(
    data: TrainingReview[],
    testRatio: number
  ): { trainSet: TrainingReview[]; testSet: TrainingReview[] } {
    const byClass: Record<SentimentCategory, TrainingReview[]> = {
      positivo: [],
      negativo: [],
      neutral: [],
    };

    for (const item of data) {
      const cat = (item.sentimiento as SentimentCategory) || 'neutral';
      byClass[cat].push(item);
    }

    const trainSet: TrainingReview[] = [];
    const testSet: TrainingReview[] = [];

    for (const cat of CATEGORIES) {
      const items = byClass[cat];
      const testCount = Math.max(1, Math.floor(items.length * testRatio));

      // División determinista por rebanado
      const testSlice = items.slice(0, testCount);
      const trainSlice = items.slice(testCount);

      testSet.push(...testSlice);
      trainSet.push(...trainSlice);
    }

    return { trainSet, testSet };
  }

  /**
   * Calcula Precision, Recall y F1-Score promedio Macro a partir de la matriz de confusión.
   */
  private calculateMacroMetrics(
    matrix: Record<SentimentCategory, Record<SentimentCategory, number>>
  ): { precision: number; recall: number; f1Score: number } {
    let sumPrecision = 0;
    let sumRecall = 0;
    let sumF1 = 0;

    for (const cat of CATEGORIES) {
      const tp = matrix[cat][cat];

      // Total predichos como 'cat' (columna)
      let predTotal = 0;
      for (const row of CATEGORIES) {
        predTotal += matrix[row][cat];
      }

      // Total reales de 'cat' (fila)
      let actualTotal = 0;
      for (const col of CATEGORIES) {
        actualTotal += matrix[cat][col];
      }

      const p = predTotal > 0 ? tp / predTotal : 0;
      const r = actualTotal > 0 ? tp / actualTotal : 0;
      const f1 = p + r > 0 ? (2 * p * r) / (p + r) : 0;

      sumPrecision += p;
      sumRecall += r;
      sumF1 += f1;
    }

    const precision = Number(((sumPrecision / 3) * 100).toFixed(1));
    const recall = Number(((sumRecall / 3) * 100).toFixed(1));
    const f1Score = Number(((sumF1 / 3) * 100).toFixed(1));

    return { precision, recall, f1Score };
  }
}

export const mlBenchmarkService = MlBenchmarkService.getInstance();
