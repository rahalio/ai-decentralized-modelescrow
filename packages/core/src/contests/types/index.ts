/**
 * Contests Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/contests.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AuditExport = components["schemas"]["AuditExport"];
export type Contest = components["schemas"]["Contest"];
export type ContestId = components["schemas"]["ContestId"];
export type ContestListData = components["schemas"]["ContestListData"];
export type ContestStatus = components["schemas"]["ContestStatus"];
export type AuditExportRequest = components["schemas"]["AuditExportRequest"];
export type ContestCreateRequest = components["schemas"]["ContestCreateRequest"];
export type ContestUpdateRequest = components["schemas"]["ContestUpdateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateContestRequestInput = NonNullable<operations["createContest"]["requestBody"]>["content"]["application/json"];
export type UpdateContestRequestInput = NonNullable<operations["updateContest"]["requestBody"]>["content"]["application/json"];
export type UpdateContestRequest = UpdateContestRequestInput;
export type CreateAuditExportRequestInput = NonNullable<operations["createAuditExport"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListContestsParams = NonNullable<operations["listContests"]["parameters"]["query"]>;
export type GetContestParams = operations["getContest"]["parameters"]["path"];
export type UpdateContestParams = operations["updateContest"]["parameters"]["path"];
export type CancelContestParams = operations["cancelContest"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListContestsResponse = operations["listContests"]["responses"]["200"]["content"]["application/json"];
export type CreateContestResponse = operations["createContest"]["responses"]["201"]["content"]["application/json"];
export type GetContestResponse = operations["getContest"]["responses"]["200"]["content"]["application/json"];
export type UpdateContestResponse = operations["updateContest"]["responses"]["200"]["content"]["application/json"];
export type CreateAuditExportResponse = operations["createAuditExport"]["responses"]["202"]["content"]["application/json"];


