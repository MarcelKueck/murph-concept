'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../../../../providers/AuthProvider';

import { PageContainer } from '../../../../../components/ui/layout/PageContainer';
import { PageHeader } from '../../../../../components/ui/layout/PageHeader';
import { Card } from '../../../../../components/ui/cards/Card';
import Button from '../../../../../components/ui/buttons/Button';
import { Alert } from '../../../../../components/ui/modal/Alert';
import { ExpertiseSettings } from '../../../../../components/medical-student/availability/ExpertiseSettings';

interface ConsultationType {
  type: 'labResult' | 'medication' | 'imaging' | 'symptoms' | 'general';
  enabled: boolean;
  expertise: 1 | 2 | 3 | 4 | 5; // 1 = beginner, 5 = expert
}

export default function MedicalStudentExpertisePage() {
  const router = useRouter();
  const auth = useAuthContext();
  
  // Mock expertise data
  const [consultationTypes, setConsultationTypes] = useState<ConsultationType[]>([
    { type: 'labResult', enabled: true, expertise: 4 },
    { type: 'medication', enabled: true, expertise: 3 },
    { type: 'imaging', enabled: true, expertise: 2 },
    { type: 'symptoms', enabled: true, expertise: 3 },
    { type: 'general', enabled: true, expertise: 5 }
  ]);
  
  // Save state
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
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
  
  // Safe navigation function
  const safeNavigate = (path: string) => {
    setTimeout(() => {
      router.push(path);
    }, 0);
  };
  
  // Handle expertise update
  const handleExpertiseUpdate = (types: ConsultationType[]) => {
    setConsultationTypes(types);
  };
  
  // Handle save
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // In a real app, this would save to the server
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving expertise:', error);
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
        title="Manage Expertise"
        subtitle="Set your expertise levels for different consultation types"
        breadcrumbs={[
          { href: '/medical-student/dashboard', label: "Dashboard" },
          { href: '/medical-student/profile', label: "Profile" },
          { label: "Expertise" }
        ]}
        actions={
          <Button
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        }
      />
      
      {saveSuccess && (
        <Alert
          variant="success"
          message="Expertise settings saved successfully!"
          className="mb-6"
          dismissible
          onDismiss={() => setSaveSuccess(false)}
        />
      )}
      
      <Card>
        <ExpertiseSettings
          consultationTypes={consultationTypes}
          onChange={handleExpertiseUpdate}
        />
      </Card>
      
      <div className="mt-6 flex justify-end space-x-4">
        <Button
          variant="tertiary"
          onClick={() => safeNavigate('/medical-student/profile')}
        >
          Back to Profile
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </PageContainer>
  );
}