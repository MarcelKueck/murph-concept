/**
 * Card component
 * Base container for displaying grouped content
 */
import React, { ReactNode } from 'react';

interface CardProps {
  /**
   * Card content
   */
  children: ReactNode;
  /**
   * Optional card title
   */
  title?: string;
  /**
   * Optional card footer
   */
  footer?: ReactNode;
  /**
   * Optional additional classes
   */
  className?: string;
  /**
   * Optional onClick handler
   */
  onClick?: () => void;
  /**
   * Whether the card has a hover effect
   */
  hoverable?: boolean;
  /**
   * Whether the card has a border
   */
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  footer,
  className = '',
  onClick,
  hoverable = false,
  bordered = false,
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-sm p-6';
  const hoverClasses = hoverable ? 'transition hover:shadow-md hover:translate-y-[-2px]' : '';
  const borderClasses = bordered ? 'border border-neutral-200' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${borderClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {title && (
        <div className="pb-4 border-b border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        </div>
      )}
      <div className={title ? 'py-4' : ''}>
        {children}
      </div>
      {footer && (
        <div className="pt-4 border-t border-neutral-200">
          {footer}
        </div>
      )}
    </div>
  );
};