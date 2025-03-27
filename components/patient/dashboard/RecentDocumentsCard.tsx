// components/patient/dashboard/RecentDocumentsCard.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '../../ui/cards/Card';
import { EmptyState } from '../../ui/elements/EmptyState';
import Button from '../../ui/buttons/Button';
import { formatDate } from '../../../lib/utils/formatters';

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  description?: string;
  fileSize?: string;
}

interface RecentDocumentsCardProps {
  /**
   * Documents data
   */
  documents: Document[];
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Empty state message
   */
  emptyStateMessage?: string;
  /**
   * Optional className
   */
  className?: string;
}

export const RecentDocumentsCard: React.FC<RecentDocumentsCardProps> = ({
  documents,
  loading = false,
  emptyStateMessage = "You haven't uploaded any documents yet",
  className = ''
}) => {
  const router = useRouter();
  
  // Sort by upload date (most recent first)
  const sortedDocuments = [...documents].sort((a, b) => 
    new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );
  
  // Get the 4 most recent documents
  const recentDocuments = sortedDocuments.slice(0, 4);
  
  // Get document icon
  const getDocumentIcon = (type: string) => {
    if (type.includes('lab_result')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    } else if (type.includes('imaging')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    } else if (type.includes('prescription') || type.includes('medication')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    }
  };

  if (loading) {
    return (
      <Card title="Recent Documents" className={className}>
        <div className="py-4 text-center text-gray-500">Loading documents...</div>
      </Card>
    );
  }

  return (
    <Card 
      title="Recent Documents"
      footer={
        recentDocuments.length > 0 ? (
          <div className="flex justify-between">
            <Button
              variant="secondary"
              onClick={() => router.push('/patient/documents/upload')}
              leftIcon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              }
            >
              Upload New
            </Button>
            <Button
              variant="tertiary"
              onClick={() => router.push('/patient/documents')}
            >
              View All
            </Button>
          </div>
        ) : null
      }
      className={className}
    >
      {recentDocuments.length > 0 ? (
        <div className="space-y-3">
          {recentDocuments.map(document => (
            <div
              key={document.id}
              className="p-3 border border-neutral-200 rounded-lg hover:shadow-sm transition cursor-pointer"
              onClick={() => router.push(`/patient/documents#${document.id}`)}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 text-neutral-500 mr-3 mt-1">
                  {getDocumentIcon(document.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-neutral-900 truncate">{document.name}</h4>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-neutral-500">{document.type}</span>
                    <span className="mx-1 text-neutral-300">•</span>
                    <span className="text-xs text-neutral-500">{formatDate(document.uploadedAt)}</span>
                    {document.fileSize && (
                      <>
                        <span className="mx-1 text-neutral-300">•</span>
                        <span className="text-xs text-neutral-500">{document.fileSize}</span>
                      </>
                    )}
                  </div>
                  {document.description && (
                    <p className="text-xs text-neutral-600 mt-1 line-clamp-1">{document.description}</p>
                  )}
                </div>
                <div className="flex-shrink-0 ml-2">
                  <Button
                    size="small"
                    variant="tertiary"
                    onClick={(e) => {
                      e.stopPropagation();
                      // In a real app, this would trigger a download
                      console.log(`Downloading document: ${document.id}`);
                    }}
                    ariaLabel="Download document"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title={emptyStateMessage}
          description="Upload your medical documents to share with consultants."
          action={
            <Button
              onClick={() => router.push('/patient/documents/upload')}
            >
              Upload Document
            </Button>
          }
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
      )}
    </Card>
  );
};