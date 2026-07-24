'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import { uploadFileToCloudinary } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Camera, Loader2, Save } from 'lucide-react';

const employerProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  companyName: z.string().min(1, 'Company name is required'),
  companyField: z.string().optional(),
  companyDescription: z.string().optional(),
  companyLogoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type EmployerProfileFormData = z.infer<typeof employerProfileSchema>;

export function EmployerProfileForm() {
  const { user, updateEmployerProfile } = useAuthStore();
  const [isUploading, setIsUploading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EmployerProfileFormData>({
    resolver: zodResolver(employerProfileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      companyName: user?.company?.name || '',
      companyField: user?.company?.field || '',
      companyDescription: user?.company?.description || '',
      companyLogoUrl: user?.company?.logoUrl || '',
    },
  });

  const logoUrl = watch('companyLogoUrl');

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setSubmitError(null);
      const res = await uploadFileToCloudinary(file, 'hire-flow/company-logos');
      if (res?.url) {
        setValue('companyLogoUrl', res.url, { shouldDirty: true });
      }
    } catch (error: any) {
      console.error('Failed to upload logo:', error);
      setSubmitError('Failed to upload logo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: EmployerProfileFormData) => {
    try {
      setSubmitError(null);
      setSubmitSuccess(false);
      await updateEmployerProfile(data);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error: any) {
      setSubmitError(error.message || 'Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {submitError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-medium">
          {submitError}
        </div>
      )}
      {submitSuccess && (
        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl border border-emerald-100 text-sm font-medium">
          Profile updated successfully!
        </div>
      )}

      {/* Company Logo Section */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Company Logo</h3>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden shrink-0 relative group">
            {isUploading ? (
              <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
            ) : logoUrl ? (
              <img src={logoUrl} alt="Company Logo" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-8 h-8 text-slate-400" />
            )}
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer pointer-events-none">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <input 
              type="file" 
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleLogoUpload}
              disabled={isUploading}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
              Upload your company logo
            </p>
            <p className="text-xs text-slate-500 mb-3">
              Recommended size: 256x256px. Formats: JPG, PNG, WEBP.
            </p>
          </div>
        </div>
        {errors.companyLogoUrl && (
          <p className="text-sm text-red-500 mt-2">{errors.companyLogoUrl.message}</p>
        )}
      </div>

      <hr className="border-slate-100 dark:border-zinc-800" />

      {/* Personal Info */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('firstName')}
              className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 px-4 py-3 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
              placeholder="John"
            />
            {errors.firstName && <p className="text-sm text-red-500 mt-1.5">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('lastName')}
              className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 px-4 py-3 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
              placeholder="Doe"
            />
            {errors.lastName && <p className="text-sm text-red-500 mt-1.5">{errors.lastName.message}</p>}
          </div>
        </div>
      </div>

      <hr className="border-slate-100 dark:border-zinc-800" />

      {/* Company Info */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Company Information</h3>
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('companyName')}
                className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 px-4 py-3 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                placeholder="Acme Corp"
              />
              {errors.companyName && <p className="text-sm text-red-500 mt-1.5">{errors.companyName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Industry / Field
              </label>
              <input
                {...register('companyField')}
                className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 px-4 py-3 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                placeholder="e.g. Technology, Healthcare"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Company Description
            </label>
            <textarea
              {...register('companyDescription')}
              rows={4}
              className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 px-4 py-3 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-400 resize-none"
              placeholder="Tell us about your company, mission, and culture..."
            />
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <Button 
          type="submit" 
          disabled={isSubmitting || !isDirty || isUploading}
          className="rounded-xl px-8 py-6 h-auto text-base font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          Save Changes
        </Button>
      </div>
    </form>
  );
}
