/**
 * IconButton component
 * Used for icon-only actions
 */
import React, { ReactNode } from 'react';

interface IconButtonProps {
  /**
   * Icon to display
   */
  icon: ReactNode;
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Accessible label for the button
   */
  ariaLabel: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  ariaLabel,
  className = '',
  type = 'button',
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center rounded-full transition focus:outline-none focus:ring-2';
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-200 active:bg-primary-700 disabled:bg-neutral-300 disabled:text-neutral-500',
    secondary: 'bg-white text-primary-500 border border-primary-500 hover:bg-primary-50 focus:ring-primary-200 active:bg-primary-100 disabled:border-neutral-200 disabled:text-neutral-500',
    tertiary: 'bg-transparent text-primary-500 hover:bg-primary-50 focus:ring-primary-200 active:bg-primary-100 disabled:text-neutral-400',
    ghost: 'bg-transparent text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-300 active:bg-neutral-200 disabled:text-neutral-400',
  };
  
  // Size styles
  const sizeStyles = {
    small: 'p-1.5',
    medium: 'p-2',
    large: 'p-2.5',
  };
  
  // Combine all styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default IconButton;