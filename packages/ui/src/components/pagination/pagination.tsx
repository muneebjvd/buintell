import React from 'react';

/**
 * Purpose: Reusable Pagination component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'pagination'} ${className}`} 
        {...props}
      >
        {children || 'Pagination Placeholder'}
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
