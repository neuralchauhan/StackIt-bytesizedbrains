import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../config/api.js";

function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });

  const [isSubmiting, setIsSubmiting] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullname) {
      newErrors.fullname = "Fullname is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();

    if(Object.keys(validationErrors).length > 0){
      setErrors({...errors, validationErrors})
      return
    }

    setIsSubmiting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/users/signup` , formData,   {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })

        localStorage.setItem("loggedInUser", JSON.stringify(response.data.data));

        toast.success("Signed Up successfully", {
        position: "top-right",
      })
      navigate("/")
    } catch (error) {
        console.log(error)
        toast.error(error.message , {
          position : "top-right"
        })
    }
    finally{
      setIsSubmiting(false);
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div
        className="shadow-sm hover:shadow-md bg-blue-50 rounded-md"
        style={{ padding: "5rem" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {/* Fullname */}
            <div className="flex-col items-center">
              <label htmlFor="fullname">Fullname</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="John Doe"
                value={formData.fullname}
                onChange={handleChange}
                required
                className={`h-10 w-80 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm
                ${errors.fullname ? "border-red-500" : "border-gray-500"}`}
                style={{ padding: "0.5rem" }}
              />
              { errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
            </div>
            {/* username */}
            <div className="flex-col items-center">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Johndoe"
                value={formData.username}
                onChange={handleChange}
                required
                className=" h-10 w-80 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                style={{ padding: "0.5rem" }}
              />
              { errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>
            {/* email */}
            <div className="flex-col items-center">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="johndoe@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className=" h-10 w-80 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                style={{ padding: "0.5rem" }}
              />
              { errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            {/* password */}
            <div className="flex-col items-center">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="******"
                value={formData.password}
                onChange={handleChange}
                required
                className=" h-10 w-80 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                style={{ padding: "0.5rem" }}
              />
              { errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="rounded-md bg-blue-400 hover:bg-blue-600 text-white h-8 w-20"
              >
                { isSubmiting == true ? "Signing..." : "Sign Up"}
              </button>
            </div>
            <div>
              <p className="text-sm text-slate-700">
                Already have an account?{" "}
                <Link to="/signin" className="text-blue-600">
                  Sign In
                </Link>
              </p>
            </div>
            <div className="flex">
              <input type="checkbox" required className="rounded-full" />
              <p
                className="text-sm text-gray-600"
                style={{ marginLeft: "0.25rem" }}
              >
                By clicking you agree to our terms & conditions.
              </p>
            </div>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default SignUp;
