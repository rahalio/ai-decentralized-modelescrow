import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { contestsApi, disputesApi } from '@/api/modelescrow';
import { EscrowStateBanner, Panel, SealedEvalBadge } from '@/components/desk';

export function RequesterHomePage() {
  const contests = useQuery({
    queryKey: ['contests'],
    queryFn: async () => (await contestsApi.list()).data.items,
  });
  const disputes = useQuery({
    queryKey: ['disputes', 'open'],
    queryFn: async () => (await disputesApi.list('open')).data.items,
  });

  const items = contests.data ?? [];
  const locked = items.filter((c) => c.status === 'funded' || c.status === 'open');
  const escrowTotal = locked.reduce((sum, c) => sum + (c.rewardAmount ?? 0), 0);

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Requester desk</h1>
      <p style={{ color: 'var(--color-steel)', maxWidth: 640 }}>
        Which bounties have real escrow and verified lift this cycle?
      </p>
      <EscrowStateBanner
        status={escrowTotal > 0 ? 'locked' : 'draft'}
        amount={escrowTotal}
        takeRate={items[0]?.takeRate}
      />
      <Panel
        title="Active contests"
        action={
          <Link to="/requester/contests/new" style={{ color: 'var(--color-teal)' }}>
            Create contest
          </Link>
        }
      >
        {contests.isLoading && <p style={{ color: 'var(--color-steel)' }}>Loading…</p>}
        {contests.isError && (
          <p style={{ color: 'var(--color-coral)' }}>
            Could not load contests. Check API auth (X-API-Key) and retry.
          </p>
        )}
        {!contests.isLoading && items.length === 0 && (
          <p style={{ color: 'var(--color-steel)' }}>
            Publish your first contest and lock escrow to make capital real.
          </p>
        )}
        {items.length > 0 && (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th align="left">Contest</th>
                <th align="left">Metric</th>
                <th align="left">Deadline</th>
                <th align="left">Escrow</th>
                <th align="left">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.contestId}>
                  <td>
                    <Link to={`/contests/${c.contestId}`}>{c.title}</Link>
                    {c.sealedEvaluation ? (
                      <div style={{ marginTop: 4 }}>
                        <SealedEvalBadge />
                      </div>
                    ) : null}
                  </td>
                  <td className="mono" style={{ fontSize: 13 }}>
                    {c.metricName}
                  </td>
                  <td className="mono" style={{ fontSize: 13 }}>
                    {new Date(c.deadline).toLocaleString()}
                  </td>
                  <td className="mono">{c.rewardAmount.toLocaleString()}</td>
                  <td>{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
      <Panel title="Alerts">
        {(disputes.data?.length ?? 0) === 0 ? (
          <p style={{ color: 'var(--color-steel)' }}>No open disputes.</p>
        ) : (
          <ul>
            {disputes.data?.map((d) => (
              <li key={d.disputeId}>
                Dispute on {d.submissionId} — deadline{' '}
                <span className="mono">{new Date(d.deadline).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 14,
};
