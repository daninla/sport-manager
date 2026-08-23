import { Navigate, Route, Routes } from 'react-router-dom';

import { Dashboard } from '@/pages/Dashboard';
import { Player } from '@/pages/Player';
import { Players } from '@/pages/Players';
import { Tournaments } from '@/pages/Tournaments';
import MainLayout from './layouts/MainLayout';
import { PlayerForm } from '@/pages/PlayerForm';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/players" element={<Players />} />
        <Route path="/players/add" element={<PlayerForm />} />
        <Route path="/players/:id" element={<Player />} />
        <Route path="/players/:id/edit" element={<PlayerForm />} />
      </Route>
    </Routes>
  );
}

export default App;
