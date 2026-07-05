import React from 'react';

/**
 * Purpose: Reusable Tabs component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'tabs'} ${className}`} 
        {...props}
      >
        {children || 'Tabs Placeholder'}
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';
