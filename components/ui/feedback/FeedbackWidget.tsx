/**
 * FeedbackWidget component
 * Floating button that opens a feedback modal
 */
import React, { useState } from 'react';
import { FeedbackForm } from './FeedbackForm';

interface FeedbackWidgetProps {
  /**
   * Position of the widget
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /**
   * Submit handler
   */
  onSubmit: (feedback: {
    rating: number;
    comment: string;
    categories: string[];
  }) => void;
  /**
   * Button label
   */
  buttonLabel?: string;
  /**
   * Widget title
   */
  title?: string;
  /**
   * Categories to select from
   */
  categories?: string[];
  /**
   * Additional class names
   */
  className?: string;
}

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
  position = 'bottom-right',
  onSubmit,
  buttonLabel = 'Feedback',
  title = 'Share Your Feedback',
  categories,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };
  
  // Handle form submission
  const handleSubmit = (feedback: {
    rating: number;
    comment: string;
    categories: string[];
  }) => {
    onSubmit(feedback);
    setSubmitted(true);
    
    // Auto-close after 3 seconds
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
    }, 3000);
  };
  
  return (
    <>
      {/* Floating Button */}
      <button
        className={`fixed ${positionClasses[position]} z-50 px-4 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 shadow-lg ${className}`}
        onClick={() => setIsOpen(true)}
      >
        {buttonLabel}
      </button>
      
      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {submitted ? (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="mb-4 text-green-500 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Thank You!</h3>
                <p className="text-neutral-600 mb-4">Your feedback has been submitted successfully.</p>
                <button
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={() => {
                    setIsOpen(false);
                    setSubmitted(false);
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <FeedbackForm
                title={title}
                onSubmit={handleSubmit}
                onCancel={() => setIsOpen(false)}
                categories={categories}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};