/**
 * Evaluations Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/evaluations.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type EvaluationRun = components["schemas"]["EvaluationRun"];
export type EvaluationRunId = components["schemas"]["EvaluationRunId"];
export type EvaluationRunListData = components["schemas"]["EvaluationRunListData"];
export type EvaluationRunStatus = components["schemas"]["EvaluationRunStatus"];
export type Leaderboard = components["schemas"]["Leaderboard"];
export type LeaderboardEntry = components["schemas"]["LeaderboardEntry"];
export type InvalidateEvaluationRequest = components["schemas"]["InvalidateEvaluationRequest"];
export type Evaluation = operations["listEvaluationsForSubmission"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type InvalidateEvaluationRunRequestInput = NonNullable<operations["invalidateEvaluationRun"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListEvaluationsForSubmissionParams = NonNullable<operations["listEvaluationsForSubmission"]["parameters"]["query"]>;
export type RunEvaluationParams = operations["runEvaluation"]["parameters"]["path"];
export type GetEvaluationRunParams = operations["getEvaluationRun"]["parameters"]["path"];
export type InvalidateEvaluationRunParams = operations["invalidateEvaluationRun"]["parameters"]["path"];
export type GetLeaderboardParams = operations["getLeaderboard"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListEvaluationsForSubmissionResponse = operations["listEvaluationsForSubmission"]["responses"]["200"]["content"]["application/json"];
export type RunEvaluationResponse = operations["runEvaluation"]["responses"]["202"]["content"]["application/json"];
export type GetEvaluationRunResponse = operations["getEvaluationRun"]["responses"]["200"]["content"]["application/json"];
export type InvalidateEvaluationRunResponse = operations["invalidateEvaluationRun"]["responses"]["200"]["content"]["application/json"];
export type GetLeaderboardResponse = operations["getLeaderboard"]["responses"]["200"]["content"]["application/json"];


