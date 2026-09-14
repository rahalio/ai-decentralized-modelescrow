/**
 * Submissions Domain Facade
 *
 * High-level API for submissions domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { submissionsService } from "./submissions.service";
// TODO: Import types
// import type { ... } from "./submissions.api-types";

/**
 * Submissions Facade
 *
 * High-level API for submissions operations.
 * Components should use this facade instead of services directly.
 */
export const submissionsFacade = {
  /**
   * List submissions for a contest
   */
  async getSubmission(...args: Parameters<typeof submissionsService.getSubmission>): Promise<any> {
    return submissionsService.getSubmission(...args);
  },

  /**
   * Submit a model package
   */
  async createSubmission(...args: Parameters<typeof submissionsService.createSubmission>): Promise<any> {
    return submissionsService.createSubmission(...args);
  },

  /**
   * Get submission
   */
  async getSubmission(...args: Parameters<typeof submissionsService.getSubmission>): Promise<any> {
    return submissionsService.getSubmission(...args);
  },

  /**
   * Withdraw submission before evaluation starts
   */
  async getSubmission(...args: Parameters<typeof submissionsService.getSubmission>): Promise<any> {
    return submissionsService.getSubmission(...args);
  }
};
