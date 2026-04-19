"use client";

import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

 const Header = () => {
  return (
    <header className="h-16 w-full flex items-center justify-between px-6 bg-slate-900/60 backdrop-blur border-b border-white/10">
      
      {/* Search */}
      <div className="flex items-center bg-white/10 px-3 py-2 rounded-xl w-full max-w-md">
        <AiOutlineSearch className="text-gray-400" />
        <input
          placeholder="Search posts, users..."
          className="bg-transparent w-full px-2 text-white outline-none"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-5">
        <div className="relative cursor-pointer">
          <AiOutlineBell className="text-xl text-white" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </div>

        <FaUserCircle className="text-2xl text-white" />
      </div>
    </header>
  );
}

export default Header;