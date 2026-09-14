/**
 * Contests Service
 *
 * API client for contests domain.
 * Uses ApiResponse<T> pattern - response.data is already T.
 *
 * TODO(client): Migrate all endpoints to typed client when generated.
 * Currently using apiClient.get/post() as temporary fallback.
 */

import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { getEffectiveOrgId } from "@/services/shared/infrastructure/tenant-state";
import { validateApiResponse, formatValidationError } from "@/services/shared/contracts";
// TODO: Import schemas from contracts
// import { ... } from "./contracts";
// TODO: Import types from api-types
// import type { ... } from "./contests.api-types";

// ============================================================================
// Response Type Definitions (for API responses)
// ============================================================================

const rawContestsService = {
  /**
   * List contests
   */
  async getContest(params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/v1/contests` + (params ? `?${new URLSearchParams(params).toString()}` : '');

    // TODO(client): migrate when generated
    const response = await apiClient.get<any>(url, {

      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  },

  /**
   * Create a draft contest
   */
  async createContest(data?: any, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/v1/contests`;

    // TODO(client): migrate when generated
    const response = await apiClient.post<any>(url, {
      body: data,
      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  },

  /**
   * Get contest
   */
  async getContest(contestId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/v1/contests/${contestId}` + (params ? `?${new URLSearchParams(params).toString()}` : '');

    // TODO(client): migrate when generated
    const response = await apiClient.get<any>(url, {

      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  },

  /**
   * Update draft contest rules (blocked after escrow lock)
   */
  async updateContest(contestId: string, data?: any, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/v1/contests/${contestId}`;

    // TODO(client): migrate when generated
    const response = await apiClient.patch<any>(url, {
      body: data,
      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  },

  /**
   * Cancel a contest (pre-fund or per return rules)
   */
  async updateContest(contestId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/v1/contests/${contestId}` + (params ? `?${new URLSearchParams(params).toString()}` : '');

    // TODO(client): migrate when generated
    const response = await apiClient.delete<any>(url, {

      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return undefined;
  },

  /**
   * Generate attestation export for contests in a period (BR-12)
   */
  async createExport(data?: any, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/v1/audit/exports`;

    // TODO(client): migrate when generated
    const response = await apiClient.post<any>(url, {
      body: data,
      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  }
};

// Wrap service with error handling and logging
export const contestsService = makeService(rawContestsService, "contests");
