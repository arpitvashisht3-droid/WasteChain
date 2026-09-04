import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4'
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = 'md',
  showClose = true
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClass = sizes[size] || sizes.md;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Dialog container */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div
          className={`relative w-full ${sizeClass} transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all border border-slate-100 animate-fade-in`}
        >
          {/* Header */}
          {(title || showClose) && (
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                {title && <h3 className="text-lg font-bold text-slate-900">{title}</h3>}
                {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
              </div>
              {showClose && (
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="relative">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
