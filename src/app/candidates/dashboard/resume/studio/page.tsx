'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowLeft, 
  Download, 
  Save, 
  Check, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  MapPin, 
  Phone, 
  Globe, 
  Loader2, 
  Layers, 
  Eye, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { apiClient } from '@/lib/api';
import * as candidateService from '@/services/candidate.service';

interface TailoredExperience {
  id?: string;
  company: string;
  title: string;
  startDate?: string;
  endDate?: string | null;
  bulletPoints: string[];
}

interface TailoredCvData {
  headline: string;
  professionalSummary: string;
  tailoredExperiences: TailoredExperience[];
  recommendedSkills: string[];
  suggestedKeywords: string[];
}

export default function AiCvStudioPage() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  // Target inputs
  const [targetJobTitle, setTargetJobTitle] = useState('');
  const [targetJobDescription, setTargetJobDescription] = useState('');

  // AI Tailored State (Editor State)
  const [cvData, setCvData] = useState<TailoredCvData>({
    headline: '',
    professionalSummary: '',
    tailoredExperiences: [],
    recommendedSkills: [],
    suggestedKeywords: [],
  });

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Fetch initial profile
  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setIsLoadingProfile(true);
        const data = await candidateService.getResume();
        setProfile(data);

        // Pre-fill target job title if preferred title exists
        const defaultTitle = data?.preferredJobTitle || 'Full Stack Software Engineer';
        setTargetJobTitle(defaultTitle);

        // Map initial experiences from profile
        const initialExperiences: TailoredExperience[] = (data?.workExperiences || []).map((we: any) => {
          const rawLines = we.description
            ? we.description.split('\n').map((l: string) => l.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean)
            : [];
          return {
            id: we.id,
            company: we.company,
            title: we.title,
            startDate: we.startDate,
            endDate: we.endDate,
            bulletPoints: rawLines.length > 0 ? rawLines : [
              `Engineered and maintained core application architecture using modern software principles.`,
              `Partnered cross-functionally with product and engineering teams to deliver features on schedule.`
            ],
          };
        });

        setCvData({
          headline: `${defaultTitle} | Specialized Engineer`,
          professionalSummary: data?.aboutMe || 'Results-driven software engineer experienced in building resilient web applications.',
          tailoredExperiences: initialExperiences,
          recommendedSkills: data?.skills || ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
          suggestedKeywords: ['System Design', 'CI/CD Pipelines', 'Performance Optimization', 'Cloud Architecture'],
        });
      } catch (err) {
        console.error('Failed to load profile for AI CV Studio:', err);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchCandidate();
  }, []);

  // Trigger Gemini AI CV Tailoring
  const handleOptimizeWithAi = async () => {
    if (!targetJobTitle.trim()) return;
    setIsOptimizing(true);
    setSyncSuccess(false);

    try {
      const res = await apiClient.post<{
        headline: string;
        professionalSummary: string;
        tailoredExperiences: Array<{
          id: string;
          company: string;
          title: string;
          bulletPoints: string[];
        }>;
        recommendedSkills: string[];
        suggestedKeywords: string[];
      }>('/candidates/me/cv/tailor-ai', {
        targetJobTitle: targetJobTitle.trim(),
        targetJobDescription: targetJobDescription.trim() || undefined,
        syncToProfile: false,
      });

      if (res.data) {
        // Merge with existing dates
        const mergedExperiences: TailoredExperience[] = (res.data.tailoredExperiences || []).map((exp, idx) => {
          const orig = profile?.workExperiences?.[idx];
          return {
            id: exp.id || orig?.id,
            company: exp.company || orig?.company || 'Technology Company',
            title: exp.title || orig?.title || targetJobTitle,
            startDate: orig?.startDate,
            endDate: orig?.endDate,
            bulletPoints: exp.bulletPoints || [],
          };
        });

        setCvData({
          headline: res.data.headline || `${targetJobTitle} Specialist`,
          professionalSummary: res.data.professionalSummary || cvData.professionalSummary,
          tailoredExperiences: mergedExperiences.length > 0 ? mergedExperiences : cvData.tailoredExperiences,
          recommendedSkills: res.data.recommendedSkills || cvData.recommendedSkills,
          suggestedKeywords: res.data.suggestedKeywords || cvData.suggestedKeywords,
        });
      }
    } catch (err: any) {
      console.error('Failed to tailor CV:', err);
      alert(err.message || 'Failed to tailor CV with AI. Please try again.');
    } finally {
      setIsOptimizing(false);
    }
  };

  // Sync back to Candidate Profile & Neon pgvector
  const handleSyncToProfile = async () => {
    setIsSyncing(true);
    setSyncSuccess(false);

    try {
      // 1. Update candidate profile aboutMe and skills
      await candidateService.updateProfile({
        aboutMe: cvData.professionalSummary,
        skills: cvData.recommendedSkills,
        preferredJobTitle: targetJobTitle,
      });

      // 2. Call backend tailor-ai with syncToProfile: true to recalculate pgvector embedding
      await apiClient.post('/candidates/me/cv/tailor-ai', {
        targetJobTitle,
        targetJobDescription: targetJobDescription || undefined,
        syncToProfile: true,
      });

      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    } catch (err: any) {
      console.error('Failed to sync profile & vector embedding:', err);
      alert(err.message || 'Failed to sync to profile.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8050/api/v1'}/candidates/me/resume/download`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Tailored_CV_${profile?.user?.firstName || 'Candidate'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download CV PDF:', err);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Experience Bullet editing helpers
  const handleBulletChange = (expIdx: number, bulletIdx: number, val: string) => {
    const updated = [...cvData.tailoredExperiences];
    if (updated[expIdx] && updated[expIdx].bulletPoints) {
      updated[expIdx].bulletPoints[bulletIdx] = val;
      setCvData({ ...cvData, tailoredExperiences: updated });
    }
  };

  const handleAddBullet = (expIdx: number) => {
    const updated = [...cvData.tailoredExperiences];
    if (updated[expIdx]) {
      updated[expIdx].bulletPoints.push(
        'Accomplished [Outcome] by designing [Feature/Architecture], resulting in [Measurable Improvement].'
      );
      setCvData({ ...cvData, tailoredExperiences: updated });
    }
  };

  const handleRemoveBullet = (expIdx: number, bulletIdx: number) => {
    const updated = [...cvData.tailoredExperiences];
    if (updated[expIdx]) {
      updated[expIdx].bulletPoints = updated[expIdx].bulletPoints.filter((_, i) => i !== bulletIdx);
      setCvData({ ...cvData, tailoredExperiences: updated });
    }
  };

  // Skill editing helpers
  const handleRemoveSkill = (skillToRemove: string) => {
    setCvData({
      ...cvData,
      recommendedSkills: cvData.recommendedSkills.filter((s) => s !== skillToRemove),
    });
  };

  const handleAddSkill = (skill: string) => {
    const clean = skill.trim();
    if (!clean || cvData.recommendedSkills.includes(clean)) return;
    setCvData({
      ...cvData,
      recommendedSkills: [...cvData.recommendedSkills, clean],
      suggestedKeywords: cvData.suggestedKeywords.filter((k) => k.toLowerCase() !== clean.toLowerCase()),
    });
  };

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-9 h-9 text-blue-500 animate-spin mb-3" />
        <p className="text-xs font-semibold text-slate-400">Loading AI CV Studio...</p>
      </div>
    );
  }

  const user = profile?.user || {};

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Bar */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/candidates/dashboard/resume"
            className="p-2 border border-slate-800 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white flex items-center gap-2">
                AeroATS AI CV Studio
                <span className="text-[10px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-semibold uppercase">
                  Google XYZ Formula
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncToProfile}
            disabled={isSyncing}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              syncSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {isSyncing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : syncSuccess ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {syncSuccess ? 'Synced to Vector DB!' : 'Sync to Profile & ATS'}
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 disabled:opacity-50"
          >
            {isDownloading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            Download PDF
          </button>
        </div>
      </header>

      {/* Target Role Configuration Banner */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Target Job Role
              </label>
              <input
                type="text"
                value={targetJobTitle}
                onChange={(e) => setTargetJobTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer, Cloud Solutions Architect..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Target Requirements / Description (Optional)
              </label>
              <input
                type="text"
                value={targetJobDescription}
                onChange={(e) => setTargetJobDescription(e.target.value)}
                placeholder="Paste key skills or requirements from a job post..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="shrink-0 self-end">
            <button
              onClick={handleOptimizeWithAi}
              disabled={isOptimizing || !targetJobTitle.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50"
            >
              {isOptimizing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gemini Optimizing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  ✨ Optimize with Gemini
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Split-Pane Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        
        {/* LEFT PANE: Interactive Editor */}
        <div className="lg:col-span-6 border-r border-slate-800 p-6 overflow-y-auto space-y-6 max-h-[calc(100vh-8.5rem)]">
          
          <div>
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Professional Headline
            </h2>
            <input
              type="text"
              value={cvData.headline}
              onChange={(e) => setCvData({ ...cvData, headline: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              Executive Summary
            </h2>
            <textarea
              rows={4}
              value={cvData.professionalSummary}
              onChange={(e) => setCvData({ ...cvData, professionalSummary: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-sans"
            />
          </div>

          {/* Work Experiences with Google XYZ Bullets */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Work Experience (Google XYZ Formula)
              </h2>
              <span className="text-[10px] text-slate-400">Accomplished [X] as measured by [Y], by doing [Z]</span>
            </div>

            {cvData.tailoredExperiences.map((exp, expIdx) => (
              <div key={expIdx} className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div>
                    <h3 className="font-bold text-xs text-white">{exp.title}</h3>
                    <p className="text-[11px] text-slate-400">{exp.company}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {exp.startDate ? new Date(exp.startDate).getFullYear() : '2023'} –{' '}
                    {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                  </span>
                </div>

                {/* Bullets */}
                <div className="space-y-2">
                  {exp.bulletPoints.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2">
                      <span className="text-blue-500 text-xs mt-2">&bull;</span>
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => handleBulletChange(expIdx, bIdx, e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(expIdx, bIdx)}
                        className="p-1.5 text-slate-500 hover:text-red-400 transition-colors mt-1"
                        title="Remove bullet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => handleAddBullet(expIdx)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-blue-300 pt-1"
                  >
                    <Plus className="w-3 h-3" />
                    Add XYZ Bullet
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Skills & Suggested Keywords */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Target Skills Alignment
            </h2>

            {/* Current Active Skills */}
            <div className="flex flex-wrap gap-1.5">
              {cvData.recommendedSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-950/60 border border-blue-800 text-blue-300 rounded-lg text-xs font-semibold"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-blue-400 hover:text-white"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            {/* Add Skill Input */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(newSkillInput);
                    setNewSkillInput('');
                  }
                }}
                placeholder="Add custom skill and press Enter..."
                className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => {
                  handleAddSkill(newSkillInput);
                  setNewSkillInput('');
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
              >
                Add
              </button>
            </div>

            {/* Gemini Keyword Suggestions */}
            {cvData.suggestedKeywords.length > 0 && (
              <div className="pt-2">
                <p className="text-[11px] font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  Gemini Suggested ATS Keywords:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cvData.suggestedKeywords.map((keyword) => (
                    <button
                      key={keyword}
                      type="button"
                      onClick={() => handleAddSkill(keyword)}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-950/40 text-purple-300 border border-purple-800/60 hover:bg-purple-900/60 transition-colors"
                    >
                      + {keyword}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT PANE: Real-time Formatted CV Paper Preview */}
        <div className="lg:col-span-6 bg-slate-900/40 p-6 overflow-y-auto max-h-[calc(100vh-8.5rem)] flex justify-center">
          
          <div className="w-full max-w-[595px] min-h-[842px] bg-white text-slate-900 p-8 rounded-2xl shadow-2xl flex flex-col font-sans text-xs leading-normal">
            
            {/* CV Header */}
            <div className="border-b border-slate-200 pb-4 mb-4">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {user.firstName || 'Sarah'} {user.lastName || 'Jenkins'}
              </h1>
              <p className="text-xs font-bold text-blue-700 mt-0.5 tracking-wide">
                {cvData.headline || targetJobTitle}
              </p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-slate-600 mt-2">
                {user.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    {user.email}
                  </span>
                )}
                {profile?.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {profile.city}
                  </span>
                )}
                {profile?.mobileNumber && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {profile.mobileNumber}
                  </span>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="mb-4">
              <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-1.5">
                Professional Summary
              </h2>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                {cvData.professionalSummary}
              </p>
            </div>

            {/* Work Experiences */}
            <div className="mb-4 space-y-3">
              <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-1.5">
                Professional Experience
              </h2>

              {cvData.tailoredExperiences.map((exp, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-baseline justify-between font-bold text-[11px]">
                    <span className="text-slate-900">{exp.title}</span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {exp.startDate ? new Date(exp.startDate).getFullYear() : '2023'} –{' '}
                      {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                    </span>
                  </div>
                  <p className="text-[10px] font-semibold text-blue-700">{exp.company}</p>
                  
                  <ul className="list-disc pl-4 space-y-1 text-[10.5px] text-slate-700">
                    {exp.bulletPoints.map((b, bIdx) => (
                      <li key={bIdx} className="leading-snug">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}
            {profile?.educations && profile.educations.length > 0 && (
              <div className="mb-4">
                <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-1.5">
                  Education
                </h2>
                {profile.educations.map((edu: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-baseline mb-1">
                    <div>
                      <span className="font-bold text-[11px] text-slate-900">{edu.degree}</span>
                      {edu.fieldOfStudy && <span className="text-[10px] text-slate-600"> in {edu.fieldOfStudy}</span>}
                      <p className="text-[10px] text-slate-500">{edu.institution}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {edu.startDate ? new Date(edu.startDate).getFullYear() : ''}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            <div className="mt-auto pt-3 border-t border-slate-200">
              <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900 mb-1.5">
                Core Competencies & Technologies
              </h2>
              <p className="text-[10.5px] text-slate-700 leading-relaxed font-mono">
                {cvData.recommendedSkills.join(' • ')}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
