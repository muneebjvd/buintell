import React from 'react';

/**
 * Purpose: Reusable LoadingState component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'loading-state'} ${className}`} 
        {...props}
      >
        {children || 'LoadingState Placeholder'}
      </div>
    );
  }
);

LoadingState.displayName = 'LoadingState';
