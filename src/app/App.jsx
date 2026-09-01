import { Navigate, Route, Routes } from 'react-router-dom';

import { Dashboard } from '../pages/Dashboard';
import { Players } from '../pages/Players';
import { TournamentForm } from '../pages/TournamentForm';
import { Tournaments } from '../pages/Tournaments';
import TournamentPage from '../pages/TournamentPage/ui/TournamentPage';
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
      </Route>
    </Routes>
  );
}

export default App;
