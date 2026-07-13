import React from 'react';
import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CompanyStat {
  value: string;
  label: string;
}

interface CompanyTag {
  label: string;
  variant: 'blue' | 'green';
}

interface CompanyItem {
  id: string;
  name: string;
  location: string;
  rating: string;
  tags: CompanyTag[];
  description: string;
  stats: CompanyStat[];
  logoType: 'sandro' | 'microsoft';
}

const TOP_COMPANIES: CompanyItem[] = [
  {
    id: 'bergen-sandro',
    name: 'Bergen',
    location: 'Bergen',
    rating: '4.5',
    tags: [
      { label: 'Global', variant: 'blue' },
      { label: 'Hiring', variant: 'green' },
    ],
    description:
      'Sandro is a French fashion brand known for its chic, contemporary collections, offering men.',
    stats: [
      { value: '50', label: 'Jobs' },
      { value: '103.98K', label: 'Reviews' },
      { value: '88.1K', label: 'Salaries' },
    ],
    logoType: 'sandro',
  },
  {
    id: 'microsoft-la',
    name: 'Microsoft',
    location: 'Los Angeles',
    rating: '4.5',
    tags: [{ label: 'Hiring', variant: 'green' }],
    description:
      'Sandro is a French fashion brand known for its chic, contemporary collections, offering men.',
    stats: [
      { value: '50', label: 'Jobs' },
      { value: '103.98K', label: 'Reviews' },
      { value: '88.1K', label: 'Salaries' },
    ],
    logoType: 'microsoft',
  },
  {
    id: 'sandro-ny',
    name: 'sandro',
    location: 'New York',
    rating: '4.5',
    tags: [
      { label: 'Startup', variant: 'blue' },
      { label: 'Hiring', variant: 'green' },
    ],
    description:
      'Sandro is a French fashion brand known for its chic, contemporary collections, offering men.',
    stats: [
      { value: '50', label: 'Jobs' },
      { value: '103.98K', label: 'Reviews' },
      { value: '88.1K', label: 'Salaries' },
    ],
    logoType: 'sandro',
  },
];

export function TopCompanies() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#EFF5FF] dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header with Title and 'More >' Action */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end mb-12">
          <div className="text-center sm:text-left space-y-2 flex-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              Top companies
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">
              The last job offers Upload
            </p>
          </div>

          <Link
            href="/companies"
            className="group flex items-center gap-1 font-bold text-sm sm:text-base text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors py-2 px-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40"
          >
            <span>More</span>
            <ChevronRight className="size-4.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3-Column Company Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOP_COMPANIES.map((company) => (
            <Card
              key={company.id}
              className="group relative overflow-hidden rounded-2xl border border-blue-100/80 dark:border-border/60 bg-white dark:bg-zinc-900/90 p-6 shadow-md shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-600/10 hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Subtle Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/0 via-transparent to-blue-600/0 group-hover:from-blue-600/[0.03] group-hover:to-indigo-600/[0.03] transition-colors duration-300 pointer-events-none" />

              <div>
                {/* Top Row: Logo + Name & Location + Rating */}
                <div className="flex items-start justify-between gap-4">
                  
                  <div className="flex items-start gap-3.5 min-w-0">
                    {/* Logo Box */}
                    <div className="size-16 rounded-2xl border border-border/60 bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center p-2.5 shrink-0 group-hover:scale-105 transition-transform duration-300">
                      {company.logoType === 'microsoft' ? (
                        <div className="grid grid-cols-2 gap-0.5 size-8">
                          <div className="bg-[#F25022] rounded-[1px]" />
                          <div className="bg-[#7FBA00] rounded-[1px]" />
                          <div className="bg-[#00A4EF] rounded-[1px]" />
                          <div className="bg-[#FFB900] rounded-[1px]" />
                        </div>
                      ) : (
                        <span className="font-serif text-[13px] tracking-widest font-medium text-foreground">
                          sandro
                        </span>
                      )}
                    </div>

                    {/* Company Name & Location */}
                    <div className="space-y-0.5 min-w-0 pt-0.5">
                      <h3 className="font-bold text-xl text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {company.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                        {company.location}
                      </p>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 font-extrabold text-sm text-amber-500 shrink-0 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-lg border border-amber-200/60 dark:border-amber-900/40">
                    <Star className="size-3.5 fill-amber-500 text-amber-500" />
                    <span>{company.rating}</span>
                  </div>
                </div>

                {/* Tags Row */}
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {company.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${
                        tag.variant === 'blue'
                          ? 'border-blue-500 text-blue-600 bg-blue-50/60 dark:bg-blue-950/50 dark:text-blue-400'
                          : 'border-emerald-500 text-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/50 dark:text-emerald-400'
                      }`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>

                {/* Company Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-3.5 group-hover:text-foreground/80 transition-colors duration-200">
                  {company.description}
                </p>
              </div>

              {/* Bottom Row Stats Footer */}
              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                {company.stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <span className="font-extrabold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {stat.value}
                    </span>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
