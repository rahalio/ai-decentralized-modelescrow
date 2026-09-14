import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createContest_Body = z
  .object({
    title: z.string().min(1).max(200),
    datasetId: z.string().optional(),
    datasetHash: z.string(),
    evaluationFunction: z.string(),
    metricName: z.string(),
    acceptanceThreshold: z.number().optional(),
    sealedEvaluation: z.boolean().optional(),
    leaderboardVisibility: z.enum(['public', 'private']).optional(),
    rewardAmount: z.number(),
    rewardCurrency: z.string().optional(),
    takeRate: z.number().optional(),
    deadline: z.string().datetime({ offset: true }),
    requireHumanDeployGate: z.boolean().optional(),
  })
  .passthrough();
const updateContest_Body = z
  .object({
    title: z.string(),
    datasetId: z.string(),
    datasetHash: z.string(),
    evaluationFunction: z.string(),
    metricName: z.string(),
    acceptanceThreshold: z.number(),
    sealedEvaluation: z.boolean(),
    leaderboardVisibility: z.enum(['public', 'private']),
    rewardAmount: z.number(),
    rewardCurrency: z.string(),
    takeRate: z.number(),
    deadline: z.string().datetime({ offset: true }),
    requireHumanDeployGate: z.boolean(),
  })
  .partial()
  .passthrough();
const createAuditExport_Body = z
  .object({
    from: z.string().datetime({ offset: true }),
    to: z.string().datetime({ offset: true }),
    contestIds: z
      .array(z.string().regex(/^cnt_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
  })
  .passthrough();
const ContestStatus = z.enum([
  'draft',
  'funded',
  'open',
  'evaluating',
  'settled',
  'cancelled',
]);
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
const ContestId = z.string();
const Contest = z
  .object({
    contestId: z.string().regex(/^cnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    title: z.string().min(1).max(200),
    status: z.enum([
      'draft',
      'funded',
      'open',
      'evaluating',
      'settled',
      'cancelled',
    ]),
    datasetId: z.string().optional(),
    datasetHash: z.string(),
    evaluationFunction: z.string(),
    metricName: z.string(),
    acceptanceThreshold: z.number().optional(),
    sealedEvaluation: z.boolean().optional().default(false),
    leaderboardVisibility: z
      .enum(['public', 'private'])
      .optional()
      .default('public'),
    rewardAmount: z.number(),
    rewardCurrency: z.string().optional().default('USD'),
    takeRate: z.number().optional(),
    deadline: z.string().datetime({ offset: true }),
    requireHumanDeployGate: z.boolean().optional().default(false),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ContestListData = z
  .object({
    items: z.array(
      z
        .object({
          contestId: z.string().regex(/^cnt_[0-9A-HJKMNP-TV-Z]{26}$/),
          title: z.string().min(1).max(200),
          status: z.enum([
            'draft',
            'funded',
            'open',
            'evaluating',
            'settled',
            'cancelled',
          ]),
          datasetId: z.string().optional(),
          datasetHash: z.string(),
          evaluationFunction: z.string(),
          metricName: z.string(),
          acceptanceThreshold: z.number().optional(),
          sealedEvaluation: z.boolean().optional().default(false),
          leaderboardVisibility: z
            .enum(['public', 'private'])
            .optional()
            .default('public'),
          rewardAmount: z.number(),
          rewardCurrency: z.string().optional().default('USD'),
          takeRate: z.number().optional(),
          deadline: z.string().datetime({ offset: true }),
          requireHumanDeployGate: z.boolean().optional().default(false),
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
const ContestListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              contestId: z.string().regex(/^cnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              title: z.string().min(1).max(200),
              status: z.enum([
                'draft',
                'funded',
                'open',
                'evaluating',
                'settled',
                'cancelled',
              ]),
              datasetId: z.string().optional(),
              datasetHash: z.string(),
              evaluationFunction: z.string(),
              metricName: z.string(),
              acceptanceThreshold: z.number().optional(),
              sealedEvaluation: z.boolean().optional().default(false),
              leaderboardVisibility: z
                .enum(['public', 'private'])
                .optional()
                .default('public'),
              rewardAmount: z.number(),
              rewardCurrency: z.string().optional().default('USD'),
              takeRate: z.number().optional(),
              deadline: z.string().datetime({ offset: true }),
              requireHumanDeployGate: z.boolean().optional().default(false),
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
const ContestCreateRequest = z
  .object({
    title: z.string().min(1).max(200),
    datasetId: z.string().optional(),
    datasetHash: z.string(),
    evaluationFunction: z.string(),
    metricName: z.string(),
    acceptanceThreshold: z.number().optional(),
    sealedEvaluation: z.boolean().optional(),
    leaderboardVisibility: z.enum(['public', 'private']).optional(),
    rewardAmount: z.number(),
    rewardCurrency: z.string().optional(),
    takeRate: z.number().optional(),
    deadline: z.string().datetime({ offset: true }),
    requireHumanDeployGate: z.boolean().optional(),
  })
  .passthrough();
const ContestResponse = z
  .object({
    data: z
      .object({
        contestId: z.string().regex(/^cnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        title: z.string().min(1).max(200),
        status: z.enum([
          'draft',
          'funded',
          'open',
          'evaluating',
          'settled',
          'cancelled',
        ]),
        datasetId: z.string().optional(),
        datasetHash: z.string(),
        evaluationFunction: z.string(),
        metricName: z.string(),
        acceptanceThreshold: z.number().optional(),
        sealedEvaluation: z.boolean().optional().default(false),
        leaderboardVisibility: z
          .enum(['public', 'private'])
          .optional()
          .default('public'),
        rewardAmount: z.number(),
        rewardCurrency: z.string().optional().default('USD'),
        takeRate: z.number().optional(),
        deadline: z.string().datetime({ offset: true }),
        requireHumanDeployGate: z.boolean().optional().default(false),
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
const ContestUpdateRequest = z
  .object({
    title: z.string(),
    datasetId: z.string(),
    datasetHash: z.string(),
    evaluationFunction: z.string(),
    metricName: z.string(),
    acceptanceThreshold: z.number(),
    sealedEvaluation: z.boolean(),
    leaderboardVisibility: z.enum(['public', 'private']),
    rewardAmount: z.number(),
    rewardCurrency: z.string(),
    takeRate: z.number(),
    deadline: z.string().datetime({ offset: true }),
    requireHumanDeployGate: z.boolean(),
  })
  .partial()
  .passthrough();
const AuditExportRequest = z
  .object({
    from: z.string().datetime({ offset: true }),
    to: z.string().datetime({ offset: true }),
    contestIds: z
      .array(z.string().regex(/^cnt_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
  })
  .passthrough();
const AuditExport = z
  .object({
    exportId: z.string(),
    downloadUri: z.string().url(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const AuditExportResponse = z
  .object({
    data: z
      .object({
        exportId: z.string(),
        downloadUri: z.string().url(),
        createdAt: z.string().datetime({ offset: true }),
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
  createContest_Body,
  updateContest_Body,
  createAuditExport_Body,
  ContestStatus,
  Problem,
  ContestId,
  Contest,
  ContestListData,
  ResponseMeta,
  ContestListResponse,
  ContestCreateRequest,
  ContestResponse,
  ContestUpdateRequest,
  AuditExportRequest,
  AuditExport,
  AuditExportResponse,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/audit/exports',
    alias: 'createAuditExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createAuditExport_Body,
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
            exportId: z.string(),
            downloadUri: z.string().url(),
            createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/contests',
    alias: 'listContests',
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
          .enum([
            'draft',
            'funded',
            'open',
            'evaluating',
            'settled',
            'cancelled',
          ])
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
                  contestId: z.string().regex(/^cnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  title: z.string().min(1).max(200),
                  status: z.enum([
                    'draft',
                    'funded',
                    'open',
                    'evaluating',
                    'settled',
                    'cancelled',
                  ]),
                  datasetId: z.string().optional(),
                  datasetHash: z.string(),
                  evaluationFunction: z.string(),
                  metricName: z.string(),
                  acceptanceThreshold: z.number().optional(),
                  sealedEvaluation: z.boolean().optional().default(false),
                  leaderboardVisibility: z
                    .enum(['public', 'private'])
                    .optional()
                    .default('public'),
                  rewardAmount: z.number(),
                  rewardCurrency: z.string().optional().default('USD'),
                  takeRate: z.number().optional(),
                  deadline: z.string().datetime({ offset: true }),
                  requireHumanDeployGate: z.boolean().optional().default(false),
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
    path: '/v1/contests',
    alias: 'createContest',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createContest_Body,
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
            contestId: z.string().regex(/^cnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            title: z.string().min(1).max(200),
            status: z.enum([
              'draft',
              'funded',
              'open',
              'evaluating',
              'settled',
              'cancelled',
            ]),
            datasetId: z.string().optional(),
            datasetHash: z.string(),
            evaluationFunction: z.string(),
            metricName: z.string(),
            acceptanceThreshold: z.number().optional(),
            sealedEvaluation: z.boolean().optional().default(false),
            leaderboardVisibility: z
              .enum(['public', 'private'])
              .optional()
              .default('public'),
            rewardAmount: z.number(),
            rewardCurrency: z.string().optional().default('USD'),
            takeRate: z.number().optional(),
            deadline: z.string().datetime({ offset: true }),
            requireHumanDeployGate: z.boolean().optional().default(false),
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
        status: 400,
        description: `Malformed request`,
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
    path: '/v1/contests/:contestId',
    alias: 'getContest',
    requestFormat: 'json',
    parameters: [
      {
        name: 'contestId',
        type: 'Path',
        schema: z.string().regex(/^cnt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            contestId: z.string().regex(/^cnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            title: z.string().min(1).max(200),
            status: z.enum([
              'draft',
              'funded',
              'open',
              'evaluating',
              'settled',
              'cancelled',
            ]),
            datasetId: z.string().optional(),
            datasetHash: z.string(),
            evaluationFunction: z.string(),
            metricName: z.string(),
            acceptanceThreshold: z.number().optional(),
            sealedEvaluation: z.boolean().optional().default(false),
            leaderboardVisibility: z
              .enum(['public', 'private'])
              .optional()
              .default('public'),
            rewardAmount: z.number(),
            rewardCurrency: z.string().optional().default('USD'),
            takeRate: z.number().optional(),
            deadline: z.string().datetime({ offset: true }),
            requireHumanDeployGate: z.boolean().optional().default(false),
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
    method: 'patch',
    path: '/v1/contests/:contestId',
    alias: 'updateContest',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateContest_Body,
      },
      {
        name: 'contestId',
        type: 'Path',
        schema: z.string().regex(/^cnt_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            contestId: z.string().regex(/^cnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            title: z.string().min(1).max(200),
            status: z.enum([
              'draft',
              'funded',
              'open',
              'evaluating',
              'settled',
              'cancelled',
            ]),
            datasetId: z.string().optional(),
            datasetHash: z.string(),
            evaluationFunction: z.string(),
            metricName: z.string(),
            acceptanceThreshold: z.number().optional(),
            sealedEvaluation: z.boolean().optional().default(false),
            leaderboardVisibility: z
              .enum(['public', 'private'])
              .optional()
              .default('public'),
            rewardAmount: z.number(),
            rewardCurrency: z.string().optional().default('USD'),
            takeRate: z.number().optional(),
            deadline: z.string().datetime({ offset: true }),
            requireHumanDeployGate: z.boolean().optional().default(false),
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
  {
    method: 'delete',
    path: '/v1/contests/:contestId',
    alias: 'cancelContest',
    requestFormat: 'json',
    parameters: [
      {
        name: 'contestId',
        type: 'Path',
        schema: z.string().regex(/^cnt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z.void(),
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
