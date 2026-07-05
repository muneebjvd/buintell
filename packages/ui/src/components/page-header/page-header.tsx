import React from 'react';

/**
 * Purpose: Reusable PageHeader component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'page-header'} ${className}`} 
        {...props}
      >
        {children || 'PageHeader Placeholder'}
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';
