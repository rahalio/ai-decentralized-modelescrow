/**
 * Evaluations Query Hooks
 *
 * React Query hooks for fetching evaluations data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { evaluationsService } from "../evaluations.service";

/**
 * Hook to list evaluation runs for a submission
 *
 * Query key: ["evaluations", "Evaluation", submissionId]
 */
export function useEvaluation(submissionId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["evaluations", "Evaluation", submissionId],
    async (orgId: string, signal?: AbortSignal) => {
      return evaluationsService.getEvaluation(submissionId, params, signal);
    },
    {
      enabled: !!submissionId
    }
  );
}

/**
 * Hook to get evaluation run evidence
 *
 * Query key: ["evaluations", "Evaluation", evaluationRunId]
 */
export function useGetEvaluation(evaluationRunId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["evaluations", "Evaluation", evaluationRunId],
    async (orgId: string, signal?: AbortSignal) => {
      return evaluationsService.getEvaluation(evaluationRunId, params, signal);
    },
    {
      enabled: !!evaluationRunId
    }
  );
}

/**
 * Hook to get contest leaderboard
 *
 * Query key: ["evaluations", "Leaderboard", contestId]
 */
export function useLeaderboard(contestId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["evaluations", "Leaderboard", contestId],
    async (orgId: string, signal?: AbortSignal) => {
      return evaluationsService.getLeaderboard(contestId, params, signal);
    },
    {
      enabled: !!contestId
    }
  );
}
