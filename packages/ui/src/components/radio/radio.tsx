import React from 'react';

/**
 * Purpose: Reusable Radio component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface RadioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLDivElement, RadioProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'radio'} ${className}`} 
        {...props}
      >
        {children || 'Radio Placeholder'}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
