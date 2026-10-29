'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Brain, 
  Zap, 
  Compass,
  FileText,
  Video,
  MessageSquare,
  ShieldCheck,
  Trophy,
  Clock,
  Play,
  Pause
} from 'lucide-react';

interface VelocityStage {
  id: number;
  stepNumber: string;
  tabTitle: string;
  tabSubtitle: string;
  windowPath: string;
  badgeLabel: string;
  badgeColor: string;
  candidateName: string;
  candidateRole: string;
  candidateAvatarBg: string;
  matchScore: string;
  matchColor: string;
  skills: string[];
  headline: string;
  description: string;
  metricLabel: string;
  metricValue: string;
}

const VELOCITY_STAGES: VelocityStage[] = [
  {
    id: 0,
    stepNumber: '01',
    tabTitle: '1-Click Apply',
    tabSubtitle: 'Instant CV Parsing',
    windowPath: 'hireflow / pipeline / applicant-intake',
    badgeLabel: 'New Application',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    candidateName: 'Alex Rivera',
    candidateRole: 'Staff Distributed Systems Engineer',
    candidateAvatarBg: 'bg-gradient-to-br from-blue-600 to-indigo-600',
    matchScore: 'Parsing...',
    matchColor: 'bg-slate-200/60 dark:bg-white/[0.08] text-slate-700 dark:text-[#8a8f98]',
    skills: ['Distributed Systems', 'Go', 'TypeScript', 'PostgreSQL', 'Docker'],
    headline: '1-Click Application & Zero Resume Black Hole',
    description: 'Candidates apply directly with their structured profile or resume. BullMQ worker queues instantly parse the CV and generate high-dimensional text embeddings in 0.8 seconds.',
    metricLabel: 'Intake Velocity',
    metricValue: '0.8s Extraction Time'
  },
  {
    id: 1,
    stepNumber: '02',
    tabTitle: 'pgvector AI Match',
    tabSubtitle: 'Cosine Similarity',
    windowPath: 'hireflow / ai-engine / pgvector-embeddings',
    badgeLabel: 'AI Vector Match: Top 1%',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    candidateName: 'Alex Rivera',
    candidateRole: 'Staff Distributed Systems Engineer',
    candidateAvatarBg: 'bg-gradient-to-br from-indigo-600 to-purple-600',
    matchScore: '98.7% Match',
    matchColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
    skills: ['Distributed Systems (99%)', 'pgvector (98%)', 'Go Concurrency (98%)', 'Kafka'],
    headline: 'Mathematical Cosine Similarity vs. Keyword Searching',
    description: 'Traditional ATS keyword search misses 70% of qualified talent. HireFlow translates candidate resumes into 1536-dimensional vectors, matching real engineering competencies in sub-second queries.',
    metricLabel: 'Cosine Vector Distance',
    metricValue: '0.013 Distance (Top 1%)'
  },
  {
    id: 2,
    stepNumber: '03',
    tabTitle: 'Live Interview',
    tabSubtitle: 'Sub-50ms Sockets',
    windowPath: 'hireflow / realtime / socketio-interview',
    badgeLabel: 'Meeting Scheduled',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    candidateName: 'Alex Rivera',
    candidateRole: 'Staff Distributed Systems Engineer',
    candidateAvatarBg: 'bg-gradient-to-br from-blue-600 to-emerald-600',
    matchScore: 'Invited to Screen',
    matchColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/25',
    skills: ['System Architecture Screen', 'Sub-50ms Socket Sync', 'Live Calendar Integration'],
    headline: 'Frictionless Recruiter Chat & Rapid Screening',
    description: 'Hiring managers connect with pre-vetted engineers instantly over sub-50ms WebSockets. Eliminate 5-day email delays and schedule technical deep-dives with a single click.',
    metricLabel: 'WebSocket Latency',
    metricValue: '32ms Live Latency'
  },
  {
    id: 3,
    stepNumber: '04',
    tabTitle: 'Instant Offer',
    tabSubtitle: '6-Day Time-to-Hire',
    windowPath: 'hireflow / contracts / offer-accepted',
    badgeLabel: 'Offer Extended & Signed',
    badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    candidateName: 'Alex Rivera',
    candidateRole: 'Staff Distributed Systems Engineer',
    candidateAvatarBg: 'bg-gradient-to-br from-emerald-600 to-teal-600',
    matchScore: '$185,000 / yr',
    matchColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    skills: ['Full Remote', '0.15% Equity', 'Hardware Stipend', 'Health/Dental/401k'],
    headline: 'Transparent Salary Bands & Automated Onboarding',
    description: 'Offers are extended with crystal-clear compensation upfront. Digital signature dispatch and automated candidate onboarding condense hiring cycles from 42 days down to 6 days.',
    metricLabel: 'Cycle Compression',
    metricValue: '6 Days (85% Faster)'
  }
];

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Simulator State
  const [activeStage, setActiveStage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play interval for ATS pipeline simulator
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % VELOCITY_STAGES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/jobs');
    }
  };

  const currentStage = VELOCITY_STAGES[activeStage];

  return (
    <section className="relative w-full overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-32 linear-canvas linear-grid transition-colors">
      {/* Ambient Lighting Layers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] linear-glow-blue pointer-events-none -z-10" />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] linear-glow-indigo pointer-events-none -z-10" />

      {/* Floating Ambient Telemetry Chips (Desktop Only) */}
      <div className="hidden xl:flex items-center gap-3 px-3.5 py-2 rounded-2xl linear-card animate-float-slow absolute top-28 left-6 2xl:left-14 pointer-events-none shadow-lg shadow-slate-200/60 dark:shadow-[0_12px_24px_-6px_rgba(0,0,0,0.8)] text-xs font-semibold z-10 border border-slate-200/80 dark:border-white/[0.08]">
        <div className="size-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <Brain className="size-4" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-900 dark:text-[#f7f8f8]">0.8s Vector Extraction</div>
          <div className="text-[10px] text-slate-500 dark:text-[#8a8f98]">pgvector Embeddings Ready</div>
        </div>
      </div>

      <div className="hidden xl:flex items-center gap-3 px-3.5 py-2 rounded-2xl linear-card animate-float-slow-delayed absolute top-36 right-6 2xl:right-14 pointer-events-none shadow-lg shadow-slate-200/60 dark:shadow-[0_12px_24px_-6px_rgba(0,0,0,0.8)] text-xs font-semibold z-10 border border-slate-200/80 dark:border-white/[0.08]">
        <div className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <Zap className="size-4" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-900 dark:text-[#f7f8f8]">Live Socket Sync (32ms)</div>
          <div className="text-[10px] text-slate-500 dark:text-[#8a8f98]">Recruiter & Candidate Online</div>
        </div>
      </div>

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

        {/* ── Centerpiece: Interactive ATS Velocity Loop Simulator ────────── */}
        <div 
          className="mt-14 lg:mt-20 max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="rounded-2xl linear-card p-3 sm:p-5 shadow-xl shadow-slate-200/50 dark:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
            
            {/* Window Titlebar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-white/[0.06] px-1 sm:px-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-500/80" />
                  <span className="size-2.5 rounded-full bg-yellow-500/80" />
                  <span className="size-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-[#8a8f98] ml-2 hidden sm:inline">
                  {currentStage.windowPath}
                </span>
              </div>

              {/* Status & Auto-play indicator */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium text-slate-500 dark:text-[#8a8f98] hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
                  title={isPaused ? 'Resume auto-cycle' : 'Pause auto-cycle'}
                >
                  {isPaused ? <Play className="size-2.5 text-blue-500" /> : <Pause className="size-2.5 text-amber-500" />}
                  <span>{isPaused ? 'Paused' : 'Auto-looping'}</span>
                </button>

                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
              </div>
            </div>

            {/* 4-Stage Interactive Scrubber Tabs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-3 pb-4 border-b border-slate-200/60 dark:border-white/[0.04]">
              {VELOCITY_STAGES.map((stage, idx) => {
                const isActive = activeStage === idx;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => {
                      setActiveStage(idx);
                      setIsPaused(true);
                    }}
                    className={`relative p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer overflow-hidden ${
                      isActive 
                        ? 'bg-blue-50/80 dark:bg-white/[0.07] border border-blue-300/80 dark:border-white/20 shadow-xs' 
                        : 'bg-transparent hover:bg-slate-100/70 dark:hover:bg-white/[0.02] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-zinc-500'}`}>
                        {stage.stepNumber}
                      </span>
                      {isActive && (
                        <span className="size-1.5 rounded-full bg-blue-500 animate-ping" />
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-[#f7f8f8] truncate">
                      {stage.tabTitle}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-[#8a8f98] truncate">
                      {stage.tabSubtitle}
                    </div>

                    {/* Progress Fill Bar */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 w-full overflow-hidden">
                        <div className={`h-full bg-blue-500 ${!isPaused ? 'animate-ticker' : 'w-full'}`} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Stage Body Grid: Left Interactive Candidate Stage Card + Right ATS Log */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-5 items-stretch">
              
              {/* Left Column (7 Cols): Active Candidate Card with Laser Scan & Live Telemetry */}
              <div className="lg:col-span-7 p-5 rounded-xl linear-card relative overflow-hidden flex flex-col justify-between space-y-4 border border-slate-200 dark:border-white/[0.08]">
                
                {/* Laser Scanning Beam (Active on Stage 1 or when scanning) */}
                {activeStage === 1 && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    <div className="w-24 h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent skew-x-12 animate-scan-beam" />
                  </div>
                )}

                {/* Candidate Header */}
                <div className="flex items-start justify-between gap-3 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={`size-11 rounded-xl ${currentStage.candidateAvatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm border border-white/20`}>
                      AR
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-[#f7f8f8]">
                          {currentStage.candidateName}
                        </h4>
                        <span className="size-2 rounded-full bg-emerald-500" title="Online" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-[#8a8f98]">
                        {currentStage.candidateRole}
                      </p>
                    </div>
                  </div>

                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border ${currentStage.matchColor} transition-all`}>
                    {currentStage.matchScore}
                  </span>
                </div>

                {/* Stage-Specific Middle Interactive Element */}
                <div className="space-y-3 relative z-10">
                  
                  {/* Stage 0: Resume Intake Preview */}
                  {activeStage === 0 && (
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-slate-800 dark:text-[#f7f8f8] font-semibold">
                          <FileText className="size-4 text-blue-500" />
                          alex_rivera_resume.pdf
                        </span>
                        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">100% Parsed</span>
                      </div>
                      <div className="w-full h-1 bg-slate-200 dark:bg-white/[0.08] rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full w-full" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-[#8a8f98]">
                        Parsed via BullMQ workers • Zero repetitive data entry • Profile generated
                      </p>
                    </div>
                  )}

                  {/* Stage 1: pgvector Cosine Score Breakdown */}
                  {activeStage === 1 && (
                    <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-500/20 space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-bold text-indigo-900 dark:text-indigo-200">
                        <span className="flex items-center gap-1.5">
                          <Brain className="size-3.5 text-indigo-600 dark:text-indigo-400" />
                          Cosine Vector Distance: 0.013
                        </span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400">Top 1% Pool</span>
                      </div>
                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex justify-between text-slate-600 dark:text-[#8a8f98]">
                          <span>Distributed Architecture Match</span>
                          <span className="font-bold text-slate-800 dark:text-white">99.4%</span>
                        </div>
                        <div className="w-full h-1 bg-slate-200 dark:bg-white/[0.08] rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full w-[99.4%]" />
                        </div>
                        <div className="flex justify-between text-slate-600 dark:text-[#8a8f98] pt-0.5">
                          <span>Concurrency & Low-Latency Go</span>
                          <span className="font-bold text-slate-800 dark:text-white">98.2%</span>
                        </div>
                        <div className="w-full h-1 bg-slate-200 dark:bg-white/[0.08] rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full w-[98.2%]" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stage 2: Sub-50ms Recruiter Chat & Video Invite */}
                  {activeStage === 2 && (
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] space-y-2.5">
                      <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-200/60 dark:border-white/[0.06]">
                        <span className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-[#f7f8f8]">
                          <Video className="size-3.5 text-blue-500" />
                          Technical Interview: Today 3:00 PM EST
                        </span>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Room Ready</span>
                      </div>
                      <div className="space-y-1.5 text-[11px]">
                        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-500/20 text-blue-950 dark:text-blue-100">
                          <span className="font-bold">Alex Morgan (Tech Lead):</span> &ldquo;Alex, your distributed systems work is exceptional. Free for a technical deep-dive today?&rdquo;
                        </div>
                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-[#f7f8f8] ml-2">
                          <span className="font-bold">Alex Rivera:</span> &ldquo;Absolutely! Just confirmed on the calendar.&rdquo;
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stage 3: Offer Package & Digital Signing */}
                  {activeStage === 3 && (
                    <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-500/25 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
                          COMPENSATION_PACKAGE
                        </span>
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="size-3.5" /> Digitally Signed
                        </span>
                      </div>
                      <div className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        $185,000 <span className="text-xs font-normal text-slate-500 dark:text-zinc-400">/ year + 0.15% Equity</span>
                      </div>
                      <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">
                        Time to Hire: 6 Days (Industry Benchmark: 42 Days) • Onboarding Initialized
                      </div>
                    </div>
                  )}

                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentStage.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-[#8a8f98] border border-slate-200/80 dark:border-white/[0.06]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Telemetry */}
                <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-500 dark:text-[#8a8f98] relative z-10">
                  <span className="font-mono text-[11px]">{currentStage.metricLabel}</span>
                  <span className="font-bold text-slate-800 dark:text-[#f7f8f8]">{currentStage.metricValue}</span>
                </div>

              </div>

              {/* Right Column (5 Cols): Stage Explanation & Architectural Context */}
              <div className="lg:col-span-5 p-5 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.04] flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-semibold border bg-white dark:bg-white/[0.05] border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-[#f7f8f8]">
                    <span className="size-1.5 rounded-full bg-blue-500" />
                    <span>Stage {currentStage.stepNumber} of 04</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#f7f8f8] leading-snug">
                    {currentStage.headline}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8a8f98] leading-relaxed">
                    {currentStage.description}
                  </p>
                </div>

                {/* Navigation controls & action button */}
                <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-[#8a8f98]">
                    {activeStage + 1} / 4 Stages
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveStage((prev) => (prev + 1) % VELOCITY_STAGES.length)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <span>Next Stage</span>
                    <ChevronRight className="size-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
