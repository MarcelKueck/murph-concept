/**
 * PageHeader component
 * Consistent page header with title and optional actions
 */
import React, { ReactNode } from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  /**
   * Page title
   */
  title: string;
  /**
   * Optional subtitle
   */
  subtitle?: string;
  /**
   * Optional header actions (buttons, etc.)
   */
  actions?: ReactNode;
  /**
   * Optional breadcrumb navigation
   */
  breadcrumbs?: {
    href?: string;
    label: string;
  }[];
  /**
   * Additional class names
   */
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  breadcrumbs,
  className = '',
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex mb-2" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              
              return (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <svg
                      className="flex-shrink-0 h-4 w-4 text-neutral-400 mx-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  
                  {isLast || !item.href ? (
                    <span className={`${isLast ? 'text-neutral-900' : 'text-neutral-600'} text-sm`}>
                      {item.label}
                    </span>
                  ) : (
                    <Link href={item.href} className="text-neutral-600 hover:text-primary-600 text-sm transition">
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-neutral-600">{subtitle}</p>
          )}
        </div>
        
        {actions && (
          <div className="flex space-x-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};