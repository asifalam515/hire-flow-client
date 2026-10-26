'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface FooterSection {
  title: string;
  links: { label: string; href: string; isExternal?: boolean }[];
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Platform Overview', href: '/' },
      { label: 'Find Jobs', href: '/jobs' },
      { label: 'Verified Companies', href: '/companies' },
      { label: 'Resume & CV Builder', href: '/cv-builder' },
      { label: 'ATS Pipeline Demo', href: '/login' },
    ],
  },
  {
    title: 'For Employers',
    links: [
      { label: 'Post a New Job', href: '/employer/post-job' },
      { label: 'Employer Dashboard', href: '/employer/dashboard' },
      { label: 'Candidate Scoring', href: '/employer/dashboard' },
      { label: 'Company Profile', href: '/employer/dashboard/profile' },
      { label: 'Employer Sign Up', href: '/employer/sign-up' },
    ],
  },
  {
    title: 'Platform Architecture',
    links: [
      { label: 'pgvector AI Engine', href: '/' },
      { label: 'WebSocket Gateway', href: '/' },
      { label: 'BullMQ Queues', href: '/' },
      { label: 'Multi-Tenant RBAC', href: '/' },
      { label: 'API Health Status', href: '/api/v1/health', isExternal: true },
    ],
  },
  {
    title: 'Account & Trust',
    links: [
      { label: 'Candidate Login', href: '/login' },
      { label: 'Candidate Sign Up', href: '/candidates/sign-up' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'About HireFlow', href: '/about' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full linear-canvas border-t border-white/[0.06] text-[#8a8f98] transition-colors">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer: Brand + Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info (4 Cols) */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group focus:outline-none">
              <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 border border-white/20 shadow-[0_0_16px_rgba(59,130,246,0.4)]">
                <Sparkles className="size-4 text-white" />
              </div>
              <div className="flex items-center tracking-tight text-xl font-bold text-[#f7f8f8]">
                <span>Hire</span>
                <span className="text-blue-500 ml-0.5">Flow</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-white/[0.05] text-[#8a8f98] border border-white/[0.08]">
                ATS
              </span>
            </Link>

            <p className="text-xs text-[#8a8f98] leading-relaxed max-w-sm">
              The high-velocity Applicant Tracking System & job marketplace for modern technology teams. Powered by pgvector embeddings, WebSockets, and real-time candidate pipelines.
            </p>

            {/* Live Operational Status Pill */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full linear-pill text-xs font-mono text-[#f7f8f8]">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Dynamic Link Columns (8 Cols) */}
          <div className="col-span-2 md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#f7f8f8]">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs text-[#8a8f98] hover:text-[#f7f8f8] transition-colors duration-160 inline-flex items-center gap-0.5"
                      >
                        <span>{link.label}</span>
                        {link.isExternal && <ArrowUpRight className="size-2.5 opacity-60" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Footer: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8a8f98]">
          <p>© {new Date().getFullYear()} HireFlow Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#f7f8f8] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-[#f7f8f8] transition-colors">
              About
            </Link>
            <span className="text-white/10">|</span>
            <span className="font-mono text-[11px] text-[#8a8f98]/70">
              v2.0 • AeroATS
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
