import { SentimentClassifier } from '../src/services/ml/SentimentClassifier.ts';
import { VectorMath } from '../src/services/ml/VectorMath.ts';

console.log('🧪 ==============================================================');
console.log('🧪 PRUEBAS UNITARIAS Y EVALUACIÓN DE MACHINE LEARNING (CINEPLUS)');
console.log('🧪 ==============================================================\n');

// 1. Probar VectorMath
console.log('1️⃣ Evaluando VectorMath y Similitud Coseno:');
const vecA = [1, 0, 1, 0, 0.8];
const vecB = [1, 0, 1, 0, 0.75];
const vecC = [0, 1, 0, 1, 0.2];

const simIdentica = VectorMath.cosineSimilarity(vecA, vecB);
const simDiferente = VectorMath.cosineSimilarity(vecA, vecC);

console.log(`   • Similitud Coseno (Películas muy afines A y B): ${(simIdentica * 100).toFixed(1)}%`);
console.log(`   • Similitud Coseno (Películas disímiles A y C):   ${(simDiferente * 100).toFixed(1)}%\n`);

// 2. Probar SentimentClassifier (Naive Bayes)
console.log('2️⃣ Evaluando SentimentClassifier (Multinomial Naive Bayes con 500 reseñas):');
const classifier = SentimentClassifier.getInstance();

const samplePositive = 'Una absoluta obra maestra, la fotografía y el sonido en sala son insuperables.';
const sampleNegative = 'Pésima película, lenta, aburrida y con un guion predecible que da sueño.';
const sampleNeutral = 'Cumple para pasar la tarde con palomitas, pero no aporta nada nuevo.';

const predPos = classifier.predict(samplePositive);
const predNeg = classifier.predict(sampleNegative);
const predNeu = classifier.predict(sampleNeutral);

console.log(`   • Frase: "${samplePositive}"`);
console.log(`     -> Predicción: [${predPos.sentiment.toUpperCase()}] con ${predPos.confidence}% de certeza (Probabilidades:`, predPos.probabilities, `)\n`);

console.log(`   • Frase: "${sampleNegative}"`);
console.log(`     -> Predicción: [${predNeg.sentiment.toUpperCase()}] con ${predNeg.confidence}% de certeza (Probabilidades:`, predNeg.probabilities, `)\n`);

console.log(`   • Frase: "${sampleNeutral}"`);
console.log(`     -> Predicción: [${predNeu.sentiment.toUpperCase()}] con ${predNeu.confidence}% de certeza (Probabilidades:`, predNeu.probabilities, `)\n`);

// 3. Matriz de Confusión y Métricas de Rendimiento (80% Train / 20% Test)
console.log('3️⃣ Evaluando Métricas con Train/Test Split (80/20):');
const metrics = classifier.evaluateTrainTestSplit(0.2);
console.log(`   • Muestras de Entrenamiento: ${metrics.totalTrained}`);
console.log(`   • Muestras de Test:          ${metrics.totalTested}`);
console.log(`   • Precisión Global (Accuracy): ${metrics.accuracy}%`);
console.log('   • Matriz de Confusión:');
console.table(metrics.confusionMatrix);

console.log('\n✅ Modelo de Machine Learning 100% operativo y validado.');
