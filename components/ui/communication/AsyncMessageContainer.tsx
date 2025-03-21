/**
 * AsyncMessageContainer component
 * Container for asynchronous messaging
 */
import React, { ReactNode } from 'react';

interface AsyncMessageContainerProps {
  /**
   * Messages and response
   */
  children: ReactNode;
  /**
   * Container title
   */
  title?: string;
  /**
   * Status or timestamp
   */
  status?: string;
  /**
   * Additional class names
   */
  className?: string;
}

export const AsyncMessageContainer: React.FC<AsyncMessageContainerProps> = ({
  children,
  title,
  status,
  className = '',
}) => {
  return (
    <div className={`border border-neutral-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
      {(title || status) && (
        <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
          {title && <h3 className="font-medium text-neutral-900">{title}</h3>}
          {status && <span className="text-sm text-neutral-500">{status}</span>}
        </div>
      )}
      
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};