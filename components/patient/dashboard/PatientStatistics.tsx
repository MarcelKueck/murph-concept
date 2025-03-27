// components/patient/dashboard/PatientStatistics.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { StatsGroup } from '../../ui/elements/StatsGroup';
import usePatientHealth from '../../../hooks/usePatientHealth';
import useConsultations from '../../../hooks/useConsultations';
import useDocuments from '../../../hooks/useDocuments';

interface PatientStatisticsProps {
  /**
   * Patient ID
   */
  patientId: string;
}

export const PatientStatistics: React.FC<PatientStatisticsProps> = ({
  patientId
}) => {
  const { healthProfile, loading: healthLoading, fetchHealthProfile, getHealthSummary } = usePatientHealth();
  const { consultations, loading: consultationsLoading, fetchConsultations } = useConsultations();
  const { documents, loading: documentsLoading, fetchDocuments } = useDocuments();
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  
  // Fetch data separately to avoid race conditions
  useEffect(() => {
    if (!patientId) return;
    
    // Set loading state
    setLoading(true);
    
    // Sequential fetching to avoid race conditions
    const fetchData = async () => {
      try {
        await fetchConsultations(patientId, 'PATIENT');
      } catch (error) {
        console.error('Error fetching consultations:', error);
      }
    };
    
    fetchData();
  }, [patientId, fetchConsultations]);
  
  useEffect(() => {
    if (!patientId) return;
    
    const fetchDocs = async () => {
      try {
        await fetchDocuments(patientId);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    
    fetchDocs();
  }, [patientId, fetchDocuments]);
  
  useEffect(() => {
    if (!patientId) return;
    
    const fetchHealth = async () => {
      try {
        await fetchHealthProfile(patientId);
      } catch (error) {
        console.error('Error fetching health profile:', error);
      }
    };
    
    fetchHealth();
  }, [patientId, fetchHealthProfile]);
  
  // Calculate statistics when data is available
  useEffect(() => {
    if (healthLoading || consultationsLoading || documentsLoading) {
      setLoading(true);
      return;
    }
    
    setLoading(false);
    
    // Calculate statistics
    const healthSummary = getHealthSummary();
    
    // Consultation stats
    const activeConsultations = consultations.filter(c => 
      ['REQUESTED', 'ASSIGNED', 'SCHEDULED', 'IN_PROGRESS'].includes(c.status)
    ).length;
    
    const completedConsultations = consultations.filter(c => 
      ['RESOLVED', 'CLOSED'].includes(c.status)
    ).length;
    
    // Get most recent checkup message
    const checkupDaysText = healthSummary.lastCheckupDays 
      ? `${healthSummary.lastCheckupDays} days ago`
      : 'Not recorded';
    
    // Set stats for display
    setStats([
      {
        label: "Active Consultations",
        value: activeConsultations,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )
      },
      {
        label: "Completed Consultations",
        value: completedConsultations,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        label: "Documents Uploaded",
        value: documents.length,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      },
      {
        label: "Last Check-up",
        value: checkupDaysText,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        label: "Active Medications",
        value: healthSummary.medicationCount,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        )
      },
      {
        label: "Chronic Conditions",
        value: healthSummary.conditionCount,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      }
    ]);
  }, [healthLoading, consultationsLoading, documentsLoading, consultations, documents, getHealthSummary]);
  
  if (loading) {
    return (
      <div className="py-4 text-center text-gray-500">Loading statistics...</div>
    );
  }
  
  return (
    <StatsGroup 
      stats={stats}
      columns={{ sm: 2, md: 3, lg: 6 }} 
    />
  );
};