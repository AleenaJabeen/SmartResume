// utils/atsScore.js
import natural from "natural";

const tokenizer = new natural.WordTokenizer();

// Helper to calculate ATS score
export const calculateATSScore = (resumeText, jobDescription) => {
  const resumeTokens = tokenizer.tokenize(resumeText.toLowerCase());
  const jobTokens = tokenizer.tokenize(jobDescription.toLowerCase());

  // Remove stopwords (optional improvement)
  const stopwords = ["the", "and", "a", "to", "of", "in", "for", "on", "with"];
  const filteredJobTokens = jobTokens.filter(t => !stopwords.includes(t));
  const filteredResumeTokens = resumeTokens.filter(t => !stopwords.includes(t));

  const matches = filteredJobTokens.filter(token =>
    filteredResumeTokens.includes(token)
  );

  const score = Math.round((matches.length / filteredJobTokens.length) * 100);

  return {
    atsScore: score,
    matchedKeywords: [...new Set(matches)],
    totalKeywords: filteredJobTokens.length,
  };
};
