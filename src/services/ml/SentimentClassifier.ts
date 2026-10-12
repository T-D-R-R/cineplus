/**
 * CinePlus - SentimentClassifier (Machine Learning)
 * Clasificador Supervisado Multinomial Naive Bayes con Suavizado de Laplace
 * Entrenado sobre el dataset de 500 reseñas cinematográficas en español.
 */

import { REVIEWS_DATASET, type TrainingReview } from './data/reviewsDataset';

export type SentimentLabel = 'positivo' | 'negativo' | 'neutral';

export interface SentimentPrediction {
  sentiment: SentimentLabel;
  confidence: number; // Porcentaje de confianza 0 a 100%
  probabilities: Record<SentimentLabel, number>;
  keywords: string[];
}

export interface ModelMetrics {
  accuracy: number;
  totalTrained: number;
  totalTested: number;
  confusionMatrix: Record<SentimentLabel, Record<SentimentLabel, number>>;
}

const SPANISH_STOP_WORDS = new Set([
  'de', 'la', 'que', 'el', 'en', 'y', 'a', 'los', 'del', 'se', 'las', 'por', 'un', 'para',
  'con', 'no', 'una', 'su', 'al', 'lo', 'como', 'mas', 'pero', 'sus', 'le', 'ya', 'o',
  'este', 'si', 'porque', 'esta', 'son', 'entre', 'esta', 'cuando', 'muy', 'sin', 'sobre',
  'tambien', 'me', 'hasta', 'hay', 'donde', 'quien', 'desde', 'todo', 'nos', 'durante',
  'todos', 'uno', 'les', 'ni', 'contra', 'otros', 'ese', 'eso', 'ante', 'ellos', 'e',
  'esto', 'mi', 'antes', 'algunos', 'unos', 'yo', 'otro', 'otras', 'otra', 'el', 'tanto',
  'esa', 'estos', 'mucho', 'quienes', 'nada', 'muchos', 'cual', 'poco', 'ella', 'estar',
  'estas', 'algunas', 'algo', 'nosotros', 'mi', 'mis', 'tu', 'te', 'ti', 'tus', 'ellas',
  'nosotras', 'vosotros', 'vosotras', 'os', 'mio', 'mia', 'mios', 'mias', 'tuyo', 'tuya'
]);

export class SentimentClassifier {
  private static instance: SentimentClassifier;
  private isTrained = false;

  // Estadísticas del modelo Naive Bayes
  private totalDocuments = 0;
  private classDocCounts: Record<SentimentLabel, number> = { positivo: 0, negativo: 0, neutral: 0 };
  private classWordCounts: Record<SentimentLabel, number> = { positivo: 0, negativo: 0, neutral: 0 };
  private wordFrequencies: Record<SentimentLabel, Map<string, number>> = {
    positivo: new Map(),
    negativo: new Map(),
    neutral: new Map(),
  };
  private vocabulary = new Set<string>();

  private constructor() {
    this.train(REVIEWS_DATASET);
  }

  public static getInstance(): SentimentClassifier {
    if (!SentimentClassifier.instance) {
      SentimentClassifier.instance = new SentimentClassifier();
    }
    return SentimentClassifier.instance;
  }

  /**
   * Preprocesamiento de texto en español:
   * - Minúsculas
   * - Eliminación de acentos / tildes
   * - Eliminación de signos de puntuación y números
   * - Filtrado de Stop Words
   * - Lematización / Stemming de sufijos en español (-a, -o, -as, -os, -mente, etc.)
   */
  public stem(word: string): string {
    let w = word;
    if (w.endsWith('mente') && w.length > 7) w = w.slice(0, -5);
    if ((w.endsWith('isimo') || w.endsWith('isima')) && w.length > 7) w = w.slice(0, -5);
    if ((w.endsWith('aron') || w.endsWith('eron') || w.endsWith('aban')) && w.length > 6) w = w.slice(0, -4);
    if ((w.endsWith('ado') || w.endsWith('ada') || w.endsWith('ido') || w.endsWith('ida')) && w.length > 5) w = w.slice(0, -3);
    if ((w.endsWith('as') || w.endsWith('os') || w.endsWith('es')) && w.length > 4) w = w.slice(0, -2);
    if ((w.endsWith('a') || w.endsWith('o') || w.endsWith('e')) && w.length > 4) w = w.slice(0, -1);
    return w.length >= 3 ? w : word;
  }

  public tokenize(text: string): string[] {
    const normalized = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zñ\s]/g, ' ');

    return normalized
      .split(/\s+/)
      .map((w) => w.trim())
      .filter((w) => w.length >= 3 && !SPANISH_STOP_WORDS.has(w))
      .map((w) => this.stem(w));
  }

  /**
   * Entrena el clasificador Naive Bayes con los datos provistos.
   */
  public train(data: TrainingReview[]): void {
    this.totalDocuments = 0;
    this.classDocCounts = { positivo: 0, negativo: 0, neutral: 0 };
    this.classWordCounts = { positivo: 0, negativo: 0, neutral: 0 };
    this.wordFrequencies = {
      positivo: new Map(),
      negativo: new Map(),
      neutral: new Map(),
    };
    this.vocabulary.clear();

    for (const item of data) {
      const label = item.sentimiento;
      if (!this.classDocCounts[label] && this.classDocCounts[label] !== 0) continue;

      this.totalDocuments++;
      this.classDocCounts[label]++;

      const tokens = this.tokenize(item.comentario);
      for (const token of tokens) {
        this.vocabulary.add(token);
        this.classWordCounts[label]++;

        const count = this.wordFrequencies[label].get(token) || 0;
        this.wordFrequencies[label].set(token, count + 1);
      }
    }

    this.isTrained = true;
  }

  /**
   * Predice la polaridad de sentimiento (positivo, negativo, neutral)
   * aplicando Log-Likelihood con Suavizado de Laplace (alpha = 1).
   */
  public predict(text: string): SentimentPrediction {
    if (!this.isTrained) {
      this.train(REVIEWS_DATASET);
    }

    const tokens = this.tokenize(text);
    const vocabSize = Math.max(this.vocabulary.size, 1);
    const labels: SentimentLabel[] = ['positivo', 'negativo', 'neutral'];

    const logScores: Record<SentimentLabel, number> = {
      positivo: 0,
      negativo: 0,
      neutral: 0,
    };

    for (const label of labels) {
      // Probabilidad a priori: log(P(C))
      const prior = Math.log((this.classDocCounts[label] + 1) / (this.totalDocuments + 3));
      let likelihood = 0;

      const totalWordsInClass = this.classWordCounts[label];
      const freqMap = this.wordFrequencies[label];

      for (const token of tokens) {
        const count = freqMap.get(token) || 0;
        // Suavizado de Laplace: (count + 1) / (totalWords + vocabSize)
        likelihood += Math.log((count + 1) / (totalWordsInClass + vocabSize));
      }

      logScores[label] = prior + likelihood;
    }

    // Convertir logScores a probabilidades normalizadas usando Softmax numéricamente estable
    const maxLog = Math.max(logScores.positivo, logScores.negativo, logScores.neutral);
    const expPos = Math.exp(logScores.positivo - maxLog);
    const expNeg = Math.exp(logScores.negativo - maxLog);
    const expNeu = Math.exp(logScores.neutral - maxLog);
    const sumExp = expPos + expNeg + expNeu;

    const probabilities: Record<SentimentLabel, number> = {
      positivo: Math.round((expPos / sumExp) * 1000) / 1000,
      negativo: Math.round((expNeg / sumExp) * 1000) / 1000,
      neutral: Math.round((expNeu / sumExp) * 1000) / 1000,
    };

    // Determinar clase ganadora
    let bestLabel: SentimentLabel = 'neutral';
    let highestProb = -1;

    for (const label of labels) {
      if (probabilities[label] > highestProb) {
        highestProb = probabilities[label];
        bestLabel = label;
      }
    }

    // Extraer palabras clave influyentes detectadas en la reseña
    const keywords = tokens.filter((t) => this.vocabulary.has(t)).slice(0, 5);

    return {
      sentiment: bestLabel,
      confidence: Math.round(highestProb * 100),
      probabilities,
      keywords,
    };
  }

  /**
   * Evalúa la precisión del modelo dividiendo el dataset en 80% entrenamiento y 20% test.
   */
  public evaluateTrainTestSplit(testRatio = 0.2): ModelMetrics {
    const shuffled = [...REVIEWS_DATASET].sort(() => Math.random() - 0.5);
    const splitIndex = Math.floor(shuffled.length * (1 - testRatio));
    const trainSet = shuffled.slice(0, splitIndex);
    const testSet = shuffled.slice(splitIndex);

    // Entrenar temporalmente con el 80%
    this.train(trainSet);

    const confusionMatrix: Record<SentimentLabel, Record<SentimentLabel, number>> = {
      positivo: { positivo: 0, negativo: 0, neutral: 0 },
      negativo: { positivo: 0, negativo: 0, neutral: 0 },
      neutral: { positivo: 0, negativo: 0, neutral: 0 },
    };

    let correct = 0;
    for (const sample of testSet) {
      const pred = this.predict(sample.comentario);
      confusionMatrix[sample.sentimiento][pred.sentiment]++;
      if (pred.sentiment === sample.sentimiento) {
        correct++;
      }
    }

    // Reentrenar con el 100% de datos para dejar el modelo listo para producción
    this.train(REVIEWS_DATASET);

    return {
      accuracy: Math.round((correct / testSet.length) * 1000) / 10,
      totalTrained: trainSet.length,
      totalTested: testSet.length,
      confusionMatrix,
    };
  }
}
