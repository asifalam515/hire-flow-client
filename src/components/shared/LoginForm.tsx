'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Lock, 
  Loader2, 
  ArrowRight, 
  Briefcase, 
  User, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, activeRole } = useAuthStore();
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedDemoRole, setSelectedDemoRole] = useState<'RECRUITER' | 'CANDIDATE' | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleAutoFill = (role: 'RECRUITER' | 'CANDIDATE') => {
    setServerError(null);
    clearErrors();
    setSelectedDemoRole(role);

    if (role === 'RECRUITER') {
      setValue('email', 'recruiter@hireflow.dev', { shouldValidate: true, shouldDirty: true });
      setValue('password', 'Password123!', { shouldValidate: true, shouldDirty: true });
    } else {
      setValue('email', 'candidate@hireflow.dev', { shouldValidate: true, shouldDirty: true });
      setValue('password', 'Password123!', { shouldValidate: true, shouldDirty: true });
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError(null);
      const user = await login(data);
      if (user?.role === 'RECRUITER') {
        router.push('/employer/dashboard');
      } else {
        router.push('/candidates/dashboard');
      }
    } catch (err: any) {
      setServerError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl shadow-blue-900/5">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            Log in to your account to continue
          </p>
        </div>

        {/* Demo Credentials Auto-Fill Section */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-purple-50/50 dark:from-blue-950/20 dark:via-zinc-800/40 dark:to-purple-950/20 border border-blue-100 dark:border-blue-900/30">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
              <Sparkles className="size-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
              Demo Quick Auto-Fill
            </span>
            <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
              One-click testing
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Recruiter / Employer Auto-fill Button */}
            <button
              type="button"
              onClick={() => handleAutoFill('RECRUITER')}
              className={`group relative flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 ${
                selectedDemoRole === 'RECRUITER'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/25 ring-2 ring-blue-600/30'
                  : 'bg-white/90 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-700/70 text-zinc-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500/50 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="flex items-center gap-1.5 font-bold text-xs">
                  <Briefcase className={`size-3.5 ${selectedDemoRole === 'RECRUITER' ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                  Recruiter
                </span>
                {selectedDemoRole === 'RECRUITER' && (
                  <CheckCircle2 className="size-3.5 text-white" />
                )}
              </div>
              <span className={`text-[10px] truncate max-w-full font-medium ${selectedDemoRole === 'RECRUITER' ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-400'}`}>
                recruiter@hireflow.dev
              </span>
            </button>

            {/* Candidate Auto-fill Button */}
            <button
              type="button"
              onClick={() => handleAutoFill('CANDIDATE')}
              className={`group relative flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 ${
                selectedDemoRole === 'CANDIDATE'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/25 ring-2 ring-blue-600/30'
                  : 'bg-white/90 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-700/70 text-zinc-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500/50 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="flex items-center gap-1.5 font-bold text-xs">
                  <User className={`size-3.5 ${selectedDemoRole === 'CANDIDATE' ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                  Candidate
                </span>
                {selectedDemoRole === 'CANDIDATE' && (
                  <CheckCircle2 className="size-3.5 text-white" />
                )}
              </div>
              <span className={`text-[10px] truncate max-w-full font-medium ${selectedDemoRole === 'CANDIDATE' ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-400'}`}>
                candidate@hireflow.dev
              </span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {serverError && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium animate-in fade-in">
              {serverError}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
              <input
                {...register('email')}
                type="email"
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 dark:focus:ring-blue-500/50 transition-all font-medium text-zinc-900 dark:text-white"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs font-semibold mt-1.5 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 dark:focus:ring-blue-500/50 transition-all font-medium text-zinc-900 dark:text-white"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs font-semibold mt-1.5 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300"
          >
            {isLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <span className="flex items-center justify-center gap-2">
                Log In <ArrowRight className="size-4" />
              </span>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Don't have an account?{' '}
            <Link
              href={
                activeRole === 'employer' ? '/employer/sign-up' : '/candidates/sign-up'
              }
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-bold transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
