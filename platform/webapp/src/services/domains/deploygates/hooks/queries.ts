/**
 * Deploygates Query Hooks
 *
 * React Query hooks for fetching deploygates data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { deploygatesService } from "../deploygates.service";

/**
 * Hook to list deploy gates for a contest
 *
 * Query key: ["deploygates", "DeployGate", contestId]
 */
export function useDeployGate(contestId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["deploygates", "DeployGate", contestId],
    async (orgId: string, signal?: AbortSignal) => {
      return deploygatesService.getDeployGate(contestId, params, signal);
    },
    {
      enabled: !!contestId
    }
  );
}

/**
 * Hook to get deploy gate
 *
 * Query key: ["deploygates", "DeployGate", deployGateId]
 */
export function useGetDeployGate(deployGateId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["deploygates", "DeployGate", deployGateId],
    async (orgId: string, signal?: AbortSignal) => {
      return deploygatesService.getDeployGate(deployGateId, params, signal);
    },
    {
      enabled: !!deployGateId
    }
  );
}
