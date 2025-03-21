/**
 * Utility functions for formatting data 
 */

/**
 * Format a date to a localized string
 * @param date - The date to format
 * @param locale - The locale to use for formatting
 * @returns A formatted date string
 */
export const formatDate = (date: Date | string, locale: string = 'en-US'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format a time to a localized string
 * @param date - The date to extract the time from
 * @param locale - The locale to use for formatting
 * @returns A formatted time string
 */
export const formatTime = (date: Date | string, locale: string = 'en-US'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format a date and time to a localized string
 * @param date - The date to format
 * @param locale - The locale to use for formatting
 * @returns A formatted date and time string
 */
export const formatDateTime = (date: Date | string, locale: string = 'en-US'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
