/**
 * Integration event type definitions (hand-maintained).
 * Registry entries are generated under ./generated/registry.ts.
 */

export interface IntegrationEventTypeDefinition {
  type: string;
  domain?: string;
  description?: string;
  payloadSchemaName?: string;
}
