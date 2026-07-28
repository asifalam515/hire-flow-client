'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { 
  Briefcase, 
  MapPin, 
  Building2, 
  CalendarDays,
  Loader2,
  ChevronRight,
  Filter,
  DollarSign
} from 'lucide-react';
import { apiClient } from '@/lib/api';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

interface Company {
  name: string;
  logoUrl: string | null;
}

interface Job {
  id: string;
  title: string;
  locationCity: string;
  minSalary: number;
  maxSalary: number;
  employmentTypes: string[];
  company: Company;
}

interface Application {
  id: string;
  status: 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
  appliedAt: string;
  job: Job;
}

const statusConfig = {
  APPLIED: { label: 'Applied', color: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' },
  SCREENING: { label: 'Screening', color: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20' },
  INTERVIEW: { label: 'Interview', color: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20' },
  OFFER: { label: 'Offer', color: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' },
  REJECTED: { label: 'Rejected', color: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20' },
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // If we're definitely missing user after initial mount, we could redirect,
    // but the most robust way is to catch a 401 from the API request itself.
    
    const fetchApplications = async () => {
      try {
        const response = await apiClient.get<Application[]>('/candidates/me/applications');
        // apiClient normalizes the response to return { success, data } 
        // and data contains the actual array sent by the backend.
        setApplications(response.data || []);
      } catch (error: any) {
        console.error('Failed to fetch applications', error);
        if (error?.status === 401) {
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, [router]);

  const filteredApplications = applications.filter(app => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'ACTIVE') return !['REJECTED', 'OFFER'].includes(app.status);
    return app.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1000px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 mb-6">
            <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">My Activity</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Job Applications
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            Track your progress, prepare for interviews, and stay on top of your job search journey.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto hide-scrollbar">
            {['ALL', 'ACTIVE', 'INTERVIEW', 'OFFER', 'REJECTED'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-zinc-900 shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:bg-zinc-900 dark:text-slate-300 dark:border-zinc-800 dark:hover:border-zinc-700'
                }`}
              >
                {tab === 'ALL' ? 'All Applications' : 
                 tab === 'ACTIVE' ? 'In Progress' :
                 tab.charAt(0) + tab.slice(1).toLowerCase()}
                {tab === 'ALL' && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'ALL' ? 'bg-slate-700 text-white dark:bg-zinc-200 dark:text-zinc-900' : 'bg-slate-100 text-slate-500 dark:bg-zinc-800'}`}>
                    {applications.length}
                  </span>
                )}
              </button>
            ))}
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 dark:bg-zinc-900 dark:text-slate-300 dark:border-zinc-800 shrink-0">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Applications List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900/50 rounded-3xl border border-slate-200 dark:border-zinc-800/80">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
            <p className="text-sm font-medium text-slate-500">Loading your applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-zinc-900/50 rounded-3xl border border-slate-200 dark:border-zinc-800/80 text-center px-4 shadow-sm">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No applications found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
              {activeTab === 'ALL' 
                ? "You haven't applied to any jobs yet. Start exploring opportunities to advance your career."
                : `You don't have any applications in the ${activeTab.toLowerCase()} stage right now.`}
            </p>
            <Link 
              href="/jobs" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200 active:scale-95"
            >
              Explore Jobs
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredApplications.map((app) => (
              <Link 
                href={`/jobs/${app.job.id}`} 
                key={app.id}
                className="group block bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/80 rounded-2xl p-5 lg:p-6 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none dark:hover:border-zinc-700 transition-all duration-300 relative overflow-hidden"
              >
                {/* Decorative left border for visual interest */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  
                  {/* Company Logo */}
                  <div className="w-16 h-16 shrink-0 bg-slate-50 dark:bg-zinc-950 rounded-2xl border border-slate-100 dark:border-zinc-800 flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow transition-shadow">
                    {app.job.company.logoUrl ? (
                      <img src={app.job.company.logoUrl} alt={app.job.company.name} className="w-10 h-10 object-contain" />
                    ) : (
                      <Building2 className="w-8 h-8 text-slate-400" />
                    )}
                  </div>

                  {/* Job Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {app.job.company.name}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-zinc-700" />
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" />
                        Applied {format(new Date(app.appliedAt), 'MMM d, yyyy')}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {app.job.title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-zinc-950 px-3 py-1 rounded-lg border border-slate-100 dark:border-zinc-800">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">{app.job.locationCity || 'Remote'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-zinc-950 px-3 py-1 rounded-lg border border-slate-100 dark:border-zinc-800">
                        <DollarSign className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">
                          ${(app.job.minSalary / 1000).toFixed(0)}k - ${(app.job.maxSalary / 1000).toFixed(0)}k
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-zinc-950 px-3 py-1 rounded-lg border border-slate-100 dark:border-zinc-800">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        <span className="font-medium truncate max-w-[150px]">
                          {app.job.employmentTypes[0] || 'Full-time'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Action */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-slate-100 dark:border-zinc-800 gap-4 shrink-0">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide uppercase border ${statusConfig[app.status]?.color || statusConfig['APPLIED'].color}`}>
                      {statusConfig[app.status]?.label || app.status}
                    </span>
                    
                    <div className="text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
