/**
 * Algoritmo 4: k-Nearest Neighbors (k-NN con TF-IDF y Similitud Coseno)
 * Familia: Aprendizaje Basado en Instancias (Lazy Learning)
 * Fundamento: Clasifica por votación ponderada de los 'k' documentos más cercanos en el espacio vectorial.
 */

import type { ITextClassifier, SentimentCategory, SinglePrediction } from '../types';
import type { TrainingReview } from '../../data/reviewsDataset';
import { TextFeatureExtractor } from '../TextFeatureExtractor';
import { VectorMath } from '../../VectorMath';

interface TrainingInstance {
  vector: number[];
  sentiment: SentimentCategory;
}

export class KnnTextClassifier implements ITextClassifier {
  public readonly id = 'knn_tfidf';
  public readonly name = 'k-Nearest Neighbors (k-NN, k=5)';
  public readonly family = 'Basado en Instancias (No Paramétrico)';
  public readonly theoreticalBasis =
    'Representa las reseñas como vectores unitarios TF-IDF y proyecta el texto entrante ' +
    'calculando la Similitud Coseno cos(θ) contra todas las muestras de entrenamiento, asignando ' +
    'la etiqueta por votación mayoritaria ponderada entre los k=5 vecinos más cercanos.';
  public readonly strengths = [
    'No requiere entrenamiento explícito ni suposiciones a priori sobre la distribución de datos.',
    'Altamente transparente: permite inspeccionar con exactitud qué reseñas pasadas influyeron en la predicción.',
    'Capaz de capturar fronteras de decisión no lineales complejas de forma natural.',
  ];
  public readonly weaknesses = [
    'Mayor tiempo de inferencia O(N·d): debe escanear todas las muestras almacenadas en cada consulta.',
    'Sensible a la dimensionalidad y a documentos de longitud atípica (maldición de la dimensionalidad).',
  ];

  private extractor = new TextFeatureExtractor();
  private trainingInstances: TrainingInstance[] = [];
  private k = 5;

  public train(trainData: TrainingReview[]): { trainingTimeMs: number } {
    const startTime = performance.now();

    const corpus = trainData.map((d) => d.comentario);
    this.extractor.fit(corpus, 2, 400);

    this.trainingInstances = trainData.map((d) => ({
      vector: this.extractor.transform(d.comentario),
      sentiment: (d.sentimiento as SentimentCategory) || 'neutral',
    }));

    const trainingTimeMs = performance.now() - startTime;
    return { trainingTimeMs };
  }

  public predict(text: string): SinglePrediction {
    const startTime = performance.now();
    const queryVector = this.extractor.transform(text);

    if (this.trainingInstances.length === 0) {
      return {
        modelId: this.id,
        modelName: this.name,
        sentiment: 'neutral',
        confidence: 33,
        probabilities: { positivo: 0.33, negativo: 0.33, neutral: 0.34 },
        inferenceTimeMs: performance.now() - startTime,
      };
    }

    // Calcular similitud coseno contra todas las instancias de entrenamiento
    const scored = this.trainingInstances.map((inst) => ({
      similarity: VectorMath.cosineSimilarity(queryVector, inst.vector),
      sentiment: inst.sentiment,
    }));

    // Ordenar de mayor a menor similitud y tomar los k vecinos
    scored.sort((a, b) => b.similarity - a.similarity);
    const topK = scored.slice(0, this.k);

    // Votación ponderada por similitud
    const votes: Record<SentimentCategory, number> = { positivo: 0, negativo: 0, neutral: 0 };
    let totalWeight = 0;

    for (const neighbor of topK) {
      const weight = Math.max(0.001, neighbor.similarity);
      votes[neighbor.sentiment] += weight;
      totalWeight += weight;
    }

    const probPos = Number((votes.positivo / totalWeight).toFixed(3));
    const probNeg = Number((votes.negativo / totalWeight).toFixed(3));
    const probNeu = Number((votes.neutral / totalWeight).toFixed(3));

    let bestSentiment: SentimentCategory = 'positivo';
    let maxVote = probPos;

    if (probNeg > maxVote) {
      bestSentiment = 'negativo';
      maxVote = probNeg;
    }
    if (probNeu > maxVote) {
      bestSentiment = 'neutral';
      maxVote = probNeu;
    }

    const inferenceTimeMs = performance.now() - startTime;

    return {
      modelId: this.id,
      modelName: this.name,
      sentiment: bestSentiment,
      confidence: Math.round(maxVote * 100),
      probabilities: { positivo: probPos, negativo: probNeg, neutral: probNeu },
      inferenceTimeMs,
    };
  }
}
