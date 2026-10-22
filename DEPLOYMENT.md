# Guía de Despliegue 24/7: CinePlus en Vercel o Netlify

Esta guía te explica cómo publicar tu aplicación **CinePlus** en internet de forma **gratuita, permanente (24/7), con certificado SSL/HTTPS automático y sin servidores que se duerman**.

---

## Paso Previo: Configurar Base de Datos y Dataset en Supabase

Antes de desplegar en producción, prepara tu base de datos en Supabase con el esquema relacional y el dataset de 500 reseñas:

1. **Crear o actualizar tablas e índices:**
   - Ingresa a tu proyecto en [Supabase.com](https://supabase.com/).
   - En el menú lateral, abre **SQL Editor**.
   - Haz clic en **"New query"**, copia y pega todo el contenido de [`database/schema.sql`](file:///c:/Users/Usuario/Music/HTML/Trabajo/database/schema.sql) y pulsa **"Run"**.
   - Esto creará las tablas `cines`, `funciones` y `resenas` con soporte para `titulo_pelicula` y `sentimiento`.

2. **Cargar el Dataset de 500 Reseñas:**
   - En el menú lateral de Supabase, ve a **Table Editor**.
   - Selecciona la tabla **`resenas`**.
   - Haz clic en **"Insert" > "Import data from CSV"**.
   - Selecciona el archivo [`dataset_resenas_500.csv`](file:///c:/Users/Usuario/Music/HTML/Trabajo/dataset_resenas_500.csv) ubicado en la raíz de tu proyecto.
   - Supabase detectará automáticamente las columnas (`tmdb_movie_id`, `titulo_pelicula`, `nombre_usuario`, `comentario`, `puntaje`, `sentimiento`) y completará la importación en segundos.

---

## Opción Recomendada: Despliegue en Vercel con GitHub

### Paso 1: Inicializar y Subir tu Proyecto a GitHub

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
# 1. Inicializar el repositorio Git local (si no lo has hecho aún)
git init

# 2. Agregar todos los archivos
git add .

# 3. Crear el primer commit
git commit -m "feat: CinePlus - Plataforma Jamstack con React 19, TMDb, Supabase y Google Maps"

# 4. Crear la rama principal
git branch -M main

# 5. Vincular con tu repositorio remoto de GitHub (crea uno vacío en github.com/new)
git remote add origin https://github.com/TU_USUARIO/cineplus.git

# 6. Subir el código
git push -u origin main
```

> [!NOTE]
> Tu archivo `.env.local` está protegido por el `.gitignore`, por lo que tus claves privadas nunca se subirán a GitHub.

---

### Paso 2: Importar el Proyecto en Vercel

1. Ingresa a [Vercel.com](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en el botón azul **"Add New..."** y selecciona **"Project"**.
3. En la lista de repositorios, localiza `cineplus` y haz clic en **"Import"**.
4. En la pantalla de configuración:
   * **Framework Preset:** Selecciona `Vite` (Vercel lo detecta automáticamente).
   * **Root Directory:** `./` (dejar por defecto).
   * **Build Command:** `pnpm run build` (o `npm run build`).
   * **Output Directory:** `dist`.

---

### Paso 3: Configurar las Variables de Entorno en Vercel

Despliega la sección **"Environment Variables"** antes de hacer clic en Deploy y agrega las siguientes claves (copiadas desde tu `.env.local`):

| Variable | Tipo | Descripción |
| :--- | :--- | :--- |
| `VITE_TMDB_API_KEY` | Cliente (Pública) | Clave v3 de [themoviedb.org](https://www.themoviedb.org/settings/api). |
| `VITE_SUPABASE_URL` | Cliente (Pública) | Project URL de [supabase.com](https://supabase.com/). |
| `VITE_SUPABASE_ANON_KEY` | Cliente (Pública) | Clave anónima pública de Supabase. |
| `VITE_GOOGLE_MAPS_API_KEY` | Cliente (Opcional) | Clave de Google Maps (si se omite, se activa el Modo Demo automáticamente). |
| `VITE_TELEGRAM_BOT_TOKEN` | Cliente (Opcional) | Token de BotFather para autenticación 2FA y envío de códigos OTP. |
| `VITE_TELEGRAM_BOT_USERNAME` | Cliente (Opcional) | Nombre de usuario del bot en Telegram (por defecto: `CinePlusSeguridad_bot`). |
| `GEMINI_API_KEY` | Servidor (Secreta) | Clave de Google AI Studio para el Agente Crítico de Arte y moderación. |
| `OPENROUTER_API_KEY` | Servidor (Secreta) | Clave de OpenRouter para DeepSeek (Agente Comercial y Logística). |
| `GROK_API_KEY` | Servidor (Opcional) | Clave de xAI Grok (si no se proporciona, el sistema usa automáticamente el motor de respaldo sin costo). |

> [!IMPORTANT]
> **Seguridad de Nivel Producción:** Las variables `GEMINI_API_KEY` y `OPENROUTER_API_KEY` **NO** llevan el prefijo `VITE_`. Se ejecutan exclusivamente en la Serverless Function `/api/chat`, lo que garantiza que **nunca viajen al navegador ni se puedan ver con F12 en el cliente**.

---

### Paso 4: Desplegar

1. Haz clic en el botón **"Deploy"**.
2. Espera aproximadamente 45 segundos mientras Vercel compila la aplicación y genera la red CDN global.
3. ¡Listo! Obtendrás un enlace público con HTTPS permanente como:
   ```text
   https://cineplus-app.vercel.app
   ```

---

## Opción Alternativa: Despliegue en Netlify

Si prefieres usar Netlify:
1. Ingresa a [Netlify.com](https://www.netlify.com/) e inicia sesión con GitHub.
2. Haz clic en **"Add new site" > "Import an existing project"**.
3. Selecciona tu repositorio `cineplus`.
4. El archivo [`public/_redirects`](public/_redirects) que ya dejamos configurado evitará automáticamente cualquier error 404 al recargar páginas internas como `/pelicula/:id`.
5. En **Site configuration > Environment variables**, añade las mismas 4 variables de entorno listadas arriba.
6. Haz clic en **"Deploy CinePlus"**.

---

## Verificación Post-Despliegue

Una vez en vivo en tu URL pública de Vercel o Netlify:
1. Abre la página y comprueba que la cartelera carga los estrenos de TMDb.
2. Haz clic en cualquier película para verificar la ficha técnica y reproducción del tráiler.
3. Envía una reseña de prueba y confirma que persiste en Supabase.
4. Consulta el módulo de cines cercanos y verifica que calcula la distancia y muestra los horarios de funciones.
