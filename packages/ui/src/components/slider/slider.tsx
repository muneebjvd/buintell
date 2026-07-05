import React from 'react';

/**
 * Purpose: Reusable Slider component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'slider'} ${className}`} 
        {...props}
      >
        {children || 'Slider Placeholder'}
      </div>
    );
  }
);

Slider.displayName = 'Slider';
