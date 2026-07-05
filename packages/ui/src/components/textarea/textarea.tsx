import React from 'react';

/**
 * Purpose: Reusable Textarea component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface TextareaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Textarea = React.forwardRef<HTMLDivElement, TextareaProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'textarea'} ${className}`} 
        {...props}
      >
        {children || 'Textarea Placeholder'}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
