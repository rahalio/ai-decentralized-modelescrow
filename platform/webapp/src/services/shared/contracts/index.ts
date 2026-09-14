export function validateApiResponse<T>(
  data: T,
  _schema?: unknown
): { success: true; data: T } | { success: false; error: unknown } {
  return { success: true, data };
}

export function formatValidationError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}
