/**
 * FormGroup component
 * Container for form elements with consistent spacing
 */
import React, { ReactNode } from 'react';

interface FormGroupProps {
  /**
   * Form group content
   */
  children: ReactNode;
  /**
   * Additional class names
   */
  className?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {children}
    </div>
  );
};