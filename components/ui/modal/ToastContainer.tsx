/**
 * ToastContainer component
 * Container for displaying multiple toasts
 */
import React, { ReactNode } from 'react';

interface ToastContainerProps {
  /**
   * Array of toast elements
   */
  children: ReactNode;
  /**
   * Position of the toast container
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  /**
   * Additional class names
   */
  className?: string;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  children,
  position = 'top-right',
  className = '',
}) => {
  // Position classes
  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-center': 'top-0 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-0 left-1/2 transform -translate-x-1/2',
  };
  
  return (
    <div className={`fixed z-50 p-4 pointer-events-none flex flex-col space-y-4 ${positionClasses[position]} ${className}`}>
      {children}
    </div>
  );
};