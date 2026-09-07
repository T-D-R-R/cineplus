# 🎬 CinePlus - Plataforma Web Jamstack de Cine, Reseñas y Geolocalización en Tiempo Real

[![React 19](https://img.shields.io/badge/React-19.2-61dafb?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.2-646cff?logo=vite&logoColor=white)](https://vite.dev)
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-6.0_Strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_15+-3ecf8e?logo=supabase&logoColor=white)](https://supabase.com)
[![TMDb API](https://img.shields.io/badge/TMDb_API-v3_Official-01b4e4?logo=themoviedatabase&logoColor=white)](https://developer.themoviedb.org)
[![Google Maps](https://img.shields.io/badge/Google_Maps-Platform-ea4335?logo=googlemaps&logoColor=white)](https://developers.google.com/maps)

**CinePlus** es una plataforma web completa desarrollada bajo una **Arquitectura Serverless / Jamstack** de alto rendimiento y **Clean Architecture**. La aplicación conecta datos en vivo de la base de datos cinematográfica global (**TMDb**), persistencia relacional con políticas de seguridad RLS en **Supabase (PostgreSQL 15+)**, y geolocalización satelital en tiempo real con **Google Maps Platform** para ubicar salas de cine comerciales en Perú (Huánuco, Huancayo, Lima, Tacna, etc.).

---

## 🌐 Despliegue en Vivo (Producción 24/7)

Si desea evaluar la aplicación desplegada y funcionando en internet sin necesidad de instalar nada en su máquina local, puede ingresar directamente a:

🔗 **Enlace de Producción en Vercel:** [https://cineplus-psi.vercel.app](https://cineplus-psi.vercel.app)

---

## 📋 Requisitos Previos del Sistema

Para ejecutar el proyecto de forma local desde este archivo comprimido, su ordenador debe contar con:

1. **Node.js**: Versión **18.0.0** o superior (recomendado Node 20.x, 22.x o 24.x).
   * Verifique su versión ejecutando: `node -v`
2. **Gestor de Paquetes**: `npm` (incluido por defecto con Node.js) o `pnpm`.
   * Verifique ejecutando: `npm -v`
3. **Navegador Web**: Google Chrome, Microsoft Edge, Mozilla Firefox, Brave o Safari.

---

## 🚀 Guía de Instalación y Ejecución Paso a Paso

Siga estos sencillos pasos para levantar el proyecto en su entorno local:

### Paso 1: Descomprimir el Archivo
Extraiga el contenido del archivo `.rar` o `.zip` en la carpeta de su preferencia en su equipo.

---

### Paso 2: Abrir una Terminal en la Carpeta del Proyecto
Abra su terminal (PowerShell, CMD, Bash o Terminal de VS Code) y asegúrese de estar ubicado en la raíz del proyecto (donde se encuentra el archivo `package.json`).

```bash
# Ejemplo:
cd ruta/a/tu/carpeta/cineplus
```

---

### Paso 3: Instalar las Dependencias
Ejecute el siguiente comando para instalar automáticamente todas las librerías del proyecto:

```bash
npm install
```
*(Si utiliza `pnpm`, puede ejecutar simplemente: `pnpm install`)*

---

### Paso 4: Configuración de Variables de Entorno

En la raíz del proyecto encontrará un archivo llamado `.env.example`. Cree una copia de este archivo y renómbrela como `.env.local`:

**En Windows (PowerShell):**
```powershell
Copy-Item .env.example .env.local
```

**En Linux / Mac (Bash):**
```bash
cp .env.example .env.local
```

Abra el archivo `.env.local` con cualquier editor de texto o VS Code. Contiene la siguiente estructura:

```env
# 1. Conexión a The Movie Database (TMDb)
VITE_TMDB_API_KEY=tu_clave_de_tmdb
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3

# 2. Conexión a Base de Datos Supabase (PostgreSQL 15+)
VITE_SUPABASE_URL=https://tu_proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_supabase

# 3. Google Maps Platform (Geolocalización satelital y cálculo de cines)
VITE_GOOGLE_MAPS_API_KEY=tu_clave_google_maps
```

> [!TIP]
> **Modo Autónomo / Respaldo Automático (Zero-Config):**
> Si por alguna razón no cuenta con claves de API en el momento de la evaluación o decide no crear el archivo `.env.local`, **el sistema activará automáticamente su capa de respaldo inteligente**. La aplicación cargará películas de demostración enriquecidas, el proveedor interactivo `DemoMapsProvider` y datos precargados, garantizando que el evaluador nunca observe pantallas rotas o en blanco.

---

### Paso 5: Iniciar el Servidor de Desarrollo
Ejecute el siguiente comando para iniciar el servidor local:

```bash
npm run dev
```

En su terminal verá un mensaje similar a este:
```text
  VITE v8.2.2  ready in 280 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### Paso 6: Visualizar la Aplicación
Abra su navegador web e ingrese a la dirección:
👉 **`http://localhost:5173/`**

---

## 🧪 Validación y Compilación de Producción

Para comprobar la calidad del código, el tipado estricto de TypeScript y la generación del bundle optimizado para producción, ejecute:

```bash
npm run build
```

Este comando ejecuta `tsc -b && vite build`. Debe finalizar con **código de salida 0 (0 errores de TypeScript)**, generando la carpeta optimizada `dist/`.

Para previsualizar localmente la versión compilada de producción:
```bash
npm run preview
```

---

## 🗄️ Base de Datos: Supabase (PostgreSQL 15+)

La persistencia de cines físicos, funciones de cartelera y el sistema de reseñas en tiempo real están construidos sobre **PostgreSQL en Supabase**.

### Archivo SQL Idempotente:
👉 El script completo de creación de tablas, relaciones, claves foráneas, índices de rendimiento y datos semilla se encuentra en:
**[`database/schema.sql`](database/schema.sql)**

### Estructura de Tablas:
| Tabla | Descripción | Llaves / Restricciones |
| :--- | :--- | :--- |
| **`cines`** | Sedes comerciales reales de cine en Perú (Huánuco, Huancayo, Lima, Tacna) con coordenadas geográficas satelitales (latitud/longitud). | `id` (PK), `nombre`, `cadena`, `direccion`, `ciudad`, `latitud`, `longitud`, `sitio_web`. |
| **`funciones`** | Cartelera, salas, formatos (2D, 3D, XD, Xtreme) y tarifas en Soles (S/.). | `id` (PK), `tmdb_movie_id` (Index), `cine_id` (FK `cines(id)` ON DELETE CASCADE), `hora`, `sala`, `precio`. |
| **`resenas`** | Críticas de usuarios con puntuación estricta de 1 a 5 estrellas y fechas relativas. | `id` (PK), `tmdb_movie_id` (Index), `nombre_usuario`, `comentario`, `puntaje` (CHECK 1-5). |

### Seguridad con Políticas RLS (Row Level Security):
La base de datos protege la integridad de los datos mediante 4 políticas de seguridad a nivel de fila:
1. `Lectura publica de cines`: Acceso libre de lectura (`SELECT`) para cualquier visitante.
2. `Lectura publica de funciones`: Acceso libre de lectura (`SELECT`) a la cartelera.
3. `Lectura publica de resenas`: Acceso libre de lectura (`SELECT`) a todas las valoraciones.
4. `Insercion publica de resenas validada`: Inserción permitida (`INSERT`) únicamente si el comentario no está vacío y el puntaje está entre 1 y 5 estrellas.

> Para más detalles sobre cómo clonar o configurar la base de datos en una cuenta propia de Supabase, consulte la guía dedicada en: [`database/README_SUPABASE.md`](database/README_SUPABASE.md).

---

## 📐 Arquitectura de Software y Buenas Prácticas

El proyecto fue diseñado aplicando los principios de **Clean Architecture**, **SOLID** y **Programación Orientada a Objetos (POO)**:

```
┌─────────────────────────────────────────────────────────────┐
│                   Presentación (UI / React)                 │
│      Páginas (src/pages/) y Componentes (src/components/)   │
└──────────────────────────────┬──────────────────────────────┘
                               │ usa
┌──────────────────────────────▼──────────────────────────────┐
│                  Capa de Aplicación (Hooks)                 │
│     useMovies, useMovieDetail, useReviews, useCinemas       │
└──────────────────────────────┬──────────────────────────────┘
                               │ usa
┌──────────────────────────────▼──────────────────────────────┐
│                    Dominio (Entidades POO)                  │
│       BaseEntity ◀── Movie, Review, Cinema, Showtime         │
└──────────────────────────────┬──────────────────────────────┘
                               │ desacoplado mediante
┌──────────────────────────────▼──────────────────────────────┐
│                 Servicios de Red y Adaptadores              │
│       BaseApiService ◀── TmdbService, SupabaseService       │
│       BaseMapProvider ◀── GoogleMapsProvider, DemoProvider   │
└─────────────────────────────────────────────────────────────┘
```

### Principios SOLID Aplicados:
* **Single Responsibility Principle (SRP):** Cada clase, hook y componente cumple una única función bien definida.
* **Open/Closed Principle (OCP) & Liskov Substitution Principle (LSP):** La clase abstracta `BaseMapProvider` define el contrato del mapa. Tanto `GoogleMapsProvider` como `DemoMapsProvider` son intercambiables en tiempo de ejecución sin alterar los componentes de la interfaz.
* **Interface Segregation & Dependency Inversion (DIP):** Las vistas no se acoplan directamente a llamadas de red crudas (`fetch`); dependen de servicios abstractos y tipados con TypeScript estricto.

---

## ✨ Funcionalidades Principales Implementadas

1. **Catálogo Cinematográfico en Vivo (TMDb)**:
   * **Cartelera actual (Now Playing):** Películas actualmente en exhibición.
   * **Top 10 / Mejor Calificadas:** Ranking global ordenado por puntuación comunitaria.
   * **Próximos Estrenos:** Títulos programados para lanzamiento futuro.
   * **Búsqueda Reactiva:** Buscador en tiempo real con optimización mediante **Debounce de 350ms** para evitar consumo innecesario de cuota de red.
2. **Ficha Técnica Detallada (`/pelicula/:id`)**:
   * Backdrop cinematográfico en alta resolución, sinopsis completa, géneros, presupuesto y recaudación en USD.
   * **Reproductor Oficial de Tráiler:** Integración con la API de YouTube.
   * **Reparto Principal:** Galería fotográfica de los actores principales y directores.
3. **Módulo de Cines Cercanos y Geolocalización**:
   * Detección de coordenadas GPS del navegador con geolocalización satelital en Perú.
   * Cálculo matemático de distancia en kilómetros mediante la **fórmula de Haversine**.
   * Identificación de cines de la región (por ejemplo, **Cinemark Open Plaza Huánuco** y **Cineplanet Real Plaza Huánuco**).
   * **Botón inteligente de retorno al usuario:** Botón flotante `[ Volver a mi ubicación ]` en el mapa para regresar la cámara a las coordenadas del usuario con un solo clic.
   * Supresión visual y programática del diálogo de advertencia de desarrollo de Google Maps.
   * Enlaces directos a las páginas oficiales de las cadenas para compra de boletos y consulta de cartelera.
4. **Sistema Interactivo de Reseñas**:
   * Creación de valoraciones (1 a 5 estrellas) y comentarios.
   * Persistencia en PostgreSQL (Supabase).
   * Actualización optimista de interfaz (la crítica se muestra al instante sin necesidad de recargar la página).
5. **Navegación Fluida (SPA)**:
   * Enrutamiento dinámico con `react-router-dom`.
   * Restauración automática del scroll al inicio (`ScrollToTop`) al cambiar de página o película.

---

## 📂 Estructura del Código Fuente

```text
cineplus/
├── database/                   # Recursos de base de datos relacional
│   ├── schema.sql              # Script SQL completo (Tablas, RLS, Datos Semilla)
│   └── README_SUPABASE.md      # Guía detallada de configuración en Supabase
├── legacy_mockup/              # Archivo histórico con la maqueta estática previa
├── public/                     # Activos estáticos públicos
│   └── _redirects              # Reglas de enrutamiento SPA para Netlify
├── src/                        # Código fuente de la aplicación React
│   ├── components/             # Componentes modulares y reutilizables
│   │   ├── common/             # Navbar, Footer, ScrollToTop, Skeletons
│   │   ├── map/                # CinemaMap (lienzo del mapa y lista de cines)
│   │   ├── movie/              # MovieCard, MovieHero, CastList, TrailerPlayer
│   │   └── review/             # ReviewForm, ReviewList
│   ├── core/                   # Núcleo de la aplicación
│   │   ├── config.ts           # Carga y validación tipada de variables de entorno
│   │   └── utils.ts            # Cálculo de Haversine, formateadores de moneda y fechas
│   ├── domain/                 # Entidades y lógica pura de negocio (POO)
│   │   ├── BaseEntity.ts       # Clase abstracta base
│   │   ├── Movie.ts            # Entidad Película
│   │   ├── Cinema.ts           # Entidad Cine
│   │   ├── Showtime.ts         # Entidad Función/Horario
│   │   ├── Review.ts           # Entidad Reseña
│   │   └── types.ts            # Contratos de tipos DTO y respuestas API
│   ├── hooks/                  # Capa de aplicación (Custom React Hooks)
│   │   ├── useMovies.ts        # Lógica de cartelera y búsqueda con debounce
│   │   ├── useMovieDetail.ts   # Lógica de ficha técnica detallada
│   │   ├── useReviews.ts       # Lógica de gestión de reseñas
│   │   └── useCinemas.ts       # Lógica de geolocalización y cines cercanos
│   ├── pages/                  # Vistas de ruta completa
│   │   ├── HomePage.tsx        # Portada y cartelera principal
│   │   ├── MovieDetailPage.tsx # Detalle de película, cines y críticas
│   │   ├── TopRatedPage.tsx    # Películas más valoradas
│   │   └── UpcomingPage.tsx    # Próximos estrenos
│   ├── services/               # Clientes de comunicación externa
│   │   ├── BaseApiService.ts   # Cliente HTTP base tipado
│   │   ├── TmdbService.ts      # Cliente oficial de TMDb API v3
│   │   ├── SupabaseService.ts  # Cliente de base de datos Supabase
│   │   └── map/                # Proveedores intercambiables de mapas
│   │       ├── BaseMapProvider.ts     # Contrato base de mapa
│   │       ├── GoogleMapsProvider.ts  # Implementación Google Maps SDK
│   │       ├── DemoMapsProvider.ts    # Implementación interactiva de respaldo
│   │       └── OverpassCinemaService.ts # Detección de cines por OpenStreetMap
│   ├── App.tsx                 # Enrutador y estructura general
│   ├── index.css               # Estilos globales y tokens Tailwind CSS v4
│   └── main.tsx                # Punto de entrada de la aplicación
├── .env.example                # Plantilla de variables de entorno
├── DEPLOYMENT.md               # Guía técnica de despliegue 24/7 en la nube
├── package.json                # Dependencias y scripts del proyecto
├── tsconfig.json               # Configuración estricta del compilador TypeScript
├── vercel.json                 # Configuración de reescrituras para Vercel
└── README.md                   # Esta guía técnica de instalación y evaluación
```

---

## 🛠️ Comandos Disponibles en `package.json`

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con recarga en caliente (HMR) en el puerto `5173`. |
| `npm run build` | Compila el código fuente con verificación estricta de TypeScript (`tsc -b`) y empaqueta la versión final con Vite. |
| `npm run preview` | Levanta un servidor local para probar la versión compilada de producción de la carpeta `dist/`. |
| `npm run lint` | Ejecuta el análisis estático de código ultrarrápido con `oxlint`. |

---

## 👨‍💻 Autor y Licencia

* **Proyecto:** CinePlus
* **Propósito:** Proyecto Web Jamstack — Cine, Reseñas y Geolocalización
* **Licencia:** MIT License - Libre para fines educativos y de evaluación académica.
