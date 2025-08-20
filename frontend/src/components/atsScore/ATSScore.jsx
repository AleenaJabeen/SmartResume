import React from "react";
import axios from 'axios';
import { useState } from "react";

function ATSScore() {
    const [file,setFile]=useState();
     const [jobDescription, setJobDescription] = useState("");
       const [result, setResult] = useState(null);


 const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

    const handleCheckScore=async(e)=>{
         e.preventDefault();
          if (!file || !jobDescription) {
      alert("Please upload a resume and enter job description");
      return;
    }
        const formData=new FormData();
        formData.append("resume", file); // must match field name used in multer
    formData.append("jobDescription", jobDescription);
        try {
      const res = await axios.post("http://localhost:3000/api/v1/ats-score-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data)

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    }
    }


  return (
    <>
    <div className="p-4 flex justify-center items-center gap-4">
      <div className="w-[40%]">
        <textarea
     className="w-full h-72 border-2 rounded border-gray-300 p-2"
          placeholder="Paste your Job description here"
           value={jobDescription}
           onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label>
          Upload Your resume here
          <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange}/>
        </label>
      </div>
    </div>
    <button onClick={handleCheckScore} className="bg-[#7ADAA5] text-white my-4 p-2 flex justify-center items-center w-36 mx-auto">Check score</button>
    {result && (
        <div className="mt-4 p-4 text-xl text-center">
          <h3 className="text-green-500">ATS Score: {result.atsScore}%</h3>
          <p>Preview: {result.matchedKeywords.map((word,index)=>{
            return<><span key={index} className="px-2">{word}</span></>
          })}</p>
        </div>
      )}
    </>
  );
}

export default ATSScore;
