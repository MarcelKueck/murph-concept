// components/patient/consultations/ConsultationChatContainer.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '../../../providers/AuthProvider';

import { ChatContainer } from '../../ui/communication/ChatContainer';
import { ChatBubble } from '../../ui/communication/ChatBubble';
import { ChatInput } from '../../ui/communication/ChatInput';
import { EmptyState } from '../../ui/elements/EmptyState';

interface ConsultationChatContainerProps {
  /**
   * Consultation ID
   */
  consultationId: string;
  /**
   * Consultation status
   */
  status: 'REQUESTED' | 'ASSIGNED' | 'SCHEDULED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
}

export const ConsultationChatContainer: React.FC<ConsultationChatContainerProps> = ({
  consultationId,
  status
}) => {
  const t = useTranslations('communication.chat');
  const c = useTranslations('common');
  
  const { user } = useAuthContext();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  
  // Load mock messages
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (['IN_PROGRESS', 'RESOLVED', 'CLOSED'].includes(status)) {
        // Mock messages for active consultations
        setMessages([
          {
            id: 'm1',
            consultationId,
            content: 'Hello! I can help you understand your lab results. What specific values are you concerned about?',
            sentAt: '2025-03-20T09:30:00Z',
            isFromPatient: false,
            senderName: 'Dr. Julia Müller'
          },
          {
            id: 'm2',
            consultationId,
            content: 'I\'m particularly concerned about my cholesterol levels. The report shows 240 mg/dL which seems high.',
            sentAt: '2025-03-20T09:32:00Z',
            isFromPatient: true
          },
          {
            id: 'm3',
            consultationId,
            content: 'You\'re right to be concerned. A total cholesterol of 240 mg/dL is considered high. The ideal range is below 200 mg/dL. Would you like me to explain what this means and what steps you might consider?',
            sentAt: '2025-03-20T09:35:00Z',
            isFromPatient: false,
            senderName: 'Dr. Julia Müller'
          }
        ]);
      }
      
      setLoading(false);
    }, 1000);
  }, [consultationId, status]);
  
  // Handle message submission
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Create a new message
    const newMessage = {
      id: `m${Date.now()}`,
      consultationId,
      content: input,
      sentAt: new Date().toISOString(),
      isFromPatient: true
    };
    
    // Add to messages
    setMessages(prev => [...prev, newMessage]);
    
    // Clear input
    setInput('');
    
    // Simulate response from medical student
    if (['IN_PROGRESS'].includes(status)) {
      setTimeout(() => {
        const responseMessage = {
          id: `m${Date.now() + 1}`,
          consultationId,
          content: 'Thank you for providing that information. Let me review it and get back to you shortly.',
          sentAt: new Date().toISOString(),
          isFromPatient: false,
          senderName: 'Dr. Julia Müller'
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }, 2000);
    }
  };
  
  // Format the date for display
  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Check if messaging is available
  const isMessagingAvailable = ['ASSIGNED', 'SCHEDULED', 'IN_PROGRESS'].includes(status);
  
  // Empty state message based on status
  const getEmptyStateMessage = () => {
    if (['REQUESTED'].includes(status)) {
      return t('waitingForAssignment');
    }
    
    if (['ASSIGNED', 'SCHEDULED'].includes(status)) {
      return t('consultationNotStarted');
    }
    
    return t('noMessages');
  };
  
  return (
    <ChatContainer
      loading={loading}
      footer={
        isMessagingAvailable && (
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSubmit={handleSendMessage}
            placeholder={t('placeholder')}
            attachEnabled
            onAttach={() => console.log('Attach file')}
          />
        )
      }
    >
      {messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatBubble
              key={message.id}
              message={message.content}
              timestamp={formatMessageDate(message.sentAt)}
              isCurrentUser={message.isFromPatient}
              avatar={message.isFromPatient ? undefined : '/mock-images/students/student1.jpg'}
              senderName={message.isFromPatient ? undefined : message.senderName}
              isFirstInSequence={
                index === 0 || 
                messages[index - 1].isFromPatient !== message.isFromPatient
              }
              isLastInSequence={
                index === messages.length - 1 || 
                messages[index + 1].isFromPatient !== message.isFromPatient
              }
            />
          ))}
        </div>
      ) : !loading ? (
        <div className="h-full flex items-center justify-center">
          <EmptyState
            title={getEmptyStateMessage()}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            }
          />
        </div>
      ) : null}
    </ChatContainer>
  );
};