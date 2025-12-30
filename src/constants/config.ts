export const config = {
  // API Configuration
  api: {
    baseUrl: __DEV__
      ? 'http://localhost:3000/api'
      : 'https://api.yesilpuan.com/api',
    timeout: 30000,
    retryAttempts: 3,
  },

  // Authentication
  auth: {
    accessTokenExpiry: 15 * 60 * 1000, // 15 minutes
    refreshTokenExpiry: 30 * 24 * 60 * 60 * 1000, // 30 days
    otpLength: 6,
    otpExpiry: 5 * 60 * 1000, // 5 minutes
  },

  // Cache Configuration
  cache: {
    dashboardTTL: 5 * 60 * 1000, // 5 minutes
    leaderboardTTL: 15 * 60 * 1000, // 15 minutes
    profileTTL: 30 * 60 * 1000, // 30 minutes
    staysTTL: 10 * 60 * 1000, // 10 minutes
  },

  // Pagination
  pagination: {
    defaultPageSize: 20,
    leaderboardPageSize: 50,
  },

  // Feature Flags
  features: {
    biometricAuth: true,
    socialLogin: true,
    pushNotifications: true,
    rewards: true,
    qrScanner: true,
  },

  // App Info
  app: {
    name: 'YeşilPuan',
    version: '1.0.0',
    buildNumber: 1,
    supportEmail: 'support@yesilpuan.com',
    privacyPolicyUrl: 'https://yesilpuan.com/privacy',
    termsOfServiceUrl: 'https://yesilpuan.com/terms',
  },

  // Supported Languages
  languages: [
    { code: 'tr', name: 'Türkçe', nativeName: 'Türkçe', rtl: false },
    { code: 'en', name: 'English', nativeName: 'English', rtl: false },
    { code: 'de', name: 'German', nativeName: 'Deutsch', rtl: false },
    { code: 'fr', name: 'French', nativeName: 'Français', rtl: false },
    { code: 'es', name: 'Spanish', nativeName: 'Español', rtl: false },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
  ],

  // Default Language
  defaultLanguage: 'tr',

  // Social Login Providers
  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
    },
    apple: {
      enabled: true,
    },
    facebook: {
      enabled: true,
      appId: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID || '',
    },
  },
} as const;

export type Config = typeof config;
