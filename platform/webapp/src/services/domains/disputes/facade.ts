/**
 * Disputes Domain Facade
 *
 * High-level API for disputes domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { disputesService } from "./disputes.service";
// TODO: Import types
// import type { ... } from "./disputes.api-types";

/**
 * Disputes Facade
 *
 * High-level API for disputes operations.
 * Components should use this facade instead of services directly.
 */
export const disputesFacade = {
  /**
   * List disputes
   */
  async getDispute(...args: Parameters<typeof disputesService.getDispute>): Promise<any> {
    return disputesService.getDispute(...args);
  },

  /**
   * Open a time-boxed evaluation dispute
   */
  async getDispute(...args: Parameters<typeof disputesService.getDispute>): Promise<any> {
    return disputesService.getDispute(...args);
  },

  /**
   * Get dispute
   */
  async getDispute(...args: Parameters<typeof disputesService.getDispute>): Promise<any> {
    return disputesService.getDispute(...args);
  },

  /**
   * Resolve or reject a dispute
   */
  async getDispute(...args: Parameters<typeof disputesService.getDispute>): Promise<any> {
    return disputesService.getDispute(...args);
  }
};
