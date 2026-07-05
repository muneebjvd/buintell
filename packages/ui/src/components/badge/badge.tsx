import React from 'react';

/**
 * Purpose: Reusable Badge component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'badge'} ${className}`} 
        {...props}
      >
        {children || 'Badge Placeholder'}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
