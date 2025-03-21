/**
 * ModalFooter component
 * Content container for the modal footer
 */
import React, { ReactNode } from 'react';

export const ModalFooter: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`px-6 py-4 border-t border-neutral-200 flex justify-end space-x-2 ${className}`}>
      {children}
    </div>
  );
};