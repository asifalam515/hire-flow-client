'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User as UserIcon, 
  Edit3, 
  Plus, 
  Briefcase,
  GraduationCap,
  Globe,
  Award,
  Trash2,
  Loader2,
  Check,
  Wand2,
  FileText,
  ChevronRight,
  Sparkles,
  Download
} from 'lucide-react';
import * as candidateService from '@/services/candidate.service';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';

export default function CvBuilderPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await candidateService.getResume();
      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch profile', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAiResume = async () => {
    try {
      setIsGeneratingAi(true);
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8050/api/v1'}/candidates/me/resume/generate-ai`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('AI Generation failed');
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai_resume_${profile?.user.firstName || 'candidate'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate AI Resume', error);
      alert('Failed to generate AI Resume. Please try again later.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const resumeQuality = useMemo(() => {
    if (!profile) return { score: 0, actionableItems: [] };

    const rules = [
      { key: 'personal', label: 'Complete personal information', weight: 15, isComplete: !!profile.mobileNumber && !!profile.city },
      { key: 'aboutMe', label: 'Add a summary about yourself', weight: 15, isComplete: !!profile.aboutMe && profile.aboutMe.length > 10 },
      { key: 'experience', label: 'Add your work experience', weight: 30, isComplete: profile.workExperiences?.length > 0 },
      { key: 'education', label: 'Add your education details', weight: 20, isComplete: profile.educations?.length > 0 },
      { key: 'skills', label: 'Add at least 3 skills', weight: 20, isComplete: profile.skills?.length >= 3 },
    ];

    let score = 0;
    const actionableItems: { label: string; weight: number; isComplete: boolean }[] = [];

    rules.forEach(rule => {
      if (rule.isComplete) {
        score += rule.weight;
      }
      actionableItems.push({ label: rule.label, weight: rule.weight, isComplete: rule.isComplete });
    });

    return { score, actionableItems };
  }, [profile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <Sparkles className="absolute text-blue-600 size-6 animate-pulse" />
        </div>
      </div>
    );
  }

  // Not logged in view
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-4 overflow-hidden relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white dark:from-blue-950/20 dark:via-zinc-950 dark:to-zinc-950"></div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          
          <div className="text-center max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-700 py-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm border border-blue-100 dark:border-blue-800">
              <Sparkles className="size-4" />
              <span>AI-Powered Resume Builder</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Create a winning CV in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">seconds</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Let our advanced AI analyze your profile and generate a professional, ATS-friendly resume tailored to land you your dream job.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/login">
                <Button size="lg" className="h-14 px-8 text-lg rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 transition-all hover:scale-105">
                  Login to Start
                </Button>
              </Link>
              <Link href="/candidates/sign-up">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-2xl border-2 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Logged in builder view
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950">
      <Navbar />
      <div className="flex-1 pb-20">
        {/* Premium Header */}
      <div className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Wand2 className="size-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-none mb-1">AI CV Builder</h1>
              <p className="text-xs font-semibold text-slate-500">Transform your profile into a professional resume</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 mr-4">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Profile Strength</p>
                <div className="w-32 h-2 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${resumeQuality.score === 100 ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-blue-400 to-blue-600'}`}
                    style={{ width: `${resumeQuality.score}%` }}
                  />
                </div>
              </div>
              <span className={`text-lg font-black ${resumeQuality.score === 100 ? 'text-emerald-600' : 'text-blue-600'}`}>
                {resumeQuality.score}%
              </span>
            </div>
            
            <button 
              onClick={handleGenerateAiResume} 
              disabled={isGeneratingAi || resumeQuality.score < 50} 
              className={`h-12 px-6 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg ${
                resumeQuality.score < 50 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5'
              }`}
            >
              {isGeneratingAi ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Sparkles className="size-5" />
              )}
              <span>{isGeneratingAi ? 'Generating...' : 'Generate AI Resume'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Checklist & Actions */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Actionable Checklist */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Resume Checklist</h2>
              <p className="text-sm text-slate-500 mb-6">Complete these sections to generate a better AI resume.</p>
              
              <div className="space-y-4">
                {resumeQuality.actionableItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-0.5 shrink-0 size-5 rounded-full flex items-center justify-center border ${item.isComplete ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-slate-50 border-slate-200 text-transparent dark:bg-zinc-800 dark:border-zinc-700'}`}>
                      <Check className="size-3" strokeWidth={3} />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${item.isComplete ? 'text-slate-900 dark:text-white line-through opacity-70' : 'text-slate-700 dark:text-slate-200'}`}>
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {resumeQuality.score < 100 && (
                <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl">
                  <p className="text-xs font-semibold text-amber-800 dark:text-amber-400 leading-relaxed">
                    💡 Tip: The AI generates the best results when your profile is 100% complete. Add more details to get a richer resume!
                  </p>
                </div>
              )}
            </div>

            {/* Quick Navigation to Profile Edit */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-3xl p-6 border border-blue-100 dark:border-blue-900/30">
              <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm flex items-center justify-center mb-4">
                <Edit3 className="size-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Need to update info?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Your AI resume is built using your candidate profile. To change the content, update your profile details.
              </p>
              <Link href="/candidates/dashboard/resume">
                <Button className="w-full bg-white dark:bg-zinc-900 hover:bg-blue-50 text-blue-600 border border-blue-200 dark:border-blue-800 shadow-sm rounded-xl h-12 font-bold">
                  Edit Profile Details
                </Button>
              </Link>
            </div>

          </div>

          {/* Right Column - Preview & Generation */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col h-full min-h-[600px]">
              
              <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <FileText className="size-5" />
                  <span className="font-bold text-sm">Resume Preview Data</span>
                </div>
                <div className="flex gap-2">
                   {profile?.resumeUrl && (
                     <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                       <Download className="size-3.5" /> Existing CV
                     </a>
                   )}
                </div>
              </div>

              <div className="p-8 flex-1 overflow-y-auto bg-slate-100/50 dark:bg-zinc-950/50">
                {/* Visual Representation of the Data that will be sent to AI */}
                <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 shadow-md border border-slate-200 dark:border-zinc-800 p-8 sm:p-12 space-y-8 origin-top">
                  
                  {/* Header */}
                  <div className="text-center space-y-2 border-b border-slate-200 dark:border-zinc-800 pb-8">
                    <h1 className="text-3xl font-serif text-slate-900 dark:text-white uppercase tracking-wider">
                      {profile?.user.firstName} {profile?.user.lastName}
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">
                      {[profile?.user.email, profile?.mobileNumber, profile?.city].filter(Boolean).join(' • ')}
                    </p>
                  </div>

                  {/* Summary */}
                  {profile?.aboutMe && (
                    <div className="space-y-3">
                      <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800 pb-2">Professional Summary</h2>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                        {profile.aboutMe}
                      </p>
                    </div>
                  )}

                  {/* Experience */}
                  {profile?.workExperiences && profile.workExperiences.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800 pb-2">Experience</h2>
                      <div className="space-y-6">
                        {profile.workExperiences.map((we: any) => (
                          <div key={we.id}>
                            <div className="flex justify-between items-baseline mb-1">
                              <h3 className="font-bold text-slate-900 dark:text-white">{we.title}</h3>
                              <span className="text-xs font-semibold text-slate-500">
                                {new Date(we.startDate).getFullYear()} – {we.isCurrent ? 'Present' : new Date(we.endDate).getFullYear()}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{we.company}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {profile?.educations && profile.educations.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800 pb-2">Education</h2>
                      <div className="space-y-4">
                        {profile.educations.map((ed: any) => (
                          <div key={ed.id}>
                            <div className="flex justify-between items-baseline mb-1">
                              <h3 className="font-bold text-slate-900 dark:text-white">{ed.degree} {ed.fieldOfStudy && `in ${ed.fieldOfStudy}`}</h3>
                              <span className="text-xs font-semibold text-slate-500">
                                {new Date(ed.startDate).getFullYear()} – {ed.isCurrent ? 'Present' : new Date(ed.endDate).getFullYear()}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{ed.institution}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {profile?.skills && profile.skills.length > 0 && (
                    <div className="space-y-3">
                      <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest border-b border-slate-100 dark:border-zinc-800 pb-2">Skills</h2>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {profile.skills.join(', ')}
                      </p>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
