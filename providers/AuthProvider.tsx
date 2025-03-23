'use client';

/**
 * Auth Provider Component
 * Provides authentication context for the entire application
 */
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

// Create context with default values
export const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider component that wraps app to provide authentication context
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Only render children once the auth state is initialized
  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      // In a real app, this would validate the token with the backend
      // For now, just set initialized after a brief delay
      await new Promise(resolve => setTimeout(resolve, 100));
      setIsInitialized(true);
    };
    
    checkAuth();
  }, []);
  
  if (!isInitialized) {
    // Return a minimal loading state or nothing
    return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
  }
  
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
  // Return context even if undefined to handle in components
  return context;
};

export default AuthProvider;