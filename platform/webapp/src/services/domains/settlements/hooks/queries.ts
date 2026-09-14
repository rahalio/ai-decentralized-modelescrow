/**
 * Settlements Query Hooks
 *
 * React Query hooks for fetching settlements data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { settlementsService } from "../settlements.service";

/**
 * Hook to get settlement for contest
 *
 * Query key: ["settlements", "Settlement", contestId]
 */
export function useSettlement(contestId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["settlements", "Settlement", contestId],
    async (orgId: string, signal?: AbortSignal) => {
      return settlementsService.getSettlement(contestId, params, signal);
    },
    {
      enabled: !!contestId
    }
  );
}

/**
 * Hook to list settlements
 *
 * Query key: ["settlements", "Settlement", ]
 */
export function useGetSettlement(params?: Record<string, any>) {
  return useTenantQuery(
    ["settlements", "Settlement", ],
    async (orgId: string, signal?: AbortSignal) => {
      return settlementsService.getSettlement(params, signal);
    }
  );
}
