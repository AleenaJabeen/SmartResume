// RenderTemplate.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RenderTemplate = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const handleUseTemplate = (template) => {
    navigate("/resumeform", {
      state: {
        templateName: template.template,
      },
    });
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/get-templates");
        setTemplates(res.data.templates);
        console.log(res.data.templates);
      } catch (err) {
        console.error("Error fetching templates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return <p className="text-center text-[#344666] min-h-screen py-2">Loading templates...</p>;
  }

  if (selectedTemplate) {
    return (
      <div className="p-6 text-[#0A1733]">
        <h2>Make Your Resume Using: {selectedTemplate.name}</h2>
        <textarea className="w-full" defaultValue={selectedTemplate.template} />
        <br />
        <button
          className="bg-green-400 mt-4 p-4 text-white border-0 rounded cursor-pointer"
          onClick={() => setSelectedTemplate(null)}
        >
          Back to Templates
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-4xl text-center py-4 font-bold text-[#0A1733]">
        Choose a Resume Template
      </h2>

      <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))] py-8">
        {templates.map((template) => (
          <div key={template._id} className="flex flex-col items-center">
            {/* Template Preview with hover effect */}
            <div className="relative group w-64 h-64 border border-gray-300 rounded-md overflow-hidden">
              <iframe
                title={`template-${template._id}`}
                srcDoc={template.html}
                className="absolute top-0 left-0 w-[800px] h-[1000px] scale-[0.32] origin-top-left border-0"
                scrolling="no"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <button
                  className="text-lg px-4 py-2 text-white bg-[#0A1733] rounded-md shadow-lg"
                  onClick={() => {
                    setSelectedTemplate(template);
                    handleUseTemplate(template);
                  }}
                >
                  Use Template
                </button>
              </div>
            </div>

            {/* Template Name */}
            <h3 className="text-base font-medium text-[#0A1733] mt-2 text-center">
              {template.template}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderTemplate;
