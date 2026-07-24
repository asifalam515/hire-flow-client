'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Users, 
  Award, 
  GraduationCap, 
  FileText,
  Loader2
} from 'lucide-react';

const postJobSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  nature: z.string().min(1, 'Nature is required'),
  vacancies: z.coerce.number().int().nonnegative().optional(),
  employmentTypes: z.array(z.string()).min(1, 'Select at least one employment type'),
  locationCountry: z.string().min(1, 'Country is required'),
  locationCity: z.string().min(1, 'City is required'),
  exactAddress: z.string().optional(),
  minSalary: z.coerce.number().int().nonnegative(),
  maxSalary: z.coerce.number().int().nonnegative(),
  isSalaryNegotiable: z.boolean().default(false),
  benefits: z.array(z.string()).min(1, 'Select at least one benefit'),
  educationLevel: z.string().min(1, 'Education level is required'),
  yearsOfExperience: z.string().min(1, 'Experience is required'),
  gender: z.string().min(1, 'Gender is required'),
  candidateExperience: z.array(z.string()).min(1, 'Select at least one experience level'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  softwareSkills: z.array(z.string()).min(1, 'Select at least one skill'),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('PUBLISHED'),
}).refine(data => data.minSalary <= data.maxSalary, {
  message: "Max salary must be greater than min salary",
  path: ["maxSalary"],
});

type PostJobFormValues = z.infer<typeof postJobSchema>;

export function PostJobForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostJobFormValues>({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      employmentTypes: [],
      benefits: [],
      candidateExperience: [],
      languages: [],
      softwareSkills: [],
      isSalaryNegotiable: false,
      gender: 'Any',
    },
  });

  const onSubmit = async (data: PostJobFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        ...data,
        description: `Responsibilities:\n${data.responsibilities || 'N/A'}\n\nRequirements:\n${data.requirements || 'N/A'}`,
      };

      await apiClient.post('/jobs', payload);
      
      // Redirect on success
      router.push('/employer/dashboard');
    } catch (error: any) {
      setSubmitError(error.message || 'Failed to post job');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitDraft = () => {
    setValue('status', 'DRAFT');
    handleSubmit(onSubmit)();
  };

  const submitPublished = () => {
    setValue('status', 'PUBLISHED');
    handleSubmit(onSubmit)();
  };

  return (
    <form className="divide-y divide-slate-200 dark:divide-zinc-800" onSubmit={(e) => e.preventDefault()}>
      
      {/* Error Message */}
      {submitError && (
        <div className="p-4 m-6 bg-red-50 text-red-600 rounded-lg border border-red-200">
          {submitError}
        </div>
      )}
      
      {/* 1. Job Information */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <h2>Job Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input 
              {...register('title')}
              type="text" 
              placeholder="e.g. Senior Full Stack Developer" 
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Job Category <span className="text-red-500">*</span>
            </label>
            <select 
              {...register('category')}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none"
            >
              <option value="">Select Department or Category</option>
              <option value="engineering">Engineering</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
            {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Job Nature <span className="text-red-500">*</span>
            </label>
            <select 
              {...register('nature')}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none"
            >
              <option value="">Choose Remote, On-site or Hybrid</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>
            {errors.nature && <p className="text-xs text-red-500">{errors.nature.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Vacancies (optional)
            </label>
            <input 
              {...register('vacancies')}
              type="number" 
              placeholder="e.g. 2" 
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* 2. Employment Type */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <h2>Employment Type</h2>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {['Full Time', 'Part Time', 'Contract', 'Internship', 'Freelance'].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input 
                {...register('employmentTypes')}
                value={type}
                type="checkbox" 
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800" 
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">{type}</span>
            </label>
          ))}
        </div>
        {errors.employmentTypes && <p className="text-xs text-red-500">{errors.employmentTypes.message}</p>}
      </div>

      {/* 3. Work Location */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h2>Work Location</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Country <span className="text-red-500">*</span>
            </label>
            <select 
              {...register('locationCountry')}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none"
            >
              <option value="">Select</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
            </select>
            {errors.locationCountry && <p className="text-xs text-red-500">{errors.locationCountry.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              City <span className="text-red-500">*</span>
            </label>
            <select 
              {...register('locationCity')}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none"
            >
              <option value="">Select</option>
              <option value="ny">New York</option>
              <option value="sf">San Francisco</option>
              <option value="ldn">London</option>
            </select>
            {errors.locationCity && <p className="text-xs text-red-500">{errors.locationCity.message}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Exact Address
            </label>
            <input 
              {...register('exactAddress')}
              type="text" 
              placeholder="e.g. 123 Business Avenue, Suite 100" 
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* 4. Salary & Benefits */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <DollarSign className="w-5 h-5 text-blue-600" />
          <h2>Salary & Benefits</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Minimum - Maximum Salary <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <input 
                {...register('minSalary')}
                type="number" 
                placeholder="Min" 
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
              <span className="hidden sm:block text-slate-500">-</span>
              <input 
                {...register('maxSalary')}
                type="number" 
                placeholder="Max" 
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            {errors.minSalary && <p className="text-xs text-red-500">{errors.minSalary.message}</p>}
            {errors.maxSalary && <p className="text-xs text-red-500">{errors.maxSalary.message}</p>}

            <label className="flex items-center gap-2 cursor-pointer mt-3">
              <input 
                {...register('isSalaryNegotiable')}
                type="checkbox" 
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800" 
              />
              <span className="text-sm text-slate-600 dark:text-slate-400">Salary is negotiable</span>
            </label>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Benefits <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {['Medical Insurance', 'Transportation Allowance', 'Meals Allowance', 'Bonuses', 'Paid Time Off', 'Dental Insurance'].map((benefit) => (
                <label key={benefit} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
                  <input 
                    {...register('benefits')}
                    value={benefit}
                    type="checkbox" 
                    className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800" 
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{benefit}</span>
                </label>
              ))}
            </div>
            {errors.benefits && <p className="text-xs text-red-500">{errors.benefits.message}</p>}
          </div>
        </div>
      </div>

      {/* 5. Preferred Candidate Profile */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <Users className="w-5 h-5 text-blue-600" />
          <h2>Preferred Candidate Profile</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Education Level <span className="text-red-500">*</span>
            </label>
            <select 
              {...register('educationLevel')}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none"
            >
              <option value="">Degree Level</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD</option>
            </select>
            {errors.educationLevel && <p className="text-xs text-red-500">{errors.educationLevel.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Years of Experience <span className="text-red-500">*</span>
            </label>
            <select 
              {...register('yearsOfExperience')}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none"
            >
              <option value="">Select</option>
              <option value="1-3">1-3 Years</option>
              <option value="3-5">3-5 Years</option>
              <option value="5+">5+ Years</option>
            </select>
            {errors.yearsOfExperience && <p className="text-xs text-red-500">{errors.yearsOfExperience.message}</p>}
          </div>

          <div className="space-y-3 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Gender
            </label>
            <div className="flex items-center gap-6">
              {['Female', 'Male', 'Any'].map((gender) => (
                <label key={gender} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    {...register('gender')}
                    value={gender}
                    type="radio" 
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800" 
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{gender}</span>
                </label>
              ))}
            </div>
            {errors.gender && <p className="text-xs text-red-500">{errors.gender.message}</p>}
          </div>
        </div>
      </div>

      {/* 6. Work Experience */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <Award className="w-5 h-5 text-blue-600" />
          <h2>Candidate Experience Level</h2>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {['Fresh Graduate', '1-2 Years', '3-5 Years', '5+ Years'].map((exp) => (
            <label key={exp} className="flex items-center gap-2 cursor-pointer">
              <input 
                {...register('candidateExperience')}
                value={exp}
                type="checkbox" 
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800" 
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">{exp}</span>
            </label>
          ))}
        </div>
        {errors.candidateExperience && <p className="text-xs text-red-500">{errors.candidateExperience.message}</p>}
      </div>

      {/* 7. Skills */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h2>Skills</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Languages <span className="text-red-500">*</span>
            </label>
            <select 
              multiple
              {...register('languages')}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
            {errors.languages && <p className="text-xs text-red-500">{errors.languages.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Software Skills <span className="text-red-500">*</span>
            </label>
            <select 
              multiple
              {...register('softwareSkills')}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="react">React</option>
              <option value="node">Node.js</option>
              <option value="python">Python</option>
              <option value="sql">SQL</option>
            </select>
            {errors.softwareSkills && <p className="text-xs text-red-500">{errors.softwareSkills.message}</p>}
          </div>
        </div>
      </div>

      {/* 8. Job Description */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <FileText className="w-5 h-5 text-blue-600" />
          <h2>Job Description</h2>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Job Responsibilities (optional)
            </label>
            <div className="border border-slate-300 dark:border-zinc-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
              <textarea 
                {...register('responsibilities')}
                rows={6}
                placeholder="Describe the job responsibilities..." 
                className="w-full px-4 py-3 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white outline-none resize-y"
              ></textarea>
            </div>
            {errors.responsibilities && <p className="text-xs text-red-500">{errors.responsibilities.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Job Requirements (optional)
            </label>
            <div className="border border-slate-300 dark:border-zinc-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
              <textarea 
                {...register('requirements')}
                rows={6}
                placeholder="List the job requirements..." 
                className="w-full px-4 py-3 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white outline-none resize-y"
              ></textarea>
            </div>
            {errors.requirements && <p className="text-xs text-red-500">{errors.requirements.message}</p>}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="p-6 md:p-8 bg-slate-50 dark:bg-zinc-900/50 flex items-center justify-end gap-4">
        <button 
          type="button" 
          disabled={isSubmitting}
          onClick={submitDraft}
          className="px-6 py-2.5 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
        >
          Save Draft
        </button>
        <button 
          type="button" 
          disabled={isSubmitting}
          onClick={submitPublished}
          className="px-6 py-2.5 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm disabled:opacity-50 flex items-center"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Post Job
        </button>
      </div>

    </form>
  );
}
