# Guía de Despliegue 24/7: CinePlus en Vercel o Netlify

Esta guía te explica cómo publicar tu aplicación **CinePlus** en internet de forma **gratuita, permanente (24/7), con certificado SSL/HTTPS automático y sin servidores que se duerman**.

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

| Variable | Valor de Ejemplo | Descripción |
| :--- | :--- | :--- |
| `VITE_TMDB_API_KEY` | `tu_clave_de_themoviedb` | Clave v3 de [themoviedb.org](https://www.themoviedb.org/settings/api). |
| `VITE_SUPABASE_URL` | `https://xxxxxx.supabase.co` | Project URL de [supabase.com](https://supabase.com/). |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOi...` | Clave pública anónima de Supabase. |
| `VITE_GOOGLE_MAPS_API_KEY` | *(Opcional)* | Clave de Google Maps (si se omite, se activa el Modo Demo automáticamente). |

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
