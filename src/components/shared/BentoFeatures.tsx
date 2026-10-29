'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Brain, 
  Zap, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  DollarSign, 
  Clock,
  Layers,
  Send,
  Radio,
  Activity
} from 'lucide-react';

export function BentoFeatures() {
  return (
    <section className="relative w-full py-20 lg:py-28 linear-canvas linear-grid border-t border-slate-200/80 dark:border-white/[0.06] overflow-hidden">
      {/* Subtle Glow Accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 size-96 linear-glow-blue pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 size-96 linear-glow-indigo pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full linear-pill text-xs font-semibold text-slate-600 dark:text-[#8a8f98]">
            <Sparkles className="size-3 text-blue-500 dark:text-blue-400" />
            <span>Built for High-Growth Teams & Candidates</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-[#f7f8f8] leading-tight">
            Engineered for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
              high-velocity hiring.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-[#8a8f98] font-normal max-w-xl mx-auto">
            Everything modern startups and job seekers need: automated resume vector matching, real-time messaging, and frictionless applications.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Bento Card 1: pgvector Semantic AI (Large - 8 Cols) */}
          <div className="lg:col-span-8 rounded-2xl linear-card linear-card-hover p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3 z-10 max-w-xl">
              <div className="flex items-center justify-between">
                <div className="size-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Brain className="size-5" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-radar-pulse" />
                  <span>cosine_distance: 0.042 (Match: 95.8%)</span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#f7f8f8]">
                pgvector Semantic Resume Matching
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8a8f98] leading-relaxed">
                Traditional ATS keyword searches miss 70% of qualified talent. HireFlow translates candidate resumes into high-dimensional vector embeddings, computing instant cosine similarity against your exact role criteria.
              </p>
            </div>

            {/* Interactive Vector Score Breakdown Widget */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-white/[0.06] z-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.04] space-y-1.5 transition-all group-hover:border-emerald-500/30">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-[#8a8f98]">
                  <span>CORE_SKILLS_VEC</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">1536-dim</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-[#f7f8f8]">TypeScript / Next.js</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">99.2%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700" style={{ width: '99.2%' }} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.04] space-y-1.5 transition-all group-hover:border-blue-500/30">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-[#8a8f98]">
                  <span>SYSTEM_ARCH_VEC</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">1536-dim</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-[#f7f8f8]">Distributed Systems</span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">96.8%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700" style={{ width: '96.8%' }} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.04] space-y-1.5 transition-all group-hover:border-indigo-500/30">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-[#8a8f98]">
                  <span>EXPERIENCE_VEC</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">1536-dim</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-[#f7f8f8]">4+ Years Scale</span>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">97.5%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700" style={{ width: '97.5%' }} />
                </div>
              </div>
            </div>

            {/* Background Decorative Gradient Wave */}
            <div className="absolute -right-20 -bottom-20 size-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-600/20 transition-all duration-500" />
          </div>

          {/* Bento Card 2: Real-time Socket.io Chat (4 Cols) */}
          <div className="lg:col-span-4 rounded-2xl linear-card linear-card-hover p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3 z-10">
              <div className="flex items-center justify-between">
                <div className="size-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <MessageSquare className="size-5" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-radar-pulse" />
                  <span>WS Connected • 24ms</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-[#f7f8f8]">
                Real-Time Messaging
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8a8f98] leading-relaxed">
                Sub-50ms WebSocket connections keep candidates and hiring managers synchronized without clunky email delays.
              </p>
            </div>

            {/* Live Chat Snippet Preview */}
            <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/[0.06] space-y-2.5 z-10">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] flex items-start gap-2.5">
                <div className="size-6 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center shrink-0">
                  AM
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[11px] font-bold text-slate-900 dark:text-[#f7f8f8]">Alex Morgan</p>
                    <span className="text-[9px] text-slate-400">10:42 AM</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-[#8a8f98]">Sarah, loved your open-source repo! Free for a 15m chat today?</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 dark:bg-blue-600/15 dark:border-blue-500/30 flex items-start gap-2.5 ml-3">
                <div className="size-6 rounded-full bg-emerald-600 text-[10px] font-bold text-white flex items-center justify-center shrink-0">
                  SJ
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[11px] font-bold text-blue-900 dark:text-blue-200">Sarah Jenkins</p>
                    <span className="text-[9px] text-blue-600/70 dark:text-blue-300/70">10:44 AM</span>
                  </div>
                  <p className="text-[10px] text-blue-700 dark:text-blue-100">Absolutely! 3:00 PM EST works perfectly for me.</p>
                </div>
              </div>

              {/* Live Typing Indicator */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100/70 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/[0.04] w-fit">
                <div className="flex items-center gap-1">
                  <span className="size-1 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
                  <span className="size-1 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
                  <span className="size-1 rounded-full bg-indigo-500 animate-bounce" />
                </div>
                <span className="text-[10px] font-medium text-slate-500 dark:text-[#8a8f98]">Alex is scheduling a calendar invite...</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: 1-Click Candidate Apply & Transparent Salary (6 Cols) */}
          <div className="lg:col-span-6 rounded-2xl linear-card linear-card-hover p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3 z-10">
              <div className="flex items-center justify-between">
                <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Zap className="size-5" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-radar-pulse" />
                  <span>Instant Match API</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-[#f7f8f8]">
                1-Click Apply & Salary Transparency
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8a8f98] leading-relaxed">
                No 10-page forms or repetitive account creations. Candidates parse their CV once and apply instantly to verified employers with upfront salary brackets.
              </p>
            </div>

            {/* Salary & Application Badge Row */}
            <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-3 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <DollarSign className="size-3.5" />
                <span>$140,000 – $185,000 / yr</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-[#8a8f98] font-medium">
                <CheckCircle2 className="size-3.5 text-emerald-500 dark:text-emerald-400" />
                <span>Direct-to-Hiring-Manager Inbox</span>
              </div>
            </div>
          </div>

          {/* Bento Card 4: Multi-Tenant Team Security & Isolation (6 Cols) */}
          <div className="lg:col-span-6 rounded-2xl linear-card linear-card-hover p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3 z-10">
              <div className="flex items-center justify-between">
                <div className="size-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <ShieldCheck className="size-5" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                  <span className="size-1.5 rounded-full bg-purple-500 animate-radar-pulse" />
                  <span>companyId Isolation Verified</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-[#f7f8f8]">
                Enterprise Multi-Tenant Isolation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8a8f98] leading-relaxed">
                Rigorous company-level multi-tenancy. Granular recruiter role permissions, BullMQ async email dispatchers, and end-to-end data encryption.
              </p>
            </div>

            {/* Team Badges Row */}
            <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between z-10">
              <div className="flex -space-x-2">
                {['JD', 'AM', 'ER', 'DK'].map((init, i) => (
                  <div 
                    key={init} 
                    className={`size-7 rounded-full border-2 border-white dark:border-[#0f1011] text-[10px] font-bold text-white flex items-center justify-center shadow-xs ${
                      i === 0 ? 'bg-blue-600' : i === 1 ? 'bg-indigo-600' : i === 2 ? 'bg-purple-600' : 'bg-emerald-600'
                    }`}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-[#8a8f98]">
                RBAC: Recruiter / Admin / Member
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
