export type Role = 'CANDIDATE' | 'RECRUITER' | 'ADMIN';

export type JobStatus = 'DRAFT' | 'PUBLISHED' | 'CLOSED';

export type ApplicationStatus = 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'REJECTED';

export type InterviewStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface CompanySummary {
  id: string;
  name: string;
  slug: string;
  field?: string | null;
  description?: string | null;
  logoUrl?: string | null;
}

export interface CandidateProfileSummary {
  id: string;
  resumeUrl?: string | null;
  parsedText?: string | null;
}

export interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
  role: Role;
  isEmailVerified?: boolean;
  companyId?: string | null;
  company?: CompanySummary | null;
  candidateProfile?: CandidateProfileSummary | null;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  description?: string | null;
  status: JobStatus;
  category: string;
  nature: string;
  vacancies?: number | null;
  employmentTypes: string[];
  locationCountry: string;
  locationCity: string;
  exactAddress?: string | null;
  minSalary: number;
  maxSalary: number;
  isSalaryNegotiable: boolean;
  benefits: string[];
  educationLevel: string;
  yearsOfExperience: string;
  gender: string;
  candidateExperience: string[];
  languages: string[];
  softwareSkills: string[];
  responsibilities?: string | null;
  requirements?: string | null;
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
