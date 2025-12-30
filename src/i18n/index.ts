import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import tr from './locales/tr.json';
import en from './locales/en.json';

const LANGUAGE_STORAGE_KEY = '@yesilpuan/language';

export const resources = {
  tr: { translation: tr },
  en: { translation: en },
};

export const supportedLanguages = [
  { code: 'tr', name: 'Türkçe', nativeName: 'Türkçe', rtl: false },
  { code: 'en', name: 'English', nativeName: 'English', rtl: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', rtl: false },
  { code: 'fr', name: 'French', nativeName: 'Français', rtl: false },
  { code: 'es', name: 'Spanish', nativeName: 'Español', rtl: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
];

const getStoredLanguage = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch {
    return null;
  }
};

const getDeviceLanguage = (): string => {
  const locale = Localization.getLocales()[0];
  const languageCode = locale?.languageCode || 'tr';

  // Check if the device language is supported
  const isSupported = Object.keys(resources).includes(languageCode);
  return isSupported ? languageCode : 'tr';
};

export const initI18n = async () => {
  const storedLanguage = await getStoredLanguage();
  const language = storedLanguage || getDeviceLanguage();

  await i18n.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  return i18n;
};

export const changeLanguage = async (languageCode: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
    await i18n.changeLanguage(languageCode);
  } catch (error) {
    console.error('Failed to change language:', error);
  }
};

export const getCurrentLanguage = (): string => {
  return i18n.language || 'tr';
};

export const isRTL = (): boolean => {
  const currentLang = getCurrentLanguage();
  const langConfig = supportedLanguages.find((l) => l.code === currentLang);
  return langConfig?.rtl || false;
};

export default i18n;
