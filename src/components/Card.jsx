import React from 'react';

export const Card = ({ children, className = '', hover = false, glass = false, ...props }) => {
  const baseClasses = 'bg-white rounded-2xl border border-slate-200/80 shadow-xs transition-all duration-300 overflow-hidden';
  const hoverClasses = hover ? 'hover:shadow-md hover:-translate-y-0.5 hover:border-emerald-200' : '';
  const glassClasses = glass ? 'glass-card' : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${glassClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-5 sm:p-6 border-b border-slate-100/80 flex flex-col gap-1 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-bold text-slate-900 tracking-tight flex items-center justify-between ${className}`}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-slate-500 font-normal leading-relaxed ${className}`}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`p-5 sm:p-6 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`p-4 sm:p-6 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between ${className}`}>
    {children}
  </div>
);

export default Card;
