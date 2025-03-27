/**
 * Hook for managing consultations
 */
import { useState, useCallback, useRef } from 'react';

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
  const fetchedRef = useRef<{[key: string]: boolean}>({});

  /**
   * Fetch consultations for a specific user
   */
  const fetchConsultations = useCallback(async (userId: string, role: 'PATIENT' | 'MEDICAL_STUDENT'): Promise<void> => {
    // Create a unique key for this user+role combination
    const fetchKey = `${userId}-${role}`;
    
    // Skip if already fetched for this user and role
    if (fetchedRef.current[fetchKey]) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Rich mock consultations data
      const mockConsultations: Consultation[] = [
        // Maria Schmidt (p1) - Cholesterol consultations
        {
          id: 'c1',
          type: 'labResult',
          primaryConcern: 'Understanding my high cholesterol results',
          description: 'My recent blood test shows a total cholesterol of 240 mg/dL. My doctor mentioned this is high but didn\'t explain what it means for my health. I\'d like to understand these results and what lifestyle changes might help.',
          status: 'SCHEDULED',
          communicationChannel: 'video',
          scheduledFor: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
          createdAt: '2025-03-15T10:30:00Z',
          patientId: 'p1',
          medicalStudentId: 'ms1',
          documents: ['d1', 'd14']
        },
        {
          id: 'c2',
          type: 'medication',
          primaryConcern: 'Questions about cholesterol medication options',
          description: 'My doctor suggested I might need to start medication for high cholesterol if lifestyle changes don\'t bring it down. I\'d like to understand the different medication options, how they work, and potential side effects.',
          status: 'REQUESTED',
          communicationChannel: 'text',
          createdAt: '2025-03-21T14:45:00Z',
          patientId: 'p1',
          documents: ['d2']
        },
        
        // Thomas Weber (p2) - Diabetes consultations
        {
          id: 'c3',
          type: 'labResult',
          primaryConcern: 'Help understanding my glucose readings',
          description: 'I was recently diagnosed with Type 2 Diabetes and have been monitoring my blood sugar at home. I\'m confused about what my readings mean and what target ranges I should aim for.',
          status: 'IN_PROGRESS',
          communicationChannel: 'audio',
          scheduledFor: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
          createdAt: '2025-03-18T09:15:00Z',
          patientId: 'p2',
          medicalStudentId: 'ms2',
          documents: ['d16', 'd17']
        },
        {
          id: 'c4',
          type: 'medication',
          primaryConcern: 'Side effects from Metformin',
          description: 'I started taking Metformin for diabetes and I\'m experiencing nausea and dizziness. I want to know if these side effects are normal and how long they usually last.',
          status: 'RESOLVED',
          communicationChannel: 'text',
          createdAt: '2025-03-12T16:20:00Z',
          completedAt: '2025-03-14T11:45:00Z',
          patientId: 'p2',
          medicalStudentId: 'ms1',
          documents: ['d18'],
          rating: 5,
          feedback: 'Very helpful explanation about Metformin side effects and suggestions for minimizing them.'
        },
        
        // Anna Becker (p3) - Asthma consultations
        {
          id: 'c5',
          type: 'imaging',
          primaryConcern: 'Chest X-ray results explanation',
          description: 'I had a chest X-ray due to persistent coughing with my asthma. The report mentions "slight opacity" in my right lung, and I\'d like to understand what this means.',
          status: 'SCHEDULED',
          communicationChannel: 'video',
          scheduledFor: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
          createdAt: '2025-03-22T14:25:00Z',
          patientId: 'p3',
          medicalStudentId: 'ms3',
          documents: ['d3', 'd15', 'd19']
        },
        {
          id: 'c6',
          type: 'general',
          primaryConcern: 'Asthma action plan review',
          description: 'I was recently hospitalized for an asthma attack and received a new asthma action plan. I\'d like to go through it to make sure I understand when to take which medications.',
          status: 'CLOSED',
          communicationChannel: 'async',
          createdAt: '2025-02-26T10:30:00Z',
          completedAt: '2025-03-01T15:45:00Z',
          patientId: 'p3',
          medicalStudentId: 'ms2',
          documents: ['d20'],
          rating: 4,
          feedback: 'Good explanation of my asthma plan.'
        },
        
        // Klaus Hoffmann (p4) - Heart related consultations
        {
          id: 'c7',
          type: 'medication',
          primaryConcern: 'Understanding my heart medication',
          description: 'I\'ve been prescribed Ramipril for hypertension and I\'m experiencing some dizziness when I stand up. I\'d like to understand how this medication works and if the dizziness is normal.',
          status: 'IN_PROGRESS',
          communicationChannel: 'audio',
          scheduledFor: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          createdAt: '2025-03-18T09:40:00Z',
          patientId: 'p4',
          medicalStudentId: 'ms1',
          documents: ['d11', 'd22']
        },
        {
          id: 'c8',
          type: 'labResult',
          primaryConcern: 'ECG results interpretation',
          description: 'I had an ECG as part of my heart check-up. The doctor said it shows "nonspecific ST-T wave changes" but didn\'t explain what that means. I\'d like to understand these results.',
          status: 'REQUESTED',
          communicationChannel: 'video',
          createdAt: '2025-03-23T11:20:00Z',
          patientId: 'p4',
          documents: ['d21']
        },
        
        // For Medical Students - Additional Consultations
        {
          id: 'c9',
          type: 'labResult',
          primaryConcern: 'Thyroid test results interpretation',
          description: 'My thyroid tests show borderline results and I\'m not sure what this means for my health. I have an ultrasound showing a small nodule as well.',
          status: 'ASSIGNED',
          communicationChannel: 'async',
          createdAt: '2025-03-15T11:20:00Z',
          patientId: 'p5',
          medicalStudentId: 'ms1',
          documents: ['d5', 'd12']
        },
        {
          id: 'c10',
          type: 'imaging',
          primaryConcern: 'MRI knee results explanation',
          description: 'I had an MRI for knee pain and the report mentions a "meniscal tear" and "partial ACL sprain". I\'d like to understand what this means for my recovery.',
          status: 'SCHEDULED',
          communicationChannel: 'video',
          scheduledFor: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
          createdAt: '2025-03-08T10:15:00Z',
          patientId: 'p6',
          medicalStudentId: 'ms1',
          documents: ['d6', 'd13']
        },
        {
          id: 'c11',
          type: 'general',
          primaryConcern: 'Understanding my allergy test results',
          description: 'I recently had allergy testing that showed reactions to multiple allergens. I\'d like to understand the results and what I can do to manage my symptoms.',
          status: 'REQUESTED',
          communicationChannel: 'text',
          createdAt: '2025-03-20T13:40:00Z',
          patientId: 'p7',
          documents: ['d7']
        },
        {
          id: 'c12',
          type: 'labResult',
          primaryConcern: 'Vitamin deficiency questions',
          description: 'My blood work shows I\'m low in Vitamin D and B12. I want to understand what this means and how to address these deficiencies.',
          status: 'RESOLVED',
          communicationChannel: 'audio',
          createdAt: '2025-03-21T14:50:00Z',
          completedAt: '2025-03-22T10:15:00Z',
          patientId: 'p8',
          medicalStudentId: 'ms1',
          documents: ['d8'],
          rating: 5,
          feedback: 'Excellent explanation of my vitamin deficiencies and clear recommendations for supplements.'
        }
      ];
      
      // Filter consultations based on user role
      let filteredConsultations: Consultation[] = [];
      
      if (role === 'PATIENT') {
        filteredConsultations = mockConsultations.filter(c => c.patientId === userId);
      } else {
        filteredConsultations = mockConsultations.filter(c => c.medicalStudentId === userId || c.status === 'REQUESTED');
      }
      
      // Mark as fetched to prevent duplicate fetches
      fetchedRef.current[fetchKey] = true;
      
      setConsultations(filteredConsultations);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch consultations'));
      console.error('Error fetching consultations:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new consultation
   */
  const createConsultation = useCallback(async (
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
  }, []);

  /**
   * Update an existing consultation
   */
  const updateConsultation = useCallback(async (
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
  }, [consultations]);

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