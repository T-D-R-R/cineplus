import { mlBenchmarkService } from '../src/services/ml/benchmark/MlBenchmarkService.ts';

console.log('🧪 ==============================================================================');
console.log('🧪 TEST AUTOMATIZADO: EVALUACIÓN DE MACHINE LEARNING POR PELÍCULA ESPECÍFICA');
console.log('🧪 ==============================================================================\n');

// 1. Probar con una película conocida (Dune: Parte Dos / 693134)
const movieId = 693134;
const movieTitle = 'Dune: Parte Dos';

console.log(`🎬 1. Evaluando "${movieTitle}" (ID: ${movieId}) con dataset base...`);
const result1 = mlBenchmarkService.evaluateMovieDataset(movieId, movieTitle, []);

console.log(`   • Reseñas totales evaluadas: ${result1.totalReviews}`);
console.log(`   • Tasa de Aceptación Favorable: ${result1.acceptanceRate}%`);
console.log(`   • Distribución: Positivas: ${result1.sentimentBreakdown.positive} (${result1.sentimentBreakdown.positivePct}%), Neutrales: ${result1.sentimentBreakdown.neutral} (${result1.sentimentBreakdown.neutralPct}%), Negativas: ${result1.sentimentBreakdown.negative} (${result1.sentimentBreakdown.negativePct}%)`);
console.log(`   • 🏆 Algoritmo Campeón: "${result1.championModel.modelName}" (F1-Score: ${result1.championModel.f1Score}%, Latencia: ${result1.championModel.avgInferenceTimeMs} ms)`);
console.log(`   • Justificación científica: ${result1.scientificExplanation}\n`);

// 2. Simular inyección de 15 reseñas destructivas para ver el cambio de algoritmo y delta de aceptación
console.log('📉 2. Inyectando 15 reseñas sumamente destructivas...');
const negativeInjection = Array.from({ length: 15 }, (_, i) => ({
  id: 70000 + i,
  userName: `Critico_Negativo_${i}`,
  comment: 'Pésima película, aburrida, lenta, con un guion predecible que da sueño.',
  rating: 1,
  sentiment: 'negativo',
}));

const result2 = mlBenchmarkService.evaluateMovieDataset(movieId, movieTitle, negativeInjection);
const delta = (result2.acceptanceRate - result1.acceptanceRate).toFixed(1);

console.log(`   • Nuevas reseñas totales: ${result2.totalReviews}`);
console.log(`   • Nueva Aceptación: ${result2.acceptanceRate}% (Delta: ${delta}%)`);
console.log(`   • Nuevo Modelo Campeón: "${result2.championModel.modelName}" (Accuracy: ${result2.championModel.accuracy}%, F1: ${result2.championModel.f1Score}%)`);
console.log(`   • Desglose: Positivas: ${result2.sentimentBreakdown.positivePct}%, Neutrales: ${result2.sentimentBreakdown.neutralPct}%, Negativas: ${result2.sentimentBreakdown.negativePct}%`);

// 3. Simular inyección de 20 reseñas técnicas variadas para ver el comportamiento
console.log('\n📈 3. Inyectando 20 reseñas técnicas complejas...');
const complexInjection = Array.from({ length: 20 }, (_, i) => ({
  id: 80000 + i,
  userName: `Especialista_Audio_${i}`,
  comment: 'Los matices sonoros y la fotografía en claroscuro demuestran una técnica impecable aunque la trama resulta algo densa.',
  rating: 4,
  sentiment: 'positivo',
}));

const result3 = mlBenchmarkService.evaluateMovieDataset(movieId, movieTitle, [...negativeInjection, ...complexInjection]);
console.log(`   • Reseñas totales: ${result3.totalReviews}`);
console.log(`   • Aceptación recalculada: ${result3.acceptanceRate}%`);
console.log(`   • Algoritmo Campeón: "${result3.championModel.modelName}" (F1: ${result3.championModel.f1Score}%)`);

console.log('\n✅ Prueba de evaluación AutoML por película ejecutada exitosamente.');
