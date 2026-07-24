import React from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { LoginForm } from '@/components/shared/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log In | Joblin & Hire-Flow',
  description: 'Log in to your account to continue your hiring or job search journey.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-zinc-950 font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <LoginForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
