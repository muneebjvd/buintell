import React from 'react';

/**
 * Purpose: Reusable Layout component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'layout'} ${className}`} 
        {...props}
      >
        {children || 'Layout Placeholder'}
      </div>
    );
  }
);

Layout.displayName = 'Layout';
