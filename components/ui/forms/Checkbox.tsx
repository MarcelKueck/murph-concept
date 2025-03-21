/**
 * Checkbox component
 */
import React, { forwardRef, InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Checkbox label
   */
  label: string;
  /**
   * Helper text shown below the checkbox
   */
  helperText?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Whether field is required
   */
  required?: boolean;
  /**
   * Additional class names for the container
   */
  containerClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  helperText,
  error,
  className = '',
  required = false,
  containerClassName = '',
  disabled = false,
  ...props
}, ref) => {
  // Base styles for the checkbox
  const baseClasses = 'h-4 w-4 rounded border focus:ring-2 focus:ring-offset-2 text-primary-500 transition';
  
  // State classes
  const stateClasses = error
    ? 'border-error focus:ring-error-200'
    : 'border-neutral-300 focus:ring-primary-200';
  
  // Disabled
  const disabledClasses = disabled ? 'cursor-not-allowed opacity-60' : '';
  
  const checkboxClasses = `${baseClasses} ${stateClasses} ${disabledClasses} ${className}`;
  
  return (
    <div className={`flex items-start ${containerClassName}`}>
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          ref={ref}
          {...props}
          className={checkboxClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
          required={required}
          disabled={disabled}
        />
      </div>
      <div className="ml-2 text-sm">
        <label 
          htmlFor={props.id} 
          className={`font-medium ${disabled ? 'text-neutral-400' : 'text-neutral-700'}`}
        >
          {label} {required && <span className="text-error-500">*</span>}
        </label>
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
    </div>
  );
});

Checkbox.displayName = 'Checkbox';