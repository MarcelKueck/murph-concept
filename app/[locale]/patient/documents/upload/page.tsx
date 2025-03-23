'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '../../../../../providers/AuthProvider';

import { PageContainer } from '../../../../../components/ui/layout/PageContainer';
import { PageHeader } from '../../../../../components/ui/layout/PageHeader';
import { Card } from '../../../../../components/ui/cards/Card';
import Button from '../../../../../components/ui/buttons/Button';
import { Input } from '../../../../../components/ui/forms/Input';
import { Select } from '../../../../../components/ui/forms/Select';
import { Alert } from '../../../../../components/ui/modal/Alert';

export default function UploadDocumentPage() {
  const router = useRouter();
  
  // Try to get translations but use fallbacks if they're missing
  let t = {};
  try {
    t = useTranslations('patient.documents');
  } catch (e) {
    console.warn("Could not load patient.documents translations, using fallbacks");
  }

  // Create a safe translation function that uses fallbacks
  const getSafeTranslation = (key, fallback) => {
    try {
      // @ts-ignore - dynamic key access
      return t[key] || fallback;
    } catch (e) {
      return fallback;
    }
  };
  
  // Safe common translations
  let commonActions = {};
  try {
    commonActions = useTranslations('common.actions');
  } catch (e) {
    console.warn("Could not load common.actions translations, using fallbacks");
  }

  // Create a safe common action accessor
  const getAction = (key, fallback) => {
    try {
      // @ts-ignore - dynamic key access
      return commonActions[key] || fallback;
    } catch (e) {
      return fallback;
    }
  };
  
  // Document type options with fallbacks
  const documentTypes = [
    { value: 'labResult', label: 'Lab Result' },
    { value: 'prescription', label: 'Prescription' },
    { value: 'imaging', label: 'Imaging (X-ray, MRI, etc.)' },
    { value: 'referral', label: 'Referral Letter' },
    { value: 'discharge', label: 'Discharge Summary' },
    { value: 'other', label: 'Other Document' }
  ];
  
  // Auth context with safe access
  const auth = useAuthContext();
  
  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState<string>('');
  const [documentType, setDocumentType] = useState<string>('');
  const [dragActive, setDragActive] = useState<boolean>(false);
  
  // Loading and error state
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  // Only proceed if we have authentication
  useEffect(() => {
    // Check if auth is defined
    if (auth === undefined) {
      return;
    }
    
    // If user is not authenticated and we're not loading, redirect to login
    if (!auth.user && !auth.loading) {
      router.push('/auth/login');
    }
    
    // Set local loading state based on auth loading
    setIsLoading(auth.loading);
  }, [auth, router]);
  
  // File selection handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };
  
  // Process the selected file
  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    
    // Auto-fill document name from file name
    const fileName = selectedFile.name;
    const nameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
    setDocumentName(nameWithoutExtension);
    
    // Create a preview if it's an image
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
    
    // Try to determine document type from filename
    const lowerFileName = fileName.toLowerCase();
    if (lowerFileName.includes('lab') || lowerFileName.includes('test') || lowerFileName.includes('result')) {
      setDocumentType('labResult');
    } else if (lowerFileName.includes('prescription') || lowerFileName.includes('medication')) {
      setDocumentType('prescription');
    } else if (lowerFileName.includes('xray') || lowerFileName.includes('mri') || lowerFileName.includes('scan')) {
      setDocumentType('imaging');
    } else if (lowerFileName.includes('referral')) {
      setDocumentType('referral');
    } else if (lowerFileName.includes('discharge') || lowerFileName.includes('summary')) {
      setDocumentType('discharge');
    } else {
      setDocumentType('other');
    }
  };
  
  // Drag and drop handlers
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  // Upload the document
  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    if (!documentName.trim()) {
      setError('Please enter a document name');
      return;
    }
    
    if (!documentType) {
      setError('Please select a document type');
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For demo, simulate success after a short delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success
      setSuccess(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setFile(null);
        setFilePreview(null);
        setDocumentName('');
        setDocumentType('');
        setSuccess(false);
        
        // Redirect back to documents page
        router.push('/patient/documents');
      }, 2000);
    } catch (err) {
      setError('An error occurred while uploading the document');
      console.error('Error uploading document:', err);
    } finally {
      setIsUploading(false);
    }
  };
  
  // Handle loading state
  if (isLoading || !auth || !auth.user) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-64">
          <div className="text-neutral-500">Loading...</div>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <PageHeader 
        title={getSafeTranslation('uploadTitle', 'Upload Document')}
        breadcrumbs={[
          { href: '/patient/dashboard', label: 'Dashboard' },
          { href: '/patient/documents', label: 'Documents' },
          { label: 'Upload' }
        ]}
      />
      
      <Card
        title={getSafeTranslation('uploadDocument', 'Upload Document')}
        footer={
          <div className="flex justify-between">
            <Button
              variant="secondary"
              onClick={() => router.push('/patient/documents')}
            >
              {getAction('cancel', 'Cancel')}
            </Button>
            
            <Button
              onClick={handleUpload}
              disabled={isUploading || success || !file}
            >
              {isUploading ? 'Uploading...' : getAction('upload', 'Upload')}
            </Button>
          </div>
        }
      >
        <p className="text-neutral-600 mb-6">
          {getSafeTranslation('uploadInstructions', 'Upload documents to share with medical students during consultations. Supported formats include PDF, Word, Excel, and images.')}
        </p>
        
        {error && (
          <Alert
            variant="error"
            message={error}
            className="mb-6"
            dismissible
            onDismiss={() => setError(null)}
          />
        )}
        
        {success && (
          <Alert
            variant="success"
            message={getSafeTranslation('uploadSuccess', 'Document uploaded successfully')}
            className="mb-6"
          />
        )}
        
        {/* File drop zone */}
        {!file && (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center mb-6 ${
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
            
            <p className="text-neutral-600 mb-3">
              {getSafeTranslation('dropPrompt', 'Drag and drop your file here, or')}
            </p>
            
            <div className="flex justify-center mb-3">
              <label className="cursor-pointer">
                <span className="bg-primary-50 text-primary-600 px-4 py-2 rounded-md border border-primary-200 hover:bg-primary-100 transition">
                  {getSafeTranslation('selectFile', 'Select File')}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                />
              </label>
            </div>
            
            <p className="text-sm text-neutral-500">
              {getSafeTranslation('supportedFormats', 'Supported formats: PDF, Word, Excel, JPG, PNG')}
            </p>
          </div>
        )}
        
        {/* Selected file preview */}
        {file && (
          <div className="mb-6">
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-neutral-500 mr-3">
                  {filePreview ? (
                    <img 
                      src={filePreview} 
                      alt="Preview" 
                      className="h-16 w-16 object-cover rounded" 
                    />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium">{file.name}</h3>
                  <p className="text-sm text-neutral-500">
                    {`${(file.size / 1024).toFixed(2)} KB • ${file.type || 'Unknown type'}`}
                  </p>
                </div>
                
                <Button
                  variant="tertiary"
                  size="small"
                  onClick={() => {
                    setFile(null);
                    setFilePreview(null);
                    setDocumentName('');
                    setDocumentType('');
                  }}
                >
                  {getAction('cancel', 'Remove')}
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Document details */}
        {file && (
          <div className="space-y-4">
            <Input
              id="documentName"
              label={getSafeTranslation('documentName', 'Document Name')}
              placeholder="Enter a name for this document"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              fullWidth
              required
            />
            
            <Select
              id="documentType"
              label={getSafeTranslation('documentType', 'Document Type')}
              placeholder="Select document type"
              options={documentTypes}
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              required
            />
          </div>
        )}
      </Card>
    </PageContainer>
  );
}