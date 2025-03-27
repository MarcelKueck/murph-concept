'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '../../../../providers/AuthProvider';
import useConsultations from '../../../../hooks/useConsultations';
import useDocuments from '../../../../hooks/useDocuments';
import usePatientHealth from '../../../../hooks/usePatientHealth';

import { PageContainer } from '../../../../components/ui/layout/PageContainer';
import { PageHeader } from '../../../../components/ui/layout/PageHeader';
import { SplitLayout } from '../../../../components/ui/layout/SplitLayout';
import { Card } from '../../../../components/ui/cards/Card';
import Button from '../../../../components/ui/buttons/Button';
import { StatusBadge } from '../../../../components/ui/status/StatusBadge';
import { formatDate } from '../../../../lib/utils/formatters';

export default function PatientDashboardPage() {
  const t = useTranslations('patient.dashboard');
  const c = useTranslations('common.actions');
  const router = useRouter();
  
  // Get auth context
  const auth = useAuthContext();
  
  // Get data hooks
  const { consultations, fetchConsultations } = useConsultations();
  const { documents, fetchDocuments } = useDocuments();
  const { healthProfile, fetchHealthProfile, getHealthSummary } = usePatientHealth();
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Use a ref to track initialization
  const initialized = useRef(false);
  
  // One-time initialization effect
  useEffect(() => {
    if (initialized.current) return;
    
    // Skip if auth is loading or user doesn't exist
    if (!auth || auth.loading || !auth.user) return;
    
    const initializeData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch data
        await fetchConsultations(auth.user.id, 'PATIENT');
        await fetchDocuments(auth.user.id);
        await fetchHealthProfile(auth.user.id);
        
        // Mark as initialized
        initialized.current = true;
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeData();
  }, [auth, fetchConsultations, fetchDocuments, fetchHealthProfile]);
  
  // Handle redirect if not authenticated
  useEffect(() => {
    if (auth === undefined) return;
    
    if (!auth.user && !auth.loading) {
      router.push('/auth/login');
    }
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
  
  // Compute stats
  const stats = [
    {
      label: "Active Consultations",
      value: consultations.filter(c => 
        ['REQUESTED', 'ASSIGNED', 'SCHEDULED', 'IN_PROGRESS'].includes(c.status)
      ).length,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    {
      label: "Completed Consultations",
      value: consultations.filter(c => 
        ['RESOLVED', 'CLOSED'].includes(c.status)
      ).length,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: "Documents",
      value: documents.length,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      label: "Active Medications",
      value: healthProfile?.medications.length || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      label: "Last Check-up",
      value: healthProfile?.lastCheckup ? formatDate(healthProfile.lastCheckup) : "None",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: "BMI",
      value: healthProfile?.bmi ? `${healthProfile.bmi.toFixed(1)} (${getHealthSummary().bmiCategory})` : "Unknown",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];
  
  // Get upcoming consultations (scheduled and in progress)
  const upcomingConsultations = consultations
    .filter(c => ['SCHEDULED', 'IN_PROGRESS'].includes(c.status))
    .sort((a, b) => {
      // Sort by scheduled date or creation date
      const dateA = a.scheduledFor ? new Date(a.scheduledFor) : new Date(a.createdAt);
      const dateB = b.scheduledFor ? new Date(b.scheduledFor) : new Date(b.createdAt);
      return dateA.getTime() - dateB.getTime();
    });
  
  // Get recent documents
  const recentDocuments = [...documents]
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    .slice(0, 3);
  
  // Get completed consultations
  const completedConsultations = consultations
    .filter(c => ['RESOLVED', 'CLOSED'].includes(c.status))
    .sort((a, b) => {
      const dateA = a.completedAt ? new Date(a.completedAt) : new Date(a.createdAt);
      const dateB = b.completedAt ? new Date(b.completedAt) : new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 2);
  
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
      <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="p-2 rounded-md bg-primary-50 text-primary-600 mr-3">
                {stat.icon}
              </div>
              <div className="text-sm text-neutral-500">{stat.label}</div>
            </div>
            <div className="text-2xl font-semibold">{stat.value}</div>
          </div>
        ))}
      </section>
      
      {/* Main content */}
      <SplitLayout
        left={
          <div className="space-y-6">
            {/* Upcoming consultations */}
            <Card 
              title="Upcoming Consultations"
              footer={
                <div className="flex justify-end">
                  <Button
                    variant="tertiary"
                    size="small"
                    onClick={() => router.push('/patient/consultations')}
                  >
                    View All
                  </Button>
                </div>
              }
            >
              {upcomingConsultations.length > 0 ? (
                <div className="space-y-4">
                  {upcomingConsultations.map(consultation => (
                    <div 
                      key={consultation.id}
                      className="p-4 border border-neutral-200 rounded-lg hover:shadow-sm transition cursor-pointer"
                      onClick={() => router.push(`/patient/consultations/${consultation.id}`)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-neutral-900">{consultation.primaryConcern}</h3>
                        <StatusBadge status={consultation.status} />
                      </div>
                      
                      <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                        {consultation.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 justify-between items-center text-sm">
                        <div className="flex items-center text-neutral-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {consultation.scheduledFor ? (
                            <span>{formatDate(consultation.scheduledFor)}</span>
                          ) : (
                            <span>Not scheduled yet</span>
                          )}
                        </div>
                        
                        <div className="flex items-center text-neutral-500">
                          {consultation.communicationChannel === 'video' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          ) : consultation.communicationChannel === 'audio' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                          )}
                          <span className="capitalize">{consultation.communicationChannel} consultation</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">No upcoming consultations</h3>
                  <p className="text-neutral-600 mb-4">You don't have any scheduled consultations.</p>
                  <Button
                    onClick={() => router.push('/patient/consultations/new')}
                  >
                    Schedule a Consultation
                  </Button>
                </div>
              )}
            </Card>
            
            {/* Health summary */}
            <Card title="Health Summary">
              {healthProfile ? (
                <div className="space-y-4">
                  {/* Key metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-neutral-50 p-3 rounded-lg">
                      <div className="text-sm text-neutral-500 mb-1">BMI</div>
                      <div className="font-medium text-lg">{healthProfile.bmi.toFixed(1)}</div>
                      <div className={`text-sm ${healthProfile.bmi < 18.5 ? 'text-blue-500' : 
                                                healthProfile.bmi < 25 ? 'text-green-500' : 
                                                healthProfile.bmi < 30 ? 'text-yellow-500' : 
                                                'text-red-500'}`}>
                        {healthProfile.bmi < 18.5 ? 'Underweight' : 
                         healthProfile.bmi < 25 ? 'Normal' : 
                         healthProfile.bmi < 30 ? 'Overweight' : 
                         'Obese'}
                      </div>
                    </div>
                    
                    <div className="bg-neutral-50 p-3 rounded-lg">
                      <div className="text-sm text-neutral-500 mb-1">Blood Pressure</div>
                      <div className="font-medium text-lg">{healthProfile.bloodPressure}</div>
                      <div className={`text-sm ${
                        parseInt(healthProfile.bloodPressure.split('/')[0]) < 120 ? 'text-green-500' :
                        parseInt(healthProfile.bloodPressure.split('/')[0]) < 130 ? 'text-blue-500' :
                        parseInt(healthProfile.bloodPressure.split('/')[0]) < 140 ? 'text-yellow-500' :
                        'text-red-500'
                      }`}>
                        {parseInt(healthProfile.bloodPressure.split('/')[0]) < 120 ? 'Normal' :
                         parseInt(healthProfile.bloodPressure.split('/')[0]) < 130 ? 'Elevated' :
                         parseInt(healthProfile.bloodPressure.split('/')[0]) < 140 ? 'Stage 1 Hypertension' :
                         'Stage 2 Hypertension'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Chronic conditions */}
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-2">Chronic Conditions</h3>
                    {healthProfile.chronicConditions.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {healthProfile.chronicConditions.map((condition, index) => (
                          <span key={index} className="bg-yellow-50 text-yellow-800 px-2 py-1 rounded-full text-sm">
                            {condition}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-neutral-500">No chronic conditions recorded</p>
                    )}
                  </div>
                  
                  {/* Medications */}
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-2">Current Medications</h3>
                    {healthProfile.medications.length > 0 ? (
                      <div className="space-y-2">
                        {healthProfile.medications.map((med, index) => (
                          <div key={index} className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                            <div className="font-medium">{med.name} <span className="font-normal text-neutral-500">({med.dosage})</span></div>
                            <div className="text-sm text-neutral-600">{med.frequency}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-neutral-500">No medications recorded</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-4 text-center text-neutral-500">
                  No health profile available
                </div>
              )}
            </Card>
            
            {/* Previous consultations summary */}
            {completedConsultations.length > 0 && (
              <Card 
                title="Recent Completed Consultations"
                footer={
                  completedConsultations.length > 0 ? (
                    <div className="flex justify-end">
                      <Button
                        variant="tertiary"
                        size="small"
                        onClick={() => router.push('/patient/consultations?filter=past')}
                      >
                        View All
                      </Button>
                    </div>
                  ) : null
                }
              >
                <div className="space-y-4">
                  {completedConsultations.map(consultation => (
                    <div 
                      key={consultation.id}
                      className="p-4 border border-neutral-200 rounded-lg hover:shadow-sm transition cursor-pointer"
                      onClick={() => router.push(`/patient/consultations/${consultation.id}`)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-neutral-900">{consultation.primaryConcern}</h3>
                        <StatusBadge status={consultation.status} />
                      </div>
                      
                      <div className="mb-3 flex items-center text-sm text-neutral-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Completed on: {consultation.completedAt ? formatDate(consultation.completedAt) : formatDate(consultation.createdAt)}
                      </div>
                      
                      {consultation.rating && (
                        <div className="flex items-center text-sm text-yellow-500">
                          {Array.from({ length: consultation.rating }).map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-neutral-700">{consultation.rating}/5</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        }
        right={
          <div className="space-y-6">
            {/* Documents */}
            <Card 
              title="Recent Documents"
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
                    Upload
                  </Button>
                  <Button
                    variant="tertiary"
                    onClick={() => router.push('/patient/documents')}
                  >
                    View All
                  </Button>
                </div>
              }
            >
              {recentDocuments.length > 0 ? (
                <div className="space-y-3">
                  {recentDocuments.map(document => (
                    <div 
                      key={document.id}
                      className="p-3 border border-neutral-200 rounded-lg hover:shadow-sm transition cursor-pointer"
                      onClick={() => router.push(`/patient/documents#${document.id}`)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 text-neutral-500 mr-3 mt-1">
                          {document.type.includes('lab') ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                          ) : document.type.includes('imaging') ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-neutral-900 truncate">{document.name}</h4>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-neutral-500">{document.type}</span>
                            <span className="mx-1 text-neutral-300">•</span>
                            <span className="text-xs text-neutral-500">{formatDate(document.uploadedAt)}</span>
                            {document.fileSize && (
                              <>
                                <span className="mx-1 text-neutral-300">•</span>
                                <span className="text-xs text-neutral-500">{document.fileSize}</span>
                              </>
                            )}
                          </div>
                          {document.description && (
                            <p className="text-xs text-neutral-600 mt-1 line-clamp-1">{document.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">No documents yet</h3>
                  <p className="text-neutral-600 mb-4">Upload your medical documents to share with medical students.</p>
                  <Button
                    onClick={() => router.push('/patient/documents/upload')}
                  >
                    Upload Document
                  </Button>
                </div>
              )}
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
                  New Consultation
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
                  Upload Document
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
                  View Profile
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
                  All Consultations
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