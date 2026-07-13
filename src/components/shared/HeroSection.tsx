import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Search,
  MapPin,
  ChevronDown,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden pt-6 pb-20 lg:py-16 px-4 sm:px-6 lg:px-8 bg-[#EFF5FF] dark:bg-slate-950 transition-colors duration-300">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-10 -z-10 size-96 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 -z-10 size-[500px] rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subtitle, Compact Search Bar, Social Proof */}
          <div className="lg:col-span-6 space-y-7 text-left">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-foreground leading-[1.08]">
              Your Future <br />
              Starts with <br />
              <span className="text-blue-600 dark:text-blue-500 relative inline-block">
                Hire Flow!
                <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-200/60 dark:bg-blue-900/40 -z-10 rounded-full rotate-1" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground font-medium max-w-lg leading-relaxed">
              Discover jobs that match your skills and passion. Type and explore!
            </p>

            {/* Compact, Professional Search Bar Card */}
            <Card className="rounded-2xl border border-blue-200/60 dark:border-border/60 bg-white/95 dark:bg-zinc-900/95 p-1.5 sm:p-2 shadow-xl shadow-blue-900/5 backdrop-blur-md max-w-xl">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-2">
                
                {/* Keyword Search Input */}
                <div className="flex flex-1 items-center gap-2 px-3 py-1">
                  <Search className="size-4 text-muted-foreground shrink-0" />
                  <Input
                    type="text"
                    placeholder="Job title or keywords"
                    className="border-0 shadow-none focus-visible:ring-0 px-0 text-sm sm:text-base font-medium placeholder:text-muted-foreground/70 h-9 bg-transparent w-full"
                  />
                </div>

                {/* Vertical Divider for Desktop */}
                <div className="hidden sm:block h-7 w-px bg-border/80 shrink-0" />
                <div className="block sm:hidden h-px w-full bg-border/60 my-1" />

                {/* Location Dropdown Trigger */}
                <div className="flex items-center justify-between gap-2 px-3 py-2 sm:py-1 cursor-pointer hover:bg-blue-50/60 dark:hover:bg-muted/50 rounded-xl transition-colors h-9">
                  <div className="flex items-center gap-1.5 font-medium text-foreground text-sm sm:text-base whitespace-nowrap">
                    <MapPin className="size-4 text-muted-foreground shrink-0" />
                    <span>location</span>
                  </div>
                  <ChevronDown className="size-4 text-muted-foreground ml-1.5 shrink-0" />
                </div>

                {/* Search Submit Button */}
                <Button
                  size="default"
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 h-10 text-sm sm:text-base shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-200 flex items-center justify-center gap-2 shrink-0"
                >
                  <Search className="size-4 sm:size-4.5" />
                  <span>Search</span>
                </Button>
              </div>
            </Card>

            {/* Social Proof Avatars & Counter */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <div className="flex -space-x-3 overflow-hidden">
                <div className="inline-block size-9 rounded-full border-2 border-white dark:border-zinc-900 bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  JD
                </div>
                <div className="inline-block size-9 rounded-full border-2 border-white dark:border-zinc-900 bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  AR
                </div>
                <div className="inline-block size-9 rounded-full border-2 border-white dark:border-zinc-900 bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  MK
                </div>
              </div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                Over <span className="font-extrabold text-blue-600 dark:text-blue-400">999+</span> jobseeker are successfully hired
              </p>
            </div>
          </div>

          {/* Right Column: Hero Illustration & Floating Glass UI Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[440px] sm:min-h-[540px] w-full mt-4 lg:mt-0">
            
            {/* Background Circle & Glow */}
            <div className="absolute size-[320px] sm:size-[440px] rounded-full bg-gradient-to-tr from-blue-200/60 via-blue-100/40 to-indigo-100/60 dark:from-blue-900/30 dark:via-blue-950/20 dark:to-indigo-900/20 border border-white/80 dark:border-blue-800/30 shadow-inner flex items-center justify-center -z-10 animate-pulse duration-[6000ms]" />

            {/* Central Hero Image inside Circle Frame */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md">
              <div className="relative size-72 sm:size-[370px] rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl bg-blue-50 dark:bg-zinc-900">
                <Image
                  src="/assets/images/interview.jpg"
                  alt="Professional job interview at Hire Flow"
                  fill
                  className="object-cover object-center scale-105"
                  priority
                />
              </div>
            </div>

            {/* Floating Card 1: 1k Assisted Candidates (Top Left near frame) */}
            <Card className="absolute top-4 left-0 sm:left-4 z-20 rounded-2xl border border-blue-100/80 dark:border-border/60 bg-white/95 dark:bg-zinc-900/95 p-3.5 sm:p-4 shadow-xl shadow-blue-900/5 backdrop-blur-md flex items-center gap-3 hover:-translate-y-1 transition-all duration-300">
              <div className="size-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 shrink-0">
                <Calendar className="size-5.5" />
              </div>
              <div>
                <h4 className="font-extrabold text-lg sm:text-xl leading-none text-foreground">1k</h4>
                <p className="text-xs font-medium text-muted-foreground mt-1">
                  Assisted Candidates.
                </p>
              </div>
            </Card>

            {/* Floating Card 2: 15 Total job Donut Chart (Top Right near frame) */}
            <Card className="absolute top-20 right-0 sm:-right-2 z-20 rounded-2xl border border-blue-100/80 dark:border-border/60 bg-white/95 dark:bg-zinc-900/95 p-3.5 sm:p-4 shadow-xl shadow-blue-900/5 backdrop-blur-md flex items-center gap-3.5 hover:-translate-y-1 transition-all duration-300">
              <div className="relative size-14 shrink-0 flex items-center justify-center">
                <svg className="size-full -rotate-90 transform" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    className="stroke-muted"
                    strokeWidth="4"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="4"
                    strokeDasharray="88"
                    strokeDashoffset="35"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="4"
                    strokeDasharray="88"
                    strokeDashoffset="65"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#bfdbfe"
                    strokeWidth="4"
                    strokeDasharray="88"
                    strokeDashoffset="80"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-black leading-none text-foreground">15</span>
                  <span className="text-[7px] font-semibold text-muted-foreground leading-tight">Total job</span>
                </div>
              </div>

              <div className="space-y-1 text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-blue-600 shrink-0" />
                  <span className="text-foreground font-semibold">Under Review</span>
                  <span className="ml-auto font-bold text-foreground">8</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-blue-400 shrink-0" />
                  <span className="text-foreground font-semibold">Accepted</span>
                  <span className="ml-auto font-bold text-foreground">8</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-blue-200 shrink-0" />
                  <span className="text-foreground font-semibold">Rejected</span>
                  <span className="ml-auto font-bold text-foreground">8</span>
                </div>
              </div>
            </Card>

            {/* Floating Card 3: Congratulations You have been hired (Bottom Center) */}
            <Card className="absolute -bottom-1 sm:bottom-4 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-12 z-20 rounded-2xl border border-blue-100/80 dark:border-border/60 bg-white/95 dark:bg-zinc-900/95 p-3.5 sm:p-4 shadow-xl shadow-blue-900/5 backdrop-blur-md flex items-center gap-3.5 hover:-translate-y-1 transition-all duration-300 w-max max-w-[92%] sm:max-w-xs">
              <div className="size-11 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-500/30 shrink-0">
                <CheckCircle2 className="size-5.5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base leading-tight text-foreground">
                  Congratulations
                </h4>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">
                  You have been hired
                </p>
              </div>
            </Card>

          </div>

        </div>
      </div>
    </section>
  );
}
