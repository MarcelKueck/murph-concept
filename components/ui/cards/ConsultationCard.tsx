/**
 * ConsultationCard component
 * Specialized card for displaying consultation information
 */
import React from 'react';

interface ConsultationCardProps {
  /**
   * Consultation type
   */
  type: 'labResult' | 'medication' | 'imaging' | 'symptoms' | 'general';
  /**
   * Primary concern or subject
   */
  primaryConcern: string;
  /**
   * Status of the consultation
   */
  status: 'REQUESTED' | 'ASSIGNED' | 'SCHEDULED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  /**
   * Date/time information
   */
  date: string;
  /**
   * Optional description
   */
  description?: string;
  /**
   * Optional onClick handler
   */
  onClick?: () => void;
}

export const ConsultationCard: React.FC<ConsultationCardProps> = ({
  type,
  primaryConcern,
  status,
  date,
  description,
  onClick,
}) => {
  // Status configuration
  const statusConfig = {
    'REQUESTED': { color: 'neutral', label: 'Requested' },
    'ASSIGNED': { color: 'blue', label: 'Assigned' },
    'SCHEDULED': { color: 'purple', label: 'Scheduled' },
    'IN_PROGRESS': { color: 'yellow', label: 'In Progress' },
    'RESOLVED': { color: 'green', label: 'Resolved' },
    'CLOSED': { color: 'neutral', label: 'Closed' }
  };

  // Type configuration
  const typeLabel = {
    'labResult': 'Lab Result',
    'medication': 'Medication',
    'imaging': 'Imaging',
    'symptoms': 'Symptoms',
    'general': 'General'
  };

  const config = statusConfig[status];
  const statusColors = {
    'neutral': 'bg-neutral-100 text-neutral-800 border-neutral-400',
    'blue': 'bg-blue-100 text-blue-800 border-blue-400',
    'purple': 'bg-purple-100 text-purple-800 border-purple-400',
    'yellow': 'bg-yellow-100 text-yellow-800 border-yellow-400',
    'green': 'bg-green-100 text-green-800 border-green-400'
  };
  
  const borderColor = `border-l-4 ${statusColors[config.color as keyof typeof statusColors]}`;
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm p-6 ${borderColor} hover:shadow-md transition hover:translate-y-[-2px] cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
            {typeLabel[type]}
          </span>
          <h3 className="mt-2 text-lg font-semibold text-neutral-900">{primaryConcern}</h3>
          {description && <p className="text-neutral-600 mt-1">{description}</p>}
        </div>
        <div className="flex flex-col items-end">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: `var(--${config.color}-100)`, color: `var(--${config.color}-800)` }}>
            <span className="w-1.5 h-1.5 mr-1.5 rounded-full" 
                  style={{ backgroundColor: `var(--${config.color}-500)` }}></span>
            {config.label}
          </span>
          <span className="text-sm text-neutral-500 mt-2">{date}</span>
        </div>
      </div>
    </div>
  );
};