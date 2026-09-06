-- ==============================================================================
-- PROYECTO: CinePlus - Plataforma Web Jamstack
-- BASE DE DATOS: Supabase (PostgreSQL 15+)
-- ARCHIVO: database/schema.sql
-- DESCRIPCIÓN: Estructura relacional, índices B-Tree, políticas RLS y datos semilla peruanos.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. LIMPIEZA IDEMPOTENTE (Permite ejecutar el script varias veces sin errores)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS resenas CASCADE;
DROP TABLE IF EXISTS funciones CASCADE;
DROP TABLE IF EXISTS cines CASCADE;

-- ------------------------------------------------------------------------------
-- 2. TABLA: cines (Sedes físicas reales de Perú con geolocalización satelital)
-- ------------------------------------------------------------------------------
CREATE TABLE cines (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    cadena VARCHAR(60) NOT NULL,
    direccion VARCHAR(250) NOT NULL,
    ciudad VARCHAR(100) DEFAULT 'Huánuco',
    latitud NUMERIC(10, 6) NOT NULL,
    longitud NUMERIC(10, 6) NOT NULL,
    telefono VARCHAR(30),
    sitio_web VARCHAR(255),
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 3. TABLA: funciones (Cartelera, salas y horarios por película de TMDb en Soles)
-- ------------------------------------------------------------------------------
CREATE TABLE funciones (
    id SERIAL PRIMARY KEY,
    tmdb_movie_id INT NOT NULL,                  -- ID oficial de la película en TMDb
    cine_id INT NOT NULL REFERENCES cines(id) ON DELETE CASCADE,
    hora VARCHAR(10) NOT NULL,                   -- Ej: '16:30', '19:00', '21:45'
    sala VARCHAR(60) DEFAULT 'Sala Estándar',    -- Ej: 'Sala Xtreme', 'Sala XD 3D'
    formato VARCHAR(20) DEFAULT '2D',            -- '2D', '3D', 'IMAX', '4DX'
    idioma VARCHAR(30) DEFAULT 'Doblada',        -- 'Doblada', 'Subtitulada', 'Original'
    precio NUMERIC(8, 2) DEFAULT 22.00,          -- Precio en Soles Peruanos (S/.)
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 4. TABLA: resenas (Comentarios y valoraciones persistentes de usuarios)
-- ------------------------------------------------------------------------------
CREATE TABLE resenas (
    id SERIAL PRIMARY KEY,
    tmdb_movie_id INT NOT NULL,                  -- ID oficial de la película en TMDb
    nombre_usuario VARCHAR(100) NOT NULL,
    comentario TEXT NOT NULL,
    puntaje INT NOT NULL CHECK (puntaje BETWEEN 1 AND 5),
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 5. ÍNDICES DE RENDIMIENTO (B-Tree para consultas ultrarrápidas)
-- ------------------------------------------------------------------------------
CREATE INDEX idx_funciones_tmdb_movie_id ON funciones(tmdb_movie_id);
CREATE INDEX idx_funciones_cine_id ON funciones(cine_id);
CREATE INDEX idx_resenas_tmdb_movie_id ON resenas(tmdb_movie_id);
CREATE INDEX idx_resenas_creado_en ON resenas(creado_en DESC);
CREATE INDEX idx_cines_coords ON cines(latitud, longitud);

-- ------------------------------------------------------------------------------
-- 6. SEGURIDAD: ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------------------------
ALTER TABLE cines ENABLE ROW LEVEL SECURITY;
ALTER TABLE funciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE resenas ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública (Cualquier visitante puede ver cines, funciones y críticas)
CREATE POLICY "Lectura publica de cines" 
ON cines FOR SELECT 
USING (true);

CREATE POLICY "Lectura publica de funciones" 
ON funciones FOR SELECT 
USING (true);

CREATE POLICY "Lectura publica de resenas" 
ON resenas FOR SELECT 
USING (true);

-- Política de inserción pública de críticas con validación estricta
CREATE POLICY "Insercion publica de resenas validada" 
ON resenas FOR INSERT 
WITH CHECK (
    puntaje >= 1 AND puntaje <= 5 AND
    length(trim(nombre_usuario)) >= 2 AND
    length(trim(comentario)) >= 5
);

-- ------------------------------------------------------------------------------
-- 7. DATOS SEMILLA: CINES REALES DE PERÚ (Huánuco, Huancayo, Tacna, Lima)
-- ------------------------------------------------------------------------------
INSERT INTO cines (id, nombre, cadena, direccion, ciudad, latitud, longitud, telefono, sitio_web) VALUES
(
    1,
    'Cineplanet Real Plaza Huánuco', 
    'Cineplanet', 
    'Jr. Dos de Mayo 1380, C.C. Real Plaza', 
    'Huánuco', 
    -9.919142, 
    -76.240990, 
    '+51 1 624 9500', 
    'https://www.cineplanet.com.pe'
),
(
    2,
    'Cinemark Open Plaza Huánuco', 
    'Cinemark', 
    'Jr. 2 de Mayo 125, C.C. Open Plaza', 
    'Huánuco', 
    -9.938460, 
    -76.247630, 
    '+51 1 610 0800', 
    'https://www.cinemark-peru.com'
),
(
    3,
    'Cineplanet Real Plaza Huancayo', 
    'Cineplanet', 
    'Av. Ferrocarril 1035, Huancayo', 
    'Huancayo', 
    -12.067120, 
    -75.210340, 
    '+51 1 624 9500', 
    'https://www.cineplanet.com.pe'
),
(
    4,
    'Cinemark Mall Aventura Huancayo', 
    'Cinemark', 
    'Av. Ferrocarril con Jr. San Carlos, Huancayo', 
    'Huancayo', 
    -12.052410, 
    -75.228140, 
    '+51 1 610 0800', 
    'https://www.cinemark-peru.com'
),
(
    5,
    'Cineplanet Tacna', 
    'Cineplanet', 
    'Av. Prolongación Pinto 1300, Tacna', 
    'Tacna', 
    -18.018442, 
    -70.252969, 
    '+51 1 624 9500', 
    'https://www.cineplanet.com.pe'
),
(
    6,
    'Cinestar Tacna', 
    'Cine Star', 
    'Av. Bolognesi 780, Tacna', 
    'Tacna', 
    -18.013695, 
    -70.237107, 
    '+51 1 719 0900', 
    'https://www.cinestar.com.pe'
),
(
    7,
    'Cineplanet San Miguel', 
    'Cineplanet', 
    'Av. La Marina 2000, San Miguel', 
    'Lima', 
    -12.076800, 
    -77.081500, 
    '+51 1 624 9500', 
    'https://www.cineplanet.com.pe'
),
(
    8,
    'Cinemark Jockey Plaza', 
    'Cinemark', 
    'Av. Javier Prado Este 4200, Surco', 
    'Lima', 
    -12.084910, 
    -76.975748, 
    '+51 1 610 0800', 
    'https://www.cinemark-peru.com'
);

-- Reiniciar la secuencia de ID de cines
SELECT setval('cines_id_seq', (SELECT MAX(id) FROM cines));

-- ------------------------------------------------------------------------------
-- 8. DATOS SEMILLA: FUNCIONES EN SOLES PERUANOS (S/.)
-- ------------------------------------------------------------------------------
-- Película: Dune Parte 1 (TMDb ID: 438631)
INSERT INTO funciones (tmdb_movie_id, cine_id, hora, sala, formato, idioma, precio) VALUES
(438631, 1, '15:00', 'Sala Xtreme', '2D', 'Doblada', 22.00),
(438631, 1, '18:30', 'Sala Xtreme', '3D', 'Subtitulada', 26.00),
(438631, 1, '21:45', 'Sala 2 General', '2D', 'Doblada', 18.00),
(438631, 2, '16:00', 'Sala XD', '2D', 'Subtitulada', 24.00),
(438631, 2, '19:30', 'Sala Premier', '2D', 'Subtitulada', 28.00),
(438631, 5, '17:15', 'Sala 1', '2D', 'Doblada', 18.00);

-- Película: Dune Parte 2 (TMDb ID: 693134)
INSERT INTO funciones (tmdb_movie_id, cine_id, hora, sala, formato, idioma, precio) VALUES
(693134, 1, '14:30', 'Sala Xtreme', '2D', 'Doblada', 24.00),
(693134, 1, '18:00', 'Sala Xtreme', '3D', 'Subtitulada', 28.00),
(693134, 1, '21:30', 'Sala 3', '2D', 'Subtitulada', 20.00),
(693134, 2, '16:45', 'Sala XD', '2D', 'Doblada', 24.00),
(693134, 2, '20:15', 'Sala XD 3D', '3D', 'Subtitulada', 29.00),
(693134, 5, '15:30', 'Sala 2', '2D', 'Doblada', 19.00),
(693134, 6, '19:00', 'Sala Star', '2D', 'Subtitulada', 16.00);

-- Película: Inside Out 2 / Intensamente 2 (TMDb ID: 1022789)
INSERT INTO funciones (tmdb_movie_id, cine_id, hora, sala, formato, idioma, precio) VALUES
(1022789, 1, '13:00', 'Sala 1', '2D', 'Doblada', 18.00),
(1022789, 1, '15:20', 'Sala 1', '2D', 'Doblada', 18.00),
(1022789, 1, '17:40', 'Sala 2', '3D', 'Doblada', 22.00),
(1022789, 2, '14:15', 'Sala 3', '2D', 'Doblada', 18.00),
(1022789, 2, '16:30', 'Sala 3', '2D', 'Doblada', 18.00),
(1022789, 5, '15:00', 'Sala 1', '2D', 'Doblada', 17.00),
(1022789, 6, '17:15', 'Sala 2', '2D', 'Doblada', 15.00);

-- Película: Deadpool & Wolverine (TMDb ID: 533535)
INSERT INTO funciones (tmdb_movie_id, cine_id, hora, sala, formato, idioma, precio) VALUES
(533535, 1, '16:20', 'Sala 4', '2D', 'Doblada', 20.00),
(533535, 1, '19:10', 'Sala 4', '2D', 'Subtitulada', 20.00),
(533535, 1, '22:00', 'Sala 4', '2D', 'Subtitulada', 20.00),
(533535, 2, '18:00', 'Sala XD', '3D', 'Subtitulada', 26.00),
(533535, 2, '21:00', 'Sala XD', '3D', 'Subtitulada', 26.00),
(533535, 5, '17:45', 'Sala 3', '2D', 'Subtitulada', 19.00);

-- Película: The Substance / La Sustancia (TMDb ID: 933260)
INSERT INTO funciones (tmdb_movie_id, cine_id, hora, sala, formato, idioma, precio) VALUES
(933260, 1, '19:45', 'Sala 2', '2D', 'Subtitulada', 20.00),
(933260, 1, '22:30', 'Sala 2', '2D', 'Subtitulada', 20.00),
(933260, 2, '20:30', 'Sala 1', '2D', 'Subtitulada', 22.00);

-- ------------------------------------------------------------------------------
-- 9. DATOS SEMILLA: RESEÑAS DE EJEMPLO
-- ------------------------------------------------------------------------------
INSERT INTO resenas (tmdb_movie_id, nombre_usuario, comentario, puntaje, creado_en) VALUES
(
    438631, 
    'María González (Huánuco)', 
    'Una obra maestra visual y sonora. La vi en Cineplanet Huánuco y la experiencia fue impresionante.', 
    5, 
    NOW() - INTERVAL '3 days'
),
(
    438631, 
    'Carlos Ruiz (Pasco)', 
    'Bajé a Huánuco solo para verla en pantalla grande. El diseño sonoro de Hans Zimmer es simplemente brutal.', 
    4, 
    NOW() - INTERVAL '2 days'
),
(
    693134, 
    'Alejandro Peña', 
    'Superó todas mis expectativas. Las escenas en el desierto de Arrakis elevan la saga al nivel de El Señor de los Anillos.', 
    5, 
    NOW() - INTERVAL '1 day'
),
(
    693134, 
    'Valentina Castro', 
    'Actuaciones magistrales de Timothée Chalamet y Zendaya. Austin Butler como Feyd-Rautha es aterrador y brillante.', 
    5, 
    NOW() - INTERVAL '12 hours'
),
(
    1022789, 
    'David Morales (Huancayo)', 
    'Excelente representación de la ansiedad y los cambios emocionales en la adolescencia. Muy divertida.', 
    5, 
    NOW() - INTERVAL '8 hours'
),
(
    533535, 
    'Sebastián Torres (Tacna)', 
    'Puro entretenimiento, acción desenfrenada y química insuperable entre Ryan Reynolds y Hugh Jackman.', 
    4, 
    NOW() - INTERVAL '5 hours'
),
(
    933260, 
    'Camila Ortiz', 
    'Una sátira visceral y perturbadora sobre la obsesión por la juventud. Demi Moore y Margaret Qualley están fenomenales.', 
    5, 
    NOW() - INTERVAL '2 hours'
);

-- Fin del script
