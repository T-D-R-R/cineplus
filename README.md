# 🎬 CinePlus - Plataforma Web Dinámica de Cine, Reseñas y Geolocalización

[![React 19](https://img.shields.io/badge/React-19.2-61dafb?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.2-646cff?logo=vite&logoColor=white)](https://vite.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_15+-3ecf8e?logo=supabase&logoColor=white)](https://supabase.com)
[![TMDb API](https://img.shields.io/badge/TMDb_API-v3_Official-01b4e4?logo=themoviedatabase&logoColor=white)](https://developer.themoviedb.org)

**CinePlus** es una plataforma web moderna desarrollada bajo una **arquitectura Serverless / Jamstack**, que transforma una maqueta estática de cine en una aplicación interactiva, viva y permanente (disponibilidad 24/7 sin servidores backend que se duerman).

---

## 🏛️ Arquitectura del Sistema

```
                                  ┌──▶ TMDb API v3 (Cartelera, detalles, actores, trailers YouTube)
                                  │
[Navegador / Evaluador / Usuario] ┼──▶ Supabase (PostgreSQL 15+ con RLS: Críticas, cines y horarios)
(React 19 + TypeScript + Tailwind)│
                                  └──▶ Google Maps Platform / Modo Demo (Sedes y distancias en km)
```

---

## 📐 Clean Architecture, SOLID y Programación Orientada a Objetos

El código fuente está estructurado de forma modular y desacoplada, aplicando los principios **SOLID** y **Herencia profunda**:

### Jerarquías de Herencia (`extends`)

1. **Entidades de Dominio (`src/domain/`):**
   * `BaseEntity`: Clase base abstracta universal (`id`, `createdAt`, `toJson()`, validación).
   * `Movie extends BaseEntity`: Métodos de cálculo de estrellas, generación de pósters en alta resolución y extracción de trailers.
   * `Review extends BaseEntity`: Validación estricta de críticas (1 a 5 estrellas) y formateo de fechas relativas.
   * `Cinema extends BaseEntity`: Cálculo de distancias geográficas exactas (fórmula de Haversine) y enlaces a mapas.
   * `Showtime extends BaseEntity`: Horarios, salas y precios formateados en moneda local.

2. **Servicios de Red (`src/services/`):**
   * `BaseApiService`: Cliente HTTP abstracto con control de excepciones tipado (`ApiException`), timeouts y parseo seguro.
   * `TmdbService extends BaseApiService`: Consumo de la API oficial v3 según la documentación de [developer.themoviedb.org/reference/getting-started](https://developer.themoviedb.org/reference/getting-started).
   * `SupabaseService extends BaseApiService`: Operaciones sobre la base de datos relacional con políticas RLS.

3. **Proveedores de Mapas (Liskov Substitution Principle - LSP):**
   * `BaseMapProvider`: Contrato base de mapa (`initialize`, `renderUserMarker`, `renderCinemaMarkers`, `centerOn`).
   * `GoogleMapsProvider extends BaseMapProvider`: Implementación con el SDK oficial de Google Maps Platform.
   * `DemoMapsProvider extends BaseMapProvider`: Implementación interactiva demostrativa que garantiza 100% de operatividad sin requerir claves de Google Cloud.

4. **Capa de Aplicación (`src/hooks/`):**
   * `useMovies`: Búsqueda reactiva con **debounce de 350ms**, cartelera y paginación.
   * `useMovieDetail`: Ficha técnica completa, reparto y reproductor de tráiler.
   * `useReviews`: Consulta e inserción de críticas en Supabase con actualización optimista.
   * `useCinemas`: Geolocalización del navegador y cálculo de proximidad a cada sala.

---

## 🚀 Inicio Rápido en Desarrollo Local

### 1. Requisitos Previos
* [Node.js](https://nodejs.org/) v18+ (probado en v24.16.0).
* [pnpm](https://pnpm.io/) o npm.

### 2. Instalación de Dependencias
```bash
pnpm install
# o con npm:
npm install
```

### 3. Configurar Variables de Entorno
Copia el archivo `.env.example` a `.env.local`:
```bash
cp .env.example .env.local
```

Edita `.env.local` y agrega tus claves (la app funcionará en modo demo inteligente si se dejan vacías):
```env
VITE_TMDB_API_KEY=tu_clave_de_tmdb
VITE_SUPABASE_URL=https://tu_proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_supabase
VITE_GOOGLE_MAPS_API_KEY=tu_clave_google_maps_opcional
```

### 4. Ejecutar Servidor Local
```bash
pnpm run dev
```
Abre tu navegador en: `http://localhost:5173/`

### 5. Compilar para Producción
```bash
pnpm run build
```
Genera la carpeta optimizada `dist/` con 0 errores de TypeScript.

---

## 🗄️ Base de Datos: Supabase (PostgreSQL)

El script SQL completo y normalizado se encuentra en:
👉 [`database/schema.sql`](database/schema.sql)

Para configurarlo en 2 minutos:
1. Abre tu panel en [supabase.com](https://supabase.com/).
2. Ve al **SQL Editor**, copia y pega el contenido de `database/schema.sql` y presiona **Run**.
3. Consulta la guía detallada en [`database/README_SUPABASE.md`](database/README_SUPABASE.md).

---

## 🌐 Despliegue 24/7 en la Nube (Vercel / Netlify)

El proyecto incluye:
* [`vercel.json`](vercel.json): Configuración de reescrituras SPA para Vercel.
* [`public/_redirects`](public/_redirects): Regla de enrutamiento para Netlify.

Consulta la guía paso a paso en:
👉 [`DEPLOYMENT.md`](DEPLOYMENT.md)

---

## 📁 Archivo Histórico de la Maqueta Previa
Los archivos HTML y CSS estáticos iniciales de la maqueta previa fueron preservados intactos en la carpeta:
👉 [`legacy_mockup/`](legacy_mockup/)
