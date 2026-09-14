/**
 * Shared API client for Modelescrow webapp.
 */

const API_BASE = import.meta.env.VITE_API_BASE ?? '';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json');
  }
  const apiKey = localStorage.getItem('modelescrow.apiKey');
  const token = localStorage.getItem('modelescrow.accessToken');
  if (apiKey) headers.set('X-API-Key', apiKey);
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (res.status === 204) return undefined as T;
  const text = await res.text();
  const data = text ? JSON.parse(text) : undefined;
  if (!res.ok) {
    throw new ApiError(
      (data as { message?: string; title?: string })?.message ??
        (data as { title?: string })?.title ??
        res.statusText,
      res.status,
      data
    );
  }
  return data as T;
}
