/**
 * Algoritmo 2: Regresión Logística Multinomial (Softmax con SGD y Regularización L2)
 * Familia: Modelos Lineales Discriminativos
 * Fundamento: Modela directamente P(y=c|x) mediante una función Softmax sobre combinaciones lineales.
 */

import type { ITextClassifier, SentimentCategory, SinglePrediction } from '../types';
import type { TrainingReview } from '../../data/reviewsDataset';
import { TextFeatureExtractor } from '../TextFeatureExtractor';

const CLASSES: SentimentCategory[] = ['positivo', 'negativo', 'neutral'];

export class LogisticRegressionClassifier implements ITextClassifier {
  public readonly id = 'logistic_regression';
  public readonly name = 'Regresión Logística (SGD)';
  public readonly family = 'Lineal Discriminativo';
  public readonly theoreticalBasis =
    'Aprende hiperplanos de separación optimizando la función de pérdida Cross-Entropy ' +
    'mediante Descenso de Gradiente Estocástico (SGD) con penalización de norma L2.';
  public readonly strengths = [
    'Produce probabilidades perfectamente calibradas mediante la función Softmax.',
    'Excelente interpretabilidad: los pesos W reflejan directamente la polaridad de las palabras.',
    'Gran capacidad de generalización gracias a la regularización L2 (Ridge).',
  ];
  public readonly weaknesses = [
    'Asume fronteras de decisión lineales entre clases en el espacio vectorial.',
    'Requiere ajuste de hiperparámetros de tasa de aprendizaje (learning rate) y épocas.',
  ];

  private extractor = new TextFeatureExtractor();
  private weights: number[][] = []; // [3][vocabSize]
  private biases: number[] = [0, 0, 0];

  public train(trainData: TrainingReview[]): { trainingTimeMs: number } {
    const startTime = performance.now();

    // 1. Ajustar vocabulario y extraer vectores TF-IDF
    const corpus = trainData.map((d) => d.comentario);
    this.extractor.fit(corpus, 2, 400);
    const numFeatures = this.extractor.getVocabularySize();

    // 2. Inicializar pesos en cero
    this.weights = Array.from({ length: 3 }, () => new Array(numFeatures).fill(0));
    this.biases = [0, 0, 0];

    // 3. Pre-vectorizar todos los ejemplos de entrenamiento
    const X = trainData.map((d) => this.extractor.transform(d.comentario));
    const Y = trainData.map((d) => {
      const idx = CLASSES.indexOf((d.sentimiento as SentimentCategory) || 'neutral');
      return idx >= 0 ? idx : 2;
    });

    // 4. Descenso de Gradiente Estocástico (SGD) con Mini-Batches
    const epochs = 25;
    let lr = 0.08;
    const l2Lambda = 0.001;

    for (let epoch = 0; epoch < epochs; epoch++) {
      for (let i = 0; i < X.length; i++) {
        const x = X[i];
        const yTrue = Y[i];

        // Calcular puntuaciones lineales z_c = w_c^T x + b_c
        const z = [0, 0, 0];
        for (let c = 0; c < 3; c++) {
          let dot = this.biases[c];
          const wc = this.weights[c];
          for (let j = 0; j < numFeatures; j++) {
            if (x[j] !== 0) dot += wc[j] * x[j];
          }
          z[c] = dot;
        }

        // Softmax
        const maxZ = Math.max(z[0], z[1], z[2]);
        const exp0 = Math.exp(z[0] - maxZ);
        const exp1 = Math.exp(z[1] - maxZ);
        const exp2 = Math.exp(z[2] - maxZ);
        const sumExp = exp0 + exp1 + exp2;
        const probs = [exp0 / sumExp, exp1 / sumExp, exp2 / sumExp];

        // Actualizar gradiente: grad = p - y
        for (let c = 0; c < 3; c++) {
          const target = c === yTrue ? 1 : 0;
          const error = probs[c] - target;

          this.biases[c] -= lr * error;
          const wc = this.weights[c];
          for (let j = 0; j < numFeatures; j++) {
            if (x[j] !== 0) {
              const grad = error * x[j] + l2Lambda * wc[j];
              wc[j] -= lr * grad;
            }
          }
        }
      }
      lr *= 0.95; // Descenso exponencial de la tasa de aprendizaje
    }

    const trainingTimeMs = performance.now() - startTime;
    return { trainingTimeMs };
  }

  public predict(text: string): SinglePrediction {
    const startTime = performance.now();
    const x = this.extractor.transform(text);
    const numFeatures = this.extractor.getVocabularySize();

    const z = [0, 0, 0];
    for (let c = 0; c < 3; c++) {
      let dot = this.biases[c];
      const wc = this.weights[c];
      for (let j = 0; j < numFeatures; j++) {
        if (x[j] !== 0) dot += wc[j] * x[j];
      }
      z[c] = dot;
    }

    const maxZ = Math.max(z[0], z[1], z[2]);
    const exp0 = Math.exp(z[0] - maxZ);
    const exp1 = Math.exp(z[1] - maxZ);
    const exp2 = Math.exp(z[2] - maxZ);
    const sumExp = exp0 + exp1 + exp2;

    const probPos = Number((exp0 / sumExp).toFixed(3));
    const probNeg = Number((exp1 / sumExp).toFixed(3));
    const probNeu = Number((exp2 / sumExp).toFixed(3));

    let bestSentiment: SentimentCategory = 'positivo';
    let maxP = probPos;

    if (probNeg > maxP) {
      bestSentiment = 'negativo';
      maxP = probNeg;
    }
    if (probNeu > maxP) {
      bestSentiment = 'neutral';
      maxP = probNeu;
    }

    const inferenceTimeMs = performance.now() - startTime;

    return {
      modelId: this.id,
      modelName: this.name,
      sentiment: bestSentiment,
      confidence: Math.round(maxP * 100),
      probabilities: { positivo: probPos, negativo: probNeg, neutral: probNeu },
      inferenceTimeMs,
    };
  }
}
