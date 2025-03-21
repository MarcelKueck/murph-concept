/**
 * VideoCallContainer component
 * Container for a video call interface
 */
import React, { ReactNode } from 'react';

interface VideoCallContainerProps {
  /**
   * Primary video element
   */
  primaryVideo: ReactNode;
  /**
   * Self video element
   */
  selfVideo?: ReactNode;
  /**
   * Call controls
   */
  controls?: ReactNode;
  /**
   * Call status
   */
  status?: 'connecting' | 'connected' | 'disconnected';
  /**
   * Additional class names
   */
  className?: string;
}

export const VideoCallContainer: React.FC<VideoCallContainerProps> = ({
  primaryVideo,
  selfVideo,
  controls,
  status = 'connected',
  className = '',
}) => {
  return (
    <div className={`relative w-full h-full bg-neutral-900 rounded-lg overflow-hidden ${className}`}>
      {/* Primary Video */}
      <div className="w-full h-full">
        {primaryVideo}
      </div>
      
      {/* Self Video */}
      {selfVideo && (
        <div className="absolute bottom-4 right-4 w-1/4 rounded-lg overflow-hidden shadow-lg border-2 border-white">
          {selfVideo}
        </div>
      )}
      
      {/* Status Indicator */}
      <div className="absolute top-4 right-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status === 'connecting' ? 'bg-yellow-100 text-yellow-800' :
          status === 'connected' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${
            status === 'connecting' ? 'bg-yellow-500' :
            status === 'connected' ? 'bg-green-500' :
            'bg-red-500'
          }`} />
          {status === 'connecting' ? 'Connecting...' :
           status === 'connected' ? 'Connected' :
           'Disconnected'}
        </span>
      </div>
      
      {/* Controls */}
      {controls && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-full p-2">
            {controls}
          </div>
        </div>
      )}
    </div>
  );
};