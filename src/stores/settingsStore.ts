import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeLanguage, getCurrentLanguage } from '../i18n';

interface SettingsState {
  language: string;
  theme: 'light' | 'dark' | 'system';
  biometricEnabled: boolean;
  notificationsEnabled: boolean;
  isInitialized: boolean;

  // Actions
  setLanguage: (language: string) => Promise<void>;
  setTheme: (theme: 'light' | 'dark' | 'system') => Promise<void>;
  setBiometricEnabled: (enabled: boolean) => Promise<void>;
  setNotificationsEnabled: (enabled: boolean) => Promise<void>;
  initialize: () => Promise<void>;
}

const SETTINGS_STORAGE_KEY = '@yesilpuan/settings';

interface StoredSettings {
  theme: 'light' | 'dark' | 'system';
  biometricEnabled: boolean;
  notificationsEnabled: boolean;
}

const defaultSettings: StoredSettings = {
  theme: 'light',
  biometricEnabled: false,
  notificationsEnabled: true,
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  language: 'tr',
  theme: 'light',
  biometricEnabled: false,
  notificationsEnabled: true,
  isInitialized: false,

  setLanguage: async (language) => {
    await changeLanguage(language);
    set({ language });
  },

  setTheme: async (theme) => {
    set({ theme });
    const settings = await getStoredSettings();
    await storeSettings({ ...settings, theme });
  },

  setBiometricEnabled: async (enabled) => {
    set({ biometricEnabled: enabled });
    const settings = await getStoredSettings();
    await storeSettings({ ...settings, biometricEnabled: enabled });
  },

  setNotificationsEnabled: async (enabled) => {
    set({ notificationsEnabled: enabled });
    const settings = await getStoredSettings();
    await storeSettings({ ...settings, notificationsEnabled: enabled });
  },

  initialize: async () => {
    try {
      const language = getCurrentLanguage();
      const settings = await getStoredSettings();

      set({
        language,
        theme: settings.theme,
        biometricEnabled: settings.biometricEnabled,
        notificationsEnabled: settings.notificationsEnabled,
        isInitialized: true,
      });
    } catch (error) {
      console.error('Settings initialization error:', error);
      set({ isInitialized: true });
    }
  },
}));

async function getStoredSettings(): Promise<StoredSettings> {
  try {
    const stored = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to get stored settings:', error);
  }
  return defaultSettings;
}

async function storeSettings(settings: StoredSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to store settings:', error);
  }
}
