'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Mail, 
  FileText, 
  Calendar, 
  User, 
  Briefcase,
  GraduationCap,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

interface CandidateUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
}

interface CandidateProfile {
  id: string;
  userId: string;
  resumeUrl: string | null;
  aboutMe: string | null;
  city: string | null;
  gender: string | null;
  languages: string[];
  skills: string[];
  user: CandidateUser;
  educations: any[];
  workExperiences: any[];
}

interface Application {
  id: string;
  status: string;
  appliedAt: string;
  candidate: CandidateProfile;
  job: {
    id: string;
    title: string;
    status: string;
  };
}

export default function JobApplicationsPage() {
  const { jobId } = useParams() as { jobId: string };
  const router = useRouter();
  
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [jobTitle, setJobTitle] = useState('Job Applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isMessaging, setIsMessaging] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get(`/applications/job/${jobId}`);
        if (response.data && response.data.applications) {
          setApplications(response.data.applications);
          if (response.data.applications.length > 0) {
            setJobTitle(response.data.applications[0].job.title);
          }
        }
      } catch (error) {
        console.error('Failed to fetch applications', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (jobId) {
      fetchApplications();
    }
  }, [jobId]);

  const updateApplicationStatus = async (appId: string, newStatus: string) => {
    try {
      await apiClient.patch(`/applications/${appId}/status`, { status: newStatus });
      setApplications(prev => prev.map(app => 
        app.id === appId ? { ...app, status: newStatus } : app
      ));
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Failed to update status');
    }
  };

  const handleMessageCandidate = async (candidateUserId: string) => {
    setIsMessaging(candidateUserId);
    try {
      const res = await apiClient.post('/messages/conversations', {
        targetUserId: candidateUserId
      });
      // Navigate to messages dashboard
      router.push('/employer/dashboard/messages');
    } catch (error) {
      console.error('Failed to start conversation', error);
      alert('Failed to start conversation');
    } finally {
      setIsMessaging(null);
    }
  };

  const filteredApplications = applications.filter(app => {
    const candidateName = `${app.candidate.user.firstName || ''} ${app.candidate.user.lastName || ''}`.toLowerCase();
    const matchesSearch = candidateName.includes(searchTerm.toLowerCase()) || 
                          app.candidate.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPLIED': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
      case 'SCREENING': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800';
      case 'INTERVIEW': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
      case 'OFFER': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-zinc-800 dark:text-slate-400 dark:border-zinc-700';
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/employer/dashboard" className="p-2 border border-slate-200 dark:border-zinc-800 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Candidates for {jobTitle}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {applications.length} total applicant{applications.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-zinc-950 p-4 border border-slate-200 dark:border-zinc-800 rounded-2xl flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search candidates by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-zinc-800 rounded-xl bg-slate-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {['ALL', 'APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                statusFilter === status 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Loading candidates...</p>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-3xl">
          <User className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No candidates found</h3>
          <p className="text-slate-500 mt-2 text-sm max-w-sm text-center">
            {searchTerm || statusFilter !== 'ALL' 
              ? 'Try adjusting your filters or search term to find candidates.' 
              : 'You have no applications for this job yet.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredApplications.map((app) => (
            <div key={app.id} className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex-shrink-0">
                      {app.candidate.user.avatarUrl ? (
                        <img src={app.candidate.user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-lg">
                          {(app.candidate.user.firstName?.[0] || 'U').toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight group-hover:text-blue-600 transition-colors">
                        {app.candidate.user.firstName} {app.candidate.user.lastName}
                      </h3>
                      <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-[150px]">{app.candidate.user.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4 flex-1">
                  {app.candidate.city && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {app.candidate.city}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    Applied {new Date(app.appliedAt).toLocaleDateString()}
                  </div>
                  
                  {app.candidate.skills && app.candidate.skills.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-bold text-slate-900 dark:text-white mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {app.candidate.skills.slice(0, 4).map(skill => (
                          <span key={skill} className="text-[10px] bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                            {skill}
                          </span>
                        ))}
                        {app.candidate.skills.length > 4 && (
                          <span className="text-[10px] bg-slate-50 dark:bg-zinc-900 text-slate-500 px-2 py-0.5 rounded">
                            +{app.candidate.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {app.candidate.workExperiences && app.candidate.workExperiences.length > 0 && (
                    <div className="mt-3 flex items-start gap-2">
                      <Briefcase className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{app.candidate.workExperiences[0].title}</p>
                        <p className="text-[10px] text-slate-500">{app.candidate.workExperiences[0].company}</p>
                      </div>
                    </div>
                  )}
                  
                  {app.candidate.educations && app.candidate.educations.length > 0 && (
                    <div className="mt-2 flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{app.candidate.educations[0].degree}</p>
                        <p className="text-[10px] text-slate-500">{app.candidate.educations[0].institution}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-zinc-900/50 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between gap-3">
                <div className="relative">
                  <select 
                    value={app.status}
                    onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                    className="appearance-none bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 text-xs font-bold py-1.5 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="APPLIED">Applied</option>
                    <option value="SCREENING">Screening</option>
                    <option value="INTERVIEW">Interview</option>
                    <option value="OFFER">Offer</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMessageCandidate(app.candidate.user.id)}
                    disabled={isMessaging === app.candidate.user.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    {isMessaging === app.candidate.user.id ? 'Starting...' : 'Message'}
                  </button>

                  {app.candidate.resumeUrl ? (
                    <a 
                      href={app.candidate.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Resume
                    </a>
                  ) : (
                    <button disabled className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-zinc-800 text-slate-400 rounded-lg text-xs font-bold opacity-50 cursor-not-allowed">
                      <FileText className="w-3.5 h-3.5" />
                      No Resume
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
