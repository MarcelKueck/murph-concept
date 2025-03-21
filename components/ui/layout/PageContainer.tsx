/**
 * Layout Components
 * Page containers and layout structures
 */
import React, { ReactNode } from 'react';

/**
 * PageContainer component
 * Main container for page content with consistent padding and max width
 */
interface PageContainerProps {
  /**
   * Page content
   */
  children: ReactNode;
  /**
   * Maximum width constraint
   */
  maxWidth?: '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  /**
   * Padding size
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * Additional class names
   */
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  maxWidth = '7xl',
  padding = 'md',
  className = '',
}) => {
  // Max width classes
  const maxWidthClasses = {
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    'full': 'max-w-full',
  };
  
  // Padding classes
  const paddingClasses = {
    'none': 'px-0',
    'sm': 'px-2 sm:px-4',
    'md': 'px-4 sm:px-6 lg:px-8',
    'lg': 'px-6 sm:px-8 lg:px-12',
  };
  
  return (
    <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};