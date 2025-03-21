/**
 * RadioGroup component
 */
import React from 'react';

interface RadioGroupProps {
  /**
   * Group label
   */
  label?: string;
  /**
   * Radio options
   */
  options: { value: string; label: string }[];
  /**
   * Selected value
   */
  value: string;
  /**
   * Change handler
   */
  onChange: (value: string) => void;
  /**
   * Helper text
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
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Additional class names for the container
   */
  className?: string;
  /**
   * Name attribute for the radio group
   */
  name: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  helperText,
  error,
  required = false,
  disabled = false,
  className = '',
  name,
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label} {required && <span className="text-error-500">*</span>}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              disabled={disabled}
              className={`h-4 w-4 border-neutral-300 text-primary-500 focus:ring-primary-200 ${
                error ? 'border-error focus:ring-error-200' : ''
              }`}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={`ml-3 text-sm font-medium ${
                disabled ? 'text-neutral-400' : 'text-neutral-700'
              }`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error ? (
        <p className="mt-1 text-sm text-error-500">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-sm text-neutral-600">{helperText}</p>
      ) : null}
    </div>
  );
};