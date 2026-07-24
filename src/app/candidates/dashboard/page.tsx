'use client';

import React from 'react';
import { 
  Eye,
  Heart,
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Dummy Chart Data
const data = [
  { name: 'Sun', views: 1000, applied: 1000 },
  { name: 'Mon', views: 2700, applied: 1700 },
  { name: 'Tue', views: 3100, applied: 2000 },
  { name: 'Wed', views: 2800, applied: 2400 },
  { name: 'Thu', views: 4200, applied: 2900 },
  { name: 'Fri', views: 4400, applied: 4100 },
  { name: 'Sat', views: 4600, applied: 4600 },
];

const pieData = [
  { name: 'Under Review', value: 8, color: '#2563EB' },
  { name: 'Accepted', value: 4, color: '#93C5FD' },
  { name: 'Rejected', value: 3, color: '#DBEAFE' },
];

const savedJobs = [
  { title: 'UI/UX Designer', company: 'Upply', type: 'Full Time', location: 'New York', days: 3 },
  { title: 'Marketing Coordinator', company: 'Lazada', type: 'Part Time', location: 'New York', days: 2 },
  { title: 'Dog Trainer', company: 'BMW', type: 'Full Time', location: 'New York', days: 3 },
];

const messages = [
  { sender: 'Pepsi', desc: "Join our team and make an impact! We're lo...", time: '15 minutes ago', unread: 5 },
  { sender: 'Golddex', desc: "Exciting career opportunities await! We're hi...", time: '15 minutes ago', unread: 5 },
  { sender: 'McDonald', desc: "We're looking for dynamic individuals to join our...", time: '15 minutes ago', unread: 0 },
  { sender: 'NASA', desc: "Are you ready to take your career to the next lev...", time: '15 minutes ago', unread: 0 },
  { sender: 'Panda', desc: "We're expanding and looking for driven, pas...", time: '15 minutes ago', unread: 5 },
  { sender: 'BMW', desc: "Are you a self-starter with a passion for success...", time: '15 minutes ago', unread: 0 },
];

export default function CandidateDashboardPage() {
  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto w-full space-y-6 bg-slate-50 dark:bg-zinc-950 font-sans min-h-screen">
      
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* Top Resume Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 lg:p-8 border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-center gap-6 lg:gap-8">
            <div className="flex items-center gap-6 flex-1">
              <div className="w-20 h-20 rounded-full overflow-hidden shrink-0">
                <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1"><span className="text-blue-600">70%</span> of Your Resume is Complete</h3>
                <p className="text-[11px] text-slate-500 mb-3">Almost there! Just a little more effort to make it perfect.</p>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  Complete your resume
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center justify-center border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 min-w-[100px]">
                <Eye className="w-5 h-5 text-green-500 mb-2" />
                <span className="font-bold text-slate-900 dark:text-white text-sm">5 <span className="font-medium text-slate-500 text-xs">people</span></span>
                <span className="text-[10px] text-slate-400">Viewed your profile</span>
              </div>
              <div className="flex flex-col items-center justify-center border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 min-w-[100px]">
                <Heart className="w-5 h-5 text-red-500 mb-2" />
                <span className="font-bold text-slate-900 dark:text-white text-sm">10 <span className="font-medium text-slate-500 text-xs">people</span></span>
                <span className="text-[10px] text-slate-400">Liked your resume</span>
              </div>
            </div>
          </div>

          {/* Job Statistics Chart Section */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 lg:p-8 border border-slate-100 dark:border-zinc-800 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Job statistics</h2>
                <p className="text-xs text-slate-500 mt-1">Showing Jobstatistics Jul 19-25</p>
              </div>
              
              <div className="flex bg-white dark:bg-zinc-950 rounded-full border border-slate-100 dark:border-zinc-800 p-1">
                <button className="px-6 py-2 rounded-full bg-blue-600 text-white text-xs font-bold">Week</button>
                <button className="px-6 py-2 rounded-full text-slate-600 dark:text-slate-400 text-xs font-bold hover:text-slate-900 dark:hover:text-white">Month</button>
                <button className="px-6 py-2 rounded-full text-slate-600 dark:text-slate-400 text-xs font-bold hover:text-slate-900 dark:hover:text-white">Year</button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Chart */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Statistics</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-600"></div>Job views</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-300"></div>Job Applied</span>
                  </div>
                </div>
                
                <div className="h-[250px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10}} tickFormatter={(value) => `${value/1000}k`} />
                      <Tooltip />
                      <Line type="monotone" dataKey="views" stroke="#2563EB" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="applied" stroke="#93C5FD" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart Right Stats */}
              <div className="w-full lg:w-48 flex flex-col gap-4 justify-center shrink-0">
                <div className="bg-white dark:bg-zinc-950 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm text-center">
                  <p className="text-xs text-slate-500 font-medium mb-1">Job views</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">2,342</h3>
                  <div className="flex items-center justify-center gap-1 text-[11px]">
                    <span className="text-slate-400">This week</span>
                    <span className="text-green-500 font-bold flex items-center">6.4% <span className="ml-1 text-green-500">↗</span></span>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-zinc-950 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm text-center">
                  <p className="text-xs text-slate-500 font-medium mb-1">Job views</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">654</h3>
                  <div className="flex items-center justify-center gap-1 text-[11px]">
                    <span className="text-slate-400">This week</span>
                    <span className="text-red-500 font-bold flex items-center">6.4% <span className="ml-1 text-red-500">↘</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Job List */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 lg:p-8 border border-slate-100 dark:border-zinc-800 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Save job</h2>
              <button className="text-xs font-bold text-blue-600 flex items-center hover:text-blue-700 transition-colors">
                View all <ChevronRight className="w-4 h-4 ml-0.5" />
              </button>
            </div>

            <div className="space-y-4">
              {savedJobs.map((job, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors group cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-zinc-800">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                      <span className="font-bold text-slate-900 dark:text-white text-xs">{job.company[0]}</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">{job.title}</p>
                      <p className="text-[11px] text-slate-500">{job.company} <span className="mx-1">•</span> {job.type} <span className="mx-1">•</span> {job.location}</p>
                    </div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/30 text-red-500 px-3 py-1 rounded-md text-[10px] font-bold">
                    {job.days} day to apply
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[320px] space-y-6 flex-shrink-0">
          
          {/* Status of apply */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm">
            <div className="relative w-full aspect-square max-w-[200px] mx-auto mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius="75%"
                    outerRadius="100%"
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">15</span>
                <span className="text-[10px] text-slate-500 font-medium">Total job</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">{item.value}</span>
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-900 dark:text-white">Status of apply</h3>
                <span className="text-[10px] text-slate-400">January 2025</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Minim dolor in amet nulla laboris enim dolore consequat.
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white">Massages</h3>
              <button className="text-xs font-bold text-blue-600 flex items-center hover:text-blue-700 transition-colors">
                More <ChevronRight className="w-3 h-3 ml-0.5" />
              </button>
            </div>

            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className="flex items-start gap-3 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-bold text-slate-900 dark:text-white text-xs">{msg.sender[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{msg.sender}</p>
                      <span className="text-[9px] text-slate-400 shrink-0">{msg.time}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-[10px] text-slate-500 truncate">{msg.desc}</p>
                      {msg.unread > 0 && (
                        <span className="bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                          {msg.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
