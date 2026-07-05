import React from 'react';

/**
 * Purpose: Reusable NotificationMenu component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface NotificationMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const NotificationMenu = React.forwardRef<HTMLDivElement, NotificationMenuProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'notification-menu'} ${className}`} 
        {...props}
      >
        {children || 'NotificationMenu Placeholder'}
      </div>
    );
  }
);

NotificationMenu.displayName = 'NotificationMenu';
