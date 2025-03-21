/**
 * ConsultationRequestSummary component
 * Summary of a consultation request for communication interfaces
 */
import React from 'react';
import { DocumentShare } from './DocumentShare';

interface ConsultationRequestSummaryProps {
  /**
   * Primary concern
   */
  primaryConcern: string;
  /**
   * Description
   */
  description?: string;
  /**
   * List of attached documents
   */
  documents?: {
    name: string;
    type: string;
    src?: string;
  }[];
  /**
   * Additional class names
   */
  className?: string;
}

export const ConsultationRequestSummary: React.FC<ConsultationRequestSummaryProps> = ({
  primaryConcern,
  description,
  documents = [],
  className = '',
}) => {
  return (
    <div className={`bg-neutral-50 border border-neutral-200 rounded-lg p-4 ${className}`}>
      <h3 className="font-medium text-neutral-900 mb-2">{primaryConcern}</h3>
      
      {description && (
        <p className="text-neutral-700 text-sm mb-4">{description}</p>
      )}
      
      {documents.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-neutral-900 mb-2">Attached Documents</h4>
          {documents.map((doc, index) => (
            <DocumentShare
              key={index}
              name={doc.name}
              type={doc.type}
              src={doc.src}
            />
          ))}
        </div>
      )}
    </div>
  );
};