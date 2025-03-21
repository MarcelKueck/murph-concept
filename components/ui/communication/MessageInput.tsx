/**
 * MessageInput component
 * Text input for messaging with formatting options
 */
import React, { forwardRef } from 'react';

interface MessageInputProps {
  /**
   * Current message value
   */
  value: string;
  /**
   * Change handler
   */
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * Submit handler
   */
  onSubmit: () => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Option to attach files
   */
  attachEnabled?: boolean;
  /**
   * Handler for file attachment
   */
  onAttach?: () => void;
  /**
   * Additional class names
   */
  className?: string;
}

export const MessageInput = forwardRef<HTMLTextAreaElement, MessageInputProps>(({
  value,
  onChange,
  onSubmit,
  placeholder = 'Type your message...',
  disabled = false,
  attachEnabled = false,
  onAttach,
  className = '',
}, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };
  
  return (
    <div className={`relative border border-neutral-300 rounded-lg bg-white ${className}`}>
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={3}
        className="w-full p-3 focus:outline-none focus:ring-0 border-none resize-none bg-transparent placeholder:text-neutral-500"
      />
      
      <div className="flex items-center justify-between px-3 py-2 border-t border-neutral-200">
        <div className="flex items-center space-x-2">
          {attachEnabled && (
            <button
              type="button"
              className="text-neutral-500 hover:text-neutral-700 p-1 rounded-full hover:bg-neutral-100"
              onClick={onAttach}
              disabled={disabled}
              aria-label="Attach file"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
          )}
          
          {/* Formatting options could go here */}
        </div>
        
        <button
          type="button"
          className="bg-primary-500 text-white px-4 py-1 rounded-md hover:bg-primary-600 disabled:bg-neutral-300 disabled:text-neutral-500"
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
});

MessageInput.displayName = 'MessageInput';