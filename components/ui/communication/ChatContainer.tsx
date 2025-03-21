/**
 * ChatContainer component
 * Container for a chat conversation
 */
import React, { ReactNode } from 'react';

interface ChatContainerProps {
  /**
   * Chat messages and input
   */
  children: ReactNode;
  /**
   * Title or header content
   */
  header?: ReactNode;
  /**
   * Additional content for the footer (beyond the input)
   */
  footer?: ReactNode;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Additional class names
   */
  className?: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  children,
  header,
  footer,
  loading = false,
  className = '',
}) => {
  return (
    <div className={`flex flex-col h-full bg-white border border-neutral-200 rounded-lg shadow-sm ${className}`}>
      {header && (
        <div className="px-4 py-3 border-b border-neutral-200 flex items-center">
          {header}
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <svg className="animate-spin h-6 w-6 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          children
        )}
      </div>
      
      {footer && (
        <div className="p-4 border-t border-neutral-200">
          {footer}
        </div>
      )}
    </div>
  );
};