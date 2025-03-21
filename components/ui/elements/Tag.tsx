/**
 * Tag component
 * Displays a tag/chip with optional removal
 */
import React from 'react';

interface TagProps {
  /**
   * Tag label
   */
  label: string;
  /**
   * Whether the tag is removable
   */
  removable?: boolean;
  /**
   * Remove handler
   */
  onRemove?: () => void;
  /**
   * Tag color variant
   */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /**
   * Additional class names
   */
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  label,
  removable = false,
  onRemove,
  variant = 'default',
  className = '',
}) => {
  // Variant classes
  const variantClasses = {
    'default': 'bg-neutral-100 text-neutral-800',
    'primary': 'bg-primary-100 text-primary-800',
    'secondary': 'bg-secondary-100 text-secondary-800',
    'success': 'bg-green-100 text-green-800',
    'warning': 'bg-yellow-100 text-yellow-800',
    'error': 'bg-red-100 text-red-800',
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {label}
      {removable && onRemove && (
        <button
          type="button"
          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-neutral-400 hover:bg-neutral-200 hover:text-neutral-500 focus:outline-none focus:bg-neutral-500 focus:text-white transition"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <span className="sr-only">Remove {label}</span>
          <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
          </svg>
        </button>
      )}
    </span>
  );
};