import React from 'react';
import {
  Sliders,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { AspectRatioMode } from '../types';

interface ControlDeckProps {
  isStreaming: boolean;
  onToggleStream: () => void;
  aspectMode: AspectRatioMode;
  onChangeAspect: (mode: AspectRatioMode) => void;
}

export const ControlDeck: React.FC<ControlDeckProps> = ({
  isStreaming,
  onToggleStream,
  aspectMode,
  onChangeAspect
}) => {
  return (
    <div className="w-full max-w-6xl mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Vehicle Display Aspect Ratio */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-white flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Vehicle Screen Aspect Ratio</span>
          </span>
          <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold">
            {aspectMode === '24:9' ? '24:9 Panoramic Ultrawide (Active)' : aspectMode}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          <button
            onClick={() => onChangeAspect('24:9')}
            className={`py-2 px-1 text-center rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              aspectMode === '24:9'
                ? 'bg-cyan-500/20 border-cyan-500 text-white font-bold ring-1 ring-cyan-500/50'
                : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            24:9
          </button>
          <button
            onClick={() => onChangeAspect('21:9')}
            className={`py-2 px-1 text-center rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              aspectMode === '21:9'
                ? 'bg-cyan-500/15 border-cyan-500 text-white font-bold ring-1 ring-cyan-500/50'
                : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            21:9
          </button>
          <button
            onClick={() => onChangeAspect('16:9')}
            className={`py-2 px-1 text-center rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              aspectMode === '16:9'
                ? 'bg-cyan-500/15 border-cyan-500 text-white font-bold ring-1 ring-cyan-500/50'
                : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            16:9
          </button>
          <button
            onClick={() => onChangeAspect('4:3')}
            className={`py-2 px-1 text-center rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              aspectMode === '4:3'
                ? 'bg-cyan-500/15 border-cyan-500 text-white font-bold ring-1 ring-cyan-500/50'
                : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            4:3
          </button>
          <button
            onClick={() => onChangeAspect('fullscreen')}
            className={`py-2 px-1 text-center rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              aspectMode === 'fullscreen'
                ? 'bg-cyan-500/15 border-cyan-500 text-white font-bold ring-1 ring-cyan-500/50'
                : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            Fill
          </button>
        </div>
      </div>

      {/* Driver Distraction Status Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>In-Motion Safety Exemption</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              UNRESTRICTED
            </span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Operating as a Navigation-class surface with <code className="text-cyan-400 font-mono">distractionOptimized="true"</code>. The vehicle's infotainment system will not black out the screen when the car is driving.
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-neutral-800 flex items-center justify-between">
          <span className="text-[11px] text-neutral-400 font-mono">Aspect: 24:9 Panoramic</span>
          <button
            onClick={onToggleStream}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isStreaming
                ? 'bg-rose-500 hover:bg-rose-600 text-white'
                : 'bg-cyan-500 hover:bg-cyan-400 text-neutral-950'
            }`}
          >
            {isStreaming ? 'Stop Projection' : 'Start Capture (24:9)'}
          </button>
        </div>
      </div>
    </div>
  );
};
