/**
 * TabNavigation component
 */
import React from 'react';

interface TabProps {
  /**
   * Tab id
   */
  id: string;
  /**
   * Tab label
   */
  label: string;
  /**
   * Optional badge count
   */
  badgeCount?: number;
  /**
   * Tab is disabled
   */
  disabled?: boolean;
}

interface TabNavigationProps {
  /**
   * Tabs configuration
   */
  tabs: TabProps[];
  /**
   * Active tab id
   */
  activeTab: string;
  /**
   * Tab change handler
   */
  onChange: (tabId: string) => void;
  /**
   * Additional class names
   */
  className?: string;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`border-b border-neutral-200 ${className}`}>
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isDisabled = tab.disabled;
          
          let tabClasses = 'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm';
          
          if (isActive) {
            tabClasses += ' border-primary-500 text-primary-700';
          } else if (isDisabled) {
            tabClasses += ' border-transparent text-neutral-400 cursor-not-allowed';
          } else {
            tabClasses += ' border-transparent text-neutral-600 hover:text-primary-600 hover:border-primary-300';
          }
          
          return (
            <button
              key={tab.id}
              onClick={() => !isDisabled && onChange(tab.id)}
              disabled={isDisabled}
              className={tabClasses}
              type="button"
            >
              {tab.label}
              {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {tab.badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
