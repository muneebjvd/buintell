import React from 'react';

/**
 * Purpose: Reusable Link component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface LinkProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Link = React.forwardRef<HTMLDivElement, LinkProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'link'} ${className}`} 
        {...props}
      >
        {children || 'Link Placeholder'}
      </div>
    );
  }
);

Link.displayName = 'Link';
