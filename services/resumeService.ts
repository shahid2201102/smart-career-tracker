import { prisma } from '@/lib/db';
import { analyzeResumeText, compareResumeToJobDescription } from '@/lib/openai';
import { ResumeUploadPayload } from '@/lib/validators';

export async function saveResume(userId: string, payload: ResumeUploadPayload) {
  const analysis = await analyzeResumeText(payload.parsedText);
  return prisma.resume.create({
    data: {
      fileName: payload.fileName,
      fileSize: payload.fileSize,
      uploadUrl: payload.uploadUrl,
      parsedText: payload.parsedText,
      score: analysis.score,
      suggestions: JSON.stringify(analysis.suggestions),
      keywords: JSON.stringify(analysis.keywords),
      userId
    }
  });
}

export async function getUserResumes(userId: string) {
  return prisma.resume.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' }
  });
}

export async function analyzeJobMatch(resumeId: string, jobDescription: string) {
  const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
  if (!resume) {
    throw new Error('Resume not found');
  }

  const result = await compareResumeToJobDescription(resume.parsedText, jobDescription);
  return {
    resumeId,
    matchScore: result.matchScore,
    missingKeywords: result.missingKeywords,
    recommendations: result.recommendations
  };
}
