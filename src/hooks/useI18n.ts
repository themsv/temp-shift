import { createContext, use } from 'react';
import { type SupportedLocale } from '../translations';

interface I18nContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

export const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const useI18n = () => {
  const ctx = use(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};
