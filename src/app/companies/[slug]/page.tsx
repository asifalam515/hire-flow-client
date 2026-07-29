'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  Users, 
  Globe,
  Loader2,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { apiClient } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';

interface Job {
  id: string;
  title: string;
  nature: string;
  minSalary: number;
  maxSalary: number;
  locationCity: string;
  locationCountry: string;
  category: string;
  createdAt: string;
}

interface CompanyDetails {
  id: string;
  name: string;
  slug: string;
  field: string | null;
  description: string | null;
  logoUrl: string | null;
  createdAt: string;
  jobs: Job[];
  _count: {
    jobs: number;
    followers: number;
  };
}

export default function CompanyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { isAuthenticated } = useAuthStore();

  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchCompanyDetails = async () => {
      try {
        const res = await apiClient.get<CompanyDetails>(`/companies/${slug}`);
        if (res.data) {
          setCompany(res.data);
        } else {
          router.push('/companies'); // Redirect if not found
        }
      } catch (error) {
        console.error('Failed to fetch company details', error);
        router.push('/companies'); // Redirect on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [slug, router]);

  useEffect(() => {
    if (isAuthenticated && company) {
      const checkFollowStatus = async () => {
        try {
          const res = await apiClient.get<{ companyId: string }[]>('/candidates/me/followed-companies');
          // Depending on how followed-companies returns data, it might return the whole FollowedCompany object
          const followed = (res.data as any[]).some(f => f.companyId === company.id);
          setIsFollowing(followed);
        } catch (error) {
          console.error('Failed to check follow status', error);
        }
      };
      checkFollowStatus();
    }
  }, [isAuthenticated, company]);

  const handleToggleFollow = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to follow companies');
      router.push('/login');
      return;
    }
    if (!company) return;

    setIsFollowLoading(true);
    try {
      if (isFollowing) {
        await apiClient.delete(`/candidates/me/followed-companies/${company.id}`);
        setIsFollowing(false);
        setCompany(prev => prev ? {
          ...prev,
          _count: { ...prev._count, followers: Math.max(0, prev._count.followers - 1) }
        } : prev);
        toast.success(`Unfollowed ${company.name}`);
      } else {
        await apiClient.post('/candidates/me/followed-companies', { companyId: company.id });
        setIsFollowing(true);
        setCompany(prev => prev ? {
          ...prev,
          _count: { ...prev._count, followers: prev._count.followers + 1 }
        } : prev);
        toast.success(`Following ${company.name}`);
      }
    } catch (error) {
      console.error('Failed to toggle follow', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsFollowLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 flex justify-center items-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </main>
      </div>
    );
  }

  if (!company) {
    return null;
  }

  // Consistent pseudo-random properties based on ID
  let hash = 0;
  for (let i = 0; i < company.id.length; i++) hash = company.id.charCodeAt(i) + ((hash << 5) - hash);
  const absHash = Math.abs(hash);
  const locations = ['New York, NY', 'San Francisco, CA', 'Remote', 'London, UK', 'Toronto, CA'];
  const mockLocation = locations[absHash % locations.length];
  const mockFounded = 2000 + (absHash % 20); // 2000 - 2019
  const sizes = ['1 - 50', '51 - 200', '201-500', '501 - 1000', '1000+'];
  const mockSize = sizes[absHash % sizes.length];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 w-full pb-20">
        {/* Top Banner (Gradient) */}
        <div className="h-48 md:h-64 w-full bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 relative">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 mix-blend-overlay"></div>
          {/* Back button */}
          <div className="absolute top-6 left-6 sm:left-10 z-10">
            <Link 
              href="/companies"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Companies
            </Link>
          </div>
        </div>

        {/* Company Info Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-24 relative z-10">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start">
            
            {/* Logo */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white shadow-md border-4 border-white flex items-center justify-center overflow-hidden shrink-0 -mt-12 md:-mt-16 relative">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className="w-full h-full object-contain p-4 bg-white" />
              ) : (
                <Building2 className="w-16 h-16 text-slate-300" />
              )}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                    {company.name}
                  </h1>
                  <p className="text-lg text-slate-600 mt-1 flex items-center gap-2">
                    {company.field || 'Technology'}
                    <span className="w-1 h-1 rounded-full bg-slate-400 mx-1"></span>
                    <span className="flex items-center text-slate-500 text-base">
                      <MapPin className="w-4 h-4 mr-1" />
                      {mockLocation}
                    </span>
                  </p>
                </div>
                <button 
                  onClick={handleToggleFollow}
                  disabled={isFollowLoading}
                  className={`font-semibold px-6 py-2.5 rounded-lg transition-all shadow-sm flex items-center gap-2 ${
                    isFollowing 
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isFollowLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isFollowing ? 'Following' : 'Follow Company'}
                </button>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-y-4 gap-x-8 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Open Jobs</p>
                    <p className="text-base font-bold text-slate-900">{company._count.jobs || 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Company Size</p>
                    <p className="text-base font-bold text-slate-900">{mockSize} Employees</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Founded</p>
                    <p className="text-base font-bold text-slate-900">{mockFounded}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: About & Description */}
            <div className="flex-1 space-y-8">
              <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">About Us</h2>
                <div className="prose prose-slate max-w-none">
                  {company.description ? (
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {company.description}
                    </p>
                  ) : (
                    <p className="text-slate-600 leading-relaxed">
                      {company.name} is a leading organization dedicated to excellence and innovation. We pride ourselves on creating an environment where talented individuals can thrive and build exceptional products.
                    </p>
                  )}
                </div>
              </section>
            </div>

            {/* Right Column: Open Positions */}
            <div className="w-full lg:w-[400px] shrink-0">
              <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Recent Jobs</h2>
                  <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {company.jobs.length} roles
                  </span>
                </div>

                <div className="space-y-4">
                  {company.jobs.length > 0 ? (
                    company.jobs.map(job => (
                      <Link href={`/jobs/${job.id}`} key={job.id} className="block group">
                        <div className="border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all bg-white relative">
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 pr-8 line-clamp-1 mb-2">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-slate-600 border border-slate-200 bg-slate-50 uppercase tracking-wide">
                              {job.nature}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-slate-600 border border-slate-200 bg-slate-50 uppercase tracking-wide">
                              {job.locationCity || 'Remote'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-4 border-t border-slate-100 pt-3">
                            <p className="text-sm font-semibold text-slate-700">
                              ${(job.minSalary / 1000).toFixed(0)}k - ${(job.maxSalary / 1000).toFixed(0)}k
                            </p>
                            <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-sm font-medium">
                              View <ArrowRight className="w-4 h-4 ml-1" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                      <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-sm font-medium text-slate-900">No open jobs</p>
                      <p className="text-sm text-slate-500">Check back later for new roles.</p>
                    </div>
                  )}
                </div>

                {company.jobs.length > 0 && (
                  <button className="w-full mt-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg transition-colors border border-slate-200 text-sm">
                    View all jobs at {company.name}
                  </button>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
