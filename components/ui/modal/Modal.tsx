/**
 * Modal and Dialog Components
 */
import React, { ReactNode, useRef, useEffect } from 'react';

/**
 * Modal component
 * Used for displaying modal dialogs with a backdrop
 */
interface ModalProps {
  /**
   * Modal content
   */
  children: ReactNode;
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  /**
   * Handler to close the modal
   */
  onClose: () => void;
  /**
   * Modal title (optional)
   */
  title?: string;
  /**
   * Whether to show the close button in the corner
   */
  showCloseButton?: boolean;
  /**
   * Whether the modal can be closed by clicking the backdrop
   */
  closeOnBackdropClick?: boolean;
  /**
   * Whether the modal can be closed by pressing Escape
   */
  closeOnEscape?: boolean;
  /**
   * Maximum width of the modal
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  /**
   * Additional class names for the content container
   */
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  maxWidth = 'md',
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Focus trap inside modal
  useEffect(() => {
    if (!isOpen) return;
    
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    
    if (focusableElements && focusableElements.length > 0) {
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      firstElement.focus();
      
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };
      
      document.addEventListener('keydown', handleTabKey);
      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [isOpen]);
  
  // Close on escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose, closeOnEscape]);
  
  // Prevent page scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  // Max width classes
  const maxWidthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    full: 'max-w-full',
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/25 backdrop-blur-sm transition-opacity"
        onClick={closeOnBackdropClick ? onClose : undefined}
      />
      
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Modal content */}
        <div 
          ref={modalRef}
          className={`w-full ${maxWidthClasses[maxWidth]} transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
              {showCloseButton && (
                <button
                  type="button"
                  className="text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-200 rounded-full p-1"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};