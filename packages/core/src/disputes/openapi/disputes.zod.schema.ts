import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const openEvaluationDispute_Body = z
  .object({
    contestId: z.string(),
    submissionId: z.string(),
    evaluationRunId: z.string().optional(),
    claim: z.string().min(1),
    evidenceUri: z.string().url().optional(),
  })
  .passthrough();
const resolveDispute_Body = z
  .object({
    status: z.enum(['resolved', 'rejected']),
    resolutionNote: z.string().min(1),
  })
  .passthrough();
const DisputeStatus = z.enum(['open', 'resolved', 'rejected', 'expired']);
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
const DisputeId = z.string();
const Dispute = z
  .object({
    disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
    contestId: z.string(),
    submissionId: z.string(),
    evaluationRunId: z.string().optional(),
    status: z.enum(['open', 'resolved', 'rejected', 'expired']),
    claim: z.string(),
    evidenceUri: z.string().url().optional(),
    resolutionNote: z.string().optional(),
    deadline: z.string().datetime({ offset: true }),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DisputeListData = z
  .object({
    items: z.array(
      z
        .object({
          disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
          contestId: z.string(),
          submissionId: z.string(),
          evaluationRunId: z.string().optional(),
          status: z.enum(['open', 'resolved', 'rejected', 'expired']),
          claim: z.string(),
          evidenceUri: z.string().url().optional(),
          resolutionNote: z.string().optional(),
          deadline: z.string().datetime({ offset: true }),
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
const DisputeListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
              contestId: z.string(),
              submissionId: z.string(),
              evaluationRunId: z.string().optional(),
              status: z.enum(['open', 'resolved', 'rejected', 'expired']),
              claim: z.string(),
              evidenceUri: z.string().url().optional(),
              resolutionNote: z.string().optional(),
              deadline: z.string().datetime({ offset: true }),
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
const DisputeCreateRequest = z
  .object({
    contestId: z.string(),
    submissionId: z.string(),
    evaluationRunId: z.string().optional(),
    claim: z.string().min(1),
    evidenceUri: z.string().url().optional(),
  })
  .passthrough();
const DisputeResponse = z
  .object({
    data: z
      .object({
        disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
        contestId: z.string(),
        submissionId: z.string(),
        evaluationRunId: z.string().optional(),
        status: z.enum(['open', 'resolved', 'rejected', 'expired']),
        claim: z.string(),
        evidenceUri: z.string().url().optional(),
        resolutionNote: z.string().optional(),
        deadline: z.string().datetime({ offset: true }),
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
const DisputeResolveRequest = z
  .object({
    status: z.enum(['resolved', 'rejected']),
    resolutionNote: z.string().min(1),
  })
  .passthrough();

export const schemas: any = {
  openEvaluationDispute_Body,
  resolveDispute_Body,
  DisputeStatus,
  Problem,
  DisputeId,
  Dispute,
  DisputeListData,
  ResponseMeta,
  DisputeListResponse,
  DisputeCreateRequest,
  DisputeResponse,
  DisputeResolveRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/disputes',
    alias: 'listDisputes',
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
        schema: z.enum(['open', 'resolved', 'rejected', 'expired']).optional(),
      },
      {
        name: 'contestId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
                  contestId: z.string(),
                  submissionId: z.string(),
                  evaluationRunId: z.string().optional(),
                  status: z.enum(['open', 'resolved', 'rejected', 'expired']),
                  claim: z.string(),
                  evidenceUri: z.string().url().optional(),
                  resolutionNote: z.string().optional(),
                  deadline: z.string().datetime({ offset: true }),
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
    path: '/v1/disputes',
    alias: 'openEvaluationDispute',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: openEvaluationDispute_Body,
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
            disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
            contestId: z.string(),
            submissionId: z.string(),
            evaluationRunId: z.string().optional(),
            status: z.enum(['open', 'resolved', 'rejected', 'expired']),
            claim: z.string(),
            evidenceUri: z.string().url().optional(),
            resolutionNote: z.string().optional(),
            deadline: z.string().datetime({ offset: true }),
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
    path: '/v1/disputes/:disputeId',
    alias: 'getDispute',
    requestFormat: 'json',
    parameters: [
      {
        name: 'disputeId',
        type: 'Path',
        schema: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
            contestId: z.string(),
            submissionId: z.string(),
            evaluationRunId: z.string().optional(),
            status: z.enum(['open', 'resolved', 'rejected', 'expired']),
            claim: z.string(),
            evidenceUri: z.string().url().optional(),
            resolutionNote: z.string().optional(),
            deadline: z.string().datetime({ offset: true }),
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
    path: '/v1/disputes/:disputeId',
    alias: 'resolveDispute',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: resolveDispute_Body,
      },
      {
        name: 'disputeId',
        type: 'Path',
        schema: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
            contestId: z.string(),
            submissionId: z.string(),
            evaluationRunId: z.string().optional(),
            status: z.enum(['open', 'resolved', 'rejected', 'expired']),
            claim: z.string(),
            evidenceUri: z.string().url().optional(),
            resolutionNote: z.string().optional(),
            deadline: z.string().datetime({ offset: true }),
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
