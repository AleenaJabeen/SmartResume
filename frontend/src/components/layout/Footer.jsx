import { FaTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdFiberSmartRecord } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#0A1733] text-gray-300 px-8 py-10">
      <div className="max-w-9xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8">
          {/* Logo */}
        <div>
          <div className="text-white text-3xl items-center font-bold flex gap-2  px-2 py-1">
    <MdFiberSmartRecord className="text-2xl" />
    SmartResume 
 </div>
 </div>     
          <div>
            <h2 className="font-semibold text-white mb-3">Useful Links</h2>
            <ul className="space-y-2">
              <Link to="/"><li className="hover:text-white">Home</li></Link>
              <Link><li  className="hover:text-white">Categories</li></Link>
              <Link><li  className="hover:text-white">Templates</li></Link>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h2 className="font-semibold text-white mb-3">Categorías</h2>
            <ul className="grid grid-cols-1 gap-y-2">
              <Link><li  className="hover:text-white">Resume</li></Link>
              <Link><li className="hover:text-white">CV</li></Link>
              <Link><li className="hover:text-white">Cover Letter</li></Link>
             
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6">
          {/* Social Icons */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link to="#" className="hover:text-white"><FaTwitter size={18} /></Link>
            <Link to="#" className="hover:text-white"><FaLinkedinIn size={18} /></Link>
            <Link to="#" className="hover:text-white"><FaFacebookF size={18} /></Link>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <p  className="hover:text-white">&copy; 2019.All rights reserved. </p>
        
          </div>
        </div>
      </div>
    </footer>
  );
}
