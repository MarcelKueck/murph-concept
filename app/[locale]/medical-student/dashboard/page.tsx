'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../../../providers/AuthProvider';
import useMedicalStudentConsultations from '../../../../hooks/useMedicalStudentConsultations';

import { PageContainer } from '../../../../components/ui/layout/PageContainer';
import { PageHeader } from '../../../../components/ui/layout/PageHeader';
import { SplitLayout } from '../../../../components/ui/layout/SplitLayout';
import { Card } from '../../../../components/ui/cards/Card';
import { StatsGroup } from '../../../../components/ui/elements/StatsGroup';
import { EmptyState } from '../../../../components/ui/elements/EmptyState';
import Button from '../../../../components/ui/buttons/Button';
import { Alert } from '../../../../components/ui/modal/Alert';
import { WeeklyAvailabilityView } from '../../../../components/medical-student/availability/WeeklyAvailabilityView';
import { ConsultationRequestCard } from '../../../../components/medical-student/consultations/ConsultationRequestCard';
import { AssignedConsultationCard } from '../../../../components/medical-student/consultations/AssignedConsultationCard';

export default function MedicalStudentDashboardPage() {
  const router = useRouter();
  const auth = useAuthContext();
  
  // Local state to prevent navigation loops
  const [redirected, setRedirected] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [initialized, setInitialized] = useState(false);
  
  // Get consultations data - we'll call this manually after auth check
  const { 
    availableConsultations, 
    assignedConsultations, 
    completedConsultations,
    loading: consultationsLoading, 
    error: consultationsError, 
    acceptConsultation,
    declineConsultation,
    fetchConsultations
  } = useMedicalStudentConsultations();
  
  // UI states
  const [acceptingConsultationId, setAcceptingConsultationId] = useState<string | null>(null);
  const [decliningConsultationId, setDecliningConsultationId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  
  // Auth and navigation management with safeguards against loops
  useEffect(() => {
    // Skip if we already did initialization
    if (initialized) return;

    // Skip if auth isn't ready yet
    if (auth === undefined) return;

    // Skip if auth is still loading
    if (auth.loading) return;

    // Mark as initialized to prevent repeated executions
    setInitialized(true);

    // Handle navigation based on auth state
    if (!auth.user) {
      if (!redirected) {
        setRedirected(true);
        // Use router.replace instead of push to avoid adding to history
        router.replace('/auth/login');
      }
    } else if (auth.user.role !== 'MEDICAL_STUDENT') {
      if (!redirected) {
        setRedirected(true);
        // Use router.replace instead of push to avoid adding to history
        router.replace('/patient/dashboard');
      }
    } else if (auth.user.id && !dataFetched) {
      // Fetch data only once
      setDataFetched(true);
      fetchConsultations(auth.user.id);
    }
  }, [auth, router, fetchConsultations, redirected, dataFetched, initialized]);
  
  // Handle accept consultation
  const handleAcceptConsultation = async (consultationId: string) => {
    setAcceptingConsultationId(consultationId);
    setActionError(null);
    setActionSuccess(null);
    
    try {
      await acceptConsultation(consultationId);
      setActionSuccess("Consultation accepted successfully");
    } catch (err) {
      setActionError("Error accepting consultation");
      console.error('Error accepting consultation:', err);
    } finally {
      setAcceptingConsultationId(null);
    }
  };
  
  // Handle decline consultation
  const handleDeclineConsultation = async (consultationId: string) => {
    setDecliningConsultationId(consultationId);
    setActionError(null);
    setActionSuccess(null);
    
    try {
      await declineConsultation(consultationId);
      setActionSuccess("Consultation declined successfully");
    } catch (err) {
      setActionError("Error declining consultation");
      console.error('Error declining consultation:', err);
    } finally {
      setDecliningConsultationId(null);
    }
  };
  
  // If not initialized or redirected, show minimal loading state
  if (!initialized || redirected || auth === undefined || auth.loading) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-64">
          <div className="text-neutral-500">Loading...</div>
        </div>
      </PageContainer>
    );
  }

  // If auth shows not logged in or wrong role, just return empty to avoid any navigation
  if (!auth.user || auth.user.role !== 'MEDICAL_STUDENT') {
    return null;
  }
  
  // Main loading state for consultations
  if (consultationsLoading) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-64">
          <div className="text-neutral-500">Loading consultations...</div>
        </div>
      </PageContainer>
    );
  }
  
  // Handle error state
  if (consultationsError) {
    return (
      <PageContainer>
        <Alert
          variant="error"
          message={consultationsError.message}
          className="mt-4"
        />
      </PageContainer>
    );
  }
  
  // Stats data with hardcoded labels instead of translations
  const stats = [
    {
      label: "Completed Consultations",
      value: completedConsultations.length,
      change: 8.2,
      increaseIsGood: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      label: "Patient Satisfaction",
      value: '4.8/5',
      change: 0.3,
      increaseIsGood: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      label: "Active Consultations",
      value: assignedConsultations.length,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: "Available Hours",
      value: '20h/week',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];
  
  const welcomeMessage = auth.user ? `Welcome, ${auth.user.name}` : '';
  
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
  
  return (
    <PageContainer>
      <PageHeader 
        title="Medical Student Dashboard"
        subtitle={welcomeMessage}
        actions={
          <Button
            onClick={() => safeNavigate('/medical-student/availability')}
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          >
            Update Availability
          </Button>
        }
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
      
      {/* Stats section */}
      <section className="mb-8">
        <StatsGroup stats={stats} columns={{ sm: 1, md: 2, lg: 4 }} />
      </section>
      
      {/* Main content */}
      <SplitLayout
        left={
          <div className="space-y-6">
            {/* Available consultations */}
            <Card 
              title="Available Consultations"
              footer={
                <div className="text-right">
                  <Button
                    variant="tertiary"
                    onClick={() => safeNavigate('/medical-student/consultations?filter=available')}
                  >
                    View All
                  </Button>
                </div>
              }
            >
              {availableConsultations.length > 0 ? (
                <div className="space-y-4">
                  {availableConsultations.slice(0, 3).map((consultation) => (
                    <ConsultationRequestCard
                      key={consultation.id}
                      consultation={consultation}
                      onAccept={() => handleAcceptConsultation(consultation.id)}
                      onDecline={() => handleDeclineConsultation(consultation.id)}
                      acceptLoading={acceptingConsultationId === consultation.id}
                      declineLoading={decliningConsultationId === consultation.id}
                      onClick={() => safeNavigate(`/medical-student/consultations/${consultation.id}`)}
                      stackButtons={true}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No available consultations"
                  description="Check back later for new consultation requests"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />
              )}
            </Card>
            
            {/* Assigned consultations */}
            <Card 
              title="Assigned Consultations"
              footer={
                <div className="text-right">
                  <Button
                    variant="tertiary"
                    onClick={() => safeNavigate('/medical-student/consultations?filter=assigned')}
                  >
                    View All
                  </Button>
                </div>
              }
            >
              {assignedConsultations.length > 0 ? (
                <div className="space-y-4">
                  {assignedConsultations.slice(0, 3).map((consultation) => (
                    <AssignedConsultationCard
                      key={consultation.id}
                      consultation={consultation}
                      onClick={() => safeNavigate(`/medical-student/consultations/${consultation.id}`)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No assigned consultations"
                  description="Accept consultation requests to see them here"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  }
                />
              )}
            </Card>
          </div>
        }
        right={
          <div className="space-y-6">
            {/* Weekly availability */}
            <Card 
              title="Availability"
              footer={
                <div className="text-right">
                  <Button
                    variant="tertiary"
                    onClick={() => safeNavigate('/medical-student/availability')}
                  >
                    Manage Availability
                  </Button>
                </div>
              }
            >
              <WeeklyAvailabilityView />
            </Card>
            
            {/* Quick actions */}
            <Card title="Quick Actions">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  fullWidth
                  onClick={() => safeNavigate('/medical-student/availability')}
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  Update Availability
                </Button>
                <Button
                  fullWidth
                  variant="secondary"
                  onClick={() => safeNavigate('/medical-student/consultations?filter=available')}
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  }
                >
                  Review Requests
                </Button>
                <Button
                  fullWidth
                  variant="tertiary"
                  onClick={() => safeNavigate('/medical-student/profile')}
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                >
                  Update Profile
                </Button>
                <Button
                  fullWidth
                  variant="tertiary"
                  onClick={() => safeNavigate('/medical-student/profile/expertise')}
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  }
                >
                  Update Expertise
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