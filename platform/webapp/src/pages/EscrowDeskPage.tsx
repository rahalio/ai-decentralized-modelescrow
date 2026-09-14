import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { contestsApi, escrowsApi, settlementsApi } from '@/api/modelescrow';
import { EscrowStateBanner, Panel, SettlementAttestationExport, TakeRateLine } from '@/components/desk';

export function EscrowDeskPage() {
  const { contestId } = useParams();
  const contests = useQuery({
    queryKey: ['contests'],
    queryFn: async () => (await contestsApi.list()).data.items,
  });
  const selectedId = contestId ?? contests.data?.[0]?.contestId;
  const contest = useQuery({
    queryKey: ['contest', selectedId],
    queryFn: async () => (await contestsApi.get(selectedId!)).data,
    enabled: !!selectedId,
  });
  const escrow = useQuery({
    queryKey: ['escrow', selectedId],
    queryFn: async () => (await escrowsApi.get(selectedId!)).data,
    enabled: !!selectedId,
  });
  const settlement = useQuery({
    queryKey: ['settlement', selectedId],
    queryFn: async () => (await settlementsApi.get(selectedId!)).data,
    enabled: !!selectedId,
  });

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Escrow desk</h1>
      <p style={{ color: 'var(--color-steel)' }}>
        Locked capital, release conditions, and disclosed fees.
      </p>
      <EscrowStateBanner
        status={(escrow.data?.status as 'locked') ?? 'draft'}
        amount={escrow.data?.amount ?? contest.data?.rewardAmount}
        currency={escrow.data?.currency}
        takeRate={escrow.data?.takeRate ?? contest.data?.takeRate}
      />
      <TakeRateLine
        takeRate={escrow.data?.takeRate ?? contest.data?.takeRate}
        rewardAmount={escrow.data?.amount ?? contest.data?.rewardAmount}
      />
      <Panel title="Release eligibility">
        <p style={{ color: 'var(--color-steel)', fontSize: 14 }}>
          {escrow.data?.releaseConditions ??
            'Release only to submissions that pass the published evaluation, or return on expiry/cancel.'}
        </p>
        {settlement.data && (
          <p>
            Settlement status: <strong>{settlement.data.status}</strong>
            {settlement.data.payoutReference && (
              <>
                {' '}
                · tx <span className="mono">{settlement.data.payoutReference}</span>
              </>
            )}
          </p>
        )}
      </Panel>
      <SettlementAttestationExport
        onExport={() => {
          window.alert('Audit export requested (wire to /v1/audit/exports).');
        }}
      />
    </div>
  );
}
