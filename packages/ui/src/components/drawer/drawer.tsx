import React from 'react';

/**
 * Purpose: Reusable Drawer component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'drawer'} ${className}`} 
        {...props}
      >
        {children || 'Drawer Placeholder'}
      </div>
    );
  }
);

Drawer.displayName = 'Drawer';
