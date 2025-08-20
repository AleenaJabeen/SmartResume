import React from 'react'
import { FaBlackTie } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

function Footer() {
  return (
    <div className='p-4 flex justify-between items-center'>
      <div className='flex justify-center items-center gap-2 text-[#7ADAA5] text-2xl font-semibold'>
<FaBlackTie />SmartResume</div>

      <div className='flex flex-col text-gray-400 !bg-none'>
          <ul className='flex justify-center items-center gap-6 text-sm font-medium py-2 px-4 !bg-none hover:text-black'>
          <li>Home</li>
        <li>Pricing</li>
        <li>CVTemplate</li>
        <li>Contact</li></ul>
        <div className='flex gap-12 hover:text-black items-center justify-end text-2xl p-2s'><LuFacebook /><BsTwitterX /><FaInstagram /><FiYoutube /></div>
      </div>
    </div>
  )
}

export default Footer
