import React from 'react';

/**
 * Purpose: Reusable Alert component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'alert'} ${className}`} 
        {...props}
      >
        {children || 'Alert Placeholder'}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
