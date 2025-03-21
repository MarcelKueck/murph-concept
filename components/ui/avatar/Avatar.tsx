/**
 * Avatar and User Interface Components
 */
import React from 'react';

/**
 * Avatar component
 * Displays a user avatar with various options
 */
interface AvatarProps {
  /**
   * User name (for fallback and alt text)
   */
  name: string;
  /**
   * Avatar image URL
   */
  src?: string;
  /**
   * Avatar size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Whether to show an online status indicator
   */
  status?: 'online' | 'busy' | 'away' | 'offline';
  /**
   * Avatar shape
   */
  shape?: 'circle' | 'square';
  /**
   * Background color for fallback avatar
   */
  bgColor?: string;
  /**
   * Additional class names
   */
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  status,
  shape = 'circle',
  bgColor = '#1E88E5',
  className = '',
}) => {
  // Size classes
  const sizeClasses = {
    'xs': 'h-6 w-6 text-xs',
    'sm': 'h-8 w-8 text-sm',
    'md': 'h-10 w-10 text-base',
    'lg': 'h-12 w-12 text-lg',
    'xl': 'h-16 w-16 text-xl',
  };
  
  // Status classes
  const statusClasses = {
    'online': 'bg-green-500',
    'busy': 'bg-red-500',
    'away': 'bg-yellow-500',
    'offline': 'bg-neutral-400',
  };
  
  // Shape classes
  const shapeClasses = {
    'circle': 'rounded-full',
    'square': 'rounded-md',
  };
  
  // Get initials from name
  const getInitials = () => {
    const nameParts = name.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    } else {
      return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
    }
  };
  
  return (
    <div className={`relative inline-flex ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeClasses[size]} ${shapeClasses[shape]} object-cover`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} ${shapeClasses[shape]} flex items-center justify-center text-white font-medium`}
          style={{ backgroundColor: bgColor }}
        >
          {getInitials()}
        </div>
      )}
      
      {status && (
        <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${statusClasses[status]}`}></span>
      )}
    </div>
  );
};