import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  ShieldAlert,
  GitBranch,
  Edit2,
  Check,
  Building2,
  Sparkles
} from 'lucide-react';
import {
  CURRENT_VERSION,
  CURRENT_VERSION_CODE,
  CREATOR_NAME,
  CREATOR_GITHUB_URL,
  APP_ID,
  APP_REPO_URL
} from '../data/releaseNotes';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  appRepoUrl: string;
  onUpdateRepoUrl: (url: string) => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  appRepoUrl,
  onUpdateRepoUrl
}) => {
  const [isEditingRepo, setIsEditingRepo] = useState(false);
  const [tempRepoUrl, setTempRepoUrl] = useState(appRepoUrl);
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSaveRepo = () => {
    onUpdateRepoUrl(tempRepoUrl.trim() || APP_REPO_URL);
    setIsEditingRepo(false);
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#120522] border border-purple-900/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header with Badass Lavender Icon */}
        <div className="px-6 py-4 border-b border-purple-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-purple-400/50 shadow-md shrink-0">
              <img
                src="/automirror_lavender_icon.svg"
                alt="AutoMirror Lavender Icon"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">About AutoMirror</h3>
              <div className="text-xs text-purple-200/60">Architecture, Creator & Repository</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-purple-950 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
          {/* Repository Prompt Banner */}
          <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-purple-300 mt-0.5 shrink-0" />
            <div className="text-xs text-neutral-300">
              <span className="font-semibold text-purple-300">AutoMirror v{CURRENT_VERSION}:</span> Powered by FourgeAI LABS. Configure your GitHub repository URL below.
            </div>
          </div>

          {/* App Info Box */}
          <div className="p-4 rounded-xl bg-[#0B0215] border border-purple-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Application Name:</span>
              <span className="text-sm font-bold text-white">AutoMirror for Android Auto</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Package Identifier:</span>
              <span className="font-mono text-xs text-purple-300 font-semibold">{APP_ID}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">App Version:</span>
              <span className="font-mono text-xs text-purple-300 font-bold">
                v{CURRENT_VERSION} (Build {CURRENT_VERSION_CODE})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-400">Driver Distraction State:</span>
              <span className="font-mono text-xs text-emerald-400 font-semibold">
                Exempt / Navigation-Class (Works in Motion)
              </span>
            </div>
          </div>

          {/* App Creator Section (REQUIRED) */}
          <div className="p-4 rounded-xl bg-[#0B0215] border border-purple-500/30">
            <div className="text-xs text-neutral-400 mb-1 flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Application Creator:</span>
            </div>
            <a
              href={CREATOR_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base font-bold text-purple-300 hover:text-purple-200 transition-colors group cursor-pointer"
            >
              <span>{CREATOR_NAME}</span>
              <ExternalLink className="w-4 h-4 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </a>
            <p className="text-xs text-neutral-400 mt-1">
              Links directly to: <span className="text-purple-300/90 font-mono text-[11px]">{CREATOR_GITHUB_URL}</span>
            </p>
          </div>

          {/* App GitHub Repository Link (REQUIRED) */}
          <div className="p-4 rounded-xl bg-[#0B0215] border border-purple-900/40">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-purple-400" />
                <span>App GitHub Repository Link:</span>
              </span>
              <button
                onClick={() => setIsEditingRepo(!isEditingRepo)}
                className="text-[11px] text-purple-300 hover:text-purple-200 flex items-center gap-1 cursor-pointer"
              >
                <Edit2 className="w-3 h-3" />
                <span>{isEditingRepo ? 'Cancel' : 'Configure URL'}</span>
              </button>
            </div>

            {isEditingRepo ? (
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={tempRepoUrl}
                    onChange={(e) => setTempRepoUrl(e.target.value)}
                    placeholder="https://github.com/fourgeailabs/..."
                    className="flex-1 bg-[#1A0A30] border border-purple-700/60 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                  />
                  <button
                    onClick={handleSaveRepo}
                    className="px-3 py-1.5 bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save URL</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <a
                  href={appRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-purple-300 hover:text-purple-200 break-all cursor-pointer"
                >
                  <span>{appRepoUrl}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
                {confirmed && (
                  <span className="ml-2 text-[10px] text-emerald-400 font-mono">Saved!</span>
                )}
              </div>
            )}
          </div>

          {/* Proprietary License Notice */}
          <div className="p-4 rounded-xl bg-[#0B0215] border border-purple-900/40 text-xs text-neutral-400 space-y-1.5">
            <div className="font-semibold text-neutral-200 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>FOURGEAI LABS PROPRIETARY SOFTWARE LICENSE Version 1.0</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Copyright © 2026 FourgeAI Labs / FourgeMan. All Rights Reserved. Unauthorized copying, modification, forking, redistribution, or Commercial Use is strictly prohibited.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-purple-900/40 bg-[#0C0317] flex items-center justify-between">
          <span className="text-xs text-purple-300/70 font-mono">
            {APP_ID}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-purple-900 hover:bg-purple-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
