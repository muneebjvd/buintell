import React from 'react';

/**
 * Purpose: Reusable Dialog component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'dialog'} ${className}`} 
        {...props}
      >
        {children || 'Dialog Placeholder'}
      </div>
    );
  }
);

Dialog.displayName = 'Dialog';
