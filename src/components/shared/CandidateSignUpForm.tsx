'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Loader2, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const candidateSignUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type CandidateSignUpFormData = z.infer<typeof candidateSignUpSchema>;

export function CandidateSignUpForm() {
  const router = useRouter();
  const { registerCandidate, isLoading } = useAuthStore();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CandidateSignUpFormData>({
    resolver: zodResolver(candidateSignUpSchema),
  });

  const onSubmit = async (data: CandidateSignUpFormData) => {
    try {
      setServerError(null);
      await registerCandidate(data);
      // Wait for OTP/email verification or redirect immediately
      router.push('/candidates/dashboard');
    } catch (err: any) {
      setServerError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl shadow-blue-900/5">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
            Create an Account
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            Join as a Candidate and find your dream job
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {serverError && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium animate-in fade-in">
              {serverError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
                <input
                  {...register('firstName')}
                  type="text"
                  placeholder="John"
                  className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 dark:focus:ring-blue-500/50 transition-all font-medium text-zinc-900 dark:text-white"
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-xs font-semibold mt-1.5 ml-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
                <input
                  {...register('lastName')}
                  type="text"
                  placeholder="Doe"
                  className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 dark:focus:ring-blue-500/50 transition-all font-medium text-zinc-900 dark:text-white"
                />
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-xs font-semibold mt-1.5 ml-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

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
            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
              Password
            </label>
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
                Create Account <ArrowRight className="size-4" />
              </span>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-bold transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
