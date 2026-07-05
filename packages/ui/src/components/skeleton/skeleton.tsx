import React from 'react';

/**
 * Purpose: Reusable Skeleton component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'skeleton'} ${className}`} 
        {...props}
      >
        {children || 'Skeleton Placeholder'}
      </div>
    );
  }
);

Skeleton.displayName = 'Skeleton';
