import React from "react";

const HomePage = () => {
  return (
    <div className="container max-h-screen max-w-screen">

      <nav>
        <div className="navbar h-18 w-full flex items-center justify-around bg-transparent shadow">
          <div className="logo-container w-20 flex justify-center items-center">
            <img src="favicon.png" className="h-8" />
            <p className="font-semibold text-slate-800 text-lg">StackIt</p>
          </div>

          <div className="search-bar w-2xl">
            <input
              className=" h-10 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="    Search Question..."
              type="text"
              name="search"
            />
          </div>

          <div className="flex gap-2.5">
            <button className=" w-20 rounded-md border-1 bg-blue-400 text-white hover:bg-blue-600">
              SignIn
            </button>
            <button className="w-20 h-8 rounded-md border-1 bg-gray-800 text-white hover:bg-gray-600">
              SignUp
            </button>
          </div>
        </div>
      </nav>

      <sidebar>
        
      </sidebar>

      <footer></footer>
    </div>
  );
};

export default HomePage;
