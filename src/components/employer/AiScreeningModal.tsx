'use client';

import React, { useEffect, useState } from 'react';
import { 
  X, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  Loader2, 
  Clock, 
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import { apiClient } from '@/lib/api';

interface AiScreeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId: string;
  candidateName: string;
  jobTitle: string;
}

interface Question {
  id: number;
  question: string;
  category: string;
}

interface TranscriptEntry {
  speaker: 'AI' | 'CANDIDATE';
  text: string;
  timestamp: string;
}

interface RubricFeedback {
  strengths: string[];
  weaknesses: string[];
  summary: string;
  recommendation: 'STRONG_HIRE' | 'HIRE' | 'LEAN_HIRE' | 'REJECT';
}

interface AiSession {
  id: string;
  applicationId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  currentQuestionIndex: number;
  questions: Question[];
  transcript: TranscriptEntry[];
  overallScore?: number | null;
  technicalScore?: number | null;
  communicationScore?: number | null;
  problemSolvingScore?: number | null;
  rubricFeedback?: RubricFeedback | null;
}

export const AiScreeningModal: React.FC<AiScreeningModalProps> = ({
  isOpen,
  onClose,
  applicationId,
  candidateName,
  jobTitle,
}) => {
  const [session, setSession] = useState<AiSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showFullTranscript, setShowFullTranscript] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !applicationId) return;

    const fetchSession = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const res = await apiClient.get<{ session: AiSession | null }>(
          `/ai-interviews/application/${applicationId}`
        );
        setSession(res.data?.session || null);
      } catch (err: any) {
        console.error('Failed to fetch AI session for application:', err);
        setErrorMessage(err.message || 'Failed to load AI screening session.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [isOpen, applicationId]);

  if (!isOpen) return null;

  const handleStartSession = async () => {
    setIsStarting(true);
    setErrorMessage(null);
    try {
      const res = await apiClient.post<{ session: AiSession }>(
        '/ai-interviews/start',
        { applicationId }
      );
      if (res.data?.session) {
        setSession(res.data.session);
      }
    } catch (err: any) {
      console.error('Failed to initialize AI screening session:', err);
      setErrorMessage(err.message || 'Failed to initialize AI session.');
    } finally {
      setIsStarting(false);
    }
  };

  const chamberUrl = session
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/interviews/ai/${session.id}`
    : '';

  const handleCopyLink = () => {
    if (chamberUrl) {
      navigator.clipboard.writeText(chamberUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const getRecommendationBadge = (rec: string) => {
    switch (rec) {
      case 'STRONG_HIRE':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'HIRE':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'LEAN_HIRE':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'REJECT':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Autonomous AI Technical Screening
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Candidate: <span className="font-semibold text-slate-700 dark:text-slate-200">{candidateName}</span> &bull; {jobTitle}
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {errorMessage && (
            <div className="p-3 text-xs bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-xs font-semibold text-slate-500">Checking AI screening status...</p>
            </div>
          ) : !session ? (
            /* NO SESSION YET: Trigger Generation */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 mx-auto flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Initiate AI Screening Interview
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                  Google Gemini will synthesize the requirements of <strong>{jobTitle}</strong> and the candidate’s qualifications to generate 4 targeted technical & behavioral interview questions.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartSession}
                  disabled={isStarting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
                >
                  {isStarting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating AI Curriculum...
                    </>
                  ) : (
                    <>
                      <Bot className="w-4 h-4" />
                      Generate & Start AI Screening
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : session.status === 'IN_PROGRESS' ? (
            /* SESSION IN PROGRESS */
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Clock className="w-5 h-5 animate-spin" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-blue-900 dark:text-blue-200">
                      Interview In Progress
                    </h4>
                    <p className="text-[11px] text-blue-700 dark:text-blue-300">
                      Currently on Question {session.currentQuestionIndex + 1} of {session.questions.length}
                    </p>
                  </div>
                </div>

                <a
                  href={chamberUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open Chamber
                </a>
              </div>

              {/* Shareable Link Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Direct Candidate Interview Chamber Link
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={chamberUrl}
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl text-xs text-slate-600 dark:text-slate-300 font-mono select-all"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3.5 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    {copiedLink ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* SESSION COMPLETED: Scorecard View */
            <div className="space-y-6">
              
              {/* Scorecard Summary Pill */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-2xl text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Overall Match</span>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {session.overallScore ?? 80}%
                  </div>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-2xl text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Technical</span>
                  <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                    {session.technicalScore ?? 75}%
                  </div>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-2xl text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Problem Solving</span>
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {session.problemSolvingScore ?? 75}%
                  </div>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-2xl text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Recommendation</span>
                  <div className="mt-1">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border uppercase ${getRecommendationBadge(session.rubricFeedback?.recommendation || 'HIRE')}`}>
                      {session.rubricFeedback?.recommendation || 'HIRE'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              {session.rubricFeedback?.summary && (
                <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 border border-slate-200 dark:border-zinc-800 rounded-2xl">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    AI Evaluation Summary
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {session.rubricFeedback.summary}
                  </p>
                </div>
              )}

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl">
                  <h5 className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
                    Key Strengths
                  </h5>
                  <ul className="space-y-1.5">
                    {session.rubricFeedback?.strengths?.map((str, idx) => (
                      <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl">
                  <h5 className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-2">
                    Areas for Growth
                  </h5>
                  <ul className="space-y-1.5">
                    {session.rubricFeedback?.weaknesses?.map((weak, idx) => (
                      <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{weak}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Collapsible Transcript Accordion */}
              <div className="border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowFullTranscript(!showFullTranscript)}
                  className="w-full p-3.5 bg-slate-50 dark:bg-zinc-800/50 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    Interview Dialogue Transcript ({session.transcript?.length || 0} turns)
                  </span>
                  {showFullTranscript ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showFullTranscript && (
                  <div className="p-4 space-y-3 max-h-72 overflow-y-auto bg-white dark:bg-zinc-900 divide-y divide-slate-100 dark:divide-zinc-800">
                    {session.transcript?.map((turn, idx) => (
                      <div key={idx} className="pt-2 first:pt-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            turn.speaker === 'AI' 
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                          }`}>
                            {turn.speaker}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(turn.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                          {turn.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

