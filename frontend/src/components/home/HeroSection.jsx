import React,{useEffect,useState} from 'react';
import hero from '../../assets/hero.png';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate=useNavigate();
  const words = ["an Interview", "a remote Job", "paid more"];
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150; // ms per letter
  const deletingSpeed = 75;

  const handleClick=()=>{
    navigate('/resume-builder')
  }
  const handleATS=()=>{
    navigate('/atsScorePdf')
  }

  useEffect(() => {
    const currentWord = words[wordIndex];

    let timeout;
    if (!isDeleting) {
      // Typing letters
      if (letterIndex < currentWord.length) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, letterIndex + 1));
          setLetterIndex(letterIndex + 1);
        }, typingSpeed);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => setIsDeleting(true), 1000);
      }
    } else {
      // Deleting letters
      if (letterIndex > 0) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, letterIndex - 1));
          setLetterIndex(letterIndex - 1);
        }, deletingSpeed);
      } else {
        // Move to next word
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [letterIndex, isDeleting, wordIndex]);
  return (
    <div className='flex justify-center items-center gap-8 py-2 px-16'>
        <div className='w-[50%] flex flex-col text-5xl font-bold'>
            <h2>This resume <br /> builder gets you</h2>
            <span className='text-[#7ADAA5] mb-2'>{text}</span>
            <div className='flex items-center gap-4'>
              <button onClick={handleClick} className='text-center bg-[#7ADAA5] text-white font-medium text-xl p-4 rounded'>Create my resume</button>
              <button onClick={handleATS} className='text-center text-[#7ADAA5] bg-blue-100 font-medium text-xl p-4 rounded'>Check ATS Score</button>
            </div>

        </div>
        <div>
            <img src={hero} alt="Hero Section Image" />
        </div>
      
    </div>
  )
}

export default HeroSection;
