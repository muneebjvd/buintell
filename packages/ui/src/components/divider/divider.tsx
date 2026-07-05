import React from 'react';

/**
 * Purpose: Reusable Divider component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'divider'} ${className}`} 
        {...props}
      >
        {children || 'Divider Placeholder'}
      </div>
    );
  }
);

Divider.displayName = 'Divider';
