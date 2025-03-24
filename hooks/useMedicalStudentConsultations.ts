/**
 * Hook for managing medical student consultations
 */
import { useState } from 'react';

// Type definitions
interface Consultation {
  id: string;
  type: 'labResult' | 'medication' | 'imaging' | 'symptoms' | 'general';
  primaryConcern: string;
  description: string;
  status: 'REQUESTED' | 'ASSIGNED' | 'SCHEDULED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  communicationChannel: 'video' | 'audio' | 'text' | 'async';
  scheduledFor?: string;
  completedAt?: string;
  rating?: number;
  feedback?: string;
  createdAt: string;
  updatedAt?: string;
  patientId: string;
  medicalStudentId?: string;
  documents?: string[];
  medicalStudentNotes?: string;
}

interface UseMedicalStudentConsultationsReturn {
  /**
   * Available consultations that can be accepted
   */
  availableConsultations: Consultation[];
  /**
   * Consultations assigned to the medical student
   */
  assignedConsultations: Consultation[];
  /**
   * Completed consultations
   */
  completedConsultations: Consultation[];
  /**
   * Loading state
   */
  loading: boolean;
  /**
   * Error state
   */
  error: Error | null;
  /**
   * Fetch consultations for the medical student
   */
  fetchConsultations: (medicalStudentId: string) => Promise<void>;
  /**
   * Accept a consultation request
   */
  acceptConsultation: (consultationId: string) => Promise<void>;
  /**
   * Decline a consultation request
   */
  declineConsultation: (consultationId: string) => Promise<void>;
  /**
   * Update consultation status
   */
  updateConsultationStatus: (consultationId: string, status: 'SCHEDULED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED') => Promise<void>;
}

/**
 * Hook for medical student consultation management
 * @returns Consultation state and functions
 */
const useMedicalStudentConsultations = (): UseMedicalStudentConsultationsReturn => {
  // State for consultation lists
  const [availableConsultations, setAvailableConsultations] = useState<Consultation[]>([]);
  const [assignedConsultations, setAssignedConsultations] = useState<Consultation[]>([]);
  const [completedConsultations, setCompletedConsultations] = useState<Consultation[]>([]);
  
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Fetch consultations for a medical student
   */
  const fetchConsultations = async (medicalStudentId: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, simulate API response with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock available consultations (with REQUESTED status)
      const mockAvailableConsultations = [
        {
          id: 'c1',
          type: 'labResult',
          primaryConcern: 'Need help understanding blood test results',
          description: 'I received my blood test results and don\'t understand what these high cholesterol numbers mean.',
          status: 'REQUESTED',
          communicationChannel: 'video',
          createdAt: '2025-03-15T10:30:00Z',
          patientId: 'p1',
          documents: ['d1', 'd2']
        },
        {
          id: 'c2',
          type: 'medication',
          primaryConcern: 'Information about new medication',
          description: 'My doctor prescribed a new medication for high blood pressure, but I\'m not sure about the side effects.',
          status: 'REQUESTED',
          communicationChannel: 'text',
          createdAt: '2025-03-18T14:45:00Z',
          patientId: 'p2',
          documents: ['d3']
        },
        {
          id: 'c3',
          type: 'imaging',
          primaryConcern: 'MRI results explanation',
          description: 'I had an MRI for knee pain and would like help understanding the results.',
          status: 'REQUESTED',
          communicationChannel: 'video',
          createdAt: '2025-03-20T09:15:00Z',
          patientId: 'p3',
          documents: ['d4']
        },
        {
          id: 'c4',
          type: 'symptoms',
          primaryConcern: 'Strange symptoms after taking medication',
          description: 'I started a new antibiotic and now I have these symptoms. Is this normal?',
          status: 'REQUESTED',
          communicationChannel: 'audio',
          createdAt: '2025-03-21T16:20:00Z',
          patientId: 'p4'
        }
      ] as Consultation[];
      
      // Mock assigned consultations (with ASSIGNED, SCHEDULED, or IN_PROGRESS status)
      const mockAssignedConsultations = [
        {
          id: 'c5',
          type: 'general',
          primaryConcern: 'Question about vaccination schedule',
          description: 'I need to understand the vaccination schedule for my child who has missed some appointments.',
          status: 'ASSIGNED',
          communicationChannel: 'async',
          createdAt: '2025-03-10T11:30:00Z',
          updatedAt: '2025-03-11T09:22:00Z',
          patientId: 'p5',
          medicalStudentId
        },
        {
          id: 'c6',
          type: 'labResult',
          primaryConcern: 'Liver function test results',
          description: 'My liver function tests came back with some abnormal numbers and I\'d like to understand what they mean.',
          status: 'SCHEDULED',
          communicationChannel: 'video',
          scheduledFor: '2025-03-30T13:00:00Z',
          createdAt: '2025-03-17T08:45:00Z',
          updatedAt: '2025-03-17T10:15:00Z',
          patientId: 'p6',
          medicalStudentId,
          documents: ['d5', 'd6']
        },
        {
          id: 'c7',
          type: 'medication',
          primaryConcern: 'Drug interaction concerns',
          description: 'I\'m taking multiple medications and want to know if there are any potential interactions.',
          status: 'IN_PROGRESS',
          communicationChannel: 'text',
          createdAt: '2025-03-19T15:30:00Z',
          updatedAt: '2025-03-20T10:20:00Z',
          patientId: 'p7',
          medicalStudentId,
          documents: ['d7']
        }
      ] as Consultation[];
      
      // Mock completed consultations (with RESOLVED or CLOSED status)
      const mockCompletedConsultations = [
        {
          id: 'c8',
          type: 'symptoms',
          primaryConcern: 'Persistent cough after cold',
          description: 'I had a cold that has cleared up, but I still have a cough that won\'t go away after 3 weeks.',
          status: 'RESOLVED',
          communicationChannel: 'audio',
          createdAt: '2025-03-05T09:30:00Z',
          completedAt: '2025-03-08T11:15:00Z',
          rating: 5,
          feedback: 'Very helpful explanation about post-viral cough.',
          patientId: 'p8',
          medicalStudentId,
          medicalStudentNotes: 'Patient reported 3-week cough after viral infection. Explained that post-viral cough can persist for 3-8 weeks.'
        },
        {
          id: 'c9',
          type: 'imaging',
          primaryConcern: 'Understanding X-ray results',
          description: 'I had a chest X-ray and would like help understanding the results.',
          status: 'RESOLVED',
          communicationChannel: 'video',
          createdAt: '2025-03-01T14:45:00Z',
          completedAt: '2025-03-02T16:30:00Z',
          rating: 4,
          feedback: 'Good explanation, helped me understand what to ask my doctor.',
          patientId: 'p9',
          medicalStudentId,
          documents: ['d8'],
          medicalStudentNotes: 'Reviewed chest X-ray showing minor infiltrates in lower right lobe, consistent with bronchitis.'
        },
        {
          id: 'c10',
          type: 'general',
          primaryConcern: 'Nutrition advice for diabetes',
          description: 'I was recently diagnosed with Type 2 diabetes and need help understanding dietary changes.',
          status: 'CLOSED',
          communicationChannel: 'async',
          createdAt: '2025-02-20T10:15:00Z',
          completedAt: '2025-02-25T09:45:00Z',
          rating: 5,
          feedback: 'Excellent nutritional advice with practical meal suggestions.',
          patientId: 'p10',
          medicalStudentId,
          medicalStudentNotes: 'Provided information on low-glycemic diet, recommended consulting with dietitian.'
        }
      ] as Consultation[];
      
      setAvailableConsultations(mockAvailableConsultations);
      setAssignedConsultations(mockAssignedConsultations);
      setCompletedConsultations(mockCompletedConsultations);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch consultations');
      setError(error);
      console.error('Error fetching consultations:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Accept a consultation request
   */
  const acceptConsultation = async (consultationId: string): Promise<void> => {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find the consultation
      const consultation = availableConsultations.find(c => c.id === consultationId);
      
      if (!consultation) {
        throw new Error('Consultation not found');
      }
      
      // Update the consultation status
      const updatedConsultation = {
        ...consultation,
        status: 'ASSIGNED' as const,
        updatedAt: new Date().toISOString(),
        medicalStudentId: 'ms1' // Mock medical student ID
      };
      
      // Update state
      setAvailableConsultations(prev => prev.filter(c => c.id !== consultationId));
      setAssignedConsultations(prev => [...prev, updatedConsultation]);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to accept consultation');
      console.error('Error accepting consultation:', err);
      throw error;
    }
  };

  /**
   * Decline a consultation request
   */
  const declineConsultation = async (consultationId: string): Promise<void> => {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove the consultation from available consultations
      setAvailableConsultations(prev => prev.filter(c => c.id !== consultationId));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to decline consultation');
      console.error('Error declining consultation:', err);
      throw error;
    }
  };

  /**
   * Update consultation status
   */
  const updateConsultationStatus = async (
    consultationId: string, 
    status: 'SCHEDULED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
  ): Promise<void> => {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find the consultation
      const consultation = [...assignedConsultations, ...completedConsultations].find(c => c.id === consultationId);
      
      if (!consultation) {
        throw new Error('Consultation not found');
      }
      
      // Update fields based on the new status
      const updatedConsultation = {
        ...consultation,
        status,
        updatedAt: new Date().toISOString()
      };
      
      // For RESOLVED or CLOSED, add completedAt
      if (status === 'RESOLVED' || status === 'CLOSED') {
        (updatedConsultation as any).completedAt = new Date().toISOString();
      }
      
      // Update state based on status
      if (status === 'RESOLVED' || status === 'CLOSED') {
        setAssignedConsultations(prev => prev.filter(c => c.id !== consultationId));
        setCompletedConsultations(prev => [...prev, updatedConsultation]);
      } else {
        setAssignedConsultations(prev => 
          prev.map(c => c.id === consultationId ? updatedConsultation : c)
        );
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update consultation status');
      console.error('Error updating consultation status:', err);
      throw error;
    }
  };

  return {
    availableConsultations,
    assignedConsultations,
    completedConsultations,
    loading,
    error,
    fetchConsultations,
    acceptConsultation,
    declineConsultation,
    updateConsultationStatus
  };
};

export default useMedicalStudentConsultations;