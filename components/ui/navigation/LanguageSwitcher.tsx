'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link'; // Using Next.js Link instead of next-intl Link

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className = '' 
}) => {
  const locale = useLocale();
  const [isChanging, setIsChanging] = useState(false);
  
  // Helper to generate path with new locale
  const getLocalizedPath = (newLocale: string) => {
    // If we're client-side, use window.location.pathname
    if (typeof window !== 'undefined') {
      // Replace current locale with new locale in the path
      const pathname = window.location.pathname;
      // Get the path after the locale segment
      const pathWithoutLocale = pathname.replace(/^\/(en|de)/, '');
      return `/${newLocale}${pathWithoutLocale}`;
    }
    return `/${newLocale}`;
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Link
        href={getLocalizedPath('de')}
        className={`px-2 py-1 rounded-l-md text-sm font-medium ${
          locale === 'de'
            ? 'bg-primary-500 text-white'
            : 'bg-white text-neutral-700 hover:bg-neutral-100'
        } border border-neutral-300 transition ${
          isChanging || locale === 'de' ? 'pointer-events-none opacity-70' : ''
        }`}
        aria-label="Auf Deutsch umschalten"
        onClick={() => {
          if (locale !== 'de') setIsChanging(true);
        }}
      >
        DE
      </Link>
      <Link
        href={getLocalizedPath('en')}
        className={`px-2 py-1 rounded-r-md text-sm font-medium ${
          locale === 'en'
            ? 'bg-primary-500 text-white'
            : 'bg-white text-neutral-700 hover:bg-neutral-100'
        } border border-neutral-300 border-l-0 transition ${
          isChanging || locale === 'en' ? 'pointer-events-none opacity-70' : ''
        }`}
        aria-label="Switch to English"
        onClick={() => {
          if (locale !== 'en') setIsChanging(true);
        }}
      >
        EN
      </Link>
    </div>
  );
}