'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthContext } from '../../../../../providers/AuthProvider';
import useMedicalStudentConsultations from '../../../../../hooks/useMedicalStudentConsultations';
import useDocuments from '../../../../../hooks/useDocuments';

import { PageContainer } from '../../../../../components/ui/layout/PageContainer';
import { PageHeader } from '../../../../../components/ui/layout/PageHeader';
import { Card } from '../../../../../components/ui/cards/Card';
import { SplitLayout } from '../../../../../components/ui/layout/SplitLayout';
import { StatusBadge } from '../../../../../components/ui/status/StatusBadge';
import { DocumentCard } from '../../../../../components/ui/cards/DocumentCard';
import { UserInfo } from '../../../../../components/ui/avatar/UserInfo';
import Button from '../../../../../components/ui/buttons/Button';
import { Alert } from '../../../../../components/ui/modal/Alert';
import { TextArea } from '../../../../../components/ui/forms/TextArea';
import { ConsultationChatContainer } from '../../../../../components/medical-student/consultations/MedicalStudentChatContainer';
import { formatDate } from '../../../../../lib/utils/formatters';

export default function MedicalStudentConsultationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuthContext();
  
  // Navigation tracking
  const [redirected, setRedirected] = useState(false);
  
  // Consultation ID ref and state
  const consultationId = params?.id as string;
  const loadedRef = useRef(false);
  
  // Get consultations data
  const { 
    assignedConsultations,
    availableConsultations,
    completedConsultations,
    loading: consultationsLoading, 
    error: consultationsError, 
    updateConsultationStatus,
    fetchConsultations
  } = useMedicalStudentConsultations();
  
  const { documents, loading: documentsLoading, fetchDocuments } = useDocuments();
  
  // Consultation state
  const [consultation, setConsultation] = useState<any>(null);
  const [patientInfo, setPatientInfo] = useState<any>(null);
  const [relatedDocuments, setRelatedDocuments] = useState<any[]>([]);
  const [notes, setNotes] = useState('');
  
  // Action states
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  
  // Fetch data once on component mount
  useEffect(() => {
    // Prevent multiple fetches on same consultation
    if (loadedRef.current) {
      return;
    }
    
    if (!user?.id) {
      return;
    }
    
    // Mark as loaded to prevent future fetches for this consultation
    loadedRef.current = true;
    
    // Fetch data
    fetchConsultations(user.id);
    fetchDocuments(user.id);
  }, [user?.id, fetchConsultations, fetchDocuments]);
  
  // Find and set consultation data
  useEffect(() => {
    if (!consultationId || !availableConsultations?.length && !assignedConsultations?.length && !completedConsultations?.length) {
      return;
    }
    
    // Skip if we already have consultation data
    if (consultation?.id === consultationId) {
      return;
    }
    
    // Check in all consultation lists
    const allConsultations = [
      ...(availableConsultations || []),
      ...(assignedConsultations || []),
      ...(completedConsultations || [])
    ];
    
    const foundConsultation = allConsultations.find(cons => cons.id === consultationId);
    
    if (foundConsultation) {
      setConsultation(foundConsultation);
      
      // Set patient info (mock data)
      setPatientInfo({
        id: foundConsultation.patientId,
        name: 'Maria Schmidt',
        age: 42,
        gender: 'Female'
      });
      
      // Set initial notes (mock data)
      setNotes(foundConsultation.medicalStudentNotes || '');
    }
  }, [consultationId, availableConsultations, assignedConsultations, completedConsultations, consultation]);
  
  // Find related documents
  useEffect(() => {
    if (!consultation?.documents?.length || !documents?.length) {
      return;
    }
    
    // Skip if we already have documents loaded
    if (relatedDocuments.length > 0) {
      return;
    }
    
    const related = documents.filter(doc => 
      consultation.documents.includes(doc.id)
    );
    
    setRelatedDocuments(related);
  }, [consultation, documents, relatedDocuments.length]);
  
  // Safe navigation function to avoid race conditions
  const safeNavigate = (path: string) => {
    // Skip navigation if we're already handling redirects
    if (redirected) return;
    
    // Use setTimeout to break the current execution context
    // This prevents navigation from happening during a render
    setTimeout(() => {
      router.push(path);
    }, 0);
  };
  
  // Handle status update
  const handleStatusUpdate = async (newStatus: 'SCHEDULED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED') => {
    if (!consultation) return;
    
    setActionLoading(true);
    setActionError(null);
    setActionSuccess(null);
    
    try {
      await updateConsultationStatus(consultation.id, newStatus);
      setActionSuccess("Status updated successfully");
      
      // Update the local consultation
      setConsultation(prev => ({ ...prev, status: newStatus }));
    } catch (err) {
      setActionError("Error updating consultation status");
      console.error('Error updating consultation status:', err);
    } finally {
      setActionLoading(false);
    }
  };
  
  // Handle save notes
  const handleSaveNotes = async () => {
    if (!consultation) return;
    
    setActionLoading(true);
    setActionError(null);
    setActionSuccess(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the local consultation
      setConsultation(prev => ({ ...prev, medicalStudentNotes: notes }));
      
      setActionSuccess("Notes saved successfully");
    } catch (err) {
      setActionError("Error saving notes");
      console.error('Error saving notes:', err);
    } finally {
      setActionLoading(false);
    }
  };
  
  // Handle document click
  const handleDocumentClick = (documentId: string) => {
    // In a real app, this would open the document
    console.log(`Opening document: ${documentId}`);
  };
  
  // Determine available actions based on status
  const getAvailableActions = () => {
    if (!consultation) return null;
    
    const { status } = consultation;
    
    // Actions for different statuses
    if (status === 'ASSIGNED') {
      return (
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => handleStatusUpdate('SCHEDULED')}
            disabled={actionLoading}
          >
            Schedule Call
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => handleStatusUpdate('IN_PROGRESS')}
            disabled={actionLoading}
          >
            Start Consultation
          </Button>
        </div>
      );
    }
    
    if (status === 'SCHEDULED') {
      return (
        <Button
          onClick={() => handleStatusUpdate('IN_PROGRESS')}
          disabled={actionLoading}
        >
          Start Call
        </Button>
      );
    }
    
    if (status === 'IN_PROGRESS') {
      return (
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => handleStatusUpdate('RESOLVED')}
            disabled={actionLoading}
          >
            Complete Consultation
          </Button>
        </div>
      );
    }
    
    return null;
  };
  
  // Loading state
  if (consultationsLoading || documentsLoading || !user) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-64">
          <div className="text-neutral-500">Loading...</div>
        </div>
      </PageContainer>
    );
  }
  
  // Error state
  if (consultationsError || !consultation) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-64">
          <Alert
            variant="error"
            message={consultationsError?.message || "Consultation not found"}
          />
        </div>
      </PageContainer>
    );
  }
  
  // Consultation type label
  const consultationTypeLabels: Record<string, string> = {
    'labResult': "Lab Result",
    'medication': "Medication",
    'imaging': "Imaging",
    'symptoms': "Symptoms",
    'general': "General"
  };
  
  // Communication channel label
  const communicationChannelLabels: Record<string, string> = {
    'video': "Video Call",
    'audio': "Audio Call",
    'text': "Text Chat",
    'async': "Asynchronous Messaging"
  };
  
  return (
    <PageContainer>
      <PageHeader 
        title="Consultation Details"
        breadcrumbs={[
          { href: '/medical-student/dashboard', label: "Dashboard" },
          { href: '/medical-student/consultations', label: "Consultations" },
          { label: consultation.primaryConcern }
        ]}
      />
      
      {actionSuccess && (
        <Alert
          variant="success"
          message={actionSuccess}
          className="mb-6"
          dismissible
          onDismiss={() => setActionSuccess(null)}
        />
      )}
      
      {actionError && (
        <Alert
          variant="error"
          message={actionError}
          className="mb-6"
          dismissible
          onDismiss={() => setActionError(null)}
        />
      )}
      
      <SplitLayout
        left={
          <div className="space-y-6">
            {/* Consultation details */}
            <Card title="Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-500">Status</p>
                  <div className="mt-1">
                    <StatusBadge status={consultation.status} />
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-neutral-500">Type</p>
                  <p className="mt-1 text-neutral-900">
                    {consultationTypeLabels[consultation.type] || consultation.type}
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-neutral-500">Primary Concern</p>
                  <p className="mt-1 text-neutral-900">{consultation.primaryConcern}</p>
                </div>
                
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-neutral-500">Description</p>
                  <p className="mt-1 text-neutral-900 whitespace-pre-line">{consultation.description}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-neutral-500">Communication Channel</p>
                  <p className="mt-1 text-neutral-900">
                    {communicationChannelLabels[consultation.communicationChannel] || consultation.communicationChannel}
                  </p>
                </div>
                
                {consultation.scheduledFor && (
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Scheduled For</p>
                    <p className="mt-1 text-neutral-900">{formatDate(consultation.scheduledFor)}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm font-medium text-neutral-500">Requested On</p>
                  <p className="mt-1 text-neutral-900">{formatDate(consultation.createdAt)}</p>
                </div>
              </div>
              
              {/* Actions */}
              {getAvailableActions() && (
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  {getAvailableActions()}
                </div>
              )}
            </Card>
            
            {/* Patient information */}
            <Card title="Patient Information">
              {patientInfo && (
                <div className="space-y-4">
                  <UserInfo
                    name={patientInfo.name}
                    info={`${patientInfo.age} years, ${patientInfo.gender}`}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm font-medium text-neutral-500">Consultations History</p>
                      <p className="mt-1 text-neutral-900">
                        3 previous consultations
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-neutral-500">Documents Count</p>
                      <p className="mt-1 text-neutral-900">
                        {relatedDocuments.length} {relatedDocuments.length === 1 ? "document" : "documents"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
            
            {/* Medical student notes */}
            <Card 
              title="Consultation Notes"
              footer={
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveNotes}
                    disabled={actionLoading}
                  >
                    {actionLoading ? "Saving..." : "Save Notes"}
                  </Button>
                </div>
              }
            >
              <TextArea
                id="consultation-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your private notes about this consultation here..."
                rows={6}
                fullWidth
              />
            </Card>
            
            {/* Related documents */}
            {relatedDocuments.length > 0 && (
              <Card title="Documents">
                <div className="space-y-4">
                  {relatedDocuments.map((document) => (
                    <DocumentCard
                      key={document.id}
                      name={document.name}
                      type={document.type}
                      uploadDate={formatDate(document.uploadedAt)}
                      onClick={() => handleDocumentClick(document.id)}
                      onDownload={() => console.log(`Downloading document: ${document.id}`)}
                    />
                  ))}
                </div>
              </Card>
            )}
          </div>
        }
        right={
          <div className="space-y-6">
            {/* Messages section */}
            <Card 
              title="Messages"
              className="h-full min-h-[500px] flex flex-col"
            >
              <ConsultationChatContainer
                consultationId={consultation.id}
                status={consultation.status}
                patientName={patientInfo?.name || ''}
              />
            </Card>
          </div>
        }
        leftWidth={5}
      />
    </PageContainer>
  );
}