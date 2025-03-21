/**
 * SatisfactionSurvey component
 * Simple inline satisfaction survey
 */
import React, { useState } from 'react';

interface SatisfactionSurveyProps {
  /**
   * Question text
   */
  question: string;
  /**
   * Submit handler
   */
  onSubmit: (satisfaction: 'positive' | 'neutral' | 'negative', comment?: string) => void;
  /**
   * Whether to include a comment field
   */
  includeComment?: boolean;
  /**
   * Additional class names
   */
  className?: string;
}

export const SatisfactionSurvey: React.FC<SatisfactionSurveyProps> = ({
  question,
  onSubmit,
  includeComment = true,
  className = '',
}) => {
  const [selected, setSelected] = useState<'positive' | 'neutral' | 'negative' | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  // Handle selection
  const handleSelect = (satisfaction: 'positive' | 'neutral' | 'negative') => {
    setSelected(satisfaction);
  };
  
  // Handle submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selected) {
      onSubmit(selected, includeComment ? comment : undefined);
      setSubmitted(true);
    }
  };
  
  if (submitted) {
    return (
      <div className={`p-4 bg-neutral-50 rounded-lg border border-neutral-200 ${className}`}>
        <div className="text-center">
          <p className="text-neutral-700 mb-2">Thank you for your feedback!</p>
          <p className="text-sm text-neutral-500">Your response has been recorded.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`p-4 bg-neutral-50 rounded-lg border border-neutral-200 ${className}`}>
      <form onSubmit={handleSubmit}>
        <p className="text-neutral-700 mb-3">{question}</p>
        
        <div className="flex justify-center space-x-4 mb-4">
          {/* Positive */}
          <button
            type="button"
            className={`flex flex-col items-center p-3 rounded-lg transition ${
              selected === 'positive'
                ? 'bg-green-100 border-2 border-green-400'
                : 'bg-white border border-neutral-200 hover:bg-neutral-50'
            }`}
            onClick={() => handleSelect('positive')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="mt-1 text-sm">Yes</span>
          </button>
          
          {/* Neutral */}
          <button
            type="button"
            className={`flex flex-col items-center p-3 rounded-lg transition ${
              selected === 'neutral'
                ? 'bg-yellow-100 border-2 border-yellow-400'
                : 'bg-white border border-neutral-200 hover:bg-neutral-50'
            }`}
            onClick={() => handleSelect('neutral')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="mt-1 text-sm">Somewhat</span>
          </button>
          
          {/* Negative */}
          <button
            type="button"
            className={`flex flex-col items-center p-3 rounded-lg transition ${
              selected === 'negative'
                ? 'bg-red-100 border-2 border-red-400'
                : 'bg-white border border-neutral-200 hover:bg-neutral-50'
            }`}
            onClick={() => handleSelect('negative')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="mt-1 text-sm">No</span>
          </button>
        </div>
        
        {includeComment && selected && (
          <div className="mb-4">
            <label htmlFor="satisfaction-comment" className="block text-sm font-medium text-neutral-700 mb-1">
              Tell us more
            </label>
            <textarea
              id="satisfaction-comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Your comments help us improve..."
              className="w-full border-neutral-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-neutral-300 disabled:text-neutral-500"
            disabled={!selected}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};