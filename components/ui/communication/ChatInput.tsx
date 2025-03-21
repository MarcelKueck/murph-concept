/**
 * ChatInput component
 * Input for typing chat messages
 */
import React, { forwardRef } from 'react';

interface ChatInputProps {
  /**
   * Current message value
   */
  value: string;
  /**
   * Change handler
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(({
  value,
  onChange,
  onSubmit,
  placeholder = 'Type your message...',
  disabled = false,
  attachEnabled = false,
  onAttach,
  className = '',
}, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };
  
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center bg-white border border-neutral-300 rounded-full pr-12 pl-4 py-2">
        {attachEnabled && (
          <button
            type="button"
            className="text-neutral-500 hover:text-neutral-700 mr-2"
            onClick={onAttach}
            disabled={disabled}
            aria-label="Attach file"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
        )}
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full focus:outline-none border-none focus:ring-0 bg-transparent placeholder:text-neutral-500"
        />
        <button
          type="button"
          className="absolute right-3 text-primary-500 hover:text-primary-600 disabled:text-neutral-300"
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
});

ChatInput.displayName = 'ChatInput';