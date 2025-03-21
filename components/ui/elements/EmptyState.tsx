/**
 * EmptyState component
 * Displays a message when there is no content
 */
import React, { ReactNode } from 'react';

interface EmptyStateProps {
  /**
   * Title text
   */
  title: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Optional icon to display
   */
  icon?: ReactNode;
  /**
   * Optional action button
   */
  action?: ReactNode;
  /**
   * Additional class names
   */
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className = '',
}) => {
  return (
    <div className={`text-center ${className}`}>
      {icon && (
        <div className="flex justify-center mb-4 text-neutral-400">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-neutral-900 mb-1">{title}</h3>
      {description && (
        <p className="text-neutral-600 max-w-md mx-auto mb-4">{description}</p>
      )}
      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  );
};