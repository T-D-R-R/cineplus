/**
 * CinePlus - Clean Architecture Infrastructure
 * Clase Base Abstracta para Servicios de Red (POO / Herencia / SRP / DIP).
 */

export class ApiException extends Error {
  public readonly status: number;
  public readonly details: unknown;

  constructor(message: string, status = 500, details?: unknown) {
    super(message);
    this.name = 'ApiException';
    this.status = status;
    this.details = details;
  }
}

export abstract class BaseApiService {
  protected readonly baseUrl: string;
  protected readonly defaultTimeoutMs: number;

  constructor(baseUrl: string, defaultTimeoutMs = 12000) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.defaultTimeoutMs = defaultTimeoutMs;
  }

  /**
   * Ejecuta una petición HTTP con timeout automático y control de excepciones.
   */
  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseUrl}${cleanEndpoint}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.defaultTimeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(options.headers || {}),
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorData: unknown = null;
        try {
          errorData = await response.json();
        } catch {
          errorData = await response.text();
        }
        throw new ApiException(
          `Error en petición a ${endpoint}: [${response.status}] ${response.statusText}`,
          response.status,
          errorData
        );
      }

      return (await response.json()) as T;
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof ApiException) {
        throw error;
      }
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiException(`Tiempo de espera agotado al conectar con ${url}`, 408);
      }
      throw new ApiException(
        `Error de red al conectar con ${url}: ${(error as Error).message}`,
        0,
        error
      );
    }
  }
}
