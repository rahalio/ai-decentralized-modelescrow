import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { contestsApi, evaluationsApi } from '@/api/modelescrow';
import { EvaluationLogDrawer, MetricDefinitionLock, Panel } from '@/components/desk';

export function LeaderboardPage() {
  const { contestId = '' } = useParams();
  const contest = useQuery({
    queryKey: ['contest', contestId],
    queryFn: async () => (await contestsApi.get(contestId)).data,
    enabled: !!contestId,
  });
  const board = useQuery({
    queryKey: ['leaderboard', contestId],
    queryFn: async () => (await evaluationsApi.leaderboard(contestId)).data,
    enabled: !!contestId,
  });
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const run = useQuery({
    queryKey: ['evaluation', selectedRunId],
    queryFn: async () => (await evaluationsApi.get(selectedRunId!)).data,
    enabled: !!selectedRunId,
  });

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Leaderboard</h1>
      <p style={{ color: 'var(--color-steel)' }}>
        Ranked by published metric with reproducible EvaluationRun evidence.
      </p>
      {contest.data && (
        <div style={{ marginBottom: 16 }}>
          <MetricDefinitionLock
            metricName={contest.data.metricName}
            evaluationFunction={contest.data.evaluationFunction}
            locked={contest.data.status !== 'draft'}
          />
        </div>
      )}
      <Panel title={contest.data?.title ?? 'Contest'}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th align="left">Rank</th>
              <th align="left">Submission</th>
              <th align="left">Provider</th>
              <th align="left">Score</th>
              <th align="left">Evidence</th>
            </tr>
          </thead>
          <tbody>
            {(board.data?.entries ?? []).map((row) => (
              <tr key={row.submissionId}>
                <td>{row.rank}</td>
                <td className="mono">{row.submissionId}</td>
                <td className="mono">{row.providerId}</td>
                <td style={{ color: 'var(--color-teal)' }}>{row.score}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => setSelectedRunId(row.evaluationRunId ?? null)}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--color-slate-700)',
                      color: 'var(--color-ink)',
                      borderRadius: 4,
                      padding: '4px 8px',
                      cursor: 'pointer',
                    }}
                  >
                    Open log
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(board.data?.entries?.length ?? 0) === 0 && (
          <p style={{ color: 'var(--color-steel)' }}>No scored submissions yet.</p>
        )}
      </Panel>
      <EvaluationLogDrawer
        open={!!selectedRunId}
        onClose={() => setSelectedRunId(null)}
        run={
          run.data
            ? {
                evaluationRunId: run.data.evaluationRunId,
                metricName: run.data.metricName,
                environmentHash: run.data.environmentHash,
                logExcerpt: run.data.logExcerpt,
                score: run.data.score,
              }
            : undefined
        }
      />
    </div>
  );
}
