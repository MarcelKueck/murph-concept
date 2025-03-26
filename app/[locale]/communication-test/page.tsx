/**
 * Communication test page
 * Demo page showcasing all communication interfaces
 */
'use client';

import React, { useState } from 'react';
import { PageContainer } from '../../../components/ui/layout/PageContainer';
import { PageHeader } from '../../../components/ui/layout/PageHeader';
import { TabNavigation } from '../../../components/ui/navigation/TabNavigation';
import { Card } from '../../../components/ui/cards/Card';
import { VideoDemo } from '../../../components/ui/communication/VideoDemo';
import { AudioDemo } from '../../../components/ui/communication/AudioDemo';
import { AsyncMessagingDemo } from '../../../components/ui/communication/AsyncMessagingDemo';
import { ConsultationChatContainer } from '../../../components/patient/consultations/ConsultationChatContainer';

export default function CommunicationTestPage() {
  // Active interface tab
  const [activeTab, setActiveTab] = useState<string>('video');
  
  return (
    <PageContainer>
      <PageHeader
        title="Communication Interfaces"
        subtitle="Test page for various communication channels in the Murph platform"
        breadcrumbs={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/test', label: 'Test Pages' },
          { label: 'Communication Interfaces' }
        ]}
      />
      
      <Card className="mb-8">
        <p className="text-neutral-700 mb-4">
          This page demonstrates the various communication interfaces available in the Murph platform. 
          Each interface is designed for different types of medical consultations and patient-medical student interactions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50">
            <h3 className="font-medium text-neutral-900 mb-2">Video Call</h3>
            <p className="text-sm text-neutral-600">Real-time video consultation with face-to-face communication. Ideal for complex cases requiring visual assessment.</p>
          </div>
          
          <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50">
            <h3 className="font-medium text-neutral-900 mb-2">Audio Call</h3>
            <p className="text-sm text-neutral-600">Audio-only consultation for situations where video isn't necessary or bandwidth is limited.</p>
          </div>
          
          <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50">
            <h3 className="font-medium text-neutral-900 mb-2">Text Chat</h3>
            <p className="text-sm text-neutral-600">Real-time text-based communication for direct exchanges that don't require audio or video.</p>
          </div>
          
          <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50">
            <h3 className="font-medium text-neutral-900 mb-2">Asynchronous Messaging</h3>
            <p className="text-sm text-neutral-600">Structured messaging for non-urgent consultations with longer, more detailed responses.</p>
          </div>
        </div>
      </Card>
      
      <Card>
        <TabNavigation
          tabs={[
            { id: 'video', label: 'Video Call' },
            { id: 'audio', label: 'Audio Call' },
            { id: 'text', label: 'Text Chat' },
            { id: 'async', label: 'Asynchronous' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          className="mb-6"
        />
        
        {activeTab === 'video' && (
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Video Call Interface</h2>
            <VideoDemo />
            
            <div className="mt-4 p-4 border-t border-neutral-200">
              <h3 className="font-medium text-neutral-700 mb-2">Interface Features</h3>
              <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                <li>High-quality video feed with adaptive quality</li>
                <li>Self-view camera for better positioning</li>
                <li>Mute/unmute audio controls</li>
                <li>Camera on/off toggle</li>
                <li>Screen sharing capability for displaying medical information</li>
                <li>Call duration tracking</li>
                <li>Connection quality indicator</li>
                <li>Full-screen mode capability</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'audio' && (
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Audio Call Interface</h2>
            <AudioDemo />
            
            <div className="mt-4 p-4 border-t border-neutral-200">
              <h3 className="font-medium text-neutral-700 mb-2">Interface Features</h3>
              <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                <li>Clear audio connection with background noise reduction</li>
                <li>Mute/unmute controls</li>
                <li>Speaker on/off toggle for privacy or speaker mode</li>
                <li>Visual audio level indicators</li>
                <li>Call duration tracking</li>
                <li>Keypad for number entry when needed</li>
                <li>Easy one-touch call ending</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'text' && (
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Text Chat Interface</h2>
            <div className="h-[600px] border border-neutral-200 rounded-lg overflow-hidden">
              <ConsultationChatContainer 
                consultationId="demo-consultation"
                status="IN_PROGRESS"
              />
            </div>
            
            <div className="mt-4 p-4 border-t border-neutral-200">
              <h3 className="font-medium text-neutral-700 mb-2">Interface Features</h3>
              <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                <li>Real-time text exchange</li>
                <li>Read receipts and typing indicators</li>
                <li>Timestamp display for each message</li>
                <li>File and image attachment capabilities</li>
                <li>Message threading for organized conversations</li>
                <li>Rich text formatting options</li>
                <li>Emoji and reaction support</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'async' && (
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Asynchronous Messaging Interface</h2>
            <AsyncMessagingDemo />
            
            <div className="mt-4 p-4 border-t border-neutral-200">
              <h3 className="font-medium text-neutral-700 mb-2">Interface Features</h3>
              <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                <li>Structured message templates for common consultation types</li>
                <li>Priority level indicators for message urgency</li>
                <li>Document attachment and organization</li>
                <li>Rich formatting tools for detailed explanations</li>
                <li>Expected response time indicators</li>
                <li>Message threading and categorization</li>
                <li>Notification system for new messages</li>
              </ul>
            </div>
          </div>
        )}
      </Card>
    </PageContainer>
  );
}