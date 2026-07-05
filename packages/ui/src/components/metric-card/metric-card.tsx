import React from 'react';

/**
 * Purpose: Reusable MetricCard component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'metric-card'} ${className}`} 
        {...props}
      >
        {children || 'MetricCard Placeholder'}
      </div>
    );
  }
);

MetricCard.displayName = 'MetricCard';
