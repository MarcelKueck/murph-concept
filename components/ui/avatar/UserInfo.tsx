/**
 * UserInfo component
 * Displays user information with avatar
 */
import React from 'react';
import { Avatar } from './Avatar';

interface UserInfoProps {
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
   * Avatar size
   */
  avatarSize?: 'sm' | 'md' | 'lg';
  /**
   * Online status
   */
  status?: 'online' | 'busy' | 'away' | 'offline';
  /**
   * Additional class names
   */
  className?: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  name,
  info,
  avatarSrc,
  avatarSize = 'md',
  status,
  className = '',
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Avatar
        name={name}
        src={avatarSrc}
        size={avatarSize}
        status={status}
      />
      <div className="ml-3">
        <p className="text-sm font-medium text-neutral-900">{name}</p>
        {info && (
          <p className="text-xs text-neutral-500">{info}</p>
        )}
      </div>
    </div>
  );
};