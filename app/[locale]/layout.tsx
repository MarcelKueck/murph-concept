import { Nunito, Montserrat } from 'next/font/google';
import { IntlProvider } from '@/providers/IntlProvider';
import { ReactNode } from 'react';
import '../globals.css';

// Font definitions
const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Murph - Medical guidance when you need it most',
  description: 'Connect with medical students for accessible explanations and advice',
};

// Define valid locales
export const validLocales = ['en', 'de'];

// Generate static params for locales
export async function generateStaticParams() {
  return validLocales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Fix: Get locale from params object without destructuring in the parameter
  const locale = params.locale;
  
  // Ensure the locale is valid, default to 'de' if not
  const validLocale = validLocales.includes(locale) ? locale : 'de';
  
  // Import messages for the current locale
  const messages = (await import(`../../messages/${validLocale}.json`)).default;

  return (
    <html lang={validLocale}>
      <body className={`${nunito.variable} ${montserrat.variable} font-sans bg-white text-gray-800`}>
        <IntlProvider locale={validLocale} messages={messages}>
          {children}
        </IntlProvider>
      </body>
    </html>
  );
}