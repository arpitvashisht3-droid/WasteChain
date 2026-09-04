import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api';
import { createUserModel } from '../models';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('wastechain_user');
    return saved ? createUserModel(JSON.parse(saved)) : null;
  });

  const [isLoading, setIsLoading] = useState(!user);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  // Initialize and verify session on load
  const loadUserSession = useCallback(async () => {
    try {
      const currentUser = await authApi.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        localStorage.setItem('wastechain_user', JSON.stringify(currentUser));
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('wastechain_user');
      }
    } catch (err) {
      console.warn('[AuthContext] Session verification note:', err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      loadUserSession();
    } else {
      setIsLoading(false);
    }
  }, [loadUserSession, user]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const loggedUser = await authApi.login(email, password);
      setUser(loggedUser);
      setIsAuthenticated(true);
      localStorage.setItem('wastechain_user', JSON.stringify(loggedUser));
      return loggedUser;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const newUser = await authApi.register(userData);
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('wastechain_user', JSON.stringify(newUser));
      return newUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('wastechain_user');
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (updatedFields) => {
    try {
      const updated = await authApi.updateProfile(updatedFields);
      setUser(updated);
      localStorage.setItem('wastechain_user', JSON.stringify(updated));
      return updated;
    } catch (err) {
      // Optimistic local update fallback
      const fallback = createUserModel({ ...user, ...updatedFields });
      setUser(fallback);
      localStorage.setItem('wastechain_user', JSON.stringify(fallback));
      return fallback;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUserProfile,
        refreshSession: loadUserSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
