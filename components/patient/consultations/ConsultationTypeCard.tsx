// components/patient/consultations/ConsultationTypeCard.tsx
import React from 'react';

interface ConsultationTypeCardProps {
  /**
   * Card title
   */
  title: string;
  /**
   * Card description
   */
  description: string;
  /**
   * Card icon
   */
  icon: React.ReactNode;
  /**
   * Whether this type is selected
   */
  selected: boolean;
  /**
   * Click handler
   */
  onClick: () => void;
}

export const ConsultationTypeCard: React.FC<ConsultationTypeCardProps> = ({
  title,
  description,
  icon,
  selected,
  onClick
}) => {
  return (
    <div
      className={`p-4 rounded-lg cursor-pointer transition ${
        selected
          ? 'bg-primary-50 border-2 border-primary-500'
          : 'bg-white border border-neutral-200 hover:border-primary-300 hover:bg-primary-50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 ${selected ? 'text-primary-500' : 'text-neutral-400'}`}>
          {icon}
        </div>
        
        <div>
          <h3 className={`font-medium ${selected ? 'text-primary-700' : 'text-neutral-900'}`}>
            {title}
          </h3>
          <p className={`text-sm ${selected ? 'text-primary-600' : 'text-neutral-600'}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};