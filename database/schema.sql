-- ==============================================================================
-- PROYECTO: CinePlus - Plataforma Web Jamstack
-- BASE DE DATOS: Supabase (PostgreSQL 15+)
-- ARCHIVO: database/schema.sql
-- DESCRIPCIÓN: Estructura relacional, índices B-Tree, políticas RLS y datos semilla.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. LIMPIEZA IDEMPOTENTE (Permite ejecutar el script varias veces sin errores)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS resenas CASCADE;
DROP TABLE IF EXISTS funciones CASCADE;
DROP TABLE IF EXISTS cines CASCADE;

-- ------------------------------------------------------------------------------
-- 2. TABLA: cines (Sedes físicas con geolocalización para Google Maps)
-- ------------------------------------------------------------------------------
CREATE TABLE cines (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    cadena VARCHAR(60) NOT NULL,
    direccion VARCHAR(250) NOT NULL,
    ciudad VARCHAR(100) DEFAULT 'Bogotá',
    latitud NUMERIC(10, 6) NOT NULL,
    longitud NUMERIC(10, 6) NOT NULL,
    telefono VARCHAR(30),
    sitio_web VARCHAR(255),
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 3. TABLA: funciones (Cartelera, salas y horarios por película de TMDb)
-- ------------------------------------------------------------------------------
CREATE TABLE funciones (
    id SERIAL PRIMARY KEY,
    tmdb_movie_id INT NOT NULL,                  -- ID oficial de la película en TMDb
    cine_id INT NOT NULL REFERENCES cines(id) ON DELETE CASCADE,
    hora VARCHAR(10) NOT NULL,                   -- Ej: '16:30', '19:00', '21:45'
    sala VARCHAR(60) DEFAULT 'Sala Estándar',    -- Ej: 'Sala IMAX', 'Sala 3D Macro'
    formato VARCHAR(20) DEFAULT '2D',            -- '2D', '3D', 'IMAX', '4DX'
    idioma VARCHAR(30) DEFAULT 'Doblada',        -- 'Doblada', 'Subtitulada', 'Original'
    precio NUMERIC(8, 2) DEFAULT 18000.00,       -- Precio en moneda local
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
-- Habilitación de RLS en todas las entidades
ALTER TABLE cines ENABLE ROW LEVEL SECURITY;
ALTER TABLE funciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE resenas ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública (Cualquier visitante anónimo puede ver cines, funciones y críticas)
CREATE POLICY "Lectura publica de cines" 
ON cines FOR SELECT 
USING (true);

CREATE POLICY "Lectura publica de funciones" 
ON funciones FOR SELECT 
USING (true);

CREATE POLICY "Lectura publica de resenas" 
ON resenas FOR SELECT 
USING (true);

-- Política de inserción pública de críticas (Visitantes pueden opinar con validación)
CREATE POLICY "Insercion publica de resenas validada" 
ON resenas FOR INSERT 
WITH CHECK (
    puntaje >= 1 AND puntaje <= 5 AND
    length(trim(nombre_usuario)) >= 2 AND
    length(trim(comentario)) >= 5
);

-- ------------------------------------------------------------------------------
-- 7. DATOS SEMILLA: CINES REALES CON COORDENADAS GPS
-- ------------------------------------------------------------------------------
INSERT INTO cines (nombre, cadena, direccion, ciudad, latitud, longitud, telefono, sitio_web) VALUES
(
    'Cine Colombia Titán Plaza', 
    'Cine Colombia', 
    'Av. Boyacá # 80-94, C.C. Titán Plaza', 
    'Bogotá', 
    4.695780, 
    -74.086430, 
    '+57 601 7420101', 
    'https://www.cinecolombia.com'
),
(
    'Cinépolis Gran Estación', 
    'Cinépolis', 
    'Calle 26 # 62-47, C.C. Gran Estación', 
    'Bogotá', 
    4.646840, 
    -74.103970, 
    '+57 601 5936300', 
    'https://www.cinepolis.com.co'
),
(
    'Cinemark Multiplaza', 
    'Cinemark', 
    'Av. Boyacá # 13-05, C.C. Multiplaza', 
    'Bogotá', 
    4.652150, 
    -74.128790, 
    '+57 601 7443462', 
    'https://www.cinemark.com.co'
),
(
    'Cine Colombia Unicentro', 
    'Cine Colombia', 
    'Av. 15 # 124-30, C.C. Unicentro', 
    'Bogotá', 
    4.702580, 
    -74.041690, 
    '+57 601 7420101', 
    'https://www.cinecolombia.com'
),
(
    'Cinépolis Plaza Central', 
    'Cinépolis', 
    'Carrera 65 # 11-50, C.C. Plaza Central', 
    'Bogotá', 
    4.632410, 
    -74.116520, 
    '+57 601 5936300', 
    'https://www.cinepolis.com.co'
);

-- ------------------------------------------------------------------------------
-- 8. DATOS SEMILLA: FUNCIONES (Vinculadas a IDs reales de TMDb)
-- ------------------------------------------------------------------------------
-- Película: Dune Parte 1 (TMDb ID: 438631)
INSERT INTO funciones (tmdb_movie_id, cine_id, hora, sala, formato, idioma, precio) VALUES
(438631, 1, '15:00', 'Sala IMAX Mega', 'IMAX', 'Subtitulada', 24000.00),
(438631, 1, '18:30', 'Sala IMAX Mega', 'IMAX', 'Subtitulada', 24000.00),
(438631, 1, '21:45', 'Sala 2 General', '2D', 'Doblada', 17000.00),
(438631, 2, '16:00', 'Sala 4 MacroXE', '2D', 'Subtitulada', 21000.00),
(438631, 2, '19:30', 'Sala VIP 1', '2D', 'Subtitulada', 32000.00),
(438631, 3, '17:15', 'Sala XD 3D', '3D', 'Doblada', 22000.00);

-- Película: Dune Parte 2 (TMDb ID: 693134)
INSERT INTO funciones (tmdb_movie_id, cine_id, hora, sala, formato, idioma, precio) VALUES
(693134, 1, '14:30', 'Sala IMAX Mega', 'IMAX', 'Subtitulada', 26000.00),
(693134, 1, '18:00', 'Sala IMAX Mega', 'IMAX', 'Subtitulada', 26000.00),
(693134, 1, '21:30', 'Sala IMAX Mega', 'IMAX', 'Subtitulada', 26000.00),
(693134, 2, '16:45', 'Sala 1', '2D', 'Doblada', 18000.00),
(693134, 2, '20:15', 'Sala VIP 2', '2D', 'Subtitulada', 34000.00),
(693134, 4, '15:30', 'Sala Dinamix 4D', '4DX', 'Subtitulada', 28000.00),
(693134, 4, '19:00', 'Sala Dinamix 4D', '4DX', 'Subtitulada', 28000.00);

-- Película: Inside Out 2 / Intensamente 2 (TMDb ID: 1022789)
INSERT INTO funciones (tmdb_movie_id, cine_id, hora, sala, formato, idioma, precio) VALUES
(1022789, 2, '13:00', 'Sala Junior', '2D', 'Doblada', 16000.00),
(1022789, 2, '15:20', 'Sala Junior', '2D', 'Doblada', 16000.00),
(1022789, 2, '17:40', 'Sala 3 MacroXE', '3D', 'Doblada', 20000.00),
(1022789, 3, '14:15', 'Sala 2', '2D', 'Doblada', 15000.00),
(1022789, 3, '16:30', 'Sala 2', '2D', 'Doblada', 15000.00),
(1022789, 5, '15:00', 'Sala 1', '2D', 'Doblada', 15000.00),
(1022789, 5, '17:15', 'Sala 1', '2D', 'Doblada', 15000.00);

-- Película: Deadpool & Wolverine (TMDb ID: 533535)
INSERT INTO funciones (tmdb_movie_id, cine_id, hora, sala, formato, idioma, precio) VALUES
(533535, 1, '16:20', 'Sala 3', '2D', 'Doblada', 18000.00),
(533535, 1, '19:10', 'Sala 3', '2D', 'Subtitulada', 18000.00),
(533535, 1, '22:00', 'Sala 3', '2D', 'Subtitulada', 18000.00),
(533535, 3, '18:00', 'Sala XD', '3D', 'Subtitulada', 23000.00),
(533535, 3, '21:00', 'Sala XD', '3D', 'Subtitulada', 23000.00),
(533535, 4, '17:45', 'Sala 5', '2D', 'Subtitulada', 19000.00);

-- Película: The Substance / La Sustancia (TMDb ID: 933260)
INSERT INTO funciones (tmdb_movie_id, cine_id, hora, sala, formato, idioma, precio) VALUES
(933260, 1, '19:45', 'Sala 5 Arte', '2D', 'Subtitulada', 20000.00),
(933260, 1, '22:30', 'Sala 5 Arte', '2D', 'Subtitulada', 20000.00),
(933260, 4, '20:30', 'Sala 2', '2D', 'Subtitulada', 19000.00);

-- ------------------------------------------------------------------------------
-- 9. DATOS SEMILLA: RESEÑAS DE EJEMPLO
-- ------------------------------------------------------------------------------
INSERT INTO resenas (tmdb_movie_id, nombre_usuario, comentario, puntaje, creado_en) VALUES
(
    438631, 
    'María González', 
    'Una obra maestra visual y sonora. La dirección de Denis Villeneuve y la fotografía de Greig Fraser crean una experiencia inmersiva sin precedentes en la ciencia ficción moderna.', 
    5, 
    NOW() - INTERVAL '3 days'
),
(
    438631, 
    'Carlos Ruiz', 
    'La adaptación más fiel y cinematográfica de la novela de Frank Herbert. El diseño sonoro de Hans Zimmer en cines es simplemente imponente.', 
    4, 
    NOW() - INTERVAL '2 days'
),
(
    693134, 
    'Alejandro Peña', 
    'Superó todas mis expectativas. El arco narrativo de Paul y las escenas en el desierto de Arrakis elevan la saga al nivel de El Señor de los Anillos.', 
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
    'David Morales', 
    'Excelente representación de la ansiedad y los cambios emocionales en la adolescencia. Divertida para niños y conmovedora para adultos.', 
    5, 
    NOW() - INTERVAL '8 hours'
),
(
    533535, 
    'Sebastián Torres', 
    'Puro entretenimiento, acción desenfrenada y química insuperable entre Ryan Reynolds y Hugh Jackman. Los cameos fueron espectaculares.', 
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
