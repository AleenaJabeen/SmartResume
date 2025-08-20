
import { calculateATSScore } from "../util/atsScore.js";
import PDFParser from "pdf2json";



export const atsFromResumeData = async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;

    if (!resumeData || !jobDescription) {
      return res.status(400).json({ error: "resumeData and jobDescription are required" });
    }

    // Combine resumeData into plain text
    let resumeText = `
      ${resumeData.name} ${resumeData.title} 
      ${resumeData.summary}
      ${resumeData.skills?.join(" ")}
      ${resumeData.experience?.map(exp => exp.position + " " + exp.company + " " + exp.details?.join(" ")).join(" ")}
      ${resumeData.education?.map(edu => edu.degree + " " + edu.institution).join(" ")}
      ${resumeData.languages} ${resumeData.certificates} ${resumeData.awards}
    `;

    const result = calculateATSScore(resumeText, jobDescription);

    res.json({
      type: "resumeData",
      ...result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }


};

export const atsFromPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "PDF resume is required" });
    }
    if (!req.body.jobDescription) {
      return res.status(400).json({ error: "Job description is required" });
    }

    // pdf2json works with file paths, so we need to save the uploaded file temporarily
    const pdfBuffer = req.file.buffer;
    const tempPath = `./public/temp/${Date.now()}_resume.pdf`;

    // Write buffer to a temp file
    await import("fs/promises").then(fs => fs.writeFile(tempPath, pdfBuffer));

    // Create parser
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", errData => {
      console.error("PDF parsing error:", errData.parserError);
      return res.status(500).json({ error: "Failed to parse PDF" });
    });

    pdfParser.on("pdfParser_dataReady", pdfData => {
      // Extract text content
      let resumeText = "";
      pdfData.Pages.forEach(page => {
        page.Texts.forEach(textObj => {
          textObj.R.forEach(run => {
            resumeText += decodeURIComponent(run.T) + " ";
          });
        });
        resumeText += "\n";
      });
      resumeText = cleanText(resumeText);

      const result = calculateATSScore(resumeText, req.body.jobDescription);

      res.json({
        type: "pdf",
        ...result,
        extractedResumePreview: resumeText.slice(0, 300) + "..."
      });
    });

    // Load the PDF
    pdfParser.loadPDF(tempPath);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
function cleanText(text) {
  return text
    // join letters separated by spaces (e.g. "S o f t w a r e" → "Software")
    .replace(/(\b(?:[A-Za-z]\s+){2,}[A-Za-z]\b)/g, match =>
      match.replace(/\s+/g, "")
    )
    // collapse multiple spaces to one
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim();
}