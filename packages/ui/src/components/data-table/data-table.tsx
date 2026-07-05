import React from 'react';

/**
 * Purpose: Reusable DataTable component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'data-table'} ${className}`} 
        {...props}
      >
        {children || 'DataTable Placeholder'}
      </div>
    );
  }
);

DataTable.displayName = 'DataTable';
