import React, { useState } from 'react';
import { CharacterCameo } from './CharacterCameo';
import { Sparkles, Heart, Wind, MailOpen, Mail } from 'lucide-react';
import { musicBox } from '@/src/utils/audioSynth';

interface LetterCardProps {
  onTapSparkle?: (x: number, y: number) => void;
  onOpenStateChange?: (isOpen: boolean) => void;
}

export const LetterCard: React.FC<LetterCardProps> = ({ onTapSparkle, onOpenStateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [characterMessage, setCharacterMessage] = useState<{ name: string; text: string } | null>(null);
  const [breathingActive, setBreathingActive] = useState(false);

  // Open the letter with gentle animation & chime
  const handleOpenLetter = (e: React.MouseEvent) => {
    if (isOpen) return;

    if (onTapSparkle) {
      onTapSparkle(e.clientX, e.clientY);
    }

    musicBox.playOpenChime();
    setIsAnimating(true);

    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
      if (onOpenStateChange) {
        onOpenStateChange(true);
      }
    }, 450);
  };

  // Close the letter if user wants to fold it back
  const handleCloseLetter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimating(false);
      if (onOpenStateChange) {
        onOpenStateChange(false);
      }
    }, 300);
  };

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

    setTimeout(() => {
      setCharacterMessage(null);
    }, 6500);
  };

  // Toggle breathing exercise
  const toggleBreathing = () => {
    setBreathingActive(!breathingActive);
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

      {/* ======================================================== */}
      {/* STATE 1: CLOSED ENVELOPE / FOLDED LETTER (TOQUE NA CARTA) */}
      {/* ======================================================== */}
      {!isOpen && (
        <div
          id="closed-letter-envelope"
          onClick={handleOpenLetter}
          className={`relative bg-[#FCFAF2] rounded-[24px] p-6 sm:p-8 border border-[#E9E0CF] shadow-[0_12px_36px_rgba(130,108,78,0.14),0_2px_8px_rgba(130,108,78,0.06)] cursor-pointer transition-all duration-500 select-none overflow-hidden group hover:shadow-[0_16px_44px_rgba(130,108,78,0.2)] hover:-translate-y-1 ${
            isAnimating ? 'scale-95 opacity-80 blur-[0.5px]' : 'scale-100 opacity-100'
          }`}
          style={{
            minHeight: '340px',
            boxShadow: '0 16px 40px -10px rgba(120, 100, 75, 0.18), 0 0 0 1px rgba(225, 215, 195, 0.7)'
          }}
        >
          {/* Subtle decorative inner border */}
          <div className="absolute inset-2 sm:inset-2.5 rounded-[18px] border border-dashed border-[#DDD2BE] pointer-events-none opacity-80" />

          {/* Envelope fold diagonal lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
            <line x1="0" y1="0" x2="50%" y2="45%" stroke="#8A7E68" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="100%" y1="0" x2="50%" y2="45%" stroke="#8A7E68" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="100%" x2="42%" y2="52%" stroke="#8A7E68" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="100%" y1="100%" x2="58%" y2="52%" stroke="#8A7E68" strokeWidth="1" strokeDasharray="3 3" />
          </svg>

          {/* Paper Corner Embellishments */}
          <div className="absolute top-3 left-3 text-[#BAE6FD] opacity-80 pointer-events-none text-sm">
            ❄
          </div>
          <div className="absolute top-3 right-3 text-[#E5A93C] opacity-80 pointer-events-none text-sm">
            ✦
          </div>
          <div className="absolute bottom-3 left-3 text-[#8A9A68] opacity-80 pointer-events-none text-sm">
            ✿
          </div>
          <div className="absolute bottom-3 right-3 text-[#BAE6FD] opacity-80 pointer-events-none text-sm">
            ❄
          </div>

          {/* Envelope Content & Handcrafted Seal */}
          <div className="relative z-10 flex flex-col items-center justify-between text-center min-h-[300px] py-3">
            {/* Top Envelope Recipient Stamp */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EFE0] border border-[#E5DEC9] text-xs font-['Patrick_Hand'] text-[#756D5B] tracking-wider">
                <span>✉️ Carta Especial</span>
                <span className="text-[#8A9A68]">🌱</span>
              </span>
              
              <h2 className="mt-3 font-['Shantell_Sans'] font-bold text-xl text-[#4A4335] tracking-tight">
                Para: Você 🤍
              </h2>
              <p className="font-['Patrick_Hand'] text-sm text-[#8C8370] mt-0.5">
                com carinho de Elsa & Jack Frost
              </p>
            </div>

            {/* Centered Wax / Frost Medallion Seal */}
            <div className="my-4 relative flex items-center justify-center">
              {/* Outer pulsing glow */}
              <div className="absolute -inset-3 bg-[#E5A93C]/20 rounded-full blur-md animate-pulse pointer-events-none" />
              
              {/* Seal Disc */}
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#F5BE58] via-[#E5A93C] to-[#C98420] shadow-[0_6px_20px_rgba(212,140,44,0.35)] flex flex-col items-center justify-center border-2 border-[#FFF8EB] transform group-hover:scale-105 transition-transform duration-300">
                <span className="text-white text-xl drop-shadow-xs">❄️</span>
                <span className="text-[10px] font-['Shantell_Sans'] font-bold text-white tracking-widest uppercase opacity-95 mt-0.5">
                  Abrir
                </span>
                {/* Frost shimmer badge */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#E0F2FE] rounded-full border border-white flex items-center justify-center text-[10px] text-sky-600 shadow-xs">
                  ✦
                </div>
              </div>
            </div>

            {/* THE REQUESTED PROMINENT MESSAGE: "toque na carta" */}
            <div className="w-full flex flex-col items-center pb-1">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFDF9] border border-[#E8DFC9] shadow-[0_4px_16px_rgba(140,118,90,0.16)] text-[#4A4333] font-['Shantell_Sans'] font-semibold text-sm sm:text-[15px] animate-bounce hover:bg-[#FAF6EE] transition-colors">
                <span className="text-base">✉️</span>
                <span>Toque na carta</span>
                <span className="text-rose-400">🤍</span>
              </div>
              <span className="mt-2 text-[11.5px] font-['Quicksand'] font-medium text-[#8C826E]">
                (toque em qualquer lugar da carta para ler)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STATE 2: OPENED LETTER WITH COMFORTING MESSAGE REVEALED */}
      {/* ======================================================== */}
      {isOpen && (
        <div
          id="comfort-letter-container"
          className={`relative bg-[#FCFAF2] rounded-[24px] p-6 sm:p-7 sm:px-8 border border-[#E9E0CF] shadow-[0_12px_36px_rgba(130,108,78,0.12),0_2px_8px_rgba(130,108,78,0.06)] transition-all duration-500 animate-in fade-in zoom-in-95 ${
            isAnimating ? 'opacity-80 scale-95' : 'opacity-100 scale-100'
          }`}
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

          {/* Corner Embellishments */}
          <div className="absolute top-3 left-3 text-[#BAE6FD] opacity-75 pointer-events-none text-xs">
            ❄
          </div>
          <div className="absolute bottom-3 right-3 text-[#D48C2C] opacity-75 pointer-events-none text-xs">
            ✦
          </div>

          {/* Top discreet fold/close toggle */}
          <div className="flex items-center justify-between pb-1 relative z-20">
            <div className="inline-flex items-center gap-1 text-[11px] font-['Patrick_Hand'] text-[#8A9A68]">
              <span>✿</span>
              <span>carta aberta</span>
            </div>
            <button
              onClick={handleCloseLetter}
              id="fold-letter-button"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F5EFE0] hover:bg-[#ECE4D2] text-[11px] font-['Patrick_Hand'] text-[#7A715E] border border-[#E5DEC9] transition-colors active:scale-95"
              title="Dobrar carta novamente"
            >
              <Mail className="w-3 h-3 text-[#D48C2C]" />
              <span>Dobrar carta</span>
            </button>
          </div>

          {/* LETTER HEADER */}
          <div className="text-center pt-2 pb-4 relative z-10">
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
      )}
    </div>
  );
};
