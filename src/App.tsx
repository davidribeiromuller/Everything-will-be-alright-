import React, { useState } from 'react';
import { FloralBackground } from './components/FloralBackground';
import { SnowParticles } from './components/SnowParticles';
import { LetterCard } from './components/LetterCard';
import { MusicPlayer } from './components/MusicPlayer';
import { Sparkles, Heart } from 'lucide-react';

interface ClickSparkle {
  id: number;
  x: number;
  y: number;
}

export default function App() {
  const [clickSparkles, setClickSparkles] = useState<ClickSparkle[]>([]);
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  // Spawn delicate floating sparkles on tap
  const handleTapSparkle = (x: number, y: number) => {
    const newSparkle: ClickSparkle = {
      id: Date.now() + Math.random(),
      x,
      y,
    };
    setClickSparkles((prev) => [...prev.slice(-8), newSparkle]);

    setTimeout(() => {
      setClickSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 1200);
  };

  return (
    <main
      id="main-app-container"
      className="relative min-h-screen w-full bg-[#FAF7EE] flex flex-col items-center justify-between p-3 sm:p-5 overflow-x-hidden select-none"
      onClick={(e) => handleTapSparkle(e.clientX, e.clientY)}
    >
      {/* Handcrafted Floral Background with 4-Corner Daisies */}
      <FloralBackground />

      {/* Gentle, Slow Snow & Sparkle Drift */}
      <SnowParticles />

      {/* Interactive Tap Sparkles */}
      {clickSparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 animate-float-sparkle"
          style={{ left: sparkle.x, top: sparkle.y }}
        >
          <div className="flex items-center gap-1 text-sky-300">
            <span className="text-sm">❄</span>
            <span className="text-xs text-amber-300">✦</span>
            <span className="text-[10px] text-rose-300">🤍</span>
          </div>
        </div>
      ))}

      {/* Top Header Bar: Discrete Music Controls */}
      <header className="w-full max-w-md pt-2 pb-1 flex items-center justify-center relative z-30">
        <MusicPlayer />
      </header>

      {/* Main Content Area: Centered Comforting Letter */}
      <div className="w-full flex-1 flex items-center justify-center my-auto py-4 relative z-20">
        <LetterCard
          onTapSparkle={handleTapSparkle}
          onOpenStateChange={setIsLetterOpen}
        />
      </div>

      {/* Bottom Subtle Note */}
      <footer className="w-full max-w-md pb-2 text-center text-xs font-['Patrick_Hand'] text-[#9E9480] relative z-20 opacity-85">
        {isLetterOpen ? (
          <span>Toque na carta ou nos personagens para interagir 🤍</span>
        ) : (
          <span className="animate-pulse text-[#7D7360]">
            Toque na carta para abrir ✉️ 🤍
          </span>
        )}
      </footer>

      {/* Custom Keyframe Animations */}
      <style>{`
        @keyframes floatSparkle {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.6);
          }
          30% {
            opacity: 1;
            transform: translate(-50%, -65%) scale(1.1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -95%) scale(0.8);
          }
        }
        .animate-float-sparkle {
          animation: floatSparkle 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </main>
  );
}
