import React from 'react';

/**
 * Purpose: Reusable Breadcrumbs component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Breadcrumbs = React.forwardRef<HTMLDivElement, BreadcrumbsProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'breadcrumbs'} ${className}`} 
        {...props}
      >
        {children || 'Breadcrumbs Placeholder'}
      </div>
    );
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';
