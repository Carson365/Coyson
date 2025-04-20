import { useUser } from './UserContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;