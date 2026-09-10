import React, { useEffect, useState } from 'react';

interface Flake {
  id: number;
  left: number; // percentage
  top: number; // initial top offset
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  opacity: number;
  swayAmount: number;
}

export const SnowParticles: React.FC = () => {
  const [flakes, setFlakes] = useState<Flake[]>([]);

  useEffect(() => {
    // Generate 18 discreet, very calm snowflakes and sparkles
    const generatedFlakes: Flake[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      top: -(Math.random() * 20),
      size: Math.random() * 5 + 3, // 3px to 8px
      duration: Math.random() * 12 + 14, // 14 to 26 seconds (very slow and calming)
      delay: Math.random() * 10,
      opacity: Math.random() * 0.45 + 0.3,
      swayAmount: Math.random() * 24 - 12
    }));
    setFlakes(generatedFlakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full"
          style={{
            left: `${flake.left}%`,
            top: `${flake.top}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            backgroundColor: flake.id % 3 === 0 ? '#E0F2FE' : '#FFFFFF',
            boxShadow: '0 0 6px rgba(186, 230, 253, 0.75)',
            opacity: flake.opacity,
            animation: `gentleFall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`
          }}
        />
      ))}
      <style>{`
        @keyframes gentleFall {
          0% {
            transform: translateY(-5vh) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(50vh) translateX(16px) rotate(90deg);
          }
          100% {
            transform: translateY(105vh) translateX(-12px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
};
