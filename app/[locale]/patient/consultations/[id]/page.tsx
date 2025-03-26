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
import { Breadcrumbs } from '../../../../../components/ui/navigation/Breadcrumbs';
import { StatusBadge } from '../../../../../components/ui/status/StatusBadge';
import { DocumentCard } from '../../../../../components/ui/cards/DocumentCard';
import { UserInfo } from '../../../../../components/ui/avatar/UserInfo';
import Button from '../../../../../components/ui/buttons/Button';
import { Alert } from '../../../../../components/ui/modal/Alert';
import { UnifiedCommunicationInterface } from '../../../../../components/UnifiedCommunicationInterface';
import { formatDate } from '../../../../../lib/utils/formatters';

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
  
  // Get the consultation ID from the URL
  const consultationId = params?.id as string;
  
  // Fetch consultation data
  useEffect(() => {
    if (user?.id) {
      fetchConsultations(user.id, 'PATIENT');
      fetchDocuments(user.id);
    }
  }, [user?.id, fetchConsultations, fetchDocuments]);
  
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
  
  // Handle cancel consultation
  const handleCancelConsultation = async () => {
    if (!consultation) return;
    
    setActionLoading(true);
    setActionError(null);
    setActionSuccess(null);
    
    try {
      await updateConsultation(consultation.id, { status: 'CLOSED' });
      setActionSuccess(t('cancelSuccess'));
      
      // Update the local consultation
      setConsultation(prev => ({ ...prev, status: 'CLOSED' }));
    } catch (err) {
      setActionError(c.errors.general);
      console.error('Error canceling consultation:', err);
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
    if (['REQUESTED', 'ASSIGNED'].includes(status)) {
      return (
        <Button
          variant="tertiary"
          onClick={handleCancelConsultation}
          disabled={actionLoading}
        >
          {actionLoading ? c.status.loading : t('actions.cancel')}
        </Button>
      );
    }
    
    if (status === 'SCHEDULED') {
      return (
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="tertiary"
            onClick={handleCancelConsultation}
            disabled={actionLoading}
          >
            {actionLoading ? c.status.loading : t('actions.cancel')}
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => console.log('Reschedule')}
          >
            {t('actions.reschedule')}
          </Button>
        </div>
      );
    }
    
    if (status === 'IN_PROGRESS') {
      return (
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => console.log('Connect now')}
          >
            {t('actions.connect')}
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => console.log('Send message')}
          >
            {t('actions.sendMessage')}
          </Button>
        </div>
      );
    }
    
    if (status === 'RESOLVED') {
      return (
        <Button
          onClick={() => console.log('Provide rating')}
        >
          {t('actions.provideRating')}
        </Button>
      );
    }
    
    return null;
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
  
  // Get medical student if assigned
  const medicalStudent = consultation.medicalStudentId ? {
    id: 'ms1',
    name: 'Dr. Julia Müller',
    info: 'Charité - Universitätsmedizin Berlin, Year 5'
  } : null;
  
  // Consultation type label
  const consultationTypeLabels: Record<string, string> = {
    'labResult': t('typeLabels.labResult'),
    'medication': t('typeLabels.medication'),
    'imaging': t('typeLabels.imaging'),
    'symptoms': t('typeLabels.symptoms'),
    'general': t('typeLabels.general')
  };
  
  // Communication channel label
  const communicationChannelLabels: Record<string, string> = {
    'video': t('channelLabels.video'),
    'audio': t('channelLabels.audio'),
    'text': t('channelLabels.text'),
    'async': t('channelLabels.async')
  };
  
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
          <div className="space-y-6">
            {/* Consultation details */}
            <Card title={t('details')}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-500">{t('status')}</p>
                  <div className="mt-1">
                    <StatusBadge status={consultation.status} />
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-neutral-500">{t('type')}</p>
                  <p className="mt-1 text-neutral-900">
                    {consultationTypeLabels[consultation.type] || consultation.type}
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-neutral-500">{t('primaryConcern')}</p>
                  <p className="mt-1 text-neutral-900">{consultation.primaryConcern}</p>
                </div>
                
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-neutral-500">{t('description')}</p>
                  <p className="mt-1 text-neutral-900 whitespace-pre-line">{consultation.description}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-neutral-500">{t('communicationChannel')}</p>
                  <p className="mt-1 text-neutral-900">
                    {communicationChannelLabels[consultation.communicationChannel] || consultation.communicationChannel}
                  </p>
                </div>
                
                {consultation.scheduledFor && (
                  <div>
                    <p className="text-sm font-medium text-neutral-500">{t('scheduledFor')}</p>
                    <p className="mt-1 text-neutral-900">{formatDate(consultation.scheduledFor)}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm font-medium text-neutral-500">{t('createdAt')}</p>
                  <p className="mt-1 text-neutral-900">{formatDate(consultation.createdAt)}</p>
                </div>
                
                {consultation.medicalStudentId && (
                  <div>
                    <p className="text-sm font-medium text-neutral-500">{t('assignedTo')}</p>
                    <div className="mt-2">
                      <UserInfo
                        name={medicalStudent?.name || ''}
                        info={medicalStudent?.info || ''}
                        status="online"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Actions */}
              {getAvailableActions() && (
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  {getAvailableActions()}
                </div>
              )}
            </Card>
            
            {/* Related documents */}
            {relatedDocuments.length > 0 && (
              <Card title={t('documents')}>
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