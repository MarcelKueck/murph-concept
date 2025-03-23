'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../../../providers/AuthProvider';

import { PageContainer } from '../../../../components/ui/layout/PageContainer';
import { PageHeader } from '../../../../components/ui/layout/PageHeader';
import { Card } from '../../../../components/ui/cards/Card';
import { SplitLayout } from '../../../../components/ui/layout/SplitLayout';
import { Input } from '../../../../components/ui/forms/Input';
import { FormGroup } from '../../../../components/ui/forms/FormGroup';
import Button from '../../../../components/ui/buttons/Button';
import { Alert } from '../../../../components/ui/modal/Alert';
import { Avatar } from '../../../../components/ui/avatar/Avatar';

export default function PatientProfilePage() {
  const router = useRouter();
  
  // Auth context with safe access
  const auth = useAuthContext();
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  
  // Loading and success state
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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
    
    // If authenticated, populate the form with user data
    if (auth.user) {
      setName(auth.user.name || '');
      setEmail(auth.user.email || '');
      // In a real app, we would fetch additional profile data from the API
      // For demo, populate with mock data
      setPhoneNumber('+49 123 456 7890');
      setDateOfBirth('1985-05-15');
      setAddress('Musterstraße 123, 10115 Berlin');
      
      setIsLoading(false);
    }
  }, [auth, router]);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!auth?.user) {
      setError('You must be logged in to update your profile');
      return;
    }
    
    setIsSaving(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For demo, simulate success after a short delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update local user data (in a real app, this would come from the API response)
      const updatedUser = {
        ...auth.user,
        name
      };
      
      // Mock success
      setSuccess(true);
      
      // Reset success after a delay
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('An error occurred while updating your profile');
      console.error('Error updating profile:', err);
    } finally {
      setIsSaving(false);
    }
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
  
  // Initial of name for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <PageContainer>
      <PageHeader 
        title="Patient Profile"
        breadcrumbs={[
          { href: '/patient/dashboard', label: 'Dashboard' },
          { label: 'Profile' }
        ]}
      />
      
      <SplitLayout
        left={
          <div className="space-y-6">
            <Card title="Personal Information">
              {success && (
                <Alert
                  variant="success"
                  message="Profile updated successfully"
                  className="mb-6"
                  dismissible
                  onDismiss={() => setSuccess(false)}
                />
              )}
              
              {error && (
                <Alert
                  variant="error"
                  message={error}
                  className="mb-6"
                  dismissible
                  onDismiss={() => setError(null)}
                />
              )}
              
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Input
                    id="name"
                    label="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                  />
                  
                  <Input
                    id="email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                    disabled
                    helperText="Email cannot be changed"
                  />
                  
                  <Input
                    id="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    fullWidth
                  />
                  
                  <Input
                    id="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    fullWidth
                  />
                  
                  <Input
                    id="address"
                    label="Address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                  />
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </FormGroup>
              </form>
            </Card>
          </div>
        }
        right={
          <div className="space-y-6">
            <Card>
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  <Avatar 
                    name={name} 
                    size="xl" 
                    shape="circle"
                  />
                </div>
                
                <h2 className="text-xl font-semibold mb-1">{name}</h2>
                <p className="text-neutral-600 mb-4">{email}</p>
                
                <Button
                  variant="secondary"
                  fullWidth
                >
                  Change Profile Picture
                </Button>
              </div>
            </Card>
            
            <Card title="Account Settings">
              <div className="space-y-4">
                <Button
                  variant="tertiary"
                  fullWidth
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  }
                >
                  Account Preferences
                </Button>
                
                <Button
                  variant="tertiary"
                  fullWidth
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  }
                >
                  Change Password
                </Button>
                
                <Button
                  variant="tertiary"
                  fullWidth
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  }
                >
                  Help & Support
                </Button>
                
                <div className="pt-4 border-t border-neutral-200">
                  <Button
                    variant="error"
                    fullWidth
                    onClick={() => {
                      if (auth?.logout) {
                        auth.logout();
                        router.push('/');
                      }
                    }}
                    leftIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zM2 4a2 2 0 012-2h6.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0117 8.414V16a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        <path d="M12 9h-1v4h-1V9H9V8h3v1z" />
                      </svg>
                    }
                  >
                    Log Out
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        }
        leftWidth={7}
      />
    </PageContainer>
  );
}