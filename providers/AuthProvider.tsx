'use client';

/**
 * Auth Provider Component
 * Provides authentication context for the entire application
 */
import React, { createContext, useContext, ReactNode } from 'react';
import useAuth from '../hooks/useAuth';

// Create context
export const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider component that wraps app to provide authentication context
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use the auth context
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;