/**
 * Enhanced AsyncMessageContainer component
 * Container for asynchronous messaging with structured templates
 */
import React, { ReactNode, useState } from 'react';
import { formatDate } from '../../../lib/utils/formatters';

interface AsyncMessageContainerProps {
  /**
   * Container title
   */
  title?: string;
  /**
   * Status or timestamp
   */
  status?: string;
  /**
   * Whether to show preset templates
   */
  showTemplates?: boolean;
  /**
   * Whether to allow document sharing
   */
  allowDocuments?: boolean;
  /**
   * Whether to show a priority selector
   */
  showPriority?: boolean;
  /**
   * Optional custom actions
   */
  actions?: ReactNode;
  /**
   * Additional class names
   */
  className?: string;
  /**
   * Child components (messages, forms, etc.)
   */
  children: ReactNode;
}

export const AsyncMessageContainer: React.FC<AsyncMessageContainerProps> = ({
  title,
  status,
  showTemplates = true,
  allowDocuments = true,
  showPriority = true,
  actions,
  className = '',
  children,
}) => {
  // Template selection state
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  // Selected priority
  const [priority, setPriority] = useState<'normal' | 'urgent' | 'non-urgent'>('normal');
  
  // Message templates
  const templates = [
    {
      id: 'lab-results',
      name: 'Lab Results Explanation',
      template: 'Hello,\n\nI have reviewed your lab results and would like to provide the following explanation...\n\nThe key values I notice are:\n- [Value 1]: [Explanation]\n- [Value 2]: [Explanation]\n\nBased on these results, I recommend...',
    },
    {
      id: 'medication-info',
      name: 'Medication Information',
      template: 'Hello,\n\nRegarding your question about [Medication Name]:\n\nPurpose: [Purpose]\nTypical Dosage: [Dosage]\nCommon Side Effects: [Side Effects]\nInteractions to Watch For: [Interactions]\n\nAdditional Information: [Details]\n\nPlease consult with your doctor before making any changes to your medication regimen.',
    },
    {
      id: 'follow-up',
      name: 'Follow-up Questions',
      template: 'Hello,\n\nThank you for your message. To better assist you, I need some additional information:\n\n1. [Question 1]\n2. [Question 2]\n3. [Question 3]\n\nThis information will help me provide you with a more accurate response.',
    }
  ];
  
  // Priority options with colors
  const priorityOptions = [
    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800 border-red-200' },
    { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: 'non-urgent', label: 'Non-urgent', color: 'bg-green-100 text-green-800 border-green-200' },
  ];
  
  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    // In a real app, this would insert the template into a form
    console.log(`Selected template: ${templateId}`);
  };
  
  return (
    <div className={`border border-neutral-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
      {/* Header with title and status */}
      {(title || status) && (
        <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
          {title && <h3 className="font-medium text-neutral-900">{title}</h3>}
          {status && <span className="text-sm text-neutral-500">{status}</span>}
        </div>
      )}
      
      {/* Actions and options */}
      {(showPriority || showTemplates || allowDocuments || actions) && (
        <div className="bg-neutral-50 px-4 py-2 border-b border-neutral-200">
          <div className="flex flex-wrap gap-2 items-center">
            {/* Priority selector */}
            {showPriority && (
              <div className="flex items-center mr-4">
                <span className="text-sm text-neutral-700 mr-2">Priority:</span>
                <div className="flex space-x-1">
                  {priorityOptions.map(option => (
                    <button
                      key={option.value}
                      className={`px-2 py-1 text-xs rounded border ${
                        priority === option.value 
                          ? `${option.color} font-medium` 
                          : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                      }`}
                      onClick={() => setPriority(option.value as any)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Document button */}
            {allowDocuments && (
              <button
                className="inline-flex items-center px-2 py-1 text-sm border border-neutral-300 rounded bg-white text-neutral-700 hover:bg-neutral-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                Attach
              </button>
            )}
            
            {/* Template button */}
            {showTemplates && (
              <div className="relative group">
                <button
                  className="inline-flex items-center px-2 py-1 text-sm border border-neutral-300 rounded bg-white text-neutral-700 hover:bg-neutral-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Templates
                </button>
                
                {/* Template dropdown */}
                <div className="absolute z-10 left-0 mt-1 w-64 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
                  <div className="py-1">
                    {templates.map(template => (
                      <button
                        key={template.id}
                        className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        {template.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Custom actions */}
            {actions && (
              <div className="ml-auto">
                {actions}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="bg-white p-4">
        {children}
      </div>
    </div>
  );
};