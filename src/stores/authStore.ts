import { create } from 'zustand';
import { User, AuthTokens } from '../types/user';
import { setTokens, clearTokens, getAccessToken } from '../services/api/client';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;

  // Actions
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  loginWithTokens: (user: User, tokens: AuthTokens) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  initialize: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // TODO: Implement actual API call
      // For now, simulate a login
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user for development
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'Test',
        lastName: 'User',
        avatar: undefined,
        level: 3,
        xp: 2450,
        totalGreenScore: 74,
        totalStays: 23,
        language: 'tr',
        authProvider: 'email',
        emailVerified: true,
        privacySettings: { showCity: true, showCountry: true },
        notificationSettings: { push: true, email: true },
        city: 'Istanbul',
        country: 'Türkiye',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockTokens: AuthTokens = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      };

      await setTokens(mockTokens.accessToken, mockTokens.refreshToken);
      set({ user: mockUser, isAuthenticated: true });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (email: string, password: string, firstName: string, lastName: string) => {
    set({ isLoading: true });
    try {
      // TODO: Implement actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Registration typically redirects to OTP verification
      // Don't set user/auth state here
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  loginWithTokens: async (user, tokens) => {
    await setTokens(tokens.accessToken, tokens.refreshToken);
    set({ user, isAuthenticated: true, isLoading: false });
  },

  logout: async () => {
    await clearTokens();
    set({ user: null, isAuthenticated: false });
  },

  updateUser: (updates) => {
    const { user } = get();
    if (user) {
      set({ user: { ...user, ...updates } });
    }
  },

  initialize: async () => {
    set({ isLoading: true });
    try {
      const token = await getAccessToken();
      if (token) {
        // Token exists, we'll validate it when making API calls
        // For now just set authenticated state
        set({ isAuthenticated: true });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      set({ isLoading: false, isInitialized: true });
    }
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },
}));
