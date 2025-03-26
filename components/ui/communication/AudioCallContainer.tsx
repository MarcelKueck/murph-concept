/**
 * Enhanced AudioCallContainer component
 * Container for an audio call interface with full controls
 */
import React, { ReactNode } from 'react';
import { VideoCallButton } from './VideoCallButton';

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
   * Whether user's mic is muted
   */
  isMuted?: boolean;
  /**
   * Whether call is on speaker
   */
  isSpeakerOn?: boolean;
  /**
   * Toggle mute callback
   */
  onToggleMute?: () => void;
  /**
   * Toggle speaker callback
   */
  onToggleSpeaker?: () => void;
  /**
   * End call callback
   */
  onEndCall?: () => void;
  /**
   * Additional class names
   */
  className?: string;
}

export const AudioCallContainer: React.FC<AudioCallContainerProps> = ({
  avatar,
  name,
  status,
  isMuted = false,
  isSpeakerOn = false,
  onToggleMute,
  onToggleSpeaker,
  onEndCall,
  className = '',
}) => {
  // Audio levels visualization (mock)
  const AudioLevels = () => (
    <div className="flex justify-center items-end h-12 w-40 space-x-1 mt-4 mb-6">
      {Array.from({ length: 12 }).map((_, i) => {
        // Calculate a height between 20% and 100% based on index
        // Center bars are taller, edges are shorter
        const heightPercent = 20 + Math.sin(Math.PI * (i / 11)) * 80;
        
        return (
          <div 
            key={i}
            className="bg-primary-300 rounded-t w-2"
            style={{ 
              height: `${heightPercent}%`,
              animation: `audioBar ${0.8 + Math.random() * 0.4}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.08}s`
            }}
          />
        );
      })}
    </div>
  );
  
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center bg-neutral-50 rounded-lg p-6 ${className}`}>
      <style jsx global>{`
        @keyframes audioBar {
          0% { height: 20%; }
          100% { height: 100%; }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
      
      {/* Status indicator */}
      <div className="mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <span className="w-2 h-2 mr-2 rounded-full bg-green-500"></span>
          {status}
        </span>
      </div>
      
      {/* Avatar */}
      <div className="relative mb-6">
        {typeof avatar === 'string' ? (
          <div className="relative">
            <img
              src={avatar}
              alt={name}
              className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
              style={{ animation: 'pulse 2s infinite' }}
            />
            <div className="absolute inset-0 rounded-full border-4 border-primary-200 animate-ping opacity-75"></div>
          </div>
        ) : avatar ? (
          <div className="animate-pulse">{avatar}</div>
        ) : (
          <div className="relative">
            <div 
              className="h-32 w-32 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-4xl font-semibold shadow-lg border-4 border-white"
              style={{ animation: 'pulse 2s infinite' }}
            >
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-primary-200 animate-ping opacity-75"></div>
          </div>
        )}
      </div>
      
      {/* Name and audio visualization */}
      <h2 className="text-xl font-semibold text-neutral-900 mb-2">{name}</h2>
      <AudioLevels />
      
      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 mt-4">
        <VideoCallButton
          icon={
            isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006.93 7V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            )
          }
          onClick={onToggleMute}
          label={isMuted ? "Unmute" : "Mute"}
          isActive={!isMuted}
        />
        
        <VideoCallButton
          icon={
            isSpeakerOn ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
              </svg>
            )
          }
          onClick={onToggleSpeaker}
          label={isSpeakerOn ? "Speaker Off" : "Speaker On"}
          isActive={isSpeakerOn}
        />
        
        <VideoCallButton
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          }
          onClick={() => {}}
          label="Keypad"
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
  );
};