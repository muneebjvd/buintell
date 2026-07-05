import React from 'react';

/**
 * Purpose: Reusable Table component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Table = React.forwardRef<HTMLDivElement, TableProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'table'} ${className}`} 
        {...props}
      >
        {children || 'Table Placeholder'}
      </div>
    );
  }
);

Table.displayName = 'Table';
