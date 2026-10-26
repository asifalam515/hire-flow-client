'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Building2, TrendingUp, Users, Shield, Zap } from 'lucide-react';

interface FeaturedCompany {
  id: string;
  name: string;
  field: string;
  location: string;
  openRoles: number;
  description: string;
  logoLetter: string;
  logoBg: string;
}

const FEATURED_COMPANIES: FeaturedCompany[] = [
  {
    id: 'tech-innovators',
    name: 'Tech Innovators Inc.',
    field: 'Cloud & AI Infrastructure',
    location: 'San Francisco, CA',
    openRoles: 15,
    description: 'Pioneering next-generation distributed systems and high-throughput vector platforms.',
    logoLetter: 'TI',
    logoBg: 'bg-blue-600',
  },
  {
    id: 'green-agri',
    name: 'Green Agri Tech',
    field: 'AgriTech & Robotics',
    location: 'Austin, TX',
    openRoles: 8,
    description: 'Building automated computer vision and drone systems for precision agriculture.',
    logoLetter: 'GA',
    logoBg: 'bg-emerald-600',
  },
  {
    id: 'apex-crypto',
    name: 'Apex Systems',
    field: 'Fintech & Security',
    location: 'New York, NY',
    openRoles: 11,
    description: 'Ultra-low latency settlement rails and institutional cryptographic infrastructure.',
    logoLetter: 'AS',
    logoBg: 'bg-indigo-600',
  },
];

const METRICS = [
  { value: '< 12h', label: 'Average Time to First Screen', desc: 'Accelerated through automated vector parsing' },
  { value: '99.4%', label: 'AI Match Precision', desc: 'Cosine similarity between resume & role requirements' },
  { value: '10,000+', label: 'Pre-Vetted Candidates', desc: 'Active engineers, designers, and product leaders' },
  { value: '< 50ms', label: 'Real-Time Sync Latency', desc: 'Sub-50ms WebSocket updates across all stages' },
];

export function TopCompanies() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 linear-canvas linear-grid border-t border-white/[0.06] transition-colors">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full linear-pill text-xs font-semibold text-[#8a8f98]">
            <Zap className="size-3 text-blue-400" />
            <span>High-Velocity Engineering Teams</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#f7f8f8]">
            Trusted by teams that ship fast.
          </h2>
          <p className="text-sm sm:text-base text-[#8a8f98] font-normal max-w-xl mx-auto">
            From seed-stage startups to scaling enterprises, modern teams use HireFlow to build world-class engineering organizations.
          </p>
        </div>

        {/* 4-Stat Metrics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {METRICS.map((metric) => (
            <div 
              key={metric.label}
              className="p-5 rounded-xl linear-card linear-card-hover space-y-1.5"
            >
              <span className="text-2xl sm:text-3xl font-mono font-extrabold text-[#f7f8f8]">
                {metric.value}
              </span>
              <p className="text-xs font-semibold text-[#f7f8f8]">{metric.label}</p>
              <p className="text-[11px] text-[#8a8f98] leading-relaxed">{metric.desc}</p>
            </div>
          ))}
        </div>

        {/* Featured Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURED_COMPANIES.map((company) => (
            <div
              key={company.id}
              className="p-6 rounded-2xl linear-card linear-card-hover flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`size-11 rounded-xl ${company.logoBg} text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm border border-white/20`}>
                      {company.logoLetter}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#f7f8f8] group-hover:text-blue-400 transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-xs text-[#8a8f98]">{company.location}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {company.openRoles} Open Roles
                  </span>
                </div>

                <p className="text-xs text-[#8a8f98] leading-relaxed">
                  {company.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs">
                <span className="text-[#8a8f98] text-[11px]">{company.field}</span>
                <Link
                  href="/companies"
                  className="font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 text-[11px] group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Explore</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
