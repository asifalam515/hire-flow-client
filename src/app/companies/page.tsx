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

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [sortMode, setSortMode] = useState('popular');
  const [selectedWorkplaces, setSelectedWorkplaces] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedCompanySize, setSelectedCompanySize] = useState<string>('');

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
    const absHash = Math.abs(hash);
    
    const rating = (3.5 + (absHash % 15) / 10).toFixed(1);
    const reviews = (absHash % 200) + 15;
    const salaries = (absHash % 150) + 10;
    
    // Assign mock filter properties
    const workplacesList = ['Work/life balance', 'Career opportunities', 'Culture & values', 'Senior Management'];
    const assignedWorkplaces = workplacesList.filter((_, idx) => (absHash + idx) % 2 === 0);
    
    const genders = ['Male', 'Female', 'Other'];
    const gender = genders[absHash % genders.length];
    
    const sizes = ['1 - 50', '51 - 200', '201-500', '501 - 1000', '1000+'];
    const size = sizes[absHash % sizes.length];

    const locations = ['New York, NY', 'San Francisco, CA', 'Remote', 'London, UK', 'Toronto, CA'];
    const loc = locations[absHash % locations.length];
    
    return { rating, reviews: `${reviews}K`, salaries: `${salaries}K`, workplaces: assignedWorkplaces, gender, size, location: loc };
  };

  const filteredCompanies = companies.filter(company => {
    const stats = getMockStats(company.id);
    
    if (searchQuery && !company.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (location && stats.location !== location) {
      return false;
    }

    if (selectedWorkplaces.length > 0) {
      if (!selectedWorkplaces.some(wp => stats.workplaces.includes(wp))) {
        return false;
      }
    }

    if (selectedGender && stats.gender !== selectedGender) {
      return false;
    }

    if (selectedCompanySize && stats.size !== selectedCompanySize) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    const statsA = getMockStats(a.id);
    const statsB = getMockStats(b.id);
    if (sortMode === 'rated') return parseFloat(statsB.rating) - parseFloat(statsA.rating);
    if (sortMode === 'viewed') return parseInt(statsB.reviews) - parseInt(statsA.reviews);
    if (sortMode === 'successful') return parseInt(statsB.salaries) - parseInt(statsA.salaries);
    const jobsA = a._count.jobs || 1;
    const jobsB = b._count.jobs || 1;
    return jobsB - jobsA;
  });

  const clearFilter = (type: string, val?: string) => {
    if (type === 'workplace' && val) setSelectedWorkplaces(prev => prev.filter(w => w !== val));
    if (type === 'gender') setSelectedGender('');
    if (type === 'companySize') setSelectedCompanySize('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#08090a] transition-colors duration-200">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        
        {/* Header and Search */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-[#f7f8f8] mb-8 tracking-tight">
            Discover the Best Workplaces
          </h1>

          <div className="w-full max-w-4xl">
            <div className="flex flex-col sm:flex-row shadow-sm border border-slate-200 dark:border-white/[0.08] rounded-xl overflow-hidden bg-white dark:bg-[#0f1011] mb-6">
              <div className="flex-1 flex items-center px-4 py-3 sm:border-r border-slate-200 dark:border-white/[0.08]">
                <Search className="w-5 h-5 text-slate-400 dark:text-zinc-500 shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title or keywords" 
                  className="w-full pl-3 pr-2 text-sm text-slate-900 dark:text-[#f7f8f8] placeholder:text-slate-400 dark:placeholder:text-zinc-500 bg-transparent focus:outline-none"
                />
              </div>
              <div className="flex-1 flex items-center px-4 py-3 border-t sm:border-t-0 border-slate-200 dark:border-white/[0.08]">
                <MapPin className="w-5 h-5 text-slate-400 dark:text-zinc-500 shrink-0" />
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-2 pr-2 text-sm text-slate-900 dark:text-[#f7f8f8] bg-transparent focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="" className="dark:bg-[#0f1011] dark:text-[#f7f8f8]">location</option>
                  <option value="New York, NY" className="dark:bg-[#0f1011] dark:text-[#f7f8f8]">New York, NY</option>
                  <option value="San Francisco, CA" className="dark:bg-[#0f1011] dark:text-[#f7f8f8]">San Francisco, CA</option>
                  <option value="Remote" className="dark:bg-[#0f1011] dark:text-[#f7f8f8]">Remote</option>
                  <option value="London, UK" className="dark:bg-[#0f1011] dark:text-[#f7f8f8]">London, UK</option>
                  <option value="Toronto, CA" className="dark:bg-[#0f1011] dark:text-[#f7f8f8]">Toronto, CA</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 dark:text-zinc-500 shrink-0" />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 sm:py-0 transition-colors h-auto sm:h-[52px]">
                Search
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button 
                onClick={() => setSortMode('popular')}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${sortMode === 'popular' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white dark:bg-[#0f1011] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-[#8a8f98] hover:bg-slate-50 dark:hover:bg-white/[0.04]'}`}
              >
                Most popular
              </button>
              <button 
                onClick={() => setSortMode('viewed')}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${sortMode === 'viewed' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white dark:bg-[#0f1011] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-[#8a8f98] hover:bg-slate-50 dark:hover:bg-white/[0.04]'}`}
              >
                Most viewed
              </button>
              <button 
                onClick={() => setSortMode('rated')}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${sortMode === 'rated' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white dark:bg-[#0f1011] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-[#8a8f98] hover:bg-slate-50 dark:hover:bg-white/[0.04]'}`}
              >
                Top-rated
              </button>
              <button 
                onClick={() => setSortMode('successful')}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${sortMode === 'successful' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white dark:bg-[#0f1011] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-[#8a8f98] hover:bg-slate-50 dark:hover:bg-white/[0.04]'}`}
              >
                Most successful
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-[280px] shrink-0">
            <h2 className="text-lg font-bold text-slate-900 dark:text-[#f7f8f8] mb-6">All Filters</h2>
            
            {(selectedWorkplaces.length > 0 || selectedGender || selectedCompanySize) && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-900 dark:text-[#f7f8f8] mb-3">Active Filters</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedWorkplaces.map(wp => (
                    <div key={wp} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-white/[0.06] rounded-md text-xs font-medium text-slate-700 dark:text-[#8a8f98] border border-slate-200 dark:border-white/[0.08]">
                      {wp}
                      <X onClick={() => clearFilter('workplace', wp)} className="w-3.5 h-3.5 cursor-pointer hover:text-slate-900 dark:hover:text-[#f7f8f8]" />
                    </div>
                  ))}
                  {selectedGender && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-white/[0.06] rounded-md text-xs font-medium text-slate-700 dark:text-[#8a8f98] border border-slate-200 dark:border-white/[0.08]">
                      {selectedGender}
                      <X onClick={() => clearFilter('gender')} className="w-3.5 h-3.5 cursor-pointer hover:text-slate-900 dark:hover:text-[#f7f8f8]" />
                    </div>
                  )}
                  {selectedCompanySize && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-white/[0.06] rounded-md text-xs font-medium text-slate-700 dark:text-[#8a8f98] border border-slate-200 dark:border-white/[0.08]">
                      {selectedCompanySize}
                      <X onClick={() => clearFilter('companySize')} className="w-3.5 h-3.5 cursor-pointer hover:text-slate-900 dark:hover:text-[#f7f8f8]" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Workplace Accordion */}
            <div className="border-t border-slate-200 dark:border-white/[0.08] py-4">
              <button 
                onClick={() => toggleSection('workplace')}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-bold text-slate-900 dark:text-[#f7f8f8]">Workplace</span>
                {openSections.workplace ? <ChevronUp className="w-4 h-4 text-slate-500 dark:text-[#8a8f98]" /> : <ChevronDown className="w-4 h-4 text-slate-500 dark:text-[#8a8f98]" />}
              </button>
              {openSections.workplace && (
                <div className="mt-4 space-y-3">
                  {['Work/life balance', 'Career opportunities', 'Culture & values', 'Senior Management'].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <div 
                        onClick={() => {
                          setSelectedWorkplaces(prev => 
                            prev.includes(item) ? prev.filter(w => w !== item) : [...prev, item]
                          )
                        }}
                        className={`w-4 h-4 border rounded-[3px] flex items-center justify-center transition-colors ${
                          selectedWorkplaces.includes(item) ? 'bg-blue-600 border-blue-600' : 'border-slate-300 dark:border-zinc-700 group-hover:border-blue-500'
                        }`}
                      >
                        {selectedWorkplaces.includes(item) && <div className="w-2 h-2 bg-white rounded-xs" />}
                      </div>
                      <span className="text-sm text-slate-600 dark:text-[#8a8f98] group-hover:text-slate-900 dark:group-hover:text-[#f7f8f8] transition-colors">{item}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Gender Accordion */}
            <div className="border-t border-slate-200 dark:border-white/[0.08] py-4">
              <button 
                onClick={() => toggleSection('gender')}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-bold text-slate-900 dark:text-[#f7f8f8]">Gender</span>
                {openSections.gender ? <ChevronUp className="w-4 h-4 text-slate-500 dark:text-[#8a8f98]" /> : <ChevronDown className="w-4 h-4 text-slate-500 dark:text-[#8a8f98]" />}
              </button>
              {openSections.gender && (
                <div className="mt-4 space-y-3">
                  {['Male', 'Female', 'Other'].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <div 
                        onClick={() => setSelectedGender(selectedGender === item ? '' : item)}
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          selectedGender === item ? 'border-blue-600' : 'border-slate-300 dark:border-zinc-700 group-hover:border-blue-500'
                        }`}
                      >
                        {selectedGender === item && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                      </div>
                      <span className="text-sm text-slate-600 dark:text-[#8a8f98] group-hover:text-slate-900 dark:group-hover:text-[#f7f8f8] transition-colors">{item}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Company Size Accordion */}
            <div className="border-t border-slate-200 dark:border-white/[0.08] py-4">
              <button 
                onClick={() => toggleSection('companySize')}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-bold text-slate-900 dark:text-[#f7f8f8]">Company size</span>
                {openSections.companySize ? <ChevronUp className="w-4 h-4 text-slate-500 dark:text-[#8a8f98]" /> : <ChevronDown className="w-4 h-4 text-slate-500 dark:text-[#8a8f98]" />}
              </button>
              {openSections.companySize && (
                <div className="mt-4 space-y-3">
                  {['1 - 50', '51 - 200', '201-500', '501 - 1000', '1000+'].map((item) => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                      <div 
                        onClick={() => setSelectedCompanySize(selectedCompanySize === item ? '' : item)}
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          selectedCompanySize === item ? 'border-blue-600' : 'border-slate-300 dark:border-zinc-700 group-hover:border-blue-500'
                        }`}
                      >
                        {selectedCompanySize === item && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                      </div>
                      <span className="text-sm text-slate-600 dark:text-[#8a8f98] group-hover:text-slate-900 dark:group-hover:text-[#f7f8f8] transition-colors">{item}</span>
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
            ) : filteredCompanies.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#0f1011] rounded-2xl border border-slate-200 dark:border-white/[0.08]">
                <Building2 className="w-12 h-12 text-slate-400 dark:text-zinc-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-[#f7f8f8]">No companies found</h3>
                <p className="text-slate-500 dark:text-[#8a8f98]">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              filteredCompanies.map((company) => {
                const stats = getMockStats(company.id);
                return (
                  <Link 
                    href={`/companies/${company.slug}`} 
                    key={company.id}
                    className="flex flex-col sm:flex-row gap-5 p-5 bg-white dark:bg-[#0f1011] border border-slate-200 dark:border-white/[0.08] rounded-2xl hover:border-blue-400/50 dark:hover:border-blue-500/40 hover:shadow-lg dark:hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.6)] transition-all group relative"
                  >
                    {/* Logo */}
                    <div className="w-[72px] h-[72px] shrink-0 rounded-2xl border border-slate-100 dark:border-white/[0.08] bg-white dark:bg-[#16181a] flex items-center justify-center overflow-hidden p-2 shadow-xs">
                      {company.logoUrl ? (
                        <img src={company.logoUrl} alt={company.name} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-xl font-bold text-slate-600 dark:text-zinc-400">{company.name.charAt(0)}</span>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-[#f7f8f8] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {company.name}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-[#8a8f98] mt-0.5 mb-2">
                            {company.field ? company.field : 'Technology'} · {stats.location}
                          </p>
                        </div>
                        {/* Rating */}
                        <div className="flex items-center gap-1 shrink-0 bg-amber-50/60 dark:bg-amber-950/30 shadow-xs border border-amber-200/60 dark:border-amber-800/40 rounded-full px-2 py-0.5">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span className="text-xs font-bold text-amber-900 dark:text-amber-300">{stats.rating}</span>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50 bg-blue-50/70 dark:bg-blue-950/40 uppercase tracking-wide">
                          Global
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/70 dark:bg-emerald-950/40 uppercase tracking-wide">
                          Hiring
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-600 dark:text-[#8a8f98] line-clamp-2 mb-4 leading-relaxed">
                        {company.description || `${company.name} is a leading organization dedicated to excellence and innovation in their field.`}
                      </p>

                      {/* Footer Stats */}
                      <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-[#8a8f98] font-medium">
                        <span>{company._count.jobs || (Math.abs(company.name.charCodeAt(0)) % 100) + 10} Jobs</span>
                        <span>{stats.reviews} Reviews</span>
                        <span>{stats.salaries} Salaries</span>
                      </div>
                    </div>

                    {/* Right Chevron */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                      <ChevronRight className="w-5 h-5 text-slate-400 dark:text-zinc-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </div>
                  </Link>
                );
              })
            )}

            {/* Pagination */}
            {!isLoading && companies.length > 0 && (
              <div className="flex items-center justify-center gap-1 mt-8">
                <button className="w-8 h-8 flex items-center justify-center text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-[#f7f8f8] transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center border border-slate-900 dark:border-white rounded-lg bg-slate-900 dark:bg-white text-sm font-bold text-white dark:text-[#08090a]">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0f1011] rounded-lg text-sm font-medium text-slate-600 dark:text-[#8a8f98] hover:bg-slate-50 dark:hover:bg-white/[0.04]">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0f1011] rounded-lg text-sm font-medium text-slate-600 dark:text-[#8a8f98] hover:bg-slate-50 dark:hover:bg-white/[0.04]">
                  3
                </button>
                <span className="w-8 h-8 flex items-center justify-center text-slate-400 dark:text-zinc-600 text-sm">...</span>
                <button className="w-8 h-8 flex items-center justify-center border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0f1011] rounded-lg text-sm font-medium text-slate-600 dark:text-[#8a8f98] hover:bg-slate-50 dark:hover:bg-white/[0.04]">
                  9
                </button>
                <button className="w-8 h-8 flex items-center justify-center border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0f1011] rounded-lg text-sm font-medium text-slate-600 dark:text-[#8a8f98] hover:bg-slate-50 dark:hover:bg-white/[0.04]">
                  10
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-[#f7f8f8] transition-colors">
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
