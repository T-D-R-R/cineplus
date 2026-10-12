import { AgentCoordinator } from '../src/services/agents/AgentCoordinator.ts';
import { Movie } from '../src/domain/Movie.ts';

console.log('🤖 ==============================================================');
console.log('🤖 PRUEBA INTEGRAL DEL SISTEMA MULTI-AGENTE (CINEPLUS AI)');
console.log('🤖 ==============================================================\n');

// Simular una película de prueba (Dune 2)
const testMovie = new Movie({
  id: 693134,
  title: 'Dune: Parte Dos',
  overview: 'Sigue el viaje mítico de Paul Atreides en su guerra de venganza...',
  posterPath: '/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
  backdropPath: '/xOMo8BRK7PfcJv9JCnx7s520DRq.jpg',
  voteAverage: 8.2,
  voteCount: 5200,
  releaseDate: '2024-02-27',
  runtime: 166,
  genres: [
    { id: 878, name: 'Ciencia Ficción' },
    { id: 12, name: 'Aventura' }
  ],
  director: 'Denis Villeneuve',
  cast: [
    { id: 1, name: 'Timothée Chalamet', character: 'Paul Atreides', profilePath: null },
    { id: 2, name: 'Zendaya', character: 'Chani', profilePath: null }
  ]
});

async function run() {
  const coordinator = AgentCoordinator.getInstance();
  
  console.log(`🎬 Película seleccionada: "${testMovie.title}"`);
  console.log(`🕒 Iniciando deliberación multi-agente...\n`);

  const result = await coordinator.deliberateMovie(testMovie, (step) => {
    console.log(`   [STATUS]: ${step}`);
  });

  console.log('\n💬 INTERCAMBIO Y DELIBERACIÓN DE LOS AGENTES:');
  console.log('--------------------------------------------------------------');
  for (const msg of result.messages) {
    console.log(`\n${msg.avatar} [${msg.agentTitle}] - ${msg.agentName}:`);
    console.log(`"${msg.content}"`);
    if (msg.metrics) {
      console.log('   📊 Métricas clave:', JSON.stringify(msg.metrics));
    }
  }

  console.log('\n🏆 ==========================================================');
  console.log(`🏆 VEREDICTO FINAL: ${result.verdict.statusLabel} (Score: ${result.verdict.score}/100)`);
  console.log(`🏆 Afinidad de Usuario (ML k-NN): ${result.userAffinityScore}%`);
  console.log(`🏆 Sentimiento Comunidad (ML Naive Bayes): ${result.sentimentStats.positiveRatio}% Positivo (${result.sentimentStats.dominantSentiment})`);
  console.log(`🏆 Valor por dinero: ${result.verdict.valueForMoney}`);
  console.log('🏆 ==========================================================');
}

run();
