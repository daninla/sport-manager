import { Navigate, Route, Routes } from 'react-router-dom';

import DashboardPage from '../pages/DashboardPage/DashboardPage';
import TournamentsPage from '../pages/TournamentsPage/TournamentsPage';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tournaments" element={<TournamentsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
