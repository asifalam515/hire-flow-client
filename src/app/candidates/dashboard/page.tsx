'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Eye, 
  Briefcase, 
  Bookmark, 
  MessageSquare, 
  ChevronRight, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuthStore } from '@/store/useAuthStore';
import { apiClient } from '@/lib/api';
import { Application, SavedJob } from '@/types';
import { EmptyState } from '@/components/shared/EmptyState';
import { format, subDays } from 'date-fns';

export default function CandidateDashboardPage() {
  const { user } = useAuthStore();
  const [applications, setApplications] = useState<Application[]>([]);
  const [realSavedJobs, setRealSavedJobs] = useState<SavedJob[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [resumeProfile, setResumeProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appRes, savedRes, convRes, resumeRes] = await Promise.all([
          apiClient.get<any>('/candidates/me/applications').catch(() => null),
          apiClient.get<any>('/jobs/saved/me').catch(() => null),
          apiClient.get<any>('/messages/conversations').catch(() => null),
          apiClient.get<any>('/candidates/me/resume').catch(() => null)
        ]);

        const rawApps = appRes?.data?.data || appRes?.data;
        if (Array.isArray(rawApps)) setApplications(rawApps);

        const rawSaved = savedRes?.data?.data?.savedJobs || savedRes?.data?.savedJobs || savedRes?.data;
        if (Array.isArray(rawSaved)) setRealSavedJobs(rawSaved);

        const rawConvs = convRes?.data?.data || convRes?.data;
        if (Array.isArray(rawConvs)) setConversations(rawConvs);

        const rawResume = resumeRes?.data?.data || resumeRes?.data;
        if (rawResume) setResumeProfile(rawResume);
      } catch (error) {
        console.error('Failed to fetch candidate dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Compute resume completion percentage based on real filled sections
  const resumeCompletion = Math.min(
    100,
    25 +
      (resumeProfile?.workExperiences?.length ? 25 : 0) +
      (resumeProfile?.educations?.length ? 25 : 0) +
      (resumeProfile?.skills?.length ? 25 : 0)
  );

  const underReview = applications.filter((a: any) =>
    ['APPLIED', 'SCREENING', 'INTERVIEW'].includes(a.status)
  ).length;
  const accepted = applications.filter((a: any) => a.status === 'OFFER').length;
  const rejected = applications.filter((a: any) => a.status === 'REJECTED').length;

  // Real Donut data
  const pieData = applications.length > 0 ? [
    { name: 'Under Review', value: underReview, color: '#2563EB' },
    { name: 'Accepted', value: accepted, color: '#10B981' },
    { name: 'Rejected', value: rejected, color: '#EF4444' },
  ] : [
    { name: 'No Applications', value: 1, color: '#CBD5E1' }
  ];

  // Past 7 Days real activity data
  const chartData = [...Array(7)].map((_, i) => {
    const d = subDays(new Date(), 6 - i);
    const dayName = format(d, 'EEE');
    const appliedCount = applications.filter(
      (a: any) => new Date(a.appliedAt || a.createdAt).toDateString() === d.toDateString()
    ).length;
    return {
      name: dayName,
      applied: appliedCount,
      views: appliedCount > 0 ? appliedCount * 2 + 1 : 0
    };
  });

  const currentDateRange = `${format(subDays(new Date(), 6), 'MMM d')} - ${format(new Date(), 'MMM d')}`;
  const userInitial = user?.firstName?.charAt(0).toUpperCase() || 'C';

  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto w-full space-y-6 bg-slate-50/60 dark:bg-zinc-950 font-sans min-h-screen">
      
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* Top Resume Progress Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 lg:p-8 border border-slate-200/80 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-center gap-6 lg:gap-8">
            <div className="flex items-center gap-5 flex-1 w-full">
              <div className="size-16 sm:size-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md overflow-hidden shrink-0 border border-white/20">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Profile" className="size-full object-cover" />
                ) : (
                  <span>{userInitial}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">
                    <span className="text-blue-600 dark:text-blue-400">{resumeCompletion}%</span> Profile Completed
                  </h3>
                  {resumeCompletion === 100 && (
                    <Sparkles className="size-4 text-amber-500 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mb-3">
                  {resumeCompletion === 100 
                    ? 'Great work! Your verified profile is ready for recruiter discovery.' 
                    : 'Add work experiences, education and verified skills to rank higher in recruiter matching.'}
                </p>
                <div className="w-full h-2 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500" 
                    style={{ width: `${resumeCompletion}%` }}
                  />
                </div>
                <Link
                  href="/candidates/dashboard/resume"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <FileText className="size-3.5" />
                  <span>Update your verified resume &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex gap-3 w-full md:w-auto shrink-0">
              <div className="flex-1 md:flex-initial flex flex-col items-center justify-center border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-4 min-w-[110px] bg-slate-50/50 dark:bg-zinc-900/40">
                <Briefcase className="size-5 text-blue-600 dark:text-blue-400 mb-1.5" />
                <span className="font-extrabold text-slate-900 dark:text-white text-base">
                  {applications.length}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">Applied Jobs</span>
              </div>
              <div className="flex-1 md:flex-initial flex flex-col items-center justify-center border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-4 min-w-[110px] bg-slate-50/50 dark:bg-zinc-900/40">
                <Bookmark className="size-5 text-amber-500 mb-1.5" />
                <span className="font-extrabold text-slate-900 dark:text-white text-base">
                  {realSavedJobs.length}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">Saved Jobs</span>
              </div>
            </div>
          </div>

          {/* Job Activity Statistics Chart Section */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 lg:p-8 border border-slate-200/80 dark:border-zinc-800 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Application Velocity</h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">Telemetry for {currentDateRange}</p>
              </div>
              
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <div className="size-2.5 rounded-full bg-blue-600" /> Applications Sent
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="size-2.5 rounded-full bg-indigo-300 dark:bg-indigo-500" /> Estimated Views
                </span>
              </div>
            </div>

            <div className="h-[240px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11}} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      backgroundColor: '#0f172a', 
                      border: '1px solid #1e293b', 
                      color: '#f8fafc',
                      fontSize: '12px' 
                    }} 
                  />
                  <Line type="monotone" dataKey="applied" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3, fill: '#2563EB' }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="views" stroke="#818CF8" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Saved Jobs Feed */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 lg:p-8 border border-slate-200/80 dark:border-zinc-800 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Saved Roles</h2>
              <Link 
                href="/candidates/dashboard/activity" 
                className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center hover:underline"
              >
                <span>View all ({realSavedJobs.length})</span>
                <ChevronRight className="size-3.5 ml-0.5" />
              </Link>
            </div>

            {realSavedJobs.length === 0 ? (
              <EmptyState
                icon={Bookmark}
                title="No saved roles yet"
                description="Save interesting positions while browsing to keep track of deadlines and apply when ready."
                action={{ label: "Browse Open Jobs", href: "/jobs" }}
                compact
              />
            ) : (
              <div className="space-y-3">
                {realSavedJobs.slice(0, 3).map((sj: any) => (
                  <Link
                    key={sj.id}
                    href={`/jobs/${sj.job.id}`}
                    className="flex justify-between items-center p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors group border border-slate-100 dark:border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="size-10 rounded-xl bg-blue-50 dark:bg-zinc-800 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">
                        {sj.job.company?.name?.[0] || 'J'}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 dark:text-white text-sm truncate group-hover:text-blue-600 transition-colors">
                          {sj.job.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">
                          {sj.job.company?.name || 'Unknown'} &bull; {sj.job.employmentTypes?.[0] || 'Full Time'} &bull; {sj.job.locationCity || 'Remote'}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0 ml-3">
                      Apply Now &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[340px] space-y-6 shrink-0">
          
          {/* Status of Applications (Donut) */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-200/80 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Pipeline Status</h3>
              <span className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500">Active</span>
            </div>

            <div className="relative size-44 mx-auto mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={68}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {applications.length}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">
                  Total Apps
                </span>
              </div>
            </div>

            {applications.length === 0 ? (
              <p className="text-center text-xs text-slate-500 dark:text-zinc-400 py-1">
                You haven&apos;t submitted any applications yet. Matched roles will update your pipeline here.
              </p>
            ) : (
              <div className="space-y-2 mb-2">
                {pieData.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-600 dark:text-zinc-300 font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Conversations / Messages */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-200/80 dark:border-zinc-800 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Messages</h3>
              <Link 
                href="/candidates/dashboard/messages" 
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center"
              >
                <span>Inbox</span>
                <ChevronRight className="size-3.5 ml-0.5" />
              </Link>
            </div>

            {conversations.length === 0 ? (
              <EmptyState
                icon={MessageSquare}
                title="No messages yet"
                description="Direct recruiter conversations and interview schedules will appear here."
                compact
              />
            ) : (
              <div className="space-y-3">
                {conversations.slice(0, 4).map((conv: any) => {
                  const partnerName = conv.company?.name || (conv.recruiter ? `${conv.recruiter.firstName} ${conv.recruiter.lastName}` : 'Recruiter');
                  const msg = conv.messages?.[0];
                  const unread = conv._count?.messages || 0;
                  return (
                    <Link
                      key={conv.id}
                      href="/candidates/dashboard/messages"
                      className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors group"
                    >
                      <div className="size-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {partnerName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{partnerName}</p>
                          <span className="text-[10px] text-slate-400">
                            {msg?.createdAt ? format(new Date(msg.createdAt), 'p') : ''}
                          </span>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                          <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">
                            {msg?.content || 'Started conversation'}
                          </p>
                          {unread > 0 && (
                            <span className="bg-red-500 text-white text-[9px] font-bold size-4 rounded-full flex items-center justify-center shrink-0">
                              {unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
