/**
 * TextArea component
 * Multi-line text input
 */
import React, { forwardRef } from 'react';

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /**
   * Textarea label
   */
  label?: string;
  /**
   * Helper text shown below the textarea
   */
  helperText?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Full width textarea
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

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  helperText,
  error,
  className = '',
  fullWidth = false,
  required = false,
  containerClassName = '',
  ...props
}, ref) => {
  // Base styles
  const baseClasses = 'bg-white border rounded focus:outline-none focus:ring-2 text-neutral-900 placeholder:text-neutral-500 disabled:bg-neutral-100 disabled:text-neutral-400 min-h-[5rem] resize-vertical';
  
  // Error or normal state
  const stateClasses = error
    ? 'border-error focus:ring-error-200 focus:border-error'
    : 'border-neutral-300 focus:ring-primary-200 focus:border-primary-500';
  
  // Width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  const textareaClasses = `${baseClasses} ${stateClasses} p-3 ${widthClass} ${className}`;
  
  return (
    <div className={`${widthClass} ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label} {required && <span className="text-error-500">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        {...props}
        className={textareaClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
        required={required}
      />
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

TextArea.displayName = 'TextArea';