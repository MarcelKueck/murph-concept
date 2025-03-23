import React from 'react';
import { useTranslations } from 'next-intl';
import { Checkbox } from '../../ui/forms/Checkbox';
import { EmptyState } from '../../ui/elements/EmptyState';
import { formatDate } from '../../../lib/utils/formatters';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
}

interface DocumentListProps {
  /**
   * List of documents
   */
  documents: Document[];
  /**
   * IDs of selected documents
   */
  selectedDocuments: string[];
  /**
   * Toggle document selection
   */
  onToggleDocument: (documentId: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  selectedDocuments,
  onToggleDocument
}) => {
  const t = useTranslations('patient.documents');
  
  if (documents.length === 0) {
    return (
      <EmptyState
        title={t('noDocuments')}
        description={t('uploadPrompt')}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
      />
    );
  }
  
  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-neutral-50 border-b border-neutral-200 font-medium text-sm text-neutral-700">
        {t('yourDocuments')}
      </div>
      
      <div className="divide-y divide-neutral-200">
        {documents.map((document) => (
          <div key={document.id} className="px-4 py-3 flex items-center">
            <Checkbox
              id={`document-${document.id}`}
              label=""
              checked={selectedDocuments.includes(document.id)}
              onChange={() => onToggleDocument(document.id)}
              className="mr-3"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium text-neutral-900 truncate">
                  {document.name}
                </span>
              </div>
              <div className="flex items-center mt-1 ml-7">
                <span className="text-xs text-neutral-500 mr-2">
                  {document.type}
                </span>
                <span className="text-xs text-neutral-400">
                  {formatDate(document.uploadedAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};