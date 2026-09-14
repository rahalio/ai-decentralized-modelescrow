export type ContestStatus =
  | 'draft'
  | 'funded'
  | 'open'
  | 'evaluating'
  | 'settled'
  | 'cancelled';

export interface Contest {
  contestId: string;
  title: string;
  status: ContestStatus;
  datasetHash: string;
  evaluationFunction: string;
  metricName: string;
  sealedEvaluation?: boolean;
  leaderboardVisibility?: 'public' | 'private';
  rewardAmount: number;
  rewardCurrency?: string;
  takeRate?: number;
  deadline: string;
  requireHumanDeployGate?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Escrow {
  escrowId: string;
  contestId: string;
  status: 'draft' | 'locked' | 'released' | 'returned';
  amount: number;
  currency: string;
  takeRate: number;
  takeAmount?: number;
  railReference?: string;
  releaseConditions?: string;
}

export interface Submission {
  submissionId: string;
  contestId: string;
  providerId: string;
  artefactUri: string;
  artefactHash: string;
  status: 'received' | 'evaluating' | 'scored' | 'invalid' | 'withdrawn';
}

export interface EvaluationRun {
  evaluationRunId: string;
  submissionId: string;
  contestId: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'invalidated';
  score?: number;
  metricName: string;
  environmentHash?: string;
  logHash?: string;
  logExcerpt?: string;
  invalidationReason?: string;
}

export interface Leaderboard {
  contestId: string;
  entries: Array<{
    submissionId: string;
    providerId: string;
    score: number;
    rank: number;
    evaluationRunId?: string;
  }>;
  visibility?: 'public' | 'private';
}

export interface Dispute {
  disputeId: string;
  contestId: string;
  submissionId: string;
  evaluationRunId?: string;
  status: 'open' | 'resolved' | 'rejected' | 'expired';
  claim: string;
  evidenceUri?: string;
  resolutionNote?: string;
  deadline: string;
}

export interface Settlement {
  settlementId: string;
  contestId: string;
  status: 'pending' | 'paid' | 'returned' | 'blocked_compliance';
  winnerSubmissionId?: string;
  payoutReference?: string;
  complianceCleared?: boolean;
  takeRate?: number;
}

export interface DeployGate {
  deployGateId: string;
  contestId: string;
  submissionId: string;
  status: 'pending_review' | 'approved' | 'held';
  metricPass?: boolean;
  holdReason?: string;
}

export type Workspace = 'requester' | 'provider' | 'ops';
