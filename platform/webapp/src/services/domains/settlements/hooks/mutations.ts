/**
 * Settlements Mutation Hooks
 *
 * React Query hooks for mutating settlements data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { settlementsService } from "../settlements.service";
// TODO: Import types
// import type { ... } from "../settlements.api-types";

/**
 * Hook to settle contest payout or return
 *
 * Automatically invalidates settlements queries on success.
 */
export function useUpdateSettlement() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return settlementsService.updateSettlement(data);
    },
    {
      invalidateQueries: [["settlements", "Settlement"]],
    }
  );
}
