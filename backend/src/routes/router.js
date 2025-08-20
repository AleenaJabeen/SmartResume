import { Router } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import puppeteer from 'puppeteer'
import {templates,dummyData,renderTemplate} from "../controllers/templateAdd.controller.js";
import { Template } from "../models/template.model.js";
import { generateToken } from "../util/token.js";

const router=Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
router.get("/get-templates", async (req, res) => {
  try {
    // Upsert each template (insert if missing, update if exists)
    for (const tmpl of templates) {
      await Template.updateOne(
        { template: tmpl.template },
        { $set: tmpl },
        { upsert: true }
      );
    }

    console.log("Templates synced successfully!");

    // Fetch updated template list
    let templateData = await Template.find({});

    // Render with dummy data
    templateData = templateData.map(t => ({
      ...t.toObject(),
      html: renderTemplate(t.html, dummyData)
    }));

    res.json({
      status: "success",
      count: templateData.length,
      templates: templateData
    });

  } catch (err) {
    console.error("Error in /get-templates:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
});
router.post("/generate-resume", async (req, res) => {
  console.log("Body received:", req.body);
  try {
    const { templateName, resumeData } = req.body;
    if (!templateName || !resumeData) {
      return res.status(400).json({ error: "Missing templateName or resumeData" });
    }

    const template = await Template.findOne({ template: templateName });
    if (!template) return res.status(404).json({ error: "Template not found" });
const token = generateToken();
    const html = renderTemplate(template.html, resumeData);
    const options={
     httpOnly:true,
     secure:true
   }

    res.status(200).cookie("token",token,options).json({ category: template.category,template:template.template, message: "ok success", html });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/generate-resume-image", async (req, res) => {
  try {
    const { templateName, resumeData } = req.body;

    if (!templateName || !resumeData) {
      return res.status(400).json({ message: "Template name and resume data are required" });
    }

    // 1. Fetch template
    const template = await Template.findOne({ template: templateName });
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    // 2. Merge resumeData into template HTML
    const html = renderTemplate(template.html, resumeData);

    // 3. Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: puppeteer.executablePath(),
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Set viewport to A4 for consistency
    await page.setViewport({ width: 794, height: 1123 });

    // 4. Screenshot
    const screenshotBuffer = await page.screenshot({ type: "png", fullPage: true });

    await browser.close();
    //base 64 image url
    //  const base64Image = screenshotBuffer.toString("base64");

    // 5. Save to /public/resumes/
    
    const publicDir = path.join(__dirname, "../../public/resumes");
    console.log(publicDir)
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const fileName = `${templateName}-${Date.now()}.png`;
    const filePath = path.join(publicDir, fileName);
    fs.writeFileSync(filePath, screenshotBuffer);

    // Public URL (served from Express static)
    const fileUrl = `/resumes/${fileName}`;

    // 6. Respond
    res.json({
      template: template.template,
      category: template.category,
      imageUrl: fileUrl,
    });

  } catch (error) {
    console.error("Error generating resume image:", error);
    res.status(500).json({ message: "Error generating resume image" });
  }
});



 router.route('/generate-resume-pdf').post(async (req, res) => {
  try {
    const { templateName, resumeData } = req.body;

    if (!templateName || !resumeData) {
      return res.status(400).json({ message: "Template name and resume data are required" });
    }

    // Fetch template from database
    const template = await Template.findOne({ template: templateName });
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    // Merge resumeData into template HTML
    const html = renderTemplate(template.html, resumeData); // or your renderTemplate function

    // Launch Puppeteer to generate PDF
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: puppeteer.executablePath(),
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="resume.pdf"`
    );
    res.end(pdfBuffer);

  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});



export default router;