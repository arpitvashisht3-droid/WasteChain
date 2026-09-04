import React from 'react';
import { Check, Sparkles, Scan, Truck, PackageCheck, Layers, Recycle } from 'lucide-react';

const stagesList = [
  { key: 'Generated', label: 'Generated', icon: Sparkles, desc: 'Waste photo uploaded & registered' },
  { key: 'AI Identified', label: 'AI Identified', icon: Scan, desc: 'Material & weight analyzed by Vision AI' },
  { key: 'Collection Requested', label: 'Collection Requested', icon: Truck, desc: 'Pickup scheduled with collector' },
  { key: 'Collected', label: 'Collected', icon: PackageCheck, desc: 'Pickup verified via QR code scan' },
  { key: 'Sorted', label: 'Sorted', icon: Layers, desc: 'Pre-processed at Regional EcoHub' },
  { key: 'Recycled', label: 'Recycled', icon: Recycle, desc: 'Converted to circular raw material' }
];

export const WasteTimeline = ({ currentStageIndex = 3, timelineLogs = [] }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        Lifecycle Status Timeline
      </h4>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {stagesList.map((st, index) => {
          const Icon = st.icon;
          const isCompleted = index <= currentStageIndex;
          const isCurrent = index === currentStageIndex;

          const log = timelineLogs.find((l) => l.stage.toLowerCase() === st.key.toLowerCase());

          return (
            <div key={st.key} className="relative flex items-start gap-4 group">
              {/* Timeline Node Badge */}
              <div
                className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                    : 'bg-white border-slate-300 text-slate-300'
                } ${isCurrent ? 'ring-4 ring-emerald-500/20' : ''}`}
              >
                {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : '○'}
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                      {isCompleted ? '✓ ' : '○ '}{st.label}
                    </span>
                    {isCurrent && (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full animate-pulse">
                        Current Status
                      </span>
                    )}
                  </div>
                  {log && <span className="text-[11px] text-slate-400 font-mono">{log.timestamp}</span>}
                </div>
                <p className="text-xs text-slate-500">{log?.description || st.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WasteTimeline;
