import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function EmployerCta() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#EFF5FF] dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        
        {/* Main Banner Card Container with #EFF5FF background */}
        <div className="group relative overflow-hidden rounded-3xl border border-blue-100/80 dark:border-border/60 bg-[#EFF5FF] dark:bg-zinc-900 shadow-md shadow-blue-900/5 px-6 sm:px-12 lg:px-16 pt-10 sm:pt-14 lg:pt-0 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 min-h-[480px]">
          
          {/* Left Column: Heading, Description & Action Button */}
          <div className="lg:col-span-6 space-y-6 z-10 py-6 lg:py-16 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight">
              Are you employer?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
              You can find various solutions just by accessing our platform. Because
              we are committed to maintaining the quality of user service
            </p>
            <div className="pt-2">
              <Link href="/employer/post-job" className="inline-block">
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-xl text-base shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  Post a job
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Centered Employer Image with Concentric Contour Circles and Zoom Animation */}
          <div className="lg:col-span-6 relative flex items-center justify-center h-[380px] sm:h-[460px] lg:h-[540px] z-10 mt-4 lg:mt-0">
            
            {/* Concentric Background Circle Curves Behind the Employer */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                viewBox="0 0 600 600"
                className="w-[120%] h-[120%] max-w-[650px] stroke-blue-200/80 dark:stroke-blue-900/40 fill-none transition-transform duration-700 ease-out group-hover:scale-105"
                aria-hidden="true"
              >
                {/* Outer Contour Ring */}
                <path
                  d="M 300, 30 C 470, 30 580, 150 560, 320 C 540, 480 390, 580 250, 560 C 110, 540 20, 400 40, 240 C 60, 90 150, 30 300, 30 Z"
                  strokeWidth="1.5"
                />
                {/* Middle Contour Ring */}
                <path
                  d="M 300, 90 C 430, 90 520, 180 500, 320 C 480, 450 360, 520 250, 500 C 140, 480 70, 370 90, 240 C 110, 120 180, 90 300, 90 Z"
                  strokeWidth="1.5"
                />
                {/* Inner Contour Ring */}
                <path
                  d="M 300, 160 C 390, 160 450, 220 440, 320 C 430, 410 340, 460 260, 440 C 180, 420 130, 340 140, 250 C 150, 170 220, 160 300, 160 Z"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Centered & Zoomed Image Container */}
            <div className="relative size-full max-w-[440px] flex items-center justify-center">
              <div className="relative w-full h-[115%] sm:h-[120%] flex items-center justify-center overflow-visible">
                <Image
                  src="/assets/images/employer.jpg"
                  alt="Employer holding clipboard ready to post job"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-contain object-bottom scale-110 sm:scale-115 lg:scale-120 group-hover:scale-125 sm:group-hover:scale-130 transition-transform duration-700 ease-out"
                  priority
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
