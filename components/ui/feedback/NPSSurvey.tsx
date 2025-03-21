/**
 * NPS Survey component
 * Net Promoter Score survey
 */
import React, { useState } from 'react';

interface NPSSurveyProps {
  /**
   * Submit handler
   */
  onSubmit: (score: number, comment?: string) => void;
  /**
   * Title text
   */
  title?: string;
  /**
   * Question text
   */
  question?: string;
  /**
   * Whether to include a comment field
   */
  includeComment?: boolean;
  /**
   * Additional class names
   */
  className?: string;
}

export const NPSSurvey: React.FC<NPSSurveyProps> = ({
  onSubmit,
  title = 'Your Feedback Matters',
  question = 'How likely are you to recommend us to a friend or colleague?',
  includeComment = true,
  className = '',
}) => {
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  // Handle selection
  const handleSelect = (value: number) => {
    setScore(value);
  };
  
  // Handle submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (score !== null) {
      onSubmit(score, includeComment ? comment : undefined);
      setSubmitted(true);
    }
  };
  
  if (submitted) {
    return (
      <div className={`p-6 bg-white rounded-lg border border-neutral-200 shadow-sm ${className}`}>
        <div className="text-center">
          <div className="mb-4 text-green-500 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Thank You!</h3>
          <p className="text-neutral-600">Your feedback is valuable and helps us improve our service.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`p-6 bg-white rounded-lg border border-neutral-200 shadow-sm ${className}`}>
      <form onSubmit={handleSubmit}>
        {title && (
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
        )}
        
        <p className="text-neutral-700 mb-4">{question}</p>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-neutral-500">Not likely</span>
            <span className="text-sm text-neutral-500">Very likely</span>
          </div>
          <div className="flex justify-between">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <button
                key={value}
                type="button"
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition ${
                  score === value
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                onClick={() => handleSelect(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        
        {includeComment && (
          <div className="mb-4">
            <label htmlFor="nps-comment" className="block text-sm font-medium text-neutral-700 mb-1">
              What&apos;s the primary reason for your score?
            </label>
            <textarea
              id="nps-comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Please share your thoughts..."
              className="w-full border-neutral-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-neutral-300 disabled:text-neutral-500"
            disabled={score === null}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};