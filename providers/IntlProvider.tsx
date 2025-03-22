'use client';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

// Use an interface for self-referential structures
interface MessageRecord {
  [key: string]: string | MessageRecord;
}

export function IntlProvider({
  locale,
  messages,
  children,
  timeZone = 'Europe/Berlin'
}: {
  locale: string;
  messages: MessageRecord;
  children: ReactNode;
  timeZone?: string;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
      formats={{
        dateTime: {
          short: {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          },
          medium: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          },
          long: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          },
        },
        number: {
          currency: {
            style: 'currency',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
          percentage: {
            style: 'percent',
            minimumFractionDigits: 2,
          },
        },
      }}
      now={new Date()}
    >
      {children}
    </NextIntlClientProvider>
  );
}