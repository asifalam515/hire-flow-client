'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  MapPin, 
  Star,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  Building2,
  Loader2,
  ChevronLeft
} from 'lucide-react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { apiClient } from '@/lib/api';

interface Company {
  id: string;
  name: string;
  slug: string;
  field: string | null;
  description: string | null;
  logoUrl: string | null;
  _count: {
    jobs: number;
  };
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Accordion state for sidebar
  const [openSections, setOpenSections] = useState({
    workplace: true,
    gender: true,
    companySize: true
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await apiClient.get<Company[]>('/companies');
        setCompanies(res.data || []);
      } catch (error) {
        console.error('Failed to fetch companies', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Pseudo-random generation for mock stats based on string to keep it consistent
  const getMockStats = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    
    const rating = (3.5 + (Math.abs(hash) % 15) / 10).toFixed(1);
    const reviews = (Math.abs(hash) % 200) + 15;
    const salaries = (Math.abs(hash) % 150) + 10;
    
    return { rating, reviews: `${reviews}K`, salaries: `${salaries}K` };
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        
        {/* Header and Search */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 tracking-tight">
            Discover the Best Workplaces
          </h1>

          <div className="w-full max-w-4xl">
            <div className="flex flex-col sm:flex-row shadow-sm border border-slate-200 rounded-lg overflow-hidden bg-white mb-6">
              <div className="flex-1 flex items-center px-4 py-3 sm:border-r border-slate-200">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Job title or keywords" 
                  className="w-full pl-3 pr-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <div className="flex-1 flex items-center px-4 py-3 border-t sm:border-t-0 border-slate-200">
                <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                <select className="w-full pl-2 pr-2 text-sm text-slate-900 bg-transparent focus:outline-none appearance-none cursor-pointer">
                  <option value="">location</option>
                  <option value="ny">New York, NY</option>
                  <option value="sf">San Francisco, CA</option>
                  <option value="remote">Remote</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 sm:py-0 transition-colors h-auto sm:h-[52px]">
                Search
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                Most popular
              </button>
              <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded hover:bg-slate-50 transition-colors">
                Most viewed
              </button>
              <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded hover:bg-slate-50 transition-colors">
                Top-rated
              </button>
              <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded hover:bg-slate-50 transition-colors">
                Most successful
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-[280px] shrink-0">
            <h2 className="text-lg font-bold text-slate-900 mb-6">All Filters</h2>
            
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600">
                  Culture & values
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-slate-900" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600">
                  Company size 100+
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-slate-900" />
                </div>
              </div>
            </div>

            {/* Workplace Accordion */}
            <div className="border-t border-slate-200 py-4">
              <button 
                onClick={() => toggleSection('workplace')}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-bold text-slate-900">Workplace</span>
                {openSections.workplace ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>
              {openSections.workplace && (
                <div className="mt-4 space-y-3">
                  {['Work/life balance', 'Career opportunities', 'Culture & values', 'Senior Management'].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 border border-slate-300 rounded-[2px] flex items-center justify-center group-hover:border-blue-500">
                        {/* Check icon would go here for active state */}
                      </div>
                      <span className="text-sm text-slate-600">{item}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Gender Accordion */}
            <div className="border-t border-slate-200 py-4">
              <button 
                onClick={() => toggleSection('gender')}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-bold text-slate-900">Gender</span>
                {openSections.gender ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>
              {openSections.gender && (
                <div className="mt-4 space-y-3">
                  {['Male', 'Female', 'Other'].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center group-hover:border-blue-500">
                      </div>
                      <span className="text-sm text-slate-600">{item}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Company Size Accordion */}
            <div className="border-t border-slate-200 py-4">
              <button 
                onClick={() => toggleSection('companySize')}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-bold text-slate-900">Company size</span>
                {openSections.companySize ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>
              {openSections.companySize && (
                <div className="mt-4 space-y-3">
                  {['1 - 50', '51 - 200', '201-500', '501 - 1000', '1000+'].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center group-hover:border-blue-500">
                      </div>
                      <span className="text-sm text-slate-600">{item}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main List */}
          <div className="flex-1 flex flex-col gap-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : companies.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-xl border border-slate-200">
                <Building2 className="w-12 h-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-bold text-slate-900">No companies found</h3>
                <p className="text-slate-500">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              companies.map((company) => {
                const stats = getMockStats(company.id);
                return (
                  <Link 
                    href={`/companies/${company.slug}`} 
                    key={company.id}
                    className="flex flex-col sm:flex-row gap-5 p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group relative"
                  >
                    {/* Logo */}
                    <div className="w-[72px] h-[72px] shrink-0 rounded-full border border-slate-100 bg-white flex items-center justify-center overflow-hidden p-2 shadow-sm">
                      {company.logoUrl ? (
                        <img src={company.logoUrl} alt={company.name} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-xl font-bold text-slate-400">{company.name.charAt(0)}</span>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {company.name}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5 mb-2">
                            {/* Assuming headquarters or primary location would be here. Mocking a location if none available */}
                            {company.field ? company.field : 'Technology'} · Global
                          </p>
                        </div>
                        {/* Rating */}
                        <div className="flex items-center gap-1 shrink-0 bg-white shadow-sm border border-amber-100 rounded-full px-2 py-0.5">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-xs font-bold text-slate-700">{stats.rating}</span>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-blue-700 border border-blue-200 bg-blue-50/50 uppercase tracking-wide">
                          Global
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-emerald-700 border border-emerald-200 bg-emerald-50/50 uppercase tracking-wide">
                          Hiring
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                        {company.description || `${company.name} is a leading organization dedicated to excellence and innovation in their field.`}
                      </p>

                      {/* Footer Stats */}
                      <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
                        <span>{company._count.jobs || (Math.abs(company.name.charCodeAt(0)) % 100) + 10} Jobs</span>
                        <span>{stats.reviews} Reviews</span>
                        <span>{stats.salaries} Salaries</span>
                      </div>
                    </div>

                    {/* Right Chevron */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </Link>
                );
              })
            )}

            {/* Pagination */}
            {!isLoading && companies.length > 0 && (
              <div className="flex items-center justify-center gap-1 mt-8">
                <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center border border-slate-900 rounded bg-white text-sm font-bold text-slate-900">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 rounded text-sm font-medium text-slate-600">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 rounded text-sm font-medium text-slate-600">
                  3
                </button>
                <span className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm">...</span>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 rounded text-sm font-medium text-slate-600">
                  9
                </button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 rounded text-sm font-medium text-slate-600">
                  10
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
