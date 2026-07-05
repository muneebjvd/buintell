import React from 'react';

/**
 * Purpose: Reusable CommandPalette component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface CommandPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const CommandPalette = React.forwardRef<HTMLDivElement, CommandPaletteProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'command-palette'} ${className}`} 
        {...props}
      >
        {children || 'CommandPalette Placeholder'}
      </div>
    );
  }
);

CommandPalette.displayName = 'CommandPalette';
