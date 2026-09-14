import { apiFetch } from '@/lib/api';
import type {
  Contest,
  DeployGate,
  Dispute,
  Escrow,
  EvaluationRun,
  Leaderboard,
  Settlement,
  Submission,
} from './types';

type Envelope<T> = { data: T; meta?: unknown };
type ListEnvelope<T> = { data: { items: T[]; nextCursor?: string }; meta?: unknown };

export const contestsApi = {
  list: (status?: string) =>
    apiFetch<ListEnvelope<Contest>>(
      `/v1/contests${status ? `?status=${encodeURIComponent(status)}` : ''}`
    ),
  get: (contestId: string) =>
    apiFetch<Envelope<Contest>>(`/v1/contests/${contestId}`),
  create: (body: Partial<Contest>) =>
    apiFetch<Envelope<Contest>>('/v1/contests', {
      method: 'POST',
      headers: { 'Idempotency-Key': crypto.randomUUID() },
      body: JSON.stringify(body),
    }),
  update: (contestId: string, body: Partial<Contest>) =>
    apiFetch<Envelope<Contest>>(`/v1/contests/${contestId}`, {
      method: 'PATCH',
      headers: { 'Idempotency-Key': crypto.randomUUID() },
      body: JSON.stringify(body),
    }),
};

export const escrowsApi = {
  get: (contestId: string) =>
    apiFetch<Envelope<Escrow>>(`/v1/contests/${contestId}/escrow`),
  lock: (contestId: string, body: { amount: number; currency: string; railReference?: string }) =>
    apiFetch<Envelope<Escrow>>(`/v1/contests/${contestId}/escrow`, {
      method: 'POST',
      headers: { 'Idempotency-Key': crypto.randomUUID() },
      body: JSON.stringify(body),
    }),
};

export const submissionsApi = {
  list: (contestId: string) =>
    apiFetch<ListEnvelope<Submission>>(`/v1/contests/${contestId}/submissions`),
  submit: (
    contestId: string,
    body: { artefactUri: string; artefactHash: string; artefactVersion?: string }
  ) =>
    apiFetch<Envelope<Submission>>(`/v1/contests/${contestId}/submissions`, {
      method: 'POST',
      headers: { 'Idempotency-Key': crypto.randomUUID() },
      body: JSON.stringify(body),
    }),
};

export const evaluationsApi = {
  run: (submissionId: string) =>
    apiFetch<Envelope<EvaluationRun>>(`/v1/submissions/${submissionId}/evaluations`, {
      method: 'POST',
      headers: { 'Idempotency-Key': crypto.randomUUID() },
    }),
  get: (evaluationRunId: string) =>
    apiFetch<Envelope<EvaluationRun>>(`/v1/evaluations/${evaluationRunId}`),
  leaderboard: (contestId: string) =>
    apiFetch<Envelope<Leaderboard>>(`/v1/contests/${contestId}/leaderboard`),
};

export const settlementsApi = {
  get: (contestId: string) =>
    apiFetch<Envelope<Settlement>>(`/v1/contests/${contestId}/settlement`),
  settle: (
    contestId: string,
    body: { winnerSubmissionId: string; complianceCleared?: boolean }
  ) =>
    apiFetch<Envelope<Settlement>>(`/v1/contests/${contestId}/settlement`, {
      method: 'POST',
      headers: { 'Idempotency-Key': crypto.randomUUID() },
      body: JSON.stringify(body),
    }),
  list: () => apiFetch<ListEnvelope<Settlement>>('/v1/settlements'),
};

export const disputesApi = {
  list: (status?: string) =>
    apiFetch<ListEnvelope<Dispute>>(
      `/v1/disputes${status ? `?status=${encodeURIComponent(status)}` : ''}`
    ),
  open: (body: {
    contestId: string;
    submissionId: string;
    claim: string;
    evidenceUri?: string;
  }) =>
    apiFetch<Envelope<Dispute>>('/v1/disputes', {
      method: 'POST',
      headers: { 'Idempotency-Key': crypto.randomUUID() },
      body: JSON.stringify(body),
    }),
  resolve: (
    disputeId: string,
    body: { status: 'resolved' | 'rejected'; resolutionNote: string }
  ) =>
    apiFetch<Envelope<Dispute>>(`/v1/disputes/${disputeId}`, {
      method: 'POST',
      headers: { 'Idempotency-Key': crypto.randomUUID() },
      body: JSON.stringify(body),
    }),
};

export const deployGatesApi = {
  list: (contestId: string) =>
    apiFetch<ListEnvelope<DeployGate>>(`/v1/contests/${contestId}/deploy-gates`),
  create: (contestId: string, submissionId: string) =>
    apiFetch<Envelope<DeployGate>>(`/v1/contests/${contestId}/deploy-gates`, {
      method: 'POST',
      headers: { 'Idempotency-Key': crypto.randomUUID() },
      body: JSON.stringify({ submissionId }),
    }),
  decide: (
    deployGateId: string,
    body: { decision: 'approve' | 'hold'; holdReason?: string }
  ) =>
    apiFetch<Envelope<DeployGate>>(`/v1/deploy-gates/${deployGateId}`, {
      method: 'POST',
      headers: { 'Idempotency-Key': crypto.randomUUID() },
      body: JSON.stringify(body),
    }),
};
