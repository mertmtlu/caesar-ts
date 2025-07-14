// src/components/common/Button.tsx
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost' | 'outline';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700',
    secondary: 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 shadow-sm focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 dark:focus:ring-gray-400',
    danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700',
    success: 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white shadow-sm focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700',
    warning: 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white shadow-sm focus:ring-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-700',
    ghost: 'hover:bg-gray-100 active:bg-gray-200 text-gray-700 focus:ring-gray-500 dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:text-gray-300',
    outline: 'border border-gray-300 hover:bg-gray-50 active:bg-gray-100 text-gray-700 shadow-sm focus:ring-gray-500 dark:border-gray-600 dark:hover:bg-gray-800 dark:text-gray-300'
  };

  const sizeStyles: Record<ButtonSize, string> = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: 'px-6 py-3 text-base'
  };

  const iconSizeStyles: Record<ButtonSize, string> = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-5 h-5'
  };

  const loadingSpinnerSize: Record<ButtonSize, string> = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-5 h-5'
  };

  const isDisabled = disabled || loading;

  const buttonClasses = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? 'w-full' : '',
    isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
    className
  ].filter(Boolean).join(' ');

  const LoadingSpinner = () => (
    <svg
      className={`animate-spin ${loadingSpinnerSize[size]}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const renderLeftIcon = () => {
    if (loading) {
      return <LoadingSpinner />;
    }
    if (leftIcon) {
      return (
        <span className={`${iconSizeStyles[size]} ${children ? 'mr-2' : ''}`}>
          {leftIcon}
        </span>
      );
    }
    return null;
  };

  const renderRightIcon = () => {
    if (rightIcon && !loading) {
      return (
        <span className={`${iconSizeStyles[size]} ${children ? 'ml-2' : ''}`}>
          {rightIcon}
        </span>
      );
    }
    return null;
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={buttonClasses}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {renderLeftIcon()}
      {children && (
        <span className={loading ? 'ml-2' : ''}>
          {children}
        </span>
      )}
      {renderRightIcon()}
    </button>
  );
};

// Export variants and sizes for use in stories/tests
export const buttonVariants: ButtonVariant[] = ['primary', 'secondary', 'danger', 'success', 'warning', 'ghost', 'outline'];
export const buttonSizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export default Button;