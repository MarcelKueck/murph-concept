/**
 * Select component
 * Dropdown selection input
 */
import React, { forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * Select label
   */
  label?: string;
  /**
   * Select options
   */
  options: SelectOption[];
  /**
   * Helper text shown below the select
   */
  helperText?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Select size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Full width select
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

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  helperText,
  error,
  className = '',
  size = 'medium',
  fullWidth = false,
  required = false,
  containerClassName = '',
  ...props
}, ref) => {
  // Base styles
  const baseClasses = 'bg-white border rounded focus:outline-none focus:ring-2 text-neutral-900 disabled:bg-neutral-100 disabled:text-neutral-400 appearance-none';
  
  // Size styles
  const sizeClasses = {
    small: 'h-8 text-sm pl-3 pr-10 py-1',
    medium: 'h-10 pl-3 pr-10 py-2',
    large: 'h-12 text-lg pl-4 pr-12 py-2'
  };
  
  // Error or normal state
  const stateClasses = error
    ? 'border-error focus:ring-error-200 focus:border-error'
    : 'border-neutral-300 focus:ring-primary-200 focus:border-primary-500';
  
  // Width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  const selectClasses = `${baseClasses} ${sizeClasses[size]} ${stateClasses} ${widthClass} ${className}`;
  
  return (
    <div className={`${widthClass} ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label} {required && <span className="text-error-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          {...props}
          className={selectClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
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

Select.displayName = 'Select';