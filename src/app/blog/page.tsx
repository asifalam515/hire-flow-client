import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#EFF5FF] dark:bg-slate-950 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-1 flex flex-col pb-24">
        {/* Header Section */}
        <section className="w-full pt-24 pb-12 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            The Hire Flow Blog
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base mb-8">
            Career Guide, Practical Tips, and the Latest Job Market News
          </p>

          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-shadow"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {["All", "Career", "Skills", "Freelancing", "Job Market", "Resume & Interview"].map((tag, idx) => (
              <button 
                key={idx}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                  idx === 0 
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20" 
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Post */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                Finding Your First Job Without Experience?
              </h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                04 Sep, 2023 - 1 min Read
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed md:text-lg">
                Learn how to successfully land your first job even without prior experience by using smart strategies, building essential skills, and making the most of available opportunities. Learn how to successfully build essential skills, and making the most of available opportunities and making the most of.
              </p>
            </div>
            <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop" 
                alt="Payment terminal"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

        {/* The latest Posts */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-20">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">The latest Posts</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "When Should You Change Your Job?",
                tags: ["Job Market", "Career"],
                author: "Jane Cooper",
                date: "12 Sep 2023",
                img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
                excerpt: "Knowing when it's time to move on from your current job is crucial for your career growth. This article covers..."
              },
              {
                title: "Standing Out In Job Market",
                tags: ["Freelancing", "Skills"],
                author: "Jane Cooper",
                date: "10 Sep 2023",
                img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
                excerpt: "In a competitive job market, standing out is essential to catching the eye of recruiters and landing your dream job..."
              },
              {
                title: "Skills Employers Seek",
                tags: ["Career", "Interview"],
                author: "Jane Cooper",
                date: "8 Sep 2023",
                img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
                excerpt: "Employers today look for a combination of technical expertise and soft skills. From effective communication to..."
              }
            ].map((post, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-[6px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                    By {post.author} • {post.date}
                  </p>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-auto">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Highlighted Banner */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-20">
          <div className="relative h-[350px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" 
              alt="First Job, No Experience"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 w-full md:w-2/3 lg:w-1/2 text-white">
              <h3 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
                First Job, No Experience?
              </h3>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-6 drop-shadow">
                Learn how to get hired without experience. Smart strategies for landing your first job.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex gap-2">
                  <span className="px-3 py-1 text-xs font-bold bg-blue-600/90 text-white rounded-[6px] backdrop-blur-sm">Career</span>
                  <span className="px-3 py-1 text-xs font-bold bg-blue-600/90 text-white rounded-[6px] backdrop-blur-sm">Job Market</span>
                </div>
                <span className="text-xs font-medium text-slate-300 drop-shadow">
                  By Jane Cooper • 02 Jan 2024
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Experts */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-20">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Blog experts</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Farkas Ágnes", role: "Software developer", img: "https://i.pravatar.cc/150?img=11" },
              { name: "Fülöp Kata", role: "Marketing Manager", img: "https://i.pravatar.cc/150?img=9" },
              { name: "Sanny Isabella", role: "Sr UI/UX Designer", img: "https://i.pravatar.cc/150?img=5" },
              { name: "Tóth Kamilla", role: "Head of Human Res...", img: "https://i.pravatar.cc/150?img=12" },
              { name: "Savannah Nguyen", role: "Head of Engineering", img: "https://i.pravatar.cc/150?img=20" },
            ].map((expert, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center hover:shadow-lg transition-shadow">
                <img src={expert.img} alt={expert.name} className="w-20 h-20 mx-auto rounded-full object-cover mb-4 ring-4 ring-blue-50 dark:ring-blue-900/30" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 truncate">{expert.name}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4 truncate uppercase tracking-wider font-semibold">{expert.role}</p>
                
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="#" className="text-purple-600 hover:text-purple-800 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Viewing All Posts */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-12">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Viewing All Posts</h3>

          <div className="space-y-6">
            {[
              {
                title: "When Should You Change Your Job?",
                tags: ["Career", "Job Market"],
                date: "01 Jun 2023",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop",
                excerpt: "Knowing when it's time to move on from your current job is crucial for your career growth. This article helps readers assess whether they're stuck in a rut or ready for a change. It explores signs that indicate it's time for a new opportunity, such as lack of career advancement, dissatisfaction with work culture, or burnout..."
              },
              {
                title: "How to Keep Your Job During an Economic Crisis?",
                tags: ["Career", "Job Market"],
                date: "14 Jun 2023",
                img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
                excerpt: "Economic downturns can put job security at risk, but there are ways to protect your position. This article discusses strategies for maintaining your job during a crisis, such as demonstrating adaptability, taking on additional responsibilities, and continuously developing new skills. It also advises on how to stay visible and valuable to your employer during challenging times..."
              },
              {
                title: "Why Soft Skills Matter in Job Searching?",
                tags: ["Career", "Job Market"],
                date: "08 Jun 2023",
                img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
                excerpt: "While technical skills are important, soft skills often make the difference between getting hired and being passed over. This article emphasizes the value of skills like teamwork, problem-solving, communication, and emotional intelligence in the hiring process. It explains how job seekers can highlight these qualities on their resumes and in interviews to make themselves more appealing..."
              }
            ].map((post, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col md:flex-row">
                <div className="relative w-full md:w-[320px] lg:w-[400px] h-60 md:h-auto shrink-0 overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">{post.date}</p>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-[6px] border border-slate-200 dark:border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-center space-x-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {[1, 2, 3, "...", 8, 10].map((page, idx) => (
              <button 
                key={idx}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  page === 1 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                } ${page === "..." ? "cursor-default hover:bg-transparent" : ""}`}
              >
                {page}
              </button>
            ))}

            <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
