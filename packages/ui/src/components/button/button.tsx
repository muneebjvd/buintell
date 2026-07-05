import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button 
        ref={ref} 
        className={`bu-button bu-button--${variant} bu-button--${size} ${className}`} 
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
