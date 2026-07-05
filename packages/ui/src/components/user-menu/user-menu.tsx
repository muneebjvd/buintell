import React from 'react';

/**
 * Purpose: Reusable UserMenu component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface UserMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const UserMenu = React.forwardRef<HTMLDivElement, UserMenuProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'user-menu'} ${className}`} 
        {...props}
      >
        {children || 'UserMenu Placeholder'}
      </div>
    );
  }
);

UserMenu.displayName = 'UserMenu';
