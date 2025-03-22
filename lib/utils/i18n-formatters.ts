import { useFormatter, useLocale } from 'next-intl';

export const useFormatters = () => {
  const locale = useLocale();
  const formatter = useFormatter();

  /**
   * Format a date according to locale conventions
   * - German: DD.MM.YYYY
   * - English: MM/DD/YYYY
   */
  const formatDate = (date: Date | string, format: 'short' | 'medium' | 'long' = 'medium') => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return formatter.dateTime(dateObj, format);
  };

  /**
   * Format a time according to locale conventions
   */
  const formatTime = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return formatter.dateTime(dateObj, {
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  /**
   * Format a number according to locale conventions
   * - German: 1.234,56
   * - English: 1,234.56
   */
  const formatNumber = (
    value: number,
    style: 'decimal' | 'currency' | 'percent' = 'decimal',
  ) => {
    // Fixed for type compatibility
    if (style === 'currency') {
      return formatter.number(value, {
        style: style,
        currency: locale === 'de' ? 'EUR' : 'USD',
      });
    }
    
    return formatter.number(value, { style: style });
  };

  /**
   * Format a relative time (e.g., "2 days ago")
   */
  const formatRelativeTime = (value: Date | string) => {
    const dateObj = typeof value === 'string' ? new Date(value) : value;
    return formatter.relativeTime(dateObj);
  };

  return {
    formatDate,
    formatTime,
    formatNumber,
    formatRelativeTime,
  };
};