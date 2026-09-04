import React from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const icons = {
  success: <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
  error: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
  info: <Info className="w-5 h-5 text-sky-600 flex-shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
};

const borderStyles = {
  success: 'border-l-4 border-l-emerald-500 bg-white text-slate-900',
  error: 'border-l-4 border-l-rose-500 bg-white text-slate-900',
  info: 'border-l-4 border-l-sky-500 bg-white text-slate-900',
  warning: 'border-l-4 border-l-amber-500 bg-white text-slate-900'
};

export const Toast = ({ toast, onClose }) => {
  const { type, message } = toast;

  return (
    <div
      className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-lg border border-slate-100 animate-fade-in transition-all duration-300 ${borderStyles[type] || borderStyles.info}`}
    >
      <div className="flex items-center gap-3">
        {icons[type] || icons.info}
        <p className="text-sm font-medium text-slate-800 leading-snug">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        aria-label="Dismiss toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
