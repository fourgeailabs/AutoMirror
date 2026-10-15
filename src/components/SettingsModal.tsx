import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Settings,
  Sliders,
  Smartphone,
  EyeOff,
  BatteryCharging,
  Layers
} from 'lucide-react';
import { CURRENT_VERSION, HISTORICAL_RELEASES } from '../data/releaseNotes';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  keepScreenOn: boolean;
  onToggleKeepScreenOn: () => void;
  dimPhoneScreen: boolean;
  onToggleDimPhoneScreen: () => void;
  audioStreaming: boolean;
  onToggleAudioStreaming: () => void;
  touchRelay: boolean;
  onToggleTouchRelay: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  keepScreenOn,
  onToggleKeepScreenOn,
  dimPhoneScreen,
  onToggleDimPhoneScreen,
  audioStreaming,
  onToggleAudioStreaming,
  touchRelay,
  onToggleTouchRelay
}) => {
  const [activeTab, setActiveTab] = useState<'whats_new' | 'general'>('whats_new');
  // Starts CLOSED (null). Clicking an item opens it and closes any other open item!
  const [openReleaseVersion, setOpenReleaseVersion] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleToggleRelease = (version: string) => {
    setOpenReleaseVersion((prev) => (prev === version ? null : version));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#120522] border border-purple-900/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-purple-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Settings & Release Log</h3>
              <div className="text-xs text-purple-200/60">
                AutoMirror Configuration & What's New
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-purple-950 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-purple-900/40 px-6 pt-2 bg-[#0C0317]">
          <button
            onClick={() => setActiveTab('whats_new')}
            className={`flex items-center gap-2 pb-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'whats_new'
                ? 'border-purple-400 text-purple-300 font-bold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>What's New</span>
          </button>

          <button
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 pb-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'general'
                ? 'border-purple-400 text-purple-300 font-bold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Driving & Power Preferences</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'whats_new' ? (
            <div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-white">
                  Release History & What's New
                </h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Click any update version below to expand its release notes and technical improvements.
                </p>
              </div>

              {/* Accordion List: Every update notice starts closed and closes the previously opened one upon interaction */}
              <div className="space-y-3">
                {HISTORICAL_RELEASES.map((release) => {
                  const isCurrent = release.version === CURRENT_VERSION;
                  const isOpen = openReleaseVersion === release.version;

                  return (
                    <div
                      key={release.version}
                      className="border border-purple-900/40 rounded-xl bg-[#0B0215] overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => handleToggleRelease(release.version)}
                        className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-purple-950/40 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                              isCurrent
                                ? 'bg-purple-500/25 text-purple-200 border border-purple-500/40'
                                : 'bg-neutral-800 text-neutral-300'
                            }`}
                          >
                            v{release.version}
                          </span>
                          <div>
                            <span className="font-semibold text-white text-xs sm:text-sm">
                              {release.title}
                            </span>
                            {isCurrent && (
                              <span className="ml-2 text-[10px] text-purple-300 font-mono font-bold uppercase tracking-wider">
                                (Current Update)
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-neutral-400 shrink-0">
                          <span className="text-xs font-mono hidden sm:inline text-purple-300/70">
                            {release.date}
                          </span>
                          {isOpen ? (
                            <ChevronDown className="w-4 h-4 text-purple-300" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-neutral-400" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 py-4 border-t border-purple-900/30 bg-[#16072A]/40 space-y-3 animate-in fade-in duration-150">
                          <p className="text-xs text-neutral-300 leading-relaxed">
                            {release.notes}
                          </p>

                          <div>
                            <div className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider mb-2">
                              Key Highlights & Changes:
                            </div>
                            <ul className="space-y-1.5 text-xs text-neutral-300">
                              {release.highlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-purple-400 font-bold shrink-0 mt-0.5">•</span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-2 text-[11px] text-neutral-400 font-mono border-t border-purple-900/30 flex justify-between">
                            <span>Author: FourgeAI LABS</span>
                            <span>Package: com.fourgeailabs.automirror</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0B0215] border border-purple-900/40 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <BatteryCharging className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white">Keep Device Awake</div>
                    <div className="text-xs text-neutral-400">
                      Prevents phone screen sleep and CPU throttling during Android Auto projection.
                    </div>
                  </div>
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

              <div className="p-4 rounded-xl bg-[#0B0215] border border-purple-900/40 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <EyeOff className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white">Dim Phone Screen</div>
                    <div className="text-xs text-neutral-400">
                      Dims phone display to lowest brightness while vehicle screen remains at full clarity.
                    </div>
                  </div>
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

              <div className="p-4 rounded-xl bg-[#0B0215] border border-purple-900/40 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <Layers className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white">Vehicle Audio Routing</div>
                    <div className="text-xs text-neutral-400">
                      Redirects phone internal audio directly over Android Auto vehicle audio channel.
                    </div>
                  </div>
                </div>
                <button
                  onClick={onToggleAudioStreaming}
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

              <div className="p-4 rounded-xl bg-[#0B0215] border border-purple-900/40 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white">Accessibility Touch Relay</div>
                    <div className="text-xs text-neutral-400">
                      Translates vehicle infotainment screen taps to native phone touch events.
                    </div>
                  </div>
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
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-purple-900/40 bg-[#0C0317] flex items-center justify-between text-xs text-neutral-400">
          <div>
            AutoMirror <span className="text-purple-300 font-mono">v{CURRENT_VERSION}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-purple-900 hover:bg-purple-800 text-white rounded-lg transition-colors cursor-pointer font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
