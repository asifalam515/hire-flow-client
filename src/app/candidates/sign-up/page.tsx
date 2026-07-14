'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { ArrowRight, UserPlus, Sparkles } from 'lucide-react';

export default function CandidateSignUpPlaceholder() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950 font-sans">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-md w-full text-center bg-white dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-xl shadow-blue-900/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />
          
          <div className="mx-auto size-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 border border-blue-100 dark:border-blue-900/50 shadow-inner">
            <UserPlus className="size-8" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 mb-3 border border-blue-200/50 dark:border-blue-800/40">
            <Sparkles className="size-3.5" />
            Candidate Portal
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-3">
            Candidate Sign Up
          </h1>

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            We are actively expanding the job seeker enrollment portal. For right now, you can explore our recruiter & employer onboarding experience.
          </p>

          <div className="flex flex-col gap-3">
            <Link href="/employer/sign-up">
              <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 h-auto shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 flex items-center justify-center gap-2">
                <span>Switch to Employer Sign Up</span>
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline" className="w-full rounded-xl border-border/80 font-semibold py-5 h-auto">
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
