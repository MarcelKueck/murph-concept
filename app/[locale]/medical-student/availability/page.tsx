'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../../../providers/AuthProvider';

import { PageContainer } from '../../../../components/ui/layout/PageContainer';
import { PageHeader } from '../../../../components/ui/layout/PageHeader';
import { Card } from '../../../../components/ui/cards/Card';
import { TabNavigation } from '../../../../components/ui/navigation/TabNavigation';
import Button from '../../../../components/ui/buttons/Button';
import { Alert } from '../../../../components/ui/modal/Alert';
import { WeeklyScheduleEditor } from '../../../../components/medical-student/availability/WeeklyScheduleEditor';
import { SpecificDatesEditor } from '../../../../components/medical-student/availability/SpecificDatesEditor';
import { ExpertiseSettings } from '../../../../components/medical-student/availability/ExpertiseSettings';
import { CommunicationPreferences } from '../../../../components/medical-student/availability/CommunicationPreferences';

// Mock availability data structure
interface WeeklySchedule {
  monday: { morning: boolean; afternoon: boolean; evening: boolean };
  tuesday: { morning: boolean; afternoon: boolean; evening: boolean };
  wednesday: { morning: boolean; afternoon: boolean; evening: boolean };
  thursday: { morning: boolean; afternoon: boolean; evening: boolean };
  friday: { morning: boolean; afternoon: boolean; evening: boolean };
  saturday: { morning: boolean; afternoon: boolean; evening: boolean };
  sunday: { morning: boolean; afternoon: boolean; evening: boolean };
}

interface ExcludedDate {
  date: string;
  reason: string;
}

interface ConsultationType {
  type: 'labResult' | 'medication' | 'imaging' | 'symptoms' | 'general';
  enabled: boolean;
  expertise: 1 | 2 | 3 | 4 | 5; // 1 = beginner, 5 = expert
}

interface CommunicationPreference {
  type: 'video' | 'audio' | 'text' | 'async';
  enabled: boolean;
  notes: string;
}

interface AvailabilitySettings {
  weeklySchedule: WeeklySchedule;
  excludedDates: ExcludedDate[];
  consultationTypes: ConsultationType[];
  communicationPreferences: CommunicationPreference[];
}

export default function AvailabilityManagementPage() {
  const router = useRouter();
  
  // Get auth context
  const auth = useAuthContext();
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('weekly');
  
  // State for availability settings
  const [availabilitySettings, setAvailabilitySettings] = useState<AvailabilitySettings>({
    weeklySchedule: {
      monday: { morning: true, afternoon: true, evening: false },
      tuesday: { morning: true, afternoon: true, evening: false },
      wednesday: { morning: true, afternoon: false, evening: false },
      thursday: { morning: true, afternoon: true, evening: false },
      friday: { morning: true, afternoon: true, evening: false },
      saturday: { morning: false, afternoon: false, evening: false },
      sunday: { morning: false, afternoon: false, evening: false }
    },
    excludedDates: [
      { date: '2025-04-10', reason: 'Exam' },
      { date: '2025-04-11', reason: 'Exam' },
      { date: '2025-04-20', reason: 'Vacation' }
    ],
    consultationTypes: [
      { type: 'labResult', enabled: true, expertise: 4 },
      { type: 'medication', enabled: true, expertise: 3 },
      { type: 'imaging', enabled: true, expertise: 2 },
      { type: 'symptoms', enabled: true, expertise: 3 },
      { type: 'general', enabled: true, expertise: 5 }
    ],
    communicationPreferences: [
      { type: 'video', enabled: true, notes: '' },
      { type: 'audio', enabled: true, notes: '' },
      { type: 'text', enabled: true, notes: '' },
      { type: 'async', enabled: true, notes: '' }
    ]
  });
  
  // State for saving
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
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
  }, [auth, router]);
  
  // Handle weekly schedule update
  const handleWeeklyScheduleUpdate = (weeklySchedule: WeeklySchedule) => {
    setAvailabilitySettings({
      ...availabilitySettings,
      weeklySchedule
    });
  };
  
  // Handle excluded dates update
  const handleExcludedDatesUpdate = (excludedDates: ExcludedDate[]) => {
    setAvailabilitySettings({
      ...availabilitySettings,
      excludedDates
    });
  };
  
  // Handle consultation types update
  const handleConsultationTypesUpdate = (consultationTypes: ConsultationType[]) => {
    setAvailabilitySettings({
      ...availabilitySettings,
      consultationTypes
    });
  };
  
  // Handle communication preferences update
  const handleCommunicationPreferencesUpdate = (communicationPreferences: CommunicationPreference[]) => {
    setAvailabilitySettings({
      ...availabilitySettings,
      communicationPreferences
    });
  };
  
  // Handle save
  const handleSaveAvailability = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(null);
    
    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      setSaveError("An error occurred while saving your availability settings.");
      console.error('Error saving availability:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle loading state
  if (auth === undefined || auth.loading) {
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
        title="Availability Management"
        subtitle="All times are in your local timezone"
        breadcrumbs={[
          { href: '/medical-student/dashboard', label: "Dashboard" },
          { label: "Availability Management" }
        ]}
        actions={
          <Button
            onClick={handleSaveAvailability}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        }
      />
      
      {saveSuccess && (
        <Alert
          variant="success"
          message="Availability settings saved successfully!"
          className="mb-6"
          dismissible
          onDismiss={() => setSaveSuccess(false)}
        />
      )}
      
      {saveError && (
        <Alert
          variant="error"
          message={saveError}
          className="mb-6"
          dismissible
          onDismiss={() => setSaveError(null)}
        />
      )}
      
      <div className="mb-6">
        <TabNavigation
          tabs={[
            { id: 'weekly', label: "General Availability" },
            { id: 'specific', label: "Specific Dates" },
            { id: 'types', label: "Consultation Types" },
            { id: 'communication', label: "Communication Preferences" }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>
      
      <Card>
        {activeTab === 'weekly' && (
          <WeeklyScheduleEditor 
            weeklySchedule={availabilitySettings.weeklySchedule}
            onChange={handleWeeklyScheduleUpdate}
          />
        )}
        
        {activeTab === 'specific' && (
          <SpecificDatesEditor
            excludedDates={availabilitySettings.excludedDates}
            onChange={handleExcludedDatesUpdate}
          />
        )}
        
        {activeTab === 'types' && (
          <ExpertiseSettings
            consultationTypes={availabilitySettings.consultationTypes}
            onChange={handleConsultationTypesUpdate}
          />
        )}
        
        {activeTab === 'communication' && (
          <CommunicationPreferences
            communicationPreferences={availabilitySettings.communicationPreferences}
            onChange={handleCommunicationPreferencesUpdate}
          />
        )}
      </Card>
      
      <div className="mt-6 flex justify-end space-x-4">
        <Button
          variant="tertiary"
          onClick={() => router.push('/medical-student/dashboard')}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveAvailability}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </PageContainer>
  );
}