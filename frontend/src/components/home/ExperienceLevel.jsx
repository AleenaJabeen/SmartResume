import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ExperienceFlow() {
  const [formData, setFormData] = useState({
    experience: null,
    designation: null,
    education: null,
  });

  const skipDesignation =
    formData.experience === "3-5 Years" ||
    formData.experience === "5-10 Years" ||
    formData.experience === "10+ Years";

  return (
    <div className="flex flex-col justify-center items-center p-16 gap-8">
      <ExperienceLevel
        selected={formData.experience}
        onSelect={(value) =>
          setFormData((prev) => ({ ...prev, experience: value }))
        }
      />

      {/* Show designation only if not skipping */}
      {formData.experience && !skipDesignation && (
        <Designation
          selected={formData.designation}
          onSelect={(value) =>
            setFormData((prev) => ({ ...prev, designation: value }))
          }
        />
      )}

      {/* Education appears if designation is answered OR we're skipping designation */}
      {((!skipDesignation && formData.designation) || skipDesignation) && (
        <EducationSelect
          selected={formData.education}
          onSelect={(value) =>
            setFormData((prev) => ({ ...prev, education: value }))
          }
        />
      )}
    </div>
  );
}

function ExperienceLevel({ selected, onSelect }) {
  const experienceYears = [
    "No Experience",
    "Less Than 3 Years",
    "3-5 Years",
    "5-10 Years",
    "10+ Years",
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-4xl font-bold">How long have you been working?</h2>
      <h3>We'll find the best templates for your experience level.</h3>
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {experienceYears.map((years, index) => (
          <div
            key={index}
            onClick={() => onSelect(years)}
            className={`text-2xl cursor-pointer p-4 rounded border 
              ${selected === years
                ? "text-green-400 border-green-400"
                : "text-[#7ADAA5] border-[#7ADAA5] hover:text-green-400 hover:border-green-400"}`}
          >
            {years}
          </div>
        ))}
      </div>
    </div>
  );
}

function Designation({ selected, onSelect }) {
  const designation = ["Yes", "No"];

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-3xl font-bold">Are you a student?</h2>
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {designation.map((type, index) => (
          <div
            key={index}
            onClick={() =>{
                onSelect(type);
              
            }}
            className={`text-xl cursor-pointer p-3 rounded border 
              ${selected === type
                ? "text-green-400 border-green-400"
                : "text-[#7ADAA5] border-[#7ADAA5] hover:text-green-400 hover:border-green-400"}`}
          >
            {type}
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationSelect({ selected, onSelect }) {
  const education = ["High School", "College/University", "Other"];
const navigate=useNavigate();
  const handleNavigate=()=>{
    navigate('/render-template')
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-3xl font-bold">
        What's your highest level of education?
      </h2>
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {education.map((edu, index) => (
          <div
            key={index}
            onClick={() => {
                onSelect(edu)
                handleNavigate()
            }}
            className={`text-xl cursor-pointer p-3 rounded border 
              ${selected === edu
                ? "text-green-400 border-green-400"
                : "text-[#7ADAA5] border-[#7ADAA5] hover:text-green-400 hover:border-green-400"}`}
          >
            {edu}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceFlow;
