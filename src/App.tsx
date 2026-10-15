import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  Smartphone,
  Car
} from 'lucide-react';
import { TopNav } from './components/TopNav';
import { AndroidAutoDisplay } from './components/AndroidAutoDisplay';
import { PhoneControlCenter } from './components/PhoneControlCenter';
import { ControlDeck } from './components/ControlDeck';
import { SettingsModal } from './components/SettingsModal';
import { AboutModal } from './components/AboutModal';
import { ProjectFilesModal } from './components/ProjectFilesModal';
import { SetupGuideModal } from './components/SetupGuideModal';
import { AspectRatioMode } from './types';
import {
  CURRENT_VERSION,
  CREATOR_NAME,
  CREATOR_GITHUB_URL,
  APP_REPO_URL
} from './data/releaseNotes';

export default function App() {
  const [activeView, setActiveView] = useState<'in_car' | 'phone_controls'>('in_car');
  const [isStreaming, setIsStreaming] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [aspectMode, setAspectMode] = useState<AspectRatioMode>('24:9');

  // Phone Side Controls & Preferences
  const [fps, setFps] = useState(60);
  const [bitrateMbps, setBitrateMbps] = useState(12);
  const [audioStreaming, setAudioStreaming] = useState(true);
  const [touchRelay, setTouchRelay] = useState(true);
  const [keepScreenOn, setKeepScreenOn] = useState(true);
  const [dimPhoneScreen, setDimPhoneScreen] = useState(false);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isSourceFilesOpen, setIsSourceFilesOpen] = useState(false);

  // App Repository URL (prompted upon 2nd update)
  const [appRepoUrl, setAppRepoUrl] = useState(APP_REPO_URL);

  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleStartStreaming = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            frameRate: fps,
            width: { ideal: 2880 },
            height: { ideal: 1080 }
          },
          audio: audioStreaming
        });

        streamRef.current = mediaStream;
        setStream(mediaStream);
        setIsStreaming(true);

        const videoTrack = mediaStream.getVideoTracks()[0];
        videoTrack.onended = () => {
          handleStopStreaming();
        };
      }
    } catch (err) {
      console.warn('Screen capture cancelled or unavailable:', err);
    }
  };

  const handleStopStreaming = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setStream(null);
    setIsStreaming(false);
  };

  const handleToggleStream = () => {
    if (isStreaming) {
      handleStopStreaming();
    } else {
      handleStartStreaming();
    }
  };

  return (
    <div className="min-h-screen bg-[#07010E] text-neutral-100 flex flex-col font-sans">
      {/* Top Bar with Badass Feminine Lavender Brand Wordmark */}
      <TopNav
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenSourceFiles={() => setIsSourceFilesOpen(true)}
        isStreaming={isStreaming}
        onToggleStream={handleToggleStream}
        activeView={activeView}
        onChangeView={setActiveView}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col items-center justify-center">
        {/* Toggle between In-Car 24:9 Display and Phone Companion Controls */}
        <div className="w-full max-w-xl mx-auto mb-5 p-1 bg-[#120522] border border-purple-900/50 rounded-xl grid grid-cols-2 text-xs font-semibold">
          <button
            onClick={() => setActiveView('in_car')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeView === 'in_car'
                ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-900/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>In-Car Android Auto (24:9)</span>
          </button>
          <button
            onClick={() => setActiveView('phone_controls')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeView === 'phone_controls'
                ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-900/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Phone Control Center</span>
          </button>
        </div>

        {activeView === 'in_car' ? (
          <>
            {/* Real Live 24:9 Straight Screen Capture Canvas */}
            <AndroidAutoDisplay
              isStreaming={isStreaming}
              stream={stream}
              aspectMode={aspectMode}
              onStartStreaming={handleStartStreaming}
              onStopStreaming={handleStopStreaming}
            />

            {/* Quick Aspect Deck */}
            <ControlDeck
              isStreaming={isStreaming}
              onToggleStream={handleToggleStream}
              aspectMode={aspectMode}
              onChangeAspect={(mode) => setAspectMode(mode)}
            />
          </>
        ) : (
          /* Phone Companion Control Center with all settings menus */
          <PhoneControlCenter
            isStreaming={isStreaming}
            onToggleStream={handleToggleStream}
            aspectMode={aspectMode}
            onChangeAspect={setAspectMode}
            fps={fps}
            onChangeFps={setFps}
            bitrateMbps={bitrateMbps}
            onChangeBitrate={setBitrateMbps}
            audioStreaming={audioStreaming}
            onToggleAudio={() => setAudioStreaming(!audioStreaming)}
            touchRelay={touchRelay}
            onToggleTouchRelay={() => setTouchRelay(!touchRelay)}
            keepScreenOn={keepScreenOn}
            onToggleKeepScreenOn={() => setKeepScreenOn(!keepScreenOn)}
            dimPhoneScreen={dimPhoneScreen}
            onToggleDimPhoneScreen={() => setDimPhoneScreen(!dimPhoneScreen)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenAbout={() => setIsAboutOpen(true)}
            onOpenGuide={() => setIsGuideOpen(true)}
            onOpenSourceFiles={() => setIsSourceFilesOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-purple-900/30 bg-[#07010E] py-4 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">AutoMirror</span>
            <span>·</span>
            <span>Created by</span>
            <a
              href={CREATOR_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:underline font-semibold"
            >
              {CREATOR_NAME}
            </a>
            <span>·</span>
            <span className="font-mono text-purple-300">v{CURRENT_VERSION}</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              What's New
            </button>
            <button
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About & License
            </button>
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Vehicle Setup
            </button>
            <a
              href={appRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        keepScreenOn={keepScreenOn}
        onToggleKeepScreenOn={() => setKeepScreenOn(!keepScreenOn)}
        dimPhoneScreen={dimPhoneScreen}
        onToggleDimPhoneScreen={() => setDimPhoneScreen(!dimPhoneScreen)}
        audioStreaming={audioStreaming}
        onToggleAudioStreaming={() => setAudioStreaming(!audioStreaming)}
        touchRelay={touchRelay}
        onToggleTouchRelay={() => setTouchRelay(!touchRelay)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        appRepoUrl={appRepoUrl}
        onUpdateRepoUrl={(newUrl) => setAppRepoUrl(newUrl)}
      />

      <ProjectFilesModal
        isOpen={isSourceFilesOpen}
        onClose={() => setIsSourceFilesOpen(false)}
      />

      <SetupGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
