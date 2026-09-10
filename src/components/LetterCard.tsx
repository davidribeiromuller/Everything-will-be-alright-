import React, { useState } from 'react';
import { CharacterCameo } from './CharacterCameo';
import { Sparkles, Heart, Wind } from 'lucide-react';

interface LetterCardProps {
  onTapSparkle?: (x: number, y: number) => void;
}

export const LetterCard: React.FC<LetterCardProps> = ({ onTapSparkle }) => {
  const [characterMessage, setCharacterMessage] = useState<{ name: string; text: string } | null>(null);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inspire' | 'hold' | 'expire'>('inspire');

  // Handle character interaction
  const handleCharacterClick = (character: 'elsa' | 'jack') => {
    if (character === 'elsa') {
      setCharacterMessage({
        name: 'Elsa',
        text: 'Você é mais forte do que qualquer tempestade. Estou aqui enviando todo o meu carinho para aquecer seu coração. ❄️🤍'
      });
    } else {
      setCharacterMessage({
        name: 'Jack Frost',
        text: 'Não tenha medo de recomeçar devagar. Até a geada mais fria se transforma em flores quando a primavera chega. ❄️✨'
      });
    }

    // Clear message after 6 seconds
    setTimeout(() => {
      setCharacterMessage(null);
    }, 6500);
  };

  // Toggle breathing exercise
  const toggleBreathing = () => {
    if (breathingActive) {
      setBreathingActive(false);
    } else {
      setBreathingActive(true);
      setBreathingPhase('inspire');
    }
  };

  return (
    <div className="relative w-full max-w-[420px] mx-auto px-3 sm:px-4 py-2 z-20">
      {/* Character Cameo 1: Elsa (Top-right / upper flank, gently angled towards letter) */}
      <div className="absolute -top-7 right-2 sm:right-0 z-30 transform rotate-3 transition-transform duration-300">
        <CharacterCameo
          character="elsa"
          onClick={() => handleCharacterClick('elsa')}
        />
      </div>

      {/* Character Cameo 2: Jack Frost (Bottom-left flank, gently angled towards letter) */}
      <div className="absolute -bottom-8 left-2 sm:left-0 z-30 transform -rotate-3 transition-transform duration-300">
        <CharacterCameo
          character="jack"
          onClick={() => handleCharacterClick('jack')}
        />
      </div>

      {/* Floating Dialogue Balloon when character is tapped */}
      {characterMessage && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-11/12 max-w-sm z-40 bg-[#FFFDF9] border border-[#E8DFC9] rounded-2xl p-3 shadow-[0_8px_25px_rgba(140,118,90,0.22)] animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between gap-2 pb-1 mb-1 border-b border-[#F4EFE6]">
            <span className="font-['Shantell_Sans'] font-semibold text-xs text-[#615744] flex items-center gap-1">
              <span>❄</span>
              <span>Mensagem de {characterMessage.name}</span>
            </span>
            <button
              onClick={() => setCharacterMessage(null)}
              className="text-[#998F7A] hover:text-[#5C5544] text-xs px-1"
            >
              ✕
            </button>
          </div>
          <p className="font-['Quicksand'] text-xs text-[#524B3C] leading-relaxed italic">
            "{characterMessage.text}"
          </p>
        </div>
      )}

      {/* THE MAIN LETTER PAPER */}
      <div
        id="comfort-letter-container"
        className="relative bg-[#FCFAF2] rounded-[24px] p-6 sm:p-7 sm:px-8 border border-[#E9E0CF] shadow-[0_12px_36px_rgba(130,108,78,0.12),0_2px_8px_rgba(130,108,78,0.06)] transition-all duration-300"
        style={{
          boxShadow: '0 16px 40px -10px rgba(120, 100, 75, 0.16), 0 0 0 1px rgba(225, 215, 195, 0.6)'
        }}
        onClick={(e) => {
          if (onTapSparkle) {
            onTapSparkle(e.clientX, e.clientY);
          }
        }}
      >
        {/* Subtle decorative inner border (Handcrafted stationery look) */}
        <div className="absolute inset-2 sm:inset-2.5 rounded-[18px] border border-dashed border-[#DDD2BE] pointer-events-none opacity-70" />

        {/* Paper Corner Embellishments: Tiny ice crystal and olive leaf in corners */}
        <div className="absolute top-3 left-3 text-[#BAE6FD] opacity-75 pointer-events-none text-xs">
          ❄
        </div>
        <div className="absolute bottom-3 right-3 text-[#D48C2C] opacity-75 pointer-events-none text-xs">
          ✦
        </div>

        {/* LETTER HEADER */}
        <div className="text-center pt-1 pb-4 relative z-10">
          {/* Subtle top date / stamp badge */}
          <div className="inline-flex items-center justify-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5EFE0] border border-[#E5DEC9] text-[11px] font-['Patrick_Hand'] text-[#7D7563] tracking-wide mb-2">
            <Sparkles className="w-3 h-3 text-[#E5A93C]" />
            <span>Uma mensagem especial para você</span>
            <span className="text-[#8A9A68]">🌱</span>
          </div>

          {/* Letter Title requested in prompt */}
          <h1
            id="letter-title"
            className="font-['Shantell_Sans'] font-bold text-2xl sm:text-[26px] text-[#423C30] tracking-tight flex items-center justify-center gap-2"
          >
            <span>Vai ficar tudo bem</span>
            <span className="text-rose-400 font-normal">🤍</span>
          </h1>

          {/* Decorative flourish divider */}
          <div className="flex items-center justify-center gap-2 mt-2 opacity-65">
            <span className="h-[1px] w-8 bg-[#D6CBB7]" />
            <span className="text-[11px] text-[#8A9A68]">❄ ✿ ❄</span>
            <span className="h-[1px] w-8 bg-[#D6CBB7]" />
          </div>
        </div>

        {/* LETTER CONTENT / PARAGRAPHS */}
        <div
          id="letter-body"
          className="space-y-4 font-['Quicksand'] text-[15px] sm:text-[15.5px] text-[#4A4335] leading-[1.65] relative z-10 font-medium"
        >
          {/* Paragraph 1 */}
          <p className="text-[#423C30] transition-colors duration-200">
            Eu sei que talvez esse momento esteja sendo difícil, mas quero que você se lembre de uma coisa: você não precisa ter todas as respostas agora.
          </p>

          {/* Emotional focal point: "Respira." & "Vai ficar tudo bem." */}
          <div className="py-1.5 flex flex-col items-center justify-center my-1 text-center bg-[#F9F5EA] rounded-2xl border border-[#EFE7D7] p-3 shadow-inner">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBreathing();
              }}
              id="respira-button"
              className="group flex items-center gap-1.5 text-lg sm:text-xl font-['Shantell_Sans'] font-semibold text-[#8A9A68] hover:text-[#6E7F4E] transition-all cursor-pointer px-3 py-0.5 rounded-full hover:bg-white/80 active:scale-95"
              title="Toque para respirar com calma"
            >
              <Wind className={`w-4 h-4 text-[#8A9A68] ${breathingActive ? 'animate-spin' : ''}`} />
              <span className="underline decoration-dotted decoration-[#8A9A68]/60 underline-offset-4">
                Respira.
              </span>
            </button>

            {/* If breathing is active, display gentle rhythmic prompt */}
            {breathingActive ? (
              <div className="mt-2 text-xs font-['Quicksand'] text-[#6B6353] flex items-center gap-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#8A9A68]" />
                <span>Puxe o ar suavemente... segure... e solte devagar...</span>
              </div>
            ) : (
              <span className="text-[11px] text-[#948B77] font-['Patrick_Hand'] mt-0.5">
                (toque para respirar com calma)
              </span>
            )}

            <p className="mt-2 font-['Shantell_Sans'] font-bold text-base text-[#D48C2C] tracking-wide">
              Vai ficar tudo bem.
            </p>
          </div>

          {/* Paragraph 3 */}
          <p>
            Tenha paciência com você mesmo. Algumas coisas levam tempo para se ajeitar, e nem tudo precisa fazer sentido imediatamente.
          </p>

          {/* Paragraph 4 */}
          <p>
            Você é mais forte do que imagina, e dias melhores ainda estão por vir.
          </p>

          {/* Closing gentle lines */}
          <div className="pt-1 text-[#3B352A] space-y-1">
            <p className="font-['Patrick_Hand'] text-base text-[#615846]">
              Então, por enquanto, apenas continue.
            </p>
            <p className="font-['Shantell_Sans'] font-bold text-base text-[#473F32] flex items-center gap-1.5">
              <span>Um passo de cada vez.</span>
              <span className="text-rose-400">🤍</span>
            </p>
          </div>
        </div>

        {/* LETTER FOOTER: Signature stamp & comforting flourish */}
        <div className="mt-6 pt-3 border-t border-[#EDE4D2] flex items-center justify-between text-xs font-['Patrick_Hand'] text-[#8C8270] relative z-10">
          <div className="flex items-center gap-1 text-[#8A9A68]">
            <span>✿</span>
            <span>com carinho & afeto</span>
          </div>

          <div className="flex items-center gap-1 bg-[#F5EFE3] px-2 py-0.5 rounded-full border border-[#E5DEC9] text-[#786F5D]">
            <span className="text-sky-400 text-[10px]">❄</span>
            <span>Elsa & Jack Frost</span>
          </div>
        </div>
      </div>
    </div>
  );
};
