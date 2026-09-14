import { NavLink, Outlet } from 'react-router-dom';
import type { Workspace } from '@/api/types';

const workspaces: Array<{ id: Workspace; label: string }> = [
  { id: 'requester', label: 'Requester' },
  { id: 'provider', label: 'Provider' },
  { id: 'ops', label: 'Ops & compliance' },
];

export function AppShell({
  workspace,
  onWorkspace,
}: {
  workspace: Workspace;
  onWorkspace: (w: Workspace) => void;
}) {
  const nav =
    workspace === 'requester'
      ? [
          { to: '/requester', label: 'Home', end: true },
          { to: '/requester/contests/new', label: 'Create contest' },
          { to: '/requester/escrow', label: 'Escrow & settlements' },
          { to: '/requester/disputes', label: 'Disputes' },
          { to: '/requester/deploy-gates', label: 'Deploy gates' },
        ]
      : workspace === 'provider'
        ? [
            { to: '/provider', label: 'Open contests', end: true },
            { to: '/provider/submissions', label: 'My submissions' },
            { to: '/provider/escrow', label: 'Escrow visibility' },
            { to: '/provider/disputes', label: 'Disputes' },
          ]
        : [
            { to: '/ops', label: 'Eval queue', end: true },
            { to: '/ops/compliance', label: 'Compliance' },
            { to: '/ops/audit', label: 'Audit exports' },
          ];

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <header
        style={{
          borderBottom: '1px solid var(--color-slate-700)',
          background: 'rgba(10,16,22,0.92)',
          backdropFilter: 'blur(8px)',
          position: 'sticky',
          top: 0,
          zIndex: 20,
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 22,
                color: 'var(--color-brand)',
                letterSpacing: '-0.02em',
              }}
            >
              Modelescrow
            </div>
            <div
              role="tablist"
              aria-label="Workspace"
              style={{ display: 'flex', gap: 4, background: 'var(--color-slate-900)', padding: 4, borderRadius: 6 }}
            >
              {workspaces.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  role="tab"
                  aria-selected={workspace === w.id}
                  onClick={() => onWorkspace(w.id)}
                  style={{
                    border: 'none',
                    borderRadius: 4,
                    padding: '6px 10px',
                    cursor: 'pointer',
                    background: workspace === w.id ? 'var(--color-slate-700)' : 'transparent',
                    color: workspace === w.id ? 'var(--color-ink)' : 'var(--color-steel)',
                    fontWeight: workspace === w.id ? 600 : 400,
                  }}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>
          <nav style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-teal)' : 'var(--color-steel)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 14,
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main style={{ maxWidth: 1180, width: '100%', margin: '0 auto', padding: '28px 24px 64px' }}>
        <Outlet />
      </main>
    </div>
  );
}
