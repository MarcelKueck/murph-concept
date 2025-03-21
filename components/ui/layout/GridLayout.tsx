/**
 * GridLayout component
 * Responsive grid layout for cards and items
 */
import React, { ReactNode } from 'react';

interface GridLayoutProps {
  /**
   * Grid items
   */
  children: ReactNode;
  /**
   * Columns on different screen sizes
   */
  columns?: {
    sm?: 1 | 2 | 3 | 4;
    md?: 1 | 2 | 3 | 4 | 5 | 6;
    lg?: 1 | 2 | 3 | 4 | 5 | 6;
    xl?: 1 | 2 | 3 | 4 | 5 | 6;
  };
  /**
   * Gap between items
   */
  gap?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * Additional class names
   */
  className?: string;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  },
  gap = 'md',
  className = '',
}) => {
  // Column classes
  const getColumnClass = (size: 'sm' | 'md' | 'lg' | 'xl', cols?: 1 | 2 | 3 | 4 | 5 | 6) => {
    if (!cols) return '';
    
    const prefix = size === 'sm' ? 'sm' : size === 'md' ? 'md' : size === 'lg' ? 'lg' : 'xl';
    
    return `${prefix}:grid-cols-${cols}`;
  };
  
  // Gap classes
  const gapClasses = {
    'none': 'gap-0',
    'sm': 'gap-4',
    'md': 'gap-6',
    'lg': 'gap-8',
  };
  
  const columnClasses = [
    'grid-cols-1',
    getColumnClass('sm', columns.sm),
    getColumnClass('md', columns.md),
    getColumnClass('lg', columns.lg),
    getColumnClass('xl', columns.xl),
  ].filter(Boolean).join(' ');
  
  return (
    <div className={`grid ${columnClasses} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};