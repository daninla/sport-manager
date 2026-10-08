import { Navigate, Route, Routes } from 'react-router-dom';

import { Dashboard } from '@/pages/Dashboard';
import { PlayerForm } from '@/pages/PlayerForm';
import { Players } from '@/pages/Players';
import { Tournaments } from '@/pages/Tournaments';
import { Account } from '../pages/Account';
import { Login, Register } from '../pages/Auth';
import { Club } from '../pages/Club';
import { ClubAddPage } from '../pages/ClubAdd';
import { ClubEditPage } from '../pages/ClubEdit';
import { Clubs } from '../pages/Clubs';
import { TournamentAddPage } from '../pages/TournamentAdd';
import { TournamentEditPage } from '../pages/TournamentEdit';
import TournamentPage from '../pages/TournamentPage';
import { TournamentParticipants } from '../pages/TournamentParticipants';
import { TournamentPlayoff } from '../pages/TournamentPlayOff';
import AuthLayout from './layouts/AuthLayout';
import ClubLayout from './layouts/ClubLayout';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/account" element={<Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/club" element={<ClubLayout />}>
          <Route path=":id" element={<Club />} />
          <Route path="add" element={<ClubAddPage />} />
          <Route path="edit/:id" element={<ClubEditPage />} />
        </Route>
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournaments/add" element={<TournamentAddPage />} />
        <Route path="/tournaments/edit/:id" element={<TournamentEditPage />} />
        <Route path="/tournaments/:id/*" element={<TournamentPage />} />
        <Route
          path="/tournaments/:id/participants"
          element={<TournamentParticipants />}
        />
        <Route
          path="/tournaments/:id/playoff"
          element={<TournamentPlayoff />}
        />
        <Route path="/players" element={<Players />} />
        <Route path="/players/add" element={<PlayerForm />} />
        <Route path="/players/:id" element={<PlayerForm />} />
      </Route>
    </Routes>
  );
}

export default App;
