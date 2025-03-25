'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../../../providers/AuthProvider';

import { PageContainer } from '../../../../components/ui/layout/PageContainer';
import { PageHeader } from '../../../../components/ui/layout/PageHeader';
import { Card } from '../../../../components/ui/cards/Card';
import Button from '../../../../components/ui/buttons/Button';
import { Alert } from '../../../../components/ui/modal/Alert';

export default function MedicalStudentProfilePage() {
  const router = useRouter();
  const auth = useAuthContext();
  
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
        title="Medical Student Profile"
        subtitle="Manage your personal information and settings"
        breadcrumbs={[
          { href: '/medical-student/dashboard', label: "Dashboard" },
          { label: "Profile" }
        ]}
        actions={
          <Button
            onClick={() => safeNavigate('/medical-student/dashboard')}
            variant="secondary"
          >
            Back to Dashboard
          </Button>
        }
      />
      
      <Card>
        <Alert 
          variant="info"
          message="This page is under construction. Profile management features will be available soon."
          className="mb-6"
        />
        
        <div className="p-6 flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-neutral-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          
          <h2 className="text-xl font-semibold mb-2">Profile Page</h2>
          <p className="text-neutral-600 mb-6 text-center">
            This page will allow you to edit your profile information, including your name, contact details, and profile picture.
          </p>
          
          <div className="flex gap-4">
            <Button
              onClick={() => safeNavigate('/medical-student/profile/expertise')}
            >
              Manage Expertise
            </Button>
            <Button
              onClick={() => safeNavigate('/medical-student/dashboard')}
              variant="secondary"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}