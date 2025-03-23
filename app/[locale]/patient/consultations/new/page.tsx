'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '../../../../../providers/AuthProvider';

import { PageContainer } from '../../../../../components/ui/layout/PageContainer';
import { PageHeader } from '../../../../../components/ui/layout/PageHeader';
import { Card } from '../../../../../components/ui/cards/Card';
import Button from '../../../../../components/ui/buttons/Button';
import { RadioGroup } from '../../../../../components/ui/forms/RadioGroup';
import { Input } from '../../../../../components/ui/forms/Input';
import { TextArea } from '../../../../../components/ui/forms/TextArea';
import { Alert } from '../../../../../components/ui/modal/Alert';

export default function NewConsultationPage() {
  // Translations with defensive coding
  const t = useTranslations('patient.consultation.new');
  
  // Try to get common translations, but provide fallbacks
  let commonActions = {};
  let commonStatus = {};
  
  try {
    commonActions = useTranslations('common.actions');
  } catch (e) {
    console.warn("Could not load common.actions translations, using fallbacks");
    // Fallback for common actions
    commonActions = {
      submit: "Submit",
      cancel: "Cancel",
      back: "Back",
      next: "Next"
    };
  }
  
  try {
    commonStatus = useTranslations('common.status');
  } catch (e) {
    console.warn("Could not load common.status translations, using fallbacks");
    // Fallback for common status
    commonStatus = {
      loading: "Loading..."
    };
  }
  
  const router = useRouter();
  
  // Auth context with safe access
  const auth = useAuthContext();
  const user = auth?.user || null;
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Current step in the process
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Form state
  const [consultationType, setConsultationType] = useState<string>('general');
  const [primaryConcern, setPrimaryConcern] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [communicationChannel, setCommunicationChannel] = useState<string>('video');
  
  // Error handling
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
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
  
  // Step validation
  const isStep1Valid = consultationType !== '';
  const isStep2Valid = primaryConcern.trim() !== '' && description.trim() !== '';
  const isStep3Valid = communicationChannel !== '';
  
  // Handle next step
  const handleNextStep = () => {
    // Validate current step
    if (currentStep === 1 && !isStep1Valid) {
      setError("Please select a consultation type");
      return;
    }
    
    if (currentStep === 2 && !isStep2Valid) {
      setError("Please provide details about your concern");
      return;
    }
    
    if (currentStep === 3 && !isStep3Valid) {
      setError("Please select a communication method");
      return;
    }
    
    setError(null);
    setCurrentStep(prev => prev + 1);
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    setError(null);
    setCurrentStep(prev => prev - 1);
  };
  
  // Handle form submission - simplified mock implementation
  const handleSubmit = async () => {
    if (!user?.id) {
      setError("You must be logged in to create a consultation");
      return;
    }
    
    try {
      // Mock submission success
      setSuccessMessage("Your consultation request has been submitted successfully!");
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/patient/dashboard');
      }, 2000);
    } catch (err) {
      setError("An error occurred while submitting your request. Please try again.");
      console.error('Error creating consultation:', err);
    }
  };
  
  // Consultation type options
  const consultationTypes = [
    {
      value: 'labResult',
      label: "Lab Result Interpretation",
      description: "Get help understanding your blood work, urine tests, or other lab results"
    },
    {
      value: 'medication',
      label: "Medication Information",
      description: "Learn about prescriptions, side effects, and interactions"
    },
    {
      value: 'imaging',
      label: "Imaging Result Explanation",
      description: "Understand your X-ray, MRI, CT scan, or ultrasound results"
    },
    {
      value: 'symptoms',
      label: "Symptom Assessment",
      description: "Discuss symptoms you're experiencing and whether you should see a doctor"
    },
    {
      value: 'general',
      label: "General Health Question",
      description: "Ask about general health topics, prevention, or wellness"
    }
  ];
  
  // Communication options
  const communicationOptions = [
    { value: 'video', label: "Video Call" },
    { value: 'audio', label: "Audio Call" },
    { value: 'text', label: "Text Chat" },
    { value: 'async', label: "Asynchronous Messaging" }
  ];
  
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
  
  // Render steps - simplified version
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-4">What type of consultation do you need?</h3>
            
            <div className="space-y-4">
              {consultationTypes.map((type) => (
                <div 
                  key={type.value}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    consultationType === type.value
                      ? 'bg-primary-50 border-primary-500'
                      : 'bg-white border-gray-200 hover:border-primary-300'
                  }`}
                  onClick={() => setConsultationType(type.value)}
                >
                  <h4 className="font-medium">{type.label}</h4>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Tell us more about your concern</h3>
            
            <div className="space-y-6">
              <Input
                id="primaryConcern"
                label="What is your primary concern?"
                placeholder="e.g., Understanding my blood test results"
                value={primaryConcern}
                onChange={(e) => setPrimaryConcern(e.target.value)}
                fullWidth
                required
              />
              
              <TextArea
                id="description"
                label="Please describe your concern in detail"
                placeholder="Provide as much information as possible to help the medical student understand your concern"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                fullWidth
                required
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Choose your communication preference</h3>
            
            <RadioGroup
              label="How would you like to communicate?"
              name="communicationChannel"
              options={communicationOptions}
              value={communicationChannel}
              onChange={(value) => setCommunicationChannel(value)}
            />
          </div>
        );
      
      case 4:
        return (
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Review your request</h3>
            
            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 mb-6">
              <div className="grid gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-700">Consultation Type:</p>
                  <p className="text-neutral-900">
                    {consultationTypes.find(type => type.value === consultationType)?.label || consultationType}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-neutral-700">Primary Concern:</p>
                  <p className="text-neutral-900">{primaryConcern}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-neutral-700">Description:</p>
                  <p className="text-neutral-900 whitespace-pre-line">{description}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-neutral-700">Communication Method:</p>
                  <p className="text-neutral-900">
                    {communicationOptions.find(option => option.value === communicationChannel)?.label || communicationChannel}
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-neutral-600 mb-6">Please review your consultation request details and submit when ready.</p>
            
            {successMessage && (
              <Alert
                variant="success"
                title="Success!"
                message={successMessage}
              />
            )}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <PageContainer>
      <PageHeader 
        title="Request a Consultation"
        breadcrumbs={[
          { href: '/patient/dashboard', label: "Dashboard" },
          { href: '/patient/consultations', label: "Consultations" },
          { label: "New Request" }
        ]}
      />
      
      <Card>
        {/* Progress steps */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step} 
                className={`text-sm font-medium ${currentStep >= step ? 'text-primary-600' : 'text-neutral-400'}`}
              >
                {step === 1 && "Type"}
                {step === 2 && "Details"}
                {step === 3 && "Communication"}
                {step === 4 && "Review"}
              </div>
            ))}
          </div>
          
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-neutral-200 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-500 rounded-full transition-all"
              style={{ width: `${(currentStep - 1) * 33.33}%` }}
            ></div>
            
            <div className="relative flex justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step} 
                  className={`flex items-center justify-center h-6 w-6 rounded-full transition-all ${
                    currentStep > step
                      ? 'bg-primary-500 text-white'
                      : currentStep === step
                      ? 'bg-primary-500 text-white ring-4 ring-primary-100'
                      : 'bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {currentStep > step ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {error && (
          <Alert
            variant="error"
            message={error}
            className="mb-4"
            dismissible
            onDismiss={() => setError(null)}
          />
        )}
        
        {/* Form content */}
        <div className="min-h-[300px]">
          {renderStep()}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 pt-4 border-t border-neutral-200">
          <Button
            variant="secondary"
            onClick={currentStep === 1 ? () => router.push('/patient/dashboard') : handlePrevStep}
          >
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>
          
          {currentStep < 4 ? (
            <Button onClick={handleNextStep}>
              {"Next"}
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={successMessage !== null}>
              {"Submit Request"}
            </Button>
          )}
        </div>
      </Card>
    </PageContainer>
  );
}