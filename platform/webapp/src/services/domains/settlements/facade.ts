/**
 * Settlements Domain Facade
 *
 * High-level API for settlements domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { settlementsService } from "./settlements.service";
// TODO: Import types
// import type { ... } from "./settlements.api-types";

/**
 * Settlements Facade
 *
 * High-level API for settlements operations.
 * Components should use this facade instead of services directly.
 */
export const settlementsFacade = {
  /**
   * Get settlement for contest
   */
  async getSettlement(...args: Parameters<typeof settlementsService.getSettlement>): Promise<any> {
    return settlementsService.getSettlement(...args);
  },

  /**
   * Settle contest payout or return
   */
  async updateSettlement(...args: Parameters<typeof settlementsService.updateSettlement>): Promise<any> {
    return settlementsService.updateSettlement(...args);
  },

  /**
   * List settlements
   */
  async getSettlement(...args: Parameters<typeof settlementsService.getSettlement>): Promise<any> {
    return settlementsService.getSettlement(...args);
  }
};
