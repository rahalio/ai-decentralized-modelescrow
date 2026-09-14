import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const settleContest_Body = z
  .object({
    winnerSubmissionId: z.string(),
    complianceCleared: z.boolean().optional(),
  })
  .passthrough();
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
const SettlementId = z.string();
const SettlementStatus = z.enum([
  'pending',
  'paid',
  'returned',
  'blocked_compliance',
]);
const Settlement = z
  .object({
    settlementId: z.string().regex(/^stl_[0-9A-HJKMNP-TV-Z]{26}$/),
    contestId: z.string(),
    status: z.enum(['pending', 'paid', 'returned', 'blocked_compliance']),
    winnerSubmissionId: z.string().optional(),
    payoutReference: z.string().optional(),
    complianceCleared: z.boolean().optional(),
    takeRate: z.number().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
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
const SettlementResponse = z
  .object({
    data: z
      .object({
        settlementId: z.string().regex(/^stl_[0-9A-HJKMNP-TV-Z]{26}$/),
        contestId: z.string(),
        status: z.enum(['pending', 'paid', 'returned', 'blocked_compliance']),
        winnerSubmissionId: z.string().optional(),
        payoutReference: z.string().optional(),
        complianceCleared: z.boolean().optional(),
        takeRate: z.number().optional(),
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
const SettlementRequest = z
  .object({
    winnerSubmissionId: z.string(),
    complianceCleared: z.boolean().optional(),
  })
  .passthrough();
const SettlementListData = z
  .object({
    items: z.array(
      z
        .object({
          settlementId: z.string().regex(/^stl_[0-9A-HJKMNP-TV-Z]{26}$/),
          contestId: z.string(),
          status: z.enum(['pending', 'paid', 'returned', 'blocked_compliance']),
          winnerSubmissionId: z.string().optional(),
          payoutReference: z.string().optional(),
          complianceCleared: z.boolean().optional(),
          takeRate: z.number().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const SettlementListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              settlementId: z.string().regex(/^stl_[0-9A-HJKMNP-TV-Z]{26}$/),
              contestId: z.string(),
              status: z.enum([
                'pending',
                'paid',
                'returned',
                'blocked_compliance',
              ]),
              winnerSubmissionId: z.string().optional(),
              payoutReference: z.string().optional(),
              complianceCleared: z.boolean().optional(),
              takeRate: z.number().optional(),
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

export const schemas: any = {
  settleContest_Body,
  Problem,
  SettlementId,
  SettlementStatus,
  Settlement,
  ResponseMeta,
  SettlementResponse,
  SettlementRequest,
  SettlementListData,
  SettlementListResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/contests/:contestId/settlement',
    alias: 'getSettlement',
    requestFormat: 'json',
    parameters: [
      {
        name: 'contestId',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            settlementId: z.string().regex(/^stl_[0-9A-HJKMNP-TV-Z]{26}$/),
            contestId: z.string(),
            status: z.enum([
              'pending',
              'paid',
              'returned',
              'blocked_compliance',
            ]),
            winnerSubmissionId: z.string().optional(),
            payoutReference: z.string().optional(),
            complianceCleared: z.boolean().optional(),
            takeRate: z.number().optional(),
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
    path: '/v1/contests/:contestId/settlement',
    alias: 'settleContest',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: settleContest_Body,
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
            settlementId: z.string().regex(/^stl_[0-9A-HJKMNP-TV-Z]{26}$/),
            contestId: z.string(),
            status: z.enum([
              'pending',
              'paid',
              'returned',
              'blocked_compliance',
            ]),
            winnerSubmissionId: z.string().optional(),
            payoutReference: z.string().optional(),
            complianceCleared: z.boolean().optional(),
            takeRate: z.number().optional(),
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
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
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
    path: '/v1/settlements',
    alias: 'listSettlements',
    requestFormat: 'json',
    parameters: [
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
        schema: z
          .enum(['pending', 'paid', 'returned', 'blocked_compliance'])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  settlementId: z
                    .string()
                    .regex(/^stl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  contestId: z.string(),
                  status: z.enum([
                    'pending',
                    'paid',
                    'returned',
                    'blocked_compliance',
                  ]),
                  winnerSubmissionId: z.string().optional(),
                  payoutReference: z.string().optional(),
                  complianceCleared: z.boolean().optional(),
                  takeRate: z.number().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
