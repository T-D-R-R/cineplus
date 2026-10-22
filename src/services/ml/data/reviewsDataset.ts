/**
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

export const REVIEWS_DATASET: TrainingReview[] = [
  {
    "id": 188,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Alejandro_Huanuco_90",
    "comentario": "Mi veredicto: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 125,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Mateo_Vargas_42",
    "comentario": "Sinceramente, Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 463,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Valeria_Gomez_88",
    "comentario": "Mi veredicto: Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 351,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Lorena_Cruz_45",
    "comentario": "Crítica personal: Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 349,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Daniela_Rios_81",
    "comentario": "En mi opinión, Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 332,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Adriana_Mamani_71",
    "comentario": "Acabo de salir de verla: Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 116,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Gonzalo_Huánuco_71",
    "comentario": "Sinceramente, Excelente película, una producción impecable y una dirección que cautiva de principio a fin.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 95,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Camila_Torres_14",
    "comentario": "La vi este fin de semana: Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 376,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Carlos_Mendoza_64",
    "comentario": "Demasiado larga para lo poco que cuenta. El desarrollo se siente tedioso y pesado.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 132,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Mariana_Silva_32",
    "comentario": "Sinceramente, Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 496,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Patricia_Leon_56",
    "comentario": "Crítica personal: El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 73,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Mariana_Silva_18",
    "comentario": "Crítica personal: Película excelente, con muy buena dirección, actuaciones memorables y me gustó muchísimo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 40,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Mariana_Silva_26",
    "comentario": "El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 341,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Gonzalo_Huánuco_36",
    "comentario": "Visualmente cumple, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 178,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Bruno_Critico_55",
    "comentario": "La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 363,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Mariana_Silva_34",
    "comentario": "La vi este fin de semana: Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 429,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Mariana_Silva_39",
    "comentario": "En mi opinión, Demasiado larga para lo poco que cuenta. El desarrollo se siente tedioso y pesado.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 297,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Andres_Tacna_57",
    "comentario": "En mi opinión, Visualmente cumple, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 448,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Mariana_Silva_90",
    "comentario": "Mi veredicto: Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 439,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Valeria_Gomez_18",
    "comentario": "Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 267,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Paola_Flores_22",
    "comentario": "Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 64,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Carlos_Mendoza_96",
    "comentario": "Crítica personal: Me gustó bastante, una experiencia divertida, emocionante y con excelente ritmo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 345,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Mateo_Vargas_64",
    "comentario": "La vi este fin de semana: Visualmente cumple, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 130,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Paola_Flores_54",
    "comentario": "Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 470,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Jimena_Salazar_51",
    "comentario": "Crítica personal: Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 141,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Alejandro_Huanuco_28",
    "comentario": "En mi opinión, Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 143,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Gonzalo_Huánuco_49",
    "comentario": "Crítica personal: El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 330,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Bruno_Critico_46",
    "comentario": "La vi este fin de semana: Tiene momentos divertidos mezclados con escenas que se alargan demasiado sin necesidad.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 220,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Adriana_Mamani_39",
    "comentario": "Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 357,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Lorena_Cruz_49",
    "comentario": "Mi veredicto: Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 104,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Renzo_Cinefilo_15",
    "comentario": "La vi este fin de semana: El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 227,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Mariana_Silva_16",
    "comentario": "En mi opinión, Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 189,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Alejandro_Huanuco_96",
    "comentario": "Crítica personal: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 167,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Carlos_Mendoza_50",
    "comentario": "Una muy buena película, sumamente recomendada para todos los amantes del buen cine.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 299,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Paola_Flores_13",
    "comentario": "La vi este fin de semana: Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 434,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Andres_Tacna_20",
    "comentario": "Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 180,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Gonzalo_Huánuco_53",
    "comentario": "En mi opinión, Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 102,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Gabriela_Castro_30",
    "comentario": "Crítica personal: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 91,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Mateo_Vargas_72",
    "comentario": "Crítica personal: El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 197,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Lucia_Rojas_11",
    "comentario": "Acabo de salir de verla: Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 242,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Alonso_Paredes_40",
    "comentario": "La vi este fin de semana: Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 386,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Bruno_Critico_86",
    "comentario": "Sinceramente, Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 101,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Mariana_Silva_48",
    "comentario": "Mi veredicto: La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 120,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Hugo_Cardenas_24",
    "comentario": "Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 370,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Alonso_Paredes_77",
    "comentario": "Acabo de salir de verla: El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 289,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Javier_Morales_92",
    "comentario": "Acabo de salir de verla: Actuaciones aceptables, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 385,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Andres_Tacna_13",
    "comentario": "En mi opinión, Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 107,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Gabriela_Castro_63",
    "comentario": "Crítica personal: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 382,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Mariana_Silva_24",
    "comentario": "En mi opinión, Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 445,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Gabriela_Castro_39",
    "comentario": "Mi veredicto: Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 224,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Sofia_Perez_16",
    "comentario": "Sinceramente, La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 15,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Camila_Torres_75",
    "comentario": "Mi veredicto: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 185,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Mateo_Vargas_29",
    "comentario": "En mi opinión, Excelente película, una producción impecable y una dirección que cautiva de principio a fin.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 80,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Diego_Huancayo_29",
    "comentario": "En mi opinión, El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 449,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Renzo_Cinefilo_62",
    "comentario": "Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 215,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Camila_Torres_40",
    "comentario": "Mi veredicto: Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 236,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Rodrigo_Alvarez_52",
    "comentario": "Mi veredicto: La cinematografía es aceptable pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 194,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Sebastian_Lima_57",
    "comentario": "Mi veredicto: La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 244,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Andres_Tacna_93",
    "comentario": "Crítica personal: Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 406,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Renzo_Cinefilo_46",
    "comentario": "Mi veredicto: Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 252,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Lucia_Rojas_18",
    "comentario": "Mi veredicto: La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 485,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Bruno_Critico_60",
    "comentario": "En mi opinión, No conecta en ningún nivel emocional. La sensación al salir de la sala fue de indiferencia total.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 270,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Lorena_Cruz_33",
    "comentario": "La vi este fin de semana: La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 72,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Bruno_Critico_60",
    "comentario": "Mi veredicto: El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 411,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Mateo_Vargas_99",
    "comentario": "Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 174,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Daniela_Rios_33",
    "comentario": "Acabo de salir de verla: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 391,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Mariana_Silva_58",
    "comentario": "En mi opinión, Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 371,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Mariana_Silva_92",
    "comentario": "Acabo de salir de verla: No conecta en ningún nivel emocional. La sensación al salir de la sala fue de indiferencia total.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 465,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Lucia_Rojas_47",
    "comentario": "Sinceramente, Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 374,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Alonso_Paredes_35",
    "comentario": "La vi este fin de semana: Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 247,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Hugo_Cardenas_97",
    "comentario": "Acabo de salir de verla: Los primeros 40 minutos son interesantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 421,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Alejandro_Huanuco_50",
    "comentario": "La vi este fin de semana: Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 387,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Gabriela_Castro_30",
    "comentario": "Crítica personal: Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 24,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Paola_Flores_22",
    "comentario": "La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 87,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Bruno_Critico_68",
    "comentario": "En mi opinión, Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 84,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Mateo_Vargas_86",
    "comentario": "Sinceramente, El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 367,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Adriana_Mamani_72",
    "comentario": "Sinceramente, Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 199,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Javier_Morales_24",
    "comentario": "Sinceramente, Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 140,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Natalia_Vega_45",
    "comentario": "Mi veredicto: Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 413,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Alejandro_Huanuco_68",
    "comentario": "En mi opinión, Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 48,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Carlos_Mendoza_35",
    "comentario": "En mi opinión, Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 464,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Mateo_Vargas_49",
    "comentario": "Crítica personal: Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 65,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Javier_Morales_22",
    "comentario": "Sinceramente, Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 210,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Daniela_Rios_76",
    "comentario": "Sinceramente, Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 144,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Sebastian_Lima_85",
    "comentario": "Mi veredicto: El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 295,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Esteban_Cine_71",
    "comentario": "Sinceramente, Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 146,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Carlos_Mendoza_67",
    "comentario": "Excelente película, una producción impecable y una dirección que cautiva de principio a fin.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 265,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Alonso_Paredes_33",
    "comentario": "Sinceramente, Actuaciones aceptables, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 36,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Gabriela_Castro_27",
    "comentario": "Sinceramente, Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 14,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Mateo_Vargas_23",
    "comentario": "La vi este fin de semana: La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 473,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Paola_Flores_75",
    "comentario": "Crítica personal: El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 353,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Fernando_Quispe_75",
    "comentario": "Mi veredicto: Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 453,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Claudia_Navarro_72",
    "comentario": "Acabo de salir de verla: Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 326,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Carlos_Mendoza_33",
    "comentario": "Mi veredicto: La cinematografía es aceptable pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 61,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Paola_Flores_22",
    "comentario": "Acabo de salir de verla: Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 190,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Alejandro_Huanuco_67",
    "comentario": "Una muy buena película, sumamente recomendada para todos los amantes del buen cine.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 159,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Hugo_Cardenas_88",
    "comentario": "Película excelente, con muy buena dirección, actuaciones memorables y me gustó muchísimo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 94,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Hugo_Cardenas_94",
    "comentario": "La vi este fin de semana: El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 290,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Sebastian_Lima_67",
    "comentario": "En mi opinión, Tiene momentos divertidos mezclados con escenas que se alargan demasiado sin necesidad.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 361,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Esteban_Cine_44",
    "comentario": "La vi este fin de semana: Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 493,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Paola_Flores_55",
    "comentario": "Acabo de salir de verla: El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 340,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Rodrigo_Alvarez_73",
    "comentario": "Mi veredicto: La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 404,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Alonso_Paredes_53",
    "comentario": "Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 254,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Daniela_Rios_55",
    "comentario": "Acabo de salir de verla: Tiene aspectos visuales interesantes pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 206,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Paola_Flores_58",
    "comentario": "Mi veredicto: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 444,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Sebastian_Lima_47",
    "comentario": "La vi este fin de semana: El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 335,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Lucia_Rojas_46",
    "comentario": "Sinceramente, Actuaciones aceptables, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 237,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Camila_Torres_85",
    "comentario": "Crítica personal: Actuaciones aceptables, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 348,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Carlos_Mendoza_90",
    "comentario": "Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 398,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Fernando_Quispe_84",
    "comentario": "Acabo de salir de verla: Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 418,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Jimena_Salazar_41",
    "comentario": "Sinceramente, Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 498,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Andres_Tacna_64",
    "comentario": "Crítica personal: Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 142,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Valeria_Gomez_44",
    "comentario": "Mi veredicto: Una muy buena película, sumamente recomendada para todos los amantes del buen cine.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 322,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Sebastian_Lima_13",
    "comentario": "Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 233,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Valeria_Gomez_30",
    "comentario": "Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 45,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Daniela_Rios_98",
    "comentario": "Mi veredicto: Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 175,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Daniela_Rios_23",
    "comentario": "Sinceramente, La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 257,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Valeria_Gomez_18",
    "comentario": "En mi opinión, Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 294,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Mateo_Vargas_91",
    "comentario": "Mi veredicto: Tiene aspectos visuales interesantes pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 497,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Carlos_Mendoza_26",
    "comentario": "Mi veredicto: Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 456,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Gabriela_Castro_59",
    "comentario": "Crítica personal: Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 480,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Alejandro_Huanuco_54",
    "comentario": "Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 251,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Rodrigo_Alvarez_72",
    "comentario": "Crítica personal: La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 402,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Fernando_Quispe_90",
    "comentario": "La vi este fin de semana: Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 460,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Sofia_Perez_23",
    "comentario": "Acabo de salir de verla: Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 28,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Bruno_Critico_92",
    "comentario": "Acabo de salir de verla: Me gustó bastante, una experiencia divertida, emocionante y con excelente ritmo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 343,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Gonzalo_Huánuco_92",
    "comentario": "Crítica personal: Los primeros 40 minutos son interesantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 22,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Andres_Tacna_73",
    "comentario": "Mi veredicto: Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 18,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Camila_Torres_18",
    "comentario": "Mi veredicto: La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 191,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Mariana_Silva_61",
    "comentario": "En mi opinión, El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 54,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Adriana_Mamani_16",
    "comentario": "En mi opinión, La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 96,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Hugo_Cardenas_93",
    "comentario": "Mi veredicto: Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 467,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Milagros_Ramos_35",
    "comentario": "La vi este fin de semana: El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 34,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Camila_Torres_96",
    "comentario": "Mi veredicto: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 153,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Valeria_Gomez_15",
    "comentario": "La vi este fin de semana: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 131,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Mariana_Silva_67",
    "comentario": "Mi veredicto: Película excelente, con muy buena dirección, actuaciones memorables y me gustó muchísimo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 127,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Daniela_Rios_55",
    "comentario": "Crítica personal: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 119,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Gabriela_Castro_34",
    "comentario": "Acabo de salir de verla: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 333,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Esteban_Cine_24",
    "comentario": "Mi veredicto: Los primeros 40 minutos son interesantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 477,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Carlos_Mendoza_66",
    "comentario": "Sinceramente, Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 60,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Gabriela_Castro_55",
    "comentario": "Mi veredicto: Excelente historia y muy buenas actuaciones, de lo mejor que se ha estrenado en el año.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 56,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Paola_Flores_31",
    "comentario": "En mi opinión, Película excelente, con muy buena dirección, actuaciones memorables y me gustó muchísimo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 274,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Claudia_Navarro_31",
    "comentario": "Sinceramente, Los primeros 40 minutos son interesantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 359,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Lucia_Rojas_94",
    "comentario": "En mi opinión, Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 150,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Andres_Tacna_47",
    "comentario": "La vi este fin de semana: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 138,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Alonso_Paredes_17",
    "comentario": "Crítica personal: La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 324,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Renzo_Cinefilo_95",
    "comentario": "La vi este fin de semana: La cinematografía es aceptable pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 320,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Alonso_Paredes_70",
    "comentario": "Sinceramente, Actuaciones aceptables, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 26,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Jimena_Salazar_54",
    "comentario": "Acabo de salir de verla: Excelente película, una producción impecable y una dirección que cautiva de principio a fin.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 441,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Esteban_Cine_69",
    "comentario": "Acabo de salir de verla: Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 500,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Fernando_Quispe_36",
    "comentario": "La vi este fin de semana: Demasiado larga para lo poco que cuenta. El desarrollo se siente tedioso y pesado.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 248,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Milagros_Ramos_56",
    "comentario": "Mi veredicto: Los primeros 40 minutos son interesantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 384,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Hugo_Cardenas_48",
    "comentario": "Mi veredicto: Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 339,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Javier_Morales_82",
    "comentario": "Sinceramente, Los primeros 40 minutos son interesantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 211,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Lorena_Cruz_77",
    "comentario": "La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 389,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Milagros_Ramos_19",
    "comentario": "Acabo de salir de verla: Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 2,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Andres_Tacna_25",
    "comentario": "En mi opinión, Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 29,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Sebastian_Lima_55",
    "comentario": "La vi este fin de semana: Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 201,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Sebastian_Lima_77",
    "comentario": "Acabo de salir de verla: Una muy buena película, sumamente recomendada para todos los amantes del buen cine.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 221,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Bruno_Critico_18",
    "comentario": "Película excelente, con muy buena dirección, actuaciones memorables y me gustó muchísimo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 481,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Hugo_Cardenas_55",
    "comentario": "La vi este fin de semana: El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 478,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Sofia_Perez_17",
    "comentario": "Crítica personal: Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 163,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Sebastian_Lima_25",
    "comentario": "La vi este fin de semana: Una muy buena película, sumamente recomendada para todos los amantes del buen cine.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 207,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Milagros_Ramos_13",
    "comentario": "Crítica personal: Me gustó bastante, una experiencia divertida, emocionante y con excelente ritmo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 177,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Daniela_Rios_65",
    "comentario": "La vi este fin de semana: Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 452,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Gabriela_Castro_79",
    "comentario": "Crítica personal: El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 328,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Gonzalo_Huánuco_83",
    "comentario": "Mi veredicto: La cinematografía es aceptable pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 344,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Adriana_Mamani_73",
    "comentario": "Sinceramente, Tiene aspectos visuales interesantes pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 124,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Bruno_Critico_27",
    "comentario": "En mi opinión, La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 66,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Alonso_Paredes_68",
    "comentario": "En mi opinión, Excelente historia y muy buenas actuaciones, de lo mejor que se ha estrenado en el año.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 57,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Diego_Huancayo_55",
    "comentario": "En mi opinión, Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 19,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Alonso_Paredes_91",
    "comentario": "Crítica personal: Excelente película, una producción impecable y una dirección que cautiva de principio a fin.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 223,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Adriana_Mamani_52",
    "comentario": "Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 10,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Renzo_Cinefilo_55",
    "comentario": "Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 218,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Sebastian_Lima_67",
    "comentario": "En mi opinión, Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 35,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Mateo_Vargas_71",
    "comentario": "Crítica personal: La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 93,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Gabriela_Castro_22",
    "comentario": "Crítica personal: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 161,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Diego_Huancayo_31",
    "comentario": "En mi opinión, Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 327,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Gabriela_Castro_94",
    "comentario": "Acabo de salir de verla: Actuaciones aceptables, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 323,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Esteban_Cine_87",
    "comentario": "La vi este fin de semana: Actuaciones aceptables, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 239,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Sebastian_Lima_78",
    "comentario": "Mi veredicto: Actuaciones aceptables, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 373,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Hugo_Cardenas_74",
    "comentario": "Sinceramente, Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 148,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Camila_Torres_93",
    "comentario": "Crítica personal: La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 471,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Andres_Tacna_38",
    "comentario": "En mi opinión, Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 171,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Bruno_Critico_68",
    "comentario": "Acabo de salir de verla: La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 392,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Gabriela_Castro_14",
    "comentario": "Mi veredicto: Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 438,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Gabriela_Castro_81",
    "comentario": "Acabo de salir de verla: Demasiado larga para lo poco que cuenta. El desarrollo se siente tedioso y pesado.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 479,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Gonzalo_Huánuco_38",
    "comentario": "Sinceramente, Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 492,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Patricia_Leon_67",
    "comentario": "En mi opinión, Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 292,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Gabriela_Castro_36",
    "comentario": "Crítica personal: Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 281,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Milagros_Ramos_38",
    "comentario": "Acabo de salir de verla: Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 20,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Alejandro_Huanuco_51",
    "comentario": "Acabo de salir de verla: Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 85,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Adriana_Mamani_23",
    "comentario": "En mi opinión, Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 162,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Gonzalo_Huánuco_75",
    "comentario": "Acabo de salir de verla: Excelente película, una producción impecable y una dirección que cautiva de principio a fin.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 427,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Paola_Flores_30",
    "comentario": "Acabo de salir de verla: Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 483,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Gonzalo_Huánuco_47",
    "comentario": "Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 47,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Sebastian_Lima_26",
    "comentario": "Sinceramente, Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 302,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Bruno_Critico_42",
    "comentario": "Sinceramente, Tiene momentos divertidos mezclados con escenas que se alargan demasiado sin necesidad.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 277,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Lorena_Cruz_90",
    "comentario": "La vi este fin de semana: La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 126,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Esteban_Cine_19",
    "comentario": "Mi veredicto: El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 68,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Gabriela_Castro_71",
    "comentario": "Mi veredicto: Excelente película, una producción impecable y una dirección que cautiva de principio a fin.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 12,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Paola_Flores_45",
    "comentario": "La vi este fin de semana: Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 156,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Lucia_Rojas_39",
    "comentario": "En mi opinión, Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 475,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Renzo_Cinefilo_59",
    "comentario": "Crítica personal: No conecta en ningún nivel emocional. La sensación al salir de la sala fue de indiferencia total.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 195,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Gonzalo_Huánuco_62",
    "comentario": "Mi veredicto: La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 226,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Jimena_Salazar_28",
    "comentario": "Tiene aspectos visuales interesantes pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 7,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Javier_Morales_30",
    "comentario": "Sinceramente, Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 338,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Hugo_Cardenas_55",
    "comentario": "En mi opinión, Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 337,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Renzo_Cinefilo_87",
    "comentario": "Crítica personal: Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 205,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Milagros_Ramos_13",
    "comentario": "La vi este fin de semana: El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 181,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Sofia_Perez_17",
    "comentario": "En mi opinión, Una muy buena película, sumamente recomendada para todos los amantes del buen cine.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 115,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Mariana_Silva_27",
    "comentario": "Mi veredicto: El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 369,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Mariana_Silva_32",
    "comentario": "En mi opinión, No conecta en ningún nivel emocional. La sensación al salir de la sala fue de indiferencia total.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 58,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Andres_Tacna_94",
    "comentario": "Sinceramente, Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 414,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Adriana_Mamani_85",
    "comentario": "Mi veredicto: Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 260,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Claudia_Navarro_26",
    "comentario": "La vi este fin de semana: Tiene aspectos visuales interesantes pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 246,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Esteban_Cine_36",
    "comentario": "Mi veredicto: Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 356,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Gabriela_Castro_22",
    "comentario": "Sinceramente, Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 380,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Alonso_Paredes_86",
    "comentario": "Sinceramente, Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 173,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Natalia_Vega_29",
    "comentario": "Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 25,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Alejandro_Huanuco_60",
    "comentario": "En mi opinión, Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 377,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Lorena_Cruz_63",
    "comentario": "Sinceramente, El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 184,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Valeria_Gomez_14",
    "comentario": "En mi opinión, Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 280,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Sebastian_Lima_51",
    "comentario": "Crítica personal: Actuaciones aceptables, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 77,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Fernando_Quispe_27",
    "comentario": "La vi este fin de semana: Excelente película, una producción impecable y una dirección que cautiva de principio a fin.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 399,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Esteban_Cine_57",
    "comentario": "El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 437,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Bruno_Critico_46",
    "comentario": "La vi este fin de semana: Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 117,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Gonzalo_Huánuco_61",
    "comentario": "En mi opinión, Me gustó bastante, una experiencia divertida, emocionante y con excelente ritmo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 412,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Valeria_Gomez_56",
    "comentario": "La vi este fin de semana: Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 250,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Lorena_Cruz_75",
    "comentario": "En mi opinión, Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 113,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Paola_Flores_10",
    "comentario": "Acabo de salir de verla: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 368,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Sofia_Perez_31",
    "comentario": "Mi veredicto: Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 46,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Mateo_Vargas_94",
    "comentario": "Sinceramente, Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 276,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Alonso_Paredes_60",
    "comentario": "Mi veredicto: Tiene aspectos visuales interesantes pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 13,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Javier_Morales_82",
    "comentario": "La vi este fin de semana: Película excelente, con muy buena dirección, actuaciones memorables y me gustó muchísimo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 76,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Hugo_Cardenas_83",
    "comentario": "La vi este fin de semana: Me gustó bastante, una experiencia divertida, emocionante y con excelente ritmo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 17,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Renzo_Cinefilo_62",
    "comentario": "Acabo de salir de verla: Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 27,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Jimena_Salazar_43",
    "comentario": "La vi este fin de semana: Me gustó bastante, una experiencia divertida, emocionante y con excelente ritmo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 279,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Camila_Torres_75",
    "comentario": "La vi este fin de semana: La cinematografía es aceptable pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 484,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Natalia_Vega_87",
    "comentario": "Crítica personal: Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 193,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Natalia_Vega_12",
    "comentario": "Sinceramente, Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 136,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Andres_Tacna_53",
    "comentario": "Crítica personal: Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 440,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Sofia_Perez_10",
    "comentario": "En mi opinión, Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 43,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Lucia_Rojas_88",
    "comentario": "Sinceramente, La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 229,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Andres_Tacna_47",
    "comentario": "Acabo de salir de verla: Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 134,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Bruno_Critico_18",
    "comentario": "Mi veredicto: Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 362,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Sofia_Perez_79",
    "comentario": "Mi veredicto: Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 44,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Esteban_Cine_11",
    "comentario": "La vi este fin de semana: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 231,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Diego_Huancayo_79",
    "comentario": "En mi opinión, Visualmente cumple, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 51,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Camila_Torres_80",
    "comentario": "Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 23,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Patricia_Leon_83",
    "comentario": "Acabo de salir de verla: Excelente historia y muy buenas actuaciones, de lo mejor que se ha estrenado en el año.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 286,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Adriana_Mamani_98",
    "comentario": "Sinceramente, La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 42,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Sofia_Perez_71",
    "comentario": "En mi opinión, Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 240,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Natalia_Vega_56",
    "comentario": "Mi veredicto: Actuaciones aceptables, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 78,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Bruno_Critico_72",
    "comentario": "Crítica personal: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 62,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Gabriela_Castro_99",
    "comentario": "Sinceramente, Película excelente, con muy buena dirección, actuaciones memorables y me gustó muchísimo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 5,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Renzo_Cinefilo_85",
    "comentario": "En mi opinión, Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 214,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Javier_Morales_48",
    "comentario": "En mi opinión, La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 37,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Rodrigo_Alvarez_93",
    "comentario": "Mi veredicto: Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 6,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Alejandro_Huanuco_60",
    "comentario": "La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 447,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Fernando_Quispe_29",
    "comentario": "Mi veredicto: Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 416,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Hugo_Cardenas_34",
    "comentario": "Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 11,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Mateo_Vargas_65",
    "comentario": "Mi veredicto: Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 228,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Hugo_Cardenas_37",
    "comentario": "La vi este fin de semana: Tiene aspectos visuales interesantes pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 272,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Mariana_Silva_63",
    "comentario": "La vi este fin de semana: Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 317,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Gabriela_Castro_47",
    "comentario": "Sinceramente, Visualmente cumple, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 347,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Rodrigo_Alvarez_73",
    "comentario": "Sinceramente, Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 430,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Carlos_Mendoza_71",
    "comentario": "Crítica personal: Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 468,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Jimena_Salazar_40",
    "comentario": "Crítica personal: Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 472,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Gonzalo_Huánuco_26",
    "comentario": "Sinceramente, Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 459,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Daniela_Rios_49",
    "comentario": "En mi opinión, Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 428,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Andres_Tacna_56",
    "comentario": "Acabo de salir de verla: Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 49,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Hugo_Cardenas_94",
    "comentario": "Crítica personal: Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 30,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Javier_Morales_57",
    "comentario": "Acabo de salir de verla: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 476,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Adriana_Mamani_17",
    "comentario": "Mi veredicto: El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 462,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Lucia_Rojas_45",
    "comentario": "Mi veredicto: Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 426,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Alejandro_Huanuco_66",
    "comentario": "En mi opinión, Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 253,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Camila_Torres_33",
    "comentario": "La vi este fin de semana: La cinematografía es aceptable pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 245,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Paola_Flores_36",
    "comentario": "Acabo de salir de verla: Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 105,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Natalia_Vega_53",
    "comentario": "En mi opinión, El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 435,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Daniela_Rios_38",
    "comentario": "Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 354,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Lucia_Rojas_49",
    "comentario": "Sinceramente, Final apresurado y decepcionante que arruina cualquier intento previo de construir suspenso.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 203,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Gabriela_Castro_11",
    "comentario": "Crítica personal: La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 137,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Andres_Tacna_58",
    "comentario": "Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 482,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Sebastian_Lima_71",
    "comentario": "En mi opinión, Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 451,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Lorena_Cruz_65",
    "comentario": "Crítica personal: El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 310,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Sofia_Perez_24",
    "comentario": "Sinceramente, Tiene aspectos visuales interesantes pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 487,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Andres_Tacna_86",
    "comentario": "Sinceramente, Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 186,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Jimena_Salazar_64",
    "comentario": "En mi opinión, Una muy buena película, sumamente recomendada para todos los amantes del buen cine.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 75,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Gabriela_Castro_43",
    "comentario": "Crítica personal: Película excelente, con muy buena dirección, actuaciones memorables y me gustó muchísimo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 403,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Mateo_Vargas_72",
    "comentario": "Mi veredicto: Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 381,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Gabriela_Castro_34",
    "comentario": "Acabo de salir de verla: Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 499,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Adriana_Mamani_42",
    "comentario": "Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 410,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Esteban_Cine_68",
    "comentario": "Crítica personal: Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 152,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Alonso_Paredes_55",
    "comentario": "Crítica personal: Película excelente, con muy buena dirección, actuaciones memorables y me gustó muchísimo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 196,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Lorena_Cruz_92",
    "comentario": "La vi este fin de semana: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 158,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Alejandro_Huanuco_18",
    "comentario": "Sinceramente, Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 89,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Jimena_Salazar_66",
    "comentario": "Mi veredicto: Película excelente, con muy buena dirección, actuaciones memorables y me gustó muchísimo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 151,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Bruno_Critico_58",
    "comentario": "Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 296,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Fernando_Quispe_67",
    "comentario": "Los primeros 40 minutos son interesantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 458,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Gabriela_Castro_71",
    "comentario": "En mi opinión, Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 372,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Carlos_Mendoza_57",
    "comentario": "Mi veredicto: No conecta en ningún nivel emocional. La sensación al salir de la sala fue de indiferencia total.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 309,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Milagros_Ramos_86",
    "comentario": "Mi veredicto: Tiene aspectos visuales interesantes pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 133,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Natalia_Vega_57",
    "comentario": "La vi este fin de semana: La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 21,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Patricia_Leon_96",
    "comentario": "Crítica personal: Excelente historia y muy buenas actuaciones, de lo mejor que se ha estrenado en el año.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 405,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Hugo_Cardenas_45",
    "comentario": "En mi opinión, El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 256,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Diego_Huancayo_90",
    "comentario": "Sinceramente, Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 396,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Andres_Tacna_82",
    "comentario": "La vi este fin de semana: El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 41,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Javier_Morales_99",
    "comentario": "Me gustó bastante, una experiencia divertida, emocionante y con excelente ritmo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 490,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Claudia_Navarro_89",
    "comentario": "Acabo de salir de verla: Demasiado larga para lo poco que cuenta. El desarrollo se siente tedioso y pesado.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 200,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Alonso_Paredes_13",
    "comentario": "En mi opinión, El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 288,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Daniela_Rios_84",
    "comentario": "Sinceramente, Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 52,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Adriana_Mamani_34",
    "comentario": "Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 129,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Alejandro_Huanuco_11",
    "comentario": "En mi opinión, Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 63,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Fernando_Quispe_62",
    "comentario": "En mi opinión, Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 307,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Gabriela_Castro_99",
    "comentario": "En mi opinión, La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 183,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Javier_Morales_17",
    "comentario": "En mi opinión, Me gustó bastante, una experiencia divertida, emocionante y con excelente ritmo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 219,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Esteban_Cine_95",
    "comentario": "En mi opinión, La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 90,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Sebastian_Lima_44",
    "comentario": "Sinceramente, Me gustó bastante, una experiencia divertida, emocionante y con excelente ritmo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 457,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Mariana_Silva_46",
    "comentario": "Mi veredicto: Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 81,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Esteban_Cine_91",
    "comentario": "Sinceramente, Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 121,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Diego_Huancayo_57",
    "comentario": "Mi veredicto: Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 293,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Javier_Morales_65",
    "comentario": "En mi opinión, Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 284,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Andres_Tacna_68",
    "comentario": "La vi este fin de semana: Tiene aspectos visuales interesantes pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 365,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Sebastian_Lima_78",
    "comentario": "Crítica personal: Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 230,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Sebastian_Lima_90",
    "comentario": "Crítica personal: La cinematografía es aceptable pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 172,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Rodrigo_Alvarez_59",
    "comentario": "En mi opinión, Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 192,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Fernando_Quispe_69",
    "comentario": "La vi este fin de semana: Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 312,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Diego_Huancayo_77",
    "comentario": "Sinceramente, Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 314,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Fernando_Quispe_99",
    "comentario": "Visualmente cumple, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 383,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Gabriela_Castro_29",
    "comentario": "Final apresurado y decepcionante que arruina cualquier intento previo de construir suspenso.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 417,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Jimena_Salazar_36",
    "comentario": "Mi veredicto: El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 325,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Natalia_Vega_22",
    "comentario": "Crítica personal: Los primeros 40 minutos son interesantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 69,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Daniela_Rios_64",
    "comentario": "Sinceramente, Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 111,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Rodrigo_Alvarez_79",
    "comentario": "Acabo de salir de verla: Una muy buena película, sumamente recomendada para todos los amantes del buen cine.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 273,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Andres_Tacna_83",
    "comentario": "La vi este fin de semana: Visualmente cumple, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 378,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Milagros_Ramos_63",
    "comentario": "Crítica personal: Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 32,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Lucia_Rojas_65",
    "comentario": "Crítica personal: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 9,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Gonzalo_Huánuco_38",
    "comentario": "En mi opinión, Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 319,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Jimena_Salazar_23",
    "comentario": "Crítica personal: Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 263,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Claudia_Navarro_69",
    "comentario": "Crítica personal: Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 331,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Hugo_Cardenas_69",
    "comentario": "Mi veredicto: Tiene aspectos visuales interesantes pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 155,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Bruno_Critico_61",
    "comentario": "La vi este fin de semana: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 209,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Lorena_Cruz_28",
    "comentario": "La vi este fin de semana: Una muy buena película, sumamente recomendada para todos los amantes del buen cine.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 112,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Diego_Huancayo_76",
    "comentario": "Mi veredicto: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 275,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Camila_Torres_62",
    "comentario": "En mi opinión, Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 16,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Mariana_Silva_48",
    "comentario": "Sinceramente, Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 488,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Milagros_Ramos_18",
    "comentario": "En mi opinión, El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 342,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Lucia_Rojas_88",
    "comentario": "Sinceramente, Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 469,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Alonso_Paredes_85",
    "comentario": "Crítica personal: Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 255,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Valeria_Gomez_62",
    "comentario": "Sinceramente, Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 53,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Paola_Flores_98",
    "comentario": "Sinceramente, Una muy buena película, sumamente recomendada para todos los amantes del buen cine.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 243,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Diego_Huancayo_50",
    "comentario": "Mi veredicto: Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 408,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Hugo_Cardenas_70",
    "comentario": "Sinceramente, Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 31,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Carlos_Mendoza_46",
    "comentario": "Sinceramente, Excelente película, una producción impecable y una dirección que cautiva de principio a fin.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 443,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Gabriela_Castro_15",
    "comentario": "En mi opinión, Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 395,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Fernando_Quispe_89",
    "comentario": "Sinceramente, Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 139,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Camila_Torres_96",
    "comentario": "Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 461,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Lucia_Rojas_31",
    "comentario": "Acabo de salir de verla: Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 442,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Natalia_Vega_46",
    "comentario": "Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 450,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Alejandro_Huanuco_70",
    "comentario": "Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 352,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Fernando_Quispe_94",
    "comentario": "Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 38,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Claudia_Navarro_46",
    "comentario": "La vi este fin de semana: Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 170,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Paola_Flores_62",
    "comentario": "Excelente historia y muy buenas actuaciones, de lo mejor que se ha estrenado en el año.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 401,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Lucia_Rojas_46",
    "comentario": "Acabo de salir de verla: Final apresurado y decepcionante que arruina cualquier intento previo de construir suspenso.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 350,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Sebastian_Lima_70",
    "comentario": "En mi opinión, Los primeros 40 minutos son interesantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 474,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Paola_Flores_12",
    "comentario": "Mi veredicto: Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 79,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Sofia_Perez_41",
    "comentario": "Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 109,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Fernando_Quispe_70",
    "comentario": "En mi opinión, El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 423,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Lucia_Rojas_37",
    "comentario": "Demasiado larga para lo poco que cuenta. El desarrollo se siente tedioso y pesado.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 489,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Sofia_Perez_41",
    "comentario": "Sinceramente, No conecta en ningún nivel emocional. La sensación al salir de la sala fue de indiferencia total.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 99,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Alonso_Paredes_41",
    "comentario": "Excelente película, una producción impecable y una dirección que cautiva de principio a fin.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 106,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Carlos_Mendoza_34",
    "comentario": "Una muy buena película, sumamente recomendada para todos los amantes del buen cine.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 436,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Valeria_Gomez_95",
    "comentario": "En mi opinión, El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 97,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Fernando_Quispe_23",
    "comentario": "La vi este fin de semana: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 305,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Carlos_Mendoza_35",
    "comentario": "Mi veredicto: Tiene aspectos visuales interesantes pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 454,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Natalia_Vega_94",
    "comentario": "Acabo de salir de verla: No conecta en ningún nivel emocional. La sensación al salir de la sala fue de indiferencia total.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 108,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Gabriela_Castro_87",
    "comentario": "Una muy buena película, sumamente recomendada para todos los amantes del buen cine.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 204,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Alejandro_Huanuco_91",
    "comentario": "En mi opinión, Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 213,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Milagros_Ramos_51",
    "comentario": "Sinceramente, Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 315,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Bruno_Critico_22",
    "comentario": "La vi este fin de semana: Los primeros 40 minutos son interesantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 316,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Alejandro_Huanuco_31",
    "comentario": "Sinceramente, Los primeros 40 minutos son interesantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 103,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Carlos_Mendoza_42",
    "comentario": "Sinceramente, La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 202,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Valeria_Gomez_15",
    "comentario": "En mi opinión, Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 71,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Milagros_Ramos_88",
    "comentario": "Sinceramente, Excelente película, una producción impecable y una dirección que cautiva de principio a fin.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 114,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Mariana_Silva_30",
    "comentario": "En mi opinión, La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 313,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Andres_Tacna_21",
    "comentario": "Acabo de salir de verla: Tiene aspectos visuales interesantes pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 466,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Sofia_Perez_11",
    "comentario": "Crítica personal: El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 360,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Diego_Huancayo_63",
    "comentario": "Mi veredicto: Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 261,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Diego_Huancayo_44",
    "comentario": "Sinceramente, Actuaciones aceptables, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 86,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Lorena_Cruz_28",
    "comentario": "En mi opinión, La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 176,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Andres_Tacna_75",
    "comentario": "La vi este fin de semana: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 123,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Sofia_Perez_70",
    "comentario": "En mi opinión, Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 1,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Daniela_Rios_35",
    "comentario": "Mi veredicto: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 409,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Valeria_Gomez_83",
    "comentario": "El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 179,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Lucia_Rojas_30",
    "comentario": "La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 271,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Daniela_Rios_77",
    "comentario": "Mi veredicto: Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 366,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Sofia_Perez_95",
    "comentario": "En mi opinión, Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 235,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Natalia_Vega_77",
    "comentario": "Sinceramente, Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 422,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Javier_Morales_88",
    "comentario": "En mi opinión, Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 300,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Bruno_Critico_19",
    "comentario": "Sinceramente, Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 355,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Mateo_Vargas_98",
    "comentario": "Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 425,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Lorena_Cruz_44",
    "comentario": "Mi veredicto: Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 145,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Natalia_Vega_75",
    "comentario": "La vi este fin de semana: Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 147,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Javier_Morales_83",
    "comentario": "Crítica personal: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 8,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Mariana_Silva_25",
    "comentario": "Acabo de salir de verla: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 334,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Bruno_Critico_85",
    "comentario": "En mi opinión, Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 259,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Paola_Flores_94",
    "comentario": "Mi veredicto: Tiene momentos divertidos mezclados con escenas que se alargan demasiado sin necesidad.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 50,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Fernando_Quispe_32",
    "comentario": "En mi opinión, Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 98,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Carlos_Mendoza_37",
    "comentario": "Mi veredicto: Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 318,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Alejandro_Huanuco_20",
    "comentario": "Mi veredicto: La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 400,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Renzo_Cinefilo_71",
    "comentario": "Acabo de salir de verla: El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 424,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Andres_Tacna_82",
    "comentario": "Sinceramente, Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 321,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Milagros_Ramos_94",
    "comentario": "Acabo de salir de verla: Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 455,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Fernando_Quispe_76",
    "comentario": "Mi veredicto: Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 39,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Javier_Morales_53",
    "comentario": "Una muy buena película, sumamente recomendada para todos los amantes del buen cine.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 375,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Jimena_Salazar_44",
    "comentario": "Sinceramente, Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 388,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Paola_Flores_81",
    "comentario": "Sinceramente, Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 59,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Andres_Tacna_38",
    "comentario": "Sinceramente, El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 135,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Mateo_Vargas_24",
    "comentario": "La vi este fin de semana: Me gustó bastante, una experiencia divertida, emocionante y con excelente ritmo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 311,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Fernando_Quispe_64",
    "comentario": "Crítica personal: Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 301,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Daniela_Rios_65",
    "comentario": "Sinceramente, Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 149,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Natalia_Vega_63",
    "comentario": "Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 4,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Alonso_Paredes_72",
    "comentario": "Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 182,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Gabriela_Castro_89",
    "comentario": "Acabo de salir de verla: La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 308,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Mateo_Vargas_99",
    "comentario": "En mi opinión, Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 83,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Paola_Flores_44",
    "comentario": "Sinceramente, Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 160,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Rodrigo_Alvarez_43",
    "comentario": "En mi opinión, Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 329,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Camila_Torres_22",
    "comentario": "Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 168,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Mariana_Silva_37",
    "comentario": "Me gustó bastante, una experiencia divertida, emocionante y con excelente ritmo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 269,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Lucia_Rojas_98",
    "comentario": "En mi opinión, La cinematografía es aceptable pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 164,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Patricia_Leon_60",
    "comentario": "Crítica personal: Me gustó bastante, una experiencia divertida, emocionante y con excelente ritmo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 3,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Esteban_Cine_27",
    "comentario": "Sinceramente, Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 70,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Claudia_Navarro_43",
    "comentario": "Sinceramente, Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 241,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Daniela_Rios_74",
    "comentario": "Crítica personal: Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 74,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Sofia_Perez_80",
    "comentario": "Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 232,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Claudia_Navarro_44",
    "comentario": "Mi veredicto: Visualmente cumple, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 187,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Patricia_Leon_19",
    "comentario": "En mi opinión, Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 431,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Carlos_Mendoza_47",
    "comentario": "En mi opinión, Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 222,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Hugo_Cardenas_77",
    "comentario": "Mi veredicto: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 304,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Natalia_Vega_90",
    "comentario": "En mi opinión, Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 419,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Paola_Flores_86",
    "comentario": "Sinceramente, Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 82,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Claudia_Navarro_70",
    "comentario": "Mi veredicto: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 33,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Alonso_Paredes_26",
    "comentario": "Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 364,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Adriana_Mamani_73",
    "comentario": "Sinceramente, Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 249,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Javier_Morales_46",
    "comentario": "Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 238,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Lorena_Cruz_88",
    "comentario": "Acabo de salir de verla: Visualmente cumple, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 67,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Rodrigo_Alvarez_96",
    "comentario": "Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 264,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Mateo_Vargas_92",
    "comentario": "Crítica personal: Tiene aspectos visuales interesantes pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 128,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Fernando_Quispe_24",
    "comentario": "Mi veredicto: Excelente película, una producción impecable y una dirección que cautiva de principio a fin.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 358,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Diego_Huancayo_77",
    "comentario": "Mi veredicto: Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 298,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Carlos_Mendoza_10",
    "comentario": "En mi opinión, Tiene aspectos visuales interesantes pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 266,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Sofia_Perez_76",
    "comentario": "Sinceramente, La cinematografía es aceptable pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 169,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Lorena_Cruz_70",
    "comentario": "Excelente historia y muy buenas actuaciones, de lo mejor que se ha estrenado en el año.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 225,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Camila_Torres_92",
    "comentario": "Mi veredicto: Excelente historia y muy buenas actuaciones, de lo mejor que se ha estrenado en el año.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 407,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Alejandro_Huanuco_49",
    "comentario": "Acabo de salir de verla: Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 258,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Adriana_Mamani_57",
    "comentario": "Crítica personal: Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 415,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Jimena_Salazar_89",
    "comentario": "Acabo de salir de verla: Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 446,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Patricia_Leon_14",
    "comentario": "La vi este fin de semana: Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 432,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Natalia_Vega_87",
    "comentario": "En mi opinión, Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 157,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Sebastian_Lima_91",
    "comentario": "En mi opinión, Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 198,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Alonso_Paredes_71",
    "comentario": "Acabo de salir de verla: Una muy buena película, sumamente recomendada para todos los amantes del buen cine.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 55,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Fernando_Quispe_40",
    "comentario": "Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 88,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Bruno_Critico_48",
    "comentario": "La vi este fin de semana: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 486,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Lucia_Rojas_90",
    "comentario": "Mi veredicto: Final apresurado y decepcionante que arruina cualquier intento previo de construir suspenso.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 234,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Daniela_Rios_87",
    "comentario": "Acabo de salir de verla: Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 217,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Diego_Huancayo_94",
    "comentario": "Una muy buena película, sumamente recomendada para todos los amantes del buen cine.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 336,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Valeria_Gomez_92",
    "comentario": "Acabo de salir de verla: Visualmente cumple, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 262,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Fernando_Quispe_48",
    "comentario": "Mi veredicto: Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 100,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Lucia_Rojas_54",
    "comentario": "En mi opinión, El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 491,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Milagros_Ramos_88",
    "comentario": "Acabo de salir de verla: Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 283,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Sofia_Perez_84",
    "comentario": "La vi este fin de semana: Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 291,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Lucia_Rojas_99",
    "comentario": "Crítica personal: La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 118,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Esteban_Cine_96",
    "comentario": "Crítica personal: Excelente historia y muy buenas actuaciones, de lo mejor que se ha estrenado en el año.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 212,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Claudia_Navarro_63",
    "comentario": "Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 390,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Lucia_Rojas_53",
    "comentario": "Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 346,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Gonzalo_Huánuco_54",
    "comentario": "Mi veredicto: Tiene momentos divertidos mezclados con escenas que se alargan demasiado sin necesidad.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 379,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Valeria_Gomez_34",
    "comentario": "Mi veredicto: Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 394,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Claudia_Navarro_93",
    "comentario": "En mi opinión, Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 285,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Patricia_Leon_30",
    "comentario": "Visualmente cumple, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 208,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Gonzalo_Huánuco_60",
    "comentario": "La vi este fin de semana: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 393,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Bruno_Critico_31",
    "comentario": "En mi opinión, Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 166,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Sofia_Perez_28",
    "comentario": "Una muy buena película, sumamente recomendada para todos los amantes del buen cine.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 282,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Paola_Flores_92",
    "comentario": "Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 495,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Rodrigo_Alvarez_67",
    "comentario": "Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 278,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Sebastian_Lima_20",
    "comentario": "Sinceramente, La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 306,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Natalia_Vega_47",
    "comentario": "La vi este fin de semana: La cinematografía es aceptable pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 268,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Diego_Huancayo_22",
    "comentario": "Acabo de salir de verla: La cinematografía es aceptable pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 92,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Mateo_Vargas_77",
    "comentario": "En mi opinión, Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 216,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Hugo_Cardenas_84",
    "comentario": "Crítica personal: Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 397,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Mariana_Silva_51",
    "comentario": "Crítica personal: El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 154,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Renzo_Cinefilo_40",
    "comentario": "Película excelente, con muy buena dirección, actuaciones memorables y me gustó muchísimo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 494,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Esteban_Cine_90",
    "comentario": "Sinceramente, Final apresurado y decepcionante que arruina cualquier intento previo de construir suspenso.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 287,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Andres_Tacna_47",
    "comentario": "En mi opinión, Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 433,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Renzo_Cinefilo_74",
    "comentario": "En mi opinión, Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 165,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Adriana_Mamani_48",
    "comentario": "Acabo de salir de verla: Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 303,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Rodrigo_Alvarez_79",
    "comentario": "Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 110,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Valeria_Gomez_36",
    "comentario": "En mi opinión, El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 420,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Valeria_Gomez_93",
    "comentario": "Sinceramente, El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 122,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Sofia_Perez_16",
    "comentario": "El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 4,
    "sentimiento": "positivo"
  }
];
