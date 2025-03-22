import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // These are all the locales you want to support
  locales: ['en', 'de'],
  // This is the default locale you want to be used when visiting
  // a non-locale prefixed path e.g. `/dashboard`
  defaultLocale: 'de',
  // Always require a locale prefix
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};