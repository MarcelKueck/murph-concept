/**
 * VideoCallButton component
 * Control button for video calls
 */
import React, { ReactNode } from 'react';

interface VideoCallButtonProps {
  /**
   * Button icon
   */
  icon: ReactNode;
  /**
   * Click handler
   */
  onClick: () => void;
  /**
   * Button label (for screen readers)
   */
  label: string;
  /**
   * Whether the feature is active (e.g., mic on)
   */
  isActive?: boolean;
  /**
   * Whether this is the "end call" button
   */
  isEndCall?: boolean;
  /**
   * Additional class names
   */
  className?: string;
}

export const VideoCallButton: React.FC<VideoCallButtonProps> = ({
  icon,
  onClick,
  label,
  isActive = true,
  isEndCall = false,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`w-10 h-10 mx-1 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
        isEndCall
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : isActive
          ? 'bg-white/10 hover:bg-white/20 text-white'
          : 'bg-neutral-700 text-neutral-300'
      } ${className}`}
    >
      {icon}
    </button>
  );
};