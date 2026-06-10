import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import logo from '../assets/images/farmsharm-logo.jpeg'

function Navbar() {
  const location = useLocation();
  const [registerOpen, setRegisterOpen] = useState(false);
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const registerRef = useRef(null);
  const directoryRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(
        "Inside register:",
        registerRef.current?.contains(event.target)
      );
      if(registerRef.current && !registerRef.current.contains(event.target)){
        setRegisterOpen(false);
      }
      if(directoryRef.current && !directoryRef.current.contains(event.target)){
        setDirectoryOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  },[])

  return (
    <div className="min-h flex flex-col bg-[#f7faf7] z-20">
      <header className="bg-green-800 text-white px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logo}
              alt="FarmSharm"
              className="h-10 w-10 rounded-full"
            />
            <span className="font-extrabold text-xl">FarmSharm</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2">
            <div>
              <Link to="/" className={`px-3 py-2 rounded-lg hover:bg-white/10 ${location.pathname === "/" ? "bg-white/20" : ""}`}>
                Home
              </Link>
            </div>

            {/* Register Dropdown*/}
            <div className={"relative rounded-lg hover:bg-white/10 " + (location.pathname.includes("/register") ? "bg-white/20" : "")} ref={registerRef}>
              <button
                onClick={() => {
                  setRegisterOpen(!registerOpen)
                  setDirectoryOpen(false)
                }}
                className="flex items-center gap-1 pl-2 pr-1 py-2 rounded-lg hover:bg-white/10"
              >
                Register
                <ChevronDown size={16} />
              </button>

              {registerOpen && (
                <div className='absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border z-50 ' >
                  <Link to="/register-farmer" className="block px-4 py-3 hover:bg-green-100 rounded-t-xl">
                    <span className="font-bold text-green-700">Kisan</span>
                    <span className="text-xs text-gray-500 ml-1"> / Farmer</span>
                  </Link>
                  
                  <Link to="/register-labourer" className="block px-4 py-2 hover:bg-amber-100 border-t rounded-b-xl">
                    <span className="font-bold text-amber-600">Mazdoor</span>
                    <span className="text-xs text-gray-500 ml-1"> / Labourer</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Directory Dropdown*/}
            <div className={"relative rounded-lg hover:bg-white/10 " + (location.pathname.includes("/labourers") || location.pathname.includes("/farmers") ? "bg-white/20" : "")} ref={directoryRef}>
              <button
                onClick={() => {
                  setDirectoryOpen(!directoryOpen)
                  setRegisterOpen(false)
                }}
                className="flex items-center gap-1 pl-2 pr-1 py-2 rounded-lg hover:bg-white/10"
              >
                Directory
                <ChevronDown size={16} />
              </button>
              {directoryOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-10 border z-50">
                  <Link to="/farmers" className="block px-4 py-3 hover:bg-green-100 rounded-t-xl">
                    <span className="font-bold text-green-700">Kisan</span>
                    <span className="text-xs text-gray-500 ml-1"> / Farmers</span>
                  </Link>
                  <Link to="/labourers" className="block px-4 py-2 hover:bg-amber-100 border-t rounded-b-xl">
                    <span className="font-bold text-amber-600">Mazdoor</span>
                    <span className="text-xs text-gray-500 ml-1"> / Labourers</span>
                  </Link>
                </div>
              )}  
            </div>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Navbar
