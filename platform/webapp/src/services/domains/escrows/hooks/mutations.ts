/**
 * Escrows Mutation Hooks
 *
 * React Query hooks for mutating escrows data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { escrowsService } from "../escrows.service";
// TODO: Import types
// import type { ... } from "../escrows.api-types";

/**
 * Hook to lock escrow after contest rules are complete (br-1, br-2)
 *
 * Automatically invalidates escrows queries on success.
 */
export function useGetEscrow() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return escrowsService.getEscrow(data);
    },
    {
      invalidateQueries: [["escrows", "Escrow"]],
    }
  );
}
