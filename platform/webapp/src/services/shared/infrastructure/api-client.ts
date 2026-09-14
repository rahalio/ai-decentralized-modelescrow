import { getApiBaseUrl } from '@/services/shared/config/runtime-env';
import {
  getAccessToken,
  getApiKey,
} from './auth-tokens';

export type ApiRequestParams = Record<
  string,
  string | number | boolean | null | undefined
>;

export interface ApiRequestOptions {
  params?: ApiRequestParams;
  headers?: HeadersInit;
  body?: unknown;
  signal?: AbortSignal;
  idempotent?: boolean;
}

function buildQuery(params?: ApiRequestParams): string {
  if (!params) return '';
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    search.set(key, String(value));
  }
  const q = search.toString();
  return q ? `?${q}` : '';
}

function joinUrl(baseUrl: string, path: string): string {
  const b = baseUrl.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
}

async function request<T>(
  method: string,
  path: string,
  options: ApiRequestOptions = {}
): Promise<{ data: T }> {
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && options.body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }
  const apiKey = getApiKey();
  const token = getAccessToken();
  if (apiKey) headers.set('X-API-Key', apiKey);
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (options.idempotent) {
    headers.set('Idempotency-Key', crypto.randomUUID());
  }

  const url =
    joinUrl(getApiBaseUrl(), path) + buildQuery(options.params);
  const res = await fetch(url, {
    method,
    headers,
    signal: options.signal,
    body:
      options.body === undefined
        ? undefined
        : typeof options.body === 'string'
          ? options.body
          : JSON.stringify(options.body),
  });

  if (res.status === 204) return { data: undefined as T };
  const text = await res.text();
  const data = text ? JSON.parse(text) : undefined;
  if (!res.ok) {
    const msg =
      (data as { message?: string; title?: string })?.message ??
      (data as { title?: string })?.title ??
      res.statusText;
    throw new Error(msg);
  }
  return { data: data as T };
}

export const apiClient = {
  get: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>('GET', path, options),
  post: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>('POST', path, { ...options, idempotent: options?.idempotent ?? true }),
  put: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>('PUT', path, options),
  patch: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>('PATCH', path, options),
  delete: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>('DELETE', path, options),
};
