// components/medical-student/availability/ExpertiseSettings.tsx
import React from 'react';

interface ConsultationType {
  type: 'labResult' | 'medication' | 'imaging' | 'symptoms' | 'general';
  enabled: boolean;
  expertise: 1 | 2 | 3 | 4 | 5; // 1 = beginner, 5 = expert
}

interface ExpertiseSettingsProps {
  /**
   * Consultation types with expertise levels
   */
  consultationTypes: ConsultationType[];
  /**
   * Change handler
   */
  onChange: (types: ConsultationType[]) => void;
}

export const ExpertiseSettings: React.FC<ExpertiseSettingsProps> = ({
  consultationTypes,
  onChange
}) => {
  // Handle toggling a consultation type
  const handleToggleType = (typeId: string) => {
    const updatedTypes = consultationTypes.map(type => {
      if (type.type === typeId) {
        return {
          ...type,
          enabled: !type.enabled
        };
      }
      return type;
    });
    
    onChange(updatedTypes);
  };
  
  // Handle changing expertise level
  const handleChangeExpertise = (typeId: string, level: 1 | 2 | 3 | 4 | 5) => {
    const updatedTypes = consultationTypes.map(type => {
      if (type.type === typeId) {
        return {
          ...type,
          expertise: level
        };
      }
      return type;
    });
    
    onChange(updatedTypes);
  };
  
  // Consultation type labels
  const typeLabels: Record<string, string> = {
    'labResult': "Lab Results",
    'medication': "Medication",
    'imaging': "Imaging",
    'symptoms': "Symptoms",
    'general': "General Consultation"
  };
  
  // Expertise level labels
  const expertiseLevelLabels = [
    "Beginner",
    "Basic",
    "Intermediate",
    "Advanced",
    "Expert"
  ];
  
  // Render expertise level indicator
  const renderExpertiseLevel = (level: number, maxLevel: number = 5) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(maxLevel)].map((_, index) => (
          <div
            key={index}
            className={`h-2 w-8 rounded ${
              index < level
                ? 'bg-primary-500'
                : 'bg-neutral-200'
            }`}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div>
      <div className="mb-6">
        <p className="text-neutral-700">Set your expertise level for different types of consultations. This helps match you with appropriate patient requests.</p>
      </div>
      
      {/* Consultation types list */}
      <div className="space-y-6">
        {consultationTypes.map((type) => (
          <div key={type.type} className="border border-neutral-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-50">
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={type.enabled}
                    onChange={() => handleToggleType(type.type)}
                    className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-200"
                  />
                  <span className="ml-2 font-medium text-neutral-900">
                    {typeLabels[type.type]}
                  </span>
                </label>
              </div>
              
              <div className="text-sm text-neutral-700">
                {expertiseLevelLabels[type.expertise - 1]}
              </div>
            </div>
            
            <div className={`px-4 py-3 ${type.enabled ? '' : 'opacity-50'}`}>
              <p className="text-sm text-neutral-700 mb-3">Set your expertise level for this consultation type</p>
              
              <div className="flex items-center mb-2">
                {renderExpertiseLevel(type.expertise)}
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    disabled={!type.enabled}
                    className={`
                      py-1.5 text-xs font-medium rounded transition
                      ${type.expertise === level
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }
                      ${!type.enabled ? 'cursor-not-allowed' : ''}
                    `}
                    onClick={() => handleChangeExpertise(type.type, level as 1 | 2 | 3 | 4 | 5)}
                  >
                    {level}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-between text-xs text-neutral-500 mt-1">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>
            
            {type.type === 'labResult' && (
              <div className="px-4 py-3 bg-primary-50 border-t border-primary-100">
                <p className="text-sm text-primary-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Set your expertise based on your familiarity with interpreting lab results.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-neutral-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">About Expertise Levels</h3>
        <ul className="space-y-2 text-sm text-neutral-700">
          <li className="flex items-start">
            <span className="font-medium mr-2">1 - Beginner:</span>
            <span>Basic understanding, limited experience. Requires guidance for most cases.</span>
          </li>
          <li className="flex items-start">
            <span className="font-medium mr-2">2 - Basic:</span>
            <span>Familiar with fundamentals, can handle simple cases independently.</span>
          </li>
          <li className="flex items-start">
            <span className="font-medium mr-2">3 - Intermediate:</span>
            <span>Good working knowledge, comfortable with standard cases.</span>
          </li>
          <li className="flex items-start">
            <span className="font-medium mr-2">4 - Advanced:</span>
            <span>Strong expertise, can handle complex cases, few areas for improvement.</span>
          </li>
          <li className="flex items-start">
            <span className="font-medium mr-2">5 - Expert:</span>
            <span>Comprehensive knowledge, can handle unusual or difficult cases with confidence.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};