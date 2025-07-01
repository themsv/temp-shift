import { type ReactNode, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { useLocalStorage } from '@mantine/hooks';

import { I18nContext } from '@app/hooks/useI18n';
import { messages, type SupportedLocale } from '../translations';

type I18nProviderProps = Readonly<{
  children: ReactNode;
}>;

function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocale] = useLocalStorage<SupportedLocale>({
    key: 'mqg-locale',
    defaultValue: 'en-US',
    getInitialValueInEffect: true,
  });

  const value = useMemo(
    () => ({
      locale,
      setLocale,
    }),
    [locale, setLocale],
  );

  return (
    <I18nContext value={value}>
      <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="en-US">
        {children}
      </IntlProvider>
    </I18nContext>
  );
}

export default I18nProvider;
