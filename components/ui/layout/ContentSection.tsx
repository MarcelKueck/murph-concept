/**
 * ContentSection component
 * Consistent section container with optional title
 */
import React, { ReactNode } from 'react';

interface ContentSectionProps {
  /**
   * Section content
   */
  children: ReactNode;
  /**
   * Optional section title
   */
  title?: string;
  /**
   * Optional section description
   */
  description?: string;
  /**
   * Optional section actions
   */
  actions?: ReactNode;
  /**
   * Remove padding
   */
  noPadding?: boolean;
  /**
   * Additional class names
   */
  className?: string;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  children,
  title,
  description,
  actions,
  noPadding = false,
  className = '',
}) => {
  return (
    <section className={`mb-8 ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-neutral-600">{description}</p>
            )}
          </div>
          
          {actions && (
            <div className="flex space-x-2">
              {actions}
            </div>
          )}
        </div>
      )}
      
      <div className={noPadding ? '' : 'p-4'}>
        {children}
      </div>
    </section>
  );
};