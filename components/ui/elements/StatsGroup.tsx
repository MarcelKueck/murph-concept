/**
 * StatsGroup component
 * Displays a group of statistics
 */
import React from 'react';
import { Stat } from './Stat';
import { ReactNode } from 'react';

interface StatsGroupProps {
  /**
   * Array of stat objects
   */
  stats: Array<{
    label: string;
    value: string | number;
    change?: number;
    increaseIsGood?: boolean;
    icon?: ReactNode;
  }>;
  /**
   * Number of columns on different screen sizes
   */
  columns?: {
    sm?: 1 | 2;
    md?: 2 | 3 | 4;
    lg?: 3 | 4 | 5;
  };
  /**
   * Additional class names
   */
  className?: string;
}

export const StatsGroup: React.FC<StatsGroupProps> = ({
  stats,
  columns = {
    sm: 1,
    md: 2,
    lg: 3,
  },
  className = '',
}) => {
  // Column classes
  const columnClasses = [
    'grid-cols-1',
    columns.sm === 2 ? 'sm:grid-cols-2' : '',
    columns.md === 2 ? 'md:grid-cols-2' : columns.md === 3 ? 'md:grid-cols-3' : columns.md === 4 ? 'md:grid-cols-4' : '',
    columns.lg === 3 ? 'lg:grid-cols-3' : columns.lg === 4 ? 'lg:grid-cols-4' : columns.lg === 5 ? 'lg:grid-cols-5' : '',
  ].filter(Boolean).join(' ');
  
  return (
    <div className={`grid ${columnClasses} gap-5 ${className}`}>
      {stats.map((stat, index) => (
        <Stat
          key={index}
          label={stat.label}
          value={stat.value}
          change={stat.change}
          increaseIsGood={stat.increaseIsGood}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};