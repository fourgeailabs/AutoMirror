export interface StreamStats {
  fps: number;
  bitrateMbps: number;
  latencyMs: number;
  width: number;
  height: number;
  isActive: boolean;
  hasAudio: boolean;
}

export type AspectRatioMode = '24:9' | '16:9' | '21:9' | '4:3' | 'fullscreen';

export interface VehicleDisplayPreset {
  id: AspectRatioMode;
  name: string;
  ratio: string;
  cssAspect: string;
  resolution: string;
  description: string;
}

export interface ReleaseNote {
  version: string;
  date: string;
  title: string;
  highlights: string[];
  notes: string;
}

export interface TouchEventLog {
  id: string;
  x: number;
  y: number;
  percentX: number;
  percentY: number;
  timestamp: string;
}
