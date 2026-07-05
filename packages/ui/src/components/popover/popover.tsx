import React from 'react';

/**
 * Purpose: Reusable Popover component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'popover'} ${className}`} 
        {...props}
      >
        {children || 'Popover Placeholder'}
      </div>
    );
  }
);

Popover.displayName = 'Popover';
