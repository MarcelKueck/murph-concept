/**
 * FeedbackForm component
 * Complete form for collecting user feedback
 */
import React, { useState } from 'react';
import { StarRating } from './StarRating';

interface FeedbackFormProps {
  /**
   * Form title
   */
  title?: string;
  /**
   * Submit handler
   */
  onSubmit: (feedback: {
    rating: number;
    comment: string;
    categories: string[];
  }) => void;
  /**
   * Cancel/close handler
   */
  onCancel?: () => void;
  /**
   * Categories to select from
   */
  categories?: string[];
  /**
   * Initial rating value
   */
  initialRating?: number;
  /**
   * Additional class names
   */
  className?: string;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  title = 'Share Your Feedback',
  onSubmit,
  onCancel,
  categories = ['User Interface', 'Functionality', 'Performance', 'Content', 'Support'],
  initialRating = 0,
  className = '',
}) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Toggle category selection
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      rating,
      comment,
      categories: selectedCategories,
    });
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="px-6 py-4 border-b border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        </div>
        
        <div className="px-6 py-4 space-y-6">
          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              How would you rate your experience?
            </label>
            <StarRating
              value={rating}
              onChange={setRating}
              size="lg"
            />
          </div>
          
          {/* Categories */}
          {categories.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                What aspects are you providing feedback on?
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategories.includes(category)
                        ? 'bg-primary-100 text-primary-800 border border-primary-300'
                        : 'bg-neutral-100 text-neutral-700 border border-neutral-200 hover:bg-neutral-200'
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Comment */}
          <div>
            <label htmlFor="feedback-comment" className="block text-sm font-medium text-neutral-700 mb-2">
              Your feedback
            </label>
            <textarea
              id="feedback-comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience..."
              className="w-full border-neutral-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-neutral-200 flex justify-end space-x-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-neutral-300 disabled:text-neutral-500"
            disabled={rating === 0}
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};