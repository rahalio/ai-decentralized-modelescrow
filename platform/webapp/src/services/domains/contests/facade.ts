/**
 * Contests Domain Facade
 *
 * High-level API for contests domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { contestsService } from "./contests.service";
// TODO: Import types
// import type { ... } from "./contests.api-types";

/**
 * Contests Facade
 *
 * High-level API for contests operations.
 * Components should use this facade instead of services directly.
 */
export const contestsFacade = {
  /**
   * List contests
   */
  async getContest(...args: Parameters<typeof contestsService.getContest>): Promise<any> {
    return contestsService.getContest(...args);
  },

  /**
   * Create a draft contest
   */
  async createContest(...args: Parameters<typeof contestsService.createContest>): Promise<any> {
    return contestsService.createContest(...args);
  },

  /**
   * Get contest
   */
  async getContest(...args: Parameters<typeof contestsService.getContest>): Promise<any> {
    return contestsService.getContest(...args);
  },

  /**
   * Update draft contest rules (blocked after escrow lock)
   */
  async updateContest(...args: Parameters<typeof contestsService.updateContest>): Promise<any> {
    return contestsService.updateContest(...args);
  },

  /**
   * Cancel a contest (pre-fund or per return rules)
   */
  async updateContest(...args: Parameters<typeof contestsService.updateContest>): Promise<any> {
    return contestsService.updateContest(...args);
  },

  /**
   * Generate attestation export for contests in a period (BR-12)
   */
  async createExport(...args: Parameters<typeof contestsService.createExport>): Promise<any> {
    return contestsService.createExport(...args);
  }
};
