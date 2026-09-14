/**
 * Escrows Domain Facade
 *
 * High-level API for escrows domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { escrowsService } from "./escrows.service";
// TODO: Import types
// import type { ... } from "./escrows.api-types";

/**
 * Escrows Facade
 *
 * High-level API for escrows operations.
 * Components should use this facade instead of services directly.
 */
export const escrowsFacade = {
  /**
   * Get escrow for contest
   */
  async getEscrow(...args: Parameters<typeof escrowsService.getEscrow>): Promise<any> {
    return escrowsService.getEscrow(...args);
  },

  /**
   * Lock escrow after contest rules are complete (BR-1, BR-2)
   */
  async getEscrow(...args: Parameters<typeof escrowsService.getEscrow>): Promise<any> {
    return escrowsService.getEscrow(...args);
  },

  /**
   * Get escrow by id
   */
  async getEscrowById(...args: Parameters<typeof escrowsService.getEscrowById>): Promise<any> {
    return escrowsService.getEscrowById(...args);
  }
};
