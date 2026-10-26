'use client';

// Re-export the canonical unified JobCard from shared components
// to maintain backwards compatibility while eliminating component duplication
export { JobCard, type JobItem, type JobCardProps } from '@/components/shared/JobCard';
