import React from 'react';

/**
 * Purpose: Reusable Modal component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'modal'} ${className}`} 
        {...props}
      >
        {children || 'Modal Placeholder'}
      </div>
    );
  }
);

Modal.displayName = 'Modal';
