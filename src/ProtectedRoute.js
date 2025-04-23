import { useUser } from './UserContext';
import { Navigate } from 'react-router-dom';

export const CartProtectedRoute = ({ children }) => {
  const { user } = useUser();

  return user ? children : <Navigate to="/login" replace />;
};

export const LoginProtectedRoute = ({ children }) => {
  const { user } = useUser();

  return !user ? children : <Navigate to="/" replace />;
};