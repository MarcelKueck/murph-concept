/**
 * NavItem component
 * Used in sidebar and navigation components
 */
import React, { ReactNode } from 'react';
import Link from 'next/link';

interface NavItemProps {
  /**
   * Link href
   */
  href: string;
  /**
   * Nav item label
   */
  label: string;
  /**
   * Optional icon
   */
  icon?: ReactNode;
  /**
   * Active state
   */
  isActive?: boolean;
  /**
   * Notification count
   */
  notificationCount?: number;
  /**
   * Additional class names
   */
  className?: string;
}

export const NavItem: React.FC<NavItemProps> = ({
  href,
  label,
  icon,
  isActive = false,
  notificationCount,
  className = '',
}) => {
  // Active/inactive state
  const stateStyles = isActive
    ? 'bg-primary-50 text-primary-700 font-medium'
    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900';
  
  return (
    <Link href={href} className={`group flex items-center px-3 py-2 text-sm rounded-md transition ${stateStyles} ${className}`}>
      {icon && (
        <span className={`mr-3 flex-shrink-0 ${isActive ? 'text-primary-500' : 'text-neutral-400 group-hover:text-neutral-500'}`}>
          {icon}
        </span>
      )}
      <span className="flex-1">{label}</span>
      {notificationCount !== undefined && notificationCount > 0 && (
        <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
          {notificationCount}
        </span>
      )}
    </Link>
  );
};