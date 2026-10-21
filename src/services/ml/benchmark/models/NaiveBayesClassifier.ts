/**
 * Algoritmo 1: Multinomial Naive Bayes con Suavizado de Laplace
 * Familia: Modelos Probabilísticos Generativos
 * Fundamento: Teorema de Bayes asumiendo independencia condicional entre palabras dado el sentimiento.
 */

import type { ITextClassifier, SentimentCategory, SinglePrediction } from '../types';
import type { TrainingReview } from '../../data/reviewsDataset';
import { TextFeatureExtractor } from '../TextFeatureExtractor';

export class NaiveBayesClassifier implements ITextClassifier {
  public readonly id = 'naive_bayes';
  public readonly name = 'Multinomial Naive Bayes';
  public readonly family = 'Generativo Probabilístico';
  public readonly theoreticalBasis =
    'Calcula la probabilidad posterior P(Clase|Texto) aplicando el Teorema de Bayes con ' +
    'suavizado de Laplace (α=1) para evitar probabilidades cero en palabras no observadas.';
  public readonly strengths = [
    'Extremadamente veloz en entrenamiento e inferencia O(N).',
    'Excelente rendimiento histórico en clasificación de texto y análisis de spam.',
    'Robusto ante palabras no vistas en entrenamiento gracias a Laplace.',
  ];
  public readonly weaknesses = [
    'Suposición fuerte de independencia condicional entre palabras (no modela n-gramas complejos).',
    'Sensible al desbalance de clases si no se ajustan los priors.',
  ];

  private classPriors: Record<SentimentCategory, number> = { positivo: 0, negativo: 0, neutral: 0 };
  private wordCounts: Record<SentimentCategory, Map<string, number>> = {
    positivo: new Map(),
    negativo: new Map(),
    neutral: new Map(),
  };
  private totalWordsInClass: Record<SentimentCategory, number> = { positivo: 0, negativo: 0, neutral: 0 };
  private vocabulary: Set<string> = new Set();

  public train(trainData: TrainingReview[]): { trainingTimeMs: number } {
    const startTime = performance.now();

    this.wordCounts = { positivo: new Map(), negativo: new Map(), neutral: new Map() };
    this.totalWordsInClass = { positivo: 0, negativo: 0, neutral: 0 };
    this.vocabulary.clear();

    const classDocCounts: Record<SentimentCategory, number> = { positivo: 0, negativo: 0, neutral: 0 };
    const totalDocs = trainData.length;

    for (const item of trainData) {
      const sentiment = (item.sentimiento as SentimentCategory) || 'neutral';
      classDocCounts[sentiment]++;

      const tokens = TextFeatureExtractor.tokenize(item.comentario);
      for (const token of tokens) {
        this.vocabulary.add(token);
        this.totalWordsInClass[sentiment]++;
        const map = this.wordCounts[sentiment];
        map.set(token, (map.get(token) || 0) + 1);
      }
    }

    // Calcular probabilidades a priori log(P(C))
    for (const key of ['positivo', 'negativo', 'neutral'] as SentimentCategory[]) {
      this.classPriors[key] = Math.log((classDocCounts[key] + 1) / (totalDocs + 3));
    }

    const trainingTimeMs = performance.now() - startTime;
    return { trainingTimeMs };
  }

  public predict(text: string): SinglePrediction {
    const startTime = performance.now();
    const tokens = TextFeatureExtractor.tokenize(text);
    const vocabSize = Math.max(1, this.vocabulary.size);

    const logScores: Record<SentimentCategory, number> = {
      positivo: this.classPriors.positivo,
      negativo: this.classPriors.negativo,
      neutral: this.classPriors.neutral,
    };

    const categories: SentimentCategory[] = ['positivo', 'negativo', 'neutral'];

    for (const category of categories) {
      const wordMap = this.wordCounts[category];
      const totalWords = this.totalWordsInClass[category];
      const denominator = totalWords + vocabSize;

      for (const token of tokens) {
        if (this.vocabulary.has(token)) {
          const count = wordMap.get(token) || 0;
          // Laplace Smoothing: (count + 1) / (totalWords + |V|)
          const pWordGivenClass = (count + 1) / denominator;
          logScores[category] += Math.log(pWordGivenClass);
        }
      }
    }

    // Normalizar mediante Log-Sum-Exp para evitar overflow numérico
    const maxLog = Math.max(logScores.positivo, logScores.negativo, logScores.neutral);
    const expPos = Math.exp(logScores.positivo - maxLog);
    const expNeg = Math.exp(logScores.negativo - maxLog);
    const expNeu = Math.exp(logScores.neutral - maxLog);
    const sumExp = expPos + expNeg + expNeu;

    const probPos = Number((expPos / sumExp).toFixed(3));
    const probNeg = Number((expNeg / sumExp).toFixed(3));
    const probNeu = Number((expNeu / sumExp).toFixed(3));

    let bestSentiment: SentimentCategory = 'positivo';
    let maxProb = probPos;

    if (probNeg > maxProb) {
      bestSentiment = 'negativo';
      maxProb = probNeg;
    }
    if (probNeu > maxProb) {
      bestSentiment = 'neutral';
      maxProb = probNeu;
    }

    const inferenceTimeMs = performance.now() - startTime;

    return {
      modelId: this.id,
      modelName: this.name,
      sentiment: bestSentiment,
      confidence: Math.round(maxProb * 100),
      probabilities: { positivo: probPos, negativo: probNeg, neutral: probNeu },
      inferenceTimeMs,
    };
  }
}
