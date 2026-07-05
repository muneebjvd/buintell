import React from 'react';

/**
 * Purpose: Reusable TopNavigation component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface TopNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const TopNavigation = React.forwardRef<HTMLDivElement, TopNavigationProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'top-navigation'} ${className}`} 
        {...props}
      >
        {children || 'TopNavigation Placeholder'}
      </div>
    );
  }
);

TopNavigation.displayName = 'TopNavigation';
