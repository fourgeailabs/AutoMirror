import React from 'react';
import { Smartphone, HelpCircle, Settings, Info, FolderGit2 } from 'lucide-react';
import { CURRENT_VERSION } from '../data/releaseNotes';

interface TopNavProps {
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  onOpenGuide: () => void;
  onOpenSourceFiles: () => void;
  isStreaming: boolean;
  onToggleStream: () => void;
  activeView: 'in_car' | 'phone_controls';
  onChangeView: (view: 'in_car' | 'phone_controls') => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  onOpenSettings,
  onOpenAbout,
  onOpenGuide,
  onOpenSourceFiles,
  isStreaming,
  onToggleStream,
  activeView,
  onChangeView
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0D0417]/95 backdrop-blur-md border-b border-purple-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark with Badass Lavender Icon */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-purple-500/40 shadow-lg shadow-purple-900/40 shrink-0">
            <img
              src="/automirror_lavender_icon.svg"
              alt="AutoMirror Badass Lavender Icon"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
              AutoMirror
            </span>
            <span className="text-xs font-mono text-purple-300 font-semibold">
              v{CURRENT_VERSION}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <button
            onClick={() => onChangeView('in_car')}
            className={`whitespace-nowrap py-1 cursor-pointer transition-colors ${
              activeView === 'in_car'
                ? 'text-purple-300 font-bold border-b-2 border-purple-400'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Car Screen (24:9)
          </button>
          <button
            onClick={() => onChangeView('phone_controls')}
            className={`whitespace-nowrap py-1 cursor-pointer transition-colors ${
              activeView === 'phone_controls'
                ? 'text-purple-300 font-bold border-b-2 border-purple-400'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Phone Controls
          </button>
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap py-1 cursor-pointer text-neutral-400"
          >
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>Vehicle Setup</span>
          </button>
          <button
            onClick={onOpenSourceFiles}
            className="flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap py-1 cursor-pointer text-neutral-400"
          >
            <FolderGit2 className="w-4 h-4 text-purple-400" />
            <span>APK Source</span>
          </button>
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap py-1 cursor-pointer text-neutral-400"
          >
            <Settings className="w-4 h-4 text-purple-400" />
            <span>Settings & What's New</span>
          </button>
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap py-1 cursor-pointer text-neutral-400"
          >
            <Info className="w-4 h-4 text-purple-400" />
            <span>About FourgeAI</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleStream}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-md ${
              isStreaming
                ? 'bg-rose-500 hover:bg-rose-600 text-white'
                : 'bg-purple-500 hover:bg-purple-400 text-white shadow-purple-500/20'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="whitespace-nowrap">
              {isStreaming ? 'Stop Projection' : 'Start Mirror'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
