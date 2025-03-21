/**
 * Spinner component
 * Loading indicator
 */
import React from 'react';

interface SpinnerProps {
  /**
   * Spinner size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Spinner color
   */
  color?: 'primary' | 'white' | 'neutral';
  /**
   * Additional class names
   */
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color = 'primary',
  className = '',
}) => {
  // Size styles
  const sizeStyles = {
    small: 'h-4 w-4 border-2',
    medium: 'h-6 w-6 border-2',
    large: 'h-8 w-8 border-3',
  };
  
  // Color styles
  const colorStyles = {
    primary: 'border-primary-200 border-t-primary-600',
    white: 'border-white/30 border-t-white',
    neutral: 'border-neutral-200 border-t-neutral-600',
  };
  
  return (
    <div className={`inline-block ${className}`}>
      <div className={`animate-spin rounded-full ${sizeStyles[size]} ${colorStyles[color]}`} />
    </div>
  );
};