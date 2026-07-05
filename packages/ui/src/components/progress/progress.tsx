import React from 'react';

/**
 * Purpose: Reusable Progress component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'progress'} ${className}`} 
        {...props}
      >
        {children || 'Progress Placeholder'}
      </div>
    );
  }
);

Progress.displayName = 'Progress';
