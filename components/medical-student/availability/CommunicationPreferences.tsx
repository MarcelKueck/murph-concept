// components/medical-student/availability/CommunicationPreferences.tsx
import React from 'react';
import { TextArea } from '../../../components/ui/forms/TextArea';

interface CommunicationPreference {
  type: 'video' | 'audio' | 'text' | 'async';
  enabled: boolean;
  notes: string;
}

interface CommunicationPreferencesProps {
  /**
   * Communication preferences
   */
  communicationPreferences: CommunicationPreference[];
  /**
   * Change handler
   */
  onChange: (preferences: CommunicationPreference[]) => void;
}

export const CommunicationPreferences: React.FC<CommunicationPreferencesProps> = ({
  communicationPreferences,
  onChange
}) => {
  // Handle toggling a preference
  const handleTogglePreference = (preferenceType: string) => {
    const updatedPreferences = communicationPreferences.map(pref => {
      if (pref.type === preferenceType) {
        return {
          ...pref,
          enabled: !pref.enabled
        };
      }
      return pref;
    });
    
    onChange(updatedPreferences);
  };
  
  // Handle notes change
  const handleNotesChange = (preferenceType: string, notes: string) => {
    const updatedPreferences = communicationPreferences.map(pref => {
      if (pref.type === preferenceType) {
        return {
          ...pref,
          notes
        };
      }
      return pref;
    });
    
    onChange(updatedPreferences);
  };
  
  // Communication type data
  const communicationTypes = [
    {
      type: 'video',
      label: "Video Call",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      description: "Real-time video consultation with patients. Requires camera and microphone."
    },
    {
      type: 'audio',
      label: "Audio Call",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      description: "Voice-only consultation with patients. Requires microphone."
    },
    {
      type: 'text',
      label: "Text Chat",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      description: "Real-time text messaging with patients."
    },
    {
      type: 'async',
      label: "Asynchronous Messaging",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: "Non-real-time messaging where you can respond within 24 hours."
    }
  ];
  
  return (
    <div>
      <div className="mb-6">
        <p className="text-neutral-700">Set your preferred communication channels for patient consultations. You can enable multiple channels.</p>
      </div>
      
      <div className="space-y-6">
        {communicationTypes.map((commType) => {
          const preference = communicationPreferences.find(p => p.type === commType.type);
          
          if (!preference) return null;
          
          return (
            <div key={commType.type} className="border border-neutral-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-neutral-50">
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preference.enabled}
                      onChange={() => handleTogglePreference(commType.type)}
                      className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-200"
                    />
                    <span className="ml-2 font-medium text-neutral-900 flex items-center">
                      <span className="text-neutral-500 mr-2">{commType.icon}</span>
                      {commType.label}
                    </span>
                  </label>
                </div>
              </div>
              
              <div className={`px-4 py-3 ${preference.enabled ? '' : 'opacity-50'}`}>
                <p className="text-sm text-neutral-700 mb-3">{commType.description}</p>
                
                <TextArea
                  id={`communication-notes-${commType.type}`}
                  label="Additional Notes"
                  value={preference.notes}
                  onChange={(e) => handleNotesChange(commType.type, e.target.value)}
                  placeholder={`Additional notes about ${commType.label} availability...`}
                  rows={3}
                  disabled={!preference.enabled}
                  fullWidth
                />
              </div>
              
              {commType.type === 'video' && (
                <div className="px-4 py-3 bg-primary-50 border-t border-primary-100">
                  <p className="text-sm text-primary-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Make sure to test your camera and microphone before your first video consultation.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Communication Tips</h3>
        <ul className="space-y-2 text-sm text-neutral-700 list-disc pl-5">
          <li>Enable multiple communication channels to accommodate different patient preferences.</li>
          <li>Video calls are excellent for situations requiring visual assessment.</li>
          <li>Asynchronous messaging works well for simple questions and follow-ups.</li>
          <li>Consider your environment and equipment when selecting communication methods.</li>
        </ul>
      </div>
    </div>
  );
};