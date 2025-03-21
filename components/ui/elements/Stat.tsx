/**
 * Stat component
 * Displays a statistic with label and optional change indicator
 */
import React, { ReactNode } from 'react';

interface StatProps {
  /**
   * Statistic label
   */
  label: string;
  /**
   * Statistic value
   */
  value: string | number;
  /**
   * Change percentage (positive or negative)
   */
  change?: number;
  /**
   * Whether an increase is good (affects color)
   */
  increaseIsGood?: boolean;
  /**
   * Icon to display
   */
  icon?: ReactNode;
  /**
   * Additional class names
   */
  className?: string;
}

export const Stat: React.FC<StatProps> = ({
  label,
  value,
  change,
  increaseIsGood = true,
  icon,
  className = '',
}) => {
  // Determine if change is positive, negative, or neutral
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  
  // Color class based on change and whether increase is good
  const changeColorClass = 
    (isPositive && increaseIsGood) || (isNegative && !increaseIsGood)
      ? 'text-green-600'
      : (isNegative && increaseIsGood) || (isPositive && !increaseIsGood)
      ? 'text-red-600'
      : 'text-neutral-500';
  
  return (
    <div className={`p-5 bg-white rounded-lg shadow-sm ${className}`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-neutral-900">{value}</p>
        </div>
        {icon && (
          <div className="text-neutral-400">
            {icon}
          </div>
        )}
      </div>
      
      {change !== undefined && (
        <div className="mt-3">
          <span className={`text-sm ${changeColorClass} flex items-center`}>
            {isPositive && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {isNegative && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {Math.abs(change).toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
};