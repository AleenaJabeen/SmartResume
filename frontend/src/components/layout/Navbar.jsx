import React from "react";
import { FaBlackTie } from "react-icons/fa6";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4">
      <Link to="/" className="text-[#7ADAA5] text-3xl flex items-center justify-center gap-2 font-bold no-underline"><FaBlackTie />SmartResume</Link>
      <ul className="flex justify-center items-center rounded-full gap-6 border border-[#7ADAA5] px-4 py-2 text-black">
        <Link to="/"><li>Home</li></Link>
        <li>Pricing</li>
        <Link to="/render-template"><li>Resume Template</li></Link>
        <li>Contact</li>
      </ul>
      <div className="border-[#7ADAA5] border-2 text-[#7ADAA5] p-2 px-4 rounded-lg text-lg font-bold">Get Started</div>
    </nav>
  );
}

export default Navbar;
