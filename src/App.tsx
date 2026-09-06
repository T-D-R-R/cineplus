import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { TopRatedPage } from './pages/TopRatedPage';
import { UpcomingPage } from './pages/UpcomingPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
        {/* Barra de Navegación Global */}
        <Navbar />

        {/* Contenido Principal con Rutas */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pelicula/:id" element={<MovieDetailPage />} />
            <Route path="/top-rated" element={<TopRatedPage />} />
            <Route path="/estrenos" element={<UpcomingPage />} />
            {/* Redirección por defecto si la ruta no existe */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Pie de Página */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
