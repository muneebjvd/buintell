import React from 'react';

/**
 * Purpose: Reusable MultiSelect component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface MultiSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'multi-select'} ${className}`} 
        {...props}
      >
        {children || 'MultiSelect Placeholder'}
      </div>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
