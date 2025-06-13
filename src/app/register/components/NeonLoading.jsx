"use client";
import React from "react";

export default function NeonLoading({ text = "กำลังโหลด..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#181924] relative">
      {/* Glass Card */}
      <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-[#10101aee] border border-[#7d5fff44] shadow-[0_0_64px_8px_#7d5fff33] backdrop-blur-md">
        {/* Neon Glow Circle */}
        <div className="relative">
          <span className="block w-24 h-24 rounded-full bg-gradient-to-tr from-[#37a0ff] via-[#7d5fff] to-[#f84fff] opacity-70 animate-pulse shadow-[0_0_48px_16px_#7d5fff44] neon-ring"></span>
          {/* Neon Spinner */}
          <svg
            className="absolute left-0 top-0 w-24 h-24"
            viewBox="0 0 96 96"
            fill="none"
          >
            <circle
              className="opacity-10"
              cx="48"
              cy="48"
              r="40"
              stroke="#fff"
              strokeWidth="8"
            />
            <circle
              className="neon-spinner"
              cx="48"
              cy="48"
              r="40"
              stroke="url(#paint0_linear)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="252"
              strokeDashoffset="88"
              fill="none"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="0"
                y1="0"
                x2="96"
                y2="96"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#7d5fff" />
                <stop offset="0.6" stopColor="#37a0ff" />
                <stop offset="1" stopColor="#f84fff" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {/* Loading Text */}
        <div className="mt-7 text-lg sm:text-xl font-bold text-white tracking-widest neon-flicker select-none text-center">
          {text}
        </div>
      </div>
      {/* Neon BG Glow (mouse follow สไตล์เดียวกับฟอร์ม, ถ้าอยากได้ effect เพิ่มเติม) */}
      <style>{`
        .neon-flicker {
          text-shadow: 0 0 12px #7d5fff, 0 0 36px #7d5fff66, 0 0 64px #37a0ff99;
          animation: flicker 2s infinite alternate;
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          49% { opacity: 0.8; }
          50% { opacity: 0.65; }
          60% { opacity: 0.7; }
        }
        .neon-spinner {
          transform-origin: 50% 50%;
          animation: spin 1.1s linear infinite;
          filter: drop-shadow(0 0 16px #7d5fff99);
        }
        @keyframes spin {
          100% { transform: rotate(360deg);}
        }
        .neon-ring {
          filter: blur(2px) drop-shadow(0 0 20px #7d5fffcc);
        }
      `}</style>
    </div>
  );
}
