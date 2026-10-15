import React from 'react';
import {
  Smartphone,
  Sliders,
  ShieldCheck,
  Zap,
  Volume2,
  VolumeX,
  BatteryCharging,
  EyeOff,
  MousePointerClick,
  MonitorPlay,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Settings,
  HelpCircle,
  FolderGit2,
  Info
} from 'lucide-react';
import { AspectRatioMode } from '../types';
import {
  CURRENT_VERSION,
  CURRENT_VERSION_CODE,
  CREATOR_NAME,
  CREATOR_GITHUB_URL,
  APP_ID
} from '../data/releaseNotes';

interface PhoneControlCenterProps {
  isStreaming: boolean;
  onToggleStream: () => void;
  aspectMode: AspectRatioMode;
  onChangeAspect: (mode: AspectRatioMode) => void;
  fps: number;
  onChangeFps: (fps: number) => void;
  bitrateMbps: number;
  onChangeBitrate: (bitrate: number) => void;
  audioStreaming: boolean;
  onToggleAudio: () => void;
  touchRelay: boolean;
  onToggleTouchRelay: () => void;
  keepScreenOn: boolean;
  onToggleKeepScreenOn: () => void;
  dimPhoneScreen: boolean;
  onToggleDimPhoneScreen: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  onOpenGuide: () => void;
  onOpenSourceFiles: () => void;
}

export const PhoneControlCenter: React.FC<PhoneControlCenterProps> = ({
  isStreaming,
  onToggleStream,
  aspectMode,
  onChangeAspect,
  fps,
  onChangeFps,
  bitrateMbps,
  onChangeBitrate,
  audioStreaming,
  onToggleAudio,
  touchRelay,
  onToggleTouchRelay,
  keepScreenOn,
  onToggleKeepScreenOn,
  dimPhoneScreen,
  onToggleDimPhoneScreen,
  onOpenSettings,
  onOpenAbout,
  onOpenGuide,
  onOpenSourceFiles
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-5">
      {/* Phone Header Banner with Badass Lavender Icon */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#17092B] via-[#120522] to-[#0A0214] border border-purple-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-purple-400/50 shadow-lg shadow-purple-900/50 shrink-0">
            <img
              src="/automirror_lavender_icon.svg"
              alt="AutoMirror Badass Lavender Icon"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">AutoMirror Phone Center</h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                v{CURRENT_VERSION}
              </span>
            </div>
            <p className="text-xs text-purple-200/70 mt-0.5">
              Live Phone Controls & Driving Configuration for Android Auto
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSettings}
            className="px-3 py-1.5 bg-purple-950/80 hover:bg-purple-900 border border-purple-700/50 text-purple-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-purple-400" />
            <span>What's New</span>
          </button>
          <button
            onClick={onOpenAbout}
            className="px-3 py-1.5 bg-purple-950/80 hover:bg-purple-900 border border-purple-700/50 text-purple-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-purple-400" />
            <span>About</span>
          </button>
        </div>
      </div>

      {/* Primary 1-Tap Master Stream Switch */}
      <div className="p-6 rounded-2xl bg-[#130722] border border-purple-900/50 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-600'}`} />
            <span>{isStreaming ? 'MediaProjection Active (Streaming)' : 'Projection Ready (Standby)'}</span>
          </div>
          <h3 className="text-lg font-bold text-white">Live Screen Cast to Vehicle</h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-md">
            Directly mirrors your phone's full screen onto the vehicle's Android Auto display in 24:9 panoramic aspect ratio with zero speed locks.
          </p>
        </div>

        <button
          onClick={onToggleStream}
          className={`px-6 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shrink-0 ${
            isStreaming
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
              : 'bg-purple-500 hover:bg-purple-400 text-white shadow-purple-500/25 ring-2 ring-purple-400/30'
          }`}
        >
          <Smartphone className="w-5 h-5" />
          <span>{isStreaming ? 'STOP PROJECTION' : 'START LIVE MIRROR'}</span>
        </button>
      </div>

      {/* Control Menus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Menu 1: Aspect Ratio Selection (24:9 Default) */}
        <div className="p-5 rounded-2xl bg-[#130722] border border-purple-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Vehicle Screen Aspect Ratio</span>
            </span>
            <span className="text-xs font-mono text-purple-300 font-bold">
              {aspectMode}
            </span>
          </div>

          <p className="text-xs text-neutral-400">
            Select the matching aspect ratio of your car's infotainment screen:
          </p>

          <div className="grid grid-cols-5 gap-1.5">
            <button
              onClick={() => onChangeAspect('24:9')}
              className={`py-2 px-1 text-center rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                aspectMode === '24:9'
                  ? 'bg-purple-500/25 border-purple-400 text-purple-200 ring-1 ring-purple-400/50'
                  : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              24:9
            </button>
            <button
              onClick={() => onChangeAspect('21:9')}
              className={`py-2 px-1 text-center rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                aspectMode === '21:9'
                  ? 'bg-purple-500/25 border-purple-400 text-purple-200 ring-1 ring-purple-400/50'
                  : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              21:9
            </button>
            <button
              onClick={() => onChangeAspect('16:9')}
              className={`py-2 px-1 text-center rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                aspectMode === '16:9'
                  ? 'bg-purple-500/25 border-purple-400 text-purple-200 ring-1 ring-purple-400/50'
                  : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              16:9
            </button>
            <button
              onClick={() => onChangeAspect('4:3')}
              className={`py-2 px-1 text-center rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                aspectMode === '4:3'
                  ? 'bg-purple-500/25 border-purple-400 text-purple-200 ring-1 ring-purple-400/50'
                  : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              4:3
            </button>
            <button
              onClick={() => onChangeAspect('fullscreen')}
              className={`py-2 px-1 text-center rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                aspectMode === 'fullscreen'
                  ? 'bg-purple-500/25 border-purple-400 text-purple-200 ring-1 ring-purple-400/50'
                  : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              Fill
            </button>
          </div>
        </div>

        {/* Menu 2: Performance & Framerate Tuning */}
        <div className="p-5 rounded-2xl bg-[#130722] border border-purple-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Framerate & Bitrate Tuning</span>
            </span>
            <span className="text-xs font-mono text-purple-300 font-bold">
              {fps} FPS · {bitrateMbps} Mbps
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onChangeFps(60)}
              className={`py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                fps === 60
                  ? 'bg-purple-500/20 border-purple-400 text-purple-200 font-bold'
                  : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              60 FPS Ultra-Smooth
            </button>
            <button
              onClick={() => onChangeFps(30)}
              className={`py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                fps === 30
                  ? 'bg-purple-500/20 border-purple-400 text-purple-200 font-bold'
                  : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              30 FPS Power-Saver
            </button>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
              <span>Bitrate Quality:</span>
              <span className="font-mono text-purple-300 font-bold">{bitrateMbps} Mbps</span>
            </div>
            <input
              type="range"
              min="4"
              max="24"
              step="2"
              value={bitrateMbps}
              onChange={(e) => onChangeBitrate(Number(e.target.value))}
              className="w-full accent-purple-400 bg-neutral-950 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Menu 3: Touch Relay & Audio Routing */}
        <div className="p-5 rounded-2xl bg-[#130722] border border-purple-900/40 space-y-3">
          <span className="text-xs font-semibold text-white flex items-center gap-2">
            <MousePointerClick className="w-4 h-4 text-purple-400" />
            <span>Interactive Relay & Audio</span>
          </span>

          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="text-xs font-semibold text-white">Car Touch Relay</div>
              <div className="text-[11px] text-neutral-400">Translate car screen taps to phone</div>
            </div>
            <button
              onClick={onToggleTouchRelay}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                touchRelay ? 'bg-purple-500' : 'bg-neutral-800'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  touchRelay ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-purple-900/30">
            <div>
              <div className="text-xs font-semibold text-white">Vehicle Audio Streaming</div>
              <div className="text-[11px] text-neutral-400">Stream phone audio to car speakers</div>
            </div>
            <button
              onClick={onToggleAudio}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                audioStreaming ? 'bg-purple-500' : 'bg-neutral-800'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  audioStreaming ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Menu 4: Driving Safety & Battery Safeguards */}
        <div className="p-5 rounded-2xl bg-[#130722] border border-purple-900/40 space-y-3">
          <span className="text-xs font-semibold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Driving Safeguards & Battery</span>
          </span>

          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="text-xs font-semibold text-white">Keep Phone Screen Awake</div>
              <div className="text-[11px] text-neutral-400">Prevents phone sleep while driving</div>
            </div>
            <button
              onClick={onToggleKeepScreenOn}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                keepScreenOn ? 'bg-purple-500' : 'bg-neutral-800'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  keepScreenOn ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-purple-900/30">
            <div>
              <div className="text-xs font-semibold text-white">Dim Phone Screen</div>
              <div className="text-[11px] text-neutral-400">Saves battery during road trips</div>
            </div>
            <button
              onClick={onToggleDimPhoneScreen}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                dimPhoneScreen ? 'bg-purple-500' : 'bg-neutral-800'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  dimPhoneScreen ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Driver Distraction Exemption Notice Card */}
      <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs text-neutral-300">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <div className="font-semibold text-emerald-300">Driver Distraction Exemption Status: Active</div>
            <div className="text-[11px] text-neutral-400">
              Registered under Navigation Surface Category with <code className="text-purple-300 font-mono">distractionOptimized="true"</code>. Works while vehicle is in motion.
            </div>
          </div>
        </div>
        <span className="font-mono text-emerald-400 font-bold text-xs shrink-0">
          BYPASS ACTIVE
        </span>
      </div>
    </div>
  );
};
