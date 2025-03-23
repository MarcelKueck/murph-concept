/**
 * Hook for managing documents
 */
import { useState } from 'react';

// Type definitions
interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  userId: string;
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

  /**
   * Fetch documents for a specific user
   */
  const fetchDocuments = async (userId: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // Mock data for demonstration
      const mockDocuments: Document[] = [
        {
          id: 'd1',
          name: 'Blood Test Results.pdf',
          type: 'PDF Document',
          url: '/mock-documents/blood-test.pdf',
          uploadedAt: '2025-01-15T10:30:00Z',
          userId
        },
        {
          id: 'd2',
          name: 'MRI Scan Report.pdf',
          type: 'PDF Document',
          url: '/mock-documents/mri-scan.pdf',
          uploadedAt: '2025-02-03T14:45:00Z',
          userId
        },
        {
          id: 'd3',
          name: 'Doctor Referral.docx',
          type: 'Word Document',
          url: '/mock-documents/referral.docx',
          uploadedAt: '2025-02-10T09:15:00Z',
          userId
        },
        {
          id: 'd4',
          name: 'Medication List.xlsx',
          type: 'Excel Spreadsheet',
          url: '/mock-documents/medications.xlsx',
          uploadedAt: '2025-02-18T16:20:00Z',
          userId
        },
        {
          id: 'd5',
          name: 'Allergy Report.pdf',
          type: 'PDF Document',
          url: '/mock-documents/allergy.pdf',
          uploadedAt: '2025-03-01T11:10:00Z',
          userId
        }
      ];
      
      setDocuments(mockDocuments);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch documents'));
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Upload a new document
   */
  const uploadDocument = async (
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
  };

  /**
   * Delete a document
   */
  const deleteDocument = async (id: string): Promise<void> => {
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
  };

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