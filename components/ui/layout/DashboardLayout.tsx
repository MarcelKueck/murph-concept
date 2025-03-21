/**
 * DashboardLayout component
 * Layout for dashboard pages with sidebar navigation
 */
import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
  /**
   * Main content
   */
  children: ReactNode;
  /**
   * Sidebar content
   */
  sidebar: ReactNode;
  /**
   * Header content
   */
  header?: ReactNode;
  /**
   * Whether the sidebar is collapsed
   */
  sidebarCollapsed?: boolean;
  /**
   * Toggle sidebar collapsed state
   */
  onToggleSidebar?: () => void;
  /**
   * Additional class names
   */
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebar,
  header,
  sidebarCollapsed = false,
  onToggleSidebar,
  className = '',
}) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {header && (
        <header className="sticky top-0 z-10 bg-white border-b border-neutral-200 shadow-sm">
          {header}
        </header>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        <aside className={`bg-white border-r border-neutral-200 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}>
          {sidebar}
          
          {onToggleSidebar && (
            <button
              className="absolute left-0 bottom-4 w-full flex justify-center text-neutral-500 hover:text-neutral-700 transition"
              onClick={onToggleSidebar}
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </button>
          )}
        </aside>
        
        <main className="flex-1 overflow-y-auto bg-neutral-50">
          {children}
        </main>
      </div>
    </div>
  );
};