// components/medical-student/consultations/AssignedConsultationCard.tsx
import React from 'react';
import { StatusBadge } from '../../../components/ui/status/StatusBadge';
import { formatDate } from '../../../lib/utils/formatters';

interface AssignedConsultationCardProps {
  /**
   * Consultation data
   */
  consultation: any;
  /**
   * Click handler
   */
  onClick: () => void;
}

export const AssignedConsultationCard: React.FC<AssignedConsultationCardProps> = ({
  consultation,
  onClick
}) => {
  // Consultation type label
  const getConsultationTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'labResult': "Lab Result",
      'medication': "Medication",
      'imaging': "Imaging",
      'symptoms': "Symptoms",
      'general': "General"
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
  
  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'labResult':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'medication':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'imaging':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'symptoms':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
    }
  };
  
  const getBorderColor = () => {
    if (consultation.status === 'SCHEDULED') {
      return 'border-purple-500';
    } else if (consultation.status === 'IN_PROGRESS') {
      return 'border-yellow-500';
    } else if (consultation.status === 'ASSIGNED') {
      return 'border-blue-500';
    }
    return 'border-neutral-200';
  };
  
  return (
    <div 
      className={`bg-white border-l-4 ${getBorderColor()} border-t border-r border-b border-neutral-200 rounded-lg shadow-sm hover:shadow-md transition p-4 cursor-pointer`}
      onClick={onClick}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="flex items-start mb-2">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-800 mr-2">
              {getTypeIcon(consultation.type)}
            </span>
            <div>
              <h3 className="font-medium text-neutral-900">
                {consultation.primaryConcern}
              </h3>
              <p className="text-sm text-neutral-500 mt-1">
                {getConsultationTypeLabel(consultation.type)}
              </p>
            </div>
          </div>
          
          <p className="text-sm text-neutral-700 mb-3 line-clamp-2">
            {consultation.description}
          </p>
          
          <div className="flex flex-wrap items-center text-sm gap-x-4 gap-y-2 text-neutral-700">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span>{getCommunicationChannelLabel(consultation.communicationChannel)}</span>
            </div>
            
            {consultation.scheduledFor ? (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Scheduled for {formatDate(consultation.scheduledFor)}</span>
              </div>
            ) : (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Accepted on {formatDate(consultation.updatedAt || consultation.createdAt)}</span>
              </div>
            )}
            
            {consultation.documents && consultation.documents.length > 0 && (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{consultation.documents.length} {consultation.documents.length === 1 ? "document" : "documents"}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:border-l lg:pl-4 flex flex-col justify-between">
          <div className="mb-2">
            <p className="text-sm font-medium text-neutral-700 mb-1">Patient Name</p>
            <p className="font-medium text-neutral-900">Maria Schmidt</p>
          </div>
          
          <div className="flex flex-col">
            <div className="mt-2">
              <StatusBadge status={consultation.status} />
            </div>
            
            {consultation.status === 'SCHEDULED' && (
              <div className="mt-2 text-sm">
                <div className="flex items-center text-neutral-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Scheduled for:</span>
                </div>
                <div className="font-medium ml-5 mt-1">
                  {formatDate(consultation.scheduledFor)}
                </div>
              </div>
            )}
            
            {consultation.status === 'IN_PROGRESS' && (
              <div className="mt-3 text-sm flex items-center text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Last activity: 2 hours ago</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};