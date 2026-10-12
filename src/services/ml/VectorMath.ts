/**
 * CinePlus - VectorMath
 * Utilidades matemáticas vectoriales para algoritmos de Machine Learning (k-NN, Similitud Coseno)
 */

export class VectorMath {
  /**
   * Calcula el producto punto entre dos vectores de igual dimensión.
   */
  public static dotProduct(vecA: number[], vecB: number[]): number {
    const len = Math.min(vecA.length, vecB.length);
    let sum = 0;
    for (let i = 0; i < len; i++) {
      sum += vecA[i] * vecB[i];
    }
    return sum;
  }

  /**
   * Calcula la norma / magnitud euclidiana de un vector (L2 norm).
   */
  public static magnitude(vec: number[]): number {
    let sumSquares = 0;
    for (const val of vec) {
      sumSquares += val * val;
    }
    return Math.sqrt(sumSquares);
  }

  /**
   * Calcula la Similitud Coseno entre dos vectores en el rango [-1, 1],
   * típicamente [0, 1] para vectores de características no negativas.
   * Cosine Similarity = (A . B) / (||A|| * ||B||)
   */
  public static cosineSimilarity(vecA: number[], vecB: number[]): number {
    const magA = VectorMath.magnitude(vecA);
    const magB = VectorMath.magnitude(vecB);
    if (magA === 0 || magB === 0) return 0;
    return VectorMath.dotProduct(vecA, vecB) / (magA * magB);
  }

  /**
   * Calcula la Distancia Euclidiana entre dos vectores.
   * d(A, B) = sqrt(sum((A_i - B_i)^2))
   */
  public static euclideanDistance(vecA: number[], vecB: number[]): number {
    const len = Math.min(vecA.length, vecB.length);
    let sum = 0;
    for (let i = 0; i < len; i++) {
      const diff = vecA[i] - vecB[i];
      sum += diff * diff;
    }
    return Math.sqrt(sum);
  }

  /**
   * Normalización Min-Max al rango [0, 1].
   */
  public static minMaxScale(val: number, min: number, max: number): number {
    if (max <= min) return 0.5;
    const clamped = Math.max(min, Math.min(max, val));
    return (clamped - min) / (max - min);
  }
}
