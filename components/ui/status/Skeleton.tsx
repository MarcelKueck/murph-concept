/**
 * Skeleton Loader component
 */
import React from 'react';

interface SkeletonProps {
  /**
   * Skeleton variant
   */
  variant?: 'text' | 'circle' | 'rectangle';
  /**
   * Width (default: 100%)
   */
  width?: string | number;
  /**
   * Height (required for rectangle, default for text: 1rem)
   */
  height?: string | number;
  /**
   * Border radius (for rectangle)
   */
  borderRadius?: string | number;
  /**
   * Additional class names
   */
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  borderRadius,
  className = '',
}) => {
  // Base styles
  const baseStyles = 'animate-pulse bg-neutral-200';
  
  // Variant specific styles
  const variantStyles = '';
  let defaultHeight;
  let defaultRadius;
  
  switch (variant) {
    case 'text':
      defaultHeight = '1rem';
      defaultRadius = '0.25rem';
      break;
    case 'circle':
      defaultHeight = width || '2.5rem'; // Circle height = width
      defaultRadius = '9999px';
      break;
    case 'rectangle':
      defaultHeight = '4rem';
      defaultRadius = '0.375rem';
      break;
  }
  
  const style = {
    width: width || '100%',
    height: height || defaultHeight,
    borderRadius: borderRadius || defaultRadius,
  };
  
  return (
    <div
      className={`${baseStyles} ${variantStyles} ${className}`}
      style={style}
    />
  );
};