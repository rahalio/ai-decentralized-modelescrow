import { Panel, SettlementAttestationExport } from '@/components/desk';

export function OpsEvalQueuePage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Evaluation queue</h1>
      <p style={{ color: 'var(--color-steel)' }}>
        Immutable metrics and invalidation with audit trail.
      </p>
      <Panel title="Queued runs">
        <p style={{ color: 'var(--color-steel)' }}>
          Connect evaluation runners to populate this queue from EvaluationRun status=queued.
        </p>
      </Panel>
    </div>
  );
}

export function CompliancePage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Provider screening</h1>
      <p style={{ color: 'var(--color-steel)' }}>
        Identity and payout-rail clearance before release (BR-10).
      </p>
      <Panel title="Pending clearance">
        <p style={{ color: 'var(--color-steel)' }}>Queue empty — healthy.</p>
      </Panel>
    </div>
  );
}

export function AuditExportPage() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Audit exports</h1>
      <p style={{ color: 'var(--color-steel)' }}>
        Tie contest rules, submissions, scores, and payout tx references.
      </p>
      <SettlementAttestationExport
        onExport={() => window.alert('Export package generation requested.')}
      />
    </div>
  );
}

export function LoginPage({ onEnter }: { onEnter: () => void }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        background:
          'radial-gradient(900px 400px at 50% 0%, rgba(159,212,196,0.12), transparent 55%), var(--color-slate-950)',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: 'var(--color-brand)',
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          Modelescrow
        </div>
        <h1 style={{ fontSize: 28, margin: '0 0 12px' }}>Pay only for verified lift</h1>
        <p style={{ color: 'var(--color-steel)', marginBottom: 24 }}>
          Escrow a reward against a dataset hash and evaluation function. Settlement follows
          independent scores — not platform opinion.
        </p>
        <button
          type="button"
          onClick={() => {
            if (!localStorage.getItem('modelescrow.apiKey')) {
              localStorage.setItem('modelescrow.apiKey', 'modelescrow_demo_local_dev_key');
            }
            onEnter();
          }}
          style={{
            background: 'var(--color-teal-dim)',
            border: '1px solid var(--color-teal)',
            color: 'var(--color-ink)',
            borderRadius: 4,
            padding: '12px 20px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Enter desk
        </button>
      </div>
    </div>
  );
}
