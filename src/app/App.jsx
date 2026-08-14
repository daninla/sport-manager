import { Navigate, Route, Routes } from 'react-router-dom';

import { Dashboard } from '../pages/Dashboard';
import { Players } from '../pages/Players';
import { Tournaments } from '../pages/Tournaments';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/players" element={<Players />} />
      </Route>
    </Routes>
  );
}

export default App;
