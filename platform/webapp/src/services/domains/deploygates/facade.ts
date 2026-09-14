/**
 * Deploygates Domain Facade
 *
 * High-level API for deploygates domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { deploygatesService } from "./deploygates.service";
// TODO: Import types
// import type { ... } from "./deploygates.api-types";

/**
 * Deploygates Facade
 *
 * High-level API for deploygates operations.
 * Components should use this facade instead of services directly.
 */
export const deploygatesFacade = {
  /**
   * List deploy gates for a contest
   */
  async getDeployGate(...args: Parameters<typeof deploygatesService.getDeployGate>): Promise<any> {
    return deploygatesService.getDeployGate(...args);
  },

  /**
   * Open a deploy gate for a winning submission
   */
  async createDeployGate(...args: Parameters<typeof deploygatesService.createDeployGate>): Promise<any> {
    return deploygatesService.createDeployGate(...args);
  },

  /**
   * Get deploy gate
   */
  async getDeployGate(...args: Parameters<typeof deploygatesService.getDeployGate>): Promise<any> {
    return deploygatesService.getDeployGate(...args);
  },

  /**
   * Approve promote or hold for gaming review
   */
  async getDeployGate(...args: Parameters<typeof deploygatesService.getDeployGate>): Promise<any> {
    return deploygatesService.getDeployGate(...args);
  }
};
