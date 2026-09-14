import { useMemo, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import type { Workspace } from '@/api/types';
import { AppShell } from '@/layout/AppShell';
import { ContestEditorPage } from '@/pages/ContestEditorPage';
import { DeployGatePage } from '@/pages/DeployGatePage';
import { DisputesPage } from '@/pages/DisputesPage';
import { EscrowDeskPage } from '@/pages/EscrowDeskPage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import {
  AuditExportPage,
  CompliancePage,
  LoginPage,
  OpsEvalQueuePage,
} from '@/pages/OpsPages';
import { ProviderOpenContestsPage } from '@/pages/ProviderOpenContestsPage';
import { RequesterHomePage } from '@/pages/RequesterHomePage';
import { SubmissionIntakePage } from '@/pages/SubmissionIntakePage';
import { ContestsView } from '@/features/contests';
import { DeploygatesView } from '@/features/deploygates';
import { DisputesView } from '@/features/disputes';
import { EscrowsView } from '@/features/escrows';
import { EvaluationsView } from '@/features/evaluations';
import { IdentityView } from '@/features/identity';
import { SettlementsView } from '@/features/settlements';
import { SubmissionsView } from '@/features/submissions';

export function App() {
  const [authed, setAuthed] = useState(() => localStorage.getItem('modelescrow.entered') === '1');
  const [workspace, setWorkspace] = useState<Workspace>(
    () => (localStorage.getItem('modelescrow.workspace') as Workspace) || 'requester'
  );
  const navigate = useNavigate();

  const home = useMemo(() => {
    if (workspace === 'provider') return '/provider';
    if (workspace === 'ops') return '/ops';
    return '/requester';
  }, [workspace]);

  if (!authed) {
    return (
      <LoginPage
        onEnter={() => {
          localStorage.setItem('modelescrow.entered', '1');
          setAuthed(true);
          navigate(home);
        }}
      />
    );
  }

  return (
    <Routes>
      <Route
        element={
          <AppShell
            workspace={workspace}
            onWorkspace={(w) => {
              setWorkspace(w);
              localStorage.setItem('modelescrow.workspace', w);
              navigate(w === 'provider' ? '/provider' : w === 'ops' ? '/ops' : '/requester');
            }}
          />
        }
      >
        <Route index element={<Navigate to={home} replace />} />
        <Route path="requester" element={<RequesterHomePage />} />
        <Route path="requester/contests/new" element={<ContestEditorPage />} />
        <Route path="requester/escrow" element={<EscrowDeskPage />} />
        <Route path="requester/disputes" element={<DisputesPage />} />
        <Route path="requester/deploy-gates" element={<DeployGatePage />} />
        <Route path="provider" element={<ProviderOpenContestsPage />} />
        <Route path="provider/submissions" element={<ProviderOpenContestsPage />} />
        <Route path="provider/escrow" element={<EscrowDeskPage />} />
        <Route path="provider/disputes" element={<DisputesPage />} />
        <Route path="ops" element={<OpsEvalQueuePage />} />
        <Route path="ops/compliance" element={<CompliancePage />} />
        <Route path="ops/audit" element={<AuditExportPage />} />
        <Route path="contests/:contestId" element={<LeaderboardPage />} />
        <Route path="contests/:contestId/leaderboard" element={<LeaderboardPage />} />
        <Route path="contests/:contestId/submit" element={<SubmissionIntakePage />} />
        <Route path="contests/:contestId/escrow" element={<EscrowDeskPage />} />
        {/* Codegen scaffold stubs retained */}
        <Route path="scaffold/identity" element={<IdentityView />} />
        <Route path="scaffold/contests" element={<ContestsView />} />
        <Route path="scaffold/submissions" element={<SubmissionsView />} />
        <Route path="scaffold/evaluations" element={<EvaluationsView />} />
        <Route path="scaffold/escrows" element={<EscrowsView />} />
        <Route path="scaffold/settlements" element={<SettlementsView />} />
        <Route path="scaffold/disputes" element={<DisputesView />} />
        <Route path="scaffold/deploygates" element={<DeploygatesView />} />
        <Route path="*" element={<Navigate to={home} replace />} />
      </Route>
    </Routes>
  );
}
