'use client';

/**
 * Authentication hook to handle user login, logout, and session state
 */
import { useState, useEffect } from 'react';

// Mock user types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'PATIENT' | 'MEDICAL_STUDENT';
}

interface UseAuthReturn {
  /**
   * Current authenticated user or null if not authenticated
   */
  user: User | null;
  /**
   * Loading state during authentication checks
   */
  loading: boolean;
  /**
   * Function to log in a user
   */
  login: (email: string, password: string) => Promise<boolean>;
  /**
   * Function to register a new user
   */
  register: (name: string, email: string, password: string, role: 'PATIENT' | 'MEDICAL_STUDENT') => Promise<boolean>;
  /**
   * Function to log out the current user
   */
  logout: () => void;
}

/**
 * Hook for authentication functionality
 * @returns Authentication state and functions
 */
export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        // In a real app, this would check for a token in localStorage or cookies
        // and validate it with the backend
        const storedUser = localStorage.getItem('murph_user');
        
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (error) {
            console.error('Failed to parse stored user:', error);
            localStorage.removeItem('murph_user');
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Login function - in a real app, this would make an API call
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, determine role based on email domain
      const role = email.includes('med-uni') ? 'MEDICAL_STUDENT' : 'PATIENT';
      
      // Get name from email (before the @ symbol)
      const name = email.split('@')[0].split('.').map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join(' ');
      
      // Create a mock user
      const mockUser: User = {
        id: 'user_' + Date.now(),
        name: name || 'Test User',
        email,
        role
      };
      
      setUser(mockUser);
      localStorage.setItem('murph_user', JSON.stringify(mockUser));
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register function - in a real app, this would make an API call
   */
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: 'PATIENT' | 'MEDICAL_STUDENT'
  ): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 'user_' + Date.now(),
        name,
        email,
        role
      };
      
      setUser(mockUser);
      localStorage.setItem('murph_user', JSON.stringify(mockUser));
      
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout function
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('murph_user');
  };

  return {
    user,
    loading,
    login,
    register,
    logout
  };
};

export default useAuth;