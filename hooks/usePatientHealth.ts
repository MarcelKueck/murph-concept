/**
 * Hook for managing patient health profiles
 */
import { useState, useCallback, useRef } from 'react';

// Type definitions
interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
}

interface HealthMetric {
  date: string;
  [key: string]: any; // Allow for different health metrics
}

interface PatientHealthProfile {
  id: string;
  patientId: string;
  height: string;
  weight: string;
  bmi: number;
  bloodPressure: string;
  bloodType: string;
  allergies: string[];
  medications: Medication[];
  chronicConditions: string[];
  familyHistory: string[];
  lastCheckup: string;
  smokingStatus: 'Never' | 'Former' | 'Current';
  alcoholConsumption: 'None' | 'Occasional' | 'Moderate' | 'Heavy';
  exerciseFrequency: 'None' | 'Light' | 'Moderate' | 'Regular' | 'Intense';
  recentMetrics?: HealthMetric[];
}

interface UsePatientHealthReturn {
  /**
   * Patient health profile
   */
  healthProfile: PatientHealthProfile | null;
  /**
   * Loading state
   */
  loading: boolean;
  /**
   * Error state
   */
  error: Error | null;
  /**
   * Fetch health profile for a specific patient
   */
  fetchHealthProfile: (patientId: string) => Promise<void>;
  /**
   * Update health profile
   */
  updateHealthProfile: (updates: Partial<PatientHealthProfile>) => Promise<PatientHealthProfile>;
  /**
   * Get statistics from health profile
   */
  getHealthSummary: () => {
    conditionCount: number;
    medicationCount: number;
    allergyCount: number;
    lastCheckupDays: number | null;
    bmiCategory: string;
  };
}

/**
 * Hook for patient health profile management
 */
const usePatientHealth = (): UsePatientHealthReturn => {
  const [healthProfile, setHealthProfile] = useState<PatientHealthProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const fetchedRef = useRef<{[key: string]: boolean}>({});

  /**
   * Fetch health profile for a specific patient
   */
  const fetchHealthProfile = useCallback(async (patientId: string): Promise<void> => {
    // Skip if already fetched for this patient
    if (fetchedRef.current[patientId]) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Rich mock patient health profiles
      const mockProfiles: PatientHealthProfile[] = [
        // Maria Schmidt (p1) - Cholesterol patient
        {
          id: "hp1",
          patientId: "p1",
          height: "168 cm",
          weight: "72 kg",
          bmi: 25.5,
          bloodPressure: "125/82 mmHg",
          bloodType: "A+",
          allergies: ["Penicillin", "Dust mites"],
          medications: [
            {
              name: "Atorvastatin",
              dosage: "20mg",
              frequency: "Once daily at night",
              startDate: "2025-02-15"
            },
            {
              name: "Cetirizine",
              dosage: "10mg",
              frequency: "As needed for allergies",
              startDate: "2024-05-10"
            }
          ],
          chronicConditions: ["Hypercholesterolemia", "Seasonal allergies"],
          familyHistory: ["Father: Heart disease", "Mother: Hypertension"],
          lastCheckup: "2025-02-15",
          smokingStatus: "Never",
          alcoholConsumption: "Occasional",
          exerciseFrequency: "Light",
          recentMetrics: [
            {
              date: "2025-03-19",
              totalCholesterol: 240,
              ldl: 160,
              hdl: 45,
              triglycerides: 175
            },
            {
              date: "2025-01-15",
              totalCholesterol: 255,
              ldl: 170,
              hdl: 42,
              triglycerides: 195
            }
          ]
        },

        // Thomas Weber (p2) - Diabetes patient
        {
          id: "hp2",
          patientId: "p2",
          height: "182 cm",
          weight: "92 kg",
          bmi: 27.8,
          bloodPressure: "138/88 mmHg",
          bloodType: "O+",
          allergies: ["Sulfa drugs"],
          medications: [
            {
              name: "Metformin",
              dosage: "500mg",
              frequency: "Twice daily with meals",
              startDate: "2025-03-10"
            },
            {
              name: "Lisinopril",
              dosage: "10mg",
              frequency: "Once daily in the morning",
              startDate: "2025-01-05"
            }
          ],
          chronicConditions: ["Type 2 Diabetes (newly diagnosed)", "Hypertension"],
          familyHistory: ["Father: Type 2 Diabetes", "Mother: Hypertension"],
          lastCheckup: "2025-03-10",
          smokingStatus: "Former",
          alcoholConsumption: "Moderate",
          exerciseFrequency: "Light",
          recentMetrics: [
            {
              date: "2025-03-12",
              hba1c: 7.2,
              fastingGlucose: 135,
              postprandialGlucose: 195
            }
          ]
        },

        // Anna Becker (p3) - Asthma patient
        {
          id: "hp3",
          patientId: "p3",
          height: "165 cm",
          weight: "58 kg",
          bmi: 21.3,
          bloodPressure: "118/75 mmHg",
          bloodType: "B-",
          allergies: ["Pollen", "Cat dander"],
          medications: [
            {
              name: "Salbutamol",
              dosage: "100 mcg",
              frequency: "As needed for asthma symptoms",
              startDate: "2022-06-18"
            },
            {
              name: "Fluticasone",
              dosage: "250 mcg",
              frequency: "Twice daily",
              startDate: "2022-06-18"
            }
          ],
          chronicConditions: ["Asthma", "Seasonal allergies"],
          familyHistory: ["Mother: Asthma", "Sister: Allergies"],
          lastCheckup: "2025-02-28",
          smokingStatus: "Never",
          alcoholConsumption: "Occasional",
          exerciseFrequency: "Moderate",
          recentMetrics: [
            {
              date: "2025-02-25",
              fev1: 75,
              fvc: 88,
              fev1fvc: 0.68
            }
          ]
        },

        // Klaus Hoffmann (p4) - Heart condition patient
        {
          id: "hp4",
          patientId: "p4",
          height: "178 cm",
          weight: "85 kg",
          bmi: 26.8,
          bloodPressure: "145/92 mmHg",
          bloodType: "AB+",
          allergies: [],
          medications: [
            {
              name: "Ramipril",
              dosage: "5mg",
              frequency: "Once daily in the morning",
              startDate: "2025-03-15"
            },
            {
              name: "Aspirin",
              dosage: "81mg",
              frequency: "Once daily",
              startDate: "2025-01-10"
            }
          ],
          chronicConditions: ["Hypertension", "Coronary artery disease"],
          familyHistory: ["Father: Heart attack at 62", "Brother: Hypertension"],
          lastCheckup: "2025-03-15",
          smokingStatus: "Former",
          alcoholConsumption: "Occasional",
          exerciseFrequency: "Light",
          recentMetrics: [
            {
              date: "2025-03-14",
              systolicBP: 145,
              diastolicBP: 92,
              heartRate: 78
            }
          ]
        }
      ];
      
      // Find the profile for this patient or create a default one
      const profile = mockProfiles.find(p => p.patientId === patientId);
      
      if (profile) {
        setHealthProfile(profile);
      } else {
        // If no profile exists, create a default one
        const defaultProfile: PatientHealthProfile = {
          id: `hp_default_${patientId}`,
          patientId,
          height: "175 cm",
          weight: "70 kg",
          bmi: 22.9,
          bloodPressure: "120/80 mmHg",
          bloodType: "O+",
          allergies: [],
          medications: [],
          chronicConditions: [],
          familyHistory: [],
          lastCheckup: "2025-01-01",
          smokingStatus: 'Never',
          alcoholConsumption: 'None',
          exerciseFrequency: 'Moderate'
        };
        setHealthProfile(defaultProfile);
      }
      
      // Mark as fetched to prevent duplicate fetches
      fetchedRef.current[patientId] = true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch health profile'));
      console.error('Error fetching health profile:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update health profile
   */
  const updateHealthProfile = useCallback(async (
    updates: Partial<PatientHealthProfile>
  ): Promise<PatientHealthProfile> => {
    setLoading(true);
    setError(null);
    
    try {
      // Ensure we have a health profile to update
      if (!healthProfile) {
        throw new Error('No health profile loaded');
      }
      
      // In a real app, this would be an API call
      // For demo, we'll update the local state
      const updatedProfile = {
        ...healthProfile,
        ...updates
      };
      
      setHealthProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update health profile');
      setError(error);
      console.error('Error updating health profile:', err);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [healthProfile]);

  /**
   * Get health summary statistics
   */
  const getHealthSummary = useCallback(() => {
    if (!healthProfile) {
      return {
        conditionCount: 0,
        medicationCount: 0,
        allergyCount: 0,
        lastCheckupDays: null,
        bmiCategory: 'Unknown'
      };
    }

    // Calculate days since last checkup
    let lastCheckupDays = null;
    if (healthProfile.lastCheckup) {
      const checkupDate = new Date(healthProfile.lastCheckup);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - checkupDate.getTime());
      lastCheckupDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // Determine BMI category
    let bmiCategory = 'Unknown';
    if (healthProfile.bmi > 0) {
      if (healthProfile.bmi < 18.5) bmiCategory = 'Underweight';
      else if (healthProfile.bmi < 25) bmiCategory = 'Normal';
      else if (healthProfile.bmi < 30) bmiCategory = 'Overweight';
      else bmiCategory = 'Obese';
    }

    return {
      conditionCount: healthProfile.chronicConditions.length,
      medicationCount: healthProfile.medications.length,
      allergyCount: healthProfile.allergies.length,
      lastCheckupDays,
      bmiCategory
    };
  }, [healthProfile]);

  return {
    healthProfile,
    loading,
    error,
    fetchHealthProfile,
    updateHealthProfile,
    getHealthSummary
  };
};

export default usePatientHealth;