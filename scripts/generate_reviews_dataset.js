import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Catálogo de películas con IDs reales de TMDb para el dataset
const MOVIES = [
  { id: 693134, title: 'Dune: Parte Dos', genre: 'Ciencia Ficción' },
  { id: 1022789, title: 'Intensa-Mente 2', genre: 'Animación' },
  { id: 533535, title: 'Deadpool & Wolverine', genre: 'Acción' },
  { id: 438631, title: 'Dune', genre: 'Ciencia Ficción' },
  { id: 933260, title: 'La Sustancia', genre: 'Terror' },
  { id: 872585, title: 'Oppenheimer', genre: 'Drama' },
  { id: 346698, title: 'Barbie', genre: 'Comedia' },
  { id: 569094, title: 'Spider-Man: A través del Spider-Verso', genre: 'Animación' },
  { id: 763215, title: 'Damsel', genre: 'Fantasía' },
  { id: 945961, title: 'Alien: Romulus', genre: 'Terror / Sci-Fi' },
  { id: 889737, title: 'Joker: Folie à Deux', genre: 'Drama / Musical' },
  { id: 558449, title: 'Gladiator II', genre: 'Acción / Épica' },
];

// Nombres de usuarios y ciudades peruanas representativas de CinePlus
const USERS = [
  'Carlos_Mendoza', 'Valeria_Gomez', 'Alejandro_Huanuco', 'Lucia_Rojas', 'Renzo_Cinefilo',
  'Sofia_Perez', 'Diego_Huancayo', 'Camila_Torres', 'Mateo_Vargas', 'Gabriela_Castro',
  'Javier_Morales', 'Paola_Flores', 'Andres_Tacna', 'Mariana_Silva', 'Fernando_Quispe',
  'Daniela_Rios', 'Sebastian_Lima', 'Natalia_Vega', 'Esteban_Cine', 'Patricia_Leon',
  'Gonzalo_Huánuco', 'Claudia_Navarro', 'Alonso_Paredes', 'Jimena_Salazar', 'Bruno_Critico',
  'Lorena_Cruz', 'Rodrigo_Alvarez', 'Adriana_Mamani', 'Hugo_Cardenas', 'Milagros_Ramos'
];

// Plantillas temáticas de comentarios por polaridad
const TEMPLATES_POSITIVOS = [
  'Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.',
  'Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.',
  'El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.',
  'Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.',
  'Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.',
  'Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.',
  'Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.',
  'Personajes complejos con arcos narrativos redondos y muy bien construidos.',
  'Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.',
  'El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.',
  'La química entre los protagonistas es fantástica y eleva cada escena compartida.',
  'Innovadora, fresca y con una propuesta visual que redefine los estándares del género.',
  'La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.',
  'Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.',
  'Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.'
];

const TEMPLATES_NEUTRALES = [
  'Tiene aspectos visuales increíbles pero el ritmo se vuelve algo lento en el segundo acto.',
  'Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.',
  'Buenas actuaciones individuales, aunque el desenlace se sintió algo apresurado.',
  'Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.',
  'Los primeros 40 minutos son brillantes, luego la trama pierde algo de fuerza y cohesión.',
  'Tiene momentos muy divertidos e ingeniosos mezclados con escenas que se alargan demasiado.',
  'Visualmente es un espectáculo, aunque el guion peca de predecible en varios puntos clave.',
  'Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.',
  'La fotografía es excelente pero no logré conectar del todo con la motivación de los personajes.',
  'Una película correcta con altibajos notables, buena para un fin de semana tranquilo.',
  'Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.',
  'La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.'
];

const TEMPLATES_NEGATIVOS = [
  'Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.',
  'Demasiado larga para lo poco que cuenta. El desarrollo se siente tedioso y pesado.',
  'Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.',
  'Prometía mucho en los avances pero el resultado final fue aburrido y predecible.',
  'Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.',
  'El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.',
  'Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.',
  'Final apresurado y decepcionante que arruina cualquier intento previo de construir suspenso.',
  'No conecta en ningún nivel emocional. La sensación al salir de la sala fue de indiferencia total.',
  'Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.',
  'El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.',
  'Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.',
  'Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.',
  'Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.',
  'Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.'
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Escape estricto para estándar CSV RFC 4180
function escapeCsv(field) {
  if (field === null || field === undefined) return '';
  const str = String(field);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function generateReviewsDataset(total = 500) {
  const reviews = [];
  
  // Distribución balanceada para Machine Learning:
  // ~45% Positivo (225), ~25% Neutral (125), ~30% Negativo (150)
  const countPositive = Math.round(total * 0.45);
  const countNeutral = Math.round(total * 0.25);
  const countNegative = total - countPositive - countNeutral;

  const distributions = [
    { sentiment: 'positivo', count: countPositive, minRating: 4, maxRating: 5, templates: TEMPLATES_POSITIVOS },
    { sentiment: 'neutral', count: countNeutral, minRating: 3, maxRating: 3, templates: TEMPLATES_NEUTRALES },
    { sentiment: 'negativo', count: countNegative, minRating: 1, maxRating: 2, templates: TEMPLATES_NEGATIVOS },
  ];

  let idCounter = 1;

  for (const group of distributions) {
    for (let i = 0; i < group.count; i++) {
      const movie = getRandomItem(MOVIES);
      const user = `${getRandomItem(USERS)}_${getRandomInt(10, 99)}`;
      const template = getRandomItem(group.templates);
      const rating = getRandomInt(group.minRating, group.maxRating);

      // Variación sintética leve para que los textos sean únicos
      const prefixes = [
        '',
        'En mi opinión, ',
        'Sinceramente, ',
        'La vi este fin de semana: ',
        'Acabo de salir de verla: ',
        'Mi veredicto: ',
        'Crítica personal: '
      ];
      const comment = `${getRandomItem(prefixes)}${template}`;

      reviews.push({
        id: idCounter++,
        tmdb_movie_id: movie.id,
        titulo_pelicula: movie.title,
        nombre_usuario: user,
        comentario: comment,
        puntaje: rating,
        sentimiento: group.sentiment
      });
    }
  }

  // Mezclar aleatoriamente el dataset (Fisher-Yates Shuffle) para no sesgar el entrenamiento
  for (let i = reviews.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [reviews[i], reviews[j]] = [reviews[j], reviews[i]];
  }

  return reviews;
}

function main() {
  const TOTAL = 500;
  console.log(`🚀 Generando dataset sintético de ${TOTAL} reseñas para Machine Learning y Supabase...`);
  
  const dataset = generateReviewsDataset(TOTAL);

  // Columnas exactas que coinciden con Supabase:
  // tmdb_movie_id,titulo_pelicula,nombre_usuario,comentario,puntaje,sentimiento
  const headers = ['tmdb_movie_id', 'titulo_pelicula', 'nombre_usuario', 'comentario', 'puntaje', 'sentimiento'];
  
  const csvRows = [headers.join(',')];
  for (const r of dataset) {
    const row = [
      escapeCsv(r.tmdb_movie_id),
      escapeCsv(r.titulo_pelicula),
      escapeCsv(r.nombre_usuario),
      escapeCsv(r.comentario),
      escapeCsv(r.puntaje),
      escapeCsv(r.sentimiento),
    ];
    csvRows.push(row.join(','));
  }

  const outputCsvPath = path.resolve(__dirname, '..', 'dataset_resenas_500.csv');
  fs.writeFileSync(outputCsvPath, csvRows.join('\n'), 'utf-8');

  // Guardar también como TypeScript tipado para que el modelo de ML en frontend/backend lo consuma directamente
  const outputDataDir = path.resolve(__dirname, '..', 'src', 'services', 'ml', 'data');
  if (!fs.existsSync(outputDataDir)) {
    fs.mkdirSync(outputDataDir, { recursive: true });
  }

  const tsContent = `/**
 * CinePlus - Dataset de Entrenamiento de 500 Reseñas
 * Generado automáticamente por scripts/generate_reviews_dataset.js
 */

export interface TrainingReview {
  id: number;
  tmdb_movie_id: number;
  titulo_pelicula: string;
  nombre_usuario: string;
  comentario: string;
  puntaje: number;
  sentimiento: 'positivo' | 'negativo' | 'neutral';
}

export const REVIEWS_DATASET: TrainingReview[] = ${JSON.stringify(dataset, null, 2)};
`;

  const outputTsPath = path.resolve(outputDataDir, 'reviewsDataset.ts');
  fs.writeFileSync(outputTsPath, tsContent, 'utf-8');

  console.log(`✅ CSV generado exitosamente en: ${outputCsvPath}`);
  console.log(`✅ Módulo TypeScript generado en: ${outputTsPath}`);
  console.log(`📊 Total de filas: ${dataset.length}`);
  
  // Resumen de distribución
  const counts = dataset.reduce((acc, r) => {
    acc[r.sentimiento] = (acc[r.sentimiento] || 0) + 1;
    return acc;
  }, {});
  console.log('📈 Distribución por sentimiento:', counts);
}

main();
