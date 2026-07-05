import React from 'react';

/**
 * Purpose: Reusable Tooltip component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'tooltip'} ${className}`} 
        {...props}
      >
        {children || 'Tooltip Placeholder'}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
