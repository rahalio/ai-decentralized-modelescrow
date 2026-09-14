/**
 * Contests Domain Contracts
 *
 * Re-exports Zod schemas from @modelescrow/core for runtime validation.
 * This avoids duplication and ensures alignment with the API contract.
 *
 * Architecture:
 * - Single source of truth: @modelescrow/core
 * - No code duplication or drift
 * - Runtime validation of API responses
 * - Used in services to validate responses
 *
 * @see @modelescrow/core/contests for the source schemas
 */

import { contestsSchemas as coreContestsSchemas } from "@modelescrow/core/contests";
import type { z } from "zod";

/**
 * Re-export schemas from core
 * These are the same schemas used by the api-server, ensuring perfect alignment
 */
export const {
  // TODO: Add specific schema exports based on OpenAPI spec
  // ResponseMeta,
  // PageInfo,
  // etc.
} = coreContestsSchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const contestsSchemas = coreContestsSchemas;
