/**
 * Algoritmo 5: Árbol de Decisión (CART - Classification and Regression Tree)
 * Familia: Modelos Jerárquicos Basados en Reglas
 * Fundamento: Partición recursiva binaria del espacio léxico minimizando la impureza de Gini.
 */

import type { ITextClassifier, SentimentCategory, SinglePrediction } from '../types';
import type { TrainingReview } from '../../data/reviewsDataset';
import { TextFeatureExtractor } from '../TextFeatureExtractor';

const CLASSES: SentimentCategory[] = ['positivo', 'negativo', 'neutral'];

interface TreeNode {
  isLeaf: boolean;
  featureIndex?: number;
  featureName?: string;
  threshold?: number;
  left?: TreeNode;
  right?: TreeNode;
  probabilities: Record<SentimentCategory, number>;
  predictedClass: SentimentCategory;
}

export class DecisionTreeClassifier implements ITextClassifier {
  public readonly id = 'decision_tree';
  public readonly name = 'Árbol de Decisión (CART)';
  public readonly family = 'Jerárquico Basado en Reglas (White-Box)';
  public readonly theoreticalBasis =
    'Construye un árbol binario de decisión seleccionando en cada nodo la palabra cuya presencia ' +
    'maximiza la reducción de impureza de Gini (Gini Gain), permitiendo una inspección directa de reglas lógicas.';
  public readonly strengths = [
    'Modelo 100% explicable (White-Box): cada decisión sigue una cadena lógica de preguntas Si/No.',
    'Inferencia extremadamente rápida O(profundidad) sin requerir productos punto completos.',
    'No se ve afectado por la escala ni distribución de las variables.',
  ];
  public readonly weaknesses = [
    'Menor suavidad que los modelos continuos; propenso al sobreajuste si no se limita la profundidad.',
    'Puede ser inestable ante pequeños cambios léxicos en el vocabulario.',
  ];

  private extractor = new TextFeatureExtractor();
  private root: TreeNode | null = null;
  private maxDepth = 6;
  private minSamplesSplit = 4;

  public train(trainData: TrainingReview[]): { trainingTimeMs: number } {
    const startTime = performance.now();

    const corpus = trainData.map((d) => d.comentario);
    this.extractor.fit(corpus, 2, 250); // Usar top 250 términos para particiones significativas

    const X = trainData.map((d) => this.extractor.transform(d.comentario));
    const Y = trainData.map((d) => {
      const idx = CLASSES.indexOf((d.sentimiento as SentimentCategory) || 'neutral');
      return idx >= 0 ? idx : 2;
    });

    const vocabEntries = Array.from(this.extractor.getVocabulary().entries());
    const featureNames = new Array(this.extractor.getVocabularySize());
    for (const [name, idx] of vocabEntries) {
      featureNames[idx] = name;
    }

    this.root = this.buildTree(X, Y, 0, featureNames);

    const trainingTimeMs = performance.now() - startTime;
    return { trainingTimeMs };
  }

  private calculateGini(y: number[]): number {
    if (y.length === 0) return 0;
    const counts = [0, 0, 0];
    for (const label of y) counts[label]++;
    let sumSq = 0;
    for (const c of counts) {
      const p = c / y.length;
      sumSq += p * p;
    }
    return 1 - sumSq;
  }

  private buildTree(X: number[][], Y: number[], depth: number, featureNames: string[]): TreeNode {
    // Calcular distribución de clases en el nodo
    const counts = [0, 0, 0];
    for (const label of Y) counts[label]++;
    const total = Y.length;

    let bestIdx = 0;
    let maxCount = counts[0];
    for (let c = 1; c < 3; c++) {
      if (counts[c] > maxCount) {
        maxCount = counts[c];
        bestIdx = c;
      }
    }

    const probabilities: Record<SentimentCategory, number> = {
      positivo: total > 0 ? Number((counts[0] / total).toFixed(3)) : 0.33,
      negativo: total > 0 ? Number((counts[1] / total).toFixed(3)) : 0.33,
      neutral: total > 0 ? Number((counts[2] / total).toFixed(3)) : 0.34,
    };

    const nodePrediction = CLASSES[bestIdx];

    // Criterios de parada (Parada temprana / Poda preventiva)
    const currentGini = this.calculateGini(Y);
    if (depth >= this.maxDepth || Y.length < this.minSamplesSplit || currentGini === 0) {
      return {
        isLeaf: true,
        probabilities,
        predictedClass: nodePrediction,
      };
    }

    // Buscar la mejor característica (palabra) para bifurcar
    let bestFeature = -1;
    let bestGain = -1;
    let bestLeftIndices: number[] = [];
    let bestRightIndices: number[] = [];

    const numFeatures = featureNames.length;
    for (let f = 0; f < numFeatures; f++) {
      const left: number[] = [];
      const right: number[] = [];

      for (let i = 0; i < X.length; i++) {
        if (X[i][f] > 0.05) {
          left.push(i);
        } else {
          right.push(i);
        }
      }

      if (left.length === 0 || right.length === 0) continue;

      const yLeft = left.map((idx) => Y[idx]);
      const yRight = right.map((idx) => Y[idx]);

      const giniLeft = this.calculateGini(yLeft);
      const giniRight = this.calculateGini(yRight);
      const weightedGini = (left.length / total) * giniLeft + (right.length / total) * giniRight;
      const gain = currentGini - weightedGini;

      if (gain > bestGain) {
        bestGain = gain;
        bestFeature = f;
        bestLeftIndices = left;
        bestRightIndices = right;
      }
    }

    if (bestGain <= 0.001 || bestFeature === -1) {
      return {
        isLeaf: true,
        probabilities,
        predictedClass: nodePrediction,
      };
    }

    const xLeft = bestLeftIndices.map((i) => X[i]);
    const yLeft = bestLeftIndices.map((i) => Y[i]);
    const xRight = bestRightIndices.map((i) => X[i]);
    const yRight = bestRightIndices.map((i) => Y[i]);

    return {
      isLeaf: false,
      featureIndex: bestFeature,
      featureName: featureNames[bestFeature] || `f_${bestFeature}`,
      threshold: 0.05,
      left: this.buildTree(xLeft, yLeft, depth + 1, featureNames),
      right: this.buildTree(xRight, yRight, depth + 1, featureNames),
      probabilities,
      predictedClass: nodePrediction,
    };
  }

  public predict(text: string): SinglePrediction {
    const startTime = performance.now();
    const x = this.extractor.transform(text);

    let curr = this.root;
    while (curr && !curr.isLeaf) {
      if (curr.featureIndex !== undefined && x[curr.featureIndex] > (curr.threshold || 0.05)) {
        curr = curr.left || null;
      } else {
        curr = curr.right || null;
      }
    }

    const probabilities = curr?.probabilities || { positivo: 0.33, negativo: 0.33, neutral: 0.34 };
    const sentiment = curr?.predictedClass || 'neutral';
    const confidence = Math.round((probabilities[sentiment] || 0.33) * 100);

    const inferenceTimeMs = performance.now() - startTime;

    return {
      modelId: this.id,
      modelName: this.name,
      sentiment,
      confidence,
      probabilities,
      inferenceTimeMs,
    };
  }
}
