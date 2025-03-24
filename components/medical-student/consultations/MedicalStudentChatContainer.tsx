// components/medical-student/consultations/MedicalStudentChatContainer.tsx
import React, { useState } from 'react';
import { ChatInput } from '../../../components/ui/communication/ChatInput';
import { EmptyState } from '../../../components/ui/elements/EmptyState';

interface ConsultationChatContainerProps {
  /**
   * Consultation ID
   */
  consultationId: string;
  /**
   * Consultation status
   */
  status: 'REQUESTED' | 'ASSIGNED' | 'SCHEDULED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  /**
   * Patient name
   */
  patientName: string;
}

export const ConsultationChatContainer: React.FC<ConsultationChatContainerProps> = ({
  consultationId,
  status,
  patientName
}) => {
  const [message, setMessage] = useState('');
  
  // Check if messaging is available
  const isMessagingAvailable = ['ASSIGNED', 'SCHEDULED', 'IN_PROGRESS'].includes(status);
  
  // Get empty state message based on status
  const getEmptyStateMessage = () => {
    if (['REQUESTED'].includes(status)) {
      return "Waiting for assignment";
    }
    
    if (['ASSIGNED', 'SCHEDULED'].includes(status)) {
      return "Consultation not started yet";
    }
    
    return "No messages yet";
  };
  
  // Handle send message
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // In a real app, this would send a message to the API
    console.log('Sending message:', message);
    
    // Clear input
    setMessage('');
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center">
        <EmptyState
          title={getEmptyStateMessage()}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          }
        />
      </div>
      
      {isMessagingAvailable && (
        <div className="mt-4">
          <ChatInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onSubmit={handleSendMessage}
            placeholder="Type your message..."
            attachEnabled
          />
        </div>
      )}
    </div>
  );
};