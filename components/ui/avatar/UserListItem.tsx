/**
 * UserListItem component
 * List item for user selection/display
 */
import React, { ReactNode } from 'react';
import { Avatar } from './Avatar';

interface UserListItemProps {
  /**
   * User's name
   */
  name: string;
  /**
   * User's role or additional info
   */
  info?: string;
  /**
   * Avatar image URL
   */
  avatarSrc?: string;
  /**
   * Whether the user is selected
   */
  selected?: boolean;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Optional secondary action (button, etc)
   */
  action?: ReactNode;
  /**
   * Additional class names
   */
  className?: string;
}

export const UserListItem: React.FC<UserListItemProps> = ({
  name,
  info,
  avatarSrc,
  selected = false,
  onClick,
  action,
  className = '',
}) => {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 ${
        selected
          ? 'bg-primary-50 border-l-4 border-primary-500'
          : 'border-l-4 border-transparent hover:bg-neutral-50'
      } cursor-pointer transition ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <Avatar name={name} src={avatarSrc} size="sm" />
        <div className="ml-3">
          <p className="text-sm font-medium text-neutral-900">{name}</p>
          {info && (
            <p className="text-xs text-neutral-500">{info}</p>
          )}
        </div>
      </div>
      
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
};