/**
 * ProfileCard component
 * Specialized card for displaying user profile information
 */
import React, { ReactNode } from 'react';

interface ProfileCardProps {
  /**
   * User name
   */
  name: string;
  /**
   * User role or title
   */
  role: string;
  /**
   * User avatar URL
   */
  avatarUrl?: string;
  /**
   * Additional information lines to display
   */
  infoLines?: string[];
  /**
   * Optional onClick handler
   */
  onClick?: () => void;
  /**
   * Optional action button
   */
  actionButton?: ReactNode;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  role,
  avatarUrl,
  infoLines = [],
  onClick,
  actionButton,
}) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {avatarUrl ? (
            <img className="h-12 w-12 rounded-full" src={avatarUrl} alt={name} />
          ) : (
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-lg font-semibold">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-neutral-900 truncate">{name}</h3>
          <p className="text-sm text-neutral-500">{role}</p>
          {infoLines.map((line, index) => (
            <p key={index} className="text-sm text-neutral-600 mt-1">{line}</p>
          ))}
        </div>
        {actionButton && (
          <div>
            {actionButton}
          </div>
        )}
      </div>
    </div>
  );
};