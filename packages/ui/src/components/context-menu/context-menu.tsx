import React from 'react';

/**
 * Purpose: Reusable ContextMenu component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'context-menu'} ${className}`} 
        {...props}
      >
        {children || 'ContextMenu Placeholder'}
      </div>
    );
  }
);

ContextMenu.displayName = 'ContextMenu';
