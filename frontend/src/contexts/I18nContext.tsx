import React, { createContext, useContext, useState, useCallback } from 'react';
import en from '../i18n/en.json';
import zh from '../i18n/zh.json';

type Locale = 'en' | 'zh';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  tArray: (key: string) => unknown[];
}

const translations: Record<Locale, Record<string, unknown>> = { en, zh };

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem('apollospark_locale');
    return (stored === 'zh' ? 'zh' : 'en') as Locale;
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('apollospark_locale', newLocale);
  }, []);

  const t = useCallback((key: string): string => {
    const value = getNestedValue(translations[locale], key);
    if (typeof value === 'string') return value;
    // Fallback to English
    const fallback = getNestedValue(translations.en, key);
    if (typeof fallback === 'string') return fallback;
    return key;
  }, [locale]);

  const tArray = useCallback((key: string): unknown[] => {
    const value = getNestedValue(translations[locale], key);
    if (Array.isArray(value)) return value;
    const fallback = getNestedValue(translations.en, key);
    if (Array.isArray(fallback)) return fallback;
    return [];
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tArray }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export type { Locale };
