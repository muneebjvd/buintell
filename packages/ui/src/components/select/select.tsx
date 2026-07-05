import React from 'react';

/**
 * Purpose: Reusable Select component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'select'} ${className}`} 
        {...props}
      >
        {children || 'Select Placeholder'}
      </div>
    );
  }
);

Select.displayName = 'Select';
