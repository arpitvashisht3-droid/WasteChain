import React from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md focus:ring-emerald-500',
  secondary: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 focus:ring-emerald-400',
  dark: 'bg-emerald-950 hover:bg-emerald-900 text-white shadow-sm focus:ring-emerald-800',
  outline: 'border border-slate-300 hover:border-emerald-600 hover:text-emerald-700 bg-white text-slate-700 focus:ring-emerald-500',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400',
  danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-500'
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm font-semibold rounded-xl gap-2',
  lg: 'px-6 py-3.5 text-base font-semibold rounded-xl gap-2.5'
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-sans transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]';
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />
      )}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 flex-shrink-0" />
      )}
    </button>
  );
};

export default Button;
