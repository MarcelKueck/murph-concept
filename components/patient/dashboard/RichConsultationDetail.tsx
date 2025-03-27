// components/patient/consultations/RichConsultationDetail.tsx
import React, { useState, useEffect } from 'react';
import { StatusBadge } from '../../ui/status/StatusBadge';
import { UserInfo } from '../../ui/avatar/UserInfo';
import { DocumentCard } from '../../ui/cards/DocumentCard';
import { formatDate } from '../../../lib/utils/formatters';
import { Divider } from '../../ui/elements/Divider';
import Button from '../../ui/buttons/Button';

interface Consultation {
  id: string;
  type: string;
  primaryConcern: string;
  description: string;
  status: string;
  communicationChannel: string;
  scheduledFor?: string;
  completedAt?: string;
  rating?: number;
  feedback?: string;
  createdAt: string;
  patientId: string;
  medicalStudentId?: string;
  documents?: string[];
}

interface MedicalStudent {
  id: string;
  name: string;
  email: string;
  university: string;
  studyYear: number;
  specialization: string;
  image?: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  description?: string;
}

interface Message {
  id: string;
  content: string;
  sentAt: string;
  isFromPatient: boolean;
}

interface RichConsultationDetailProps {
  /**
   * Consultation data
   */
  consultation: Consultation;
  /**
   * Medical student data (if assigned)
   */
  medicalStudent?: MedicalStudent;
  /**
   * Related documents
   */
  relatedDocuments: Document[];
  /**
   * Recent messages
   */
  recentMessages: Message[];
  /**
   * Handler for status update
   */
  onStatusUpdate?: (newStatus: string) => void;
  /**
   * Handler for document view
   */
  onViewDocument?: (documentId: string) => void;
  /**
   * Handler for document download
   */
  onDownloadDocument?: (documentId: string) => void;
  /**
   * Loading state
   */
  loading?: boolean;
}

export const RichConsultationDetail: React.FC<RichConsultationDetailProps> = ({
  consultation,
  medicalStudent,
  relatedDocuments,
  recentMessages,
  onStatusUpdate,
  onViewDocument,
  onDownloadDocument,
  loading = false
}) => {
  // Time until appointment
  const [timeUntil, setTimeUntil] = useState<string>('');
  const [canJoin, setCanJoin] = useState<boolean>(false);
  
  // Calculate time until scheduled consultation
  useEffect(() => {
    if (!consultation.scheduledFor) return;
    
    const updateTimer = () => {
      const now = new Date();
      const scheduledTime = new Date(consultation.scheduledFor);
      const diffMs = scheduledTime.getTime() - now.getTime();
      
      // Allow joining 10 minutes before scheduled time
      setCanJoin(diffMs <= 10 * 60 * 1000 && diffMs > -60 * 60 * 1000);
      
      if (diffMs <= 0) {
        // If in the past but within an hour, show "Started X minutes ago"
        if (diffMs > -60 * 60 * 1000) {
          const minutesAgo = Math.abs(Math.floor(diffMs / (1000 * 60)));
          setTimeUntil(`Started ${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`);
        } else {
          setTimeUntil('');
        }
      } else {
        // If more than 24 hours away, just show the date
        if (diffMs > 24 * 60 * 60 * 1000) {
          setTimeUntil(`Scheduled for ${formatDate(scheduledFor)}`);
          return;
        }
        
        // Otherwise show countdown
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours > 0) {
          setTimeUntil(`Starts in ${hours} ${hours === 1 ? 'hour' : 'hours'} and ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
        } else {
          setTimeUntil(`Starts in ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
        }
      }
    };
    
    updateTimer();
    const timerId = setInterval(updateTimer, 60000); // Update every minute
    
    return () => clearInterval(timerId);
  }, [consultation.scheduledFor]);

  // Format scheduled date
  const { scheduledFor } = consultation;
  const formattedScheduledTime = scheduledFor ? formatDate(scheduledFor, true) : '';
  
  // Consultation type label
  const getConsultationTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'labResult': "Lab Result Interpretation",
      'medication': "Medication Information",
      'imaging': "Imaging Result Explanation",
      'symptoms': "Symptom Assessment",
      'general': "General Health Question"
    };
    
    return labels[type] || type;
  };
  
  // Communication channel label
  const getCommunicationChannelLabel = (channel: string) => {
    const labels: Record<string, string> = {
      'video': "Video Call",
      'audio': "Audio Call",
      'text': "Text Chat",
      'async': "Asynchronous Messaging"
    };
    
    return labels[channel] || channel;
  };
  
  // Get the status based actions
  const getStatusActions = () => {
    if (!onStatusUpdate) return null;
    
    switch (consultation.status) {
      case 'SCHEDULED':
        if (canJoin) {
          return (
            <Button
              onClick={() => onStatusUpdate('IN_PROGRESS')}
              leftIcon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              }
            >
              Join Now
            </Button>
          );
        }
        return (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="secondary"
              onClick={() => onStatusUpdate('CLOSED')}
            >
              Cancel Consultation
            </Button>
          </div>
        );
      
      case 'IN_PROGRESS':
        return (
          <Button
            onClick={() => {
              // Redirect to the communication channel
              window.location.href = `#communication`;
            }}
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            }
          >
            Continue Consultation
          </Button>
        );
      
      case 'RESOLVED':
        return (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => onStatusUpdate('CLOSED')}
            >
              Close Consultation
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                // Redirect to feedback
                window.location.href = `#feedback`;
              }}
            >
              Provide Feedback
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="py-4 text-center text-gray-500">Loading consultation details...</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status and header section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
        <div className="mb-4 md:mb-0">
          <StatusBadge status={consultation.status} />
          {timeUntil && (
            <span className="ml-3 text-sm text-neutral-600">{timeUntil}</span>
          )}
        </div>
        
        <div className="flex space-x-2">
          {getStatusActions()}
        </div>
      </div>
      
      {/* Main details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-neutral-900 mb-2">Consultation Details</h3>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-neutral-500">Type</p>
                <p className="text-neutral-900">{getConsultationTypeLabel(consultation.type)}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-neutral-500">Primary Concern</p>
                <p className="text-neutral-900">{consultation.primaryConcern}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-neutral-500">Communication Method</p>
                <p className="text-neutral-900">{getCommunicationChannelLabel(consultation.communicationChannel)}</p>
              </div>
              
              {scheduledFor && (
                <div>
                  <p className="text-sm font-medium text-neutral-500">Scheduled For</p>
                  <p className="text-neutral-900">{formattedScheduledTime}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-neutral-500">Created On</p>
                <p className="text-neutral-900">{formatDate(consultation.createdAt)}</p>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="mt-4">
            <h3 className="font-medium text-neutral-900 mb-2">Description</h3>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <p className="text-neutral-700 whitespace-pre-line">{consultation.description}</p>
            </div>
          </div>
        </div>
        
        <div>
          {/* Medical Student */}
          <h3 className="font-medium text-neutral-900 mb-2">Medical Student</h3>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            {medicalStudent ? (
              <div>
                <UserInfo
                  name={medicalStudent.name}
                  info={`${medicalStudent.specialization}, ${medicalStudent.university}`}
                  imageUrl={medicalStudent.image}
                />
                
                <Divider className="my-3" />
                
                <div className="text-sm text-neutral-700">
                  <p><span className="font-medium">Study Year:</span> {medicalStudent.studyYear}</p>
                  <p className="mt-1"><span className="font-medium">Contact:</span> {medicalStudent.email}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-neutral-500">
                <p>No medical student has been assigned yet.</p>
                <p className="text-sm mt-1">You'll be notified when someone is available to help you.</p>
              </div>
            )}
          </div>
          
          {/* Documents */}
          <div className="mt-4">
            <h3 className="font-medium text-neutral-900 mb-2">Shared Documents</h3>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              {relatedDocuments.length > 0 ? (
                <div className="space-y-3">
                  {relatedDocuments.map(document => (
                    <DocumentCard
                      key={document.id}
                      name={document.name}
                      type={document.type}
                      uploadDate={formatDate(document.uploadedAt)}
                      description={document.description}
                      onClick={() => onViewDocument && onViewDocument(document.id)}
                      onDownload={() => onDownloadDocument && onDownloadDocument(document.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-neutral-500">
                  <p>No documents have been shared for this consultation.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Messages */}
      {recentMessages.length > 0 && (
        <div>
          <h3 className="font-medium text-neutral-900 mb-2">Recent Messages</h3>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            <div className="space-y-3">
              {recentMessages.slice(0, 3).map(message => (
                <div 
                  key={message.id}
                  className={`p-3 rounded-lg ${
                    message.isFromPatient 
                      ? 'bg-primary-50 ml-8' 
                      : 'bg-white border border-neutral-200 mr-8'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-medium text-neutral-500">
                      {message.isFromPatient ? 'You' : medicalStudent?.name || 'Medical Student'}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {formatDate(message.sentAt, true)}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-700">{message.content}</p>
                </div>
              ))}
              
              {recentMessages.length > 3 && (
                <div className="text-center pt-2">
                  <Button
                    variant="tertiary"
                    size="small"
                    onClick={() => {
                      // Redirect to communication section
                      window.location.href = '#communication';
                    }}
                  >
                    View All Messages
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};