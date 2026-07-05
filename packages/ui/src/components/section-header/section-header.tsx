import React from 'react';

/**
 * Purpose: Reusable SectionHeader component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'section-header'} ${className}`} 
        {...props}
      >
        {children || 'SectionHeader Placeholder'}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';
