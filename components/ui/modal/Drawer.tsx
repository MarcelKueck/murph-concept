/**
 * Drawer component
 * Side panel that slides in from the edge of the screen
 */
import React, { ReactNode, useRef, useEffect } from 'react';

interface DrawerProps {
  /**
   * Drawer content
   */
  children: ReactNode;
  /**
   * Whether the drawer is open
   */
  isOpen: boolean;
  /**
   * Handler to close the drawer
   */
  onClose: () => void;
  /**
   * Position of the drawer
   */
  position?: 'left' | 'right';
  /**
   * Drawer title
   */
  title?: string;
  /**
   * Whether to show the close button
   */
  showCloseButton?: boolean;
  /**
   * Whether the drawer can be closed by clicking the backdrop
   */
  closeOnBackdropClick?: boolean;
  /**
   * Whether the drawer can be closed by pressing Escape
   */
  closeOnEscape?: boolean;
  /**
   * Width of the drawer on desktop
   */
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  /**
   * Additional class names for the drawer container
   */
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  isOpen,
  onClose,
  position = 'right',
  title,
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  width = 'md',
  className = '',
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  
  // Focus trap inside drawer
  useEffect(() => {
    if (!isOpen) return;
    
    const focusableElements = drawerRef.current?.querySelectorAll(
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
  
  // Prevent page scrolling when drawer is open
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
  
  // Width classes
  const widthClasses = {
    xs: 'w-full sm:max-w-xs',
    sm: 'w-full sm:max-w-sm',
    md: 'w-full sm:max-w-md',
    lg: 'w-full sm:max-w-lg',
    xl: 'w-full sm:max-w-xl',
    '2xl': 'w-full sm:max-w-2xl',
    '3xl': 'w-full sm:max-w-3xl',
  };
  
  // Position classes
  const positionClasses = {
    left: 'left-0',
    right: 'right-0',
  };
    
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/25 backdrop-blur-sm transition-opacity"
        onClick={closeOnBackdropClick ? onClose : undefined}
      />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="fixed inset-y-0 flex max-w-full">
          {/* Drawer panel */}
          <div 
            ref={drawerRef}
            className={`${positionClasses[position]} ${widthClasses[width]} transform transition ease-in-out duration-300 translate-x-0 h-full flex flex-col bg-white shadow-xl ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
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
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};