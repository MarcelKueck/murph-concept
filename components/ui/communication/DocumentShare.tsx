/**
 * DocumentShare component
 * Document sharing in communication interfaces
 */
import React, { ReactNode } from 'react';

interface DocumentShareProps {
  /**
   * Document name
   */
  name: string;
  /**
   * Document type
   */
  type: string;
  /**
   * Document source/URL
   */
  src?: string;
  /**
   * Document icon
   */
  icon?: ReactNode;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Additional class names
   */
  className?: string;
}

export const DocumentShare: React.FC<DocumentShareProps> = ({
  name,
  type,
  icon,
  onClick,
  className = '',
}) => {
  return (
    <div 
      className={`flex items-center p-3 border border-neutral-200 rounded-md bg-neutral-50 hover:bg-neutral-100 transition cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex-shrink-0 text-neutral-500 mr-3">
        {icon || (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-neutral-900 truncate">{name}</h4>
        <p className="text-xs text-neutral-500">{type}</p>
      </div>
      <div className="ml-4">
        <button className="text-primary-500 hover:text-primary-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};