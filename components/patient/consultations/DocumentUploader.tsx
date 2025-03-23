// components/patient/consultations/DocumentUploader.tsx
'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '../../../providers/AuthProvider';
import useDocuments from '../../../hooks/useDocuments';

import Button from '../../ui/buttons/Button';
import { Alert } from '../../ui/modal/Alert';

interface DocumentUploaderProps {
  /**
   * Callback when a document is uploaded
   */
  onUploadComplete?: (documentId: string) => void;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  onUploadComplete
}) => {
  const t = useTranslations('patient.documents');
  const c = useTranslations('common');
  
  const { user } = useAuthContext();
  const { uploadDocument, loading } = useDocuments();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setError(null);
  };
  
  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0] || null;
    setSelectedFile(file);
    setError(null);
  };
  
  // Handle upload
  const handleUpload = async () => {
    if (!selectedFile || !user?.id) {
      setError(t('fileRequired'));
      return;
    }
    
    try {
      // Get file extension
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase() || '';
      
      // Determine file type
      let fileType = 'Unknown Document';
      if (['pdf'].includes(fileExtension)) {
        fileType = 'PDF Document';
      } else if (['doc', 'docx'].includes(fileExtension)) {
        fileType = 'Word Document';
      } else if (['xls', 'xlsx'].includes(fileExtension)) {
        fileType = 'Excel Spreadsheet';
      } else if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
        fileType = 'Image';
      }
      
      // In a real app, we would upload the file to a server here
      // For demo purposes, we're just creating a mock document
      const newDocument = await uploadDocument({
        name: selectedFile.name,
        type: fileType,
        url: '/mock-document-url',
        userId: user.id
      });
      
      // Reset state
      setSelectedFile(null);
      
      // Call callback
      if (onUploadComplete) {
        onUploadComplete(newDocument.id);
      }
    } catch (err) {
      setError(c.errors.general);
      console.error('Error uploading document:', err);
    }
  };
  
  return (
    <div>
      {error && (
        <Alert
          variant="error"
          message={error}
          className="mb-4"
          dismissible
          onDismiss={() => setError(null)}
        />
      )}
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? 'border-primary-500 bg-primary-50' : 'border-neutral-300'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-neutral-400 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        <p className="text-neutral-600 mb-3">{t('dropPrompt')}</p>
        
        <div className="flex justify-center mb-3">
          <label className="cursor-pointer">
            <span className="bg-primary-50 text-primary-600 px-4 py-2 rounded-md border border-primary-200 hover:bg-primary-100 transition">
              {t('selectFile')}
            </span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            />
          </label>
        </div>
        
        <p className="text-sm text-neutral-500">{t('supportedFormats')}</p>
      </div>
      
      {selectedFile && (
        <div className="mt-4 p-3 bg-neutral-50 border border-neutral-200 rounded-lg flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-neutral-900">{selectedFile.name}</span>
          </div>
          
          <div className="flex space-x-2">
            <Button
              size="small"
              variant="secondary"
              onClick={() => setSelectedFile(null)}
            >
              {c.actions.cancel}
            </Button>
            
            <Button
              size="small"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? c.status.loading : c.actions.upload}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};