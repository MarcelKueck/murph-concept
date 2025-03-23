// app/[locale]/patient/documents/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '../../../../providers/AuthProvider';
import useDocuments from '../../../../hooks/useDocuments';

import { PageContainer } from '../../../../components/ui/layout/PageContainer';
import { PageHeader } from '../../../../components/ui/layout/PageHeader';
import { Card } from '../../../../components/ui/cards/Card';
import { EmptyState } from '../../../../components/ui/elements/EmptyState';
import Button from '../../../../components/ui/buttons/Button';
import { Alert } from '../../../../components/ui/modal/Alert';
import { formatDate } from '../../../../lib/utils/formatters';
import { Input } from '../../../../components/ui/forms/Input';

export default function DocumentsPage() {
  const t = useTranslations('patient.documents');
  const c = useTranslations('common');
  
  const router = useRouter();
  const { user } = useAuthContext();
  const { documents, loading, error, fetchDocuments, deleteDocument } = useDocuments();
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  
  // Fetch documents
  useEffect(() => {
    if (user?.id) {
      fetchDocuments(user.id);
    }
  }, [user?.id, fetchDocuments]);
  
  // Filter documents by search term
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle document view/open
  const handleViewDocument = (documentId: string) => {
    // In a real app, this would open the document
    console.log(`Opening document: ${documentId}`);
  };
  
  // Handle document download
  const handleDownloadDocument = (documentId: string) => {
    // In a real app, this would download the document
    console.log(`Downloading document: ${documentId}`);
  };
  
  // Handle document delete confirmation
  const handleDeleteConfirmation = (documentId: string) => {
    setDeleteConfirmation(documentId);
  };
  
  // Handle document deletion
  const handleDeleteDocument = async (documentId: string) => {
    try {
      await deleteDocument(documentId);
      setActionSuccess(t('deleteSuccess'));
      setDeleteConfirmation(null);
    } catch (err) {
      setActionError(c.errors.general);
    }
  };
  
  return (
    <PageContainer>
      <PageHeader 
        title={t('title')}
        breadcrumbs={[
          { href: '/patient/dashboard', label: t('breadcrumb.dashboard') },
          { label: t('breadcrumb.documents') }
        ]}
        actions={
          <Button
            onClick={() => router.push('/patient/documents/upload')}
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            }
          >
            {t('uploadDocument')}
          </Button>
        }
      />
      
      {actionSuccess && (
        <Alert
          variant="success"
          message={actionSuccess}
          className="mb-6"
          dismissible
          onDismiss={() => setActionSuccess(null)}
        />
      )}
      
      {actionError && (
        <Alert
          variant="error"
          message={actionError}
          className="mb-6"
          dismissible
          onDismiss={() => setActionError(null)}
        />
      )}
      
      <Card>
        {/* Search and filter */}
        <div className="mb-6">
          <Input
            id="search"
            placeholder={t('searchDocuments')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
            fullWidth
          />
        </div>
        
        {/* Documents list */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-neutral-500">{c.status.loading}</div>
          </div>
        ) : documents.length === 0 ? (
          <EmptyState
            title={t('noDocuments')}
            description={t('uploadPrompt')}
            action={
              <Button
                onClick={() => router.push('/patient/documents/upload')}
              >
                {t('uploadDocument')}
              </Button>
            }
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
        ) : filteredDocuments.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-neutral-500">{t('noMatchingDocuments')}</div>
          </div>
        ) : (
          <div className="overflow-hidden border border-neutral-200 rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    {t('documentName')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    {t('documentType')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    {t('uploadDate')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    {t('actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredDocuments.map((document) => (
                  <tr key={document.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div className="text-sm font-medium text-neutral-900">{document.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-500">{document.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-500">{formatDate(document.uploadedAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {deleteConfirmation === document.id ? (
                        <div className="flex justify-end space-x-2">
                          <Button
                            size="small"
                            variant="tertiary"
                            onClick={() => setDeleteConfirmation(null)}
                          >
                            {c.actions.cancel}
                          </Button>
                          <Button
                            size="small"
                            variant="error"
                            onClick={() => handleDeleteDocument(document.id)}
                          >
                            {c.actions.confirm}
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-end space-x-2">
                          <Button
                            size="small"
                            variant="tertiary"
                            onClick={() => handleViewDocument(document.id)}
                          >
                            {c.actions.view}
                          </Button>
                          <Button
                            size="small"
                            variant="tertiary"
                            onClick={() => handleDownloadDocument(document.id)}
                          >
                            {c.actions.download}
                          </Button>
                          <Button
                            size="small"
                            variant="tertiary"
                            onClick={() => handleDeleteConfirmation(document.id)}
                          >
                            {c.actions.delete}
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </PageContainer>
  );
}