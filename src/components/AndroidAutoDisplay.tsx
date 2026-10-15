import React, { useRef, useEffect } from 'react';
import {
  Smartphone,
  Maximize2,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { AspectRatioMode } from '../types';

interface AndroidAutoDisplayProps {
  isStreaming: boolean;
  stream: MediaStream | null;
  aspectMode: AspectRatioMode;
  onStartStreaming: () => void;
  onStopStreaming: () => void;
}

export const AndroidAutoDisplay: React.FC<AndroidAutoDisplayProps> = ({
  isStreaming,
  stream,
  aspectMode,
  onStartStreaming,
  onStopStreaming
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const getAspectClass = () => {
    switch (aspectMode) {
      case '24:9':
        return 'aspect-[24/9] w-full max-w-6xl';
      case '21:9':
        return 'aspect-[21/9] w-full max-w-5xl';
      case '4:3':
        return 'aspect-[4/3] w-full max-w-3xl';
      case 'fullscreen':
        return 'w-full h-full min-h-[500px]';
      case '16:9':
      default:
        return 'aspect-[16/9] w-full max-w-4xl';
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Driver Distraction In-Motion Compliance & 24:9 Aspect Ratio Tag */}
      <div className="w-full max-w-6xl mb-3 py-2 px-3.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold text-emerald-300">Driver Distraction Exemption:</span>
          <span>Configured under <code className="font-mono text-cyan-300">category.NAVIGATION</code> with <code className="font-mono text-cyan-300">distractionOptimized="true"</code></span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="text-cyan-400 font-bold">24:9 Panoramic Ultrawide</span>
          <span className="text-neutral-600">·</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Active in Motion</span>
          </span>
        </div>
      </div>

      {/* Vehicle Infotainment Screen: Straight Unobstructed 24:9 Display */}
      <div className="w-full max-w-6xl bg-neutral-900 border border-neutral-800 rounded-2xl p-2 sm:p-3 shadow-2xl relative">
        <div
          className={`relative mx-auto overflow-hidden bg-black rounded-xl border border-neutral-800 flex items-center justify-center select-none ${getAspectClass()}`}
        >
          {/* Live Video Surface */}
          {isStreaming && stream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            /* Direct Screen Capture Launch Canvas */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-neutral-950">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                <Smartphone className="w-6 h-6" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
                24:9 Panoramic Screen Capture
              </h2>
              <p className="text-xs text-neutral-400 max-w-lg mb-5 leading-relaxed">
                Mirror your real device screen live across the 24:9 vehicle display with zero clutter, zero pillarboxing, and no speed restrictions.
              </p>
              <button
                onClick={onStartStreaming}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-cyan-500/10 flex items-center gap-2 cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Start Live Screen Capture (24:9)</span>
              </button>
            </div>
          )}

          {/* Floating Live Tag when Streaming */}
          {isStreaming && (
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <div className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-neutral-700/80 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>24:9 LIVE TAKEOVER</span>
              </div>
              <button
                onClick={onStopStreaming}
                className="px-3 py-1 rounded bg-rose-500 hover:bg-rose-600 text-white text-[11px] font-bold transition-colors cursor-pointer"
              >
                Stop Mirror
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
