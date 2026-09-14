/**
 * Submissions Query Hooks
 *
 * React Query hooks for fetching submissions data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { submissionsService } from "../submissions.service";

/**
 * Hook to list submissions for a contest
 *
 * Query key: ["submissions", "Submission", contestId]
 */
export function useSubmission(contestId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["submissions", "Submission", contestId],
    async (orgId: string, signal?: AbortSignal) => {
      return submissionsService.getSubmission(contestId, params, signal);
    },
    {
      enabled: !!contestId
    }
  );
}

/**
 * Hook to get submission
 *
 * Query key: ["submissions", "Submission", submissionId]
 */
export function useGetSubmission(submissionId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["submissions", "Submission", submissionId],
    async (orgId: string, signal?: AbortSignal) => {
      return submissionsService.getSubmission(submissionId, params, signal);
    },
    {
      enabled: !!submissionId
    }
  );
}
