'use client';

import React, { useState } from 'react';
import { 
  User, 
  Edit, 
  Lock, 
  Bell, 
  MonitorSmartphone, 
  Laptop, 
  X, 
  ShieldAlert, 
  EyeOff,
  Hand
} from 'lucide-react';

export default function AccountSettingsPage() {
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const renderNameCard = () => {
    if (editingSection === 'name') {
      return (
        <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Full name</h3>
          </div>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">First Name</label>
              <input type="text" defaultValue="Ana" className="w-full px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
              <input type="text" defaultValue="Amiri" className="w-full px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Save
            </button>
            <button onClick={() => setEditingSection(null)} className="px-6 py-2 text-slate-600 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
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
            <User className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Full name</h3>
          </div>
          <button onClick={() => setEditingSection('name')} className="text-blue-600 hover:text-blue-700">
            <Edit className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-20">
          <div>
            <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">First name</div>
            <div className="text-sm text-slate-500">Ana</div>
          </div>
          <div>
            <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">Last name</div>
            <div className="text-sm text-slate-500">Amiri</div>
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
            <User className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Account</h3>
          </div>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input type="email" defaultValue="anaamiri@gmail.com" className="w-full px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                New Email Address<span className="text-red-500">*</span>
              </label>
              <input type="email" placeholder="+98 991 679 2356" className="w-full px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Save
            </button>
            <button onClick={() => setEditingSection(null)} className="px-6 py-2 text-slate-600 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Account</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">Email Address</div>
            <div className="text-sm text-slate-500">anaamiri@gmail.com</div>
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
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Old Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input type="password" defaultValue="••••••••••" className="w-full px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent pr-10" />
                <EyeOff className="w-5 h-5 text-slate-400 absolute right-3 top-2.5" />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                New Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input type="password" placeholder="Enter your new password" className="w-full px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent pr-10" />
                <EyeOff className="w-5 h-5 text-slate-400 absolute right-3 top-2.5" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Save
            </button>
            <button onClick={() => setEditingSection(null)} className="px-6 py-2 text-slate-600 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
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
                  <div className="text-sm text-slate-500">Notify me when an employer rejected me.</div>
                </div>
                <button className="w-12 h-6 bg-blue-600 rounded-full relative transition-colors flex-shrink-0">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">Application result</div>
                  <div className="text-sm text-slate-500">Notify me when an employer rejected me.</div>
                </div>
                <button className="w-12 h-6 bg-blue-600 rounded-full relative transition-colors flex-shrink-0">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">Messeges</div>
                  <div className="text-sm text-slate-500">Notify me when an employer rejected me.</div>
                </div>
                <button className="w-12 h-6 bg-slate-200 dark:bg-zinc-700 rounded-full relative transition-colors flex-shrink-0">
                  <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                </button>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-zinc-800">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">Delete Account</h3>
                  <p className="text-sm text-slate-500 max-w-xl">
                    We'd hate to see you go, but you're welcome to delete your account anytime. Just remember, once you delete it, it's gone forever delete it, it's gone forever delete it, i
                  </p>
                </div>
                <button className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex-shrink-0">
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
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Macbook</span>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 w-full py-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors font-medium text-sm mb-6">
              <Hand className="w-4 h-4 text-red-600" />
              Terminate All Other Sessions
            </button>

            <div className="text-left">
              <div className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Active Devices</div>
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-1">
                    <MonitorSmartphone className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">Chrome 134</div>
                    <div className="text-sm text-slate-900 dark:text-white font-medium">Web 10.9.44A</div>
                    <div className="text-xs text-slate-500">Hillsboro, United States.Tue</div>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600 p-1">
                  <X className="w-4 h-4" />
                </button>
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
              We're hiding some account details to protect your identiWe're hiding some account details to protect your identity.We're hiding some account details to protect your identity.We're hiding some account details to protect your identity.We're hiding some
            </p>
          </div>

          {/* Info Card 2 */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-6">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Which details can be edited?</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Details Airbnb uses to verify your identity can't be changed. Contact info and some personal details can be edited, but we may ask you verify your identity the next time you book or create a listing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
