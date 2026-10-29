'use client';

import React from 'react';

interface AudioWaveformProps {
  isActive: boolean;
  variant?: 'ai' | 'candidate';
  barCount?: number;
  className?: string;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isActive,
  variant = 'ai',
  barCount = 14,
  className = '',
}) => {
  // Deterministic bar heights for realistic soundwave aesthetic
  const baseHeights = [30, 60, 45, 80, 100, 70, 90, 50, 85, 95, 40, 65, 75, 55, 35, 80];

  const getColorClass = (index: number) => {
    if (variant === 'ai') {
      return isActive
        ? 'bg-gradient-to-t from-blue-600 via-indigo-500 to-cyan-400 dark:from-blue-500 dark:via-indigo-400 dark:to-cyan-300'
        : 'bg-slate-300 dark:bg-zinc-700';
    } else {
      return isActive
        ? 'bg-gradient-to-t from-emerald-600 via-teal-500 to-emerald-400 dark:from-emerald-500 dark:via-teal-400 dark:to-emerald-300'
        : 'bg-slate-300 dark:bg-zinc-700';
    }
  };

  return (
    <div className={`flex items-center justify-center gap-1.5 h-12 ${className}`}>
      {Array.from({ length: barCount }).map((_, index) => {
        const heightPercent = baseHeights[index % baseHeights.length] || 50;
        const animationDelay = `${(index * 0.08).toFixed(2)}s`;
        const animationDuration = isActive ? '0.9s' : '2s';

        return (
          <div
            key={index}
            style={{
              height: isActive ? `${heightPercent}%` : '20%',
              animationDelay,
              animationDuration,
            }}
            className={`w-1 rounded-full transition-all duration-300 ${getColorClass(index)} ${
              isActive ? 'animate-pulse' : ''
            }`}
          />
        );
      })}
    </div>
  );
};

