export type Role = 'USER' | 'ADMIN';

export type ApplicationStatus = 'APPLIED' | 'INTERVIEW' | 'REJECTED' | 'OFFER' | 'WITHDRAWN';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  location?: string | null;
  salary?: number | null;
  deadline?: string | null;
  notes?: string | null;
  postedAt: string;
  matchScore?: number | null;
}

export interface ResumeRecord {
  id: string;
  fileName: string;
  fileSize: number;
  uploadUrl: string;
  parsedText: string;
  score: number;
  suggestions?: string | null;
  keywords?: string | null;
  createdAt: string;
}
