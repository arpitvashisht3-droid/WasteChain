import React from 'react';

const badgeVariants = {
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  green: 'bg-green-50 text-green-800 border-green-200/80',
  amber: 'bg-amber-50 text-amber-800 border-amber-200/80',
  sky: 'bg-sky-50 text-sky-700 border-sky-200/80',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
  rose: 'bg-rose-50 text-rose-700 border-rose-200/80',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
  dark: 'bg-slate-900 text-slate-100 border-slate-800'
};

const dotColors = {
  emerald: 'bg-emerald-500',
  green: 'bg-green-600',
  amber: 'bg-amber-500',
  sky: 'bg-sky-500',
  indigo: 'bg-indigo-500',
  rose: 'bg-rose-500',
  slate: 'bg-slate-400',
  dark: 'bg-emerald-400'
};

export const Badge = ({
  children,
  variant = 'emerald',
  showDot = false,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs font-medium' : 'px-2.5 py-1 text-xs font-semibold';
  const variantClass = badgeVariants[variant] || badgeVariants.emerald;
  const dotClass = dotColors[variant] || dotColors.emerald;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses} ${variantClass} ${className}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotClass} animate-pulse`} />
      )}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
