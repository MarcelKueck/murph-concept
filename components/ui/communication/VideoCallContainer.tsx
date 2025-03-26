/**
 * Enhanced VideoCallContainer component
 * Container for a video call interface with full controls
 */
import React, { useState, ReactNode } from 'react';
import { VideoCallButton } from './VideoCallButton';

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
   * Call status
   */
  status?: 'connecting' | 'connected' | 'disconnected';
  /**
   * Duration of the call in seconds
   */
  duration?: number;
  /**
   * Call quality indicator (0-100)
   */
  callQuality?: number;
  /**
   * Whether user's mic is muted
   */
  isMuted?: boolean;
  /**
   * Whether user's camera is off
   */
  isCameraOff?: boolean;
  /**
   * Whether screen is being shared
   */
  isScreenSharing?: boolean;
  /**
   * Toggle mute callback
   */
  onToggleMute?: () => void;
  /**
   * Toggle camera callback
   */
  onToggleCamera?: () => void;
  /**
   * Toggle screen sharing callback
   */
  onToggleScreenShare?: () => void;
  /**
   * End call callback
   */
  onEndCall?: () => void;
  /**
   * Additional class names
   */
  className?: string;
}

export const VideoCallContainer: React.FC<VideoCallContainerProps> = ({
  primaryVideo,
  selfVideo,
  status = 'connected',
  duration = 0,
  callQuality = 100,
  isMuted = false,
  isCameraOff = false,
  isScreenSharing = false,
  onToggleMute,
  onToggleCamera,
  onToggleScreenShare,
  onEndCall,
  className = '',
}) => {
  // Format duration as MM:SS
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Determine call quality indicator
  const getCallQualityIndicator = () => {
    if (callQuality >= 80) {
      return (
        <div className="flex items-center text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.414 1.414 5 5 0 010-7.07 1 1 0 011.414 0zm4.242 0a1 1 0 011.414 0 5 5 0 010 7.072 1 1 0 01-1.414-1.414 3 3 0 000-4.242 1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="text-xs">Excellent</span>
        </div>
      );
    } else if (callQuality >= 50) {
      return (
        <div className="flex items-center text-yellow-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.414 1.414 5 5 0 010-7.07 1 1 0 011.414 0zm4.242 0a1 1 0 011.414 0 5 5 0 010 7.072 1 1 0 01-1.414-1.414 3 3 0 000-4.242 1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="text-xs">Good</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="text-xs">Poor</span>
        </div>
      );
    }
  };

  return (
    <div className={`relative w-full h-full bg-neutral-900 rounded-lg overflow-hidden ${className}`}>
      {/* Primary Video */}
      <div className="w-full h-full">
        {primaryVideo}
      </div>
      
      {/* Self Video */}
      {selfVideo && (
        <div className="absolute bottom-20 right-4 w-1/4 max-w-xs rounded-lg overflow-hidden shadow-lg border-2 border-white cursor-move">
          {selfVideo}
        </div>
      )}
      
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center">
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
        
        <div className="flex items-center space-x-4">
          {getCallQualityIndicator()}
          
          <div className="text-white text-sm">
            {formatDuration(duration)}
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-full p-2">
          <VideoCallButton
            icon={
              isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
              )
            }
            onClick={onToggleMute}
            label={isMuted ? "Unmute" : "Mute"}
            isActive={!isMuted}
          />
          
          <VideoCallButton
            icon={
              isCameraOff ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  <path d="M14 6a2 2 0 012-2h.5a2 2 0 012 2v8a2 2 0 01-2 2H16a2 2 0 01-2-2V6z" />
                </svg>
              )
            }
            onClick={onToggleCamera}
            label={isCameraOff ? "Turn Camera On" : "Turn Camera Off"}
            isActive={!isCameraOff}
          />
          
          <VideoCallButton
            icon={
              isScreenSharing ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              )
            }
            onClick={onToggleScreenShare}
            label={isScreenSharing ? "Stop Sharing" : "Share Screen"}
            isActive={!isScreenSharing}
          />
          
          <VideoCallButton
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zm12.73-1.41A8 8 0 104.34 4.34a8 8 0 0011.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            }
            onClick={() => {}}
            label="Call Info"
            isActive={true}
          />
          
          <VideoCallButton
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            }
            onClick={onEndCall}
            label="End Call"
            isEndCall={true}
          />
        </div>
      </div>
    </div>
  );
};