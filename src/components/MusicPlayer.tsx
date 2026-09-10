import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Pause, Play, Settings2, Upload, Sparkles } from 'lucide-react';
import { musicBox } from '@/src/utils/audioSynth';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [audioSource, setAudioSource] = useState<'synth' | 'custom'>('synth');
  const [customAudioUrl, setCustomAudioUrl] = useState<string>('');
  const [customAudioName, setCustomAudioName] = useState<string>('');

  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Toggle playback
  const togglePlay = () => {
    if (isPlaying) {
      if (audioSource === 'synth') {
        musicBox.stop();
      } else if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      if (audioSource === 'synth') {
        musicBox.setVolume(isMuted ? 0 : volume);
        musicBox.start();
      } else if (audioElementRef.current) {
        audioElementRef.current.volume = isMuted ? 0 : volume;
        audioElementRef.current.play().catch((err) => {
          console.warn('Audio playback prevented:', err);
        });
      }
      setIsPlaying(true);
    }
  };

  // Handle volume change
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (isMuted && newVol > 0) {
      setIsMuted(false);
    }
    if (audioSource === 'synth') {
      musicBox.setVolume(newVol);
    } else if (audioElementRef.current) {
      audioElementRef.current.volume = newVol;
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    const effectiveVol = nextMuted ? 0 : volume;
    if (audioSource === 'synth') {
      musicBox.setVolume(effectiveVol);
    } else if (audioElementRef.current) {
      audioElementRef.current.volume = effectiveVol;
    }
  };

  // Handle custom file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomAudioUrl(url);
      setCustomAudioName(file.name);
      setAudioSource('custom');

      if (isPlaying) {
        musicBox.stop();
        setTimeout(() => {
          if (audioElementRef.current) {
            audioElementRef.current.src = url;
            audioElementRef.current.play();
          }
        }, 100);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      musicBox.stop();
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="relative z-30 flex flex-col items-center">
      {/* Hidden audio element for custom licensed tracks */}
      <audio
        ref={audioElementRef}
        src={customAudioUrl || undefined}
        loop
        onEnded={() => setIsPlaying(false)}
      />

      {/* Primary Floating Controls Bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFFDF9]/90 backdrop-blur-md rounded-full shadow-[0_4px_16px_rgba(140,118,90,0.12)] border border-[#EBE3D3] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(140,118,90,0.18)]">
        {/* Main Play / Pause Button requested in prompt */}
        <button
          onClick={togglePlay}
          id="music-toggle-button"
          aria-label={isPlaying ? 'Pausar música' : 'Ouvir música ambiente'}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-['Shantell_Sans'] font-semibold tracking-wide transition-all duration-300 ${
            isPlaying
              ? 'bg-[#E5A93C] text-white shadow-xs'
              : 'bg-[#FAF6EE] text-[#5C5544] hover:bg-[#F3EDE0] active:scale-95'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 animate-pulse" />
              <span>⏸ Pausar</span>
            </>
          ) : (
            <>
              <span className="text-[#D48C2C]">🎵</span>
              <span>Ouvir</span>
            </>
          )}
        </button>

        {/* Melody Title / Subtle Indicator */}
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-['Quicksand'] font-medium text-[#7C7463] px-1">
          <Sparkles className="w-3 h-3 text-[#E5A93C]" />
          <span>{audioSource === 'synth' ? 'Let It Go • Caixinha de Música' : (customAudioName || 'Áudio Pessoal')}</span>
        </div>

        {/* Volume & Sound Wave Icon */}
        <button
          onClick={toggleMute}
          id="music-volume-mute-toggle"
          aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
          className="p-1 text-[#8C8370] hover:text-[#5C5544] transition-colors rounded-full hover:bg-[#F5EFE3]"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Settings / Track Options */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          id="music-settings-toggle"
          aria-label="Opções de áudio"
          className={`p-1 text-[#8C8370] hover:text-[#5C5544] transition-colors rounded-full hover:bg-[#F5EFE3] ${
            showSettings ? 'text-[#D48C2C] bg-[#F5EFE3]' : ''
          }`}
        >
          <Settings2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Expanded Audio Settings Tray */}
      {showSettings && (
        <div className="absolute top-full mt-2 w-72 p-3.5 bg-[#FFFDF9] rounded-2xl shadow-[0_8px_24px_rgba(140,118,90,0.18)] border border-[#E7DFCE] text-xs font-['Quicksand'] text-[#5C5544] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0E9DC] mb-2.5">
            <span className="font-semibold text-[#4A4333] font-['Shantell_Sans']">Música Ambiente</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#FAF4E6] text-[#A67520] font-medium">
              Frozen • Tema
            </span>
          </div>

          {/* Volume Slider */}
          <div className="space-y-1 mb-3">
            <div className="flex justify-between text-[11px] text-[#7C7463]">
              <span>Volume</span>
              <span>{isMuted ? '0%' : `${Math.round(volume * 100)}%`}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#EFE8DA] rounded-lg appearance-none cursor-pointer accent-[#E5A93C]"
            />
          </div>

          {/* Audio Source Options */}
          <div className="space-y-2">
            <div className="text-[11px] text-[#7C7463] font-medium">Origem do som:</div>
            
            <button
              onClick={() => {
                setAudioSource('synth');
                if (isPlaying) {
                  if (audioElementRef.current) audioElementRef.current.pause();
                  musicBox.setVolume(volume);
                  musicBox.start();
                }
              }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border text-left transition-colors ${
                audioSource === 'synth'
                  ? 'bg-[#FAF4E6] border-[#E5A93C] text-[#5C4B18]'
                  : 'bg-white border-[#E8E0D0] text-[#706857] hover:bg-[#FAF7EE]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span className="font-medium text-[11px]">Caixinha de Música (Lullaby)</span>
              </div>
              <span className="text-[10px] opacity-75">Integrado</span>
            </button>

            {/* Custom file option for user's licensed track */}
            <label className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border cursor-pointer transition-colors ${
              audioSource === 'custom'
                ? 'bg-[#FAF4E6] border-[#E5A93C] text-[#5C4B18]'
                : 'bg-white border-[#E8E0D0] text-[#706857] hover:bg-[#FAF7EE]'
            }`}>
              <div className="flex items-center gap-1.5 overflow-hidden">
                <Upload className="w-3.5 h-3.5 text-[#8A9A68] shrink-0" />
                <span className="font-medium text-[11px] truncate">
                  {customAudioName ? customAudioName : 'Carregar áudio oficial / MP3'}
                </span>
              </div>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="text-[10px] text-[#8A9A68] shrink-0 font-medium">Arquivo</span>
            </label>
          </div>

          <p className="mt-2.5 text-[10px] text-[#9E9582] text-center leading-relaxed">
            Áudio relaxante para acompanhar a leitura da carta. 🤍
          </p>
        </div>
      )}
    </div>
  );
};
