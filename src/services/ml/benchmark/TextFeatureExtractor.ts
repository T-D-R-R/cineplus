/**
 * CinePlus - TextFeatureExtractor
 * Vectorizador y Extractor de Características NLP en Español:
 * - Normalización Unicode NFD y limpieza de caracteres
 * - Filtrado de Stop Words en español
 * - Lematización de sufijos frecuentes
 * - Construcción de Vocabulario y matriz TF-IDF
 */

const SPANISH_STOP_WORDS = new Set([
  'de', 'la', 'que', 'el', 'en', 'y', 'a', 'los', 'del', 'se', 'las', 'por', 'un', 'para',
  'con', 'no', 'una', 'su', 'al', 'lo', 'como', 'mas', 'pero', 'sus', 'le', 'ya', 'o',
  'este', 'si', 'porque', 'esta', 'son', 'entre', 'cuando', 'muy', 'sin', 'sobre',
  'tambien', 'me', 'hasta', 'hay', 'donde', 'quien', 'desde', 'todo', 'nos', 'durante',
  'todos', 'uno', 'les', 'ni', 'contra', 'otros', 'ese', 'eso', 'ante', 'ellos', 'e',
  'esto', 'mi', 'antes', 'algunos', 'unos', 'yo', 'otro', 'otras', 'otra', 'tanto',
  'esa', 'estos', 'mucho', 'quienes', 'nada', 'muchos', 'cual', 'poco', 'ella', 'estar',
  'estas', 'algunas', 'algo', 'nosotros', 'mis', 'tu', 'te', 'ti', 'tus', 'ellas',
  'nosotras', 'vosotros', 'vosotras', 'os', 'mio', 'mia', 'mios', 'mias', 'tuyo', 'tuya'
]);

export class TextFeatureExtractor {
  private vocabulary: Map<string, number> = new Map(); // token -> index
  private idfWeights: number[] = [];
  private totalDocs = 0;

  /**
   * Lematización por recorte de sufijos morfológicos en español
   */
  public static stem(word: string): string {
    let w = word;
    if (w.endsWith('mente') && w.length > 7) w = w.slice(0, -5);
    if ((w.endsWith('isimo') || w.endsWith('isima')) && w.length > 7) w = w.slice(0, -5);
    if ((w.endsWith('aron') || w.endsWith('eron') || w.endsWith('aban')) && w.length > 6) w = w.slice(0, -4);
    if ((w.endsWith('ado') || w.endsWith('ada') || w.endsWith('ido') || w.endsWith('ida')) && w.length > 5) w = w.slice(0, -3);
    if ((w.endsWith('as') || w.endsWith('os') || w.endsWith('es')) && w.length > 4) w = w.slice(0, -2);
    if ((w.endsWith('a') || w.endsWith('o') || w.endsWith('e')) && w.length > 4) w = w.slice(0, -1);
    return w.length >= 3 ? w : word;
  }

  /**
   * Tokenización y limpieza léxica
   */
  public static tokenize(text: string): string[] {
    const normalized = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zñ\s]/g, ' ');

    return normalized
      .split(/\s+/)
      .map((w) => w.trim())
      .filter((w) => w.length >= 3 && !SPANISH_STOP_WORDS.has(w))
      .map((w) => TextFeatureExtractor.stem(w));
  }

  /**
   * Construye el vocabulario y calcula las frecuencias inversas de documento (IDF)
   */
  public fit(documents: string[], minDocFreq = 2, maxFeatures = 500): void {
    this.totalDocs = documents.length;
    const docFreq = new Map<string, number>();

    // 1. Contar frecuencia de documentos por término
    for (const doc of documents) {
      const tokens = new Set(TextFeatureExtractor.tokenize(doc));
      for (const token of tokens) {
        docFreq.set(token, (docFreq.get(token) || 0) + 1);
      }
    }

    // 2. Filtrar términos relevantes por frecuencia
    const sortedTokens = Array.from(docFreq.entries())
      .filter(([_, count]) => count >= minDocFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxFeatures)
      .map(([token]) => token);

    this.vocabulary.clear();
    sortedTokens.forEach((token, idx) => {
      this.vocabulary.set(token, idx);
    });

    // 3. Calcular ponderación IDF suave: log((N + 1) / (df + 1)) + 1
    const N = this.totalDocs;
    this.idfWeights = sortedTokens.map((token) => {
      const df = docFreq.get(token) || 1;
      return Math.log((N + 1) / (df + 1)) + 1.0;
    });
  }

  /**
   * Transforma un texto a un vector numérico denso normalizado (TF-IDF con norma L2)
   */
  public transform(text: string): number[] {
    const vector = new Array(this.vocabulary.size).fill(0);
    const tokens = TextFeatureExtractor.tokenize(text);
    if (tokens.length === 0 || this.vocabulary.size === 0) return vector;

    // Calcular Term Frequency (TF)
    for (const token of tokens) {
      const idx = this.vocabulary.get(token);
      if (idx !== undefined) {
        vector[idx] += 1;
      }
    }

    // Multiplicar por IDF y normalizar norma L2
    let sumSq = 0;
    for (let i = 0; i < vector.length; i++) {
      if (vector[i] > 0) {
        vector[i] = vector[i] * this.idfWeights[i];
        sumSq += vector[i] * vector[i];
      }
    }

    const norm = Math.sqrt(sumSq);
    if (norm > 0) {
      for (let i = 0; i < vector.length; i++) {
        vector[i] /= norm;
      }
    }

    return vector;
  }

  public getVocabularySize(): number {
    return this.vocabulary.size;
  }

  public getVocabulary(): Map<string, number> {
    return this.vocabulary;
  }
}
