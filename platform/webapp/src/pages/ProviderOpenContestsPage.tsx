import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { contestsApi } from '@/api/modelescrow';
import { Panel, SealedEvalBadge } from '@/components/desk';

export function ProviderOpenContestsPage() {
  const contests = useQuery({
    queryKey: ['contests', 'open'],
    queryFn: async () => {
      const all = await contestsApi.list();
      return all.data.items.filter((c) => c.status === 'open' || c.status === 'funded');
    },
  });

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Open contests</h1>
      <p style={{ color: 'var(--color-steel)' }}>
        Escrow-funded board — capital is real before you invest compute.
      </p>
      <Panel title="Funded contests">
        {(contests.data?.length ?? 0) === 0 && (
          <p style={{ color: 'var(--color-steel)' }}>No funded contests yet.</p>
        )}
        <div style={{ display: 'grid', gap: 12 }}>
          {contests.data?.map((c) => (
            <div
              key={c.contestId}
              style={{
                padding: 14,
                border: '1px solid var(--color-slate-700)',
                borderRadius: 8,
                display: 'grid',
                gap: 6,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <strong>{c.title}</strong>
                <span className="mono" style={{ color: 'var(--color-amber)' }}>
                  {c.rewardAmount.toLocaleString()} {c.rewardCurrency ?? 'USD'}
                </span>
              </div>
              <div style={{ color: 'var(--color-steel)', fontSize: 13 }}>
                Metric <span className="mono">{c.metricName}</span> · deadline{' '}
                <span className="mono">{new Date(c.deadline).toLocaleString()}</span>
              </div>
              {c.sealedEvaluation && <SealedEvalBadge />}
              <Link to={`/contests/${c.contestId}/submit`} style={{ color: 'var(--color-teal)' }}>
                Submit model
              </Link>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
