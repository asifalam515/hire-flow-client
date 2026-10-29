'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Bot, 
  User, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight, 
  FileText, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { AudioWaveform } from '@/components/interview/AudioWaveform';

interface Question {
  id: number;
  question: string;
  category: string;
  keyPoints?: string[];
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
  application: {
    id: string;
    job: {
      id: string;
      title: string;
      company: {
        name: string;
        logoUrl: string | null;
      };
    };
    candidate: {
      user: {
        firstName: string | null;
        lastName: string | null;
      };
    };
  };
}

export default function AiInterviewChamberPage() {
  const params = useParams();
  const sessionId = params?.sessionId as string;
  const router = useRouter();

  // Session state
  const [session, setSession] = useState<AiSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoVoiceEnabled, setAutoVoiceEnabled] = useState(true);

  // Candidate camera & mic
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(true);
  const [micPermission, setMicPermission] = useState(true);
  const streamRef = useRef<MediaStream | null>(null);

  // Candidate input
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Speech Hooks
  const { speak, cancel: cancelSpeech, isSpeaking } = useSpeechSynthesis();
  const { 
    isListening, 
    startListening, 
    stopListening, 
    transcript: speechText, 
    resetTranscript 
  } = useSpeechRecognition();

  // Sync speech recognition into input field
  useEffect(() => {
    if (speechText) {
      setCandidateAnswer((prev) => {
        // If candidate already typed something, append cleanly
        if (!prev) return speechText;
        if (prev.endsWith(speechText)) return prev;
        return `${prev.trim()} ${speechText}`.trim();
      });
      resetTranscript();
    }
  }, [speechText, resetTranscript]);

  // Session elapsed timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize camera preview
  useEffect(() => {
    let localStream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        streamRef.current = localStream;
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
        }
      } catch (err) {
        console.warn('Camera / Mic permission denied or unavailable:', err);
        setCameraActive(false);
        setMicPermission(false);
      }
    };

    startCamera();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Fetch Session data
  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);
      try {
        const res = await apiClient.get<{ session: AiSession }>(`/ai-interviews/${sessionId}`);
        if (res.data?.session) {
          setSession(res.data.session);

          // If session is active and has questions, voice the current question
          const currentQ = res.data.session.questions[res.data.session.currentQuestionIndex];
          if (autoVoiceEnabled && currentQ && res.data.session.status === 'IN_PROGRESS') {
            speak(currentQ.question);
          }
        }
      } catch (err: any) {
        console.error('Failed to fetch AI session:', err);
        setError(err.message || 'Failed to load interview session.');
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId, autoVoiceEnabled, speak]);

  const toggleCamera = () => {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
      setCameraActive(!cameraActive);
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleReplayQuestion = () => {
    if (!session) return;
    const currentQ = session.questions[session.currentQuestionIndex];
    if (currentQ) {
      speak(currentQ.question);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!candidateAnswer.trim() || !session) return;
    setIsSubmitting(true);
    cancelSpeech();
    if (isListening) stopListening();

    try {
      const res = await apiClient.post<{
        session: AiSession;
        isCompleted: boolean;
        nextQuestion: Question | null;
        transcript: TranscriptEntry[];
      }>(`/ai-interviews/${sessionId}/answer`, {
        answer: candidateAnswer.trim(),
      });

      if (res.data) {
        setSession(res.data.session);
        setCandidateAnswer('');

        if (!res.data.isCompleted && res.data.nextQuestion && autoVoiceEnabled) {
          speak(res.data.nextQuestion.question);
        }
      }
    } catch (err: any) {
      console.error('Failed to submit answer:', err);
      alert(err.message || 'Failed to submit response. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-sm font-semibold tracking-wide text-slate-300">
          Entering Autonomous AI Interview Chamber...
        </p>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Interview Session Error</h2>
        <p className="text-sm text-slate-400 max-w-md mb-6">{error || 'Session could not be located.'}</p>
        <button
          onClick={() => router.push('/candidates/applications')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 font-bold text-xs rounded-xl transition-colors"
        >
          Return to Applications
        </button>
      </div>
    );
  }

  const questions = session.questions || [];
  const currentIndex = session.currentQuestionIndex;
  const currentQ = questions[currentIndex];
  const progressPercent = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  // ---------------------------------------------------------------------------
  // COMPLETED SCORECARD STATE
  // ---------------------------------------------------------------------------
  if (session.status === 'COMPLETED') {
    const rubric = session.rubricFeedback;
    const overall = session.overallScore ?? 80;

    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="max-w-3xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-10 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
              <CheckCircle2 className="w-4 h-4" />
              Interview Completed
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
              AI Evaluation Scorecard
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              Autonomous Technical Screening for{' '}
              <span className="text-blue-400 font-semibold">{session.application.job.title}</span> at{' '}
              <span className="text-slate-200 font-semibold">{session.application.job.company.name}</span>
            </p>
          </div>

          {/* Top Score Banner */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 text-center flex flex-col items-center justify-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Match</span>
              <span className={`text-4xl font-extrabold mt-1 ${overall >= 80 ? 'text-emerald-400' : overall >= 60 ? 'text-blue-400' : 'text-amber-400'}`}>
                {overall}%
              </span>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 text-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Technical Depth</span>
              <span className="text-3xl font-extrabold text-blue-400 block mt-1">
                {session.technicalScore ?? 75}%
              </span>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 text-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Problem Solving</span>
              <span className="text-3xl font-extrabold text-indigo-400 block mt-1">
                {session.problemSolvingScore ?? 75}%
              </span>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 text-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Communication</span>
              <span className="text-3xl font-extrabold text-teal-400 block mt-1">
                {session.communicationScore ?? 75}%
              </span>
            </div>
          </div>

          {/* Rubric Details */}
          {rubric && (
            <div className="space-y-6 mb-8">
              {rubric.summary && (
                <div className="p-5 bg-slate-800/40 border border-slate-800 rounded-2xl">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    Executive Summary
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{rubric.summary}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-emerald-950/20 border border-emerald-900/40 rounded-2xl">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">Key Strengths</h4>
                  <ul className="space-y-2">
                    {rubric.strengths?.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 bg-amber-950/20 border border-amber-900/40 rounded-2xl">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Areas For Growth</h4>
                  <ul className="space-y-2">
                    {rubric.weaknesses?.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Evaluated autonomously with Gemini 1.5 Flash
            </span>
            <button
              onClick={() => router.push('/candidates/applications')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-blue-600/20"
            >
              Back to My Applications
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // ACTIVE INTERVIEW CHAMBER
  // ---------------------------------------------------------------------------
  return (
    <div className="h-screen bg-slate-950 text-white flex flex-col overflow-hidden font-sans">
      
      {/* Top Bar */}
      <header className="h-16 border-b border-slate-800/80 px-6 flex items-center justify-between bg-slate-900/60 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              AeroATS Autonomous Interviewer
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20 uppercase font-semibold">
                Live AI
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              {session.application.job.title} &bull; {session.application.job.company.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs text-slate-300">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            {formatTime(timeElapsed)}
          </div>

          <button
            onClick={() => setAutoVoiceEnabled(!autoVoiceEnabled)}
            className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              autoVoiceEnabled
                ? 'bg-blue-600/20 border-blue-500/40 text-blue-400'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle AI voice narration"
          >
            {autoVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Chamber Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-hidden">
        
        {/* Left Column: AI Interviewer Video & Question Panel */}
        <div className="lg:col-span-7 flex flex-col gap-4 overflow-hidden h-full">
          
          {/* AI Avatar Display with Soundwave */}
          <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/30 border border-slate-800/80 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span className="text-xs text-blue-400 font-semibold">
                {currentQ?.category || 'Technical Evaluation'}
              </span>
            </div>

            {/* AI Avatar Visualizer */}
            <div className="relative mb-6">
              <div className={`w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 shadow-2xl transition-all duration-300 ${
                isSpeaking ? 'ring-8 ring-blue-500/20 scale-105' : ''
              }`}>
                <Bot className="w-14 h-14 text-white" />
              </div>
              {isSpeaking && (
                <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-blue-600 text-white rounded-full shadow-md animate-pulse">
                    Speaking
                  </span>
                </div>
              )}
            </div>

            {/* Audio Waveform */}
            <AudioWaveform isActive={isSpeaking} variant="ai" barCount={16} className="mb-6 w-full max-w-xs" />

            {/* Spoken Question */}
            <div className="max-w-xl text-center">
              <h2 className="text-lg lg:text-xl font-bold text-slate-100 leading-snug">
                "{currentQ?.question}"
              </h2>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                onClick={handleReplayQuestion}
                className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-bold text-slate-300 rounded-lg flex items-center gap-1.5 transition-colors"
                title="Replay Question Audio"
              >
                <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                Replay Audio
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800/40 rounded-full h-2 overflow-hidden border border-slate-800 shrink-0">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Right Column: Candidate Stream & Answer Response Area */}
        <div className="lg:col-span-5 flex flex-col gap-4 overflow-hidden h-full">
          
          {/* Candidate Webcam Stream */}
          <div className="h-48 sm:h-56 bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden relative shadow-lg shrink-0">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transform -scale-x-100 ${!cameraActive ? 'hidden' : ''}`}
            />
            {!cameraActive && (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500">
                <User className="w-12 h-12 mb-2" />
                <span className="text-xs font-semibold">Camera is Turned Off</span>
              </div>
            )}

            {/* Floating Camera / Mic Control Pill */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
              <button
                onClick={toggleCamera}
                className={`p-1.5 rounded-lg transition-colors ${
                  cameraActive ? 'text-slate-300 hover:text-white' : 'text-red-400'
                }`}
              >
                {cameraActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>
              <button
                onClick={handleVoiceToggle}
                className={`p-1.5 rounded-lg transition-colors ${
                  isListening ? 'text-emerald-400 bg-emerald-500/20' : 'text-slate-300 hover:text-white'
                }`}
              >
                {isListening ? <Mic className="w-4 h-4 animate-pulse" /> : <MicOff className="w-4 h-4" />}
              </button>
              <span className="text-[11px] font-bold text-slate-300 ml-1">
                {session.application.candidate.user.firstName || 'Candidate'}
              </span>
            </div>
          </div>

          {/* Answer Input Box & Voice Transcription */}
          <div className="flex-1 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col overflow-hidden shadow-lg">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                Your Technical Response
                {isListening && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Listening...
                  </span>
                )}
              </span>

              <button
                type="button"
                onClick={handleVoiceToggle}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isListening
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                {isListening ? 'Stop Speaking' : 'Answer with Voice'}
              </button>
            </div>

            <textarea
              rows={4}
              value={candidateAnswer}
              onChange={(e) => setCandidateAnswer(e.target.value)}
              placeholder="Speak aloud using the microphone or type your technical response here in detail..."
              className="flex-1 w-full bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
            />

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between shrink-0 mt-3">
              <span className="text-[11px] text-slate-500">
                {candidateAnswer.length} characters &bull; {currentIndex + 1 === questions.length ? 'Final Question' : `${questions.length - (currentIndex + 1)} left`}
              </span>

              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={isSubmitting || !candidateAnswer.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-600/20 active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AI Analyzing...
                  </>
                ) : (
                  <>
                    <span>Submit & Proceed</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

