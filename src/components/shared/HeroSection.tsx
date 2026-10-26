'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Brain, 
  Zap, 
  Briefcase,
  Users,
  Compass
} from 'lucide-react';

interface MockCandidate {
  id: string;
  name: string;
  role: string;
  matchScore: number;
  stage: 'APPLIED' | 'SCREENING' | 'OFFER';
  avatarInitials: string;
  avatarBg: string;
  skills: string[];
}

const INITIAL_CANDIDATES: MockCandidate[] = [
  {
    id: 'c1',
    name: 'Sarah Jenkins',
    role: 'Full Stack Engineer',
    matchScore: 98,
    stage: 'SCREENING',
    avatarInitials: 'SJ',
    avatarBg: 'bg-blue-600',
    skills: ['TypeScript', 'Next.js', 'PostgreSQL'],
  },
  {
    id: 'c2',
    name: 'David Chen',
    role: 'Senior DevOps Architect',
    matchScore: 94,
    stage: 'APPLIED',
    avatarInitials: 'DC',
    avatarBg: 'bg-indigo-600',
    skills: ['Kubernetes', 'AWS', 'Terraform'],
  },
  {
    id: 'c3',
    name: 'Elena Rostova',
    role: 'Staff Product Designer',
    matchScore: 99,
    stage: 'OFFER',
    avatarInitials: 'ER',
    avatarBg: 'bg-emerald-600',
    skills: ['Design Systems', 'Figma', 'UX Research'],
  },
];

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'TOP_MATCH' | 'REMOTE'>('ALL');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/jobs');
    }
  };

  return (
    <section className="relative w-full overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-32 linear-canvas linear-grid transition-colors">
      {/* Ambient Lighting Layers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] linear-glow-blue pointer-events-none -z-10" />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] linear-glow-indigo pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ── Top Announcement Badge ───────────────────────────────────── */}
        <div className="flex justify-center mb-8">
          <Link
            href="/jobs"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-[#8a8f98] dark:hover:text-[#f7f8f8] hover:border-blue-400 dark:hover:border-white/20 transition-all duration-160 shadow-sm dark:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]"
          >
            <span className="flex items-center justify-center size-4 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400">
              <Sparkles className="size-2.5" />
            </span>
            <span className="text-slate-900 dark:text-[#f7f8f8] font-semibold">HireFlow 2.0</span>
            <span className="text-slate-300 dark:text-white/20">|</span>
            <span>Real-time ATS & pgvector AI matching</span>
            <ChevronRight className="size-3 text-slate-400 dark:text-[#8a8f98] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* ── Main Typography Hero ─────────────────────────────────────── */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-[#f7f8f8] leading-[1.06] text-balance">
            Hiring at the <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
              speed of thought.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-[#8a8f98] max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            HireFlow is the precision ATS platform designed for high-growth tech teams. 
            Streamline candidate pipelines with instant vector matching, real-time messaging, and frictionless applications.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/employer/sign-up"
              className="w-full sm:w-auto h-11 px-6 rounded-xl bg-blue-600 text-white hover:bg-blue-500 dark:bg-[#f7f8f8] dark:text-[#08090a] dark:hover:bg-white font-bold text-sm shadow-md shadow-blue-600/20 dark:shadow-[0_0_24px_rgba(255,255,255,0.25)] transition-all duration-160 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="size-4 fill-current text-white dark:text-blue-600" />
              <span>Start Hiring Free</span>
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/jobs"
              className="w-full sm:w-auto h-11 px-6 rounded-xl linear-card linear-card-hover font-semibold text-sm text-slate-800 dark:text-[#f7f8f8] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="size-4 text-slate-500 dark:text-[#8a8f98]" />
              <span>Explore 500+ Open Roles</span>
            </Link>
          </div>

          {/* Quick Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="pt-4 max-w-xl mx-auto"
          >
            <div className="relative flex items-center rounded-xl linear-card p-1.5 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/30 transition-all duration-160">
              <Search className="size-4 text-slate-400 dark:text-[#8a8f98] ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title, skill (e.g. React, TypeScript), or company..."
                className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-[#f7f8f8] placeholder:text-slate-400 dark:placeholder:text-[#8a8f98]/60 focus:outline-none"
              />
              <button
                type="submit"
                className="h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Find Jobs</span>
              </button>
            </div>
            
            {/* Quick Filter Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-[11px] text-slate-500 dark:text-[#8a8f98]">
              <span>Popular:</span>
              {['Engineering', 'Remote', 'Product', 'Design', 'Data'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => router.push(`/jobs?category=${encodeURIComponent(tag)}`)}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] text-slate-600 dark:text-[#8a8f98] hover:text-slate-900 dark:hover:text-[#f7f8f8] border border-slate-200 dark:border-white/[0.06] transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* ── Centerpiece: Linear Interactive ATS Visualizer ───────────── */}
        <div className="mt-14 lg:mt-20 max-w-5xl mx-auto">
          <div className="rounded-2xl linear-card p-3 sm:p-5 shadow-xl shadow-slate-200/50 dark:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
            
            {/* Widget Window Titlebar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-white/[0.06] px-1 sm:px-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-500/80" />
                  <span className="size-2.5 rounded-full bg-yellow-500/80" />
                  <span className="size-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-[#8a8f98] ml-2 hidden sm:inline">
                  hireflow / pipeline / staff-fullstack-engineer
                </span>
              </div>

              {/* Status & Filter Pills */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-[#8a8f98]">
                  BullMQ: Active
                </span>
              </div>
            </div>

            {/* Pipeline Stage Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              
              {/* Column 1: Applied / AI Vector Match */}
              <div className="space-y-3 p-3 rounded-xl bg-slate-50/70 dark:bg-white/[0.015] border border-slate-200/60 dark:border-white/[0.04]">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-[#8a8f98]">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-blue-500" />
                    Applied & Parsed
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-white/[0.05] text-[10px] text-slate-800 dark:text-[#f7f8f8]">12</span>
                </div>

                {/* Candidate Card */}
                <div className="p-3.5 rounded-xl linear-card linear-card-hover space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="size-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        DC
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-[#f7f8f8]">David Chen</h4>
                        <p className="text-[10px] text-slate-500 dark:text-[#8a8f98]">Senior DevOps Architect</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      94% Match
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {['Kubernetes', 'AWS', 'Terraform'].map((skill) => (
                      <span key={skill} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04] text-[9px] text-slate-600 dark:text-[#8a8f98] border border-slate-200/60 dark:border-transparent">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/[0.04] text-[10px] text-slate-500 dark:text-[#8a8f98]">
                    <span>Cosine Vector: 0.941</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Ready for review</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Technical Screening */}
              <div className="space-y-3 p-3 rounded-xl bg-slate-50/70 dark:bg-white/[0.015] border border-slate-200/60 dark:border-white/[0.04]">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-[#8a8f98]">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-indigo-500" />
                    Technical Interview
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-white/[0.05] text-[10px] text-slate-800 dark:text-[#f7f8f8]">4</span>
                </div>

                {/* Candidate Card */}
                <div className="p-3.5 rounded-xl linear-card linear-card-hover space-y-2.5 ring-1 ring-blue-500/40">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="size-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        SJ
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-[#f7f8f8]">Sarah Jenkins</h4>
                        <p className="text-[10px] text-slate-500 dark:text-[#8a8f98]">Full Stack Engineer</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      98% Match
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {['TypeScript', 'Next.js', 'PostgreSQL', 'Tailwind'].map((skill) => (
                      <span key={skill} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04] text-[9px] text-slate-600 dark:text-[#8a8f98] border border-slate-200/60 dark:border-transparent">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/[0.04] text-[10px] text-slate-500 dark:text-[#8a8f98]">
                    <span>Interview: Today 3:00 PM</span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">Socket Connected</span>
                  </div>
                </div>
              </div>

              {/* Column 3: Offer Extended */}
              <div className="space-y-3 p-3 rounded-xl bg-slate-50/70 dark:bg-white/[0.015] border border-slate-200/60 dark:border-white/[0.04]">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-[#8a8f98]">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    Offer Extended
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-white/[0.05] text-[10px] text-slate-800 dark:text-[#f7f8f8]">1</span>
                </div>

                {/* Candidate Card */}
                <div className="p-3.5 rounded-xl linear-card linear-card-hover space-y-2.5 border-emerald-500/30">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="size-7 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        ER
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-[#f7f8f8]">Elena Rostova</h4>
                        <p className="text-[10px] text-slate-500 dark:text-[#8a8f98]">Staff Product Designer</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      99% Match
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-emerald-700 dark:text-emerald-300">$165,000 / year</span>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      <CheckCircle2 className="size-3" /> Offer Signed
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/[0.04] text-[10px] text-slate-500 dark:text-[#8a8f98]">
                    <span>Time to Hire: 8 Days</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Onboarding</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
