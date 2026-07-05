import React from 'react';

/**
 * Purpose: Reusable Sidebar component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'sidebar'} ${className}`} 
        {...props}
      >
        {children || 'Sidebar Placeholder'}
      </div>
    );
  }
);

Sidebar.displayName = 'Sidebar';
