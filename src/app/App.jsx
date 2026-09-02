import { Navigate, Route, Routes } from 'react-router-dom';

import { Player } from '@/pages/Player';
import { PlayerForm } from '@/pages/PlayerForm';
import { Dashboard } from '../pages/Dashboard';
import { Players } from '../pages/Players';
import { TournamentForm } from '../pages/TournamentForm';
import TournamentPage from '../pages/TournamentPage/ui/TournamentPage';
import { Tournaments } from '../pages/Tournaments';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournaments/add" element={<TournamentForm />} />
        <Route path="/tournaments/:id/*" element={<TournamentPage />} />
        <Route path="/players" element={<Players />} />
        <Route path="/players/add" element={<PlayerForm />} />
        <Route path="/players/:id" element={<Player />} />
        <Route path="/players/:id/edit" element={<PlayerForm />} />
      </Route>
    </Routes>
  );
}

export default App;
