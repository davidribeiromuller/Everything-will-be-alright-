// Web Audio API Music Box synthesizer for "Let It Go" (Frozen 1)
// Calming, gentle music box / celesta lullaby arrangement

class MusicBoxPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTimeout: number | null = null;
  private volumeNode: GainNode | null = null;
  private masterVolume = 0.6;
  private noteIndex = 0;

  // Notes frequencies in Hz
  private noteFreq: Record<string, number> = {
    'C4': 261.63, 'Db4': 277.18, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23, 'Gb4': 369.99, 'G4': 392.00, 'Ab4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
    'C5': 523.25, 'Db5': 554.37, 'D5': 587.33, 'Eb5': 622.25, 'E5': 659.25, 'F5': 698.46, 'Gb5': 739.99, 'G5': 783.99, 'Ab5': 830.61, 'A5': 880.00, 'Bb5': 932.33, 'B5': 987.77,
    'C6': 1046.50, 'Db6': 1108.73, 'D6': 1174.66, 'Eb6': 1244.51, 'F6': 1396.91, 'G6': 1567.98
  };

  // Melody sequence: [note, duration in seconds, rest before next note]
  // Gentle, soothing lullaby version of "Let It Go"
  private melody: Array<[string, number, number]> = [
    // "Let it go, let it go..."
    ['Ab5', 0.8, 0.45],
    ['G5', 0.8, 0.45],
    ['F5', 1.4, 0.9],
    ['Db5', 0.8, 0.45],
    ['Ab5', 0.8, 0.45],
    ['G5', 0.8, 0.45],
    ['F5', 1.4, 0.9],
    ['Eb5', 0.9, 0.6],

    // "Can't hold it back anymore..."
    ['Ab5', 0.6, 0.4],
    ['Bb5', 0.6, 0.4],
    ['C6', 1.0, 0.5],
    ['Bb5', 0.7, 0.4],
    ['Ab5', 0.7, 0.4],
    ['G5', 1.2, 0.8],

    // "Let it go, let it go..."
    ['Ab5', 0.8, 0.45],
    ['G5', 0.8, 0.45],
    ['F5', 1.4, 0.9],
    ['Db5', 0.8, 0.45],
    ['C6', 1.2, 0.6],
    ['Bb5', 0.8, 0.45],
    ['Ab5', 1.5, 1.0],

    // "Turn away and slam the door..."
    ['Ab5', 0.6, 0.4],
    ['Bb5', 0.6, 0.4],
    ['C6', 1.0, 0.5],
    ['Db6', 0.8, 0.45],
    ['C6', 0.8, 0.45],
    ['Bb5', 1.2, 0.9],

    // "I don't care what they're going to say..."
    ['Ab5', 0.7, 0.4],
    ['G5', 0.7, 0.4],
    ['F5', 0.9, 0.5],
    ['Eb5', 0.9, 0.5],
    ['F5', 1.2, 0.8],

    // "Let the storm rage on..."
    ['Ab5', 1.0, 0.6],
    ['Bb5', 1.0, 0.6],
    ['C6', 1.8, 1.2],

    // "The cold never bothered me anyway..."
    ['C6', 0.7, 0.45],
    ['Bb5', 0.7, 0.45],
    ['Ab5', 0.9, 0.5],
    ['F5', 1.0, 0.6],
    ['Eb5', 1.6, 1.2],
    ['Ab5', 2.2, 2.0] // lingering tender chime
  ];

  private initAudio() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.value = this.masterVolume;
      this.volumeNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a single bell / chime note with subtle warm harmonic
  private playBell(freq: number, duration: number) {
    if (!this.ctx || !this.volumeNode) return;

    const now = this.ctx.currentTime;

    // Fundamental tone (Sine wave)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic sparkle (music box metallic chime)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.002, now); // subtle natural shimmer

    // Envelope for fundamental
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.exponentialRampToValueAtTime(0.28, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Envelope for shimmer
    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.exponentialRampToValueAtTime(0.09, now + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.6));

    // Connect
    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.volumeNode);
    gain2.connect(this.volumeNode);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  private step = () => {
    if (!this.isPlaying) return;

    const [noteName, duration, delay] = this.melody[this.noteIndex];
    const freq = this.noteFreq[noteName];
    if (freq) {
      this.playBell(freq, duration);
    }

    this.noteIndex = (this.noteIndex + 1) % this.melody.length;
    this.currentTimeout = window.setTimeout(this.step, delay * 1000);
  };

  public start() {
    if (this.isPlaying) return;
    this.initAudio();
    this.isPlaying = true;
    this.noteIndex = 0;
    this.step();
  }

  public stop() {
    this.isPlaying = false;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
  }

  public playOpenChime() {
    try {
      this.initAudio();
      const chimes = [523.25, 659.25, 783.99, 1046.50];
      chimes.forEach((freq, idx) => {
        window.setTimeout(() => {
          this.playBell(freq, 1.2);
        }, idx * 120);
      });
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const musicBox = new MusicBoxPlayer();
