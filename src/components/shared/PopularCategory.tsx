import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Code2,
  PenTool,
  Users,
  Briefcase,
  Edit3,
  Globe,
  LayoutTemplate,
  CheckSquare,
} from 'lucide-react';

interface CategoryItem {
  id: string;
  title: string;
  count: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'wordpress-dev',
    title: 'Wordpress Developer',
    count: '72+ Job available',
    icon: Globe,
  },
  {
    id: 'software-dev',
    title: 'Software Developer',
    count: '121+ Job available',
    icon: Code2,
  },
  {
    id: 'software-tester',
    title: 'Software Tester',
    count: '104+ Job available',
    icon: CheckSquare,
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    count: '58+ Job available',
    icon: PenTool,
  },
  {
    id: 'team-leader',
    title: 'Team Leader',
    count: '35+ Job available',
    icon: Users,
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    count: '96+ Job available',
    icon: LayoutTemplate,
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    count: '78+ Job available',
    icon: Briefcase,
  },
  {
    id: 'ui-designer',
    title: 'UI Designer',
    count: '64+ Job available',
    icon: Edit3,
  },
];

export function PopularCategory() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#EFF5FF] dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            Popular Category
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
            The last job offers Upload
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className="group relative overflow-hidden rounded-2xl border border-blue-100/80 dark:border-border/60 bg-white dark:bg-zinc-900/90 p-5 sm:p-6 shadow-md shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-600/10 hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex items-center gap-4"
              >
                {/* Subtle Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/0 via-transparent to-blue-600/0 group-hover:from-blue-600/[0.03] group-hover:to-indigo-600/[0.03] transition-colors duration-300 pointer-events-none" />

                {/* Category Icon Box */}
                <div className="size-14 rounded-2xl bg-muted/70 dark:bg-zinc-800 flex items-center justify-center text-foreground group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-md group-hover:shadow-blue-600/30 transition-all duration-300 shrink-0">
                  <IconComponent className="size-6.5 transition-transform duration-300" />
                </div>

                {/* Category Text Information */}
                <div className="space-y-1 min-w-0">
                  <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 truncate leading-snug">
                    {category.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200">
                    {category.count}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
