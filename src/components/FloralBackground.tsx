import React from 'react';

/**
 * Hand-drawn floral background matching the reference aesthetic:
 * Large stylized hand-drawn daisies in the 4 corners, partially cropped at edges,
 * with olive leaves, warm mustard/burnt yellow centers, soft organic dots,
 * and delicate subtle ice/winter accents.
 */
export const FloralBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Base warm texture / ambient glow */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(#d6c9b3 1px, transparent 1px), radial-gradient(#e3d7c4 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px'
        }}
      />

      {/* Organic hand-drawn scattered dots (burnt yellow, olive green, peach, faint ice-sparkle) */}
      <svg className="absolute inset-0 w-full h-full opacity-60">
        <circle cx="12%" cy="18%" r="4" fill="#E5A93C" opacity="0.6" />
        <circle cx="15%" cy="21%" r="2" fill="#8A9A68" opacity="0.5" />
        <circle cx="22%" cy="12%" r="3" fill="#E88F68" opacity="0.4" />
        <circle cx="82%" cy="15%" r="3.5" fill="#E5A93C" opacity="0.5" />
        <circle cx="88%" cy="22%" r="2.5" fill="#8A9A68" opacity="0.5" />
        <circle cx="80%" cy="26%" r="2" fill="#BAE6FD" opacity="0.6" />
        <circle cx="10%" cy="75%" r="3" fill="#8A9A68" opacity="0.5" />
        <circle cx="16%" cy="80%" r="4" fill="#E5A93C" opacity="0.6" />
        <circle cx="24%" cy="85%" r="2.5" fill="#BAE6FD" opacity="0.6" />
        <circle cx="85%" cy="72%" r="3.5" fill="#E88F68" opacity="0.5" />
        <circle cx="89%" cy="82%" r="3" fill="#8A9A68" opacity="0.6" />
        <circle cx="78%" cy="88%" r="2" fill="#E5A93C" opacity="0.5" />
      </svg>

      {/* Corner 1: Top-Left Floral Cluster (Large Handcrafted Daisy + Olive Leaves) */}
      <div className="absolute -top-10 -left-12 w-48 h-48 sm:w-60 sm:h-60 transform -rotate-12 transition-transform duration-700">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_4px_12px_rgba(110,127,78,0.12)]">
          {/* Leaves */}
          <path
            d="M80,120 Q120,135 140,180 Q105,170 80,120 Z"
            fill="#8A9A68"
            opacity="0.85"
          />
          <path
            d="M60,110 Q110,100 150,120 Q115,130 60,110 Z"
            fill="#6E7F4E"
            opacity="0.9"
          />
          <path
            d="M110,70 Q160,75 190,110 Q150,115 110,70 Z"
            fill="#8A9A68"
            opacity="0.8"
          />
          {/* Subtle ice crystal sparkle nestled near leaf */}
          <path
            d="M145,95 L148,88 L151,95 L158,98 L151,101 L148,108 L145,101 L138,98 Z"
            fill="#BAE6FD"
            opacity="0.75"
          />

          {/* Daisy Petals (Warm Cream/White with soft pencil border effect) */}
          <g transform="translate(65, 65)">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
              <ellipse
                key={i}
                cx="0"
                cy="-44"
                rx="14"
                ry="30"
                fill="#FFFDF7"
                stroke="#E2D6C0"
                strokeWidth="1.2"
                transform={`rotate(${angle})`}
              />
            ))}
            {/* Center pistil / warm burnt yellow core */}
            <circle cx="0" cy="0" r="26" fill="#E5A93C" stroke="#D48C2C" strokeWidth="2" />
            <circle cx="0" cy="0" r="20" fill="#F3BF4B" />
            {/* Pistil texture dots */}
            <circle cx="-6" cy="-6" r="2" fill="#B87B1D" opacity="0.6" />
            <circle cx="5" cy="-7" r="2.2" fill="#B87B1D" opacity="0.6" />
            <circle cx="-7" cy="6" r="2" fill="#B87B1D" opacity="0.6" />
            <circle cx="6" cy="6" r="2" fill="#B87B1D" opacity="0.6" />
            <circle cx="0" cy="0" r="2.5" fill="#B87B1D" opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* Corner 2: Top-Right Floral Cluster (Soft Peach Daisy + Olive Botanical) */}
      <div className="absolute -top-12 -right-12 w-48 h-48 sm:w-56 sm:h-56 transform rotate-15">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_4px_12px_rgba(212,140,44,0.1)]">
          {/* Leaves */}
          <path
            d="M70,120 Q50,165 20,185 Q45,150 70,120 Z"
            fill="#8A9A68"
            opacity="0.85"
          />
          <path
            d="M90,105 Q60,130 30,135 Q65,115 90,105 Z"
            fill="#6E7F4E"
            opacity="0.8"
          />
          {/* Subtle ice flake near leaves */}
          <path
            d="M48,110 L50,104 L52,110 L58,112 L52,114 L50,120 L48,114 L42,112 Z"
            fill="#BAE6FD"
            opacity="0.7"
          />

          {/* Daisy Petals */}
          <g transform="translate(135, 65)">
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, i) => (
              <ellipse
                key={i}
                cx="0"
                cy="-40"
                rx="13"
                ry="28"
                fill="#FFFDF7"
                stroke="#E2D6C0"
                strokeWidth="1.2"
                transform={`rotate(${angle})`}
              />
            ))}
            {/* Center pistil */}
            <circle cx="0" cy="0" r="23" fill="#E88F68" stroke="#D3754D" strokeWidth="2" />
            <circle cx="0" cy="0" r="17" fill="#F7A783" />
            <circle cx="-5" cy="-5" r="1.8" fill="#AF4C24" opacity="0.5" />
            <circle cx="5" cy="4" r="1.8" fill="#AF4C24" opacity="0.5" />
          </g>
        </svg>
      </div>

      {/* Corner 3: Bottom-Left Floral Cluster */}
      <div className="absolute -bottom-10 -left-10 w-48 h-48 sm:w-56 sm:h-56 transform rotate-45">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_4px_12px_rgba(110,127,78,0.12)]">
          {/* Leaves */}
          <path
            d="M120,70 Q160,50 185,20 Q160,60 120,70 Z"
            fill="#6E7F4E"
            opacity="0.85"
          />
          <path
            d="M100,85 Q135,45 150,15 Q125,55 100,85 Z"
            fill="#8A9A68"
            opacity="0.8"
          />

          {/* Daisy */}
          <g transform="translate(65, 135)">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
              <ellipse
                key={i}
                cx="0"
                cy="-38"
                rx="12"
                ry="26"
                fill="#FFFDF7"
                stroke="#E2D6C0"
                strokeWidth="1.2"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="22" fill="#E5A93C" stroke="#D48C2C" strokeWidth="2" />
            <circle cx="0" cy="0" r="16" fill="#F3BF4B" />
          </g>
        </svg>
      </div>

      {/* Corner 4: Bottom-Right Floral Cluster */}
      <div className="absolute -bottom-12 -right-12 w-52 h-52 sm:w-64 sm:h-64 transform -rotate-25">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_4px_12px_rgba(212,140,44,0.1)]">
          {/* Leaves */}
          <path
            d="M70,80 Q40,40 10,25 Q35,60 70,80 Z"
            fill="#8A9A68"
            opacity="0.85"
          />
          <path
            d="M85,95 Q50,65 25,50 Q60,80 85,95 Z"
            fill="#6E7F4E"
            opacity="0.9"
          />
          {/* Subtle ice flake */}
          <path
            d="M40,55 L42,49 L44,55 L50,57 L44,59 L42,65 L40,59 L34,57 Z"
            fill="#BAE6FD"
            opacity="0.75"
          />

          {/* Daisy */}
          <g transform="translate(135, 135)">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
              <ellipse
                key={i}
                cx="0"
                cy="-42"
                rx="13"
                ry="29"
                fill="#FFFDF7"
                stroke="#E2D6C0"
                strokeWidth="1.2"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="25" fill="#E5A93C" stroke="#D48C2C" strokeWidth="2" />
            <circle cx="0" cy="0" r="18" fill="#F3BF4B" />
          </g>
        </svg>
      </div>
    </div>
  );
};
