import { mlBenchmarkService } from '../src/services/ml/benchmark/MlBenchmarkService.ts';

console.log('🧪 ==============================================================================');
console.log('🧪 BENCHMARK COMPARATIVO DE MACHINE LEARNING: 5 ALGORITMOS DE PREDICCIÓN');
console.log('🧪 ==============================================================================\n');

function runBenchmark() {
  console.log('📊 Ejecutando evaluación comparativa con Train/Test Split (80% / 20%)...');
  const report = mlBenchmarkService.runComprehensiveBenchmark(0.2);

  console.log(`\n📁 Conjunto de Datos: ${report.totalDatasetCount} reseñas balanceadas en español`);
  console.log(`   • Muestras de Entrenamiento: ${report.trainCount}`);
  console.log(`   • Muestras de Prueba (Test): ${report.testCount}`);
  console.log(`   • Distribución de Clases: Positivas: ${report.classDistribution.positivo}, Negativas: ${report.classDistribution.negativo}, Neutrales: ${report.classDistribution.neutral}\n`);

  console.log('📊 TABLA COMPARATIVA DE RENDIMIENTO DE LOS 5 ALGORITMOS:');
  console.log('------------------------------------------------------------------------------------------------------');
  
  const summaryTable = report.models.map((m) => ({
    'Algoritmo': m.modelName,
    'Familia': m.algorithmFamily,
    'Accuracy': `${m.accuracy}%`,
    'Precision': `${m.precision}%`,
    'Recall': `${m.recall}%`,
    'F1-Score': `${m.f1Score}%`,
    'Train (ms)': `${m.trainingTimeMs} ms`,
    'Inferencia': `${m.avgInferenceTimeMs} ms`,
    'Ganador': m.isWinner ? '🏆 GANADOR' : '—',
  }));

  console.table(summaryTable);

  console.log('\n🏆 ==============================================================================');
  console.log(`🏆 MODELO GANADOR: "${report.winner.modelName}"`);
  console.log('🏆 ==============================================================================');
  console.log(report.scientificVerdict);

  // Demostración en Tiempo Real (Predicción simultánea de los 5 algoritmos)
  console.log('\n⚡ ==============================================================================');
  console.log('⚡ PRUEBA DE PREDICCIÓN EN TIEMPO REAL CON LOS 5 ALGORITMOS SIMULTÁNEOS');
  console.log('⚡ ==============================================================================');

  const sampleText = 'Una obra maestra absoluta, la fotografía y el sonido envolvente te atrapan de inicio a fin.';
  console.log(`📝 Texto de entrada: "${sampleText}"\n`);

  const realTimePredictions = mlBenchmarkService.predictRealTime(sampleText);

  for (const [key, pred] of Object.entries(realTimePredictions)) {
    console.log(`   • [${pred.modelName}]:`);
    console.log(`     -> Predicción: [${pred.sentiment.toUpperCase()}] con ${pred.confidence}% certeza (Latencia: ${pred.inferenceTimeMs.toFixed(3)} ms)`);
    console.log(`     -> Probabilidades: { Positivo: ${(pred.probabilities.positivo * 100).toFixed(1)}%, Negativo: ${(pred.probabilities.negativo * 100).toFixed(1)}%, Neutral: ${(pred.probabilities.neutral * 100).toFixed(1)}% }`);
  }

  console.log('\n✅ Evaluación de los 5 algoritmos culminada con éxito.');
}

try {
  runBenchmark();
} catch (err) {
  console.error('❌ Error en benchmark:', err);
  process.exit(1);
}
