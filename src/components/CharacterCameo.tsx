import React from 'react';
import elsaImg from '@/src/assets/images/elsa_gentle_art_1789058975331.jpg';
import jackImg from '@/src/assets/images/jack_gentle_art_1789058994458.jpg';

interface CharacterCameoProps {
  character: 'elsa' | 'jack';
  className?: string;
  onClick?: () => void;
}

export const CharacterCameo: React.FC<CharacterCameoProps> = ({ character, className = '', onClick }) => {
  const isElsa = character === 'elsa';
  const name = isElsa ? 'Elsa' : 'Jack Frost';
  const subtitle = isElsa ? 'Acalanto' : 'Esperança';
  const imgSrc = isElsa ? elsaImg : jackImg;

  return (
    <div
      onClick={onClick}
      id={`cameo-${character}`}
      className={`group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
      title={`Toque para receber um carinho de ${name}`}
    >
      {/* Delicate floating ice crystal sparkle behind portrait */}
      <div className="absolute -top-1 -right-1 w-5 h-5 text-sky-200 opacity-90 pointer-events-none transition-transform duration-500 group-hover:rotate-45">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_4px_rgba(186,230,253,0.8)]">
          <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9Z" />
        </svg>
      </div>

      {/* Decorative Stamp / Cameo Frame */}
      <div className="relative p-1.5 bg-[#FAF7EE] rounded-2xl shadow-[0_4px_14px_rgba(140,118,90,0.14)] border border-[#E5DDCB]">
        {/* Soft scalloped / illustrated inner ring */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#D8CEB9] bg-[#F7F2E7]">
          <img
            src={imgSrc}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter saturate-95 contrast-95 transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gentle vignette tint matching warm paper palette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7EE]/40 via-transparent to-[#BAE6FD]/10 pointer-events-none" />
        </div>

        {/* Tiny botanical leaf or frost accent at corner */}
        <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 text-[#8A9A68] opacity-85">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C7 8 4 14 12 22C20 14 17 8 12 2Z" />
          </svg>
        </div>
      </div>

      {/* Handwritten character badge label */}
      <div className="mt-1 px-2 py-0.5 rounded-full bg-[#FFFDF9]/90 border border-[#E6DEC9] text-[11px] font-['Shantell_Sans'] font-medium text-[#6B6353] shadow-xs flex items-center gap-1 backdrop-blur-xs">
        <span className="text-sky-400 text-[10px]">❄</span>
        <span>{name}</span>
      </div>
    </div>
  );
};
