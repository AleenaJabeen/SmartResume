import React, { useEffect, useMemo, useRef, useState } from "react";
import Template from "./Templates";
import { useLocation } from "react-router-dom";
import axios from "axios";

/** 🔧 Change these to match your backend */
const GENERATE_HTML_URL = "http://localhost:3000/api/v1/generate-resume";      // returns { html: "<!doctype html>..." }
const GENERATE_PDF_URL  = "http://localhost:3000/api/v1/generate-resume-pdf";  // returns PDF blob

export default function ResumeForm() {
   const location = useLocation();
   const { templateName } = location.state; 
  const [step, setStep] = useState(1);
  const [autoPreview, setAutoPreview] = useState(true);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [errors, setErrors] = useState({});
  const [templateHTML, setTemplateHTML] = useState("");

  const [resumeData, setResumeData] = useState({
    name: "",
    title: "",
    address: "",
    phone: "",
    email: "",
    photoUrl: "",
    summary: "",
    experience: [
      { position: "", company: "", startDate: "", endDate: "", details: [""] },
    ],
    education: [{ degree: "", institution: "", startDate: "", endDate: "" }],
    skills: [""],
    languages: "",
    certificates: "",
    awards: "",
  });

  /** -------------------------
   * Helpers: state updaters
   * ------------------------- */
  const handleChange = (field, value) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (section, index, field, value) => {
    const updated = [...resumeData[section]];
    updated[index][field] = value;
    setResumeData((prev) => ({ ...prev, [section]: updated }));
  };

  const handleDetailsChange = (expIdx, detailIdx, value) => {
    const updated = [...resumeData.experience];
    updated[expIdx].details[detailIdx] = value;
    setResumeData((prev) => ({ ...prev, experience: updated }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { position: "", company: "", startDate: "", endDate: "", details: [""] },
      ],
    }));
  };
  const removeExperience = (idx) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx),
    }));
  };
  const addExpDetail = (idx) => {
    const updated = [...resumeData.experience];
    updated[idx].details.push("");
    setResumeData((prev) => ({ ...prev, experience: updated }));
  };
  const removeExpDetail = (idx, dIdx) => {
    const updated = [...resumeData.experience];
    updated[idx].details = updated[idx].details.filter((_, i) => i !== dIdx);
    setResumeData((prev) => ({ ...prev, experience: updated }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: "", institution: "", startDate: "", endDate: "" },
      ],
    }));
  };
  const removeEducation = (idx) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx),
    }));
  };

  const handleSkillChange = (index, value) => {
    const updated = [...resumeData.skills];
    updated[index] = value;
    setResumeData((prev) => ({ ...prev, skills: updated }));
  };
  const addSkill = () => setResumeData((p) => ({ ...p, skills: [...p.skills, ""] }));
  const removeSkill = (idx) =>
    setResumeData((p) => ({ ...p, skills: p.skills.filter((_, i) => i !== idx) }));

  /** -------------------------
   * Validation per step
   * ------------------------- */
  const validateStep = (currentStep = step) => {
    const e = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (currentStep === 1) {
      if (!resumeData.name.trim()) e.name = "Name is required.";
      if (!resumeData.title.trim()) e.title = "Title is required.";
      if (!resumeData.address.trim()) e.address = "Address is required.";
      if (!resumeData.phone.trim()) e.phone = "Phone is required.";
      if (!resumeData.email.trim()) e.email = "Email is required.";
      else if (!emailRegex.test(resumeData.email)) e.email = "Enter a valid email.";
    }

    if (currentStep === 2) {
      resumeData.experience.forEach((x, i) => {
        if (!x.position.trim()) e[`exp_position_${i}`] = "Position is required.";
        if (!x.company.trim()) e[`exp_company_${i}`] = "Company is required.";
      });
    }

    if (currentStep === 3) {
      resumeData.education.forEach((x, i) => {
        if (!x.degree.trim()) e[`edu_degree_${i}`] = "Degree is required.";
        if (!x.institution.trim()) e[`edu_institution_${i}`] = "Institution is required.";
      });
    }

    if (currentStep === 4) {
      const hasSkill = resumeData.skills.some((s) => s.trim() !== "");
      if (!hasSkill) e.skills = "Add at least one skill.";
    }

    if (currentStep === 5) {
      if (!resumeData.summary.trim()) e.summary = "Summary is required.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /** -------------------------
   * Step navigation
   * ------------------------- */
  const nextStep = () => {
    if (validateStep(step)) setStep((s) => Math.min(6, s + 1));
  };
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  /** -------------------------
   * API: Generate HTML template
   * ------------------------- */
 const generatePreview = async () => {

    setLoadingPreview(true);
    try {
     const res = await axios.post(GENERATE_HTML_URL, {
      templateName, // string
      resumeData,   // your JSON data
    });
      const data = await res.data;
      setTemplateHTML(data.html || "");
    } catch (err) {
      console.error("Preview generation failed", err);
    } finally {
      setLoadingPreview(false);
    }
  };


  /** Auto preview when toggled on + data changes (debounced) */
  const debounceRef = useRef(null);
  useEffect(() => {
    if (!autoPreview) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // Only try to preview if basic heading (step 1) is valid-ish to avoid empty screens
      if (resumeData.name || resumeData.title || resumeData.email) {
        generatePreview();
      }
    }, 500);
    return () => clearTimeout(debounceRef.current);
  }, [resumeData, autoPreview]); // eslint-disable-line

  /** -------------------------
   * API: Download PDF
   * ------------------------- */
const downloadPDF = async () => {
  try {
    const res = await axios.post(
      GENERATE_PDF_URL,
      {
        templateName,  // string
        resumeData,    // JSON data
      },
      {
        headers: { "Content-Type": "application/json" },
        responseType: "blob", // Important for PDF download
      }
    );

    // No need for res.ok in Axios
    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${resumeData.name || "resume"}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("PDF generation failed", err);
    alert("PDF generation failed. Check console for details.");
  }
};

  /** Utility to show field error text */
  const FieldError = ({ name }) =>
    errors[name] ? <p className="text-red-600 text-sm mt-1">{errors[name]}</p> : null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-[#7ADAA5] text-white p-6 space-y-6">
        <h2 className="text-xl font-bold">SmartResume</h2>
        <ul className="space-y-2 list-disc ps-6 text-lg">
          <li className={step === 1 ? "font-extrabold" : "font-normal"}>Heading</li>
          <li className={step === 2 ? "font-extrabold" : "font-normal"}>Experience</li>
          <li className={step === 3 ? "font-extrabold" : "font-normal"}>Education</li>
          <li className={step === 4 ? "font-extrabold" : "font-normal"}>Skills</li>
          <li className={step === 5 ?"font-extrabold" : "font-normal"}>Summary</li>
          <li className={step === 6 ? "font-extrabold" : "font-normal"}>Additional Info</li>
        </ul>

        <div className="pt-4 border-t border-white/30">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autoPreview}
              onChange={(e) => setAutoPreview(e.target.checked)}
            />
            Auto-update preview
          </label>
        </div>
      </aside>

      {/* Form + Preview */}
      <main className="flex-1 p-6 grid grid-cols-3 gap-6">
        {/* Form Area */}
        <div className="col-span-2 bg-white p-6 rounded shadow">
          {/* Step 1 - Heading */}
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={resumeData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="border p-2 w-full"
                  />
                  <FieldError name="name" />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Title"
                    value={resumeData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="border p-2 w-full"
                  />
                  <FieldError name="title" />
                </div>

                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Address"
                    value={resumeData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="border p-2 w-full"
                  />
                  <FieldError name="address" />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Phone"
                    value={resumeData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="border p-2 w-full"
                  />
                  <FieldError name="phone" />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={resumeData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="border p-2 w-full"
                  />
                  <FieldError name="email" />
                </div>

                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Photo URL (optional)"
                    value={resumeData.photoUrl}
                    onChange={(e) => handleChange("photoUrl", e.target.value)}
                    className="border p-2 w-full"
                  />
                </div>
              </div>
            </>
          )}

          {/* Step 2 - Experience */}
          {step === 2 && (
            <>
              <h2 className="text-xl font-bold mb-4">Experience</h2>
              {resumeData.experience.map((exp, idx) => (
                <div key={idx} className="mb-4 border p-3 rounded">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <input
                        type="text"
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) =>
                          handleArrayChange("experience", idx, "position", e.target.value)
                        }
                        className="border p-2 w-full"
                      />
                      <FieldError name={`exp_position_${idx}`} />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) =>
                          handleArrayChange("experience", idx, "company", e.target.value)
                        }
                        className="border p-2 w-full"
                      />
                      <FieldError name={`exp_company_${idx}`} />
                    </div>
                    <input
                      type="text"
                      placeholder="Start Date (e.g., Jan 2012)"
                      value={exp.startDate}
                      onChange={(e) =>
                        handleArrayChange("experience", idx, "startDate", e.target.value)
                      }
                      className="border p-2 w-full"
                    />
                    <input
                      type="text"
                      placeholder="End Date (e.g., Present)"
                      value={exp.endDate}
                      onChange={(e) =>
                        handleArrayChange("experience", idx, "endDate", e.target.value)
                      }
                      className="border p-2 w-full"
                    />
                  </div>

                  {/* Details bullets */}
                  <div className="mt-3 space-y-2">
                    {exp.details.map((d, dIdx) => (
                      <div key={dIdx} className="flex gap-2">
                        <input
                          type="text"
                          placeholder={`Bullet point #${dIdx + 1}`}
                          value={d}
                          onChange={(e) => handleDetailsChange(idx, dIdx, e.target.value)}
                          className="border p-2 w-full"
                        />
                        {exp.details.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeExpDetail(idx, dIdx)}
                            className="px-2 bg-red-100 rounded"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addExpDetail(idx)}
                      className="text-sm px-2 py-1 bg-gray-100 rounded"
                    >
                      + Add Detail
                    </button>
                  </div>

                  {resumeData.experience.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(idx)}
                      className="mt-3 px-3 py-1 bg-red-200 rounded"
                    >
                      Remove Experience
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addExperience}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                + Add Experience
              </button>
            </>
          )}

          {/* Step 3 - Education */}
          {step === 3 && (
            <>
              <h2 className="text-xl font-bold mb-4">Education</h2>
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="mb-4 border p-3 rounded">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) =>
                          handleArrayChange("education", idx, "degree", e.target.value)
                        }
                        className="border p-2 w-full"
                      />
                      <FieldError name={`edu_degree_${idx}`} />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) =>
                          handleArrayChange("education", idx, "institution", e.target.value)
                        }
                        className="border p-2 w-full"
                      />
                      <FieldError name={`edu_institution_${idx}`} />
                    </div>
                    <input
                      type="text"
                      placeholder="Start Date (e.g., Aug 2006)"
                      value={edu.startDate}
                      onChange={(e) =>
                        handleArrayChange("education", idx, "startDate", e.target.value)
                      }
                      className="border p-2 w-full"
                    />
                    <input
                      type="text"
                      placeholder="End Date (e.g., Oct 2008)"
                      value={edu.endDate}
                      onChange={(e) =>
                        handleArrayChange("education", idx, "endDate", e.target.value)
                      }
                      className="border p-2 w-full"
                    />
                  </div>

                  {resumeData.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(idx)}
                      className="mt-3 px-3 py-1 bg-red-200 rounded"
                    >
                      Remove Education
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addEducation}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                + Add Education
              </button>
            </>
          )}

          {/* Step 4 - Skills */}
          {step === 4 && (
            <>
              <h2 className="text-xl font-bold mb-4">Skills</h2>
              {resumeData.skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Skill"
                    value={skill}
                    onChange={(e) => handleSkillChange(idx, e.target.value)}
                    className="border p-2 w-full"
                  />
                  {resumeData.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(idx)}
                      className="px-2 bg-red-100 rounded"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <FieldError name="skills" />
              <button
                type="button"
                onClick={addSkill}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                + Add Skill
              </button>
            </>
          )}

          {/* Step 5 - Summary */}
          {step === 5 && (
            <>
              <h2 className="text-xl font-bold mb-4">Summary</h2>
              <textarea
                placeholder="Professional Summary"
                value={resumeData.summary}
                onChange={(e) => handleChange("summary", e.target.value)}
                className="border p-2 w-full h-40"
              />
              <FieldError name="summary" />
            </>
          )}

          {/* Step 6 - Additional Info */}
          {step === 6 && (
            <>
              <h2 className="text-xl font-bold mb-4">Additional Information</h2>
              <input
                type="text"
                placeholder="Languages (e.g., English, French)"
                value={resumeData.languages}
                onChange={(e) => handleChange("languages", e.target.value)}
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Certificates"
                value={resumeData.certificates}
                onChange={(e) => handleChange("certificates", e.target.value)}
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Awards"
                value={resumeData.awards}
                onChange={(e) => handleChange("awards", e.target.value)}
                className="border p-2 w-full mb-2"
              />
            </>
          )}

          {/* Navigation + Actions */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Back
              </button>
            )}
            {step < 6 && (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-[#7ADAA5] text-white rounded"
              >
                Next
              </button>
            )}

            {/* Generate Preview always available */}
            <button
              type="button"
              onClick={() => {
                if (validateStep(step)) generatePreview();
              }}
              className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded"
              disabled={loadingPreview}
            >
              {loadingPreview ? "Generating Preview..." : "Generate Preview"}
            </button>

            {/* Download PDF */}
            <button
              type="button"
              onClick={downloadPDF}
              className="px-4 py-2 bg-pink-600 text-white rounded"
              disabled={downloading}
            >
              {downloading ? "Downloading..." : "Download PDF"}
            </button>
          </div>
        </div>

        {/* Preview Area (uses API HTML) */}
       
          <Template templateHTML={templateHTML}/>
       
      </main>
    </div>
  );
}
