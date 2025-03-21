/**
 * Input component
 * Text input with support for different states and variations
 */
import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input label
   */
  label?: string;
  /**
   * Helper text shown below the input
   */
  helperText?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Input size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Left icon
   */
  leftIcon?: ReactNode;
  /**
   * Right icon
   */
  rightIcon?: ReactNode;
  /**
   * Full width input
   */
  fullWidth?: boolean;
  /**
   * Whether field is required
   */
  required?: boolean;
  /**
   * Additional class names for the container
   */
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  className = '',
  size = 'medium',
  leftIcon,
  rightIcon,
  fullWidth = false,
  required = false,
  containerClassName = '',
  ...props
}, ref) => {
  // Base styles
  const baseInputClasses = 'bg-white border rounded focus:outline-none focus:ring-2 text-neutral-900 placeholder:text-neutral-500 disabled:bg-neutral-100 disabled:text-neutral-400';
  
  // Size styles
  const sizeClasses = {
    small: 'h-8 text-sm px-3 py-1',
    medium: 'h-10 px-3 py-2',
    large: 'h-12 text-lg px-4 py-2'
  };
  
  // Error or normal state
  const stateClasses = error
    ? 'border-error focus:ring-error-200 focus:border-error'
    : 'border-neutral-300 focus:ring-primary-200 focus:border-primary-500';
  
  // Icon padding adjustments
  const iconPaddingClasses = {
    left: leftIcon ? 'pl-10' : '',
    right: rightIcon ? 'pr-10' : ''
  };
  
  // Width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  const inputClasses = `${baseInputClasses} ${sizeClasses[size]} ${stateClasses} ${iconPaddingClasses.left} ${iconPaddingClasses.right} ${widthClass} ${className}`;
  
  return (
    <div className={`${widthClass} ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label} {required && <span className="text-error-500">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          {...props}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
          required={required}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error ? (
        <p id={`${props.id}-error`} className="mt-1 text-sm text-error-500">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${props.id}-helper`} className="mt-1 text-sm text-neutral-600">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';