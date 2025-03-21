/**
 * AuthLayout component
 * Layout for authentication pages
 */
import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  /**
   * Main content (form)
   */
  children: ReactNode;
  /**
   * Title displayed on the page
   */
  title: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Logo component or URL
   */
  logo?: ReactNode | string;
  /**
   * Additional class names
   */
  className?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  description,
  logo,
  className = '',
}) => {
  return (
    <div className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-neutral-50 ${className}`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        {logo && (
          <div className="flex justify-center">
            {typeof logo === 'string' ? (
              <img src={logo} alt="Logo" className="h-12 w-auto" />
            ) : (
              logo
            )}
          </div>
        )}
        
        <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900">
          {title}
        </h2>
        
        {description && (
          <p className="mt-2 text-center text-sm text-neutral-600">
            {description}
          </p>
        )}
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
};