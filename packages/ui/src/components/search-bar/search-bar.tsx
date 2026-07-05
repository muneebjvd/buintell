import React from 'react';

/**
 * Purpose: Reusable SearchBar component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'search-bar'} ${className}`} 
        {...props}
      >
        {children || 'SearchBar Placeholder'}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
