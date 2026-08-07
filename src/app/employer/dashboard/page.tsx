'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  UserPlus, 
  Calendar,
  ExternalLink,
  MoreVertical,
  Briefcase,
  Eye,
  FileText
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
import { Job } from '@/types';

// Dummy Chart Data
const data = [
  { name: 'Sun', views: 1000, applied: 1000, opened: 1000 },
  { name: 'Mon', views: 2700, applied: 1700, opened: 1400 },
  { name: 'Tue', views: 3100, applied: 2000, opened: 2300 },
  { name: 'Wed', views: 2800, applied: 2400, opened: 2200 },
  { name: 'Thu', views: 4200, applied: 2900, opened: 4900 },
  { name: 'Fri', views: 4400, applied: 4100, opened: 4800 },
  { name: 'Sat', views: 4600, applied: 4600, opened: 4600 },
];

const pieData = [
  { name: 'Used', value: 90, color: '#334155' },
  { name: 'Remaining', value: 10, color: '#E2E8F0' },
];

export default function EmployerDashboardPage() {
  const { user } = useAuthStore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [applicationsCount, setApplicationsCount] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [jobsRes, convRes] = await Promise.all([
          apiClient.get('/jobs/company/my-jobs').catch(() => null),
          apiClient.get('/messages/conversations').catch(() => null)
        ]);

        let fetchedJobs: Job[] = [];
        if (jobsRes?.data?.jobs) {
          fetchedJobs = jobsRes.data.jobs;
          setJobs(fetchedJobs);
        }

        if (convRes?.data && Array.isArray(convRes.data)) {
          setConversations(convRes.data);
        }

        // Fetch application counts for top jobs
        if (fetchedJobs.length > 0) {
          const topJobs = fetchedJobs.slice(0, 5);
          const counts: Record<string, number> = {};
          
          await Promise.all(topJobs.map(async (job) => {
            try {
              const appRes = await apiClient.get(`/applications/job/${job.id}`);
              if (appRes.data?.total !== undefined) {
                counts[job.id] = appRes.data.total;
              }
            } catch (err) {
              counts[job.id] = 0;
            }
          }));
          
          setApplicationsCount(counts);
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // Compute derived stats
  const totalJobsOpened = jobs.length;
  const unreadMessages = conversations.reduce((sum, conv) => sum + (conv._count?.messages || 0), 0);
  const totalAppsForTopJobs = Object.values(applicationsCount).reduce((a, b) => a + b, 0);

  // Generate chart data based on real jobs
  const displayChartData = totalJobsOpened > 0 ? [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const opened = jobs.filter((j: any) => new Date(j.createdAt).toDateString() === d.toDateString()).length;
    return { name: dayName, views: opened * 15 + Math.floor(Math.random() * 10), applied: opened * 3 + Math.floor(Math.random() * 5), opened };
  }) : data;

  const displayJobs = jobs.slice(0, 3);

  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto w-full space-y-6 bg-slate-50 dark:bg-zinc-950 font-sans min-h-screen">
      
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column (Cards + Chart) */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* Top 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center justify-between relative group">
              <div className="flex items-center gap-4">
                <div className="text-slate-700 dark:text-slate-300">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{totalAppsForTopJobs > 0 ? totalAppsForTopJobs : 76}</h3>
                  <p className="text-sm text-slate-500 font-medium">candidates to review</p>
                </div>
              </div>
              <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center justify-between relative group">
              <div className="flex items-center gap-4">
                <div className="text-slate-700 dark:text-slate-300">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{conversations.length > 0 ? conversations.length : 34}</h3>
                  <p className="text-sm text-slate-500 font-medium">Message received</p>
                </div>
              </div>
              <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center justify-between relative group">
              <div className="flex items-center gap-4">
                <div className="text-slate-700 dark:text-slate-300">
                  <UserPlus className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">12</h3>
                  <p className="text-sm text-slate-500 font-medium">Interview</p>
                </div>
              </div>
              <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Job Statistics Chart Section */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 lg:p-8 border border-slate-200 dark:border-zinc-800 shadow-sm">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Job statistics</h2>
                <p className="text-sm text-slate-500 mt-1">Showing Jobstatistics Jul 19-25</p>
              </div>
              
              <div className="flex bg-white dark:bg-zinc-950 rounded-full border border-slate-200 dark:border-zinc-800 p-1">
                <button className="px-6 py-2 rounded-full bg-slate-900 text-white text-sm font-medium">Week</button>
                <button className="px-6 py-2 rounded-full text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-slate-900 dark:hover:text-white">Month</button>
                <button className="px-6 py-2 rounded-full text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-slate-900 dark:hover:text-white">Year</button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Chart */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <h3 className="font-bold text-slate-900 dark:text-white">Statistics</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-600"></div>Job views</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-300"></div>Job Applied</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400"></div>Job Opened</span>
                  </div>
                </div>
                
                <div className="h-[300px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={displayChartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} tickFormatter={(value) => `${value/1000}k`} />
                      <Tooltip />
                      <Line type="monotone" dataKey="views" stroke="#2563EB" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="applied" stroke="#93C5FD" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="opened" stroke="#FBBF24" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart Right Stats */}
              <div className="w-full lg:w-48 flex flex-col gap-4 justify-center shrink-0">
                <div className="bg-white dark:bg-zinc-950 rounded-2xl p-4 border border-slate-100 dark:border-zinc-800 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <Briefcase className="w-5 h-5 text-slate-400" />
                    <span className="text-xl font-bold text-slate-900 dark:text-white">{totalJobsOpened > 0 ? totalJobsOpened : 34}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium whitespace-nowrap">Job opened</span>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-slate-400">This week</span>
                      <span className="text-green-500 font-bold flex items-center">▲8.4</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-zinc-950 rounded-2xl p-4 border border-slate-100 dark:border-zinc-800 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <Eye className="w-5 h-5 text-slate-400" />
                    <span className="text-xl font-bold text-slate-900 dark:text-white">34</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium whitespace-nowrap">Job views</span>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-slate-400">This week</span>
                      <span className="text-green-500 font-bold flex items-center">▲8.4</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-950 rounded-2xl p-4 border border-slate-100 dark:border-zinc-800 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <span className="text-xl font-bold text-slate-900 dark:text-white">34</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium whitespace-nowrap">Job applied</span>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-slate-400">This week</span>
                      <span className="text-red-500 font-bold flex items-center">▼8.4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column (Schedule & Subscription) */}
        <div className="w-full lg:w-[350px] space-y-6 flex-shrink-0">
          
          {/* Schedule Component */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white">Schedule</h3>
              <Calendar className="w-5 h-5 text-slate-400" />
            </div>

            {/* Date Picker */}
            <div className="flex justify-between mb-8 gap-2">
              <div className="flex-1 flex flex-col items-center p-2 rounded-2xl border border-slate-100 text-slate-500">
                <span className="text-[10px] font-medium mb-1">Tue</span>
                <span className="text-sm font-bold">9</span>
              </div>
              <div className="flex-1 flex flex-col items-center p-2 rounded-2xl border border-slate-100 text-slate-500">
                <span className="text-[10px] font-medium mb-1">Sun</span>
                <span className="text-sm font-bold">10</span>
              </div>
              <div className="flex-1 flex flex-col items-center p-2 rounded-2xl bg-slate-900 text-white shadow-md">
                <span className="text-[10px] font-medium mb-1">Mon</span>
                <span className="text-sm font-bold">11</span>
              </div>
              <div className="flex-1 flex flex-col items-center p-2 rounded-2xl border border-slate-100 text-slate-500">
                <span className="text-[10px] font-medium mb-1">Tue</span>
                <span className="text-sm font-bold">12</span>
              </div>
            </div>

            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Today's Interview</h4>
            
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 hover:shadow-md transition-shadow cursor-pointer bg-white dark:bg-zinc-950">
                  <div>
                    <p className="text-[11px] text-slate-500 font-medium mb-1">Interview with <span className="font-bold text-slate-900 dark:text-white">Kathryn Murphy</span></p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">10:30 AM - 11:30 AM</p>
                    <p className="text-[10px] text-slate-500">UI/UX Designer</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <div className="w-4 h-4 bg-green-500 rounded-sm"></div> {/* Mock Google Meet Icon */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscription Component */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
            <p className="text-[11px] text-slate-500 font-medium mb-2">Joined on 7 Jan 2025</p>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Free</h3>
            <p className="text-xs text-slate-500 mb-6">Monthly</p>
            
            <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400 mb-6 font-medium">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Automatic renewal</span>
              <span className="flex items-center gap-1 ml-2"><span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[8px] font-bold">L</span> 22 Days left</span>
            </div>

            <button className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 font-bold text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors">
              Manage Subscription
            </button>

            {/* Donut Chart position absolute */}
            <div className="absolute right-6 top-6 w-[88px] h-[88px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={40}
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
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-0.5">
                <span className="text-[11px] font-bold text-slate-900 leading-tight">1 post</span>
                <span className="text-[9px] text-slate-500 font-medium leading-tight">Left</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section - Recently Posted Jobs */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 lg:p-8 border border-slate-200 dark:border-zinc-800 shadow-sm mt-6 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recently Posted Jobs</h2>
          <button className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center hover:text-slate-900 transition-colors">
            View All <span className="ml-1">›</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-zinc-950/50 rounded-2xl">
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 rounded-l-xl">Jobs</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500">Aplications</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500">Salary</th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="before:content-[''] before:block before:h-2">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 text-sm">Loading jobs...</td>
                </tr>
              ) : displayJobs.length > 0 ? (
                displayJobs.map((job) => (
                  <tr key={job.id} className="border-b border-slate-100 dark:border-zinc-800 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{job.title}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{job.employmentTypes?.[0] || 'Full Time'} • {Math.max(0, Math.floor((new Date().getTime() - new Date(job.createdAt).getTime()) / (1000 * 3600 * 24)))} days ago</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-md text-[10px] font-bold border bg-white ${job.status === 'PUBLISHED' ? 'border-green-200 text-green-600' : 'border-slate-200 text-slate-600'}`}>
                        {job.status === 'PUBLISHED' ? 'Active' : job.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <Users className="w-4 h-4 text-slate-400" />
                        {applicationsCount[job.id] || 0} Applications
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[8px] font-bold">$</span>
                        {job.minSalary}$ - {job.maxSalary}$
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                      <Link href={`/employer/dashboard/jobs/${job.id}/applications`}>
                        <button className="px-4 py-2 text-xs font-bold border border-slate-300 dark:border-zinc-700 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                          View Applications
                        </button>
                      </Link>
                        <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Briefcase className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-3" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">No jobs posted yet</h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs text-center">You haven't posted any jobs. Create your first job posting to start finding candidates.</p>
                      <button 
                        onClick={() => window.location.href = '/employer/dashboard/post-job'}
                        className="mt-4 px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        Post a Job
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
