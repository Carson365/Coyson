import React, { createContext, useContext, useState, useEffect } from 'react';
import { FetchCart } from './Api'; // make sure this fetches cart by user.id

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [cart, setCart] = useState([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserState(parsed);
      } catch (e) {
        console.error('Failed to parse user:', e);
      }
    }
  }, []);

  // Fetch cart whenever user changes
  useEffect(() => {
    const loadCart = async () => {
      if (user && user.id) {
        try {
          const fetchedCart = await FetchCart(user.id);
          setCart(fetchedCart);
        } catch (e) {
          console.error('Failed to fetch cart:', e);
        }
      }
    };
    loadCart();
  }, [user]);

  const setUser = (userData) => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
      setCart([]);
    }
    setUserState(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUser, cart, setCart }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
