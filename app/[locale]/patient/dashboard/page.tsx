'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '../../../../i18n/navigation';
import { useAuthContext } from '../../../../providers/AuthProvider';

import { PageContainer } from '../../../../components/ui/layout/PageContainer';
import { PageHeader } from '../../../../components/ui/layout/PageHeader';
import { SplitLayout } from '../../../../components/ui/layout/SplitLayout';
import { Card } from '../../../../components/ui/cards/Card';
import { StatsGroup } from '../../../../components/ui/elements/StatsGroup';
import { EmptyState } from '../../../../components/ui/elements/EmptyState';
import Button from '../../../../components/ui/buttons/Button';

export default function PatientDashboardPage() {
  const t = useTranslations('patient.dashboard');
  const c = useTranslations('common.actions');
  const router = useRouter();
  
  // Get auth context
  const auth = useAuthContext();
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  
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
  
  // Sample stats data (hardcoded for now)
  const stats = [
    {
      label: t('totalConsultations'),
      value: 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    {
      label: t('documentsUploaded'),
      value: 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      label: t('activecConsultations'),
      value: 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <PageContainer>
      <PageHeader 
        title={t('title')}
        subtitle={auth.user ? t('welcome', { name: auth.user.name }) : ''}
        actions={
          <Button
            onClick={() => router.push('/patient/consultations/new')}
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            }
          >
            {t('newConsultation')}
          </Button>
        }
      />
      
      {/* Stats section */}
      <section className="mb-8">
        <StatsGroup stats={stats} columns={{ sm: 1, md: 3 }} />
      </section>
      
      {/* Main content */}
      <SplitLayout
        left={
          <div className="space-y-6">
            {/* Upcoming consultations */}
            <Card title={t('upcomingConsultations')}>
              <EmptyState
                title={t('noConsultations')}
                description={t('startConsultation')}
                action={
                  <Button
                    onClick={() => router.push('/patient/consultations/new')}
                  >
                    {t('newConsultation')}
                  </Button>
                }
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                }
              />
            </Card>
            
            {/* Consultation history */}
            <Card title={t('consultationHistory')}>
              <div className="py-4 text-center text-gray-500">{t('noPastConsultations')}</div>
            </Card>
          </div>
        }
        right={
          <div className="space-y-6">
            {/* Document management */}
            <Card
              title={t('documents')}
              footer={
                <div className="flex justify-between">
                  <Button
                    variant="secondary"
                    onClick={() => router.push('/patient/documents/upload')}
                    leftIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    }
                  >
                    {t('uploadDocument')}
                  </Button>
                </div>
              }
            >
              <EmptyState
                title={t('noDocuments')}
                description={t('uploadDocumentPrompt')}
                action={
                  <Button
                    variant="secondary"
                    onClick={() => router.push('/patient/documents/upload')}
                  >
                    {t('uploadDocument')}
                  </Button>
                }
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              />
            </Card>
            
            {/* Quick actions */}
            <Card title={t('quickActions')}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  fullWidth
                  onClick={() => router.push('/patient/consultations/new')}
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  }
                >
                  {t('newConsultation')}
                </Button>
                <Button
                  fullWidth
                  variant="secondary"
                  onClick={() => router.push('/patient/documents/upload')}
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  }
                >
                  {t('uploadDocument')}
                </Button>
                <Button
                  fullWidth
                  variant="tertiary"
                  onClick={() => router.push('/patient/profile')}
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  }
                >
                  {t('viewProfile')}
                </Button>
                <Button
                  fullWidth
                  variant="tertiary"
                  onClick={() => router.push('/patient/consultations')}
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                  }
                >
                  {t('allConsultations')}
                </Button>
              </div>
            </Card>
          </div>
        }
        leftWidth={6}
      />
    </PageContainer>
  );
}