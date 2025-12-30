export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  language: string;

  // Auth
  authProvider: 'email' | 'google' | 'apple' | 'facebook';
  emailVerified: boolean;

  // Stats
  level: number;
  xp: number;
  totalGreenScore: number;
  totalStays: number;

  // Privacy
  privacySettings: {
    showCity: boolean;
    showCountry: boolean;
  };

  // Notification
  notificationSettings: {
    push: boolean;
    email: boolean;
  };

  // Location
  city?: string;
  country?: string;
  region?: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  totalStays: number;
  avgGreenScore: number;
  totalSavings: {
    electricity: number;
    water: number;
    carbon: number;
  };
  badges: number;
  level: number;
  xp: number;
}

export interface PublicUser {
  id: string;
  name: string;
  avatar?: string;
  avgScore: number;
  totalStays: number;
  badges: number;
  city?: string;
  country?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  language?: string;
}

export interface SocialAuthPayload {
  provider: 'google' | 'apple' | 'facebook';
  token: string;
  profile?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
}
