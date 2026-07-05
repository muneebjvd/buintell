import React from 'react';

/**
 * Purpose: Reusable ErrorState component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'error-state'} ${className}`} 
        {...props}
      >
        {children || 'ErrorState Placeholder'}
      </div>
    );
  }
);

ErrorState.displayName = 'ErrorState';
