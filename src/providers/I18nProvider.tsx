import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';

import { I18nContext } from '../hooks/useI18n';
import { messages, type SupportedLocale } from '../translations';

type I18nProviderProps = Readonly<{
  children: ReactNode;
}>;

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [locale, setLocale] = useState<SupportedLocale>('en-US');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
      setLocale(savedLocale as SupportedLocale);
    } else {
      const browserLocale = navigator.language;
      setLocale(
        messages[browserLocale as SupportedLocale] ? (browserLocale as SupportedLocale) : 'en-US',
      );
    }
  }, []);

  const handleLocaleChange = (newLocale: SupportedLocale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale: handleLocaleChange,
    }),
    [locale],
  );

  return (
    <I18nContext.Provider value={value}>
      <IntlProvider
        messages={messages[locale as keyof typeof messages]}
        locale={locale}
        defaultLocale="en-US"
      >
        {children}
      </IntlProvider>
    </I18nContext.Provider>
  );
};
