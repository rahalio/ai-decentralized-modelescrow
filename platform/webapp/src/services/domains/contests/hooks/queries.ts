/**
 * Contests Query Hooks
 *
 * React Query hooks for fetching contests data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { contestsService } from "../contests.service";

/**
 * Hook to list contests
 *
 * Query key: ["contests", "Contest", ]
 */
export function useContest(params?: Record<string, any>) {
  return useTenantQuery(
    ["contests", "Contest", ],
    async (orgId: string, signal?: AbortSignal) => {
      return contestsService.getContest(params, signal);
    }
  );
}

/**
 * Hook to get contest
 *
 * Query key: ["contests", "Contest", contestId]
 */
export function useGetContest(contestId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["contests", "Contest", contestId],
    async (orgId: string, signal?: AbortSignal) => {
      return contestsService.getContest(contestId, params, signal);
    },
    {
      enabled: !!contestId
    }
  );
}
