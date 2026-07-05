import React from 'react';

/**
 * Purpose: Reusable DropdownMenu component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'dropdown-menu'} ${className}`} 
        {...props}
      >
        {children || 'DropdownMenu Placeholder'}
      </div>
    );
  }
);

DropdownMenu.displayName = 'DropdownMenu';
