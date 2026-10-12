import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import chatHandler from './api/chat.ts';

function apiDevServerPlugin(): Plugin {
  return {
    name: 'api-dev-server-plugin',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        await chatHandler(req, res);
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carga todas las variables de entorno (.env y .env.local) tanto VITE_ como del servidor
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      tailwindcss(),
      apiDevServerPlugin(),
    ],
  };
});

