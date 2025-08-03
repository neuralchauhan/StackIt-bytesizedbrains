import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className='h-screen w-full flex items-center justify-center bg-white'>
      <div className='shadow-sm hover:shadow-md bg-blue-50 rounded-md' style={{ padding : "5rem"}}>
        <form action="">
          <div className='grid gap-4'>
          {/* Fullname */}
           <div className='flex-col items-center'>
              <label htmlFor="fullname">Fullname</label>
              <input type="text" id='fullname' name='fullname' placeholder='John Doe'
               className=" h-10 w-80 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
               style={{padding : "0.5rem"}}
               />
            </div>
          {/* username */}
           <div className='flex-col items-center'>
              <label htmlFor="username">Username</label>
              <input type="text" id='username' name='username' placeholder='Johndoe'
                className=" h-10 w-80 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                style={{padding : "0.5rem"}}/>
            </div>
            {/* email */}
             <div className='flex-col items-center'>
              <label htmlFor="email">Email</label>
              <input type="text" id='email' name='email' placeholder='johndoe@gmail.com'
                className=" h-10 w-80 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                style={{padding : "0.5rem"}}/>
            </div >
            {/* password */}
             <div className='flex-col items-center'>
              <label htmlFor="password">Password</label>
              <input type="password" id='password' name='password' placeholder='******'
                className=" h-10 w-80 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                style={{padding : "0.5rem"}}/>
            </div>
            <div>
              <button type='submit' className='rounded-md bg-blue-400 hover:bg-blue-600 text-white h-8 w-20'>SignUp</button>
            </div>
            <div>
                <p className='text-sm text-slate-700'>Already have an account? <Link to="/signin"className='text-blue-600'>Log in</Link></p>
            </div>
            <div className='flex'>
              <input type="checkbox" />
              <p className='text-sm text-gray-600' style={{ marginLeft : "0.25rem"}}>By clicking you agree to our terms & conditions.</p>
            </div>
            </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp

