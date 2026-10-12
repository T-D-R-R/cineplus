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
    "id": 81,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Patricia_Leon_59",
    "comentario": "Acabo de salir de verla: Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 42,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Natalia_Vega_29",
    "comentario": "La vi este fin de semana: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 321,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Esteban_Cine_86",
    "comentario": "Crítica personal: Los primeros 40 minutos son brillantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 128,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Gabriela_Castro_15",
    "comentario": "La vi este fin de semana: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 323,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Camila_Torres_30",
    "comentario": "La vi este fin de semana: Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 347,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Esteban_Cine_21",
    "comentario": "En mi opinión, Tiene momentos muy divertidos e ingeniosos mezclados con escenas que se alargan demasiado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 243,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Gabriela_Castro_58",
    "comentario": "Crítica personal: Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 209,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Valeria_Gomez_20",
    "comentario": "Mi veredicto: El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 300,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Adriana_Mamani_24",
    "comentario": "En mi opinión, Los primeros 40 minutos son brillantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 382,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Diego_Huancayo_46",
    "comentario": "En mi opinión, Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 291,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Daniela_Rios_82",
    "comentario": "La vi este fin de semana: Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 45,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Lucia_Rojas_55",
    "comentario": "Crítica personal: Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 261,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Carlos_Mendoza_50",
    "comentario": "Mi veredicto: Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 385,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Renzo_Cinefilo_96",
    "comentario": "La vi este fin de semana: Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 161,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Camila_Torres_95",
    "comentario": "Acabo de salir de verla: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 188,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Alejandro_Huanuco_83",
    "comentario": "Crítica personal: Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 168,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Sebastian_Lima_68",
    "comentario": "Sinceramente, Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 253,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Gonzalo_Huánuco_56",
    "comentario": "Crítica personal: Visualmente es un espectáculo, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 134,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Rodrigo_Alvarez_13",
    "comentario": "Acabo de salir de verla: Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 2,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Milagros_Ramos_62",
    "comentario": "Sinceramente, Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 8,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Sebastian_Lima_94",
    "comentario": "Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 163,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Rodrigo_Alvarez_55",
    "comentario": "La vi este fin de semana: La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 190,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Valeria_Gomez_27",
    "comentario": "En mi opinión, Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 173,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Sofia_Perez_65",
    "comentario": "La vi este fin de semana: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 216,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Paola_Flores_84",
    "comentario": "La vi este fin de semana: La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 245,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Gabriela_Castro_82",
    "comentario": "La vi este fin de semana: Visualmente es un espectáculo, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 202,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Fernando_Quispe_46",
    "comentario": "En mi opinión, Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 443,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Alejandro_Huanuco_32",
    "comentario": "Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 271,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Lucia_Rojas_74",
    "comentario": "Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 83,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Fernando_Quispe_80",
    "comentario": "La vi este fin de semana: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 70,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Daniela_Rios_99",
    "comentario": "Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 27,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Valeria_Gomez_70",
    "comentario": "Crítica personal: Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 326,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Daniela_Rios_85",
    "comentario": "Sinceramente, Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 122,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Bruno_Critico_24",
    "comentario": "Acabo de salir de verla: Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 349,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Lucia_Rojas_70",
    "comentario": "Sinceramente, Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 330,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Patricia_Leon_39",
    "comentario": "Sinceramente, Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 103,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Renzo_Cinefilo_52",
    "comentario": "En mi opinión, Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 364,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Gonzalo_Huánuco_85",
    "comentario": "Mi veredicto: Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 71,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Hugo_Cardenas_77",
    "comentario": "Mi veredicto: El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 229,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Daniela_Rios_77",
    "comentario": "Tiene aspectos visuales increíbles pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 203,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Jimena_Salazar_28",
    "comentario": "Mi veredicto: Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 244,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Camila_Torres_71",
    "comentario": "En mi opinión, Los primeros 40 minutos son brillantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 35,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Javier_Morales_48",
    "comentario": "Acabo de salir de verla: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 82,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Javier_Morales_98",
    "comentario": "La vi este fin de semana: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 423,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Natalia_Vega_73",
    "comentario": "En mi opinión, El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 500,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Gonzalo_Huánuco_36",
    "comentario": "No conecta en ningún nivel emocional. La sensación al salir de la sala fue de indiferencia total.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 258,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Alonso_Paredes_67",
    "comentario": "Mi veredicto: Los primeros 40 minutos son brillantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 306,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Javier_Morales_82",
    "comentario": "En mi opinión, Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 115,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Mariana_Silva_13",
    "comentario": "Acabo de salir de verla: La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 319,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Hugo_Cardenas_54",
    "comentario": "Sinceramente, Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 473,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Natalia_Vega_41",
    "comentario": "En mi opinión, Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 424,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Rodrigo_Alvarez_80",
    "comentario": "Crítica personal: Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 41,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Camila_Torres_38",
    "comentario": "Acabo de salir de verla: Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 242,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Gonzalo_Huánuco_69",
    "comentario": "Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 499,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Lorena_Cruz_31",
    "comentario": "Crítica personal: Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 96,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Claudia_Navarro_93",
    "comentario": "Sinceramente, La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 469,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Adriana_Mamani_22",
    "comentario": "La vi este fin de semana: Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 374,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Sebastian_Lima_61",
    "comentario": "La vi este fin de semana: Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 282,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Camila_Torres_37",
    "comentario": "Acabo de salir de verla: Visualmente es un espectáculo, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 343,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Sofia_Perez_37",
    "comentario": "Mi veredicto: Tiene aspectos visuales increíbles pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 453,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Camila_Torres_96",
    "comentario": "Acabo de salir de verla: No conecta en ningún nivel emocional. La sensación al salir de la sala fue de indiferencia total.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 157,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Fernando_Quispe_90",
    "comentario": "En mi opinión, Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 59,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Fernando_Quispe_52",
    "comentario": "En mi opinión, Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 266,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Renzo_Cinefilo_13",
    "comentario": "Buenas actuaciones individuales, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 192,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Sofia_Perez_69",
    "comentario": "La vi este fin de semana: Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 470,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Carlos_Mendoza_15",
    "comentario": "Crítica personal: El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 361,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Esteban_Cine_15",
    "comentario": "En mi opinión, El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 141,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Milagros_Ramos_47",
    "comentario": "Crítica personal: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 483,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Renzo_Cinefilo_86",
    "comentario": "Acabo de salir de verla: Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 456,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Camila_Torres_45",
    "comentario": "Mi veredicto: Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 26,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Milagros_Ramos_95",
    "comentario": "Crítica personal: Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 54,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Carlos_Mendoza_66",
    "comentario": "Acabo de salir de verla: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 462,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Andres_Tacna_77",
    "comentario": "Sinceramente, Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 348,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Gonzalo_Huánuco_43",
    "comentario": "Mi veredicto: Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 119,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Mariana_Silva_53",
    "comentario": "En mi opinión, Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 393,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Andres_Tacna_47",
    "comentario": "La vi este fin de semana: Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 225,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Sebastian_Lima_29",
    "comentario": "Mi veredicto: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 10,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Sofia_Perez_32",
    "comentario": "Mi veredicto: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 154,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Sofia_Perez_26",
    "comentario": "La vi este fin de semana: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 476,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Lucia_Rojas_59",
    "comentario": "Sinceramente, Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 249,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Fernando_Quispe_43",
    "comentario": "Crítica personal: Tiene aspectos visuales increíbles pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 233,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Diego_Huancayo_76",
    "comentario": "Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 24,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Daniela_Rios_55",
    "comentario": "La vi este fin de semana: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 328,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Renzo_Cinefilo_70",
    "comentario": "En mi opinión, Los primeros 40 minutos son brillantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 482,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Andres_Tacna_21",
    "comentario": "En mi opinión, No conecta en ningún nivel emocional. La sensación al salir de la sala fue de indiferencia total.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 38,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Fernando_Quispe_64",
    "comentario": "Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 363,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Alonso_Paredes_25",
    "comentario": "Mi veredicto: Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 230,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Mateo_Vargas_91",
    "comentario": "Sinceramente, Tiene aspectos visuales increíbles pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 133,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Patricia_Leon_30",
    "comentario": "Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 16,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Rodrigo_Alvarez_15",
    "comentario": "En mi opinión, Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 280,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Sofia_Perez_37",
    "comentario": "Sinceramente, Buenas actuaciones individuales, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 30,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Javier_Morales_60",
    "comentario": "Sinceramente, Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 259,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Bruno_Critico_24",
    "comentario": "Acabo de salir de verla: Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 32,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Alonso_Paredes_51",
    "comentario": "Acabo de salir de verla: Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 239,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Adriana_Mamani_84",
    "comentario": "Crítica personal: Tiene aspectos visuales increíbles pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 428,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Carlos_Mendoza_23",
    "comentario": "Acabo de salir de verla: Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 129,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Alonso_Paredes_50",
    "comentario": "Sinceramente, Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 365,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Daniela_Rios_64",
    "comentario": "Mi veredicto: El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 377,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Camila_Torres_23",
    "comentario": "Sinceramente, No conecta en ningún nivel emocional. La sensación al salir de la sala fue de indiferencia total.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 97,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Alonso_Paredes_22",
    "comentario": "Mi veredicto: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 76,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Rodrigo_Alvarez_60",
    "comentario": "Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 429,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Esteban_Cine_53",
    "comentario": "En mi opinión, Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 316,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Sebastian_Lima_61",
    "comentario": "Mi veredicto: La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 421,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Hugo_Cardenas_14",
    "comentario": "Acabo de salir de verla: Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 14,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Sebastian_Lima_44",
    "comentario": "Mi veredicto: Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 22,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Carlos_Mendoza_88",
    "comentario": "Crítica personal: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 327,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Alonso_Paredes_46",
    "comentario": "Mi veredicto: Tiene momentos muy divertidos e ingeniosos mezclados con escenas que se alargan demasiado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 222,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Paola_Flores_87",
    "comentario": "Mi veredicto: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 17,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Lucia_Rojas_13",
    "comentario": "La vi este fin de semana: Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 339,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Carlos_Mendoza_35",
    "comentario": "Buenas actuaciones individuales, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 388,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Claudia_Navarro_60",
    "comentario": "Mi veredicto: El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 180,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Lorena_Cruz_27",
    "comentario": "La vi este fin de semana: Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 440,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Daniela_Rios_79",
    "comentario": "Sinceramente, Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 174,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Alonso_Paredes_42",
    "comentario": "Acabo de salir de verla: Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 346,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Mateo_Vargas_52",
    "comentario": "Visualmente es un espectáculo, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 172,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Claudia_Navarro_85",
    "comentario": "Sinceramente, Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 9,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Lucia_Rojas_39",
    "comentario": "Mi veredicto: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 417,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Paola_Flores_52",
    "comentario": "Acabo de salir de verla: Final apresurado y decepcionante que arruina cualquier intento previo de construir suspenso.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 342,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Alejandro_Huanuco_82",
    "comentario": "Crítica personal: La fotografía es excelente pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 412,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Mateo_Vargas_60",
    "comentario": "En mi opinión, Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 403,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Diego_Huancayo_24",
    "comentario": "Acabo de salir de verla: Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 495,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Bruno_Critico_93",
    "comentario": "Mi veredicto: Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 297,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Camila_Torres_52",
    "comentario": "Tiene momentos muy divertidos e ingeniosos mezclados con escenas que se alargan demasiado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 219,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Gonzalo_Huánuco_59",
    "comentario": "Sinceramente, Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 260,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Hugo_Cardenas_85",
    "comentario": "Sinceramente, Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 303,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Adriana_Mamani_48",
    "comentario": "Mi veredicto: Tiene momentos muy divertidos e ingeniosos mezclados con escenas que se alargan demasiado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 281,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Claudia_Navarro_92",
    "comentario": "Mi veredicto: La fotografía es excelente pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 208,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Valeria_Gomez_13",
    "comentario": "Sinceramente, Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 472,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Renzo_Cinefilo_85",
    "comentario": "Acabo de salir de verla: Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 426,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Alonso_Paredes_94",
    "comentario": "Sinceramente, Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 492,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Javier_Morales_62",
    "comentario": "En mi opinión, Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 278,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Claudia_Navarro_72",
    "comentario": "Sinceramente, Tiene momentos muy divertidos e ingeniosos mezclados con escenas que se alargan demasiado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 438,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Paola_Flores_37",
    "comentario": "Crítica personal: Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 435,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Natalia_Vega_43",
    "comentario": "Acabo de salir de verla: El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 20,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Hugo_Cardenas_67",
    "comentario": "Mi veredicto: Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 197,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Natalia_Vega_48",
    "comentario": "Sinceramente, Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 427,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Renzo_Cinefilo_34",
    "comentario": "Crítica personal: Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 396,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Gabriela_Castro_78",
    "comentario": "Crítica personal: Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 337,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Bruno_Critico_10",
    "comentario": "Crítica personal: Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 497,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Camila_Torres_45",
    "comentario": "La vi este fin de semana: Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 21,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Alonso_Paredes_38",
    "comentario": "En mi opinión, Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 366,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Natalia_Vega_95",
    "comentario": "Crítica personal: Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 490,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Fernando_Quispe_10",
    "comentario": "La vi este fin de semana: Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 178,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Andres_Tacna_47",
    "comentario": "En mi opinión, La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 368,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Natalia_Vega_26",
    "comentario": "Sinceramente, Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 179,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Mateo_Vargas_45",
    "comentario": "Crítica personal: Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 185,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Andres_Tacna_86",
    "comentario": "Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 5,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Alonso_Paredes_41",
    "comentario": "Acabo de salir de verla: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 376,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Gonzalo_Huánuco_67",
    "comentario": "La vi este fin de semana: Final apresurado y decepcionante que arruina cualquier intento previo de construir suspenso.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 166,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Renzo_Cinefilo_61",
    "comentario": "Acabo de salir de verla: Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 267,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Alonso_Paredes_41",
    "comentario": "En mi opinión, Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 395,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Patricia_Leon_73",
    "comentario": "Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 273,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Mariana_Silva_34",
    "comentario": "Mi veredicto: Los primeros 40 minutos son brillantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 226,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Paola_Flores_90",
    "comentario": "La vi este fin de semana: Tiene aspectos visuales increíbles pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 234,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Javier_Morales_41",
    "comentario": "Sinceramente, La fotografía es excelente pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 28,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Gabriela_Castro_26",
    "comentario": "Sinceramente, Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 92,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Sofia_Perez_14",
    "comentario": "Mi veredicto: La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 405,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Paola_Flores_33",
    "comentario": "La vi este fin de semana: Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 378,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Sofia_Perez_31",
    "comentario": "Crítica personal: Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 338,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Mariana_Silva_58",
    "comentario": "En mi opinión, Visualmente es un espectáculo, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 176,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Patricia_Leon_10",
    "comentario": "Mi veredicto: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 493,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Esteban_Cine_26",
    "comentario": "Crítica personal: El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 404,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Andres_Tacna_87",
    "comentario": "Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 227,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Diego_Huancayo_12",
    "comentario": "La vi este fin de semana: Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 85,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Paola_Flores_68",
    "comentario": "Crítica personal: Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 248,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Carlos_Mendoza_97",
    "comentario": "Acabo de salir de verla: La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 251,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Alonso_Paredes_63",
    "comentario": "Crítica personal: Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 231,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Valeria_Gomez_36",
    "comentario": "Crítica personal: Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 386,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Bruno_Critico_76",
    "comentario": "Sinceramente, Demasiado larga para lo poco que cuenta. El desarrollo se siente tedioso y pesado.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 276,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Lorena_Cruz_88",
    "comentario": "La vi este fin de semana: Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 295,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Sebastian_Lima_81",
    "comentario": "Crítica personal: Tiene momentos muy divertidos e ingeniosos mezclados con escenas que se alargan demasiado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 431,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Claudia_Navarro_17",
    "comentario": "La vi este fin de semana: Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 413,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Mateo_Vargas_49",
    "comentario": "Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 61,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Esteban_Cine_60",
    "comentario": "Sinceramente, Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 491,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Paola_Flores_68",
    "comentario": "En mi opinión, Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 211,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Fernando_Quispe_64",
    "comentario": "Acabo de salir de verla: Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 255,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Rodrigo_Alvarez_25",
    "comentario": "En mi opinión, La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 240,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Esteban_Cine_16",
    "comentario": "Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 289,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Jimena_Salazar_66",
    "comentario": "Mi veredicto: La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 139,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Claudia_Navarro_98",
    "comentario": "Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 254,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Andres_Tacna_73",
    "comentario": "La vi este fin de semana: Tiene momentos muy divertidos e ingeniosos mezclados con escenas que se alargan demasiado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 140,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Lorena_Cruz_99",
    "comentario": "En mi opinión, El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 375,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Sebastian_Lima_52",
    "comentario": "Mi veredicto: Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 485,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Paola_Flores_12",
    "comentario": "Crítica personal: Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 307,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Claudia_Navarro_19",
    "comentario": "Crítica personal: Tiene momentos muy divertidos e ingeniosos mezclados con escenas que se alargan demasiado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 73,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Sofia_Perez_34",
    "comentario": "En mi opinión, Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 480,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Natalia_Vega_10",
    "comentario": "La vi este fin de semana: Final apresurado y decepcionante que arruina cualquier intento previo de construir suspenso.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 112,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Alonso_Paredes_97",
    "comentario": "Acabo de salir de verla: Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 47,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Fernando_Quispe_36",
    "comentario": "Sinceramente, La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 256,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Mateo_Vargas_35",
    "comentario": "En mi opinión, Buenas actuaciones individuales, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 55,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Lorena_Cruz_94",
    "comentario": "Sinceramente, Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 57,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Fernando_Quispe_66",
    "comentario": "Crítica personal: Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 52,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Valeria_Gomez_96",
    "comentario": "Acabo de salir de verla: Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 68,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Rodrigo_Alvarez_64",
    "comentario": "Mi veredicto: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 207,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Sofia_Perez_33",
    "comentario": "La vi este fin de semana: Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 189,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Bruno_Critico_67",
    "comentario": "Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 123,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Patricia_Leon_35",
    "comentario": "Crítica personal: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 7,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Bruno_Critico_30",
    "comentario": "Crítica personal: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 450,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Lucia_Rojas_19",
    "comentario": "En mi opinión, Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 218,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Bruno_Critico_91",
    "comentario": "La vi este fin de semana: La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 164,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Claudia_Navarro_58",
    "comentario": "Acabo de salir de verla: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 246,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Renzo_Cinefilo_89",
    "comentario": "Acabo de salir de verla: Tiene momentos muy divertidos e ingeniosos mezclados con escenas que se alargan demasiado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 284,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Rodrigo_Alvarez_56",
    "comentario": "Crítica personal: Visualmente es un espectáculo, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 136,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Jimena_Salazar_73",
    "comentario": "Acabo de salir de verla: Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 72,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Hugo_Cardenas_45",
    "comentario": "Mi veredicto: La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 58,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Fernando_Quispe_28",
    "comentario": "Crítica personal: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 101,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Milagros_Ramos_10",
    "comentario": "La vi este fin de semana: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 205,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Valeria_Gomez_76",
    "comentario": "Sinceramente, Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 350,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Renzo_Cinefilo_14",
    "comentario": "Mi veredicto: Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 414,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Sofia_Perez_44",
    "comentario": "Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 434,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Lucia_Rojas_60",
    "comentario": "Sinceramente, Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 167,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Patricia_Leon_24",
    "comentario": "Sinceramente, Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 398,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Valeria_Gomez_63",
    "comentario": "Acabo de salir de verla: Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 407,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Adriana_Mamani_68",
    "comentario": "Crítica personal: Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 458,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Renzo_Cinefilo_48",
    "comentario": "Demasiado larga para lo poco que cuenta. El desarrollo se siente tedioso y pesado.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 50,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Andres_Tacna_29",
    "comentario": "Acabo de salir de verla: Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 53,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Sofia_Perez_35",
    "comentario": "Acabo de salir de verla: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 360,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Bruno_Critico_62",
    "comentario": "Crítica personal: Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 25,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Paola_Flores_95",
    "comentario": "Crítica personal: Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 150,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Gabriela_Castro_86",
    "comentario": "Crítica personal: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 287,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Claudia_Navarro_73",
    "comentario": "Sinceramente, Los primeros 40 minutos son brillantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 62,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Valeria_Gomez_16",
    "comentario": "La vi este fin de semana: Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 471,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Carlos_Mendoza_70",
    "comentario": "Mi veredicto: Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 159,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Lucia_Rojas_55",
    "comentario": "Mi veredicto: Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 322,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Claudia_Navarro_43",
    "comentario": "Acabo de salir de verla: Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 293,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Gonzalo_Huánuco_68",
    "comentario": "Mi veredicto: Tiene aspectos visuales increíbles pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 437,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Bruno_Critico_47",
    "comentario": "En mi opinión, Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 389,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Camila_Torres_18",
    "comentario": "En mi opinión, Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 433,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Rodrigo_Alvarez_38",
    "comentario": "Acabo de salir de verla: Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 351,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Daniela_Rios_35",
    "comentario": "Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 381,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Camila_Torres_50",
    "comentario": "Crítica personal: Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 352,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Adriana_Mamani_20",
    "comentario": "En mi opinión, Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 44,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Andres_Tacna_97",
    "comentario": "Acabo de salir de verla: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 29,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Lucia_Rojas_94",
    "comentario": "En mi opinión, Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 110,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Fernando_Quispe_99",
    "comentario": "La vi este fin de semana: El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 186,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Esteban_Cine_18",
    "comentario": "Crítica personal: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 353,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Claudia_Navarro_40",
    "comentario": "Sinceramente, Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 86,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Mariana_Silva_44",
    "comentario": "Sinceramente, Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 69,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Bruno_Critico_31",
    "comentario": "Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 304,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Valeria_Gomez_71",
    "comentario": "La vi este fin de semana: Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 206,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Milagros_Ramos_28",
    "comentario": "La vi este fin de semana: El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 183,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Daniela_Rios_84",
    "comentario": "Acabo de salir de verla: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 79,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Rodrigo_Alvarez_35",
    "comentario": "Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 298,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Mariana_Silva_89",
    "comentario": "Crítica personal: Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 439,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Mariana_Silva_44",
    "comentario": "En mi opinión, Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 153,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Rodrigo_Alvarez_82",
    "comentario": "La vi este fin de semana: Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 149,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Lorena_Cruz_25",
    "comentario": "Mi veredicto: La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 93,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Milagros_Ramos_51",
    "comentario": "En mi opinión, Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 107,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Diego_Huancayo_33",
    "comentario": "Sinceramente, El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 3,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Rodrigo_Alvarez_21",
    "comentario": "Sinceramente, Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 170,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Hugo_Cardenas_37",
    "comentario": "En mi opinión, La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 220,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Esteban_Cine_95",
    "comentario": "Acabo de salir de verla: El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 465,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Alejandro_Huanuco_41",
    "comentario": "Acabo de salir de verla: No conecta en ningún nivel emocional. La sensación al salir de la sala fue de indiferencia total.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 146,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Adriana_Mamani_88",
    "comentario": "Sinceramente, La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 108,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Renzo_Cinefilo_15",
    "comentario": "Mi veredicto: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 4,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Fernando_Quispe_20",
    "comentario": "En mi opinión, El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 100,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Daniela_Rios_72",
    "comentario": "En mi opinión, Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 77,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Gabriela_Castro_45",
    "comentario": "Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 15,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Bruno_Critico_90",
    "comentario": "Mi veredicto: Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 478,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Bruno_Critico_35",
    "comentario": "Acabo de salir de verla: Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 37,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Natalia_Vega_72",
    "comentario": "Crítica personal: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 430,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Alejandro_Huanuco_93",
    "comentario": "En mi opinión, Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 31,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Natalia_Vega_92",
    "comentario": "Crítica personal: El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 418,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Lorena_Cruz_20",
    "comentario": "Crítica personal: El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 212,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Patricia_Leon_30",
    "comentario": "Acabo de salir de verla: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 221,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Sofia_Perez_49",
    "comentario": "Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 380,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Carlos_Mendoza_69",
    "comentario": "Mi veredicto: Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 162,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Paola_Flores_86",
    "comentario": "Sinceramente, Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 95,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Milagros_Ramos_97",
    "comentario": "Crítica personal: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 332,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Bruno_Critico_13",
    "comentario": "La fotografía es excelente pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 201,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Hugo_Cardenas_33",
    "comentario": "Mi veredicto: La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 135,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Alonso_Paredes_59",
    "comentario": "Mi veredicto: El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 419,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Carlos_Mendoza_23",
    "comentario": "El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 241,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Diego_Huancayo_77",
    "comentario": "Crítica personal: La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 118,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Gabriela_Castro_48",
    "comentario": "En mi opinión, La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 228,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Claudia_Navarro_84",
    "comentario": "Mi veredicto: Buenas actuaciones individuales, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 194,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Diego_Huancayo_93",
    "comentario": "En mi opinión, Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 406,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Valeria_Gomez_92",
    "comentario": "En mi opinión, El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 277,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Gabriela_Castro_81",
    "comentario": "En mi opinión, Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 313,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Claudia_Navarro_40",
    "comentario": "Sinceramente, Buenas actuaciones individuales, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 455,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Alonso_Paredes_29",
    "comentario": "Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 116,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Adriana_Mamani_23",
    "comentario": "La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 290,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Gonzalo_Huánuco_46",
    "comentario": "Mi veredicto: Buenas actuaciones individuales, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 131,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Adriana_Mamani_73",
    "comentario": "En mi opinión, Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 371,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Diego_Huancayo_11",
    "comentario": "Acabo de salir de verla: Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 11,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Adriana_Mamani_96",
    "comentario": "Mi veredicto: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 448,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Milagros_Ramos_70",
    "comentario": "Crítica personal: Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 481,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Jimena_Salazar_48",
    "comentario": "Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 177,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Renzo_Cinefilo_99",
    "comentario": "Crítica personal: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 106,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Sofia_Perez_63",
    "comentario": "En mi opinión, Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 475,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Diego_Huancayo_27",
    "comentario": "Mi veredicto: Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 13,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Mateo_Vargas_88",
    "comentario": "Crítica personal: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 169,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Lorena_Cruz_14",
    "comentario": "La vi este fin de semana: Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 191,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Sofia_Perez_93",
    "comentario": "Acabo de salir de verla: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 372,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Andres_Tacna_41",
    "comentario": "Mi veredicto: Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 494,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Mariana_Silva_51",
    "comentario": "Mi veredicto: Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 46,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Rodrigo_Alvarez_65",
    "comentario": "Acabo de salir de verla: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 84,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Lucia_Rojas_26",
    "comentario": "Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 275,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Daniela_Rios_85",
    "comentario": "Mi veredicto: Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 257,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Paola_Flores_33",
    "comentario": "Crítica personal: Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 223,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Gabriela_Castro_81",
    "comentario": "Mi veredicto: Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 67,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Andres_Tacna_70",
    "comentario": "Crítica personal: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 496,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Rodrigo_Alvarez_67",
    "comentario": "Mi veredicto: Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 152,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Renzo_Cinefilo_70",
    "comentario": "Crítica personal: Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 320,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Daniela_Rios_53",
    "comentario": "Sinceramente, Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 498,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Milagros_Ramos_85",
    "comentario": "Crítica personal: Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 269,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Alejandro_Huanuco_98",
    "comentario": "Mi veredicto: Visualmente es un espectáculo, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 425,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Esteban_Cine_14",
    "comentario": "Mi veredicto: El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 487,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Milagros_Ramos_15",
    "comentario": "Crítica personal: El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 232,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Natalia_Vega_55",
    "comentario": "Mi veredicto: Tiene aspectos visuales increíbles pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 198,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Valeria_Gomez_93",
    "comentario": "Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 263,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Javier_Morales_17",
    "comentario": "Mi veredicto: La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 479,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Lorena_Cruz_96",
    "comentario": "En mi opinión, El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 441,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Gabriela_Castro_27",
    "comentario": "Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 357,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Lorena_Cruz_29",
    "comentario": "En mi opinión, Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 217,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Paola_Flores_25",
    "comentario": "La vi este fin de semana: El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 359,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Lucia_Rojas_44",
    "comentario": "Mi veredicto: Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 292,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Milagros_Ramos_50",
    "comentario": "Acabo de salir de verla: Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 324,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Daniela_Rios_97",
    "comentario": "La vi este fin de semana: Buenas actuaciones individuales, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 484,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Camila_Torres_77",
    "comentario": "En mi opinión, Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 325,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Daniela_Rios_52",
    "comentario": "Acabo de salir de verla: Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 416,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Fernando_Quispe_64",
    "comentario": "Crítica personal: Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 333,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Daniela_Rios_65",
    "comentario": "Mi veredicto: Tiene aspectos visuales increíbles pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 215,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Andres_Tacna_20",
    "comentario": "Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 331,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Paola_Flores_18",
    "comentario": "Crítica personal: La fotografía es excelente pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 102,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Esteban_Cine_81",
    "comentario": "Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 305,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Mateo_Vargas_34",
    "comentario": "Crítica personal: Tiene momentos muy divertidos e ingeniosos mezclados con escenas que se alargan demasiado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 301,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Fernando_Quispe_90",
    "comentario": "Mi veredicto: Tiene aspectos visuales increíbles pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 156,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Jimena_Salazar_87",
    "comentario": "Mi veredicto: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 451,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Mariana_Silva_77",
    "comentario": "En mi opinión, Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 182,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Camila_Torres_94",
    "comentario": "La vi este fin de semana: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 151,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Valeria_Gomez_49",
    "comentario": "En mi opinión, Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 125,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Patricia_Leon_10",
    "comentario": "La vi este fin de semana: Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 299,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Patricia_Leon_57",
    "comentario": "En mi opinión, Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 63,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Gabriela_Castro_29",
    "comentario": "Crítica personal: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 113,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Gonzalo_Huánuco_70",
    "comentario": "Sinceramente, Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 318,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Paola_Flores_66",
    "comentario": "Mi veredicto: La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 446,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Adriana_Mamani_75",
    "comentario": "En mi opinión, El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 373,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Gabriela_Castro_55",
    "comentario": "Acabo de salir de verla: El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 270,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Gonzalo_Huánuco_31",
    "comentario": "La vi este fin de semana: Una película correcta con altibajos notables, buena para un fin de semana tranquilo.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 145,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Paola_Flores_73",
    "comentario": "Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 354,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Esteban_Cine_14",
    "comentario": "Crítica personal: Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 155,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Andres_Tacna_98",
    "comentario": "Sinceramente, Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 132,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Sofia_Perez_62",
    "comentario": "Crítica personal: La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 104,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Patricia_Leon_53",
    "comentario": "En mi opinión, La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 464,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Patricia_Leon_19",
    "comentario": "Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 148,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Mateo_Vargas_58",
    "comentario": "Acabo de salir de verla: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 367,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Diego_Huancayo_78",
    "comentario": "Crítica personal: Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 336,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Lucia_Rojas_83",
    "comentario": "En mi opinión, Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 444,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Natalia_Vega_44",
    "comentario": "Acabo de salir de verla: Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 105,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Mariana_Silva_78",
    "comentario": "El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 111,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Valeria_Gomez_79",
    "comentario": "Mi veredicto: La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 452,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Milagros_Ramos_62",
    "comentario": "Sinceramente, Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 317,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Sebastian_Lima_73",
    "comentario": "La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 165,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Sofia_Perez_83",
    "comentario": "Acabo de salir de verla: La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 315,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Paola_Flores_22",
    "comentario": "En mi opinión, La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 262,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Sofia_Perez_59",
    "comentario": "Visualmente es un espectáculo, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 463,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Daniela_Rios_49",
    "comentario": "Mi veredicto: Demasiado larga para lo poco que cuenta. El desarrollo se siente tedioso y pesado.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 461,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Milagros_Ramos_13",
    "comentario": "En mi opinión, Terrible experiencia. Una historia mediocre, sin ritmo y con actuaciones pésimas.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 383,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Sofia_Perez_84",
    "comentario": "En mi opinión, El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 60,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Andres_Tacna_15",
    "comentario": "Acabo de salir de verla: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 387,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Diego_Huancayo_43",
    "comentario": "Acabo de salir de verla: El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 286,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Adriana_Mamani_31",
    "comentario": "Mi veredicto: Los primeros 40 minutos son brillantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 460,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Carlos_Mendoza_53",
    "comentario": "La vi este fin de semana: Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 130,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Milagros_Ramos_35",
    "comentario": "Crítica personal: El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 78,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Adriana_Mamani_95",
    "comentario": "Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 274,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Hugo_Cardenas_99",
    "comentario": "Sinceramente, La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 467,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Mateo_Vargas_25",
    "comentario": "En mi opinión, Pésima película, lenta, aburrida, mala y con un guion predecible que da sueño.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 379,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Fernando_Quispe_74",
    "comentario": "En mi opinión, Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 88,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Camila_Torres_65",
    "comentario": "En mi opinión, La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 394,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Claudia_Navarro_73",
    "comentario": "En mi opinión, Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 252,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Rodrigo_Alvarez_97",
    "comentario": "Crítica personal: Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 466,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Valeria_Gomez_94",
    "comentario": "Mi veredicto: Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 265,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Gonzalo_Huánuco_12",
    "comentario": "Mi veredicto: Tiene aspectos visuales increíbles pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 98,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Carlos_Mendoza_78",
    "comentario": "Sinceramente, Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 236,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Rodrigo_Alvarez_11",
    "comentario": "Mi veredicto: La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 39,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Jimena_Salazar_76",
    "comentario": "En mi opinión, Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 344,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Javier_Morales_33",
    "comentario": "Mi veredicto: Buenas actuaciones individuales, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 184,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Milagros_Ramos_96",
    "comentario": "Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 358,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Bruno_Critico_92",
    "comentario": "Mi veredicto: Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 335,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Mariana_Silva_56",
    "comentario": "En mi opinión, La fotografía es excelente pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 49,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Fernando_Quispe_74",
    "comentario": "La vi este fin de semana: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 91,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Fernando_Quispe_69",
    "comentario": "Crítica personal: Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 138,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Lucia_Rojas_52",
    "comentario": "Mi veredicto: El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 362,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Mateo_Vargas_24",
    "comentario": "Crítica personal: Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 80,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Alonso_Paredes_76",
    "comentario": "Sinceramente, Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 74,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Mateo_Vargas_94",
    "comentario": "Sinceramente, La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 158,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Valeria_Gomez_33",
    "comentario": "Acabo de salir de verla: El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 23,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Adriana_Mamani_31",
    "comentario": "Crítica personal: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 264,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Hugo_Cardenas_83",
    "comentario": "En mi opinión, Visualmente es un espectáculo, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 311,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Rodrigo_Alvarez_31",
    "comentario": "Cumple con entretener pero no aporta nada verdaderamente innovador a la fórmula conocida.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 160,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Mateo_Vargas_51",
    "comentario": "La vi este fin de semana: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 121,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Natalia_Vega_67",
    "comentario": "Mi veredicto: El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 369,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Valeria_Gomez_32",
    "comentario": "Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 384,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Paola_Flores_87",
    "comentario": "Mi veredicto: Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 87,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Mariana_Silva_43",
    "comentario": "Sinceramente, La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 302,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Lorena_Cruz_71",
    "comentario": "Mi veredicto: Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 397,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Javier_Morales_58",
    "comentario": "El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 314,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Patricia_Leon_81",
    "comentario": "Mi veredicto: Tiene aspectos visuales increíbles pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 143,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Camila_Torres_42",
    "comentario": "Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 40,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Milagros_Ramos_24",
    "comentario": "El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 288,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Gonzalo_Huánuco_99",
    "comentario": "Mi veredicto: Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 90,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Andres_Tacna_66",
    "comentario": "Sinceramente, Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 147,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Valeria_Gomez_72",
    "comentario": "La vi este fin de semana: Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 408,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Diego_Huancayo_41",
    "comentario": "La vi este fin de semana: Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 114,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Lorena_Cruz_18",
    "comentario": "Crítica personal: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 235,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Javier_Morales_78",
    "comentario": "En mi opinión, Visualmente es un espectáculo, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 142,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Daniela_Rios_73",
    "comentario": "Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 489,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Lorena_Cruz_23",
    "comentario": "Mi veredicto: Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 296,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Alonso_Paredes_95",
    "comentario": "Visualmente es un espectáculo, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 283,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Andres_Tacna_34",
    "comentario": "Sinceramente, Tiene aspectos visuales increíbles pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 415,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Gonzalo_Huánuco_63",
    "comentario": "La vi este fin de semana: Demasiado larga para lo poco que cuenta. El desarrollo se siente tedioso y pesado.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 199,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Carlos_Mendoza_76",
    "comentario": "La vi este fin de semana: Personajes complejos con arcos narrativos redondos y muy bien construidos.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 36,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Mariana_Silva_51",
    "comentario": "El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 310,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Alonso_Paredes_87",
    "comentario": "Acabo de salir de verla: Visualmente es un espectáculo, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 181,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Javier_Morales_57",
    "comentario": "Acabo de salir de verla: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 340,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Milagros_Ramos_39",
    "comentario": "En mi opinión, Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 308,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Diego_Huancayo_61",
    "comentario": "Crítica personal: La fotografía es excelente pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 175,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Daniela_Rios_47",
    "comentario": "Mi veredicto: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 370,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Camila_Torres_13",
    "comentario": "Acabo de salir de verla: Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 268,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Valeria_Gomez_10",
    "comentario": "Mi veredicto: Una experiencia pasable para disfrutar con palomitas, sin llegar a ser una joya imprescindible.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 117,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Andres_Tacna_30",
    "comentario": "Sinceramente, Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 109,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Lucia_Rojas_12",
    "comentario": "En mi opinión, Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 341,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Claudia_Navarro_76",
    "comentario": "Acabo de salir de verla: Se deja ver con agrado aunque no creo que la vuelva a ver una segunda vez.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 488,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Esteban_Cine_78",
    "comentario": "Acabo de salir de verla: Diálogos forzados y actuaciones acartonadas que nunca logran transmitir credibilidad.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 127,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Mariana_Silva_27",
    "comentario": "Mi veredicto: Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 454,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Hugo_Cardenas_87",
    "comentario": "Crítica personal: Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 409,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Gonzalo_Huánuco_38",
    "comentario": "Crítica personal: El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 392,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Sofia_Perez_40",
    "comentario": "Crítica personal: El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 285,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Valeria_Gomez_68",
    "comentario": "En mi opinión, Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 390,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Bruno_Critico_33",
    "comentario": "Sinceramente, Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 402,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Patricia_Leon_45",
    "comentario": "Crítica personal: Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 401,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Adriana_Mamani_85",
    "comentario": "Crítica personal: El exceso de efectos digitales no compensa la ausencia total de una buena narrativa.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 238,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Milagros_Ramos_52",
    "comentario": "Mi veredicto: Los primeros 40 minutos son brillantes, luego la trama pierde algo de fuerza y cohesión.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 294,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Lucia_Rojas_55",
    "comentario": "Tiene momentos muy divertidos e ingeniosos mezclados con escenas que se alargan demasiado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 477,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Jimena_Salazar_37",
    "comentario": "Acabo de salir de verla: Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 187,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Rodrigo_Alvarez_84",
    "comentario": "Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 75,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Alonso_Paredes_49",
    "comentario": "Crítica personal: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 279,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Jimena_Salazar_32",
    "comentario": "Acabo de salir de verla: La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 34,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Renzo_Cinefilo_83",
    "comentario": "Gran fidelidad a la historia con un toque moderno y maduro que se agradece mucho.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 468,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Mateo_Vargas_83",
    "comentario": "Mi veredicto: El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 171,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Jimena_Salazar_26",
    "comentario": "Crítica personal: El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 432,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Natalia_Vega_25",
    "comentario": "Sinceramente, Un desperdicio de presupuesto y talento actoral en una trama genérica y sin alma.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 18,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Fernando_Quispe_14",
    "comentario": "En mi opinión, El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 486,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Andres_Tacna_62",
    "comentario": "La vi este fin de semana: Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 391,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Renzo_Cinefilo_11",
    "comentario": "Mi veredicto: Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 6,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Renzo_Cinefilo_58",
    "comentario": "Crítica personal: La química entre los protagonistas es fantástica y eleva cada escena compartida.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 89,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Mateo_Vargas_99",
    "comentario": "El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 411,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Gonzalo_Huánuco_87",
    "comentario": "Crítica personal: No conecta en ningún nivel emocional. La sensación al salir de la sala fue de indiferencia total.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 214,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Daniela_Rios_65",
    "comentario": "La vi este fin de semana: Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 94,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Lucia_Rojas_32",
    "comentario": "Mi veredicto: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 309,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Claudia_Navarro_30",
    "comentario": "En mi opinión, Buenas actuaciones individuales, aunque el desenlace se sintió algo apresurado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 474,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Camila_Torres_20",
    "comentario": "La vi este fin de semana: Demasiado larga para lo poco que cuenta. El desarrollo se siente tedioso y pesado.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 334,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Camila_Torres_92",
    "comentario": "Acabo de salir de verla: La fotografía es excelente pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 449,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Mariana_Silva_32",
    "comentario": "Crítica personal: Muy mala, salí frustrado del cine por haber gastado dinero en una trama tan aburrida y vacía.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 400,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Daniela_Rios_16",
    "comentario": "Demasiado larga para lo poco que cuenta. El desarrollo se siente tedioso y pesado.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 447,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Rodrigo_Alvarez_26",
    "comentario": "No conecta en ningún nivel emocional. La sensación al salir de la sala fue de indiferencia total.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 64,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Alonso_Paredes_29",
    "comentario": "La vi este fin de semana: El diseño sonoro y la banda sonora en sala de cine te sumergen por completo.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 355,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Sofia_Perez_73",
    "comentario": "La vi este fin de semana: Abusa excesivamente de clichés y fórmulas ya vistas mil veces en el cine comercial.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 51,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Paola_Flores_66",
    "comentario": "Sinceramente, Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 422,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Diego_Huancayo_28",
    "comentario": "El montaje es caótico y el ritmo se corta constantemente sin lograr generar tensión real.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 43,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Daniela_Rios_90",
    "comentario": "Crítica personal: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 196,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Mariana_Silva_13",
    "comentario": "Acabo de salir de verla: Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 356,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Camila_Torres_62",
    "comentario": "En mi opinión, Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 213,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Mariana_Silva_29",
    "comentario": "Sinceramente, El clímax final es épico y emocionante. El cine entero aplaudió al terminar la función.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 410,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Adriana_Mamani_46",
    "comentario": "Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 237,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Renzo_Cinefilo_72",
    "comentario": "La vi este fin de semana: Visualmente es un espectáculo, aunque el guion peca de predecible en varios puntos clave.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 66,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Hugo_Cardenas_12",
    "comentario": "La vi este fin de semana: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 99,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Claudia_Navarro_46",
    "comentario": "En mi opinión, Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 210,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Esteban_Cine_89",
    "comentario": "Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 124,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Paola_Flores_96",
    "comentario": "En mi opinión, Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 65,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Daniela_Rios_44",
    "comentario": "Acabo de salir de verla: Una de las mejores experiencias que he vivido en cartelera este año, imprescindible en pantalla grande.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 399,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Andres_Tacna_54",
    "comentario": "Sinceramente, No conecta en ningún nivel emocional. La sensación al salir de la sala fue de indiferencia total.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 420,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Alejandro_Huanuco_60",
    "comentario": "La vi este fin de semana: Demasiado larga para lo poco que cuenta. El desarrollo se siente tedioso y pesado.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 272,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Diego_Huancayo_36",
    "comentario": "Crítica personal: La banda sonora sobresale mucho más que la historia en sí, dejando sensaciones encontradas.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 224,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Fernando_Quispe_16",
    "comentario": "Crítica personal: Visualmente deslumbrante y emocionalmente desgarradora. Me dejó pensando horas después.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 442,
    "tmdb_movie_id": 438631,
    "titulo_pelicula": "Dune",
    "nombre_usuario": "Fernando_Quispe_54",
    "comentario": "Mi veredicto: Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 436,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Rodrigo_Alvarez_16",
    "comentario": "Sinceramente, Muy decepcionante. El guion es confuso, plano y con huecos argumentales notorios.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 19,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Gonzalo_Huánuco_60",
    "comentario": "Crítica personal: Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 312,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Renzo_Cinefilo_31",
    "comentario": "Mi veredicto: Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 144,
    "tmdb_movie_id": 693134,
    "titulo_pelicula": "Dune: Parte Dos",
    "nombre_usuario": "Diego_Huancayo_51",
    "comentario": "La vi este fin de semana: Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 33,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Javier_Morales_94",
    "comentario": "La vi este fin de semana: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 126,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Sebastian_Lima_76",
    "comentario": "Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 195,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Valeria_Gomez_50",
    "comentario": "Mi veredicto: Una obra de arte cinematográfica, la cinematografía y la ambientación son impecables.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 1,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Lucia_Rojas_36",
    "comentario": "Mi veredicto: Un balance extraordinario entre drama, tensión y momentos de puro espectáculo cinematográfico.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 193,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Lorena_Cruz_26",
    "comentario": "Acabo de salir de verla: Innovadora, fresca y con una propuesta visual que redefine los estándares del género.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 459,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Lorena_Cruz_67",
    "comentario": "Personajes sin carisma ni desarrollo que hacen que no te importe lo que les suceda.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 345,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Jimena_Salazar_28",
    "comentario": "Sinceramente, Para fanáticos del género resultará satisfactoria, pero para el público general puede ser densa.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 250,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Mateo_Vargas_68",
    "comentario": "Sinceramente, Tiene momentos muy divertidos e ingeniosos mezclados con escenas que se alargan demasiado.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 120,
    "tmdb_movie_id": 872585,
    "titulo_pelicula": "Oppenheimer",
    "nombre_usuario": "Carlos_Mendoza_87",
    "comentario": "Sinceramente, Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 457,
    "tmdb_movie_id": 569094,
    "titulo_pelicula": "Spider-Man: A través del Spider-Verso",
    "nombre_usuario": "Mariana_Silva_56",
    "comentario": "Acabo de salir de verla: Prometía mucho en los avances pero el resultado final fue aburrido y predecible.",
    "puntaje": 2,
    "sentimiento": "negativo"
  },
  {
    "id": 204,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Bruno_Critico_37",
    "comentario": "La vi este fin de semana: Magistral dirección y un ritmo que no decae en ningún momento. Totalmente recomendada.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 247,
    "tmdb_movie_id": 889737,
    "titulo_pelicula": "Joker: Folie à Deux",
    "nombre_usuario": "Claudia_Navarro_88",
    "comentario": "La fotografía es excelente pero no logré conectar del todo con la motivación de los personajes.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 56,
    "tmdb_movie_id": 945961,
    "titulo_pelicula": "Alien: Romulus",
    "nombre_usuario": "Bruno_Critico_71",
    "comentario": "Mi veredicto: Efectos visuales de altísimo nivel. Sin duda vale cada centavo de la entrada.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 200,
    "tmdb_movie_id": 1022789,
    "titulo_pelicula": "Intensa-Mente 2",
    "nombre_usuario": "Gabriela_Castro_75",
    "comentario": "Crítica personal: La atmósfera envolvente y el trabajo de fotografía justifican verla en la mejor sala disponible.",
    "puntaje": 4,
    "sentimiento": "positivo"
  },
  {
    "id": 137,
    "tmdb_movie_id": 763215,
    "titulo_pelicula": "Damsel",
    "nombre_usuario": "Daniela_Rios_73",
    "comentario": "Crítica personal: Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 329,
    "tmdb_movie_id": 558449,
    "titulo_pelicula": "Gladiator II",
    "nombre_usuario": "Esteban_Cine_13",
    "comentario": "Sinceramente, Tiene aspectos visuales increíbles pero el ritmo se vuelve algo lento en el segundo acto.",
    "puntaje": 3,
    "sentimiento": "neutral"
  },
  {
    "id": 48,
    "tmdb_movie_id": 346698,
    "titulo_pelicula": "Barbie",
    "nombre_usuario": "Alonso_Paredes_89",
    "comentario": "Guion sumamente inteligente que te mantiene al borde del asiento durante todo el metraje.",
    "puntaje": 5,
    "sentimiento": "positivo"
  },
  {
    "id": 445,
    "tmdb_movie_id": 533535,
    "titulo_pelicula": "Deadpool & Wolverine",
    "nombre_usuario": "Diego_Huancayo_80",
    "comentario": "Mi veredicto: Sinceramente no vale la pena pagar la entrada en sala de cine, mejor esperar a streaming.",
    "puntaje": 1,
    "sentimiento": "negativo"
  },
  {
    "id": 12,
    "tmdb_movie_id": 933260,
    "titulo_pelicula": "La Sustancia",
    "nombre_usuario": "Javier_Morales_45",
    "comentario": "Acabo de salir de verla: Superó todas mis expectativas. Las actuaciones principales transmiten una emoción inmensa.",
    "puntaje": 5,
    "sentimiento": "positivo"
  }
];
