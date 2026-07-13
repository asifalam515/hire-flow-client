import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface BlogItem {
  id: string;
  title: string;
  author: string;
  date: string;
  tags: string[];
  description: string;
  image: string;
}

const BLOG_POSTS: BlogItem[] = [
  {
    id: 'change-job',
    title: 'When Should You Change Your Job?',
    author: 'Mona Amiri',
    date: '13 Mar 2025',
    tags: ['Job Market', 'Career'],
    description:
      'A professional resume increases your chances of getting hired. This article covers key tips like choosing the right format, highlighting skills, and writing concisely. Following these principles makes your resu...',
    image: '/assets/images/three-men-office.jpg',
  },
  {
    id: 'standing-out',
    title: 'Standing Out in Job Market',
    author: 'Fateme Moradi',
    date: '16 Feb 2025',
    tags: ['Freelancing', 'Skills'],
    description:
      'In a competitive job market, showcasing unique skills, tailoring your resume, and building a strong online presence can set you apart. This article explores strategies to highlight your strengths and increase yo...',
    image: '/assets/images/interview.jpg',
  },
  {
    id: 'skills-employers-seek',
    title: 'Skills Employers Seek',
    author: 'Ali Amiri',
    date: '12 May 2025',
    tags: ['Career', 'Interview'],
    description:
      'Employers value a combination of technical expertise and soft skills. This article highlights key skills like communication, problem-solving, and adaptability that make candidates more attractive to employers in any i...',
    image: '/assets/images/skills.jpg',
  },
];

export function OurBlog() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#EFF5FF] dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header with Title, Subtitle, and 'More >' Link */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end mb-12">
          
          <div className="text-center sm:text-left space-y-2 flex-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              Our Blog: Your Path to Career Success
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">
              Stay updated with the latest trends in hiring and career success
            </p>
          </div>

          <Link
            href="/blog"
            className="group flex items-center gap-1 font-bold text-sm sm:text-base text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors py-2 px-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40"
          >
            <span>More</span>
            <ChevronRight className="size-4.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3-Column Responsive Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.map((blog) => (
            <Card
              key={blog.id}
              className="group relative overflow-hidden rounded-2xl border border-blue-100/80 dark:border-border/60 bg-white dark:bg-zinc-900/90 shadow-md shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-600/10 hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Subtle Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/0 via-transparent to-blue-600/0 group-hover:from-blue-600/[0.03] group-hover:to-indigo-600/[0.03] transition-colors duration-300 pointer-events-none z-10" />

              {/* Top Image Container with Smooth Scale Animation */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-muted/60 dark:bg-zinc-800 shrink-0">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Bottom Content Area */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                
                <div className="space-y-3">
                  {/* Tags Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border/80 dark:border-border/60 bg-muted/60 dark:bg-zinc-800 px-2.5 py-1 text-xs font-bold text-foreground/80 dark:text-zinc-300 transition-colors group-hover:border-blue-300 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Author & Date Metadata */}
                  <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 pt-0.5">
                    <span>By {blog.author}</span>
                    <span>•</span>
                    <span>{blog.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg sm:text-xl text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 leading-snug">
                    {blog.title}
                  </h3>
                </div>

                {/* Description Excerpt */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 line-clamp-3 group-hover:text-foreground/80 transition-colors duration-200">
                  {blog.description}
                </p>

              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
