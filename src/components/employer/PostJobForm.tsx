'use client';

import React from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Users, 
  Award, 
  GraduationCap, 
  FileText 
} from 'lucide-react';

export function PostJobForm() {
  return (
    <form className="divide-y divide-slate-200 dark:divide-zinc-800" onSubmit={(e) => e.preventDefault()}>
      
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
              type="text" 
              placeholder="e.g. Senior Full Stack Developer" 
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Job Category <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none">
              <option value="">Select Department or Category</option>
              <option value="engineering">Engineering</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Job Nature <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none">
              <option value="">Choose Remote, On-site or Hybrid</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Vacancies (optional)
            </label>
            <input 
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
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800" />
              <span className="text-sm text-slate-700 dark:text-slate-300">{type}</span>
            </label>
          ))}
        </div>
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
            <select className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none">
              <option value="">Select</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              City <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none">
              <option value="">Select</option>
              <option value="ny">New York</option>
              <option value="sf">San Francisco</option>
              <option value="ldn">London</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Exact Address
            </label>
            <input 
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
            <div className="flex items-center gap-4">
              <input 
                type="number" 
                placeholder="Min" 
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
              <span className="text-slate-500">-</span>
              <input 
                type="number" 
                placeholder="Max" 
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer mt-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800" />
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
                  <input type="checkbox" className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{benefit}</span>
                </label>
              ))}
            </div>
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
            <select className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none">
              <option value="">Degree Level</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Years of Experience <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none">
              <option value="">Select</option>
              <option value="1-3">1-3 Years</option>
              <option value="3-5">3-5 Years</option>
              <option value="5+">5+ Years</option>
            </select>
          </div>

          <div className="space-y-3 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Gender
            </label>
            <div className="flex items-center gap-6">
              {['Female', 'Male', 'Any'].map((gender) => (
                <label key={gender} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800" defaultChecked={gender === 'Any'} />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{gender}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6. Work Experience */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <Award className="w-5 h-5 text-blue-600" />
          <h2>Work Experience</h2>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {['Fresh Graduate', '1-2 Years', '3-5 Years', '5+ Years'].map((exp) => (
            <label key={exp} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800" />
              <span className="text-sm text-slate-700 dark:text-slate-300">{exp}</span>
            </label>
          ))}
        </div>
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
            <select className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none">
              <option value="">Select languages</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Software Skills <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none">
              <option value="">Select tools</option>
              <option value="react">React</option>
              <option value="node">Node.js</option>
            </select>
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
              Job Responsibilities <span className="text-red-500">*</span>
            </label>
            <div className="border border-slate-300 dark:border-zinc-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
              {/* Dummy Rich Text Toolbar */}
              <div className="bg-slate-50 dark:bg-zinc-800/50 border-b border-slate-300 dark:border-zinc-700 px-3 py-2 flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded font-bold">B</button>
                <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded italic">I</button>
                <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded underline">U</button>
                <div className="w-px h-4 bg-slate-300 dark:bg-zinc-700 mx-1"></div>
                <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded">• List</button>
                <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded">1. List</button>
              </div>
              <textarea 
                rows={6}
                placeholder="Describe the job responsibilities..." 
                className="w-full px-4 py-3 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white outline-none resize-y"
              ></textarea>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Job Requirements <span className="text-red-500">*</span>
            </label>
            <div className="border border-slate-300 dark:border-zinc-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
              {/* Dummy Rich Text Toolbar */}
              <div className="bg-slate-50 dark:bg-zinc-800/50 border-b border-slate-300 dark:border-zinc-700 px-3 py-2 flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded font-bold">B</button>
                <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded italic">I</button>
                <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded underline">U</button>
                <div className="w-px h-4 bg-slate-300 dark:bg-zinc-700 mx-1"></div>
                <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded">• List</button>
                <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded">1. List</button>
              </div>
              <textarea 
                rows={6}
                placeholder="List the job requirements..." 
                className="w-full px-4 py-3 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white outline-none resize-y"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="p-6 md:p-8 bg-slate-50 dark:bg-zinc-900/50 flex items-center justify-end gap-4">
        <button type="button" className="px-6 py-2.5 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors">
          Save Draft
        </button>
        <button type="button" className="px-6 py-2.5 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm">
          Post Job
        </button>
      </div>

    </form>
  );
}
