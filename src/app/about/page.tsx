import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { 
  CheckCircle2, 
  Users, 
  Award, 
  Settings, 
  Handshake, 
  ShieldCheck,
  Briefcase,
  Star
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#EFF5FF] dark:bg-slate-950 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center">
        {/* Header Section */}
        <section className="pt-24 pb-8 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            About Hire Flow
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
            Last updated March 12, 2024
          </p>
        </section>

        {/* Navigation Tabs */}
        <div className="w-full max-w-5xl mx-auto px-4 mb-16 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-center min-w-max border-b border-slate-200 dark:border-slate-800">
            {["About Hire Flow", "Who We Are", "Why Choose Us", "What our People Says", "Our Team"].map((tab, i) => (
              <a
                key={tab}
                href={`#${tab.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                  i === 0 
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab}
              </a>
            ))}
          </div>
        </div>

        {/* About Us Section */}
        <section id="about-hire-flow" className="w-full max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
          <div className="text-center mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">About us</h2>
            <p className="text-slate-500 dark:text-slate-400">The best job offers in global</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
              <p>
                At Hire Flow, we connect talented professionals with top career opportunities. Since 2023, our mission has been to provide tailored recruitment solutions that fit the unique needs of employers and candidates. Specializing in job search and recruitment, we offer comprehensive hiring services to ensure the perfect match.
              </p>
              <p>
                Our commitment to integrity, transparency, and excellence drives lasting relationships and successful outcomes.
              </p>
              <p>
                Whether you're advancing your career or seeking the right talent, we're here to support you.
              </p>
            </div>
            
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              {/* Using a placeholder image with unspash for corporate setting */}
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" 
                alt="Our Team"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 z-20 flex space-x-3 items-center bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 py-2 px-4 rounded-full shadow-lg">
                 <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800" src="https://i.pravatar.cc/100?img=1" alt="avatar" />
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800" src="https://i.pravatar.cc/100?img=2" alt="avatar" />
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800" src="https://i.pravatar.cc/100?img=3" alt="avatar" />
                 </div>
                 <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">5,000+ members</span>
              </div>
            </div>
          </div>
        </section>

        {/* Who we are Section */}
        <section id="who-we-are" className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Who we are</h2>
            <p className="text-slate-500 dark:text-slate-400">Get to know us</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                We're highly skilled and professionals team.
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We provide tailored recruitment solutions designed to connect the best talent with top companies. Our commitment to excellence, transparency, and efficiency ensures successful outcomes for both employers and candidates.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { count: "175,324", label: "Live Jobs" },
                { count: "9,750", label: "Candidates" },
                { count: "37,354", label: "Companies" },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mr-6">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.count}</h4>
                    <p className="text-slate-500 dark:text-slate-400">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose us Section */}
        <section id="why-choose-us" className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why choose us</h2>
            <p className="text-slate-500 dark:text-slate-400">With us, hiring becomes simple, efficient, and effective.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Tailored Recruitment Solutions",
                desc: "We understand your unique needs and provide customized hiring strategies to ensure the perfect match.",
                icon: <CheckCircle2 className="w-5 h-5" />
              },
              {
                title: "Expert In Hiring & Job Search",
                desc: "Our experienced team will help you in the best way possible in the field of job search and recruitment.",
                icon: <Users className="w-5 h-5" />
              },
              {
                title: "Commitment to Quality",
                desc: "We prioritize integrity, transparency, and efficiency, ensuring a seamless hiring experience.",
                icon: <Award className="w-5 h-5" />
              },
              {
                title: "Extensive Talent Network",
                desc: "Access a wide pool of qualified candidates ready to enhance your business.",
                icon: <Settings className="w-5 h-5" />
              },
              {
                title: "Long-Term Partnerships",
                desc: "We build lasting relationships through trust, reliability, and consistent results.",
                icon: <Handshake className="w-5 h-5" />
              },
              {
                title: "Quality & Integrity",
                desc: "We ensure transparency, efficiency, and lasting partnerships built on trust and excellence.",
                icon: <ShieldCheck className="w-5 h-5" />
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="what-our-people-says" className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">What our people says</h2>
            <p className="text-slate-500 dark:text-slate-400">What people have said about us</p>
          </div>

          <div className="relative flex flex-col lg:flex-row items-center max-w-5xl mx-auto">
             <div className="w-full lg:w-1/2 h-[400px] lg:h-[500px] z-10 relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Team collaboration" 
                  className="w-full h-full object-cover"
                />
             </div>
             
             <div className="w-full lg:w-[60%] lg:-ml-12 mt-8 lg:mt-0 z-20">
               <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 relative">
                 {/* Quote icon watermark */}
                 <div className="absolute top-8 left-8 text-blue-100 dark:text-blue-900/40 text-8xl font-serif leading-none">"</div>
                 
                 <div className="relative z-10">
                   <div className="flex justify-between items-start mb-8">
                     <div className="flex items-center space-x-4">
                       <img src="https://i.pravatar.cc/150?img=11" alt="Marvin McKinney" className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700" />
                       <div>
                         <h4 className="font-bold text-slate-900 dark:text-white text-lg">Marvin McKinney</h4>
                         <p className="text-slate-500 dark:text-slate-400 text-sm">Job Seeker</p>
                       </div>
                     </div>
                     <div className="flex items-center space-x-1 text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full">
                       <Star className="w-4 h-4 fill-current" />
                       <span className="font-bold text-sm text-slate-800 dark:text-slate-200">4.9</span>
                     </div>
                   </div>
                   
                   <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed italic">
                     "When I applied for a position at BMW, I knew I was about to experience one of the most challenging job interviews of my career. But what I didn't expect was the incredible combination of professionalism, creativity, and team culture throughout the process."
                   </p>
                   
                   <div className="flex items-center space-x-6 mt-8 text-slate-400">
                      <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                        <span className="text-sm font-medium">14</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" /></svg>
                        <span className="text-sm font-medium">0</span>
                      </button>
                   </div>
                 </div>
               </div>
               
               {/* Dots indicator */}
               <div className="flex justify-center mt-8 space-x-2">
                 <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                 <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                 <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                 <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
               </div>
             </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section id="our-team" className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Team</h2>
            <p className="text-slate-500 dark:text-slate-400">
              We believe that creative collaboration can happen anywhere and want our team to work where they feel comfortable and inspired.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Satarash Rouhani", role: "UI/UX Designer", img: "https://i.pravatar.cc/150?img=32" },
              { name: "Hossein Kordipour", role: "UI/UX Designer", img: "https://i.pravatar.cc/150?img=12" },
              { name: "Mahsa Haddadho", role: "UI/UX Designer", img: "https://i.pravatar.cc/150?img=5" },
              { name: "Fateme Kamali", role: "UI/UX Designer", img: "https://i.pravatar.cc/150?img=9" },
              { name: "Fateme Ghaemi", role: "UI/UX Designer", img: "https://i.pravatar.cc/150?img=20" },
            ].map((member, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <img src={member.img} alt={member.name} className="w-20 h-20 mx-auto rounded-full object-cover mb-4 ring-4 ring-blue-50 dark:ring-blue-900/30" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 truncate">{member.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{member.role}</p>
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

      </main>

      <Footer />
    </div>
  );
}
