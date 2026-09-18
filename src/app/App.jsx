import { Navigate, Route, Routes } from 'react-router-dom';

import { Player } from '@/pages/Player';
import { PlayerForm } from '@/pages/PlayerForm';
import { Dashboard } from '../pages/Dashboard';
import { Login } from '../pages/Login';
import { Players } from '../pages/Players';
import { Registration } from '../pages/Registration';
import { TournamentForm } from '../pages/TournamentForm';
import TournamentPage from '../pages/TournamentPage';
import { TournamentParticipants } from '../pages/TournamentParticipants';
import { Tournaments } from '../pages/Tournaments';
import { TournamentPlayoff } from '../pages/TournamentPlayOff';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournaments/add" element={<TournamentForm />} />
        <Route path="/tournaments/:id/*" element={<TournamentPage />} />
        <Route path="/tournaments/:id/participants" element={<TournamentParticipants />} />
        <Route path="/tournaments/:id/playoff" element={<TournamentPlayoff/>} />
        <Route path="/players" element={<Players />} />
        <Route path="/players/add" element={<PlayerForm />} />
        <Route path="/players/:id" element={<Player />} />
        <Route path="/players/:id/edit" element={<PlayerForm />} />
      </Route>
    </Routes>
  );
}

export default App;
