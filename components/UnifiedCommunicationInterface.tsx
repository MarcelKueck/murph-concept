/**
 * Enhanced UnifiedCommunicationInterface component
 * Integrated with useCommunication hook for real functionality
 */
import React, { useState, useEffect } from 'react';
import { Card } from './ui/cards/Card';
import { TabNavigation } from './ui/navigation/TabNavigation';
import { VideoCallContainer } from './ui/communication/VideoCallContainer';
import { AudioCallContainer } from './ui/communication/AudioCallContainer';
import { ConsultationChatContainer } from './patient/consultations/ConsultationChatContainer';
import { MedicalStudentChatContainer } from './medical-student/consultations/MedicalStudentChatContainer';
import { AsyncMessagingDemo } from './ui/communication/AsyncMessagingDemo';
import { Alert } from './ui/modal/Alert';
import Button from './ui/buttons/Button';
import { useCommunication } from '../hooks/useCommunication';

interface UnifiedCommunicationInterfaceProps {
  /**
   * Consultation ID
   */
  consultationId: string;
  /**
   * Consultation status
   */
  status: 'REQUESTED' | 'ASSIGNED' | 'SCHEDULED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  /**
   * Preferred communication channel
   */
  preferredChannel: 'video' | 'audio' | 'text' | 'async';
  /**
   * Whether the current user is the patient (false = medical student)
   */
  isPatient: boolean;
  /**
   * Patient name (for medical student view)
   */
  patientName?: string;
  /**
   * Medical student name (for patient view)
   */
  medicalStudentName?: string;
  /**
   * Additional class names
   */
  className?: string;
}

export const UnifiedCommunicationInterface: React.FC<UnifiedCommunicationInterfaceProps> = ({
  consultationId,
  status,
  preferredChannel,
  isPatient,
  patientName = '',
  medicalStudentName = '',
  className = '',
}) => {
  // Use the communication hook for state management
  const {
    activeChannel,
    setActiveChannel,
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
  } = useCommunication({
    consultationId,
    preferredChannel,
    consultationStatus: status,
    initialChannel: preferredChannel === 'video' || preferredChannel === 'audio' 
      ? (status === 'IN_PROGRESS' ? preferredChannel : 'text') 
      : preferredChannel
  });
  
  // Alert for channel switching
  const [showAlert, setShowAlert] = useState<boolean>(false);
  // Potential new channel when confirming switch
  const [pendingChannel, setPendingChannel] = useState<'video' | 'audio' | null>(null);
  
  // Clear any error messages that might appear
  const [localError, setLocalError] = useState<string | null>(null);
  
  // Show error message when communication hook reports an error
  useEffect(() => {
    if (errorMessage) {
      setLocalError(errorMessage);
    }
  }, [errorMessage]);
  
  // Get available channels based on consultation status
  const getAvailableChannels = () => {
    const channels = [
      { id: 'text', label: 'Text Chat', always: true },
      { id: 'async', label: 'Detailed Message', always: true }
    ];
    
    // Video and audio only available for IN_PROGRESS consultations
    if (status === 'IN_PROGRESS') {
      channels.unshift(
        { id: 'video', label: 'Video Call', always: false },
        { id: 'audio', label: 'Audio Call', always: false }
      );
    }
    
    return channels;
  };
  
  // Handle channel change
  const handleChannelChange = (channelId: string) => {
    // If switching to video or audio, show confirmation alert
    if ((channelId === 'video' || channelId === 'audio') && 
        activeChannel !== channelId && 
        status === 'IN_PROGRESS') {
      setPendingChannel(channelId as 'video' | 'audio');
      setShowAlert(true);
      return;
    }
    
    // If switching between text and async or the consultation is not in progress,
    // no confirmation needed
    setActiveChannel(channelId as any);
  };
  
  // Confirm channel change to video/audio
  const confirmChannelChange = () => {
    if (pendingChannel) {
      setActiveChannel(pendingChannel);
      setShowAlert(false);
      setPendingChannel(null);
      
      // Start call after a short delay
      setTimeout(() => {
        startCall();
      }, 500);
    }
  };
  
  // Determine if communication is available based on status
  const isCommunicationAvailable = ['ASSIGNED', 'SCHEDULED', 'IN_PROGRESS'].includes(status);
  
  // Get title based on active channel
  const getChannelTitle = () => {
    switch (activeChannel) {
      case 'video':
        return 'Video Call';
      case 'audio':
        return 'Audio Call';
      case 'text':
        return 'Text Chat';
      case 'async':
        return 'Detailed Communication';
      default:
        return 'Communication';
    }
  };
  
  // Mock primary/self video components based on channel status
  const PrimaryVideoFeed = () => (
    <div 
      className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-700 flex items-center justify-center relative overflow-hidden"
    >
      {channelStatus === 'connected' && !isScreenSharing && !isCameraOff ? (
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
            <div className="text-white font-light text-2xl">
              {isPatient ? medicalStudentName : patientName}
            </div>
          </div>
        </div>
      ) : channelStatus === 'connected' && isScreenSharing ? (
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
      ) : channelStatus === 'connected' && isCameraOff ? (
        // Camera off view
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-32 rounded-full bg-gray-700 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="absolute bottom-[10%] w-full text-center">
            <div className="text-white font-light text-2xl">
              {isPatient ? medicalStudentName : patientName}
            </div>
            <div className="text-gray-300 text-lg">Camera is off</div>
          </div>
        </div>
      ) : channelStatus === 'connecting' ? (
        // Connecting view
        <div className="text-white text-xl flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Connecting to {isPatient ? medicalStudentName : patientName}...
        </div>
      ) : channelStatus === 'idle' ? (
        // Ready to start call view
        <div className="text-white text-center">
          <div className="text-2xl mb-4">Start a video call</div>
          <Button
            onClick={startCall}
            className="mx-auto"
          >
            Start Call
          </Button>
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
    <Card 
      title={getChannelTitle()}
      className={`h-full min-h-[500px] flex flex-col ${className}`}
    >
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
          100% { transform: scale(1); opacity: 0.3; }
        }
      `}</style>
      
      {showAlert && (
        <Alert
          variant="warning"
          title="Start Call"
          message={`Are you sure you want to start a ${pendingChannel} call? This will initiate a connection with ${isPatient ? medicalStudentName : patientName}.`}
          dismissible
          onDismiss={() => {
            setShowAlert(false);
            setPendingChannel(null);
          }}
          className="mb-4"
        />
      )}
      
      {localError && (
        <Alert
          variant="error"
          message={localError}
          dismissible
          onDismiss={() => setLocalError(null)}
          className="mb-4"
        />
      )}
      
      <div className="mb-4">
        <TabNavigation
          tabs={getAvailableChannels()}
          activeTab={activeChannel}
          onChange={handleChannelChange}
        />
      </div>
      
      {showAlert && (
        <div className="flex justify-end space-x-2 mb-4">
          <Button
            variant="secondary"
            size="small"
            onClick={() => {
              setShowAlert(false);
              setPendingChannel(null);
            }}
          >
            Cancel
          </Button>
          <Button
            size="small"
            onClick={confirmChannelChange}
          >
            Start Call
          </Button>
        </div>
      )}
      
      <div className="flex-1 flex flex-col">
        {activeChannel === 'video' && isCommunicationAvailable && (
          <div className="flex-1">
            <VideoCallContainer
              primaryVideo={<PrimaryVideoFeed />}
              selfVideo={<SelfVideoFeed />}
              status={channelStatus as any}
              duration={callDuration}
              callQuality={callQuality}
              isMuted={isMuted}
              isCameraOff={isCameraOff}
              isScreenSharing={isScreenSharing}
              onToggleMute={toggleMute}
              onToggleCamera={toggleCamera}
              onToggleScreenShare={toggleScreenSharing}
              onEndCall={endCall}
            />
          </div>
        )}
        
        {activeChannel === 'audio' && isCommunicationAvailable && (
          <div className="flex-1">
            <AudioCallContainer
              name={isPatient ? medicalStudentName : patientName}
              status={
                channelStatus === 'idle' 
                  ? 'Ready to Connect' 
                  : channelStatus === 'connecting' 
                  ? 'Connecting...' 
                  : channelStatus === 'connected' 
                  ? `${Math.floor(callDuration / 60)}:${(callDuration % 60).toString().padStart(2, '0')}` 
                  : 'Call Ended'
              }
              isMuted={isMuted}
              isSpeakerOn={isSpeakerOn}
              onToggleMute={toggleMute}
              onToggleSpeaker={toggleSpeaker}
              onEndCall={endCall}
            />
            
            {channelStatus === 'idle' && (
              <div className="mt-4 text-center">
                <Button onClick={startCall}>
                  Start Audio Call
                </Button>
              </div>
            )}
          </div>
        )}
        
        {activeChannel === 'text' && (
          <div className="flex-1">
            {isPatient ? (
              <ConsultationChatContainer 
                consultationId={consultationId}
                status={status}
              />
            ) : (
              <MedicalStudentChatContainer
                consultationId={consultationId}
                status={status}
                patientName={patientName || 'Patient'}
              />
            )}
          </div>
        )}
        
        {activeChannel === 'async' && (
          <div className="flex-1">
            <AsyncMessagingDemo />
          </div>
        )}
        
        {!isCommunicationAvailable && (activeChannel === 'video' || activeChannel === 'audio') && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md">
              <div className="mx-auto h-12 w-12 text-neutral-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                Call functionality not available
              </h3>
              <p className="text-neutral-600 mb-4">
                {status === 'REQUESTED' || status === 'ASSIGNED' 
                  ? 'The consultation has not started yet. You can use text chat or send a detailed message.' 
                  : status === 'RESOLVED' || status === 'CLOSED'
                  ? 'This consultation has ended. You can review the chat history.'
                  : 'Communication channel not available at this time.'}
              </p>
              <Button
                variant="secondary"
                onClick={() => setActiveChannel('text')}
              >
                Switch to Text Chat
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};