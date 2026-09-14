/**
 * Submissions Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/submissions.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Submission = components["schemas"]["Submission"];
export type SubmissionId = components["schemas"]["SubmissionId"];
export type SubmissionListData = components["schemas"]["SubmissionListData"];
export type SubmissionStatus = components["schemas"]["SubmissionStatus"];
export type SubmissionCreateRequest = components["schemas"]["SubmissionCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type SubmitModelRequestInput = NonNullable<operations["submitModel"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListSubmissionsParams = NonNullable<operations["listSubmissions"]["parameters"]["query"]>;
export type SubmitModelParams = operations["submitModel"]["parameters"]["path"];
export type GetSubmissionParams = operations["getSubmission"]["parameters"]["path"];
export type WithdrawSubmissionParams = operations["withdrawSubmission"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListSubmissionsResponse = operations["listSubmissions"]["responses"]["200"]["content"]["application/json"];
export type SubmitModelResponse = operations["submitModel"]["responses"]["201"]["content"]["application/json"];
export type GetSubmissionResponse = operations["getSubmission"]["responses"]["200"]["content"]["application/json"];


