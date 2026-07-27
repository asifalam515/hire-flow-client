'use client';

import React, { useState, useEffect } from 'react';
import { 
  User as UserIcon, 
  Edit, 
  Lock, 
  Bell, 
  MonitorSmartphone, 
  Laptop, 
  X, 
  ShieldAlert, 
  EyeOff,
  Eye,
  Hand,
  Loader2
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';

interface Session {
  id: string;
  userAgent?: string;
  ipAddress?: string;
  createdAt: string;
  isCurrent?: boolean;
}

export default function AccountSettingsPage() {
  const { user, updateCandidateName, updateEmail, updatePassword, updateNotifications, deleteAccount } = useAuthStore();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState('');
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Sessions state
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, [user]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setIsLoadingSessions(true);
      const res = await apiClient.get('/auth/sessions');
      setSessions(res.data.data || []);
    } catch (error) {
      console.error('Failed to fetch sessions', error);
    } finally {
      setIsLoadingSessions(false);
    }
  };

  const handleSaveName = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error('First and last name are required');
      return;
    }
    setIsLoading(true);
    try {
      await updateCandidateName(firstName, lastName);
      toast.success('Name updated successfully');
      setEditingSection(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update name');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEmail = async () => {
    if (!email.trim()) {
      toast.error('New email is required');
      return;
    }
    setIsLoading(true);
    try {
      await updateEmail(email);
      toast.success('Email updated successfully');
      setEditingSection(null);
      setEmail('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error('Both old and new passwords are required');
      return;
    }
    setIsLoading(true);
    try {
      await updatePassword(oldPassword, newPassword);
      toast.success('Password updated successfully');
      setEditingSection(null);
      setOldPassword('');
      setNewPassword('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleNotification = async (key: 'notifyNewJob' | 'notifyAppResult' | 'notifyMessages') => {
    if (!user) return;
    const currentValue = user[key as keyof typeof user] as boolean;
    try {
      await updateNotifications({ [key]: !currentValue });
      toast.success('Notification preference updated');
    } catch (error: any) {
      toast.error('Failed to update preference');
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await deleteAccount();
        // The store handles redirect
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete account');
      }
    }
  };

  const handleTerminateSession = async (id: string) => {
    try {
      await apiClient.delete(`/auth/sessions/${id}`);
      setSessions(s => s.filter(session => session.id !== id));
      toast.success('Session terminated');
    } catch (error) {
      toast.error('Failed to terminate session');
    }
  };

  const handleTerminateOtherSessions = async () => {
    if (confirm("Are you sure you want to log out from all other devices?")) {
      try {
        await apiClient.delete('/auth/sessions');
        await fetchSessions();
        toast.success('Other sessions terminated');
      } catch (error) {
        toast.error('Failed to terminate other sessions');
      }
    }
  };

  const renderNameCard = () => {
    if (editingSection === 'name') {
      return (
        <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <UserIcon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Full name</h3>
          </div>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">First Name</label>
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleSaveName} disabled={isLoading} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center min-w-[100px]">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save'}
            </button>
            <button onClick={() => { setEditingSection(null); setFirstName(user?.firstName || ''); setLastName(user?.lastName || ''); }} className="px-6 py-2 text-slate-600 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <UserIcon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Full name</h3>
          </div>
          <button onClick={() => setEditingSection('name')} className="text-blue-600 hover:text-blue-700">
            <Edit className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-20">
          <div>
            <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">First name</div>
            <div className="text-sm text-slate-500">{user?.firstName || '-'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">Last name</div>
            <div className="text-sm text-slate-500">{user?.lastName || '-'}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderAccountCard = () => {
    if (editingSection === 'account') {
      return (
        <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <UserIcon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Account</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Email</label>
              <input type="email" value={user?.email || ''} disabled className="w-full px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-slate-50 dark:bg-zinc-950/50 text-slate-500" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                New Email Address<span className="text-red-500">*</span>
              </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="e.g. ana@gmail.com" className="w-full px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleSaveEmail} disabled={isLoading} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center min-w-[100px]">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save'}
            </button>
            <button onClick={() => { setEditingSection(null); setEmail(''); }} className="px-6 py-2 text-slate-600 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <UserIcon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Account</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">Email Address</div>
            <div className="text-sm text-slate-500">{user?.email || '-'}</div>
          </div>
          <button onClick={() => setEditingSection('account')} className="px-6 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
            Reset Email
          </button>
        </div>
      </div>
    );
  };

  const renderSecurityCard = () => {
    if (editingSection === 'security') {
      return (
        <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Security</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Old Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input type={showOldPassword ? "text" : "password"} value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="••••••••••" className="w-full px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent pr-10" />
                <button type="button" onClick={() => setShowOldPassword(!showOldPassword)} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                  {showOldPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                New Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input type={showNewPassword ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter your new password" className="w-full px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent pr-10" />
                <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                  {showNewPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleSavePassword} disabled={isLoading} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center min-w-[100px]">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save'}
            </button>
            <button onClick={() => { setEditingSection(null); setOldPassword(''); setNewPassword(''); }} className="px-6 py-2 text-slate-600 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <ShieldAlert className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Security</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">Password</div>
            <div className="text-sm text-slate-500">••••••••••••••</div>
          </div>
          <button onClick={() => setEditingSection('security')} className="px-6 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
            Reset Password
          </button>
        </div>
      </div>
    );
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
    <button 
      onClick={onChange}
      className={`w-12 h-6 rounded-full relative transition-colors flex-shrink-0 ${checked ? 'bg-blue-600' : 'bg-slate-200 dark:bg-zinc-700'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
    </button>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content Column */}
        <div className="flex-1 space-y-6">
          {renderNameCard()}
          {renderAccountCard()}
          {renderSecurityCard()}

          {/* Notification Card */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Notification</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">New job</div>
                  <div className="text-sm text-slate-500">Notify me when a new relevant job is posted.</div>
                </div>
                <ToggleSwitch 
                  checked={user?.notifyNewJob ?? true} 
                  onChange={() => handleToggleNotification('notifyNewJob')} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">Application result</div>
                  <div className="text-sm text-slate-500">Notify me about updates on my applications.</div>
                </div>
                <ToggleSwitch 
                  checked={user?.notifyAppResult ?? true} 
                  onChange={() => handleToggleNotification('notifyAppResult')} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">Messages</div>
                  <div className="text-sm text-slate-500">Notify me when I receive a new message.</div>
                </div>
                <ToggleSwitch 
                  checked={user?.notifyMessages ?? true} 
                  onChange={() => handleToggleNotification('notifyMessages')} 
                />
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-zinc-800">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">Delete Account</h3>
                  <p className="text-sm text-slate-500 max-w-xl pr-4">
                    We'd hate to see you go, but you're welcome to delete your account anytime. Just remember, once you delete it, it's gone forever.
                  </p>
                </div>
                <button onClick={handleDeleteAccount} className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex-shrink-0">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="w-full lg:w-[320px] shrink-0 space-y-6">
          {/* Devices Card */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <MonitorSmartphone className="w-16 h-16 text-slate-800 dark:text-slate-200 stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Devices</h3>
            
            <div className="text-left mb-6">
              <div className="text-sm font-semibold text-slate-900 dark:text-white mb-3">This device</div>
              <div className="flex items-center gap-3">
                <Laptop className="w-5 h-5 text-slate-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {sessions.find(s => s.isCurrent)?.userAgent?.split(' ')[0] || 'Current Device'}
                </span>
              </div>
            </div>

            {sessions.length > 1 && (
              <button onClick={handleTerminateOtherSessions} className="flex items-center justify-center gap-2 w-full py-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors font-medium text-sm mb-6">
                <Hand className="w-4 h-4 text-red-600" />
                Terminate All Other Sessions
              </button>
            )}

            <div className="text-left">
              <div className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center justify-between">
                Active Devices
                {isLoadingSessions && <Loader2 className="w-3 h-3 animate-spin text-slate-400" />}
              </div>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {sessions.length === 0 && !isLoadingSessions && (
                  <p className="text-sm text-slate-500">No active sessions found.</p>
                )}
                {sessions.map((session) => (
                  <div key={session.id} className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-1">
                        {session.userAgent?.toLowerCase().includes('mobile') ? (
                          <MonitorSmartphone className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        ) : (
                          <Laptop className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {session.userAgent?.split(' ')[0] || 'Unknown Device'}
                        </div>
                        <div className="text-xs text-slate-500 truncate">IP: {session.ipAddress || 'Unknown'}</div>
                        <div className="text-xs text-slate-400 truncate">
                          {new Date(session.createdAt).toLocaleDateString()} {session.isCurrent && '(Current)'}
                        </div>
                      </div>
                    </div>
                    {!session.isCurrent && (
                      <button onClick={() => handleTerminateSession(session.id)} className="text-slate-400 hover:text-red-500 p-1 flex-shrink-0 transition-colors" title="Terminate Session">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Card 1 */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-6">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Why isn't my info shown here?</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We're hiding some account details to protect your identity.
            </p>
          </div>

          {/* Info Card 2 */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-6">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Which details can be edited?</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Details Hire Flow uses to verify your identity can't be changed. Contact info and some personal details can be edited, but we may ask you verify your identity again if you change your email address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
