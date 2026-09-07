/**
 * CinePlus - Funciones Puras de Utilidad
 */

/**
 * Calcula la distancia entre dos coordenadas geográficas mediante la fórmula de Haversine.
 * @returns Distancia en kilómetros redondeada a 1 decimal.
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radio medio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10;
}

/**
 * Formatea una cantidad numérica a formato de moneda (USD).
 */
export function formatCurrencyUSD(amount?: number | null): string {
  if (!amount || amount <= 0) return 'No disponible';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formatea minutos a "Xh Ym" (ej: 155 -> "2h 35m").
 */
export function formatRuntime(minutes?: number | null): string {
  if (!minutes || minutes <= 0) return 'Duración no especificada';
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) return `${remainingMinutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Formatea una fecha ISO a español legible (ej: "15 de marzo de 2024").
 */
export function formatDate(dateString?: string | null): string {
  if (!dateString) return 'Fecha no disponible';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Retorna una representación relativa del tiempo (ej: "hace 2 horas", "hace 3 días").
 */
export function formatRelativeTime(dateInput: Date | string): string {
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Hace un momento';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 30) return `Hace ${diffDays} días`;
    return formatDate(date.toISOString());
  } catch {
    return 'Reciente';
  }
}

/**
 * Función debounce para retrasar ejecuciones en búsquedas reactivas.
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Deduce la ciudad o departamento peruano más cercano a un par de coordenadas GPS.
 */
export function getPeruvianCityFromCoords(lat: number, lng: number): string {
  const referenceCities = [
    { name: 'Cerro de Pasco, Pasco', lat: -10.686, lng: -76.256 },
    { name: 'Huánuco', lat: -9.930, lng: -76.240 },
    { name: 'Huancayo, Junín', lat: -12.067, lng: -75.210 },
    { name: 'Lima Metropolitana', lat: -12.046, lng: -77.043 },
    { name: 'Tacna', lat: -18.018, lng: -70.253 },
    { name: 'Arequipa', lat: -16.409, lng: -71.537 },
    { name: 'Cusco', lat: -13.532, lng: -71.967 },
    { name: 'Trujillo, La Libertad', lat: -8.111, lng: -79.028 },
    { name: 'Chiclayo, Lambayeque', lat: -6.771, lng: -79.840 },
    { name: 'Piura', lat: -5.194, lng: -80.632 },
    { name: 'Ica', lat: -14.067, lng: -75.728 },
    { name: 'Tarapoto, San Martín', lat: -6.491, lng: -76.368 },
    { name: 'Pucallpa, Ucayali', lat: -8.379, lng: -74.553 },
    { name: 'Iquitos, Loreto', lat: -3.749, lng: -73.253 },
  ];

  let closest = referenceCities[0];
  let minDistance = 999999;

  for (const city of referenceCities) {
    const dist = calculateHaversineDistance(lat, lng, city.lat, city.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = city;
    }
  }

  if (minDistance <= 65) {
    return closest.name;
  }
  return 'Perú (GPS)';
}
