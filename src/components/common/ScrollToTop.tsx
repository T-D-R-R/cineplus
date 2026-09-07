import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que restablece automáticamente el scroll de la ventana
 * a la parte superior (top: 0) cada vez que el usuario navega a una nueva ruta o película.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}
