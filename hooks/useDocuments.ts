/**
 * Hook for managing documents
 */
import { useState, useCallback, useRef } from 'react';

// Type definitions
interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  userId: string;
  description?: string;
  fileSize?: string;
  pages?: number;
  source?: string;
  isShared?: boolean;
}

interface UseDocumentsReturn {
  /**
   * List of documents
   */
  documents: Document[];
  /**
   * Loading state
   */
  loading: boolean;
  /**
   * Error state
   */
  error: Error | null;
  /**
   * Fetch documents for a specific user
   */
  fetchDocuments: (userId: string) => Promise<void>;
  /**
   * Upload a new document
   */
  uploadDocument: (document: Omit<Document, 'id' | 'uploadedAt'>) => Promise<Document>;
  /**
   * Delete a document
   */
  deleteDocument: (id: string) => Promise<void>;
}

/**
 * Hook for document management
 * @returns Document state and functions
 */
const useDocuments = (): UseDocumentsReturn => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const fetchedRef = useRef<{[key: string]: boolean}>({});

  /**
   * Fetch documents for a specific user
   */
  const fetchDocuments = useCallback(async (userId: string): Promise<void> => {
    // Skip if already fetched for this user
    if (fetchedRef.current[userId]) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Rich mock documents data
      const mockDocuments: Document[] = [
        // Maria Schmidt (p1) - Cholesterol and basic health documents
        {
          id: 'd1',
          name: 'Blood Test Results - March 2025',
          type: 'lab_result',
          url: '/mock-documents/lab_result_p1_march.pdf',
          uploadedAt: '2025-03-19T16:45:00.000Z',
          userId: 'p1',
          description: 'Complete lipid panel showing total cholesterol 240 mg/dL, LDL 160 mg/dL, HDL 45 mg/dL, triglycerides 175 mg/dL',
          fileSize: '1.4 MB',
          pages: 3,
          source: 'Labor Berlin - Charité Vivantes GmbH',
          isShared: true
        },
        {
          id: 'd2',
          name: 'Medication Information Sheet - Atorvastatin',
          type: 'medication_info',
          url: '/mock-documents/medication_info_p1.pdf',
          uploadedAt: '2025-03-21T09:15:00.000Z',
          userId: 'p1',
          description: 'Information about cholesterol-lowering medication, dosing guidelines, possible side effects, and drug interactions',
          fileSize: '560 KB',
          pages: 2,
          source: 'University Hospital Pharmacy',
          isShared: true
        },
        {
          id: 'd14',
          name: 'Complete Blood Count Results - March 2025',
          type: 'lab_result',
          url: '/mock-documents/cbc_p1_march.pdf',
          uploadedAt: '2025-03-19T16:50:00.000Z',
          userId: 'p1',
          description: 'CBC showing normal white blood cell count, hemoglobin, and platelets with slight elevation in eosinophils',
          fileSize: '750 KB',
          pages: 2,
          source: 'Labor Berlin - Charité Vivantes GmbH',
          isShared: true
        },
        {
          id: 'd23',
          name: 'Lipid-Lowering Diet Plan',
          type: 'education',
          url: '/mock-documents/diet_plan_p1.pdf',
          uploadedAt: '2025-03-20T11:30:00.000Z',
          userId: 'p1',
          description: 'Nutritionist-recommended meal plans and dietary guidelines to help reduce cholesterol levels naturally',
          fileSize: '1.7 MB',
          pages: 8,
          source: 'Nutritional Medicine Department, University Hospital',
          isShared: true
        },
        {
          id: 'd24',
          name: 'Exercise Stress Test Results - January 2025',
          type: 'lab_result',
          url: '/mock-documents/stress_test_p1.pdf',
          uploadedAt: '2025-01-25T14:20:00.000Z',
          userId: 'p1',
          description: 'Treadmill stress test showing good exercise tolerance to 9.7 METS with no ischemic changes or significant arrhythmias',
          fileSize: '1.2 MB',
          pages: 3,
          source: 'Cardiology Department, University Hospital',
          isShared: true
        },
        
        // Thomas Weber (p2) - Diabetes documents
        {
          id: 'd16',
          name: 'Glucose Monitoring Log - March 2025',
          type: 'lab_result',
          url: '/mock-documents/glucose_log_p2_march.pdf',
          uploadedAt: '2025-03-15T09:30:00.000Z',
          userId: 'p2',
          description: 'Two-week log of blood glucose readings showing fasting levels between 126-145 mg/dL and post-meal peaks of 180-210 mg/dL',
          fileSize: '780 KB',
          pages: 3,
          source: 'Self-monitored with Accu-Chek Guide',
          isShared: true
        },
        {
          id: 'd17',
          name: 'Diabetes Education Materials',
          type: 'education',
          url: '/mock-documents/diabetes_education_p2.pdf',
          uploadedAt: '2025-03-12T14:20:00.000Z',
          userId: 'p2',
          description: 'Information packet about managing Type 2 Diabetes, including diet recommendations, exercise guidelines, and glucose monitoring',
          fileSize: '3.2 MB',
          pages: 12,
          source: 'Diabetes Education Center, University Hospital',
          isShared: true
        },
        {
          id: 'd18',
          name: 'Metformin Medication Guide',
          type: 'medication_info',
          url: '/mock-documents/metformin_guide_p2.pdf',
          uploadedAt: '2025-03-10T11:45:00.000Z',
          userId: 'p2',
          description: 'Detailed information about Metformin, including dosing, potential side effects, drug interactions, and monitoring requirements',
          fileSize: '920 KB',
          pages: 4,
          source: 'University Hospital Pharmacy',
          isShared: true
        },
        
        // Anna Becker (p3) - Asthma/respiratory documents
        {
          id: 'd3',
          name: 'Chest X-Ray Report - February 2025',
          type: 'imaging',
          url: '/mock-documents/xray_p3_feb.pdf',
          uploadedAt: '2025-02-28T14:20:00.000Z',
          userId: 'p3',
          description: 'Posteroanterior and lateral chest radiographs showing slight opacity in the right lower lobe, otherwise normal lung fields',
          fileSize: '2.1 MB',
          pages: 1,
          source: 'Radiology Department, Charité University Hospital',
          isShared: true
        },
        {
          id: 'd15',
          name: 'Hospital Discharge Summary - February 2025',
          type: 'hospital_report',
          url: '/mock-documents/discharge_p3.pdf',
          uploadedAt: '2025-03-01T17:15:00.000Z',
          userId: 'p3',
          description: 'Summary of 3-day hospitalization for acute asthma exacerbation with treatment protocol and follow-up recommendations',
          fileSize: '1.6 MB',
          pages: 5,
          source: 'Pulmonology Department, Charité University Hospital',
          isShared: true
        },
        {
          id: 'd19',
          name: 'Pulmonary Function Test Results - February 2025',
          type: 'lab_result',
          url: '/mock-documents/pft_p3_feb.pdf',
          uploadedAt: '2025-02-25T13:40:00.000Z',
          userId: 'p3',
          description: 'Spirometry showing moderate obstruction with FEV1 75% of predicted and FEV1/FVC ratio of 0.68, with significant bronchodilator response',
          fileSize: '1.3 MB',
          pages: 3,
          source: 'Pulmonary Function Laboratory, University Hospital',
          isShared: true
        },
        {
          id: 'd20',
          name: 'Asthma Action Plan - February 2025',
          type: 'care_plan',
          url: '/mock-documents/asthma_plan_p3.pdf',
          uploadedAt: '2025-02-26T16:15:00.000Z',
          userId: 'p3',
          description: 'Personalized asthma management plan detailing daily medications, rescue treatments, and when to seek emergency care',
          fileSize: '650 KB',
          pages: 2,
          source: 'Dr. Sophia Klein, Pulmonology Department',
          isShared: true
        },
        
        // Klaus Hoffmann (p4) - Cardiovascular documents
        {
          id: 'd4',
          name: 'Cardiology Consultation Notes - March 2025',
          type: 'specialist_report',
          url: '/mock-documents/cardio_report_p4.pdf',
          uploadedAt: '2025-03-15T10:30:00.000Z',
          userId: 'p4',
          description: 'Evaluation of coronary artery disease with recommendation for ACE inhibitor therapy and regular blood pressure monitoring',
          fileSize: '875 KB',
          pages: 4,
          source: 'Dr. Heinrich Müller, Department of Cardiology',
          isShared: true
        },
        {
          id: 'd11',
          name: 'Prescription - Ramipril 5mg',
          type: 'prescription',
          url: '/mock-documents/prescription_p4_ramipril.pdf',
          uploadedAt: '2025-03-15T11:00:00.000Z',
          userId: 'p4',
          description: 'Prescription for ACE inhibitor to treat hypertension and protect kidney function, 5mg daily',
          fileSize: '350 KB',
          pages: 1,
          source: 'Dr. Heinrich Müller, Department of Cardiology',
          isShared: true
        },
        {
          id: 'd21',
          name: 'ECG Report - March 2025',
          type: 'lab_result',
          url: '/mock-documents/ecg_p4_march.pdf',
          uploadedAt: '2025-03-14T10:15:00.000Z',
          userId: 'p4',
          description: '12-lead electrocardiogram showing normal sinus rhythm with nonspecific ST-T wave changes in inferior leads',
          fileSize: '850 KB',
          pages: 2,
          source: 'Cardiology Department, University Hospital',
          isShared: true
        },
        {
          id: 'd22',
          name: 'Blood Pressure Log - February-March 2025',
          type: 'patient_record',
          url: '/mock-documents/bp_log_p4.pdf',
          uploadedAt: '2025-03-13T16:20:00.000Z',
          userId: 'p4',
          description: 'Four-week record of home blood pressure measurements showing average readings of 145/92 mmHg',
          fileSize: '420 KB',
          pages: 2,
          source: 'Self-monitored with Omron BP monitor',
          isShared: true
        },
        
        // Additional patient documents for medical students
        {
          id: 'd5',
          name: 'Thyroid Function Test Results - March 2025',
          type: 'lab_result',
          url: '/mock-documents/thyroid_test_p5.pdf',
          uploadedAt: '2025-03-10T15:45:00.000Z',
          userId: 'p5',
          description: 'Results showing borderline elevated TSH (4.8 mIU/L) with normal T3 and T4 levels, suggestive of subclinical hypothyroidism',
          fileSize: '980 KB',
          pages: 2,
          source: 'Endocrinology Lab, University Hospital',
          isShared: true
        },
        {
          id: 'd6',
          name: 'MRI Knee Report - March 2025',
          type: 'imaging',
          url: '/mock-documents/mri_knee_p6.pdf',
          uploadedAt: '2025-03-05T09:15:00.000Z',
          userId: 'p6',
          description: 'MRI showing Grade II medial meniscal tear and partial ACL sprain with minor joint effusion',
          fileSize: '3.2 MB',
          pages: 2,
          source: 'Sports Medicine Imaging Center',
          isShared: true
        },
        {
          id: 'd7',
          name: 'Allergy Test Results - March 2025',
          type: 'lab_result',
          url: '/mock-documents/allergy_test_p7.pdf',
          uploadedAt: '2025-03-17T11:20:00.000Z',
          userId: 'p7',
          description: 'Skin prick test results showing positive reactions to tree pollen, dust mites, and cat dander with IgE levels',
          fileSize: '1.1 MB',
          pages: 3,
          source: 'Allergy & Immunology Clinic',
          isShared: true
        },
        {
          id: 'd8',
          name: 'Vitamin D and Mineral Panel - March 2025',
          type: 'lab_result',
          url: '/mock-documents/vitamin_panel_p8.pdf',
          uploadedAt: '2025-03-20T16:30:00.000Z',
          userId: 'p8',
          description: 'Blood test showing Vitamin D deficiency (15 ng/mL) and low B12 levels (190 pg/mL) with normal iron levels',
          fileSize: '890 KB',
          pages: 2,
          source: 'Nutritional Health Laboratory',
          isShared: true
        },
        {
          id: 'd12',
          name: 'Ultrasound Thyroid Report - March 2025',
          type: 'imaging',
          url: '/mock-documents/ultrasound_thyroid_p5.pdf',
          uploadedAt: '2025-03-11T10:30:00.000Z',
          userId: 'p5',
          description: 'Thyroid ultrasound showing small 7mm hypoechoic nodule in right lobe, classified as TIRADS 3 (low suspicion)',
          fileSize: '2.8 MB',
          pages: 2,
          source: 'Radiology Department, University Hospital',
          isShared: true
        },
        {
          id: 'd13',
          name: 'Physical Therapy Recommendation - Knee Rehabilitation',
          type: 'referral',
          url: '/mock-documents/physio_referral_p6.pdf',
          uploadedAt: '2025-03-06T14:20:00.000Z',
          userId: 'p6',
          description: 'Physical therapy plan for knee rehabilitation following meniscal tear, including exercise regimen and progress tracking',
          fileSize: '980 KB',
          pages: 4,
          source: 'Sports Medicine Clinic',
          isShared: true
        }
      ];
      
      // Filter by userId
      const userDocuments = mockDocuments.filter(doc => doc.userId === userId);
      
      // Mark as fetched to prevent duplicate fetches
      fetchedRef.current[userId] = true;
      
      setDocuments(userDocuments);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch documents'));
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Upload a new document
   */
  const uploadDocument = useCallback(async (
    documentData: Omit<Document, 'id' | 'uploadedAt'>
  ): Promise<Document> => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call with file upload
      // For demo, create a mock document
      const newDocument: Document = {
        ...documentData,
        id: `d${Date.now()}`,
        uploadedAt: new Date().toISOString()
      };
      
      setDocuments(prev => [...prev, newDocument]);
      return newDocument;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to upload document');
      setError(error);
      console.error('Error uploading document:', err);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete a document
   */
  const deleteDocument = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete document');
      setError(error);
      console.error('Error deleting document:', err);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    uploadDocument,
    deleteDocument
  };
};

export default useDocuments;