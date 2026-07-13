import React from 'react';
import { Card } from '@/components/ui/card';

interface StepItem {
  number: string;
  title: string;
  description: string;
}

const STEPS: StepItem[] = [
  {
    number: '1',
    title: 'Create account',
    description:
      'Start your journey today. Nulla facilisi. Aenean et tortor at elit luctus.',
  },
  {
    number: '2',
    title: 'Upload CV / Resume',
    description:
      'Easily upload your resume. Donec euismod velit at tempor, ut cursus.',
  },
  {
    number: '3',
    title: 'Find suitable job',
    description:
      'Discover jobs for you. In hac habitasse platea dictumst. Morbi imperdiet.',
  },
  {
    number: '4',
    title: 'Apply job',
    description:
      'Apply in just a click. Sed luctus, lorem id pharetra dapibus, velit nisi.',
  },
];

export function StepsToDreamJob() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#EFF5FF] dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            Steps to Your Dream Job
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
            The last job offers Upload
          </p>
        </div>

        {/* 4-Column Steps Grid with Floating Number Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          {STEPS.map((step) => (
            <div key={step.number} className="relative pt-6">
              
              {/* Floating Step Number Badge */}
              <div className="absolute top-0 left-6 z-10 size-12 rounded-2xl bg-blue-100/90 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-900/50 flex items-center justify-center font-black text-xl text-blue-600 dark:text-blue-400 shadow-sm transition-all duration-300 pointer-events-none group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-md group-hover:shadow-blue-600/30">
                {step.number}
              </div>

              {/* Step Card Container */}
              <Card className="group relative overflow-hidden rounded-2xl border border-blue-100/80 dark:border-border/60 bg-white dark:bg-zinc-900/90 pt-10 pb-7 px-6 shadow-md shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-600/10 hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer h-full flex flex-col justify-between">
                
                {/* Subtle Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/0 via-transparent to-blue-600/0 group-hover:from-blue-600/[0.03] group-hover:to-indigo-600/[0.03] transition-colors duration-300 pointer-events-none" />

                {/* Step Content */}
                <div className="space-y-2.5 mt-1">
                  <h3 className="font-bold text-lg sm:text-xl text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-200">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Step Indicator Line */}
                <div className="mt-6 h-1 w-12 rounded-full bg-blue-100 dark:bg-zinc-800 group-hover:w-full group-hover:bg-blue-600 transition-all duration-300" />
              </Card>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
