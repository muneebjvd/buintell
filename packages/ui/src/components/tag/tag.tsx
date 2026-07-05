import React from 'react';

/**
 * Purpose: Reusable Tag component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'tag'} ${className}`} 
        {...props}
      >
        {children || 'Tag Placeholder'}
      </div>
    );
  }
);

Tag.displayName = 'Tag';
