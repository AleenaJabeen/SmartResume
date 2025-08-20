// RenderTemplate.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RenderTemplate = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate=useNavigate();

  const handleUseTemplate=(template)=>{
    // console.log("hello",template)
    navigate('/resumeform',{
        state: {
        templateName:template.template , 
        }
    }
    )

  }

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/get-templates");
        setTemplates(res.data.templates);
        console.log(res.data.templates)
      } catch (err) {
        console.error("Error fetching templates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return <p className="text-center">Loading templates...</p>;
  }

  if (selectedTemplate) {
    return (
      <div className="p-6">
        <h2>Make Your Resume Using: {selectedTemplate.name}</h2>
        <textarea
         className="w-full"
          defaultValue={selectedTemplate.template}
        />
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
    <div className="p-4">
      <h2 className="text-4xl text-center py-4 text-black font-bold">Choose a Resume Template</h2>
      <div
        className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]"
      >
        {templates.map((template) => (
          <div
            key={template._id}
          >
           

            {/* Render iframe preview */}
     
  <div className="w-64 h-64 relative overflow-hidden border border-gray-300 rounded-md">
  <iframe
    title={`template-${template._id}`}
    srcDoc={template.html}
    className="absolute top-0 left-0 w-[800px] h-[1000px] scale-[0.32] origin-top-left border-0"
    scrolling="no"
  />
</div>
 <h3 className="text-base font-medium">{template.template}</h3>

            <button
              className="text-xl px-4 py-2 text-white bg-[#7ADAA5] rounded-md"
              onClick={() => {
                setSelectedTemplate(template);
                handleUseTemplate(template)
              }
            }
            >
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderTemplate;
