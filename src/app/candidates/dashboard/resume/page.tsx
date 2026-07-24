import React from 'react';
import { 
  User, 
  Edit3, 
  Plus, 
  UploadCloud, 
  Image as ImageIcon,
  Briefcase,
  GraduationCap,
  Link as LinkIcon,
  Globe,
  Award,
  Star,
  CheckCircle2,
  Trash2,
  QrCode,
  Copy
} from 'lucide-react';

export default function CandidateResumePage() {
  return (
    <div className="p-4 lg:p-8 max-w-[1200px] mx-auto w-full space-y-6 bg-slate-50 dark:bg-zinc-950 font-sans min-h-screen">
      
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Content Area */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* Top Profile Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0 border border-slate-200 dark:border-zinc-700 relative group">
              <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-full h-full object-cover" />
              <button className="absolute bottom-2 right-2 bg-slate-900/60 p-1.5 rounded-lg text-white hover:bg-slate-900 transition-colors">
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Kathryn Murphy</h2>
              <p className="text-sm text-slate-500 mb-4">Product Designer • Therward, Psychology</p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <button className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors">
                  View resume
                </button>
                <button className="px-5 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm font-bold transition-colors">
                  Download PDF Resume
                </button>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">First Name</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Ana</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">Last Name</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Amiri</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">Email Address</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">anaamiri@gmail.com</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">Mobile Number</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">Marital Status</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Single</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">City</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Tehran</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">Year of Birth</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">2005</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">Gender</p>
                <button className="text-sm font-bold text-blue-600 hover:text-blue-700">Add</button>
              </div>
            </div>
          </div>

          {/* About Me */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm relative group">
            <button className="absolute top-6 right-6 text-slate-400 hover:text-blue-600 transition-colors">
              <Edit3 className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">About me</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              Designed logos, branding materials, and marketing assets for startups. Created user-friendly UI/UX designs for websites and mobile applications. Developed social media graphics, advertisements, and promotional materials.
            </p>
          </div>

          {/* Professional Skills */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm relative group">
            <button className="absolute top-6 right-6 text-slate-400 hover:text-blue-600 transition-colors">
              <Edit3 className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Professional Skills</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-700">UI/UX</span>
              <span className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-700">Product manager</span>
              <span className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-700">Web Developer</span>
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm relative group">
            <button className="absolute top-6 right-6 text-slate-400 hover:text-blue-600 transition-colors">
              <Edit3 className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Work Experience</h3>
            </div>
            
            <div className="border border-slate-100 dark:border-zinc-800 rounded-2xl p-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Product manager</h4>
              <p className="text-xs text-slate-500 font-medium">Google _ From 1998 to 2008</p>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm relative group">
            <button className="absolute top-6 right-6 text-slate-400 hover:text-blue-600 transition-colors">
              <Edit3 className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Education</h3>
            </div>
            
            <div className="space-y-4">
              <div className="border border-slate-100 dark:border-zinc-800 rounded-2xl p-4">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Bachelor's degree of Psychology</h4>
                <p className="text-xs text-slate-500 font-medium">Shahid Beheshti University, Tehran | 2022-2024</p>
              </div>
              <div className="border border-slate-100 dark:border-zinc-800 rounded-2xl p-4">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Master's degree of Psychology</h4>
                <p className="text-xs text-slate-500 font-medium">Shahid Beheshti University, Tehran | 2024-Present</p>
              </div>
            </div>
          </div>

          {/* Links (Empty State Style) */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <LinkIcon className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Links</h3>
            </div>
            
            <div className="border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-950/50 transition-colors">
              <p className="text-sm text-slate-500 mb-2">Add all your portfolio and social links here</p>
              <button className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                <Plus className="w-4 h-4" /> Add links
              </button>
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm relative group">
            <button className="absolute top-6 right-6 text-slate-400 hover:text-blue-600 transition-colors">
              <Edit3 className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Languages</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-700">Arabic/Beginner</span>
              <span className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-700">French/Beginner</span>
            </div>
          </div>

          {/* Job Preferences */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm relative group">
            <button className="absolute top-6 right-6 text-slate-400 hover:text-blue-600 transition-colors">
              <Edit3 className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Job Preferences</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-700">Developer/300$</span>
              <span className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-700">Developer/400$</span>
              <span className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-700">Full-time</span>
              <span className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-700">Entry-level</span>
            </div>
          </div>

          {/* Preferred Job Benefits */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm relative group">
            <button className="absolute top-6 right-6 text-slate-400 hover:text-blue-600 transition-colors">
              <Edit3 className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Preferred Job Benefits</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-700">Promotion Opportunity</span>
              <span className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-700">Insurance</span>
            </div>
          </div>

        </div>

        {/* Right Sidebar Area */}
        <div className="w-full lg:w-[320px] shrink-0 space-y-6">
          
          {/* Resume Quality Widget */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col items-center text-center">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6">Your Resume Quality</h3>
            
            <div className="relative w-32 h-32 mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100 dark:text-zinc-800" />
                <circle 
                  cx="50" cy="50" r="40" 
                  stroke="currentColor" strokeWidth="12" fill="transparent" 
                  strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.74)} 
                  className="text-blue-600" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">74%</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4">
              Your resume is only 74% complete! Let's improve it.
            </p>

            <div className="w-full space-y-2 text-left">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">+2%</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Complete your job title</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">+5%</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Complete personal information</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">+2%</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Add your work experience</span>
              </div>
            </div>
          </div>

          {/* Uploaded Resume */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm text-center">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Uploaded resume</h3>
            <p className="text-[11px] text-slate-500 font-medium mb-4">Your file was successfully uploaded</p>
            
            <div className="border border-blue-200 dark:border-blue-900/50 rounded-2xl p-6 bg-blue-50/50 dark:bg-blue-900/10 mb-4 relative">
              <button className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-xl flex items-center justify-center mb-1">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate w-full px-4">fateme-ghaemi-resume.pdf</p>
                <p className="text-[10px] font-medium text-slate-500">200 KB</p>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-xl border border-blue-600 text-blue-600 text-sm font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              Replace File
            </button>
          </div>

          {/* Your Resume Link */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm text-center">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Your Resume Link</h3>
            <p className="text-[11px] text-slate-500 font-medium mb-6">Share your resume using this unique link</p>
            
            <div className="border border-slate-100 dark:border-zinc-800 rounded-2xl p-6 mb-6">
              <div className="w-24 h-24 mx-auto bg-slate-100 dark:bg-white rounded-lg flex items-center justify-center mb-4 p-2">
                {/* Mock QR Code */}
                <QrCode className="w-full h-full text-slate-900" />
              </div>
              <p className="text-sm font-bold text-blue-600 mb-4 break-all">HireFlow.com/u/LF-9752322</p>
              <button className="mx-auto flex items-center gap-2 px-6 py-2 rounded-xl border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                <Copy className="w-3.5 h-3.5" /> Copy link
              </button>
            </div>
            
            <button className="w-full py-3 rounded-xl bg-slate-200 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 text-sm font-bold cursor-not-allowed">
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
