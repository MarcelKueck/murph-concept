// components/patient/dashboard/HealthSummaryCard.tsx
import React from 'react';
import { Card } from '../../ui/cards/Card';
import usePatientHealth from '../../../hooks/usePatientHealth';

interface HealthSummaryCardProps {
  /**
   * Patient health profile
   */
  healthProfile: ReturnType<typeof usePatientHealth>['healthProfile'];
  /**
   * Optional className
   */
  className?: string;
}

export const HealthSummaryCard: React.FC<HealthSummaryCardProps> = ({
  healthProfile,
  className = ''
}) => {
  if (!healthProfile) {
    return (
      <Card title="Health Summary" className={className}>
        <div className="py-4 text-center text-gray-500">
          No health profile available
        </div>
      </Card>
    );
  }

  // Function to determine BMI category and color
  const getBmiInfo = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500' };
    if (bmi < 25) return { category: 'Healthy Weight', color: 'text-green-500' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-500' };
    return { category: 'Obese', color: 'text-red-500' };
  };

  // Function to determine blood pressure category
  const getBpCategory = (bp: string) => {
    const parts = bp.split('/');
    if (parts.length !== 2) return { category: 'Unknown', color: 'text-gray-500' };
    
    const systolic = parseInt(parts[0], 10);
    const diastolic = parseInt(parts[1], 10);
    
    if (systolic < 120 && diastolic < 80) return { category: 'Normal', color: 'text-green-500' };
    if (systolic < 130 && diastolic < 80) return { category: 'Elevated', color: 'text-blue-500' };
    if (systolic < 140 || diastolic < 90) return { category: 'Stage 1 Hypertension', color: 'text-yellow-500' };
    return { category: 'Stage 2 Hypertension', color: 'text-red-500' };
  };

  const bmiInfo = getBmiInfo(healthProfile.bmi);
  const bpInfo = getBpCategory(healthProfile.bloodPressure);

  return (
    <Card title="Health Summary" className={className}>
      <div className="space-y-4">
        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-neutral-50 p-3 rounded-lg">
            <div className="text-sm text-neutral-500 mb-1">BMI</div>
            <div className="font-medium text-lg">{healthProfile.bmi.toFixed(1)}</div>
            <div className={`text-sm ${bmiInfo.color}`}>{bmiInfo.category}</div>
          </div>
          
          <div className="bg-neutral-50 p-3 rounded-lg">
            <div className="text-sm text-neutral-500 mb-1">Blood Pressure</div>
            <div className="font-medium text-lg">{healthProfile.bloodPressure}</div>
            <div className={`text-sm ${bpInfo.color}`}>{bpInfo.category}</div>
          </div>
        </div>
        
        {/* Conditions and medications */}
        <div>
          <h3 className="font-medium text-neutral-900 mb-2">Chronic Conditions</h3>
          {healthProfile.chronicConditions.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-neutral-700">
              {healthProfile.chronicConditions.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-500">No chronic conditions recorded</p>
          )}
        </div>
        
        <div>
          <h3 className="font-medium text-neutral-900 mb-2">Current Medications</h3>
          {healthProfile.medications.length > 0 ? (
            <ul className="space-y-2">
              {healthProfile.medications.map((med, index) => (
                <li key={index} className="bg-neutral-50 p-2 rounded border border-neutral-200">
                  <div className="font-medium">{med.name} ({med.dosage})</div>
                  <div className="text-sm text-neutral-600">{med.frequency}</div>
                  <div className="text-xs text-neutral-500 mt-1">Started: {new Date(med.startDate).toLocaleDateString()}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-500">No medications recorded</p>
          )}
        </div>
        
        {/* Allergies */}
        <div>
          <h3 className="font-medium text-neutral-900 mb-2">Allergies</h3>
          {healthProfile.allergies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {healthProfile.allergies.map((allergy, index) => (
                <span key={index} className="bg-red-50 text-red-700 px-2 py-1 rounded-full text-sm">
                  {allergy}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">No allergies recorded</p>
          )}
        </div>
      </div>
    </Card>
  );
};