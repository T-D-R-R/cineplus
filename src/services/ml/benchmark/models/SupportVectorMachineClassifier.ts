/**
 * Algoritmo 3: Support Vector Machine Lineal (Linear SVM con Hinge Loss)
 * Familia: Máquinas de Vectores de Soporte (Margen Máximo)
 * Fundamento: Maximiza el margen geométrico de separación entre clases minimizando la pérdida Hinge Loss.
 */

import type { ITextClassifier, SentimentCategory, SinglePrediction } from '../types';
import type { TrainingReview } from '../../data/reviewsDataset';
import { TextFeatureExtractor } from '../TextFeatureExtractor';

const CLASSES: SentimentCategory[] = ['positivo', 'negativo', 'neutral'];

export class SupportVectorMachineClassifier implements ITextClassifier {
  public readonly id = 'linear_svm';
  public readonly name = 'Support Vector Machine (Linear SVM)';
  public readonly family = 'Margen Máximo (Kernel Lineal)';
  public readonly theoreticalBasis =
    'Encuentra el hiperplano óptimo que maximiza la distancia geométrica al vector de soporte más cercano, ' +
    'optimizando la función Hinge Loss mediante Descenso de Subgradiente Estocástico (Pegasos).';
  public readonly strengths = [
    'Estándar de oro en NLP clásico: alta efectividad en espacios dispersos y de muchas dimensiones.',
    'Robusto contra el sobreajuste (overfitting) al priorizar los puntos frontera (vectores de soporte).',
    'Excelente precisión empírica en benchmarks de minería de opiniones.',
  ];
  public readonly weaknesses = [
    'No calcula probabilidades naturales directas; requiere calibración Softmax sobre las distancias al margen.',
    'Tiempo de entrenamiento ligeramente mayor que Naive Bayes al requerir optimización convexa por épocas.',
  ];

  private extractor = new TextFeatureExtractor();
  // 3 clasificadores binarios One-vs-Rest (OvR)
  private weights: number[][] = []; // [3][features]
  private biases: number[] = [0, 0, 0];

  public train(trainData: TrainingReview[]): { trainingTimeMs: number } {
    const startTime = performance.now();

    const corpus = trainData.map((d) => d.comentario);
    this.extractor.fit(corpus, 2, 400);
    const numFeatures = this.extractor.getVocabularySize();

    this.weights = Array.from({ length: 3 }, () => new Array(numFeatures).fill(0));
    this.biases = [0, 0, 0];

    const X = trainData.map((d) => this.extractor.transform(d.comentario));
    const rawLabels = trainData.map((d) => (d.sentimiento as SentimentCategory) || 'neutral');

    // Entrenar 3 clasificadores One-vs-Rest con Hinge Loss
    const epochs = 20;
    const lambda = 0.001; // Regularización L2
    let learningRate = 0.05;

    for (let c = 0; c < 3; c++) {
      const targetClass = CLASSES[c];
      const yBin = rawLabels.map((lab) => (lab === targetClass ? 1 : -1));
      const wc = this.weights[c];

      for (let epoch = 0; epoch < epochs; epoch++) {
        for (let i = 0; i < X.length; i++) {
          const x = X[i];
          const y = yBin[i];

          // Score: w^T x + b
          let score = this.biases[c];
          for (let j = 0; j < numFeatures; j++) {
            if (x[j] !== 0) score += wc[j] * x[j];
          }

          // Hinge condition: 1 - y * score > 0
          if (y * score < 1) {
            // Gradiente Hinge: -y * x + lambda * w
            this.biases[c] += learningRate * y;
            for (let j = 0; j < numFeatures; j++) {
              if (x[j] !== 0) {
                wc[j] = (1 - learningRate * lambda) * wc[j] + learningRate * y * x[j];
              } else {
                wc[j] *= 1 - learningRate * lambda;
              }
            }
          } else {
            // Solo decaimiento de regularización L2
            for (let j = 0; j < numFeatures; j++) {
              wc[j] *= 1 - learningRate * lambda;
            }
          }
        }
        learningRate *= 0.96;
      }
    }

    const trainingTimeMs = performance.now() - startTime;
    return { trainingTimeMs };
  }

  public predict(text: string): SinglePrediction {
    const startTime = performance.now();
    const x = this.extractor.transform(text);
    const numFeatures = this.extractor.getVocabularySize();

    // Calcular márgenes de decisión para cada clase
    const margins = [0, 0, 0];
    for (let c = 0; c < 3; c++) {
      let score = this.biases[c];
      const wc = this.weights[c];
      for (let j = 0; j < numFeatures; j++) {
        if (x[j] !== 0) score += wc[j] * x[j];
      }
      margins[c] = score;
    }

    // Convertir márgenes a probabilidades calibradas usando Softmax (Platt Scaling aproximado)
    const maxM = Math.max(margins[0], margins[1], margins[2]);
    const exp0 = Math.exp(margins[0] - maxM);
    const exp1 = Math.exp(margins[1] - maxM);
    const exp2 = Math.exp(margins[2] - maxM);
    const sumExp = exp0 + exp1 + exp2;

    const probPos = Number((exp0 / sumExp).toFixed(3));
    const probNeg = Number((exp1 / sumExp).toFixed(3));
    const probNeu = Number((exp2 / sumExp).toFixed(3));

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
