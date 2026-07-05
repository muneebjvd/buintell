import React from 'react';

/**
 * Purpose: Reusable Avatar component for Buintell OS.
 * Accessibility: Follows WCAG AA guidelines.
 */

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children */
  children?: React.ReactNode;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`bu-${'avatar'} ${className}`} 
        {...props}
      >
        {children || 'Avatar Placeholder'}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
