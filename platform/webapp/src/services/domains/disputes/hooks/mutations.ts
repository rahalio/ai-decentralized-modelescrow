/**
 * Disputes Mutation Hooks
 *
 * React Query hooks for mutating disputes data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { disputesService } from "../disputes.service";
// TODO: Import types
// import type { ... } from "../disputes.api-types";

/**
 * Hook to open a time-boxed evaluation dispute
 *
 * Automatically invalidates disputes queries on success.
 */
export function useGetDispute() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return disputesService.getDispute(data);
    },
    {
      invalidateQueries: [["disputes", "Dispute"]],
    }
  );
}

/**
 * Hook to resolve or reject a dispute
 *
 * Automatically invalidates disputes queries on success.
 */
export function useGetDispute() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return disputesService.getDispute(data);
    },
    {
      invalidateQueries: [["disputes", "Dispute"]],
    }
  );
}
