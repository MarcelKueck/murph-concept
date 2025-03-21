/**
 * DocumentCard component
 * Specialized card for displaying document information
 */
import React, { ReactNode } from 'react';

interface DocumentCardProps {
  /**
   * Document name
   */
  name: string;
  /**
   * Document type
   */
  type: string;
  /**
   * Upload date
   */
  uploadDate: string;
  /**
   * Optional document icon
   */
  icon?: ReactNode;
  /**
   * Optional onClick handler
   */
  onClick?: () => void;
  /**
   * Optional download handler
   */
  onDownload?: () => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  name,
  type,
  uploadDate,
  icon,
  onClick,
  onDownload,
}) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 text-neutral-500">
          {icon || (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-neutral-900 truncate">{name}</h3>
          <p className="text-sm text-neutral-500">{type}</p>
          <p className="text-xs text-neutral-400 mt-1">Uploaded on {uploadDate}</p>
        </div>
        {onDownload && (
          <div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDownload();
              }}
              className="text-primary-500 hover:text-primary-600 p-1 rounded-full hover:bg-primary-50"
              aria-label="Download document"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};