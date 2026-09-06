# Guía de Configuración: Supabase para CinePlus

Esta guía te explica paso a paso cómo desplegar la base de datos de **CinePlus** en **Supabase** y obtener tus credenciales para la aplicación.

---

## Paso 1: Crear el Proyecto en Supabase

1. Dirígete a [supabase.com](https://supabase.com/) e inicia sesión (puedes ingresar con tu cuenta de GitHub).
2. Haz clic en el botón verde **"New Project"**.
3. Completa los campos:
   * **Name:** `CinePlus` (o el nombre que prefieras).
   * **Database Password:** Elige una contraseña segura (guárdala en tu gestor de contraseñas).
   * **Region:** Selecciona la más cercana a tu país (por ejemplo, *East US / North Virginia* o *South America / São Paulo*).
4. Haz clic en **"Create new project"** y espera 1 a 2 minutos mientras Supabase aprovisiona tu base de datos PostgreSQL 15+.

---

## Paso 2: Ejecutar el Script `schema.sql`

1. En el menú lateral izquierdo de Supabase, haz clic en el icono del **SQL Editor** (ícono `>_`).
2. Haz clic en el botón **"+ New query"**.
3. Abre el archivo [`database/schema.sql`](file:///c:/Users/Usuario/Music/HTML/Trabajo/database/schema.sql) de este repositorio, copia todo su contenido y pégalo en el editor de Supabase.
4. Presiona el botón verde **"Run"** (o presiona `Ctrl + Enter`).
5. En la parte inferior verás el mensaje:
   ```text
   Success. No rows returned.
   ```

---

## Paso 3: Verificar las Tablas y Políticas de Seguridad

1. Ve a la sección **Table Editor** (icono de tabla en el menú lateral).
2. Deberás ver las 3 tablas creadas con sus datos listos:
   * `cines` (5 sedes con coordenadas GPS)
   * `funciones` (26 horarios asignados a películas como Dune, Inside Out 2, Deadpool, etc.)
   * `resenas` (7 reseñas iniciales con estrellas y comentarios)
3. Ve a la sección **Authentication > Policies** y verifica que las 4 políticas RLS (Row Level Security) estén activas:
   * `Lectura publica de cines` (SELECT)
   * `Lectura publica de funciones` (SELECT)
   * `Lectura publica de resenas` (SELECT)
   * `Insercion publica de resenas validada` (INSERT)

---

## Paso 4: Copiar tus Credenciales para el Frontend

1. En el menú lateral izquierdo, haz clic en el icono de engranaje **Project Settings**.
2. Selecciona la pestaña **API** (o **Data API**).
3. Localiza y copia estos dos valores:
   * **Project URL:** Tiene la forma `https://xxxxxxxxxxxxxxxxxxxx.supabase.co`
   * **Project API keys > `anon` `public`:** Una clave larga que comienza por `eyJhbGciOi...`

> [!TIP]
> Guarda estos dos valores. En la **Fase 2 y 3** los colocaremos en el archivo de configuración `.env` / `src/core/config.ts` de la aplicación React.

---

## Paso 5: Prueba Rápida de Conexión (Opcional)

Puedes verificar que tu API REST está respondiendo públicamente abriendo esta URL en cualquier navegador o en Postman (reemplazando con tu URL y tu clave anon):

```text
https://TU_PROYECTO.supabase.co/rest/v1/cines?select=*&apikey=TU_ANON_KEY
```

Si todo está configurado correctamente, recibirás la lista de los 5 cines en formato JSON.
