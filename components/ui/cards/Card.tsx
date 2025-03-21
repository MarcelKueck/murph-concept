/**
 * Card component
 * Container for displaying grouped content
 */
import React from 'react';

interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Optional card title
   */
  title?: string;
  /**
   * Optional additional classes
   */
  className?: string;
  /**
   * Optional onClick handler
   */
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  onClick,
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm p-6 ${className}`}
      onClick={onClick}
    >
      {title && (
        <div className="pb-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="py-4">
        {children}
      </div>
    </div>
  );
};

export default Card;
