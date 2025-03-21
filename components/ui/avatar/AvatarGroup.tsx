/**
 * AvatarGroup component
 * Displays a group of avatars with overlap
 */
import React from 'react';
import { Avatar } from './Avatar';

interface AvatarGroupProps {
  /**
   * Array of avatar props
   */
  avatars: Array<{
    name: string;
    src?: string;
    status?: 'online' | 'busy' | 'away' | 'offline';
  }>;
  /**
   * Maximum number of avatars to display
   */
  max?: number;
  /**
   * Avatar size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Additional class names
   */
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 3,
  size = 'md',
  className = '',
}) => {
  // If there are more avatars than the max, we'll show a "+X" avatar
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;
  
  // Size classes for the counter avatar
  const counterSizeClasses = {
    'xs': 'h-6 w-6 text-xs',
    'sm': 'h-8 w-8 text-xs',
    'md': 'h-10 w-10 text-sm',
    'lg': 'h-12 w-12 text-base',
    'xl': 'h-16 w-16 text-lg',
  };
  
  return (
    <div className={`flex -space-x-2 ${className}`}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          name={avatar.name}
          src={avatar.src}
          status={avatar.status}
          size={size}
          className="ring-2 ring-white"
        />
      ))}
      
      {remainingCount > 0 && (
        <div className={`${counterSizeClasses[size]} flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring-2 ring-white font-medium`}>
          +{remainingCount}
        </div>
      )}
    </div>
  );
};