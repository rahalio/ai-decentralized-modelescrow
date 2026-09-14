import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createDeployGate_Body = z
  .object({
    submissionId: z.string(),
    registryWebhookUri: z.string().url().optional(),
  })
  .passthrough();
const decideDeployGate_Body = z
  .object({
    decision: z.enum(['approve', 'hold']),
    holdReason: z.string().optional(),
    registryWebhookUri: z.string().url().optional(),
  })
  .passthrough();
const DeployGateStatus = z.enum(['pending_review', 'approved', 'held']);
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const DeployGateId = z.string();
const DeployGate = z
  .object({
    deployGateId: z.string().regex(/^dgt_[0-9A-HJKMNP-TV-Z]{26}$/),
    contestId: z.string(),
    submissionId: z.string(),
    status: z.enum(['pending_review', 'approved', 'held']),
    metricPass: z.boolean().optional(),
    holdReason: z.string().optional(),
    registryWebhookUri: z.string().url().optional(),
    promotedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DeployGateListData = z
  .object({
    items: z.array(
      z
        .object({
          deployGateId: z.string().regex(/^dgt_[0-9A-HJKMNP-TV-Z]{26}$/),
          contestId: z.string(),
          submissionId: z.string(),
          status: z.enum(['pending_review', 'approved', 'held']),
          metricPass: z.boolean().optional(),
          holdReason: z.string().optional(),
          registryWebhookUri: z.string().url().optional(),
          promotedAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const DeployGateListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              deployGateId: z.string().regex(/^dgt_[0-9A-HJKMNP-TV-Z]{26}$/),
              contestId: z.string(),
              submissionId: z.string(),
              status: z.enum(['pending_review', 'approved', 'held']),
              metricPass: z.boolean().optional(),
              holdReason: z.string().optional(),
              registryWebhookUri: z.string().url().optional(),
              promotedAt: z.string().datetime({ offset: true }).optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const DeployGateResponse = z
  .object({
    data: z
      .object({
        deployGateId: z.string().regex(/^dgt_[0-9A-HJKMNP-TV-Z]{26}$/),
        contestId: z.string(),
        submissionId: z.string(),
        status: z.enum(['pending_review', 'approved', 'held']),
        metricPass: z.boolean().optional(),
        holdReason: z.string().optional(),
        registryWebhookUri: z.string().url().optional(),
        promotedAt: z.string().datetime({ offset: true }).optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const DeployGateDecisionRequest = z
  .object({
    decision: z.enum(['approve', 'hold']),
    holdReason: z.string().optional(),
    registryWebhookUri: z.string().url().optional(),
  })
  .passthrough();

export const schemas: any = {
  createDeployGate_Body,
  decideDeployGate_Body,
  DeployGateStatus,
  Problem,
  DeployGateId,
  DeployGate,
  DeployGateListData,
  ResponseMeta,
  DeployGateListResponse,
  DeployGateResponse,
  DeployGateDecisionRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/contests/:contestId/deploy-gates',
    alias: 'listDeployGates',
    requestFormat: 'json',
    parameters: [
      {
        name: 'contestId',
        type: 'Path',
        schema: z.string(),
      },
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['pending_review', 'approved', 'held']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  deployGateId: z
                    .string()
                    .regex(/^dgt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  contestId: z.string(),
                  submissionId: z.string(),
                  status: z.enum(['pending_review', 'approved', 'held']),
                  metricPass: z.boolean().optional(),
                  holdReason: z.string().optional(),
                  registryWebhookUri: z.string().url().optional(),
                  promotedAt: z.string().datetime({ offset: true }).optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/contests/:contestId/deploy-gates',
    alias: 'createDeployGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createDeployGate_Body,
      },
      {
        name: 'contestId',
        type: 'Path',
        schema: z.string(),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            deployGateId: z.string().regex(/^dgt_[0-9A-HJKMNP-TV-Z]{26}$/),
            contestId: z.string(),
            submissionId: z.string(),
            status: z.enum(['pending_review', 'approved', 'held']),
            metricPass: z.boolean().optional(),
            holdReason: z.string().optional(),
            registryWebhookUri: z.string().url().optional(),
            promotedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/deploy-gates/:deployGateId',
    alias: 'getDeployGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'deployGateId',
        type: 'Path',
        schema: z.string().regex(/^dgt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            deployGateId: z.string().regex(/^dgt_[0-9A-HJKMNP-TV-Z]{26}$/),
            contestId: z.string(),
            submissionId: z.string(),
            status: z.enum(['pending_review', 'approved', 'held']),
            metricPass: z.boolean().optional(),
            holdReason: z.string().optional(),
            registryWebhookUri: z.string().url().optional(),
            promotedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/deploy-gates/:deployGateId',
    alias: 'decideDeployGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: decideDeployGate_Body,
      },
      {
        name: 'deployGateId',
        type: 'Path',
        schema: z.string().regex(/^dgt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            deployGateId: z.string().regex(/^dgt_[0-9A-HJKMNP-TV-Z]{26}$/),
            contestId: z.string(),
            submissionId: z.string(),
            status: z.enum(['pending_review', 'approved', 'held']),
            metricPass: z.boolean().optional(),
            holdReason: z.string().optional(),
            registryWebhookUri: z.string().url().optional(),
            promotedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
