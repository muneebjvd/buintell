import React from 'react';

/**
 * Purpose: Reusable ActionBar component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface ActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const ActionBar = React.forwardRef<HTMLDivElement, ActionBarProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'action-bar'} ${className}`} 
        {...props}
      >
        {children || 'ActionBar Placeholder'}
      </div>
    );
  }
);

ActionBar.displayName = 'ActionBar';
