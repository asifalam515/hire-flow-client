'use client';

import React from 'react';
import { X, Sparkles, CheckCircle2, AlertCircle, Award, BrainCircuit, Code, Clock } from 'lucide-react';
import { AtsBreakdown } from '@/store/useJobStore';

interface AtsMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  companyName: string;
  breakdown: AtsBreakdown | null;
  matchScore: number | null;
}

export const AtsMatchModal: React.FC<AtsMatchModalProps> = ({
  isOpen,
  onClose,
  jobTitle,
  companyName,
  breakdown,
  matchScore,
}) => {
  if (!isOpen) return null;

  const score = breakdown?.overallScore ?? matchScore ?? 0;

  const getScoreTheme = (val: number) => {
    if (val >= 75) return { color: 'text-emerald-500', bg: 'bg-emerald-500', lightBg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200 dark:border-emerald-800' };
    if (val >= 50) return { color: 'text-blue-500', bg: 'bg-blue-500', lightBg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-200 dark:border-blue-800' };
    return { color: 'text-amber-500', bg: 'bg-amber-500', lightBg: 'bg-amber-50 dark:bg-amber-950/30', border: 'border-amber-200 dark:border-amber-800' };
  };

  const theme = getScoreTheme(score);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                ATS Resume Match Intelligence
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                AI evaluation against <span className="font-semibold text-slate-700 dark:text-slate-200">{jobTitle}</span> at {companyName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Score Hero Card */}
          <div className={`p-6 rounded-2xl border ${theme.border} ${theme.lightBg} flex flex-col sm:flex-row items-center gap-6 justify-between`}>
            <div className="flex items-center gap-5">
              {/* Circular Gauge */}
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200 dark:text-zinc-700"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={theme.color}
                    strokeDasharray={`${score}, 100`}
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className={`text-xl font-black ${theme.color}`}>{score}%</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-700">
                  {breakdown?.recommendation?.replace('_', ' ') || 'OVERALL MATCH'}
                </span>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                  {breakdown?.summary || 'Your profile has been matched using semantic embeddings and direct tech stack comparison.'}
                </p>
              </div>
            </div>
          </div>

          {/* 3-Pillar Rubric Breakdown */}
          {breakdown && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  <BrainCircuit className="w-4 h-4 text-purple-500" />
                  Semantic Vector Fit
                </div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{breakdown.semanticScore}%</span>
                  <span className="text-[11px] text-slate-400">Weight 50%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${breakdown.semanticScore}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  <Code className="w-4 h-4 text-blue-500" />
                  Technical Skills
                </div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{breakdown.skillsScore}%</span>
                  <span className="text-[11px] text-slate-400">Weight 35%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${breakdown.skillsScore}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  Experience Fit
                </div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{breakdown.experienceScore}%</span>
                  <span className="text-[11px] text-slate-400">Weight 15%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${breakdown.experienceScore}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* Matched Skills */}
          {breakdown && breakdown.matchedSkills.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Matched Skills ({breakdown.matchedSkills.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {breakdown.matchedSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Missing Keywords / Skills Gap Analysis */}
          {breakdown && breakdown.missingSkills.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  Target Keywords Missing from Your Profile ({breakdown.missingSkills.length})
                </h3>
                <span className="text-xs text-amber-600 dark:text-amber-400">Add to CV before applying</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                The recruiter&apos;s ATS looks for these specific skills in candidate applications. If you have experience with any of these, add them to your profile to increase your ranking:
              </p>
              <div className="flex flex-wrap gap-2">
                {breakdown.missingSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Powered by HireFlow AI & pgvector semantic matching
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

