/**
 * ResponsiveContainer component
 * Container with responsive padding
 */
import React, { ReactNode } from 'react';

interface ResponsiveContainerProps {
  /**
   * Container content
   */
  children: ReactNode;
  /**
   * Whether to center the content
   */
  centered?: boolean;
  /**
   * Add vertical padding
   */
  verticalPadding?: boolean;
  /**
   * Max width constraint
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  /**
   * Additional class names
   */
  className?: string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  centered = false,
  verticalPadding = false,
  maxWidth = '7xl',
  className = '',
}) => {
  // Max width classes
  const maxWidthClasses = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    'full': 'max-w-full',
  };
  
  return (
    <div className={`px-4 sm:px-6 lg:px-8 ${verticalPadding ? 'py-6' : ''} ${centered ? 'mx-auto' : ''} ${maxWidthClasses[maxWidth]} ${className}`}>
      {children}
    </div>
  );
};