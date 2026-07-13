'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { UserCheck } from 'lucide-react';

export interface AchievementItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
}

interface AchievementCardProps {
  item: AchievementItem;
}

export function AchievementCard({ item }: AchievementCardProps) {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds counting animation
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function: easeOutQuart for smooth deceleration at the end
      const easeOut = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(easeOut * item.target);
      
      setCount(currentCount);

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCount(item.target);
      }
    };

    // IntersectionObserver to start counting when scrolled into viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          animationFrameId = requestAnimationFrame(animateCount);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
    };
  }, [item.target]);

  return (
    <Card
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl border border-blue-100/80 dark:border-border/60 bg-white dark:bg-zinc-900/90 p-6 shadow-md shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-600/10 hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex items-center gap-5"
    >
      {/* Subtle Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/0 via-transparent to-blue-600/0 group-hover:from-blue-600/[0.03] group-hover:to-indigo-600/[0.03] transition-colors duration-300 pointer-events-none" />

      {/* Icon Box */}
      <div className="size-16 rounded-2xl bg-blue-50/80 dark:bg-blue-950/50 border border-blue-100/60 dark:border-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-md group-hover:shadow-blue-600/30 transition-all duration-300 shrink-0">
        <UserCheck className="size-7 transition-transform duration-300" />
      </div>

      {/* Counting Number & Label */}
      <div className="space-y-1 min-w-0">
        <div className="text-2xl sm:text-3xl font-extrabold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 tracking-tight leading-none">
          {count}
          {item.suffix}
        </div>
        <p className="text-xs sm:text-sm font-semibold text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200 truncate">
          {item.label}
        </p>
      </div>
    </Card>
  );
}
