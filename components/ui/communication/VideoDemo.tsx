/**
 * VideoDemo component
 * Demonstrates a video call interface with mock video feeds
 */
import React, { useState, useEffect } from 'react';
import { VideoCallContainer } from './VideoCallContainer';

export const VideoDemo: React.FC = () => {
  // State for call status and features
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [duration, setDuration] = useState<number>(0);
  const [callQuality, setCallQuality] = useState<number>(100);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCameraOff, setIsCameraOff] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  
  // Simulate connecting and call duration
  useEffect(() => {
    // Simulate connecting delay
    const connectionTimer = setTimeout(() => {
      setStatus('connected');
    }, 2000);
    
    // Set up duration timer
    const durationInterval = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
    
    // Set up random quality fluctuations
    const qualityInterval = setInterval(() => {
      // Random quality between 60 and 100
      setCallQuality(Math.floor(Math.random() * 40) + 60);
    }, 5000);
    
    return () => {
      clearTimeout(connectionTimer);
      clearInterval(durationInterval);
      clearInterval(qualityInterval);
    };
  }, []);
  
  // Simulate call ending
  const handleEndCall = () => {
    setStatus('disconnected');
    
    // Reset after 2 seconds
    setTimeout(() => {
      setStatus('connecting');
      setDuration(0);
      setIsMuted(false);
      setIsCameraOff(false);
      setIsScreenSharing(false);
      
      // Reconnect after reset
      setTimeout(() => {
        setStatus('connected');
      }, 2000);
    }, 2000);
  };
  
  // Toggle mic mute
  const handleToggleMute = () => {
    setIsMuted(prev => !prev);
  };
  
  // Toggle camera
  const handleToggleCamera = () => {
    setIsCameraOff(prev => !prev);
  };
  
  // Toggle screen sharing
  const handleToggleScreenShare = () => {
    setIsScreenSharing(prev => !prev);
  };
  
  // Mock video feeds using gradients and animations
  const PrimaryVideoFeed = () => (
    <div 
      className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-700 flex items-center justify-center relative overflow-hidden"
    >
      {status === 'connected' && !isScreenSharing && !isCameraOff ? (
        // Animated background to simulate video
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white opacity-30"
                style={{
                  width: `${Math.random() * 200 + 50}px`,
                  height: `${Math.random() * 200 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 10 + 5}s`,
                  animationDelay: `${Math.random() * 5}s`,
                  animation: 'pulse 10s infinite'
                }}
              />
            ))}
          </div>
          
          <div className="absolute bottom-[10%] w-full text-center">
            <div className="text-white font-light text-2xl">Dr. Julia Müller</div>
          </div>
        </div>
      ) : status === 'connected' && isScreenSharing ? (
        // Screen sharing view
        <div className="absolute inset-0 bg-white p-4">
          <div className="h-full w-full border border-gray-300 rounded-lg bg-gray-50 flex flex-col">
            <div className="h-12 border-b border-gray-300 bg-gray-100 flex items-center px-4">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <div className="ml-4 text-gray-700">Presentation - Lab Results.pptx</div>
            </div>
            <div className="flex-1 p-6 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-gray-800 mb-4">Understanding Your Blood Test Results</div>
              <div className="w-3/4 h-2 bg-gray-200 rounded-full mb-8"></div>
              <div className="w-2/3 h-32 bg-gray-200 rounded-lg mb-6"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded-full mb-2"></div>
              <div className="w-2/5 h-4 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      ) : status === 'connected' && isCameraOff ? (
        // Camera off view
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-32 rounded-full bg-gray-700 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="absolute bottom-[10%] w-full text-center">
            <div className="text-white font-light text-2xl">Dr. Julia Müller</div>
            <div className="text-gray-300 text-lg">Camera is off</div>
          </div>
        </div>
      ) : status === 'connecting' ? (
        // Connecting view
        <div className="text-white text-xl flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Connecting to Dr. Julia Müller...
        </div>
      ) : (
        // Disconnected view
        <div className="text-white text-xl">
          Call ended
        </div>
      )}
    </div>
  );
  
  const SelfVideoFeed = () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
      {!isCameraOff ? (
        // Mock self video feed
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white opacity-30"
                style={{
                  width: `${Math.random() * 100 + 20}px`,
                  height: `${Math.random() * 100 + 20}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 8 + 3}s`,
                  animationDelay: `${Math.random() * 3}s`,
                  animation: 'pulse 8s infinite'
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        // Camera off view
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      )}
      
      {isMuted && (
        <div className="absolute bottom-2 right-2 bg-red-500 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
  
  return (
    <div className="w-full h-[600px]">
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
          100% { transform: scale(1); opacity: 0.3; }
        }
      `}</style>
      
      <VideoCallContainer
        primaryVideo={<PrimaryVideoFeed />}
        selfVideo={<SelfVideoFeed />}
        status={status}
        duration={duration}
        callQuality={callQuality}
        isMuted={isMuted}
        isCameraOff={isCameraOff}
        isScreenSharing={isScreenSharing}
        onToggleMute={handleToggleMute}
        onToggleCamera={handleToggleCamera}
        onToggleScreenShare={handleToggleScreenShare}
        onEndCall={handleEndCall}
      />
    </div>
  );
};