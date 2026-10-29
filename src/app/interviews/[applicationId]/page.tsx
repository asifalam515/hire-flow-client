'use client';

import React, { useEffect, useState } from 'react';
import '@livekit/components-styles';
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from '@livekit/components-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { apiClient } from '@/lib/api';
import {
  ArrowLeft,
  Loader2,
  FileText,
  Sparkles,
  Save,
  CheckCircle2,
  PanelRightClose,
  PanelRightOpen,
  Briefcase,
  User,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

export default function InterviewRoomPage({
  params,
}: {
  params: Promise<{ applicationId: string }>;
}) {
  const unwrappedParams = React.use(params);
  const applicationId = unwrappedParams.applicationId;
  const router = useRouter();
  const { user } = useAuthStore();

  const [token, setToken] = useState<string | null>(null);
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [roomData, setRoomData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Recruiter notes state
  const [notes, setNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [isNotesSaved, setIsNotesSaved] = useState(false);
  const [showNotesSidebar, setShowNotesSidebar] = useState(true);

  const isRecruiter = user?.role === 'RECRUITER' || user?.role === 'ADMIN';

  useEffect(() => {
    const fetchLiveKitToken = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.post<any>('/interviews/token', {
          applicationId,
        });

        if (response.data) {
          setToken(response.data.token);
          setServerUrl(response.data.serverUrl);
          setRoomData(response.data.room);
          if (response.data.room?.recruiterNotes) {
            setNotes(response.data.room.recruiterNotes);
          }
        }
      } catch (err: any) {
        console.error('Failed to get interview token:', err);
        setError(
          err.message ||
            'Unable to connect to the interview room. Please ensure you are authorized.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (applicationId && user) {
      fetchLiveKitToken();
    }
  }, [applicationId, user]);

  const handleSaveNotes = async () => {
    if (!roomData?.id) return;
    setIsSavingNotes(true);
    setIsNotesSaved(false);

    try {
      await apiClient.patch(`/interviews/${roomData.id}/notes`, {
        recruiterNotes: notes,
      });
      setIsNotesSaved(true);
      setTimeout(() => setIsNotesSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save notes:', err);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleLeave = () => {
    if (isRecruiter) {
      router.push('/employer/dashboard');
    } else {
      router.push('/candidates/applications');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white p-4">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <h2 className="text-xl font-bold">Connecting to Video Chamber...</h2>
        <p className="text-sm text-zinc-400 mt-2">
          Initializing LiveKit WebRTC encryption & audio/video tracks
        </p>
      </div>
    );
  }

  if (error || !token || !serverUrl) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white p-6">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Interview Room Access</h2>
          <p className="text-sm text-zinc-400">{error || 'Unable to join room.'}</p>
          <button
            onClick={handleLeave}
            className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const job = roomData?.application?.job;
  const candidate = roomData?.application?.candidate;
  const matchScore = roomData?.application?.matchScore;

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Top Session Navigation Bar */}
      <header className="h-14 border-b border-zinc-800 bg-zinc-900/90 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={handleLeave}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Leave Chamber"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{job?.title || 'Live Technical Interview'}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium">
                LiveKit HD
              </span>
            </h1>
            <p className="text-[11px] text-zinc-400">
              {job?.company?.name ? `${job.company.name} &bull; ` : ''}
              Application #{applicationId.slice(0, 8)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {matchScore !== null && matchScore !== undefined && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{matchScore}% ATS Fit</span>
            </div>
          )}

          {isRecruiter && (
            <button
              onClick={() => setShowNotesSidebar(!showNotesSidebar)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 transition-colors"
            >
              {showNotesSidebar ? (
                <>
                  <PanelRightClose className="w-4 h-4" />
                  <span className="hidden md:inline">Hide Notes</span>
                </>
              ) : (
                <>
                  <PanelRightOpen className="w-4 h-4" />
                  <span className="hidden md:inline">Show Notes</span>
                </>
              )}
            </button>
          )}
        </div>
      </header>

      {/* Main Video & In-Call Workspace */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* LiveKit Video Conference Chamber */}
        <main className="flex-1 h-full relative overflow-hidden bg-black">
          <LiveKitRoom
            token={token}
            serverUrl={serverUrl}
            connect={true}
            video={true}
            audio={true}
            data-lk-theme="default"
            onDisconnected={handleLeave}
            className="h-full w-full"
          >
            <VideoConference />
            <RoomAudioRenderer />
          </LiveKitRoom>
        </main>

        {/* Recruiter Private Notes Sidebar */}
        {isRecruiter && showNotesSidebar && (
          <aside className="w-80 lg:w-96 border-l border-zinc-800 bg-zinc-900 flex flex-col shrink-0 animate-in slide-in-from-right duration-200">
            {/* Candidate Summary Pill */}
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
                  {candidate?.user?.avatarUrl ? (
                    <img
                      src={candidate.user.avatarUrl}
                      alt="Candidate"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
                <div className="flex-1 truncate">
                  <h3 className="text-sm font-bold text-white truncate">
                    {candidate?.user?.firstName || 'Candidate'}{' '}
                    {candidate?.user?.lastName || ''}
                  </h3>
                  <p className="text-xs text-zinc-400 truncate">
                    {candidate?.user?.email}
                  </p>
                </div>
              </div>

              {candidate?.resumeUrl && (
                <a
                  href={candidate.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-blue-400 border border-zinc-700 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Open Candidate Resume PDF
                </a>
              )}
            </div>

            {/* Private Notes Editor */}
            <div className="p-4 flex-1 flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-300">
                  Private Recruiter Notes
                </label>
                {isNotesSaved && (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Saved
                  </span>
                )}
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take live interview notes (technical depth, system design, communication clarity, red flags)..."
                className="flex-1 w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono leading-relaxed"
              />
            </div>

            {/* Save Action */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500">
                Notes persist to database
              </span>
              <button
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50"
              >
                {isSavingNotes ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                Save Notes
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

