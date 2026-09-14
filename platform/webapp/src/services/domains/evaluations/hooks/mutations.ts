/**
 * Evaluations Mutation Hooks
 *
 * React Query hooks for mutating evaluations data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { evaluationsService } from "../evaluations.service";
// TODO: Import types
// import type { ... } from "../evaluations.api-types";

/**
 * Hook to start an evaluation run
 *
 * Automatically invalidates evaluations queries on success.
 */
export function useCreateEvaluation() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return evaluationsService.createEvaluation(data);
    },
    {
      invalidateQueries: [["evaluations", "Evaluation"]],
    }
  );
}

/**
 * Hook to mark evaluation invalid with reason (ops; creates audit trail)
 *
 * Automatically invalidates evaluations queries on success.
 */
export function useGetInvalidate() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return evaluationsService.getInvalidate(data);
    },
    {
      invalidateQueries: [["evaluations", "Invalidate"]],
    }
  );
}
