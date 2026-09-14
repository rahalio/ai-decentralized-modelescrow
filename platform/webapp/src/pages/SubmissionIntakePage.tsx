import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { contestsApi, submissionsApi } from '@/api/modelescrow';
import { Panel, SealedEvalBadge } from '@/components/desk';

export function SubmissionIntakePage() {
  const { contestId = '' } = useParams();
  const contest = useQuery({
    queryKey: ['contest', contestId],
    queryFn: async () => (await contestsApi.get(contestId)).data,
    enabled: !!contestId,
  });
  const [artefactUri, setArtefactUri] = useState('');
  const [artefactHash, setArtefactHash] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await submissionsApi.submit(contestId, { artefactUri, artefactHash });
      setMsg(`Accepted ${res.data.submissionId}`);
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Submit failed');
    }
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Submission intake</h1>
      <p style={{ color: 'var(--color-steel)' }}>
        Versioned model package suitable for microservice deployment.
      </p>
      {contest.data?.sealedEvaluation && (
        <div style={{ marginBottom: 12 }}>
          <SealedEvalBadge />
        </div>
      )}
      <Panel title={contest.data?.title ?? 'Contest'}>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
          <label style={{ display: 'grid', gap: 4 }}>
            <span style={{ color: 'var(--color-steel)', fontSize: 12 }}>Artefact URI</span>
            <input
              value={artefactUri}
              onChange={(e) => setArtefactUri(e.target.value)}
              style={inputStyle}
              required
            />
          </label>
          <label style={{ display: 'grid', gap: 4 }}>
            <span style={{ color: 'var(--color-steel)', fontSize: 12 }}>Artefact hash</span>
            <input
              value={artefactHash}
              onChange={(e) => setArtefactHash(e.target.value)}
              className="mono"
              style={inputStyle}
              required
            />
          </label>
          <button type="submit" style={primary}>
            Submit package
          </button>
          {msg && <p style={{ color: 'var(--color-teal)' }}>{msg}</p>}
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

const primary: React.CSSProperties = {
  background: 'var(--color-teal-dim)',
  border: '1px solid var(--color-teal)',
  color: 'var(--color-ink)',
  borderRadius: 4,
  padding: '8px 14px',
  cursor: 'pointer',
  fontWeight: 600,
};
