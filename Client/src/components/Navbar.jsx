import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  const authUser = localStorage.getItem("loggedInUser");

  return (
    <div>
        <div className="navbar h-18 w-full flex items-center justify-between bg-transparent shadow px-10">
          <Link to={"/"}>
          <div className="logo-container flex justify-center items-center">
            <img src="/favicon.png" className="h-8" />
            <p className="font-semibold text-slate-800 text-lg">StackIt</p>
          </div>
          </Link>

          <div className="search-bar w-xl">
            <input
              className=" h-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search Question..."
              type="text"
              name="search"
            />
          </div>

          <div className="flex gap-2.5">
            { !authUser ? 
              <div className='flex gap-3'>
             <button className=" w-20 h-8 rounded-md border-1 bg-blue-400 text-white hover:bg-blue-600">
              <Link to="/signin"> SignIn</Link>
            </button>
            <button className="w-20 h-8 rounded-md border-1 bg-gray-800 text-white hover:bg-gray-600">
              <Link to="/signup"> SignUp</Link>
            </button>
            </div>
            : 
            <div className='flex gap-3'>
            <button className="w-20 h-8 rounded-md border-1 bg-gray-800 text-white hover:bg-gray-600">
              <Link to="/ask">Ask</Link>
            </button>
            <form onSubmit={() => localStorage.clear()}>
              <button className="w-20 h-8 rounded-md border-1 bg-blue-400 text-white hover:bg-blue-600">
                Logout
              </button>
            </form>
            </div>
            }
          </div>
        </div>
    </div>
  )
}

export default Navbar
