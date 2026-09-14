/**
 * Deploygates Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/deploygates.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DeployGate = components["schemas"]["DeployGate"];
export type DeployGateId = components["schemas"]["DeployGateId"];
export type DeployGateListData = components["schemas"]["DeployGateListData"];
export type DeployGateStatus = components["schemas"]["DeployGateStatus"];
export type DeployGateDecisionRequest = components["schemas"]["DeployGateDecisionRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateDeployGateRequestInput = NonNullable<operations["createDeployGate"]["requestBody"]>["content"]["application/json"];
export type DecideDeployGateRequestInput = NonNullable<operations["decideDeployGate"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDeployGatesParams = NonNullable<operations["listDeployGates"]["parameters"]["query"]>;
export type CreateDeployGateParams = operations["createDeployGate"]["parameters"]["path"];
export type GetDeployGateParams = operations["getDeployGate"]["parameters"]["path"];
export type DecideDeployGateParams = operations["decideDeployGate"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDeployGatesResponse = operations["listDeployGates"]["responses"]["200"]["content"]["application/json"];
export type CreateDeployGateResponse = operations["createDeployGate"]["responses"]["201"]["content"]["application/json"];
export type GetDeployGateResponse = operations["getDeployGate"]["responses"]["200"]["content"]["application/json"];
export type DecideDeployGateResponse = operations["decideDeployGate"]["responses"]["200"]["content"]["application/json"];


