/**
 * SplitLayout component
 * Two-column layout with configurable widths
 */
import React, { ReactNode } from 'react';

interface SplitLayoutProps {
  /**
   * Left column content
   */
  left: ReactNode;
  /**
   * Right column content
   */
  right: ReactNode;
  /**
   * Left column width (out of 12)
   */
  leftWidth?: 3 | 4 | 5 | 6 | 7 | 8 | 9;
  /**
   * Additional class names
   */
  className?: string;
  /**
   * Gap between columns
   */
  gap?: 'none' | 'sm' | 'md' | 'lg';
}

export const SplitLayout: React.FC<SplitLayoutProps> = ({
  left,
  right,
  leftWidth = 4,
  className = '',
  gap = 'md',
}) => {
  // Calculate column widths
  
  // Column width classes
  const leftColClasses = {
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
    7: 'lg:col-span-7',
    8: 'lg:col-span-8',
    9: 'lg:col-span-9',
  };
  
  const rightColClasses = {
    3: 'lg:col-span-9',
    4: 'lg:col-span-8',
    5: 'lg:col-span-7',
    6: 'lg:col-span-6',
    7: 'lg:col-span-5',
    8: 'lg:col-span-4',
    9: 'lg:col-span-3',
  };
  
  // Gap classes
  const gapClasses = {
    'none': 'gap-0',
    'sm': 'gap-4',
    'md': 'gap-6',
    'lg': 'gap-8',
  };
  
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 ${gapClasses[gap]} ${className}`}>
      <div className={`col-span-1 ${leftColClasses[leftWidth]}`}>
        {left}
      </div>
      <div className={`col-span-1 ${rightColClasses[leftWidth]}`}>
        {right}
      </div>
    </div>
  );
};