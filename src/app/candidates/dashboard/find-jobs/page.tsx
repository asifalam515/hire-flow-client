import React from 'react';
import { JobSearchBar } from '@/components/candidate/jobs/JobSearchBar';
import { JobFiltersSidebar } from '@/components/candidate/jobs/JobFiltersSidebar';
import { JobCard } from '@/components/candidate/jobs/JobCard';
import { Pagination } from '@/components/candidate/jobs/Pagination';

// Dummy Data matching the design
const DUMMY_JOBS = [
  {
    companyLogo: '',
    companyName: 'Sanford Group',
    title: 'UI/UX Designer',
    tags: ['Full-Time', 'Part-Time'],
    location: 'Canada',
    salary: '25 $ / Month',
    timePosted: '1 hour ago'
  },
  {
    companyLogo: '',
    companyName: 'Rosenbaum LLC',
    title: 'UI/UX Designer',
    tags: ['Full-Time', 'Part-Time'],
    location: 'Canada',
    salary: '25 45$ / Month',
    timePosted: '1 hour ago'
  },
  {
    companyLogo: '',
    companyName: 'Hettinger LLC',
    title: 'UI/UX Designer',
    tags: ['Full-Time'],
    location: 'Canada',
    salary: '25 $ / Month',
    timePosted: '1 hour ago'
  },
  {
    companyLogo: '',
    companyName: 'Kemmer-Effertz',
    title: 'UI/UX Designer',
    tags: ['Full-Time', 'Part-Time'],
    location: 'Canada',
    salary: '25 $ / Month',
    timePosted: '1 hour ago'
  },
  {
    companyLogo: '',
    companyName: 'Renner Group',
    title: 'UI/UX Designer',
    tags: ['Full-Time', 'Part-Time'],
    location: 'Karnataka',
    salary: '25 35$ / Month',
    timePosted: '1 hour ago'
  },
  {
    companyLogo: '',
    companyName: 'Tromp Group',
    title: 'UI/UX Designer',
    tags: ['Full-Time', 'Remote'],
    location: 'Tamil Nadu',
    salary: '25 $ / Month',
    timePosted: '1 hour ago'
  },
  {
    companyLogo: '',
    companyName: 'Schumm and Sons',
    title: 'UI/UX Designer',
    tags: ['Full-Time', 'Part-Time'],
    location: 'Andra Pradesh',
    salary: '25 $ / Month',
    timePosted: '1 hour ago'
  },
  {
    companyLogo: '',
    companyName: 'Ritchie LLC',
    title: 'UI/UX Designer',
    tags: ['Full-Time', 'Part-Time'],
    location: 'Kerala',
    salary: '25 55$ / Month',
    timePosted: '1 hour ago'
  },
  {
    companyLogo: '',
    companyName: 'Schumm-Cormier',
    title: 'UI/UX Designer',
    tags: ['Full-Time', 'Senior'],
    location: 'Kerala',
    salary: '25 $ / Month',
    timePosted: '1 hour ago'
  },
  {
    companyLogo: '',
    companyName: 'Leach PLC',
    title: 'UI/UX Designer',
    tags: ['Part-Time'],
    location: 'Kerala',
    salary: '25 $ / Month',
    timePosted: '1 hour ago'
  },
  {
    companyLogo: '',
    companyName: 'Runte, Flatley and Miller',
    title: 'UI/UX Designer',
    tags: ['Full-Time', 'Part-Time'],
    location: 'Andra Pradesh',
    salary: '25 35$ / Month',
    timePosted: '1 hour ago'
  },
  {
    companyLogo: '',
    companyName: 'Bruen and Sons',
    title: 'UI/UX Designer',
    tags: ['Full-Time', 'Part-Time'],
    location: 'Andra Pradesh',
    salary: '25 $ / Month',
    timePosted: '1 hour ago'
  },
  {
    companyLogo: '',
    companyName: 'Hudson Ltd',
    title: 'UI/UX Designer',
    tags: ['Full-Time', 'Part-Time'],
    location: 'Karnataka',
    salary: '25 $ / Month',
    timePosted: '1 hour ago'
  },
  {
    companyLogo: '',
    companyName: 'Marvin and Sons',
    title: 'UI/UX Designer',
    tags: ['Mid-Level', 'Part-Time'],
    location: 'Tamil Nadu',
    salary: '25 $ / Month',
    timePosted: '1 hour ago'
  },
  {
    companyLogo: '',
    companyName: 'Brekke-Willms',
    title: 'UI/UX Designer',
    tags: ['Full-Time'],
    location: 'Tamil Nadu',
    salary: '25 $ / Month',
    timePosted: '1 hour ago'
  },
  {
    companyLogo: '',
    companyName: 'Swift-Ziemann',
    title: 'Sales Manager',
    tags: ['Full-Time', 'Part-Time'],
    location: 'Tamil Nadu',
    salary: '25 $ / Month',
    timePosted: '1 hour ago'
  },
];

export default function FindJobsPage() {
  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto w-full min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans">
      
      {/* Search Bar - Center Top */}
      <div className="flex justify-center mb-8">
        <JobSearchBar />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Sidebar */}
        <JobFiltersSidebar />
        
        {/* Right Content */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {DUMMY_JOBS.map((job, idx) => (
              <JobCard 
                key={idx}
                companyLogo={job.companyLogo}
                companyName={job.companyName}
                title={job.title}
                tags={job.tags}
                location={job.location}
                salary={job.salary}
                timePosted={job.timePosted}
              />
            ))}
          </div>
          
          <Pagination />
        </div>
      </div>
      
    </div>
  );
}
