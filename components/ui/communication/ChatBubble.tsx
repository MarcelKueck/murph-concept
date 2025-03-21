/**
 * Chat and Communication Components
 */
import React, { ReactNode } from 'react';

/**
 * ChatBubble component
 * Displays a message bubble in a chat interface
 */
interface ChatBubbleProps {
  /**
   * Message content
   */
  message: string;
  /**
   * Timestamp for the message
   */
  timestamp: string;
  /**
   * Whether the message is from the current user
   */
  isCurrentUser: boolean;
  /**
   * Avatar element or URL
   */
  avatar?: string | ReactNode;
  /**
   * Sender name (displayed for first message in a sequence)
   */
  senderName?: string;
  /**
   * Whether this is the first message in a sequence from the same user
   */
  isFirstInSequence?: boolean;
  /**
   * Whether this is the last message in a sequence from the same user
   */
  isLastInSequence?: boolean;
  /**
   * Additional class names
   */
  className?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  timestamp,
  isCurrentUser,
  avatar,
  senderName,
  isFirstInSequence = true,
  isLastInSequence = true,
  className = '',
}) => {
  // Base bubble styles
  const bubbleBaseStyles = 'max-w-[75%] p-3 rounded-lg';
  
  // Current user or other user styles
  const bubbleStyles = isCurrentUser 
    ? 'bg-primary-50 text-neutral-900 rounded-br-none ml-auto' 
    : 'bg-neutral-100 text-neutral-900 rounded-bl-none';
  
  // First in sequence styles (affects top margin and avatar display)
  const sequenceStyles = isFirstInSequence ? 'mt-4' : 'mt-1';
  
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} ${sequenceStyles} ${className}`}>
      {!isCurrentUser && isFirstInSequence && (
        <div className="flex-shrink-0 mr-2 mt-1">
          {typeof avatar === 'string' ? (
            <img 
              src={avatar} 
              alt={senderName || 'User avatar'} 
              className="h-8 w-8 rounded-full"
            />
          ) : avatar ? (
            avatar
          ) : (
            <div className="h-8 w-8 rounded-full bg-neutral-300 flex items-center justify-center text-neutral-600">
              {senderName ? senderName.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
        </div>
      )}
      
      <div className={isCurrentUser ? '' : 'max-w-[calc(75%-2rem)]'}>
        {!isCurrentUser && isFirstInSequence && senderName && (
          <div className="text-xs font-medium text-neutral-700 ml-1 mb-1">
            {senderName}
          </div>
        )}
        
        <div className={`${bubbleBaseStyles} ${bubbleStyles}`}>
          {message}
        </div>
        
        {isLastInSequence && (
          <div className={`text-xs text-neutral-500 mt-1 ${isCurrentUser ? 'text-right mr-1' : 'ml-1'}`}>
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};