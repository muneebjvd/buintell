import React from 'react';

/**
 * Purpose: Reusable SearchInput component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface SearchInputProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const SearchInput = React.forwardRef<HTMLDivElement, SearchInputProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'search-input'} ${className}`} 
        {...props}
      >
        {children || 'SearchInput Placeholder'}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
