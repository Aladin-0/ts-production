// src/stores/userStore.ts - Complete version with Google OAuth support
import { create } from 'zustand';
import apiClient, { API_BASE_URL } from '../api';

interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  role: string;
  email_notifications: boolean;
  sms_notifications: boolean;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  setUserFromServer: (user: User) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const response = await apiClient.post('/api/auth/login/', {
        email,
        password
      });

      const { access, refresh, user } = response.data;

      // Store JWT tokens
      localStorage.setItem('access_token', access);
      if (refresh) {
        localStorage.setItem('refresh_token', refresh);
      }

      // Sync cart for this user
      import('./cartStore').then(({ useCartStore }) => {
        useCartStore.getState().setCurrentUser(user.id.toString());
      }).catch(() => { });

      set({
        user,
        isAuthenticated: true,
        loading: false,
        error: null
      });

    } catch (error: any) {
      const errorMessage = error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        'Login failed. Please check your credentials.';

      set({
        loading: false,
        error: errorMessage,
        isAuthenticated: false,
        user: null
      });

      throw error;
    }
  },

  logout: async () => {
    try {
      // First, logout from Django session (clears session cookie)
      await apiClient.post('/api/users/logout-session/');  // Changed from /api/auth/logout/
    } catch (error) {
      console.error('Logout error:', error);
    }

    // Clear JWT tokens
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Clear cart
    import('./cartStore').then(({ useCartStore }) => {
      useCartStore.getState().switchUser(null);
    }).catch(() => { });

    set({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });

    // Force redirect to home page after logout to clear all state
    window.location.href = '/';
  },

  checkAuthStatus: async () => {
    set({ loading: true });

    // First try JWT token
    const token = localStorage.getItem('access_token');

    if (token) {
      try {
        const response = await apiClient.get('/api/auth/user/');

        // Sync cart for this user
        import('./cartStore').then(({ useCartStore }) => {
          useCartStore.getState().setCurrentUser(response.data.id.toString());
        }).catch(() => { });

        set({
          user: response.data,
          isAuthenticated: true,
          loading: false,
          error: null
        });
        return;
      } catch (error) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    }

    // If JWT fails, try session authentication
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/user/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();

        // Sync cart for this user
        import('./cartStore').then(({ useCartStore }) => {
          useCartStore.getState().setCurrentUser(userData.id.toString());
        }).catch(() => { });

        set({
          user: userData,
          isAuthenticated: true,
          loading: false,
          error: null
        });

        // Ensure CSRF cookie is set for subsequent writes
        try {
          await apiClient.get('/api/users/csrf/');
        } catch (e) { }

        return;
      }
    } catch (error) {
      // Silent fail
    }

    // If both fail, user is not authenticated
    // Clear cart when auth fails
    import('./cartStore').then(({ useCartStore }) => {
      useCartStore.getState().switchUser(null);
    }).catch(() => { });

    set({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });
  },

  updateProfile: async (data) => {
    set({ loading: true, error: null });

    try {
      // Try JWT first; on failure, retry via Axios without JWT (session + CSRF)
      let response;
      try {
        response = await apiClient.patch('/api/users/profile/', data);
      } catch (jwtError) {
        // Response interceptor should have removed expired token.
        response = await apiClient.patch('/api/users/profile/', data);
      }

      // Update the user state with the response data
      set({
        user: response.data,
        loading: false,
        error: null
      });

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail ||
        'Failed to update profile';

      set({
        loading: false,
        error: errorMessage
      });

      throw error;
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    set({ loading: true, error: null });

    try {
      // Try JWT first, then session
      try {
        await apiClient.post('/api/users/change-password/', {
          current_password: currentPassword,
          new_password: newPassword
        });
      } catch (jwtError) {
        // Response interceptor should have removed expired token.
        await apiClient.post('/api/users/change-password/', {
          current_password: currentPassword,
          new_password: newPassword
        });
      }

      set({
        loading: false,
        error: null
      });

    } catch (error: any) {
      const errorMessage = error.response?.data?.detail ||
        error.response?.data?.current_password?.[0] ||
        error.response?.data?.new_password?.[0] ||
        'Failed to change password';

      set({
        loading: false,
        error: errorMessage
      });

      throw error;
    }
  },

  setUserFromServer: (user) => {
    // Update store state without triggering any network request
    // Sync cart for this user
    import('./cartStore').then(({ useCartStore }) => {
      useCartStore.getState().setCurrentUser(user.id.toString());
    }).catch(() => { });

    set({
      user,
      isAuthenticated: true,
      loading: false,
      error: null
    });
  },
}));
