import React, { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  type = 'text',
  className = '',
  id,
  multiline = false,
  rows = 4,
  options = [],
  children,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const baseInputClasses = `w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 disabled:bg-slate-50 disabled:text-slate-500 ${
    error ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200'
  } ${Icon ? 'pl-10' : ''} ${className}`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-slate-700 tracking-wide">
          {label}
        </label>
      )}

      <div className="relative flex items-center w-full">
        {Icon && (
          <div className="absolute left-3.5 pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        {multiline ? (
          <textarea
            ref={ref}
            id={inputId}
            rows={rows}
            className={baseInputClasses}
            {...props}
          />
        ) : type === 'select' ? (
          <select ref={ref} id={inputId} className={baseInputClasses} {...props}>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {children}
          </select>
        ) : (
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={baseInputClasses}
            {...props}
          />
        )}
      </div>

      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      {!error && helperText && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
