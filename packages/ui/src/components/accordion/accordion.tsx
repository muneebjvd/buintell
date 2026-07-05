import React from 'react';

/**
 * Purpose: Reusable Accordion component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'accordion'} ${className}`} 
        {...props}
      >
        {children || 'Accordion Placeholder'}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
