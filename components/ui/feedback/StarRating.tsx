/**
 * Feedback Components
 * Components for collecting user feedback
 */
import React, { useState } from 'react';

/**
 * StarRating component
 * Allows users to provide a rating on a 1-5 scale
 */
interface StarRatingProps {
  /**
   * Current rating value
   */
  value: number;
  /**
   * Change handler
   */
  onChange: (value: number) => void;
  /**
   * Number of stars to display
   */
  count?: number;
  /**
   * Size of the stars
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Label for the star rating
   */
  label?: string;
  /**
   * Whether the rating is read-only
   */
  readOnly?: boolean;
  /**
   * Additional class names
   */
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  count = 5,
  size = 'md',
  label,
  readOnly = false,
  className = '',
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  
  // Size classes
  const sizeClasses = {
    'sm': 'h-4 w-4',
    'md': 'h-6 w-6',
    'lg': 'h-8 w-8',
  };
  
  // Handle mouse enter and leave for hover effect
  const handleMouseEnter = (index: number) => {
    if (!readOnly) {
      setHoverValue(index);
    }
  };
  
  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(null);
    }
  };
  
  // Handle click to set the rating
  const handleClick = (index: number) => {
    if (!readOnly) {
      onChange(index);
    }
  };
  
  // Star color based on value, hover, and index
  const getStarColor = (index: number) => {
    const ratingValue = hoverValue !== null ? hoverValue : value;
    
    if (index <= ratingValue) {
      return 'text-yellow-400';
    }
    
    return 'text-neutral-300';
  };
  
  return (
    <div className={className}>
      {label && (
        <div className="mb-1 text-sm font-medium text-neutral-700">{label}</div>
      )}
      
      <div className="flex items-center">
        {[...Array(count)].map((_, index) => {
          const starValue = index + 1;
          
          return (
            <div
              key={index}
              className={`${readOnly ? 'cursor-default' : 'cursor-pointer'} p-1`}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(starValue)}
            >
              <svg
                className={`${sizeClasses[size]} ${getStarColor(starValue)}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
          );
        })}
        
        {!readOnly && (
          <div className="ml-2 text-sm text-neutral-600">
            {value} out of {count}
          </div>
        )}
      </div>
    </div>
  );
};