// src/components/common/Input.tsx
import React, { forwardRef, useState } from 'react';

type InputVariant = 'default' | 'error' | 'success' | 'warning';
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  variant?: InputVariant;
  size?: InputSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  required?: boolean;
  optional?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  errorMessage,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  showPasswordToggle = false,
  required = false,
  optional = false,
  type = 'text',
  className = '',
  disabled = false,
  id,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  // Generate unique ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // Determine actual input type
  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password')
    : type;

  // Determine variant based on error state
  const actualVariant = errorMessage ? 'error' : variant;

  const baseInputStyles = 'block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset transition-colors disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 dark:disabled:bg-gray-800 dark:disabled:text-gray-400 dark:disabled:ring-gray-700';

  const variantStyles: Record<InputVariant, string> = {
    default: 'text-gray-900 ring-gray-300 focus:ring-blue-600 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 dark:focus:ring-blue-500',
    error: 'text-red-900 ring-red-300 focus:ring-red-600 dark:bg-gray-800 dark:text-red-100 dark:ring-red-600 dark:focus:ring-red-500',
    success: 'text-green-900 ring-green-300 focus:ring-green-600 dark:bg-gray-800 dark:text-green-100 dark:ring-green-600 dark:focus:ring-green-500',
    warning: 'text-yellow-900 ring-yellow-300 focus:ring-yellow-600 dark:bg-gray-800 dark:text-yellow-100 dark:ring-yellow-600 dark:focus:ring-yellow-500'
  };

  const sizeStyles: Record<InputSize, string> = {
    sm: 'text-sm py-1.5 px-2.5',
    md: 'text-sm py-2 px-3',
    lg: 'text-base py-2.5 px-3.5'
  };

  const iconSizeStyles: Record<InputSize, string> = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5'
  };

  const paddingWithIcons = () => {
    let leftPadding = '';
    let rightPadding = '';
    
    if (leftIcon) {
      leftPadding = size === 'sm' ? 'pl-8' : size === 'md' ? 'pl-10' : 'pl-12';
    }
    
    if (rightIcon || showPasswordToggle) {
      rightPadding = size === 'sm' ? 'pr-8' : size === 'md' ? 'pr-10' : 'pr-12';
    }
    
    return `${leftPadding} ${rightPadding}`;
  };

  const inputClasses = [
    baseInputStyles,
    variantStyles[actualVariant],
    sizeStyles[size],
    paddingWithIcons(),
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  const labelClasses = [
    'block text-sm font-medium mb-2',
    actualVariant === 'error' ? 'text-red-700 dark:text-red-400' :
    actualVariant === 'success' ? 'text-green-700 dark:text-green-400' :
    actualVariant === 'warning' ? 'text-yellow-700 dark:text-yellow-400' :
    'text-gray-900 dark:text-gray-100'
  ].join(' ');

  const helperTextClasses = [
    'mt-2 text-sm',
    actualVariant === 'error' ? 'text-red-600 dark:text-red-400' :
    actualVariant === 'success' ? 'text-green-600 dark:text-green-400' :
    actualVariant === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
    'text-gray-500 dark:text-gray-400'
  ].join(' ');

  const PasswordToggleIcon = () => (
    <button
      type="button"
      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
      onClick={() => setShowPassword(!showPassword)}
      tabIndex={-1}
    >
      {showPassword ? (
        <svg className={iconSizeStyles[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
        </svg>
      ) : (
        <svg className={iconSizeStyles[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  );

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
          {optional && <span className="text-gray-400 ml-1">(optional)</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className={`${iconSizeStyles[size]} text-gray-400 dark:text-gray-500`}>
              {leftIcon}
            </span>
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          type={inputType}
          id={inputId}
          disabled={disabled}
          className={inputClasses}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          aria-invalid={actualVariant === 'error'}
          aria-describedby={
            errorMessage ? `${inputId}-error` :
            helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />

        {/* Right Icon or Password Toggle */}
        {showPasswordToggle && type === 'password' ? (
          <PasswordToggleIcon />
        ) : rightIcon ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className={`${iconSizeStyles[size]} text-gray-400 dark:text-gray-500`}>
              {rightIcon}
            </span>
          </div>
        ) : null}

        {/* Focus Ring Enhancement */}
        {isFocused && (
          <div className="absolute inset-0 rounded-md ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400 dark:ring-offset-gray-900 pointer-events-none" />
        )}
      </div>

      {/* Helper Text or Error Message */}
      {(errorMessage || helperText) && (
        <p 
          id={errorMessage ? `${inputId}-error` : `${inputId}-helper`}
          className={helperTextClasses}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// Export types and variants for use in stories/tests
export const inputVariants: InputVariant[] = ['default', 'error', 'success', 'warning'];
export const inputSizes: InputSize[] = ['sm', 'md', 'lg'];

export default Input;