import React from 'react';

/**
 * Purpose: Reusable StatsCard component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'stats-card'} ${className}`} 
        {...props}
      >
        {children || 'StatsCard Placeholder'}
      </div>
    );
  }
);

StatsCard.displayName = 'StatsCard';
