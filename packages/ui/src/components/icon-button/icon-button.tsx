import React from 'react';

/**
 * Purpose: Reusable IconButton component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface IconButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLDivElement, IconButtonProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'icon-button'} ${className}`} 
        {...props}
      >
        {children || 'IconButton Placeholder'}
      </div>
    );
  }
);

IconButton.displayName = 'IconButton';
