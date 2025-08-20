import React from 'react'
import resume from '../../assets/resume.avif';
import { useNavigate } from 'react-router-dom';

function ResumeTemplate() {
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate('/experience')
    }
  return (
    <div className='flex px-16 py-6 items-center justify-center gap-8'>
        <div className='flex flex-col w-[50%] gap-2'>
            <h2 className='text-4xl text-black font-bold'>Just three easy steps</h2>
            <ol className='text-3xl font-medium list-decimal p-4 px-8 flex flex-col gap-4'>
                <li>Select a template from our library of professional designs</li>
                <li>Build your resume with our industry-specific bullet points</li>
                <li>Customize the details and wrap it up. You’re ready to send!</li>
            </ol>
        <button onClick={handleClick} className='w-[50%] text-center self-center hover:bg-red-600  flex justify-center items-center text-white bg-red-400 px-6 font-medium text-2xl py-2 rounded-full'>Next</button>

            </div>
        <div><img src={resume} alt="Resume Template" /></div>
      
    </div>
  )
}

export default ResumeTemplate
