import { useQuery } from '@tanstack/react-query';
import { contestsApi, deployGatesApi } from '@/api/modelescrow';
import { DeployGateChecklist, Panel } from '@/components/desk';

export function DeployGatePage() {
  const contests = useQuery({
    queryKey: ['contests'],
    queryFn: async () => (await contestsApi.list()).data.items,
  });
  const contestId = contests.data?.[0]?.contestId;
  const gates = useQuery({
    queryKey: ['deploy-gates', contestId],
    queryFn: async () => (await deployGatesApi.list(contestId!)).data.items,
    enabled: !!contestId,
  });

  const gate = gates.data?.[0];

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Deploy gate</h1>
      <p style={{ color: 'var(--color-steel)' }}>
        Optional human review before production promotion after metric win.
      </p>
      <Panel title="Promotion checklist">
        {!gate && <p style={{ color: 'var(--color-steel)' }}>No winners in deploy gate yet.</p>}
        {gate && (
          <>
            <p>
              Gate <span className="mono">{gate.deployGateId}</span> · status {gate.status}
            </p>
            <DeployGateChecklist
              onApprove={() => deployGatesApi.decide(gate.deployGateId, { decision: 'approve' })}
              onHold={() =>
                deployGatesApi.decide(gate.deployGateId, {
                  decision: 'hold',
                  holdReason: 'Gaming review',
                })
              }
            />
          </>
        )}
      </Panel>
    </div>
  );
}
