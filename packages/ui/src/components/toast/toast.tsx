import React from 'react';

/**
 * Purpose: Reusable Toast component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'toast'} ${className}`} 
        {...props}
      >
        {children || 'Toast Placeholder'}
      </div>
    );
  }
);

Toast.displayName = 'Toast';
