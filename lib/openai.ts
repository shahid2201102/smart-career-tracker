import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY?.trim();
const hasValidApiKey = !!(apiKey && !apiKey.includes('your-openai-api-key-here') && !apiKey.includes('replace-with-openai-api-key'));
console.log('OpenAI API Key Check:', { hasValidApiKey, keyLength: apiKey?.length });
export const openai = hasValidApiKey && apiKey ? new OpenAI({ apiKey }) : null;

function fallbackResumeAnalysis() {
  return {
    score: 58,
    suggestions: ['Break bullet points into achievement statements.', 'Emphasize measurable outcomes.'],
    keywords: ['team collaboration', 'deadline management', 'leadership'],
    weakAreas: ['quantified impact', 'resume formatting', 'technical keywords']
  };
}

function fallbackJobMatch() {
  return {
    matchScore: 45,
    missingKeywords: ['ATS-friendly phrasing', 'industry keywords', 'impact metrics'],
    recommendations: ['Add achievement metrics.', 'Match technical keywords from the posting.']
  };
}

export async function analyzeResumeText(text: string) {
  if (!openai) {
    return fallbackResumeAnalysis();
  }

  const prompt = `You are an AI career coach. Review the following resume text and return a JSON object with keys: score (0-100), suggestions (array of strings), keywords (array of strings), weakAreas (array of strings). Resume:\n${text}`;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400,
      temperature: 0.4
    });

    const rawOutput = completion.choices?.[0]?.message?.content ?? '';
    const parsed = JSON.parse(rawOutput);
    return {
      score: Number(parsed.score ?? 50),
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
      weakAreas: Array.isArray(parsed.weakAreas) ? parsed.weakAreas : []
    };
  } catch (error) {
    console.error('Resume analysis error:', error);
    return fallbackResumeAnalysis();
  }
}

export async function compareResumeToJobDescription(resumeText: string, jobDescription: string) {
  if (!openai) {
    return fallbackJobMatch();
  }

  const prompt = `Compare the candidate resume text and the job description. Return JSON with matchScore (0-100), missingKeywords (array), and recommendations (array). Resume:\n${resumeText}\nJob Description:\n${jobDescription}`;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 350,
      temperature: 0.4
    });

    const rawOutput = completion.choices?.[0]?.message?.content ?? '';
    const parsed = JSON.parse(rawOutput);
    return {
      matchScore: Number(parsed.matchScore ?? 40),
      missingKeywords: Array.isArray(parsed.missingKeywords) ? parsed.missingKeywords : [],
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : []
    };
  } catch (error) {
    console.error('Job match analysis error:', error);
    return fallbackJobMatch();
  }
}
