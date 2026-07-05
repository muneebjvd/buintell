import React from 'react';

/**
 * Purpose: Reusable EmptyState component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'empty-state'} ${className}`} 
        {...props}
      >
        {children || 'EmptyState Placeholder'}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
