/**
 * Linear Progress Bar
 */
import React from 'react';

interface LinearProgressProps {
  /**
   * Progress value (0-100)
   */
  value: number;
  /**
   * Optional label
   */
  label?: string;
  /**
   * Show percentage text
   */
  showPercentage?: boolean;
  /**
   * Size variant
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Color variant
   */
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  /**
   * Additional class names
   */
  className?: string;
}

export const LinearProgress: React.FC<LinearProgressProps> = ({
  value,
  label,
  showPercentage = false,
  size = 'medium',
  variant = 'primary',
  className = '',
}) => {
  // Validate value
  const normalizedValue = Math.max(0, Math.min(100, value));
  
  // Size styles
  const sizeStyles = {
    small: 'h-1',
    medium: 'h-1.5',
    large: 'h-2',
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };
  
  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && <div className="text-sm font-medium text-neutral-700">{label}</div>}
          {showPercentage && <div className="text-sm text-neutral-500">{normalizedValue}%</div>}
        </div>
      )}
      <div className={`bg-neutral-200 rounded-full ${sizeStyles[size]}`}>
        <div
          className={`${sizeStyles[size]} rounded-full ${variantStyles[variant]} transition-all duration-300 ease-in-out`}
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  );
};