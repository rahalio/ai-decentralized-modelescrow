/**
 * Evaluations Domain Facade
 *
 * High-level API for evaluations domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { evaluationsService } from "./evaluations.service";
// TODO: Import types
// import type { ... } from "./evaluations.api-types";

/**
 * Evaluations Facade
 *
 * High-level API for evaluations operations.
 * Components should use this facade instead of services directly.
 */
export const evaluationsFacade = {
  /**
   * List evaluation runs for a submission
   */
  async getEvaluation(...args: Parameters<typeof evaluationsService.getEvaluation>): Promise<any> {
    return evaluationsService.getEvaluation(...args);
  },

  /**
   * Start an evaluation run
   */
  async createEvaluation(...args: Parameters<typeof evaluationsService.createEvaluation>): Promise<any> {
    return evaluationsService.createEvaluation(...args);
  },

  /**
   * Get evaluation run evidence
   */
  async getEvaluation(...args: Parameters<typeof evaluationsService.getEvaluation>): Promise<any> {
    return evaluationsService.getEvaluation(...args);
  },

  /**
   * Mark evaluation invalid with reason (ops; creates audit trail)
   */
  async getInvalidate(...args: Parameters<typeof evaluationsService.getInvalidate>): Promise<any> {
    return evaluationsService.getInvalidate(...args);
  },

  /**
   * Get contest leaderboard
   */
  async getLeaderboard(...args: Parameters<typeof evaluationsService.getLeaderboard>): Promise<any> {
    return evaluationsService.getLeaderboard(...args);
  }
};
