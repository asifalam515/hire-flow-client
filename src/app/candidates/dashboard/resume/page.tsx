'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  User as UserIcon, 
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
  Trash2,
  QrCode,
  Copy,
  Loader2,
  Check,
  X
} from 'lucide-react';
import * as candidateService from '../../../../services/candidate.service';

interface Profile {
  id: string;
  resumeUrl?: string;
  mobileNumber?: string;
  maritalStatus?: string;
  city?: string;
  yearOfBirth?: number;
  gender?: string;
  aboutMe?: string;
  skills: string[];
  languages: string[];
  preferredBenefits: string[];
  jobPreferences?: any;
  links?: any;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string | null;
  };
  workExperiences: any[];
  educations: any[];
}

export default function CandidateResumePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Edit Modes
  const [editPersonal, setEditPersonal] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [editLanguages, setEditLanguages] = useState(false);
  const [editBenefits, setEditBenefits] = useState(false);
  const [editPreferences, setEditPreferences] = useState(false);
  
  const [showAddWork, setShowAddWork] = useState(false);
  const [showAddEdu, setShowAddEdu] = useState(false);
  
  // Form States
  const [personalForm, setPersonalForm] = useState<any>({});
  const [aboutForm, setAboutForm] = useState('');
  const [skillsForm, setSkillsForm] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [languagesForm, setLanguagesForm] = useState<string[]>([]);
  const [benefitsForm, setBenefitsForm] = useState('');
  const [preferencesForm, setPreferencesForm] = useState('');
  
  const [workForm, setWorkForm] = useState({ title: '', company: '', startDate: '', endDate: '', isCurrent: false });
  const [eduForm, setEduForm] = useState({ degree: '', fieldOfStudy: '', institution: '', startDate: '', endDate: '', isCurrent: false });

  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await candidateService.getResume();
      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch profile', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8050/api/v1'}/candidates/me/resume/download`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume_${profile?.user.firstName || 'candidate'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download PDF', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleViewResume = async () => {
    if (profile?.resumeUrl) {
      window.open(profile.resumeUrl, '_blank');
      return;
    }
    
    try {
      setIsDownloading(true);
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8050/api/v1'}/candidates/me/resume/download`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch generated resume');
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Failed to view PDF', error);
      alert('Failed to open resume. Please try again later.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleGenerateAiResume = async () => {
    try {
      setIsGeneratingAi(true);
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8050/api/v1'}/candidates/me/resume/generate-ai`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('AI Generation failed');
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai_resume_${profile?.user.firstName || 'candidate'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate AI Resume', error);
      alert('Failed to generate AI Resume. Please try again later.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const uploaded = await candidateService.uploadCustomResume(file);
      await handleUpdateProfile({ resumeUrl: uploaded.url }, () => {});
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingAvatar(true);
      const uploaded = await candidateService.uploadProfileImage(file);
      await handleUpdateProfile({ user: { ...profile?.user, avatarUrl: uploaded.url } as any }, () => {});
    } catch (error) {
      console.error('Avatar upload failed', error);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleUpdateProfile = async (updates: Partial<Profile>, onComplete: () => void) => {
    try {
      const updated = await candidateService.updateProfile(updates);
      setProfile(prev => prev ? { 
        ...prev, 
        ...updated, 
        user: { 
          ...prev.user, 
          firstName: updates.user?.firstName || prev.user.firstName, 
          lastName: updates.user?.lastName || prev.user.lastName,
          avatarUrl: updates.user?.avatarUrl !== undefined ? updates.user.avatarUrl : prev.user.avatarUrl
        } 
      } : null);
      onComplete();
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  const handleUpdatePersonal = () => {
    handleUpdateProfile({
      user: { firstName: personalForm.firstName, lastName: personalForm.lastName, email: '', avatarUrl: null },
      mobileNumber: personalForm.mobileNumber,
      maritalStatus: personalForm.maritalStatus,
      city: personalForm.city,
      yearOfBirth: personalForm.yearOfBirth ? parseInt(personalForm.yearOfBirth) : undefined,
      gender: personalForm.gender,
    } as any, () => setEditPersonal(false));
  };

  const handleUpdateAbout = () => {
    handleUpdateProfile({ aboutMe: aboutForm }, () => setEditAbout(false));
  };

  const handleUpdateSkills = () => {
    handleUpdateProfile({ skills: skillsForm }, () => setEditSkills(false));
  };
  
  const handleUpdateLanguages = () => {
    handleUpdateProfile({ languages: languagesForm }, () => setEditLanguages(false));
  };

  const handleUpdateBenefits = () => {
    const arr = benefitsForm.split(',').map(s => s.trim()).filter(Boolean);
    handleUpdateProfile({ preferredBenefits: arr }, () => setEditBenefits(false));
  };

  const handleUpdatePreferences = () => {
    const arr = preferencesForm.split(',').map(s => s.trim()).filter(Boolean);
    handleUpdateProfile({ jobPreferences: arr }, () => setEditPreferences(false)); // Just saving as basic JSON array for now
  };

  const handleAddWork = async () => {
    try {
      const added = await candidateService.addWorkExperience({
        ...workForm,
        startDate: new Date(workForm.startDate).toISOString(),
        endDate: workForm.isCurrent || !workForm.endDate ? null : new Date(workForm.endDate).toISOString()
      });
      setProfile(prev => prev ? { ...prev, workExperiences: [added, ...prev.workExperiences] } : null);
      setShowAddWork(false);
      setWorkForm({ title: '', company: '', startDate: '', endDate: '', isCurrent: false });
    } catch (error) {
      console.error('Failed to add work experience', error);
    }
  };

  const handleDeleteWork = async (id: string) => {
    try {
      await candidateService.deleteWorkExperience(id);
      setProfile(prev => prev ? { ...prev, workExperiences: prev.workExperiences.filter(w => w.id !== id) } : null);
    } catch (error) {
      console.error('Failed to delete work', error);
    }
  };

  const handleAddEdu = async () => {
    try {
      const added = await candidateService.addEducation({
        ...eduForm,
        startDate: new Date(eduForm.startDate).toISOString(),
        endDate: eduForm.isCurrent || !eduForm.endDate ? null : new Date(eduForm.endDate).toISOString()
      });
      setProfile(prev => prev ? { ...prev, educations: [added, ...prev.educations] } : null);
      setShowAddEdu(false);
      setEduForm({ degree: '', fieldOfStudy: '', institution: '', startDate: '', endDate: '', isCurrent: false });
    } catch (error) {
      console.error('Failed to add education', error);
    }
  };
  
  const handleDeleteEdu = async (id: string) => {
    try {
      await candidateService.deleteEducation(id);
      setProfile(prev => prev ? { ...prev, educations: prev.educations.filter(e => e.id !== id) } : null);
    } catch (error) {
      console.error('Failed to delete education', error);
    }
  };

  const resumeQuality = useMemo(() => {
    if (!profile) return { score: 0, actionableItems: [] };

    const rules = [
      { key: 'personal', label: 'Complete personal information', weight: 15, isComplete: !!profile.mobileNumber && !!profile.city },
      { key: 'avatar', label: 'Upload a profile photo', weight: 10, isComplete: !!profile.user.avatarUrl },
      { key: 'aboutMe', label: 'Add a summary about yourself', weight: 15, isComplete: !!profile.aboutMe && profile.aboutMe.length > 10 },
      { key: 'experience', label: 'Add your work experience', weight: 25, isComplete: profile.workExperiences?.length > 0 },
      { key: 'education', label: 'Add your education details', weight: 20, isComplete: profile.educations?.length > 0 },
      { key: 'skills', label: 'Add at least 3 skills', weight: 15, isComplete: profile.skills?.length >= 3 },
    ];

    let score = 0;
    const actionableItems: { label: string; weight: number }[] = [];

    rules.forEach(rule => {
      if (rule.isComplete) {
        score += rule.weight;
      } else {
        actionableItems.push({ label: rule.label, weight: rule.weight });
      }
    });

    actionableItems.sort((a, b) => b.weight - a.weight);

    return { score, actionableItems: actionableItems.slice(0, 3) };
  }, [profile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-zinc-950">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="p-4 lg:p-8 max-w-[1200px] mx-auto w-full space-y-6 bg-slate-50 dark:bg-zinc-950 font-sans min-h-screen">
      
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Content Area */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* Top Profile Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0 border border-slate-200 dark:border-zinc-700 relative group">
              {isUploadingAvatar ? (
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              ) : profile.user.avatarUrl ? (
                <img src={profile.user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-12 h-12 text-slate-400" />
              )}
              <div className="absolute bottom-2 right-2 relative">
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full" />
                <button className="bg-slate-900/60 p-1.5 rounded-lg text-white hover:bg-slate-900 transition-colors pointer-events-none">
                  <ImageIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                {profile.user.firstName} {profile.user.lastName}
              </h2>
              <p className="text-sm text-slate-500 mb-4">{profile.user.email}</p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <button onClick={handleViewResume} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors flex items-center gap-2">
                  View resume
                </button>
                <button onClick={handleDownloadPDF} disabled={isDownloading} className="px-5 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm font-bold transition-colors flex items-center gap-2">
                  {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Download PDF Resume
                </button>
                {resumeQuality.score === 100 && (
                  <button onClick={handleGenerateAiResume} disabled={isGeneratingAi} className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5">
                    {isGeneratingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>✨</span>} 
                    Generate AI Resume
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm relative group">
            {!editPersonal && (
              <button onClick={() => {
                setPersonalForm({
                  firstName: profile.user.firstName || '',
                  lastName: profile.user.lastName || '',
                  mobileNumber: profile.mobileNumber || '',
                  maritalStatus: profile.maritalStatus || '',
                  city: profile.city || '',
                  yearOfBirth: profile.yearOfBirth || '',
                  gender: profile.gender || '',
                });
                setEditPersonal(true);
              }} className="absolute top-6 right-6 text-slate-400 hover:text-blue-600 transition-colors">
                <Edit3 className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2 mb-6">
              <UserIcon className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Personal Information</h3>
            </div>
            
            {editPersonal ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm" value={personalForm.firstName} onChange={e => setPersonalForm({...personalForm, firstName: e.target.value})} />
                  <input type="text" placeholder="Last Name" className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm" value={personalForm.lastName} onChange={e => setPersonalForm({...personalForm, lastName: e.target.value})} />
                  <input type="text" placeholder="Mobile Number" className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm" value={personalForm.mobileNumber} onChange={e => setPersonalForm({...personalForm, mobileNumber: e.target.value})} />
                  <select className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm" value={personalForm.maritalStatus} onChange={e => setPersonalForm({...personalForm, maritalStatus: e.target.value})}>
                    <option value="">Select Marital Status</option>
                    <option value="Unmarried">Unmarried</option>
                    <option value="Married">Married</option>
                  </select>
                  <input type="text" placeholder="City" className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm" value={personalForm.city} onChange={e => setPersonalForm({...personalForm, city: e.target.value})} />
                  <input type="number" placeholder="Year of Birth" className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm" value={personalForm.yearOfBirth} onChange={e => setPersonalForm({...personalForm, yearOfBirth: e.target.value})} />
                  <select className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm" value={personalForm.gender} onChange={e => setPersonalForm({...personalForm, gender: e.target.value})}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditPersonal(false)} className="px-4 py-2 text-sm font-bold text-slate-500">Cancel</button>
                  <button onClick={handleUpdatePersonal} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg">Save</button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">First Name</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{profile.user.firstName || '-'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">Last Name</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{profile.user.lastName || '-'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">Email Address</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{profile.user.email}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">Mobile Number</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{profile.mobileNumber || '-'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">Marital Status</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{profile.maritalStatus || '-'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">City</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{profile.city || '-'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">Year of Birth</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{profile.yearOfBirth || '-'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">Gender</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{profile.gender || '-'}</p>
                </div>
              </div>
            )}
          </div>

          {/* About Me */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm relative group">
            {!editAbout && (
              <button onClick={() => { setAboutForm(profile.aboutMe || ''); setEditAbout(true); }} className="absolute top-6 right-6 text-slate-400 hover:text-blue-600 transition-colors">
                <Edit3 className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2 mb-4">
              <UserIcon className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">About me</h3>
            </div>
            
            {editAbout ? (
              <div className="space-y-4">
                <textarea 
                  rows={4} 
                  className="w-full p-3 border rounded-xl dark:bg-zinc-800 dark:border-zinc-700 text-sm resize-none"
                  value={aboutForm}
                  onChange={e => setAboutForm(e.target.value)}
                  placeholder="Tell us about yourself..."
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditAbout(false)} className="px-4 py-2 text-sm font-bold text-slate-500">Cancel</button>
                  <button onClick={handleUpdateAbout} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg">Save</button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                {profile.aboutMe || <span className="text-slate-400 italic">No information provided yet. Click edit to add something about yourself.</span>}
              </p>
            )}
          </div>

          {/* Professional Skills */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm relative group">
            {!editSkills && (
              <button onClick={() => { setSkillsForm(profile.skills || []); setEditSkills(true); }} className="absolute top-6 right-6 text-slate-400 hover:text-blue-600 transition-colors">
                <Edit3 className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Professional Skills</h3>
            </div>
            
            {editSkills ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {skillsForm.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs flex items-center gap-1 border border-blue-200 dark:border-blue-800">
                      {skill}
                      <button onClick={() => setSkillsForm(skillsForm.filter(s => s !== skill))} className="hover:text-red-500 ml-1">&times;</button>
                    </span>
                  ))}
                </div>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm"
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const val = newSkill.trim();
                      if (val && !skillsForm.includes(val)) {
                        setSkillsForm([...skillsForm, val]);
                      }
                      setNewSkill('');
                    }
                  }}
                  placeholder="Type a skill and press Enter"
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditSkills(false)} className="px-4 py-2 text-sm font-bold text-slate-500">Cancel</button>
                  <button onClick={handleUpdateSkills} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg">Save</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-700">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-400 italic">No skills added yet.</span>
                )}
              </div>
            )}
          </div>

          {/* Work Experience */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm relative group">
            {!showAddWork && (
              <button onClick={() => setShowAddWork(true)} className="absolute top-6 right-6 text-slate-400 hover:text-blue-600 transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Work Experience</h3>
            </div>
            
            <div className="space-y-4">
              {showAddWork && (
                <div className="border border-slate-200 dark:border-zinc-700 rounded-2xl p-4 bg-slate-50 dark:bg-zinc-900/50 mb-6">
                  <h4 className="font-bold text-sm mb-4">Add Work Experience</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input type="text" placeholder="Job Title" className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm" value={workForm.title} onChange={e => setWorkForm({...workForm, title: e.target.value})} />
                    <input type="text" placeholder="Company" className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm" value={workForm.company} onChange={e => setWorkForm({...workForm, company: e.target.value})} />
                    <input type="date" placeholder="Start Date" className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm text-slate-500" value={workForm.startDate} onChange={e => setWorkForm({...workForm, startDate: e.target.value})} />
                    <input type="date" placeholder="End Date" disabled={workForm.isCurrent} className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm disabled:opacity-50 text-slate-500" value={workForm.endDate} onChange={e => setWorkForm({...workForm, endDate: e.target.value})} />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <input type="checkbox" id="isCurrentWork" checked={workForm.isCurrent} onChange={e => setWorkForm({...workForm, isCurrent: e.target.checked})} />
                    <label htmlFor="isCurrentWork" className="text-sm text-slate-600">I currently work here</label>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setShowAddWork(false)} className="px-4 py-2 text-sm font-bold text-slate-500">Cancel</button>
                    <button onClick={handleAddWork} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg" disabled={!workForm.title || !workForm.company || !workForm.startDate}>Save</button>
                  </div>
                </div>
              )}

              {profile.workExperiences && profile.workExperiences.length > 0 ? (
                profile.workExperiences.map((we: any) => (
                  <div key={we.id} className="border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 relative group/item">
                    <button onClick={() => handleDeleteWork(we.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{we.title}</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {we.company} _ From {new Date(we.startDate).getFullYear()} to {we.isCurrent ? 'Present' : new Date(we.endDate).getFullYear()}
                    </p>
                  </div>
                ))
              ) : (
                !showAddWork && (
                  <div onClick={() => setShowAddWork(true)} className="border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-950/50 transition-colors">
                    <p className="text-sm text-slate-500 mb-2">Add your work experience here</p>
                    <button className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                      <Plus className="w-4 h-4" /> Add Experience
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm relative group">
            {!showAddEdu && (
              <button onClick={() => setShowAddEdu(true)} className="absolute top-6 right-6 text-slate-400 hover:text-blue-600 transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Education</h3>
            </div>
            
            <div className="space-y-4">
              {showAddEdu && (
                <div className="border border-slate-200 dark:border-zinc-700 rounded-2xl p-4 bg-slate-50 dark:bg-zinc-900/50 mb-6">
                  <h4 className="font-bold text-sm mb-4">Add Education</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input type="text" placeholder="Degree (e.g. Bachelor's)" className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm" value={eduForm.degree} onChange={e => setEduForm({...eduForm, degree: e.target.value})} />
                    <input type="text" placeholder="Field of Study" className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm" value={eduForm.fieldOfStudy} onChange={e => setEduForm({...eduForm, fieldOfStudy: e.target.value})} />
                    <input type="text" placeholder="Institution" className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm sm:col-span-2" value={eduForm.institution} onChange={e => setEduForm({...eduForm, institution: e.target.value})} />
                    <input type="date" placeholder="Start Date" className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm text-slate-500" value={eduForm.startDate} onChange={e => setEduForm({...eduForm, startDate: e.target.value})} />
                    <input type="date" placeholder="End Date" disabled={eduForm.isCurrent} className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm disabled:opacity-50 text-slate-500" value={eduForm.endDate} onChange={e => setEduForm({...eduForm, endDate: e.target.value})} />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <input type="checkbox" id="isCurrentEdu" checked={eduForm.isCurrent} onChange={e => setEduForm({...eduForm, isCurrent: e.target.checked})} />
                    <label htmlFor="isCurrentEdu" className="text-sm text-slate-600">I currently study here</label>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setShowAddEdu(false)} className="px-4 py-2 text-sm font-bold text-slate-500">Cancel</button>
                    <button onClick={handleAddEdu} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg" disabled={!eduForm.degree || !eduForm.institution || !eduForm.startDate}>Save</button>
                  </div>
                </div>
              )}

              {profile.educations && profile.educations.length > 0 ? (
                profile.educations.map((ed: any) => (
                  <div key={ed.id} className="border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 relative group/item">
                    <button onClick={() => handleDeleteEdu(ed.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{ed.degree} {ed.fieldOfStudy && `in ${ed.fieldOfStudy}`}</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {ed.institution} | {new Date(ed.startDate).getFullYear()}-{ed.isCurrent ? 'Present' : new Date(ed.endDate).getFullYear()}
                    </p>
                  </div>
                ))
              ) : (
                !showAddEdu && (
                  <div onClick={() => setShowAddEdu(true)} className="border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-950/50 transition-colors">
                    <p className="text-sm text-slate-500 mb-2">Add your education here</p>
                    <button className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                      <Plus className="w-4 h-4" /> Add Education
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
          
          {/* Languages */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm relative group">
            {!editLanguages && (
              <button onClick={() => { setLanguagesForm(profile.languages || []); setEditLanguages(true); }} className="absolute top-6 right-6 text-slate-400 hover:text-blue-600 transition-colors">
                <Edit3 className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Languages</h3>
            </div>
            
            {editLanguages ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {languagesForm.map(lang => (
                    <span key={lang} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs flex items-center gap-1 border border-green-200 dark:border-green-800">
                      {lang}
                      <button onClick={() => setLanguagesForm(languagesForm.filter(l => l !== lang))} className="hover:text-red-500 ml-1">&times;</button>
                    </span>
                  ))}
                </div>
                <select 
                  className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm text-slate-500"
                  value=""
                  onChange={e => {
                    const val = e.target.value;
                    if (val && !languagesForm.includes(val)) {
                      setLanguagesForm([...languagesForm, val]);
                    }
                  }}
                >
                  <option value="">Select a language to add...</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Mandarin">Mandarin</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Russian">Russian</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Korean</option>
                  <option value="Italian">Italian</option>
                  <option value="Dutch">Dutch</option>
                </select>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditLanguages(false)} className="px-4 py-2 text-sm font-bold text-slate-500">Cancel</button>
                  <button onClick={handleUpdateLanguages} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg">Save</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.languages && profile.languages.length > 0 ? (
                  profile.languages.map((lang, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-700">
                      {lang}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-400 italic">No languages added yet.</span>
                )}
              </div>
            )}
          </div>
          
          {/* Job Preferences */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm relative group">
            {!editPreferences && (
              <button onClick={() => { 
                const prefArray = Array.isArray(profile.jobPreferences) ? profile.jobPreferences : [];
                setPreferencesForm(prefArray.join(', ')); 
                setEditPreferences(true); 
              }} className="absolute top-6 right-6 text-slate-400 hover:text-blue-600 transition-colors">
                <Edit3 className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Job Preferences</h3>
            </div>
            
            {editPreferences ? (
              <div className="space-y-4">
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm"
                  value={preferencesForm}
                  onChange={e => setPreferencesForm(e.target.value)}
                  placeholder="e.g. Developer, Full-time, Remote (comma separated)"
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditPreferences(false)} className="px-4 py-2 text-sm font-bold text-slate-500">Cancel</button>
                  <button onClick={handleUpdatePreferences} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg">Save</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {Array.isArray(profile.jobPreferences) && profile.jobPreferences.length > 0 ? (
                  profile.jobPreferences.map((pref: string, i: number) => (
                    <span key={i} className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-700">
                      {pref}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-400 italic">No preferences added yet.</span>
                )}
              </div>
            )}
          </div>
          
          {/* Preferred Job Benefits */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm relative group">
            {!editBenefits && (
              <button onClick={() => { setBenefitsForm(profile.preferredBenefits?.join(', ') || ''); setEditBenefits(true); }} className="absolute top-6 right-6 text-slate-400 hover:text-blue-600 transition-colors">
                <Edit3 className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Preferred Job Benefits</h3>
            </div>
            
            {editBenefits ? (
              <div className="space-y-4">
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-sm"
                  value={benefitsForm}
                  onChange={e => setBenefitsForm(e.target.value)}
                  placeholder="e.g. Health Insurance, Gym Membership (comma separated)"
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditBenefits(false)} className="px-4 py-2 text-sm font-bold text-slate-500">Cancel</button>
                  <button onClick={handleUpdateBenefits} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg">Save</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.preferredBenefits && profile.preferredBenefits.length > 0 ? (
                  profile.preferredBenefits.map((ben, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-700">
                      {ben}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-400 italic">No benefits added yet.</span>
                )}
              </div>
            )}
          </div>

          {/* Uploaded Custom Resume */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm relative group mt-6">
            <div className="flex items-center gap-2 mb-4">
              <UploadCloud className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Uploaded Resume</h3>
            </div>
            
            <div className="border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left hover:bg-slate-50 dark:hover:bg-zinc-950/50 transition-colors relative overflow-hidden">
              <input type="file" accept="application/pdf" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              {isUploading ? (
                 <div className="w-full flex justify-center py-4"><Loader2 className="w-6 h-6 animate-spin text-blue-600" /></div>
              ) : profile.resumeUrl ? (
                <>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Custom_Resume.pdf</h4>
                    <p className="text-xs text-slate-500">Uploaded to your profile</p>
                  </div>
                  <button className="mt-4 sm:mt-0 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-bold relative z-20 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    Replace File
                  </button>
                </>
              ) : (
                <div className="w-full flex flex-col items-center">
                  <p className="text-sm text-slate-500 mb-2">Upload your custom PDF resume</p>
                  <button className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                    <Plus className="w-4 h-4" /> Choose File
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Sidebar Area */}
        <div className="w-full lg:w-[320px] shrink-0 space-y-6">
          
          {/* Profile Completion Widget */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col items-center text-center">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6">Profile Completion</h3>
            
            <div className="relative w-32 h-32 mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100 dark:text-zinc-800" />
                <circle 
                  cx="50" cy="50" r="40" 
                  stroke="currentColor" strokeWidth="12" fill="transparent" 
                  strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - resumeQuality.score / 100)} 
                  className="text-blue-600 transition-all duration-1000 ease-out" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{resumeQuality.score}%</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4">
              {resumeQuality.score === 100 
                ? "Your profile is 100% complete! Great job!" 
                : `Your profile is only ${resumeQuality.score}% complete! Let's improve it.`}
            </p>

            <div className="w-full space-y-2 text-left">
              {resumeQuality.actionableItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">+{item.weight}%</span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{item.label}</span>
                </div>
              ))}
              {resumeQuality.score === 100 && (
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded border border-green-200 dark:border-green-800">✓</span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">All set! You're ready to apply.</span>
                </div>
              )}
            </div>
          </div>

          {/* Your Resume Link */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm text-center">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Your Resume Link</h3>
            <p className="text-[11px] text-slate-500 font-medium mb-6">Share your resume using this unique link</p>
            
            <div className="border border-slate-100 dark:border-zinc-800 rounded-2xl p-6 mb-6">
              <div className="w-24 h-24 mx-auto bg-slate-100 dark:bg-white rounded-lg flex items-center justify-center mb-4 p-2">
                <QrCode className="w-full h-full text-slate-900" />
              </div>
              <p className="text-sm font-bold text-blue-600 mb-4 break-all">HireFlow.com/u/LF-{profile.id.substring(0, 6)}</p>
              <button className="mx-auto flex items-center gap-2 px-6 py-2 rounded-xl border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                <Copy className="w-3.5 h-3.5" /> Copy link
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
