'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '../../../../../i18n/navigation';
import { useAuthContext } from '../../../../../providers/AuthProvider';
import useConsultations from '../../../../../hooks/useConsultations';
import useDocuments from '../../../../../hooks/useDocuments';

import { PageContainer } from '../../../../../components/ui/layout/PageContainer';
import { PageHeader } from '../../../../../components/ui/layout/PageHeader';
import { Card } from '../../../../../components/ui/cards/Card';
import { SplitLayout } from '../../../../../components/ui/layout/SplitLayout';
import { Alert } from '../../../../../components/ui/modal/Alert';
import { UnifiedCommunicationInterface } from '../../../../../components/UnifiedCommunicationInterface';
import { formatDate } from '../../../../../lib/utils/formatters';

// Import the new rich consultation detail component
import { RichConsultationDetail } from '../../../../../components/patient/consultations/RichConsultationDetail';

export default function ConsultationDetailPage() {
  const t = useTranslations('patient.consultation.details');
  const c = useTranslations('common');
  
  const router = useRouter();
  const params = useParams();
  const { user } = useAuthContext();
  const { consultations, loading, error, fetchConsultations, updateConsultation } = useConsultations();
  const { documents, fetchDocuments } = useDocuments();
  
  const [consultation, setConsultation] = useState<any>(null);
  const [relatedDocuments, setRelatedDocuments] = useState<any[]>([]);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [medicalStudent, setMedicalStudent] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  
  // Get the consultation ID from the URL
  const consultationId = params?.id as string;
  
  // Fetch consultation data
  useEffect(() => {
    if (user?.id) {
      fetchConsultations(user.id, 'PATIENT');
      fetchDocuments(user.id);
      
      // Fetch medical students data
      const fetchMedicalStudents = async () => {
        try {
          const response = await import('../../../../../mock-data/users/medical-students.json');
          return response.default;
        } catch (error) {
          console.error('Error fetching medical students:', error);
          return [];
        }
      };
      
      // Fetch messages data
      const fetchMessages = async () => {
        try {
          const response = await import('../../../../../mock-data/messages/messages.json');
          return response.default;
        } catch (error) {
          console.error('Error fetching messages:', error);
          return [];
        }
      };
      
      // Load additional data
      Promise.all([fetchMedicalStudents(), fetchMessages()]).then(([students, msgs]) => {
        // Store medical students for later reference
        if (consultation?.medicalStudentId) {
          const student = students.find((s: any) => s.id === consultation.medicalStudentId);
          if (student) {
            setMedicalStudent(student);
          }
        }
        
        // Store related messages
        if (consultationId) {
          const consultationMessages = msgs.filter((m: any) => m.consultationId === consultationId);
          setMessages(consultationMessages);
        }
      });
    }
  }, [user?.id, fetchConsultations, fetchDocuments, consultationId, consultation?.medicalStudentId]);
  
  // Find the current consultation and related documents
  useEffect(() => {
    if (consultationId && consultations.length > 0 && documents.length > 0) {
      const foundConsultation = consultations.find(cons => cons.id === consultationId);
      
      if (foundConsultation) {
        setConsultation(foundConsultation);
        
        // Find related documents
        if (foundConsultation.documents?.length > 0) {
          const related = documents.filter(doc => 
            foundConsultation.documents.includes(doc.id)
          );
          setRelatedDocuments(related);
        }
      }
    }
  }, [consultationId, consultations, documents]);
  
  // Handle status update
  const handleStatusUpdate = async (newStatus: string) => {
    if (!consultation) return;
    
    setActionLoading(true);
    setActionError(null);
    setActionSuccess(null);
    
    try {
      await updateConsultation(consultation.id, { status: newStatus });
      setActionSuccess(t('statusUpdateSuccess'));
      
      // Update the local consultation
      setConsultation(prev => ({ ...prev, status: newStatus }));
    } catch (err) {
      setActionError(c.errors.general);
      console.error('Error updating consultation status:', err);
    } finally {
      setActionLoading(false);
    }
  };
  
  // Handle document click
  const handleDocumentClick = (documentId: string) => {
    // In a real app, this would open the document
    console.log(`Opening document: ${documentId}`);
  };
  
  // Handle document download
  const handleDocumentDownload = (documentId: string) => {
    // In a real app, this would download the document
    console.log(`Downloading document: ${documentId}`);
  };
  
  // Loading state
  if (loading) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-64">
          <div className="text-neutral-500">{c.status.loading}</div>
        </div>
      </PageContainer>
    );
  }
  
  // Error state
  if (error || !consultation) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-64">
          <Alert
            variant="error"
            message={error?.message || t('notFound')}
          />
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <PageHeader 
        title={t('title')}
        breadcrumbs={[
          { href: '/patient/dashboard', label: t('breadcrumb.dashboard') },
          { href: '/patient/consultations', label: t('breadcrumb.consultations') },
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
          <div>
            <Card>
              <RichConsultationDetail
                consultation={consultation}
                medicalStudent={medicalStudent}
                relatedDocuments={relatedDocuments}
                recentMessages={messages}
                onStatusUpdate={handleStatusUpdate}
                onViewDocument={handleDocumentClick}
                onDownloadDocument={handleDocumentDownload}
              />
            </Card>
          </div>
        }
        right={
          <div className="space-y-6">
            {/* Unified communication interface */}
            <UnifiedCommunicationInterface
              consultationId={consultation.id}
              status={consultation.status}
              preferredChannel={consultation.communicationChannel}
              isPatient={true}
              medicalStudentName={medicalStudent?.name || 'Medical Student'}
            />
          </div>
        }
        leftWidth={5}
      />
    </PageContainer>
  );
}