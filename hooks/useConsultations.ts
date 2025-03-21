/**
 * Hook for managing consultations
 */
import { useState } from 'react';

// Type definitions based on technical specifications
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
  patientId: string;
  medicalStudentId?: string;
  documents?: string[];
}

interface UseConsultationsReturn {
  /**
   * List of consultations
   */
  consultations: Consultation[];
  /**
   * Loading state
   */
  loading: boolean;
  /**
   * Error state
   */
  error: Error | null;
  /**
   * Fetch consultations for a specific user
   */
  fetchConsultations: (userId: string, role: 'PATIENT' | 'MEDICAL_STUDENT') => Promise<void>;
  /**
   * Create a new consultation
   */
  createConsultation: (consultation: Omit<Consultation, 'id' | 'createdAt' | 'status'>) => Promise<Consultation>;
  /**
   * Update an existing consultation
   */
  updateConsultation: (id: string, updates: Partial<Consultation>) => Promise<Consultation>;
}

/**
 * Hook for consultation management
 * @returns Consultation state and functions
 */
const useConsultations = (): UseConsultationsReturn => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Fetch consultations for a specific user
   */
  const fetchConsultations = async (userId: string, role: 'PATIENT' | 'MEDICAL_STUDENT'): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // Here we'll import mock data
      const response = await import('../mock-data/consultations/consultations.json');
      const allConsultations: Consultation[] = response.default;
      
      // Filter consultations based on user role
      const filteredConsultations = allConsultations.filter(consultation => {
        if (role === 'PATIENT') {
          return consultation.patientId === userId;
        } else {
          return consultation.medicalStudentId === userId;
        }
      });
      
      setConsultations(filteredConsultations);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch consultations'));
      console.error('Error fetching consultations:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create a new consultation
   */
  const createConsultation = async (
    consultationData: Omit<Consultation, 'id' | 'createdAt' | 'status'>
  ): Promise<Consultation> => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For demo, we'll create a mock consultation
      const newConsultation: Consultation = {
        ...consultationData,
        id: `c${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'REQUESTED'
      };
      
      setConsultations(prev => [...prev, newConsultation]);
      return newConsultation;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create consultation');
      setError(error);
      console.error('Error creating consultation:', err);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update an existing consultation
   */
  const updateConsultation = async (
    id: string, 
    updates: Partial<Consultation>
  ): Promise<Consultation> => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const updatedConsultations = consultations.map(consultation => {
        if (consultation.id === id) {
          return { ...consultation, ...updates };
        }
        return consultation;
      });
      
      setConsultations(updatedConsultations);
      
      const updatedConsultation = updatedConsultations.find(c => c.id === id);
      if (!updatedConsultation) {
        throw new Error('Consultation not found');
      }
      
      return updatedConsultation;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update consultation');
      setError(error);
      console.error('Error updating consultation:', err);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    consultations,
    loading,
    error,
    fetchConsultations,
    createConsultation,
    updateConsultation
  };
};

export default useConsultations;
