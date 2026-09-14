/**
 * Contests Mutation Hooks
 *
 * React Query hooks for mutating contests data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { contestsService } from "../contests.service";
// TODO: Import types
// import type { ... } from "../contests.api-types";

/**
 * Hook to create a draft contest
 *
 * Automatically invalidates contests queries on success.
 */
export function useCreateContest() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return contestsService.createContest(data);
    },
    {
      invalidateQueries: [["contests", "Contest"]],
    }
  );
}

/**
 * Hook to update draft contest rules (blocked after escrow lock)
 *
 * Automatically invalidates contests queries on success.
 */
export function useUpdateContest() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return contestsService.updateContest(data);
    },
    {
      invalidateQueries: [["contests", "Contest"]],
    }
  );
}

/**
 * Hook to cancel a contest (pre-fund or per return rules)
 *
 * Automatically invalidates contests queries on success.
 */
export function useUpdateContest() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return contestsService.updateContest(data);
    },
    {
      invalidateQueries: [["contests", "Contest"]],
    }
  );
}

/**
 * Hook to generate attestation export for contests in a period (br-12)
 *
 * Automatically invalidates contests queries on success.
 */
export function useCreateExport() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return contestsService.createExport(data);
    },
    {
      invalidateQueries: [["contests", "Export"]],
    }
  );
}
