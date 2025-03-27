// components/patient/dashboard/UpcomingAppointmentsCard.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '../../ui/cards/Card';
import { EmptyState } from '../../ui/elements/EmptyState';
import Button from '../../ui/buttons/Button';
import { StatusBadge } from '../../ui/status/StatusBadge';
import { UserInfo } from '../../ui/avatar/UserInfo';
import { formatDate } from '../../../lib/utils/formatters';

interface Consultation {
  id: string;
  type: string;
  primaryConcern: string;
  status: string;
  communicationChannel: string;
  scheduledFor?: string;
  medicalStudentId?: string;
}

interface MedicalStudent {
  id: string;
  name: string;
  university: string;
  studyYear: number;
  specialization: string;
}

interface UpcomingAppointmentsCardProps {
  /**
   * Consultations data
   */
  consultations: Consultation[];
  /**
   * Medical students data
   */
  medicalStudents: MedicalStudent[];
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Empty state message
   */
  emptyStateMessage?: string;
  /**
   * Optional className
   */
  className?: string;
}

export const UpcomingAppointmentsCard: React.FC<UpcomingAppointmentsCardProps> = ({
  consultations,
  medicalStudents,
  loading = false,
  emptyStateMessage = "You don't have any upcoming consultations",
  className = ''
}) => {
  const router = useRouter();
  
  // Filter for upcoming consultations (SCHEDULED and IN_PROGRESS)
  const upcomingConsultations = consultations.filter(c => 
    ['SCHEDULED', 'IN_PROGRESS'].includes(c.status)
  );
  
  // Sort by scheduled date (most recent first)
  upcomingConsultations.sort((a, b) => {
    if (!a.scheduledFor) return 1;
    if (!b.scheduledFor) return -1;
    return new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime();
  });
  
  // Get the 3 most recent consultations
  const recentConsultations = upcomingConsultations.slice(0, 3);
  
  // Get medical student info
  const getMedicalStudentInfo = (medicalStudentId?: string) => {
    if (!medicalStudentId) return null;
    return medicalStudents.find(ms => ms.id === medicalStudentId);
  };
  
  // Get communication channel icon
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'video':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'audio':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'text':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        );
    }
  };
  
  // Get channel label
  const getChannelLabel = (channel: string) => {
    switch (channel) {
      case 'video': return 'Video Call';
      case 'audio': return 'Audio Call';
      case 'text': return 'Text Chat';
      case 'async': return 'Messages';
      default: return channel;
    }
  };

  if (loading) {
    return (
      <Card title="Upcoming Consultations" className={className}>
        <div className="py-4 text-center text-gray-500">Loading consultations...</div>
      </Card>
    );
  }

  return (
    <Card 
      title="Upcoming Consultations"
      footer={
        recentConsultations.length > 0 ? (
          <div className="text-right">
            <Button
              variant="tertiary"
              onClick={() => router.push('/patient/consultations')}
            >
              View All
            </Button>
          </div>
        ) : null
      }
      className={className}
    >
      {recentConsultations.length > 0 ? (
        <div className="space-y-4">
          {recentConsultations.map(consultation => {
            const medicalStudent = getMedicalStudentInfo(consultation.medicalStudentId);
            
            return (
              <div
                key={consultation.id}
                className="border border-neutral-200 rounded-lg p-4 hover:shadow-sm transition cursor-pointer"
                onClick={() => router.push(`/patient/consultations/${consultation.id}`)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-neutral-900">{consultation.primaryConcern}</h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      {consultation.type.charAt(0).toUpperCase() + consultation.type.slice(1)} consultation
                    </p>
                  </div>
                  <StatusBadge status={consultation.status} />
                </div>
                
                {consultation.scheduledFor && (
                  <div className="flex items-center text-sm text-neutral-700 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(consultation.scheduledFor)}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  {medicalStudent ? (
                    <UserInfo
                      name={medicalStudent.name}
                      info={`${medicalStudent.specialization}, Year ${medicalStudent.studyYear}`}
                      size="sm"
                    />
                  ) : (
                    <div className="text-sm text-neutral-500">No medical student assigned yet</div>
                  )}
                  
                  <div className="flex items-center bg-neutral-100 px-2 py-1 rounded text-xs text-neutral-700">
                    <span className="mr-1">{getChannelIcon(consultation.communicationChannel)}</span>
                    <span>{getChannelLabel(consultation.communicationChannel)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title={emptyStateMessage}
          description="Start a new consultation to get help with your medical questions."
          action={
            <Button
              onClick={() => router.push('/patient/consultations/new')}
            >
              New Consultation
            </Button>
          }
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
      )}
    </Card>
  );
};