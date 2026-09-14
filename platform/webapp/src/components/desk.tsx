import type { ReactNode } from 'react';

const styles: Record<string, React.CSSProperties> = {
  banner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-slate-700)',
    background: 'var(--color-slate-900)',
    marginBottom: 16,
  },
  locked: { borderColor: 'var(--color-amber)', boxShadow: '0 0 0 1px rgba(224,160,69,0.25)' },
  released: { borderColor: 'var(--color-teal)' },
  returned: { borderColor: 'var(--color-steel)' },
  held: { borderColor: 'var(--color-coral)' },
  label: { color: 'var(--color-steel)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em' },
  amount: { fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--color-ink)' },
};

export function EscrowStateBanner({
  status,
  amount,
  currency = 'USD',
  takeRate,
}: {
  status: 'draft' | 'locked' | 'released' | 'returned' | 'held';
  amount?: number;
  currency?: string;
  takeRate?: number;
}) {
  const tone =
    status === 'locked'
      ? styles.locked
      : status === 'released'
        ? styles.released
        : status === 'held'
          ? styles.held
          : styles.returned;

  return (
    <div style={{ ...styles.banner, ...tone }} role="status" aria-live="polite">
      <div>
        <div style={styles.label}>Escrow</div>
        <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{status}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={styles.amount}>
          {amount != null ? `${amount.toLocaleString()} ${currency}` : '—'}
        </div>
        {takeRate != null && (
          <div style={{ color: 'var(--color-steel)', fontSize: 12 }}>
            Take-rate {takeRate}% disclosed separately
          </div>
        )}
      </div>
    </div>
  );
}

export function MetricDefinitionLock({
  metricName,
  evaluationFunction,
  locked,
}: {
  metricName: string;
  evaluationFunction: string;
  locked?: boolean;
}) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${locked ? 'var(--color-teal-dim)' : 'var(--color-slate-700)'}`,
        background: 'rgba(18,26,36,0.8)',
      }}
    >
      <div style={{ color: 'var(--color-steel)', fontSize: 12, marginBottom: 4 }}>
        {locked ? 'Metric locked with escrow' : 'Metric definition'}
      </div>
      <div style={{ fontWeight: 600 }}>{metricName}</div>
      <code className="mono" style={{ color: 'var(--color-brand)', fontSize: 12 }}>
        {evaluationFunction}
      </code>
    </div>
  );
}

export function SealedEvalBadge() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '2px 8px',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-amber)',
        color: 'var(--color-amber)',
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      Sealed eval — no raw download
    </span>
  );
}

export function TakeRateLine({ takeRate, rewardAmount }: { takeRate?: number; rewardAmount?: number }) {
  if (takeRate == null) return null;
  const fee = rewardAmount != null ? (rewardAmount * takeRate) / 100 : undefined;
  return (
    <p style={{ color: 'var(--color-steel)', fontSize: 14 }}>
      Platform take-rate <strong style={{ color: 'var(--color-ink)' }}>{takeRate}%</strong>
      {fee != null ? ` (≈ ${fee.toLocaleString()} fee, separate from escrowed reward)` : ''}.
    </p>
  );
}

export function DisputeDeadlineChip({ deadline }: { deadline: string }) {
  const ms = new Date(deadline).getTime() - Date.now();
  const overdue = ms < 0;
  const label = overdue
    ? 'Overdue'
    : `${Math.ceil(ms / (1000 * 60 * 60))}h left`;
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        padding: '2px 8px',
        borderRadius: 'var(--radius-sm)',
        color: overdue ? 'var(--color-coral)' : 'var(--color-amber)',
        border: `1px solid ${overdue ? 'var(--color-coral)' : 'var(--color-amber)'}`,
        animation: overdue ? undefined : 'pulse 1.2s ease-in-out infinite',
      }}
    >
      {label}
    </span>
  );
}

export function EvaluationLogDrawer({
  open,
  onClose,
  run,
}: {
  open: boolean;
  onClose: () => void;
  run?: {
    evaluationRunId: string;
    metricName: string;
    environmentHash?: string;
    logExcerpt?: string;
    score?: number;
  };
}) {
  if (!open || !run) return null;
  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: 'min(420px, 100%)',
        height: '100%',
        background: 'var(--color-slate-900)',
        borderLeft: '1px solid var(--color-slate-700)',
        padding: 24,
        zIndex: 40,
        boxShadow: '-12px 0 40px rgba(0,0,0,0.35)',
      }}
      aria-label="Evaluation log"
    >
      <button type="button" onClick={onClose} style={ghostBtn}>
        Close
      </button>
      <h2 style={{ marginTop: 16 }}>Evaluation evidence</h2>
      <p className="mono" style={{ color: 'var(--color-brand)', fontSize: 13 }}>
        {run.evaluationRunId}
      </p>
      <dl style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        <div>
          <dt style={{ color: 'var(--color-steel)', fontSize: 12 }}>Metric</dt>
          <dd style={{ margin: 0 }}>{run.metricName}</dd>
        </div>
        <div>
          <dt style={{ color: 'var(--color-steel)', fontSize: 12 }}>Environment</dt>
          <dd className="mono" style={{ margin: 0, fontSize: 12 }}>
            {run.environmentHash ?? '—'}
          </dd>
        </div>
        <div>
          <dt style={{ color: 'var(--color-steel)', fontSize: 12 }}>Score</dt>
          <dd style={{ margin: 0, color: 'var(--color-teal)' }}>{run.score ?? '—'}</dd>
        </div>
        <div>
          <dt style={{ color: 'var(--color-steel)', fontSize: 12 }}>Log excerpt</dt>
          <dd
            className="mono"
            style={{
              margin: 0,
              fontSize: 12,
              whiteSpace: 'pre-wrap',
              color: 'var(--color-steel)',
            }}
          >
            {run.logExcerpt ?? 'No excerpt'}
          </dd>
        </div>
      </dl>
    </aside>
  );
}

export function DeployGateChecklist({
  onApprove,
  onHold,
}: {
  onApprove: () => void;
  onHold: () => void;
}) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <label style={checkRow}>
        <input type="checkbox" /> Metric win verified against frozen definition
      </label>
      <label style={checkRow}>
        <input type="checkbox" /> Artefact hash matches submission
      </label>
      <label style={checkRow}>
        <input type="checkbox" /> No gaming / invalidation flags
      </label>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" style={primaryBtn} onClick={onApprove}>
          Approve promote
        </button>
        <button type="button" style={dangerBtn} onClick={onHold}>
          Hold for review
        </button>
      </div>
    </div>
  );
}

export function SettlementAttestationExport({ onExport }: { onExport: () => void }) {
  return (
    <div
      style={{
        padding: 16,
        border: '1px dashed var(--color-slate-700)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Settlement attestation</h3>
      <p style={{ color: 'var(--color-steel)', fontSize: 14 }}>
        Export rules snapshot, scores, and payout tx references for the selected period.
      </p>
      <button type="button" style={primaryBtn} onClick={onExport}>
        Generate export
      </button>
    </div>
  );
}

export function Panel({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section
      style={{
        background: 'rgba(18,26,36,0.92)',
        border: '1px solid var(--color-slate-700)',
        borderRadius: 'var(--radius-md)',
        padding: 20,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
          gap: 12,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18 }}>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

const ghostBtn: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid var(--color-slate-700)',
  color: 'var(--color-ink)',
  borderRadius: 'var(--radius-sm)',
  padding: '6px 12px',
  cursor: 'pointer',
};

const primaryBtn: React.CSSProperties = {
  background: 'var(--color-teal-dim)',
  border: '1px solid var(--color-teal)',
  color: 'var(--color-ink)',
  borderRadius: 'var(--radius-sm)',
  padding: '8px 14px',
  cursor: 'pointer',
  fontWeight: 600,
};

const dangerBtn: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid var(--color-coral)',
  color: 'var(--color-coral)',
  borderRadius: 'var(--radius-sm)',
  padding: '8px 14px',
  cursor: 'pointer',
};

const checkRow: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  color: 'var(--color-ink)',
  fontSize: 14,
};
