/**
 * AudioDemo component
 * Demonstrates an audio call interface
 */
import React, { useState, useEffect } from 'react';
import { AudioCallContainer } from './AudioCallContainer';

export const AudioDemo: React.FC = () => {
  // State for call status and controls
  const [callState, setCallState] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState<boolean>(false);
  
  // Simulate call connection and duration
  useEffect(() => {
    // Simulate connecting delay
    const connectionTimer = setTimeout(() => {
      if (callState === 'connecting') {
        setCallState('connected');
      }
    }, 2000);
    
    // Set up duration timer
    let durationInterval: NodeJS.Timeout | null = null;
    
    if (callState === 'connected') {
      durationInterval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      clearTimeout(connectionTimer);
      if (durationInterval) clearInterval(durationInterval);
    };
  }, [callState]);
  
  // Format call duration for display
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Get status text based on call state
  const getStatusText = (): string => {
    if (callState === 'connecting') {
      return 'Connecting...';
    } else if (callState === 'connected') {
      return formatDuration(duration);
    } else {
      return 'Call ended';
    }
  };
  
  // End call handler
  const handleEndCall = () => {
    setCallState('ended');
    
    // Reset after 2 seconds
    setTimeout(() => {
      setCallState('connecting');
      setDuration(0);
      setIsMuted(false);
      setIsSpeakerOn(false);
    }, 2000);
  };
  
  // Toggle mute
  const handleToggleMute = () => {
    if (callState === 'connected') {
      setIsMuted(prev => !prev);
    }
  };
  
  // Toggle speaker
  const handleToggleSpeaker = () => {
    if (callState === 'connected') {
      setIsSpeakerOn(prev => !prev);
    }
  };
  
  return (
    <div className="w-full h-[500px] border border-neutral-200 rounded-lg">
      <AudioCallContainer
        name="Maria Schmidt"
        status={getStatusText()}
        isMuted={isMuted}
        isSpeakerOn={isSpeakerOn}
        onToggleMute={handleToggleMute}
        onToggleSpeaker={handleToggleSpeaker}
        onEndCall={handleEndCall}
      />
    </div>
  );
};