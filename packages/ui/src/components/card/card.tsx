import React from 'react';

/**
 * Purpose: Reusable Card component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'card'} ${className}`} 
        {...props}
      >
        {children || 'Card Placeholder'}
      </div>
    );
  }
);

Card.displayName = 'Card';
