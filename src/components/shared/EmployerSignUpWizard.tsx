'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  RefreshCw,
  ScanLine,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  dotIndex: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Robert Fox',
    role: 'Recruiter at Apple',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
    quote: 'This website made job searching so much easier. The interface is user-friendly, the filters are precise, and I quickly saw relevant opportunities. It truly understands what job seekers need.',
    dotIndex: 2
  },
  {
    name: 'Bessie Cooper',
    role: 'Hiring Manager at X',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop',
    quote: 'After trying several job portals, this one stood out. The navigation was clean, the job quality impressive, and applying was fast and professional. I found great matches for my background.',
    dotIndex: 3
  },
  {
    name: 'Arlene McCoy',
    role: 'Technical Recruiter at Microsoft',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop',
    quote: 'My experience on this platform was genuinely excellent. I could explore job openings without feeling lost or overwhelmed, and the ability to track my applications helped me feel organized and confident every step of the way.',
    dotIndex: 1
  },
  {
    name: 'Wade Warren',
    role: 'Talent Acquisition Director at Google',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop',
    quote: 'Our hiring velocity increased by 3x within two weeks of transitioning our employer account to Joblin. The automated candidate filtering is unmatched.',
    dotIndex: 0
  },
  {
    name: 'Devon Lane',
    role: 'HR Lead at Netflix',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop',
    quote: 'The clean workflow and verified candidate pipeline make this the gold standard for tech recruiters. Highly recommended for any serious talent team.',
    dotIndex: 4
  }
];

export function EmployerSignUpWizard() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State - Step 1
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form State - Step 2
  const [companyName, setCompanyName] = useState('');
  const [companyField, setCompanyField] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Form State - Step 3 (OTP)
  const [otp, setOtp] = useState<string[]>(['1', '', '', '']);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(299); // 4 minutes 59 seconds

  // Testimonial Carousel State
  const [customTestimonialIndex, setCustomTestimonialIndex] = useState<number | null>(null);

  const activeTestimonialIndex =
    customTestimonialIndex !== null
      ? customTestimonialIndex
      : step === 1
      ? 0
      : step === 2
      ? 1
      : 2;

  // Expiry Timer countdown for Step 3
  useEffect(() => {
    if (step !== 3) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto advance focus
    if (value && index < 3 && otpInputRefs.current[index + 1]) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomTestimonialIndex(null);
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomTestimonialIndex(null);
    setStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join('').length === 4) {
      setCustomTestimonialIndex(null);
      setStep(4); // Success completed state
    }
  };

  const currentTestimonial = TESTIMONIALS[activeTestimonialIndex] || TESTIMONIALS[0];

  return (
    <div className="w-full bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xl overflow-hidden min-h-[720px] grid grid-cols-1 lg:grid-cols-12 transition-all">
      {/* Left Form Area (Col 1 to 6) */}
      <div className="col-span-1 lg:col-span-6 xl:col-span-6 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14 relative z-10">
        
        {/* Top Navigation & Step Indicator Bar */}
        <div>
          {step === 1 && (
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="h-1.5 w-12 sm:w-16 rounded-full bg-blue-600 dark:bg-blue-500 transition-all duration-300 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
              <span className="h-1.5 w-12 sm:w-16 rounded-full bg-blue-100 dark:bg-blue-900/40 transition-all duration-300" />
              <span className="h-1.5 w-12 sm:w-16 rounded-full bg-blue-100 dark:bg-blue-900/40 transition-all duration-300" />
            </div>
          )}

          {step === 2 && (
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="h-1.5 w-12 sm:w-16 rounded-full bg-blue-600 dark:bg-blue-500 transition-all duration-300" />
              <span className="h-1.5 w-12 sm:w-16 rounded-full bg-blue-600 dark:bg-blue-500 transition-all duration-300 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
              <span className="h-1.5 w-12 sm:w-16 rounded-full bg-blue-100 dark:bg-blue-900/40 transition-all duration-300" />
            </div>
          )}

          {step > 1 && step < 4 && (
            <button
              type="button"
              onClick={() => {
                setCustomTestimonialIndex(null);
                setStep((prev) => (prev === 2 ? 1 : prev === 3 ? 2 : prev === 4 ? 3 : 1));
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-4 focus:outline-none cursor-pointer"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to previous step</span>
            </button>
          )}

          {/* Joblin Brand Header */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-block group focus:outline-none">
              <div className="flex items-center justify-center tracking-tighter text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white select-none">
                <span className="relative inline-block">
                  <span className="absolute -top-1 left-2 size-2 rounded-full bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.8)]" />
                  j
                </span>
                <span className="relative inline-block">
                  <span className="absolute -top-1 left-1.5 size-2 rounded-full bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.8)]" />
                  o
                </span>
                <span>bl</span>
                <span className="relative inline-block">
                  <span className="absolute -top-1 left-1 size-2 rounded-full bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.8)]" />
                  i
                </span>
                <span>n</span>
              </div>
            </Link>

            {/* Step 3 Special Job Seeker Link below logo */}
            {step === 3 && (
              <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2">
                Are You Job Seeker?{' '}
                <Link
                  href="/candidates/sign-up"
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5 ml-0.5"
                >
                  Click Here
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Form Body - Step 1: Personal Details */}
        {step === 1 && (
          <div className="flex-1 max-w-md mx-auto w-full animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="text-center sm:text-left mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">
                Give us your company information
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Please enter your personal details to set up your account and personalize your experience
              </p>
            </div>

            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  First Name<span className="text-red-500 ml-0.5">*</span>
                </label>
                <Input
                  required
                  type="text"
                  placeholder="e.g. Robert"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-11 sm:h-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 px-4 font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Last Name<span className="text-red-500 ml-0.5">*</span>
                </label>
                <Input
                  required
                  type="text"
                  placeholder="e.g. Fox"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-11 sm:h-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 px-4 font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Email<span className="text-red-500 ml-0.5">*</span>
                </label>
                <Input
                  required
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 sm:h-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 px-4 font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Password<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="relative">
                  <Input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password (min. 8 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 sm:h-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 pl-4 pr-11 font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Confirm Password<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="relative">
                  <Input
                    required
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password to confirm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11 sm:h-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 pl-4 pr-11 font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors focus:outline-none"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white font-bold text-sm sm:text-base shadow-lg shadow-zinc-900/15 dark:shadow-none transition-all mt-6 cursor-pointer"
              >
                Sign up
              </Button>
            </form>

            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
              <span className="relative bg-white dark:bg-zinc-950 px-3 text-xs font-semibold text-zinc-400 tracking-wider uppercase">
                OR
              </span>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full h-12 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 font-semibold text-sm text-zinc-700 dark:text-zinc-300 transition-all flex items-center justify-center gap-3 shadow-sm"
            >
              <svg className="size-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.3 0 6.08-1.09 8.11-2.96l-3.88-3.05c-1.1.74-2.5 1.18-4.23 1.18-3.25 0-6.01-2.19-7-5.14H1.01v3.16C3.04 21.2 7.23 24 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5 14.03c-.25-.74-.4-1.54-.4-2.03s.15-1.29.4-2.03V6.81H1.01C.37 8.09 0 9.51 0 12c0 2.49.37 3.91 1.01 5.19l3.99-3.16Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.77c1.79 0 3.41.62 4.68 1.83l3.51-3.51C18.07 1.18 15.3 0 12 0 7.23 0 3.04 2.8 1.01 6.81l3.99 3.16c1-2.95 3.75-5.2 7-5.2Z"
                />
              </svg>
              <span>Login with Google</span>
            </button>
          </div>
        )}

        {/* Form Body - Step 2: Company Setup */}
        {step === 2 && (
          <div className="flex-1 max-w-md mx-auto w-full animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="text-center sm:text-left mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">
                Give us your company information
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Please provide your company details to complete your profile and access all features
              </p>
            </div>

            <form onSubmit={handleStep2Submit} className="space-y-4">
              {/* Logo Uploader */}
              <div className="flex flex-col items-center justify-center my-4">
                <label
                  htmlFor="logo-upload"
                  className="relative size-20 sm:size-24 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/40 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50/20 dark:hover:bg-blue-950/20 transition-all flex items-center justify-center cursor-pointer group shadow-inner overflow-hidden"
                >
                  {logoPreview ? (
                    <img src={logoPreview} alt="Uploaded logo" className="size-full object-cover" />
                  ) : (
                    <ScanLine className="size-6 sm:size-7 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  )}
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-2">
                  {logoFile ? logoFile.name : 'Upload your logo'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Company name<span className="text-red-500 ml-0.5">*</span>
                </label>
                <Input
                  required
                  type="text"
                  placeholder="e.g. Apple Inc. or Joblin Technologies"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="h-11 sm:h-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 px-4 font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Company Filed
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Information Technology, FinTech, Healthcare"
                  value={companyField}
                  onChange={(e) => setCompanyField(e.target.value)}
                  className="h-11 sm:h-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 px-4 font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  company description<span className="text-red-500 ml-0.5">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  maxLength={512}
                  placeholder="Tell us about your company's mission, culture, and what makes it a great place to work..."
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-3.5 font-medium text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all outline-none resize-none"
                />
                <div className="flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500 mt-1 px-1">
                  <span>This is a more information</span>
                  <span>{companyDescription.length || 256}/512</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white font-bold text-sm sm:text-base shadow-lg shadow-zinc-900/15 dark:shadow-none transition-all cursor-pointer"
                >
                  Finish Up
                </Button>
                
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-full text-center text-xs sm:text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors py-3 mt-1 block cursor-pointer"
                >
                  Skip
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Form Body - Step 3: Email OTP Verification */}
        {step === 3 && (
          <div className="flex-1 max-w-md mx-auto w-full flex flex-col justify-center animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
                Verify your email address
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto">
                We&apos;ve sent a verification code to your email. Please enter the code in the box below to verify your account.
              </p>
            </div>

            <form onSubmit={handleStep3Submit} className="space-y-6 my-2">
              {/* OTP 4 Input Boxes */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 my-6">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpInputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    placeholder="•"
                    value={otp[idx]}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-center text-2xl font-black text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-600/15 outline-none transition-all shadow-sm"
                  />
                ))}
              </div>

              {/* Countdown text */}
              <p className="text-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                Your code will expire in{' '}
                <span className="font-bold text-blue-600 dark:text-blue-400">{formatTime(timer)}</span>
              </p>

              <Button
                type="submit"
                disabled={otp.join('').length < 4}
                className={`w-full h-12 rounded-xl font-bold text-base transition-all ${
                  otp.join('').length === 4
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 cursor-pointer'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed border border-zinc-200/60 dark:border-zinc-700/60'
                }`}
              >
                Verify
              </Button>
            </form>

            <p className="text-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-6">
              Didn&apos;t receive the code?{' '}
              <button
                type="button"
                onClick={() => setTimer(299)}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer ml-1 inline-flex items-center gap-1"
              >
                <span>Resend</span>
                <RefreshCw className="size-3" />
              </button>
            </p>
          </div>
        )}

        {/* Step 4: Success Completion State */}
        {step === 4 && (
          <div className="flex-1 max-w-md mx-auto w-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300 py-10">
            <div className="size-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 border-4 border-emerald-200/50 dark:border-emerald-800/40 shadow-xl shadow-emerald-500/10">
              <CheckCircle2 className="size-10 animate-bounce" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 mb-3 border border-emerald-200/60">
              <ShieldCheck className="size-3.5" />
              Verified Employer Account
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">
              Welcome to Joblin!
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-8 leading-relaxed">
              Your recruiter profile for <strong className="text-foreground">{companyName || 'Your Company'}</strong> is now active. You can begin posting opportunities immediately.
            </p>

            <Link href="/jobs" className="w-full">
              <Button className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/25">
                Enter Recruiter Dashboard
              </Button>
            </Link>
          </div>
        )}

        {/* Bottom Login Link (Only for step 1 & 2) */}
        {step < 3 && (
          <div className="mt-6 text-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-900 pt-6">
            Do you already have an account?{' '}
            <Link href="/auth/register" className="font-bold text-blue-600 dark:text-blue-400 hover:underline ml-1">
              Login
            </Link>
          </div>
        )}
      </div>

      {/* Right Column: High-End Architectural Glass Building & Floating Testimonial Card (Col 7 to 12) */}
      <div className="col-span-1 lg:col-span-6 xl:col-span-6 relative min-h-[420px] lg:min-h-full flex flex-col justify-end p-6 sm:p-8 lg:p-10 xl:p-12 overflow-hidden bg-zinc-900 rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none">
        
        {/* Architectural Background Photo */}
        <img
          src="/assets/images/office.jpg"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';
          }}
          alt="Modern Architectural Skyscraper"
          className="absolute inset-0 size-full object-cover transition-transform duration-1000 hover:scale-105 opacity-85"
        />

        {/* Gradients for contrast and mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-blue-950/15 mix-blend-overlay" />

        {/* Floating Testimonial Box */}
        <div className="relative z-10 w-full max-w-lg mx-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl rounded-2xl p-6 sm:p-7 border border-white/60 dark:border-zinc-800 shadow-2xl transition-all duration-500 transform animate-in fade-in zoom-in-95">
          
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="size-12 rounded-full object-cover border-2 border-white dark:border-zinc-800 shadow-md ring-2 ring-blue-500/20"
                />
                <span className="absolute bottom-0 right-0 size-3.5 rounded-full bg-blue-600 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[8px] text-white font-bold">
                  ✓
                </span>
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white">
                  {currentTestimonial.name}
                </h4>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {currentTestimonial.role}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[11px] font-bold text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
              <Building2 className="size-3" />
              <span>Verified Employer</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4 font-normal">
            &ldquo;{currentTestimonial.quote}&rdquo;
          </p>

          {/* Carousel Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
            {TESTIMONIALS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCustomTestimonialIndex(idx)}
                aria-label={`Testimonial ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeTestimonialIndex === idx
                    ? 'w-6 h-2 bg-zinc-900 dark:bg-white shadow-sm'
                    : 'size-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
