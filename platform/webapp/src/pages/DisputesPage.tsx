import { useQuery } from '@tanstack/react-query';
import { disputesApi } from '@/api/modelescrow';
import { DisputeDeadlineChip, Panel } from '@/components/desk';

export function DisputesPage() {
  const disputes = useQuery({
    queryKey: ['disputes'],
    queryFn: async () => (await disputesApi.list()).data.items,
  });

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Disputes</h1>
      <p style={{ color: 'var(--color-steel)' }}>
        Time-boxed adjudication with evaluation-log evidence.
      </p>
      <Panel title="Queue">
        {(disputes.data?.length ?? 0) === 0 && (
          <p style={{ color: 'var(--color-steel)' }}>No open disputes.</p>
        )}
        <div style={{ display: 'grid', gap: 12 }}>
          {disputes.data?.map((d) => (
            <div
              key={d.disputeId}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                padding: 14,
                border: '1px solid var(--color-slate-700)',
                borderRadius: 8,
              }}
            >
              <div>
                <div style={{ color: 'var(--color-steel)', fontSize: 12 }}>Provider claim</div>
                <p style={{ margin: '4px 0 0' }}>{d.claim}</p>
                <div style={{ marginTop: 8 }}>
                  <DisputeDeadlineChip deadline={d.deadline} />
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--color-steel)', fontSize: 12 }}>Eval evidence</div>
                <p className="mono" style={{ margin: '4px 0 0', fontSize: 12 }}>
                  {d.evaluationRunId ?? 'Attach EvaluationRun log'}
                </p>
                <p style={{ color: 'var(--color-steel)', fontSize: 13 }}>Status: {d.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
