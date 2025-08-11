import api from '@/utils/api';

// Types for API requests and responses
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  user_id?: number; // For admin updates
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
  session_id?: string;
  auth_methods?: {
    token: string;
    session: string;
  };
}

export interface ApiError {
  error: string;
}

class AuthService {
  /**
   * Login user with username and password
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/website/user/login', credentials);
      
      // Store authentication data
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userLastRefresh', Date.now().toString());
      }
      
      return response.data;
    } catch (error: any) {
      // Extract error message from response
      const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
      throw new Error(errorMessage);
    }
  }

  /**
   * Register new user
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/website/user/register', userData);
      
      // DO NOT store authentication data - user must login manually after registration
      // This is for security best practices
      
      return response.data;
    } catch (error: any) {
      // Extract error message from response
      const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
      throw new Error(errorMessage);
    }
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    try {
      await api.post('/website/user/logout');
    } catch (error) {
      // Even if logout fails on backend, we should clear local data
      console.error('Logout API call failed:', error);
    } finally {
      // Always clear local authentication data
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('userLastRefresh');
      
      // Redirect to login page
      window.location.href = '/login';
    }
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Get current user info from backend
   */
  async getUserInfo(): Promise<User> {
    try {
      const response = await api.get<User>('/website/user/info');
      
      // Update stored user data with timestamp
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('userLastRefresh', Date.now().toString());
      
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to get user info.';
      throw new Error(errorMessage);
    }
  }

  /**
   * Update user information
   */
  async updateUser(userData: UpdateUserRequest): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>('/website/user/update', userData);
      
      // If update was successful, refresh user data
      if (response.data.message) {
        try {
          await this.getUserInfo();
          // getUserInfo() already updates localStorage with fresh user data and timestamp
        } catch (refreshError) {
          console.warn('Failed to refresh user data after update:', refreshError);
          // Don't throw here as the update was successful
        }
      }
      
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to update user.';
      throw new Error(errorMessage);
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
