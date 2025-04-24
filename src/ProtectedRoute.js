import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { Navigate } from 'react-router-dom';
import { getIdToken } from 'firebase/auth';
import { auth } from './AdminFirebase';

export const CartProtectedRoute = ({ children }) => {
  const { user } = useUser();

  return user?.id ? children : <Navigate to="/login" replace />;
};

export const LoginProtectedRoute = ({ children }) => {
  const { user } = useUser();

  return !user?.id ? children : <Navigate to="/" replace />;
};

export const AdminProtectedRoute = ({ children }) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const token = await getIdToken(user);
          if (token) {
            setIsAuthenticated(true);
          }
        } catch (err) {
          console.error('Token error:', err);
        }
      }
      setIsVerifying(false);
    };

    checkToken();
  }, []);

  if (isVerifying) {
    return null; // or a loading spinner
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};