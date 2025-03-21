/**
 * Status Badge component
 * Specialized badge for consultation status
 */
import React from 'react';
import { Badge } from './Badge';

interface StatusBadgeProps {
  /**
   * Status value
   */
  status: 'REQUESTED' | 'ASSIGNED' | 'SCHEDULED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  /**
   * Additional class names
   */
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = '',
}) => {
  // Status configuration
  const statusConfig = {
    'REQUESTED': { variant: 'default', label: 'Requested' },
    'ASSIGNED': { variant: 'info', label: 'Assigned' },
    'SCHEDULED': { variant: 'info', label: 'Scheduled' },
    'IN_PROGRESS': { variant: 'warning', label: 'In Progress' },
    'RESOLVED': { variant: 'success', label: 'Resolved' },
    'CLOSED': { variant: 'default', label: 'Closed' }
  } as const;
  
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant={config.variant} 
      withDot={true}
      className={className}
    >
      {config.label}
    </Badge>
  );
};