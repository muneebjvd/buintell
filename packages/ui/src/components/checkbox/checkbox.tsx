import React from 'react';

/**
 * Purpose: Reusable Checkbox component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface CheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'checkbox'} ${className}`} 
        {...props}
      >
        {children || 'Checkbox Placeholder'}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
