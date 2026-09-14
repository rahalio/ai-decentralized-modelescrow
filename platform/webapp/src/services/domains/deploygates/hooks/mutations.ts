/**
 * Deploygates Mutation Hooks
 *
 * React Query hooks for mutating deploygates data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { deploygatesService } from "../deploygates.service";
// TODO: Import types
// import type { ... } from "../deploygates.api-types";

/**
 * Hook to open a deploy gate for a winning submission
 *
 * Automatically invalidates deploygates queries on success.
 */
export function useCreateDeployGate() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return deploygatesService.createDeployGate(data);
    },
    {
      invalidateQueries: [["deploygates", "DeployGate"]],
    }
  );
}

/**
 * Hook to approve promote or hold for gaming review
 *
 * Automatically invalidates deploygates queries on success.
 */
export function useGetDeployGate() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return deploygatesService.getDeployGate(data);
    },
    {
      invalidateQueries: [["deploygates", "DeployGate"]],
    }
  );
}
