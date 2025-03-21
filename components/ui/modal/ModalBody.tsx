/**
 * ModalBody component
 * Content container for the modal body
 */
import React, { ReactNode } from 'react';

export const ModalBody: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};