/**
 * Breadcrumbs component
 */
import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  /**
   * Link href (optional for current page)
   */
  href?: string;
  /**
   * Page/section label
   */
  label: string;
}

interface BreadcrumbsProps {
  /**
   * Breadcrumb items
   */
  items: BreadcrumbItem[];
  /**
   * Additional class names
   */
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
}) => {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
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
  );
};