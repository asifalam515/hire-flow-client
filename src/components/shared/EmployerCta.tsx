'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, Zap } from 'lucide-react';

export function EmployerCta() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 linear-canvas linear-grid border-t border-white/[0.06] transition-colors relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* Main High-Conversion Banner Card */}
        <div className="relative rounded-3xl linear-card p-8 sm:p-14 lg:p-16 overflow-hidden text-center max-w-5xl mx-auto shadow-[0_24px_64px_-16px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          
          {/* Centered Ambient Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/15 blur-3xl pointer-events-none -z-10" />

          <div className="max-w-2xl mx-auto space-y-6 z-10 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full linear-pill text-xs font-semibold text-[#8a8f98]">
              <Sparkles className="size-3 text-blue-400" />
              <span>Zero Setup Fees • Instant Deployment</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#f7f8f8] leading-tight text-balance">
              Ready to accelerate your hiring pipeline?
            </h2>

            <p className="text-sm sm:text-base text-[#8a8f98] font-normal leading-relaxed text-balance">
              Join modern engineering and talent leaders building world-class teams with AI vector matching, real-time candidate chat, and frictionless hiring.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <Link
                href="/employer/sign-up"
                className="w-full sm:w-auto h-11 px-7 rounded-xl bg-[#f7f8f8] text-[#08090a] hover:bg-white font-bold text-sm shadow-[0_0_24px_rgba(255,255,255,0.25),inset_0_1px_0_0_rgba(255,255,255,0.8)] hover:shadow-[0_0_32px_rgba(255,255,255,0.4)] transition-all duration-160 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="size-4 fill-current text-blue-600" />
                <span>Post a Job Free</span>
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/login"
                className="w-full sm:w-auto h-11 px-6 rounded-xl linear-card linear-card-hover font-semibold text-sm text-[#f7f8f8] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Try Demo Credentials</span>
              </Link>
            </div>

            {/* Micro Feature Bullets */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 text-xs text-[#8a8f98]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-blue-400" />
                Instant vector matching
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-indigo-400" />
                Live in 2 minutes
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
