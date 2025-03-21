/**
 * Status indicator components and navigation elements
 */
import React, { ReactNode } from 'react';

/**
 * Badge component
 * Used for status indicators, labels, and tags
 */
interface BadgeProps {
  /**
   * Badge content
   */
  children: ReactNode;
  /**
   * Badge variant
   */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /**
   * Optional dot indicator
   */
  withDot?: boolean;
  /**
   * Additional class names
   */
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  withDot = false,
  className = '',
}) => {
  // Variant styles
  const variantStyles = {
    default: 'bg-neutral-100 text-neutral-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };
  
  // Dot colors
  const dotColors = {
    default: 'bg-neutral-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };
  
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {withDot && (
        <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  );
};