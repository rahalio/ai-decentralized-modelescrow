/**
 * Disputes Query Hooks
 *
 * React Query hooks for fetching disputes data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { disputesService } from "../disputes.service";

/**
 * Hook to list disputes
 *
 * Query key: ["disputes", "Dispute", ]
 */
export function useDispute(params?: Record<string, any>) {
  return useTenantQuery(
    ["disputes", "Dispute", ],
    async (orgId: string, signal?: AbortSignal) => {
      return disputesService.getDispute(params, signal);
    }
  );
}

/**
 * Hook to get dispute
 *
 * Query key: ["disputes", "Dispute", disputeId]
 */
export function useGetDispute(disputeId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["disputes", "Dispute", disputeId],
    async (orgId: string, signal?: AbortSignal) => {
      return disputesService.getDispute(disputeId, params, signal);
    },
    {
      enabled: !!disputeId
    }
  );
}
