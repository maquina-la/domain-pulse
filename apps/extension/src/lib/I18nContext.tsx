import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SupportedLocale,
  detectBrowserLanguage,
  getSavedLocale,
  setSavedLocale,
  t,
  TranslationKey,
} from './i18n';

interface I18nContextValue {
  locale: SupportedLocale;
  setLocale: (newLocale: SupportedLocale | null) => void;
  isAuto: boolean;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(detectBrowserLanguage);
  const [isAuto, setIsAuto] = useState<boolean>(() => getSavedLocale() === null);

  const changeLocale = (newLocale: SupportedLocale | null) => {
    setSavedLocale(newLocale);
    if (newLocale === null) {
      setIsAuto(true);
      setLocaleState(detectBrowserLanguage());
    } else {
      setIsAuto(false);
      setLocaleState(newLocale);
    }
  };

  useEffect(() => {
    const handleStorage = () => {
      setLocaleState(detectBrowserLanguage());
      setIsAuto(getSavedLocale() === null);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const translate = (key: TranslationKey, params?: Record<string, string | number>) => {
    return t(locale, key, params);
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale: changeLocale,
        isAuto,
        t: translate,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}
