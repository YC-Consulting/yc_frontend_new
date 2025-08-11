import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  authService,
  User,
  UpdateUserRequest,
  AuthResponse,
} from "@/services/authService";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateUser: (userData: UpdateUserRequest) => Promise<{ message: string }>;
  refreshUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize authentication state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        const token = authService.getToken();

        if (currentUser && token) {
          setUser(currentUser);

          // Optionally refresh user info from backend if it's been a while
          // This ensures we have the latest data while still using cache
          const lastRefresh = localStorage.getItem("userLastRefresh");
          const now = Date.now();
          const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

          if (!lastRefresh || now - parseInt(lastRefresh) > twentyFourHours) {
            try {
              const freshUserData = await authService.getUserInfo();
              setUser(freshUserData);
              localStorage.setItem("userLastRefresh", now.toString());
            } catch (refreshError) {
              // If refresh fails, continue with cached data
              console.warn(
                "Failed to refresh user data, using cached data:",
                refreshError
              );
            }
          }
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        // Clear potentially corrupted data
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        localStorage.removeItem("userLastRefresh");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await authService.login({ username, password });
      setUser(response.user);
      // authService.login() already sets the refresh timestamp
    } catch (error) {
      throw error; // Re-throw to let components handle the error
    }
  };

  const register = async (userData: {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }) => {
    try {
      const response = await authService.register(userData);
      // DO NOT set user state - user must login manually after registration
      return response;
    } catch (error) {
      throw error; // Re-throw to let components handle the error
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if logout fails, clear local state
      setUser(null);
    } finally {
      // Clear refresh timestamp on logout
      localStorage.removeItem("userLastRefresh");
    }
  };

  const updateUser = async (userData: UpdateUserRequest) => {
    try {
      const response = await authService.updateUser(userData);

      // Refresh user data after successful update
      const updatedUser = authService.getCurrentUser();
      if (updatedUser) {
        setUser(updatedUser);
      }

      return response;
    } catch (error) {
      throw error; // Re-throw to let components handle the error
    }
  };

  const refreshUserInfo = async () => {
    try {
      const updatedUser = await authService.getUserInfo();
      setUser(updatedUser);
      // Update refresh timestamp
      localStorage.setItem("userLastRefresh", Date.now().toString());
    } catch (error) {
      console.error("Failed to refresh user info:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    refreshUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
