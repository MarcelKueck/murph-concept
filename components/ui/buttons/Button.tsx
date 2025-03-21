/**
 * Primary button component
 * Used for primary actions throughout the application
 */
import React from 'react';

interface ButtonProps {
  /**
   * Button contents
   */
  children: React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Optional additional classes
   */
  className?: string;
  /**
   * Optional disabled state
   */
  disabled?: boolean;
  /**
   * Full width button
   */
  fullWidth?: boolean;
  /**
   * Optional type attribute
   */
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  fullWidth = false,
  type = 'button',
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium transition rounded';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 disabled:bg-gray-300 disabled:text-gray-500',
    secondary: 'bg-white text-primary-500 border border-primary-500 hover:bg-primary-50 active:bg-primary-100 disabled:border-gray-200 disabled:text-gray-500',
    tertiary: 'bg-transparent text-primary-500 hover:bg-primary-50 active:bg-primary-100 disabled:text-gray-400',
  };
  
  // Size classes
  const sizeClasses = {
    small: 'text-sm py-1.5 px-3',
    medium: 'text-base py-2 px-4',
    large: 'text-lg py-2.5 px-5',
  };
  
  // Full width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
