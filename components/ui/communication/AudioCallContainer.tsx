/**
 * AudioCallContainer component
 * Container for an audio call interface
 */
import React, { ReactNode } from 'react';

interface AudioCallContainerProps {
  /**
   * Avatar URL or component
   */
  avatar?: string | ReactNode;
  /**
   * Call recipient name
   */
  name: string;
  /**
   * Call status or duration
   */
  status: string;
  /**
   * Call controls
   */
  controls?: ReactNode;
  /**
   * Additional class names
   */
  className?: string;
}

export const AudioCallContainer: React.FC<AudioCallContainerProps> = ({
  avatar,
  name,
  status,
  controls,
  className = '',
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center bg-neutral-100 rounded-lg p-6 ${className}`}>
      {/* Avatar */}
      <div className="relative mb-6">
        {typeof avatar === 'string' ? (
          <img
            src={avatar}
            alt={name}
            className="h-32 w-32 rounded-full animate-pulse"
          />
        ) : avatar ? (
          <div className="animate-pulse">{avatar}</div>
        ) : (
          <div className="h-32 w-32 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-4xl font-semibold animate-pulse">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        
        {/* Pulsing rings */}
        <div className="absolute inset-0 rounded-full border-4 border-primary-200 animate-ping opacity-75"></div>
      </div>
      
      {/* Name and Status */}
      <h2 className="text-xl font-semibold text-neutral-900 mb-2">{name}</h2>
      <p className="text-neutral-500 mb-8">{status}</p>
      
      {/* Controls */}
      {controls && (
        <div className="flex items-center justify-center space-x-4">
          {controls}
        </div>
      )}
    </div>
  );
};