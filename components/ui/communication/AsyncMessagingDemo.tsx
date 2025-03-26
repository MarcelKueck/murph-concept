/**
 * AsyncMessagingDemo component
 * Demonstrates structured asynchronous messaging with templates and forms
 */
import React, { useState } from 'react';
import { AsyncMessageContainer } from './AsyncMessageContainer';
import { MessageInput } from './MessageInput';
import { Alert } from '../modal/Alert';
import { Tag } from '../elements/Tag';
import Button from '../buttons/Button';
import { DocumentShare } from './DocumentShare';

export const AsyncMessagingDemo: React.FC = () => {
  // Message input state
  const [messageText, setMessageText] = useState<string>('');
  // Selected template
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  // Success alert state
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  
  // Mock documents
  const documents = [
    {
      id: 'd1',
      name: 'Blood Test Results.pdf',
      type: 'PDF Document',
    },
    {
      id: 'd2',
      name: 'Follow-up Questions.docx',
      type: 'Word Document',
    }
  ];
  
  // Handle message submission
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // In a real app, this would send the message to the backend
    console.log('Sending message:', messageText);
    
    // Show success alert
    setShowSuccess(true);
    
    // Clear message input
    setMessageText('');
    
    // Hide success alert after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  
  // Template info for demonstration
  const templateInfo = {
    title: 'Lab Results Analysis',
    description: 'This template is designed for explaining lab results to patients with clear references to normal ranges and implications.',
    fields: [
      { id: 'labType', label: 'Lab Test Type', type: 'text', placeholder: 'e.g., Complete Blood Count, Lipid Panel' },
      { id: 'abnormalValues', label: 'Abnormal Values', type: 'textarea', placeholder: 'List abnormal values and their implications' },
      { id: 'recommendations', label: 'Recommendations', type: 'textarea', placeholder: 'Provide clear next steps or recommendations' },
    ]
  };
  
  // Template selection actions
  const templateActions = (
    <div className="flex space-x-2">
      <Button size="small" variant="tertiary" onClick={() => setSelectedTemplate(null)}>
        Cancel
      </Button>
      <Button size="small" onClick={() => {
        setMessageText(
          "Dear Maria,\n\nI've reviewed your Complete Blood Count (CBC) results and would like to provide some context.\n\nYour cholesterol level is 240 mg/dL which is higher than the normal range (below 200 mg/dL). This indicates a slightly elevated risk for cardiovascular issues.\n\nI recommend:\n- Following up with your doctor about these results\n- Considering dietary changes to reduce saturated fat intake\n- Increasing physical activity if approved by your doctor\n\nPlease let me know if you have any questions about these results.\n\nBest regards,\nDr. Julia Müller"
        );
        setSelectedTemplate(null);
      }}>
        Use Template
      </Button>
    </div>
  );
  
  return (
    <div className="w-full h-[600px] flex flex-col border border-neutral-200 rounded-lg overflow-hidden">
      {showSuccess && (
        <Alert
          variant="success"
          message="Your message was sent successfully. You'll receive a notification when the patient responds."
          dismissible
          onDismiss={() => setShowSuccess(false)}
          className="m-4"
        />
      )}
      
      <div className="flex-1 overflow-y-auto p-4">
        {selectedTemplate ? (
          // Template selection view
          <AsyncMessageContainer 
            title="Using Template: Lab Results Analysis"
            showTemplates={false}
            allowDocuments={false}
            showPriority={false}
            actions={templateActions}
          >
            <div className="space-y-4">
              <p className="text-neutral-600 text-sm">{templateInfo.description}</p>
              
              <div className="space-y-3">
                {templateInfo.fields.map(field => (
                  <div key={field.id} className="space-y-1">
                    <label className="block text-sm font-medium text-neutral-700">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        className="w-full rounded-md border border-neutral-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                        rows={3}
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <input
                        type="text"
                        className="w-full rounded-md border border-neutral-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="border-t border-neutral-200 pt-3">
                <h4 className="text-sm font-medium text-neutral-700 mb-2">Attach Related Documents</h4>
                <div className="space-y-2">
                  {documents.map(doc => (
                    <div key={doc.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`doc-${doc.id}`}
                        className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-200"
                      />
                      <label htmlFor={`doc-${doc.id}`} className="ml-2 text-sm text-neutral-700">
                        {doc.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AsyncMessageContainer>
        ) : (
          // Standard async message view
          <AsyncMessageContainer 
            title="Medical Documentation Review"
            status="Awaiting Response (Typical Response: 2-4 hours)"
          >
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <span className="font-medium text-neutral-900">Consultation Request</span>
                    <Tag
                      label="Lab Results"
                      variant="primary"
                      className="ml-2"
                    />
                  </div>
                  <span className="text-xs text-neutral-500">March 25, 2025 - 10:30 AM</span>
                </div>
                <p className="text-neutral-700 text-sm mb-3">
                  I'm trying to understand my recent lab results, especially my cholesterol levels. The report shows a total cholesterol of 240 mg/dL which seems high, but I'm not sure what this means or what I should do about it.
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-neutral-700">Attached Documents</h4>
                  <DocumentShare
                    name="Blood Test Results.pdf"
                    type="PDF Document"
                    onClick={() => console.log('Opening document...')}
                  />
                </div>
              </div>
              
              <div className="border-t border-neutral-200 pt-4 -mx-4 px-4">
                <h3 className="text-sm font-medium text-neutral-700 mb-2">Your Response</h3>
                
                <div className="space-y-3">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full rounded-md border border-neutral-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                    rows={6}
                    placeholder="Type your detailed response here. You can include formatted explanations, recommendations, and follow-up questions."
                  />
                  
                  <div className="flex justify-between">
                    <div className="space-x-2">
                      <Button 
                        variant="secondary" 
                        size="small"
                        leftIcon={
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        }
                      >
                        Attach
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="small"
                        onClick={() => setSelectedTemplate('labResults')}
                        leftIcon={
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                          </svg>
                        }
                      >
                        Use Template
                      </Button>
                    </div>
                    
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                    >
                      Send Response
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </AsyncMessageContainer>
        )}
      </div>
    </div>
  );
};