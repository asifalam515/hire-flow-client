export type Role = 'CANDIDATE' | 'RECRUITER' | 'ADMIN';

export type JobStatus = 'DRAFT' | 'PUBLISHED' | 'CLOSED';

export type ApplicationStatus = 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'REJECTED';

export type InterviewStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface CompanySummary {
  id: string;
  name: string;
  slug: string;
}

export interface CandidateProfileSummary {
  id: string;
  resumeUrl?: string | null;
  parsedText?: string | null;
}

export interface User {
  id: string;
  email: string;
  role: Role;
  companyId?: string | null;
  company?: CompanySummary | null;
  candidateProfile?: CandidateProfileSummary | null;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  status: JobStatus;
  companyId: string;
  company?: CompanySummary;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  status: ApplicationStatus;
  version: number;
  jobId: string;
  job?: Job;
  candidateId: string;
  candidate?: CandidateProfileSummary;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponseData {
  user: User;
  accessToken?: string;
}
