export interface AudioPlayerState {
  isPlaying: boolean;
  volume: number;
  mode: 'synth' | 'custom';
  customAudioUrl?: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  sway: number;
}
