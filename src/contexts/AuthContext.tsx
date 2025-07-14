// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { RefreshTokenDto } from '@/api';

interface User {
  id?: string;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  roles?: string[];
  isActive?: boolean;
  lastLoginDate?: Date;
  createdDate?: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, refreshToken: string, userData: User) => void;
  logout: () => Promise<void>;
  updateUser: (userData: User) => void;
  hasRole: (role: string) => boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Token management functions for API client
  const getToken = (): string | null => {
    return localStorage.getItem('accessToken');
  };

  const refreshTokenAsync = async (): Promise<string | null> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return null;
      }

      const response = await api.auth.auth_RefreshToken(new RefreshTokenDto({
        accessToken: getToken() || '',
        refreshToken: refreshToken
      }));

      if (response.success && response.data) {
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        
        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
          }
          return newAccessToken;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return null;
    }
  };

  const onTokenExpired = (): void => {
    logout();
  };

  // Configure API client with authentication on component mount
  useEffect(() => {
    // Configure the API client with authentication
    api.updateAuth(getToken, refreshTokenAsync, onTokenExpired);
    
    // Initialize auth state
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      
      // Check if we have tokens
      const accessToken = localStorage.getItem('accessToken');
      const currentUserData = localStorage.getItem('currentUser');
      
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      // If we have stored user data, use it
      if (currentUserData) {
        try {
          const userData = JSON.parse(currentUserData);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('currentUser');
        }
      }

      // Validate token and get fresh user data
      const tokenResponse = await api.auth.auth_ValidateToken(accessToken);
      
      if (tokenResponse.success && tokenResponse.data) {
        // Token is valid, get current user profile
        try {
          const userResponse = await api.users.users_GetCurrentUserProfile();
          if (userResponse.success && userResponse.data) {
            const userData = userResponse.data;
            setUser(userData);
            localStorage.setItem('currentUser', JSON.stringify(userData));
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Token might be valid but user endpoint failed
          // Keep existing user data if available
        }
      } else {
        // Token is invalid, clear everything
        logout();
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = (token: string, refreshToken: string, userData: User) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setUser(userData);
    
    // Reconfigure API client with new auth state
    api.updateAuth(getToken, refreshTokenAsync, onTokenExpired);
  };

  const logout = async () => {
    // Call logout API if we have a token
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await api.auth.auth_Logout();
      } catch (error) {
        console.error('Logout API call failed:', error);
      }
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/auth/login');
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const hasRole = (role: string): boolean => {
    if (!user?.roles) return false;
    return user.roles.some(userRole => 
      userRole.toLowerCase() === role.toLowerCase()
    );
  };

  const isAdmin = hasRole('admin') || hasRole('administrator');
  const isAuthenticated = !!user && !!localStorage.getItem('accessToken');

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    hasRole,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};