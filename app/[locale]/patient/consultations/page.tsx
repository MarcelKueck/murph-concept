'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '../../../../providers/AuthProvider';

import { PageContainer } from '../../../../components/ui/layout/PageContainer';
import { PageHeader } from '../../../../components/ui/layout/PageHeader';
import { Card } from '../../../../components/ui/cards/Card';
import { EmptyState } from '../../../../components/ui/elements/EmptyState';
import Button from '../../../../components/ui/buttons/Button';
import { TabNavigation } from '../../../../components/ui/navigation/TabNavigation';

export default function ConsultationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Try to get translations but provide fallbacks
  let t = {};
  try {
    t = useTranslations('patient.consultations');
  } catch (e) {
    console.warn("Could not load patient.consultations translations, using fallbacks");
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
  
  // Auth context with safe access
  const auth = useAuthContext();
  
  // Get filter from URL or default to 'active'
  const initialFilter = searchParams?.get('filter') || 'active';
  const [activeTab, setActiveTab] = useState<string>(initialFilter);
  
  // Loading and error state
  const [isLoading, setIsLoading] = useState(true);
  const [consultations, setConsultations] = useState([]);
  
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
    
    // If authenticated, simulate loading consultations after a short delay
    if (auth.user) {
      setTimeout(() => {
        // In a real app, this would be an API call
        // For demo, we're just setting an empty array
        setConsultations([]);
        setIsLoading(false);
      }, 1000);
    }
  }, [auth, router]);
  
  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    
    // Update URL without page reload
    const url = new URL(window.location.href);
    if (tabId !== 'active') {
      url.searchParams.set('filter', tabId);
    } else {
      url.searchParams.delete('filter');
    }
    window.history.pushState({}, '', url.toString());
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
  
  // Determine empty state message based on active tab
  const getEmptyStateMessage = () => {
    switch (activeTab) {
      case 'active':
        return getSafeTranslation('noActiveConsultations', 'You don\'t have any active consultations');
      case 'past':
        return getSafeTranslation('noPastConsultations', 'You don\'t have any past consultations');
      default:
        return getSafeTranslation('noConsultations', 'You don\'t have any consultations yet');
    }
  };
  
  return (
    <PageContainer>
      <PageHeader 
        title={getSafeTranslation('title', 'Consultations')}
        breadcrumbs={[
          { href: '/patient/dashboard', label: 'Dashboard' },
          { label: 'Consultations' }
        ]}
        actions={
          <Button
            onClick={() => router.push('/patient/consultations/new')}
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            }
          >
            {getSafeTranslation('newConsultation', 'New Consultation')}
          </Button>
        }
      />
      
      <Card>
        {/* Tabs for filtering */}
        <div className="mb-6">
          <TabNavigation
            tabs={[
              { id: 'active', label: getSafeTranslation('tabs.active', 'Active') },
              { id: 'past', label: getSafeTranslation('tabs.past', 'Past') },
              { id: 'all', label: getSafeTranslation('tabs.all', 'All') }
            ]}
            activeTab={activeTab}
            onChange={handleTabChange}
          />
        </div>
        
        {/* Empty state */}
        <EmptyState
          title={getEmptyStateMessage()}
          description={getSafeTranslation('startConsultation', 'Start a new consultation to get medical guidance')}
          action={
            <Button
              onClick={() => router.push('/patient/consultations/new')}
            >
              {getSafeTranslation('newConsultation', 'New Consultation')}
            </Button>
          }
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          }
        />
      </Card>
    </PageContainer>
  );
}