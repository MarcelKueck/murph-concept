/**
 * Divider component
 * Horizontal divider with optional label
 */
import React from 'react';

interface DividerProps {
  /**
   * Optional label to display in the middle of the divider
   */
  label?: string;
  /**
   * Divider orientation
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Additional class names
   */
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  label,
  orientation = 'horizontal',
  className = '',
}) => {
  if (orientation === 'vertical') {
    return (
      <div className={`inline-flex h-full items-center px-2 ${className}`}>
        <div className="h-full w-px bg-neutral-200"></div>
      </div>
    );
  }
  
  if (label) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-sm text-neutral-500">{label}</span>
        </div>
      </div>
    );
  }
  
  return <hr className={`border-neutral-200 ${className}`} />;
};