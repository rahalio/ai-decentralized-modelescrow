const ACCESS = 'modelescrow.accessToken';
const REFRESH = 'modelescrow.refreshToken';
const API_KEY = 'modelescrow.apiKey';

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS);
}
export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH);
}
export function getApiKey(): string | null {
  return localStorage.getItem(API_KEY);
}
export function setAuthTokens(access: string, refresh?: string) {
  localStorage.setItem(ACCESS, access);
  if (refresh) localStorage.setItem(REFRESH, refresh);
}
export function setApiKey(key: string) {
  localStorage.setItem(API_KEY, key);
}
export function clearAuthTokens() {
  localStorage.removeItem(ACCESS);
  localStorage.removeItem(REFRESH);
}
