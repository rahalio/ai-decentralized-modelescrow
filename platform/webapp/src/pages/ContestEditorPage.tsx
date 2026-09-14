import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contestsApi, escrowsApi } from '@/api/modelescrow';
import { MetricDefinitionLock, Panel, TakeRateLine } from '@/components/desk';

export function ContestEditorPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    datasetHash: '',
    evaluationFunction: '',
    metricName: '',
    rewardAmount: 10000,
    takeRate: 8,
    deadline: new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 16),
    sealedEvaluation: false,
    leaderboardVisibility: 'public' as 'public' | 'private',
    requireHumanDeployGate: true,
  });

  async function onSubmit(e: FormEvent, lock: boolean) {
    e.preventDefault();
    setError(null);
    try {
      const created = await contestsApi.create({
        ...form,
        deadline: new Date(form.deadline).toISOString(),
      });
      const contest = created.data;
      if (lock) {
        await escrowsApi.lock(contest.contestId, {
          amount: form.rewardAmount,
          currency: 'USD',
        });
      }
      navigate(`/contests/${contest.contestId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save contest');
    }
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Contest rules</h1>
      <p style={{ color: 'var(--color-steel)' }}>
        Dataset hash, evaluation function, metric, reward, and deadline are required before escrow can
        lock.
      </p>
      <Panel title="Rules form">
        <form style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
          {(
            [
              ['title', 'Title'],
              ['datasetHash', 'Dataset hash'],
              ['evaluationFunction', 'Evaluation function'],
              ['metricName', 'Metric name'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} style={{ display: 'grid', gap: 4 }}>
              <span style={{ color: 'var(--color-steel)', fontSize: 12 }}>{label}</span>
              <input
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                style={inputStyle}
                required
              />
            </label>
          ))}
          <label style={{ display: 'grid', gap: 4 }}>
            <span style={{ color: 'var(--color-steel)', fontSize: 12 }}>Reward amount</span>
            <input
              type="number"
              value={form.rewardAmount}
              onChange={(e) => setForm({ ...form, rewardAmount: Number(e.target.value) })}
              style={inputStyle}
            />
          </label>
          <label style={{ display: 'grid', gap: 4 }}>
            <span style={{ color: 'var(--color-steel)', fontSize: 12 }}>Take-rate %</span>
            <input
              type="number"
              value={form.takeRate}
              onChange={(e) => setForm({ ...form, takeRate: Number(e.target.value) })}
              style={inputStyle}
            />
          </label>
          <label style={{ display: 'grid', gap: 4 }}>
            <span style={{ color: 'var(--color-steel)', fontSize: 12 }}>Deadline</span>
            <input
              type="datetime-local"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              style={inputStyle}
            />
          </label>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={form.sealedEvaluation}
              onChange={(e) => setForm({ ...form, sealedEvaluation: e.target.checked })}
            />
            Sealed evaluation (no raw dataset download)
          </label>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={form.requireHumanDeployGate}
              onChange={(e) => setForm({ ...form, requireHumanDeployGate: e.target.checked })}
            />
            Require human deploy gate after metric win
          </label>
          <TakeRateLine takeRate={form.takeRate} rewardAmount={form.rewardAmount} />
          <MetricDefinitionLock
            metricName={form.metricName || '—'}
            evaluationFunction={form.evaluationFunction || '—'}
          />
          {error && <p style={{ color: 'var(--color-coral)' }}>{error}</p>}
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" style={btn} onClick={(e) => onSubmit(e, false)}>
              Save draft
            </button>
            <button type="button" style={primary} onClick={(e) => onSubmit(e, true)}>
              Lock escrow
            </button>
          </div>
        </form>
      </Panel>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: 'var(--color-slate-950)',
  border: '1px solid var(--color-slate-700)',
  borderRadius: 4,
  color: 'var(--color-ink)',
  padding: '8px 10px',
};

const btn: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid var(--color-slate-700)',
  color: 'var(--color-ink)',
  borderRadius: 4,
  padding: '8px 14px',
  cursor: 'pointer',
};

const primary: React.CSSProperties = {
  ...btn,
  borderColor: 'var(--color-amber)',
  color: 'var(--color-amber)',
  fontWeight: 600,
};
