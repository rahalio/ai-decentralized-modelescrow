/**
 * Escrows Query Hooks
 *
 * React Query hooks for fetching escrows data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { escrowsService } from "../escrows.service";

/**
 * Hook to get escrow for contest
 *
 * Query key: ["escrows", "Escrow", contestId]
 */
export function useEscrow(contestId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["escrows", "Escrow", contestId],
    async (orgId: string, signal?: AbortSignal) => {
      return escrowsService.getEscrow(contestId, params, signal);
    },
    {
      enabled: !!contestId
    }
  );
}

/**
 * Hook to get escrow by id
 *
 * Query key: ["escrows", "Escrow", escrowId]
 */
export function useGetbyidEscrow(escrowId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["escrows", "Escrow", escrowId],
    async (orgId: string, signal?: AbortSignal) => {
      return escrowsService.getEscrowById(escrowId, params, signal);
    },
    {
      enabled: !!escrowId
    }
  );
}
