import React from 'react';
import { AchievementCard, AchievementItem } from '@/components/shared/AchievementCard';

const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'profile-boost',
    target: 300,
    suffix: '+',
    label: 'Profile Boost',
  },
  {
    id: 'easy-applications',
    target: 999,
    suffix: '+',
    label: 'Easy Applications',
  },
  {
    id: 'interviews',
    target: 400,
    suffix: '+',
    label: 'Interviews',
  },
  {
    id: 'successful-hires',
    target: 600,
    suffix: '+',
    label: 'Successful hires',
  },
];

export function OurAchievements() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#EFF5FF] dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        
        {/* 2-Column Responsive Layout: Left Description + Right Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Explanatory Paragraph */}
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight sm:leading-tight lg:leading-tight">
              Our Achievements in Hiring
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Whether you&apos;re an employer looking for top talent or a job seeker
              searching for the perfect role, our platform has helped hundreds of
              professionals find success. Be the next one to achieve your career goals!
            </p>
          </div>

          {/* Right Column: 2x2 Grid of Animated Counter Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {ACHIEVEMENTS.map((item) => (
              <AchievementCard key={item.id} item={item} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
