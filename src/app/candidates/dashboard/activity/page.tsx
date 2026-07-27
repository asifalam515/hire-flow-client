'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, MapPin, Share2, Bookmark, BookmarkMinus, Edit2, Loader2 } from 'lucide-react';
import { useActivityStore } from '@/store/useActivityStore';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const TAB_OPTIONS = ['Apply status', 'Offered job', 'Saved job', 'Followed company'];
const FILTERS = ['All', 'Applied', 'Checked', 'Rejected', 'Accepted', 'Interviewed'];

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState('Apply status');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const { user } = useAuthStore();
  const { 
    applications, offeredJobs, savedJobs, followedCompanies, isLoading, 
    fetchApplications, fetchOfferedJobs, fetchSavedJobs, fetchFollowedCompanies, 
    unfollowCompany 
  } = useActivityStore();

  useEffect(() => {
    if (activeTab === 'Apply status') fetchApplications(activeFilter);
    else if (activeTab === 'Offered job') fetchOfferedJobs();
    else if (activeTab === 'Saved job') fetchSavedJobs();
    else if (activeTab === 'Followed company') fetchFollowedCompanies();
  }, [activeTab, activeFilter]);

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'INTERVIEW': return 'text-cyan-500 border-cyan-500';
      case 'APPLIED': return 'text-slate-600 border-slate-300';
      case 'REJECTED': return 'text-red-500 border-red-500';
      case 'SCREENING': return 'text-amber-500 border-amber-500';
      case 'OFFER': return 'text-green-500 border-green-500';
      default: return 'text-slate-600 border-slate-300';
    }
  };

  const renderApplyStatus = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-md border text-sm font-medium transition-colors ${
                activeFilter === filter 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-slate-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="relative">
          <select className="appearance-none bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-slate-300 py-1.5 pl-4 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Newest</option>
            <option>Oldest</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
      ) : applications.length === 0 ? (
        <div className="text-center py-10 text-slate-500">No applications found.</div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl p-5 flex items-center justify-between hover:shadow-sm transition-shadow cursor-pointer">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full border border-slate-100 dark:border-zinc-800 overflow-hidden flex items-center justify-center bg-white shrink-0">
                  <img src={app.job?.company?.logoUrl || ''} alt={app.job?.company?.name} className="w-10 h-10 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40'; }} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{app.job?.company?.name}</p>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">{app.job?.title}</h3>
                  <span className={`inline-block px-3 py-0.5 rounded text-xs font-medium border ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderOfferedJobs = () => (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : offeredJobs.length === 0 ? (
          <div className="text-center py-10 text-slate-500">No offered jobs found.</div>
        ) : (
          offeredJobs.map((app) => {
            const job = app.job;
            if (!job) return null;
            return (
              <div key={app.id} className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl p-5 relative hover:shadow-sm transition-shadow">
                <div className="absolute top-5 right-5 flex items-center gap-3 text-slate-400">
                  <button className="hover:text-slate-600"><Share2 className="w-5 h-5" /></button>
                  <button className="hover:text-slate-600"><Bookmark className="w-5 h-5" /></button>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl border border-slate-100 dark:border-zinc-800 overflow-hidden flex items-center justify-center bg-white shrink-0 p-2">
                    <img src={job.company?.logoUrl || ''} alt={job.company?.name} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40'; }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 mb-0.5">{job.company?.name}</p>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">{job.title}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {job.employmentTypes.map(type => (
                        <span key={type} className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md text-[10px] font-medium">
                          {type}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-slate-500 text-xs mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{job.locationCity}, {job.locationCountry}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-blue-600 font-semibold text-sm">${job.minSalary} - ${job.maxSalary} / Month</p>
                      <p className="text-[10px] text-slate-400">{formatDistanceToNow(new Date(app.updatedAt))} ago</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="w-full lg:w-72 shrink-0">
        <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-900 dark:text-white">Offered jobs setting</h3>
            <button className="text-blue-600 hover:text-blue-700">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-xs text-slate-400 mb-1">Favorite cities</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {user?.candidateProfile?.favoriteCities?.length ? user.candidateProfile.favoriteCities.join(', ') : 'All cities'}
              </p>
            </div>
            
            <div>
              <p className="text-xs text-slate-400 mb-1">Job title</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {user?.candidateProfile?.preferredJobTitle || 'Any Job Title'}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-2">Job Type</p>
              <div className="flex gap-2">
                {user?.candidateProfile?.preferredJobTypes?.length ? (
                  user.candidateProfile.preferredJobTypes.map(type => (
                    <span key={type} className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md text-xs font-medium">{type}</span>
                  ))
                ) : (
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Any Type</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Tend to remote job</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {user?.candidateProfile?.tendToRemote || 'Any Remote Preference'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-slate-600 dark:text-slate-300">Do you want to recieve email</p>
              <button className={`w-10 h-5 rounded-full relative transition-colors flex-shrink-0 ${user?.candidateProfile?.receiveEmail !== false ? 'bg-blue-600' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${user?.candidateProfile?.receiveEmail !== false ? 'right-0.5' : 'left-0.5'}`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSavedJobs = () => (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
      ) : savedJobs.length === 0 ? (
        <div className="text-center py-10 text-slate-500">No saved jobs found.</div>
      ) : (
        savedJobs.map((saved) => (
          <div key={saved.id} className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl p-5 relative hover:shadow-sm transition-shadow">
            <div className="absolute top-5 right-5 flex items-center gap-3 text-slate-400">
              <button className="hover:text-slate-600"><Share2 className="w-5 h-5" /></button>
              <button className="hover:text-slate-600 text-blue-600"><Bookmark className="w-5 h-5 fill-current" /></button>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl border border-slate-100 dark:border-zinc-800 overflow-hidden flex items-center justify-center bg-white shrink-0 p-2">
                <img src={saved.job.company?.logoUrl || ''} alt={saved.job.company?.name} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40'; }} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-0.5">{saved.job.company?.name}</p>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">{saved.job.title}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                  {saved.job.employmentTypes.map(type => (
                    <span key={type} className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md text-[10px] font-medium">
                      {type}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-slate-500 text-xs mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{saved.job.locationCity}, {saved.job.locationCountry}</span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-blue-600 font-semibold text-sm">${saved.job.minSalary} - ${saved.job.maxSalary} / Month</p>
                  <p className="text-[10px] text-slate-400">{formatDistanceToNow(new Date(saved.createdAt))} ago</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const handleUnfollow = async (companyId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const loadingToast = toast.loading('Unfollowing...');
    try {
      await unfollowCompany(companyId);
      toast.success('Unfollowed successfully', { id: loadingToast });
    } catch (error) {
      toast.error('Failed to unfollow', { id: loadingToast });
    }
  };

  const renderFollowedCompanies = () => (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
      ) : followedCompanies.length === 0 ? (
        <div className="text-center py-10 text-slate-500">You are not following any companies yet.</div>
      ) : (
        followedCompanies.map((fc) => (
          <div key={fc.id} className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl p-5 flex items-center justify-between hover:shadow-sm transition-shadow cursor-pointer relative group">
            <div className="absolute top-5 right-5 flex items-center gap-3 text-slate-400 md:hidden opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={(e) => handleUnfollow(fc.companyId, e)} className="hover:text-red-500 text-slate-400"><BookmarkMinus className="w-5 h-5" /></button>
            </div>

            <div className="flex items-center gap-5 w-full pr-16 md:pr-24">
              <div className="w-16 h-16 rounded-2xl border border-slate-100 dark:border-zinc-800 overflow-hidden flex items-center justify-center bg-white shrink-0 p-2">
                <img src={fc.company.logoUrl || ''} alt={fc.company.name} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40'; }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 truncate">{fc.company.name}</h3>
                <p className="text-xs text-slate-500 mb-3 line-clamp-1">{fc.company.description || 'No description available'}</p>
                
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-[10px] font-medium border border-blue-100 dark:border-blue-900/30">
                    Hiring
                  </span>
                  <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-[10px] font-medium border border-blue-100 dark:border-blue-900/30">
                    {fc.company._count?.jobs || 0} Jobs
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4 text-slate-400 shrink-0 absolute right-5 top-1/2 -translate-y-1/2">
              <div className="flex items-center gap-3 mr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={(e) => handleUnfollow(fc.companyId, e)} className="hover:text-red-500 text-slate-400"><BookmarkMinus className="w-5 h-5" title="Unfollow" /></button>
              </div>
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto w-full">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-zinc-800 mb-6 overflow-x-auto custom-scrollbar">
        {TAB_OPTIONS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-4 text-sm font-medium whitespace-nowrap transition-colors relative ${
              activeTab === tab 
                ? 'text-blue-600' 
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="w-full">
        {activeTab === 'Apply status' && renderApplyStatus()}
        {activeTab === 'Offered job' && renderOfferedJobs()}
        {activeTab === 'Saved job' && renderSavedJobs()}
        {activeTab === 'Followed company' && renderFollowedCompanies()}
      </div>
    </div>
  );
}
