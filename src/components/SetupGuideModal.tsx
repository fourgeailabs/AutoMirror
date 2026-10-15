import React from 'react';
import { X, CheckCircle2, AlertTriangle, Smartphone, Car, Terminal, Shield } from 'lucide-react';

interface SetupGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SetupGuideModal: React.FC<SetupGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Vehicle & Android Auto Setup Guide</h3>
              <div className="text-xs text-neutral-400">
                How to deploy AutoMirror onto your phone and vehicle display
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Notice Banner */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-300 leading-relaxed">
              <span className="font-semibold text-amber-300">Android Auto 3rd-Party Policy Note:</span> Google enforces strict signature filtering on Android Auto. To enable full-screen phone mirror apps like AutoMirror, you only need to check one box in Android Auto Developer Settings (no root required!).
            </div>
          </div>

          {/* Step 1 */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-bold">1</span>
              <span>Enable Unknown Sources in Android Auto</span>
            </h4>
            <div className="pl-8 text-xs text-neutral-400 space-y-1.5 leading-relaxed">
              <p>1. Open your phone's <strong>Settings</strong> &gt; search for <strong>Android Auto</strong>.</p>
              <p>2. Scroll to the very bottom to find the <strong>Version</strong> field.</p>
              <p>3. Tap on <strong>Version</strong> 10 consecutive times until the prompt says <em>"Developer mode enabled"</em>.</p>
              <p>4. Tap the three dots (⋮) in the top-right corner &gt; <strong>Developer settings</strong>.</p>
              <p>5. Scroll down and check <strong>Unknown sources</strong>.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-bold">2</span>
              <span>Install the AutoMirror APK</span>
            </h4>
            <div className="pl-8 text-xs text-neutral-400 space-y-1.5 leading-relaxed">
              <p>• Install the APK generated from GitHub Actions (or download from releases).</p>
              <p>• For seamless integration on Android 14+, you can install via <strong>KingInstaller</strong> or <strong>AAAD</strong> (Android Auto Apps Downloader), which spoof package installer permissions.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-bold">3</span>
              <span>Grant Permissions & Launch</span>
            </h4>
            <div className="pl-8 text-xs text-neutral-400 space-y-1.5 leading-relaxed">
              <p>1. Open <strong>AutoMirror</strong> on your phone.</p>
              <p>2. Grant <strong>Screen Recording (MediaProjection)</strong> permission when prompted.</p>
              <p>3. (Optional) In Phone Settings &gt; Accessibility, enable <strong>AutoMirror Touch Relay</strong> to allow controlling your phone from your car's touchscreen.</p>
              <p>4. Plug your phone into your car via USB or connect to your wireless Android Auto dongle.</p>
              <p>5. Tap the <strong>AutoMirror</strong> icon on your car screen. Your phone's entire display will immediately take over the screen edge-to-edge!</p>
            </div>
          </div>

          {/* Step 4: Desktop Head Unit (DHU) Testing */}
          <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-2">
            <div className="text-xs font-semibold text-cyan-400 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>Testing with Google Desktop Head Unit (DHU) Emulator</span>
            </div>
            <p className="text-xs text-neutral-400">
              You can test the app on your computer before plugging into your car:
            </p>
            <div className="bg-neutral-900 p-2.5 rounded border border-neutral-800 font-mono text-[11px] text-neutral-300 space-y-1">
              <div># Forward Android Auto port via ADB:</div>
              <div className="text-cyan-400">adb forward tcp:5277 tcp:5277</div>
              <div className="mt-1"># Start head unit server in Android Auto developer settings, then run:</div>
              <div className="text-cyan-400">./desktop-head-unit</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
