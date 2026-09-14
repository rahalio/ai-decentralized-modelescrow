/** Single-tenant Modelescrow — tenant implied by API key / session. */
export function getEffectiveOrgId(): string | null {
  return localStorage.getItem('modelescrow.tenantId') ?? 'tnt_demo';
}

export function setEffectiveOrgId(tenantId: string) {
  localStorage.setItem('modelescrow.tenantId', tenantId);
}
