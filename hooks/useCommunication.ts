/**
 * Hook for managing communication state in consultations
 */
import { useState, useEffect, useCallback } from 'react';

type CommunicationChannel = 'video' | 'audio' | 'text' | 'async';
type CommunicationStatus = 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';

interface UseCommunicationProps {
  /**
   * Consultation ID
   */
  consultationId: string;
  /**
   * Preferred communication channel
   */
  preferredChannel: CommunicationChannel;
  /**
   * Consultation status
   */
  consultationStatus: 'REQUESTED' | 'ASSIGNED' | 'SCHEDULED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  /**
   * Optional initial channel
   */
  initialChannel?: CommunicationChannel;
}

interface UseCommunicationReturn {
  /**
   * Current active communication channel
   */
  activeChannel: CommunicationChannel;
  /**
   * Change the active communication channel
   */
  setActiveChannel: (channel: CommunicationChannel) => void;
  /**
   * Current status of the communication channel
   */
  channelStatus: CommunicationStatus;
  /**
   * Duration of the current call in seconds (for video/audio)
   */
  callDuration: number;
  /**
   * Quality of the current call (0-100)
   */
  callQuality: number;
  /**
   * Whether audio is muted
   */
  isMuted: boolean;
  /**
   * Toggle audio mute
   */
  toggleMute: () => void;
  /**
   * Whether camera is off
   */
  isCameraOff: boolean;
  /**
   * Toggle camera
   */
  toggleCamera: () => void;
  /**
   * Whether screen is being shared
   */
  isScreenSharing: boolean;
  /**
   * Toggle screen sharing
   */
  toggleScreenSharing: () => void;
  /**
   * Whether speaker is on (for audio call)
   */
  isSpeakerOn: boolean;
  /**
   * Toggle speaker
   */
  toggleSpeaker: () => void;
  /**
   * Start a call (video or audio)
   */
  startCall: () => void;
  /**
   * End the current call
   */
  endCall: () => void;
  /**
   * Error message if channel status is 'error'
   */
  errorMessage: string | null;
}

/**
 * Hook for managing communication in consultations
 */
export const useCommunication = ({
  consultationId,
  preferredChannel,
  consultationStatus,
  initialChannel,
}: UseCommunicationProps): UseCommunicationReturn => {
  // Active communication channel
  const [activeChannel, setActiveChannel] = useState<CommunicationChannel>(
    initialChannel || preferredChannel
  );
  // Status of the current channel
  const [channelStatus, setChannelStatus] = useState<CommunicationStatus>('idle');
  // Call duration in seconds
  const [callDuration, setCallDuration] = useState<number>(0);
  // Call quality indicator (0-100)
  const [callQuality, setCallQuality] = useState<number>(100);
  // Audio muted state
  const [isMuted, setIsMuted] = useState<boolean>(false);
  // Camera off state
  const [isCameraOff, setIsCameraOff] = useState<boolean>(false);
  // Screen sharing state
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  // Speaker state (for audio calls)
  const [isSpeakerOn, setIsSpeakerOn] = useState<boolean>(false);
  // Error message
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Timer for call duration
  const [durationTimer, setDurationTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Initialize based on consultation status
  useEffect(() => {
    // Reset to preferred channel when props change
    if (initialChannel) {
      setActiveChannel(initialChannel);
    } else {
      setActiveChannel(preferredChannel);
    }
    
    // Reset state if consultation isn't in progress
    if (consultationStatus !== 'IN_PROGRESS') {
      setChannelStatus('idle');
      setCallDuration(0);
      setIsMuted(false);
      setIsCameraOff(false);
      setIsScreenSharing(false);
      setIsSpeakerOn(false);
      setErrorMessage(null);
      
      // Clear any existing timers
      if (durationTimer) {
        clearInterval(durationTimer);
        setDurationTimer(null);
      }
    }
  }, [consultationId, preferredChannel, consultationStatus, initialChannel]);
  
  // Change active channel
  const changeActiveChannel = useCallback((channel: CommunicationChannel) => {
    // End any active call before switching channels
    if ((activeChannel === 'video' || activeChannel === 'audio') && 
        channelStatus === 'connected') {
      endCall();
    }
    
    setActiveChannel(channel);
    setChannelStatus('idle');
  }, [activeChannel, channelStatus]);
  
  // Toggle mute
  const toggleMute = useCallback(() => {
    if (channelStatus === 'connected') {
      setIsMuted(prev => !prev);
    }
  }, [channelStatus]);
  
  // Toggle camera
  const toggleCamera = useCallback(() => {
    if (channelStatus === 'connected') {
      setIsCameraOff(prev => !prev);
    }
  }, [channelStatus]);
  
  // Toggle screen sharing
  const toggleScreenSharing = useCallback(() => {
    if (channelStatus === 'connected') {
      setIsScreenSharing(prev => !prev);
    }
  }, [channelStatus]);
  
  // Toggle speaker
  const toggleSpeaker = useCallback(() => {
    if (channelStatus === 'connected') {
      setIsSpeakerOn(prev => !prev);
    }
  }, [channelStatus]);
  
  // Start a call
  const startCall = useCallback(() => {
    // Only allow starting calls in video or audio channels for IN_PROGRESS consultations
    if ((activeChannel !== 'video' && activeChannel !== 'audio') || 
        consultationStatus !== 'IN_PROGRESS') {
      setErrorMessage('Call can only be started in video or audio channels for in-progress consultations');
      return;
    }
    
    // Set status to connecting
    setChannelStatus('connecting');
    setErrorMessage(null);
    
    // Simulate connection delay
    setTimeout(() => {
      // 10% chance of connection error for simulation
      if (Math.random() < 0.1) {
        setChannelStatus('error');
        setErrorMessage('Failed to establish connection. Please try again.');
        return;
      }
      
      setChannelStatus('connected');
      
      // Start call duration timer
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      
      setDurationTimer(timer);
      
      // Simulate quality fluctuations
      const qualityInterval = setInterval(() => {
        // Random quality between 60 and 100
        setCallQuality(Math.floor(Math.random() * 40) + 60);
      }, 5000);
      
      // Clear interval on component unmount
      return () => {
        clearInterval(timer);
        clearInterval(qualityInterval);
      };
    }, 2000);
  }, [activeChannel, consultationStatus]);
  
  // End a call
  const endCall = useCallback(() => {
    if ((activeChannel === 'video' || activeChannel === 'audio') && 
        (channelStatus === 'connected' || channelStatus === 'connecting')) {
      setChannelStatus('disconnected');
      
      // Clear duration timer
      if (durationTimer) {
        clearInterval(durationTimer);
        setDurationTimer(null);
      }
      
      // Reset to idle after a delay
      setTimeout(() => {
        setChannelStatus('idle');
        setCallDuration(0);
        setIsMuted(false);
        setIsCameraOff(false);
        setIsScreenSharing(false);
        setIsSpeakerOn(false);
      }, 2000);
    }
  }, [activeChannel, channelStatus, durationTimer]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (durationTimer) {
        clearInterval(durationTimer);
      }
    };
  }, [durationTimer]);
  
  return {
    activeChannel,
    setActiveChannel: changeActiveChannel,
    channelStatus,
    callDuration,
    callQuality,
    isMuted,
    toggleMute,
    isCameraOff,
    toggleCamera,
    isScreenSharing,
    toggleScreenSharing,
    isSpeakerOn,
    toggleSpeaker,
    startCall,
    endCall,
    errorMessage,
  };
};