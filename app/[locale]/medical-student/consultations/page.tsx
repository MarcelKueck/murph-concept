'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Link } from '../../../../i18n/navigation';
import { useAuthContext } from '../../../../providers/AuthProvider';
import useMedicalStudentConsultations from '../../../../hooks/useMedicalStudentConsultations';

import { PageContainer } from '../../../../components/ui/layout/PageContainer';
import { PageHeader } from '../../../../components/ui/layout/PageHeader';
import { Card } from '../../../../components/ui/cards/Card';
import { TabNavigation } from '../../../../components/ui/navigation/TabNavigation';
import { EmptyState } from '../../../../components/ui/elements/EmptyState';
import Button from '../../../../components/ui/buttons/Button';
import { Input } from '../../../../components/ui/forms/Input';
import { Alert } from '../../../../components/ui/modal/Alert';
import { ConsultationRequestCard } from '../../../../components/medical-student/consultations/ConsultationRequestCard';
import { AssignedConsultationCard } from '../../../../components/medical-student/consultations/AssignedConsultationCard';
import { CompletedConsultationCard } from '../../../../components/medical-student/consultations/CompletedConsultationCard';

export default function MedicalStudentConsultationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get filter from URL or default to 'available'
  const initialFilter = searchParams?.get('filter') || 'available';
  const [activeTab, setActiveTab] = useState<string>(initialFilter);
  
  // Get auth context
  const auth = useAuthContext();
  
  // Get consultations data
  const { 
    availableConsultations, 
    assignedConsultations, 
    completedConsultations,
    loading, 
    error, 
    acceptConsultation,
    declineConsultation,
    fetchConsultations
  } = useMedicalStudentConsultations();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Action states
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  
  // Only proceed if we have authentication
  useEffect(() => {
    if (auth === undefined) {
      return;
    }
    
    // If user is not authenticated and we're not loading, redirect to login
    if (!auth.user && !auth.loading) {
      router.push('/auth/login');
    }
    
    // If user is authenticated but not a medical student, redirect to patient dashboard
    if (auth.user && auth.user.role !== 'MEDICAL_STUDENT' && !auth.loading) {
      router.push('/patient/dashboard');
    }
    
    // Fetch consultations if user is authenticated
    if (auth.user && auth.user.id) {
      fetchConsultations(auth.user.id);
    }
  }, [auth, router, fetchConsultations]);
  
  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    
    // Update URL without page reload
    const url = new URL(window.location.href);
    if (tabId !== 'available') {
      url.searchParams.set('filter', tabId);
    } else {
      url.searchParams.delete('filter');
    }
    window.history.pushState({}, '', url.toString());
  };
  
  // Handle accept consultation
  const handleAcceptConsultation = async (consultationId: string) => {
    setActionLoading(true);
    setActionError(null);
    setActionSuccess(null);
    
    try {
      await acceptConsultation(consultationId);
      setActionSuccess("Consultation accepted successfully");
    } catch (err) {
      setActionError("Error accepting consultation");
      console.error('Error accepting consultation:', err);
    } finally {
      setActionLoading(false);
    }
  };
  
  // Handle decline consultation
  const handleDeclineConsultation = async (consultationId: string) => {
    setActionLoading(true);
    setActionError(null);
    setActionSuccess(null);
    
    try {
      await declineConsultation(consultationId);
      setActionSuccess("Consultation declined successfully");
    } catch (err) {
      setActionError("Error declining consultation");
      console.error('Error declining consultation:', err);
    } finally {
      setActionLoading(false);
    }
  };
  
  // Handle loading state
  if ((auth === undefined || auth.loading) || loading) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-64">
          <div className="text-neutral-500">Loading...</div>
        </div>
      </PageContainer>
    );
  }
  
  // Filter consultations based on search query
  const filterConsultations = (consultations: any[]) => {
    if (!searchQuery.trim()) return consultations;
    
    const query = searchQuery.toLowerCase();
    return consultations.filter(consultation => 
      consultation.primaryConcern.toLowerCase().includes(query) ||
      consultation.description?.toLowerCase().includes(query) ||
      consultation.type.toLowerCase().includes(query)
    );
  };
  
  // Get filtered consultations based on active tab
  const getFilteredConsultations = () => {
    if (activeTab === 'available') {
      return filterConsultations(availableConsultations);
    } else if (activeTab === 'assigned') {
      return filterConsultations(assignedConsultations);
    } else if (activeTab === 'completed') {
      return filterConsultations(completedConsultations);
    }
    return [];
  };
  
  // Get empty state message based on active tab
  const getEmptyStateMessage = () => {
    if (searchQuery.trim()) {
      return "No consultations match your search criteria";
    }
    
    if (activeTab === 'available') {
      return "No available consultations";
    } else if (activeTab === 'assigned') {
      return "No assigned consultations";
    } else if (activeTab === 'completed') {
      return "No completed consultations";
    }
    
    return "No consultations found";
  };
  
  const filteredConsultations = getFilteredConsultations();
  
  return (
    <PageContainer>
      <PageHeader 
        title="Consultations"
        breadcrumbs={[
          { href: '/medical-student/dashboard', label: "Dashboard" },
          { label: "Consultations" }
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
      
      <Card>
        <div className="mb-6">
          <TabNavigation
            tabs={[
              { id: 'available', label: "Available", badgeCount: availableConsultations.length },
              { id: 'assigned', label: "Assigned", badgeCount: assignedConsultations.length },
              { id: 'completed', label: "Completed" }
            ]}
            activeTab={activeTab}
            onChange={handleTabChange}
          />
        </div>
        
        <div className="mb-6">
          <Input
            id="search-consultations"
            placeholder="Search consultations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>
        
        {filteredConsultations.length > 0 ? (
          <div className="space-y-4">
            {activeTab === 'available' && filteredConsultations.map(consultation => (
              <ConsultationRequestCard
                key={consultation.id}
                consultation={consultation}
                onAccept={() => handleAcceptConsultation(consultation.id)}
                onDecline={() => handleDeclineConsultation(consultation.id)}
                loading={actionLoading}
              />
            ))}
            
            {activeTab === 'assigned' && filteredConsultations.map(consultation => (
              <AssignedConsultationCard
                key={consultation.id}
                consultation={consultation}
                onClick={() => router.push(`/medical-student/consultations/${consultation.id}`)}
              />
            ))}
            
            {activeTab === 'completed' && filteredConsultations.map(consultation => (
              <CompletedConsultationCard
                key={consultation.id}
                consultation={consultation}
                onClick={() => router.push(`/medical-student/consultations/${consultation.id}`)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={getEmptyStateMessage()}
            description={activeTab === 'available' ? "Check back later for new consultation requests" : undefined}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
        )}
      </Card>
    </PageContainer>
  );
}