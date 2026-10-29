'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  User, 
  Building2, 
  MessageSquare, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { apiClient } from '@/lib/api';
import Link from 'next/link';

interface ColdMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogoUrl?: string | null;
  matchScore?: number | null;
}

export const ColdMessageModal: React.FC<ColdMessageModalProps> = ({
  isOpen,
  onClose,
  jobId,
  jobTitle,
  companyName,
  companyLogoUrl,
  matchScore,
}) => {
  const [pitchText, setPitchText] = useState('');
  const [targetRecruiter, setTargetRecruiter] = useState<any>(null);
  const [highlightedSkills, setHighlightedSkills] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSentSuccess, setIsSentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !jobId) return;

    setIsSentSuccess(false);
    setErrorMessage(null);

    // Auto-draft initial AI pitch on modal open
    const draftInitialPitch = async () => {
      setIsGenerating(true);
      try {
        const res = await apiClient.post<{
          pitch: string;
          subject: string;
          highlightedSkills: string[];
          targetRecruiter: any;
          matchScore?: number;
        }>('/messages/ai-pitch', { jobId });

        if (res.data) {
          setPitchText(res.data.pitch || '');
          setTargetRecruiter(res.data.targetRecruiter || null);
          setHighlightedSkills(res.data.highlightedSkills || []);
        }
      } catch (err: any) {
        console.error('Failed to generate AI pitch:', err);
        setErrorMessage(err.message || 'Failed to auto-generate pitch.');
      } finally {
        setIsGenerating(false);
      }
    };

    draftInitialPitch();
  }, [isOpen, jobId]);

  if (!isOpen) return null;

  const handleRegeneratePitch = async () => {
    setIsGenerating(true);
    setErrorMessage(null);
    try {
      const res = await apiClient.post<{
        pitch: string;
        highlightedSkills: string[];
        targetRecruiter: any;
      }>('/messages/ai-pitch', { jobId });

      if (res.data?.pitch) {
        setPitchText(res.data.pitch);
        if (res.data.highlightedSkills) setHighlightedSkills(res.data.highlightedSkills);
      }
    } catch (err: any) {
      console.error('Regenerate pitch error:', err);
      setErrorMessage(err.message || 'Failed to regenerate pitch.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendMessage = async () => {
    if (!pitchText.trim() || !targetRecruiter?.id) return;
    setIsSending(true);
    setErrorMessage(null);

    try {
      // 1. Start or find conversation
      const convRes = await apiClient.post<{ id: string }>('/messages/conversations', {
        targetUserId: targetRecruiter.id,
      });

      const conversationId = convRes.data?.id;
      if (!conversationId) throw new Error('Failed to initiate conversation');

      // 2. Send pitch message
      await apiClient.post(`/messages/conversations/${conversationId}/messages`, {
        content: pitchText.trim(),
      });

      setIsSentSuccess(true);
    } catch (err: any) {
      console.error('Failed to send cold message:', err);
      setErrorMessage(err.message || 'Failed to send message.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Cold Message Hiring Manager
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {jobTitle} &bull; <span className="font-semibold text-slate-700 dark:text-slate-300">{companyName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {errorMessage && (
            <div className="p-3 text-xs bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isSentSuccess ? (
            /* Success State */
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Message Delivered!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                  Your pitch has been placed directly into the hiring manager’s inbox with your ATS compatibility fit highlighted.
                </p>
              </div>

              <div className="pt-3 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-200 dark:border-zinc-700 text-xs font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Done
                </button>
                <Link
                  href="/candidates/dashboard/messages"
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-blue-600/20"
                >
                  Go to Messages
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            /* Form / AI Drafting State */
            <>
              {/* Recruiter & Job Context Banner */}
              <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/40 border border-slate-200 dark:border-zinc-800 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 dark:bg-zinc-700 flex items-center justify-center shrink-0">
                    {targetRecruiter?.avatarUrl ? (
                      <img src={targetRecruiter.avatarUrl} alt="Recruiter" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {targetRecruiter?.firstName ? `${targetRecruiter.firstName} ${targetRecruiter.lastName || ''}` : 'Hiring Lead'}
                    </h4>
                    <p className="text-[11px] text-slate-500">Talent Partner &bull; {companyName}</p>
                  </div>
                </div>

                {matchScore !== undefined && matchScore !== null && (
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {matchScore}% ATS Fit
                  </span>
                )}
              </div>

              {/* Textarea & Regenerate Button */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    Your Personalized Pitch
                    {isGenerating && <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />}
                  </label>

                  <button
                    type="button"
                    onClick={handleRegeneratePitch}
                    disabled={isGenerating}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50"
                  >
                    <Sparkles className="w-3 h-3" />
                    ✨ Re-draft with Gemini
                  </button>
                </div>

                <textarea
                  rows={8}
                  value={pitchText}
                  onChange={(e) => setPitchText(e.target.value)}
                  placeholder={isGenerating ? "Gemini is crafting a tailored 3-paragraph pitch..." : "Write or edit your introductory pitch..."}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed resize-none font-sans"
                />
              </div>

              {/* Highlighted Skills Chips */}
              {highlightedSkills.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-slate-400">Referenced Skills:</span>
                  {highlightedSkills.map((sk) => (
                    <span key={sk} className="text-[10px] bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-900 px-2 py-0.5 rounded-md font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        {!isSentSuccess && (
          <div className="p-4 border-t border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex items-center justify-between shrink-0">
            <span className="text-[11px] text-slate-400">
              Direct delivery with real-time push alert
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={isSending || isGenerating || !pitchText.trim()}
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 disabled:opacity-50 active:scale-95"
              >
                {isSending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                Send Cold Pitch
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

