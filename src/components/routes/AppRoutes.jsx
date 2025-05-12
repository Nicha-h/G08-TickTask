import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/Authentication/LoginPage';
import HomePage from '../../pages/Home';
import SignupPage from '../../pages/Authentication/Signup';
import ProtectedRoute from '../routes/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

    </Routes>
  );
}

export default AppRoutes;
