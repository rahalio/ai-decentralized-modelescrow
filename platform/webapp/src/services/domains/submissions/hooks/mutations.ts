/**
 * Submissions Mutation Hooks
 *
 * React Query hooks for mutating submissions data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { submissionsService } from "../submissions.service";
// TODO: Import types
// import type { ... } from "../submissions.api-types";

/**
 * Hook to submit a model package
 *
 * Automatically invalidates submissions queries on success.
 */
export function useCreateSubmission() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return submissionsService.createSubmission(data);
    },
    {
      invalidateQueries: [["submissions", "Submission"]],
    }
  );
}

/**
 * Hook to withdraw submission before evaluation starts
 *
 * Automatically invalidates submissions queries on success.
 */
export function useGetSubmission() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return submissionsService.getSubmission(data);
    },
    {
      invalidateQueries: [["submissions", "Submission"]],
    }
  );
}
