import React from 'react';

/**
 * Purpose: Reusable ChartsContainer component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface ChartsContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const ChartsContainer = React.forwardRef<HTMLDivElement, ChartsContainerProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'charts-container'} ${className}`} 
        {...props}
      >
        {children || 'ChartsContainer Placeholder'}
      </div>
    );
  }
);

ChartsContainer.displayName = 'ChartsContainer';
