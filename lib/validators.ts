import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email({ message: 'Provide a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  name: z.string().min(2, { message: 'Name is required' }).max(50)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const jobApplicationSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  status: z.enum(['APPLIED', 'INTERVIEW', 'REJECTED', 'OFFER', 'WITHDRAWN']),
  location: z.string().optional(),
  salary: z.number().int().positive().optional(),
  deadline: z.string().optional(),
  notes: z.string().optional()
});

export const resumeUploadSchema = z.object({
  fileName: z.string().min(1),
  fileSize: z.number().int().positive(),
  uploadUrl: z.string().url(),
  parsedText: z.string().min(1)
});

export type AuthPayload = z.infer<typeof authSchema>;
export type LoginPayload = z.infer<typeof loginSchema>;
export type JobApplicationPayload = z.infer<typeof jobApplicationSchema>;
export type ResumeUploadPayload = z.infer<typeof resumeUploadSchema>;
