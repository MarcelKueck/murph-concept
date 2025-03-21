/**
 * Sidebar component for application navigation
 */
import React, { ReactNode } from 'react';
import { NavItem } from './NavItem';

interface SidebarProps {
  /**
   * Navigation sections
   */
  sections: {
    title?: string;
    items: {
      href: string;
      label: string;
      icon?: ReactNode;
      isActive?: boolean;
      notificationCount?: number;
    }[];
  }[];
  /**
   * Additional class names
   */
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  className = '',
}) => {
  return (
    <nav className={`bg-white w-64 h-full flex-shrink-0 border-r border-neutral-200 ${className}`}>
      <div className="h-full flex flex-col overflow-y-auto py-4">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="px-3 mt-2 first:mt-0">
            {section.title && (
              <h3 className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
            )}
            
            <div className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <NavItem
                  key={itemIndex}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  isActive={item.isActive}
                  notificationCount={item.notificationCount}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};