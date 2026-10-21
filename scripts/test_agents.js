import { AgentCoordinator } from '../src/services/agents/AgentCoordinator.ts';
import { Movie } from '../src/domain/Movie.ts';

console.log('🤖 ==============================================================');
console.log('🤖 PRUEBA INTEGRAL DEL SISTEMA MULTI-AGENTE (5 AGENTES CINEPLUS)');
console.log('🤖 ==============================================================\n');

// Película de prueba para la deliberación
const testMovie = new Movie({
  id: 693134,
  title: 'Dune: Parte Dos',
  overview: 'Sigue el viaje mítico de Paul Atreides en su guerra de venganza contra los conspiradores que destruyeron a su familia.',
  posterPath: '/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
  backdropPath: '/xOMo8BRK7PfcJv9JCnx7s520DRq.jpg',
  voteAverage: 8.2,
  voteCount: 5200,
  releaseDate: '2024-02-27',
  runtime: 166,
  genres: [
    { id: 878, name: 'Ciencia Ficción' },
    { id: 12, name: 'Aventura' },
  ],
  director: 'Denis Villeneuve',
  cast: [
    { id: 1, name: 'Timothée Chalamet', character: 'Paul Atreides', profilePath: null },
    { id: 2, name: 'Zendaya', character: 'Chani', profilePath: null },
  ],
});

async function run() {
  const coordinator = AgentCoordinator.getInstance();
  
  console.log(`🎬 Película seleccionada: "${testMovie.title}"`);
  console.log(`🕒 Iniciando deliberación secuencial de los 5 agentes...\n`);

  const result = await coordinator.deliberateMovie(testMovie, (step) => {
    console.log(`   [PROGRESO]: ${step}`);
  });

  console.log('\n💬 INTERCAMBIO Y DELIBERACIÓN DE LOS 5 AGENTES:');
  console.log('==============================================================');
  for (const msg of result.messages) {
    console.log(`\n${msg.avatar} [${msg.agentTitle}] - ${msg.agentName} (Rol: ${msg.role}):`);
    console.log(`"${msg.content}"`);
    if (msg.metrics) {
      console.log('   📊 Métricas clave:', JSON.stringify(msg.metrics));
    }
  }

  console.log('\n🛡️ ==========================================================');
  console.log('🛡️ DICTAMEN DE AUDITORÍA Y FACT-CHECKING (Agente 5):');
  console.log(`   • Índice de Confiabilidad: ${result.auditMetrics.consistencyScore}%`);
  console.log(`   • Estado de Control:       ${result.auditMetrics.factCheckStatus}`);
  console.log(`   • Notas Factuales:         ${result.auditMetrics.factualNotes}`);
  console.log(`   • Sesgos Identificados:    ${result.auditMetrics.biasDetected ? 'Sí' : 'No'}`);

  console.log('\n🏆 ==========================================================');
  console.log(`🏆 RESOLUCIÓN DEL ORQUESTADOR: ${result.verdict.statusLabel} (Score: ${result.verdict.score}/100)`);
  console.log(`🏆 Afinidad de Usuario (ML k-NN): ${result.userAffinityScore}%`);
  console.log(`🏆 Sentimiento Comunidad (ML Naive Bayes): ${result.sentimentStats.positiveRatio}% Positivo (${result.sentimentStats.dominantSentiment})`);
  console.log(`🏆 Mejor Horario y Sala: ${result.verdict.bestShowtimeRecommendation}`);
  console.log(`🏆 Relación Calidad-Precio: ${result.verdict.valueForMoney}`);
  console.log('🏆 ==========================================================');
}

run().catch((err) => {
  console.error('❌ Error en deliberación:', err);
  process.exit(1);
});
