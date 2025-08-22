import React,{useState} from "react";
import { MdFiberSmartRecord } from "react-icons/md";
import { CgMenuGridO } from "react-icons/cg";
import { Link } from "react-router-dom";



function Navbar() {
   const [open, setOpen] = useState(false);
  return (
    <>
   <nav className="flex justify-between items-center h-16 px-4 bg-[#0A1733]">
  {/* Logo (fixed on the left) */}
 <Link
  to="/"
  className="fixed z-60 text-white top-2 left-4 flex items-center gap-3 px-4 py-2 backdrop-blur-md text-lg rounded-full bg-[#0A1733]/80"
>
  <MdFiberSmartRecord className="text-2xl" />

  <div className="relative">
      {/* Trigger */}
      <span
        
        className="flex justify-center items-center gap-2 cursor-pointer text-white"
      >
        SmartResume | <CgMenuGridO onClick={() => setOpen(!open)} className="text-2xl" />
      </span>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white text-gray-800 shadow-lg">
          <ul className="flex flex-col">
            <li className="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">Modern CV</li>
            <li className="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">Creative CV</li>
            <li className="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">Minimal CV</li>
            <li className="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">Professional CV</li>
          </ul> 
        </div>
      )}
    </div>

</Link>


  {/* Button (fixed on the right) */}
  <button className="z-60 text-white fixed top-2 right-4 px-4 py-2 text-lg rounded-md backdrop-blur-md transition bg-[#0A1733]/80">
    Get Started
  </button>
</nav>

    </>
   
  );
}

export default Navbar;
