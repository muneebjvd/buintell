import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <input 
        ref={ref} 
        className={`bu-input ${error ? 'bu-input--error' : ''} ${className}`} 
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
