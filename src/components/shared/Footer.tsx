import React from 'react';
import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

const SERVICES_LINKS: FooterLink[] = [
  { label: 'Find job', href: '/jobs' },
  { label: 'Create resume', href: '/resume' },
  { label: 'Search company', href: '/companies' },
  { label: 'Pricing Plan', href: '/pricing' },
];

const QUICK_LINKS: FooterLink[] = [
  { label: 'Blog', href: '/blog' },
  { label: 'Help center', href: '/help' },
  { label: 'Contact us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'About us', href: '/about' },
];

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-zinc-950 border-t border-border/60 transition-colors duration-300">
      
      {/* Top Main Footer Grid */}
      <div className="mx-auto max-w-7xl py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Platform Description */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="size-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform duration-200">
                HF
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Hire Flow
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm font-medium">
              Hire Flow is a smart job search and recruitment platform that connects
              job seekers with employers. With fast search, professional resume
              building, and intelligent matching, Hire Flow makes hiring and job
              hunting easy and efficient.
            </p>
          </div>

          {/* Column 2: Our Services Links */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-bold text-base sm:text-lg text-foreground">
              Our services
            </h3>
            <ul className="space-y-3">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-base sm:text-lg text-foreground">
              Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us & Social Icons */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-bold text-base sm:text-lg text-foreground">
              Contact Us
            </h3>
            
            {/* Social Media Buttons using high-fidelity inline SVG icons */}
            <div className="flex items-center gap-2.5 pt-0.5">
              
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="size-9 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 flex items-center justify-center text-rose-600 dark:text-rose-400 hover:scale-110 hover:shadow-md hover:bg-rose-500 hover:text-white transition-all duration-300"
              >
                <svg className="size-4.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="size-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:scale-110 hover:shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <svg className="size-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="size-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:scale-110 hover:shadow-md hover:bg-emerald-600 hover:text-white transition-all duration-300"
              >
                <svg className="size-4.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="size-9 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200/60 dark:border-sky-900/40 flex items-center justify-center text-sky-600 dark:text-sky-400 hover:scale-110 hover:shadow-md hover:bg-sky-600 hover:text-white transition-all duration-300"
              >
                <svg className="size-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="size-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 flex items-center justify-center text-foreground hover:scale-110 hover:shadow-md hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
              >
                <span className="font-extrabold text-sm font-sans">𝕏</span>
              </a>

            </div>

            {/* Address & Phone */}
            <div className="space-y-3 pt-3 text-xs sm:text-sm font-medium text-muted-foreground">
              <div className="flex items-start gap-2.5">
                <MapPin className="size-4.5 text-muted-foreground shrink-0 mt-0.5" />
                <span>1500 Marilla St, Dallas, TX 75201</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="size-4.5 text-muted-foreground shrink-0" />
                <span>1(647)558-5560</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Copyright & Payment Badges Bar */}
      <div className="w-full bg-neutral-100/80 dark:bg-zinc-900/80 border-t border-border/50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-muted-foreground">
          
          {/* Copyright Notice */}
          <div>
            Hire Flow Copyright © {new Date().getFullYear()}
          </div>

          {/* Payment Method Badges Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <div className="bg-white dark:bg-zinc-800 rounded-lg px-2.5 py-1 border border-border/60 shadow-2xs font-extrabold text-[#1A1F71] dark:text-blue-400 text-xs tracking-tight">
              VISA
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg px-2.5 py-1 border border-border/60 shadow-2xs font-extrabold text-[#6772E5] dark:text-indigo-400 text-xs tracking-tight">
              stripe
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg px-2.5 py-1 border border-border/60 shadow-2xs font-extrabold text-[#003087] dark:text-sky-400 text-xs tracking-tight">
              PayPal
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg px-2.5 py-1 border border-border/60 shadow-2xs font-bold text-foreground text-xs flex items-center gap-1">
              <span className="font-extrabold text-blue-600">G</span> Pay
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg px-2.5 py-1 border border-border/60 shadow-2xs font-bold text-foreground text-xs tracking-tight">
              Mastercard
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg px-2.5 py-1 border border-border/60 shadow-2xs font-bold text-foreground text-xs flex items-center gap-1">
              <span></span> Pay
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
