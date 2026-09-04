import React from 'react';
import { Loader2, Leaf } from 'lucide-react';

export const Loader = ({ size = 'md', text = '', fullPage = false }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
      <div className="relative flex items-center justify-center">
        <Loader2 className={`${sizeMap[size] || sizeMap.md} text-emerald-600 animate-spin`} />
        <Leaf className="w-4 h-4 text-emerald-700 absolute" />
      </div>
      {text && <p className="text-sm font-medium text-slate-600 animate-pulse">{text}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 max-w-xs w-full flex justify-center">
          {loaderContent}
        </div>
      </div>
    );
  }

  return loaderContent;
};

export const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs animate-pulse space-y-4"
        >
          <div className="h-4 bg-slate-200 rounded w-1/3" />
          <div className="h-8 bg-slate-100 rounded w-full" />
          <div className="h-4 bg-slate-100 rounded w-2/3" />
        </div>
      ))}
    </>
  );
};

export default Loader;
