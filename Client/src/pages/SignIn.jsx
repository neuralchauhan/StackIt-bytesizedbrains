import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmiting, setIsSubmiting] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmiting(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/signin`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("loggedInUser", JSON.stringify(response.data.data));

      toast.success("Signed In successfully", {
        position: "top-right",
      })

      navigate("/")
    } catch (error) {
      toast.error("Sign In failed" , {
        position : "top-right"
      });
      console.log(error)
    }
    finally{
      setIsSubmiting(false)
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div
        className="shadow-sm hover:shadow-md bg-blue-50 rounded-md"
        style={{ padding: "5rem" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {/* email */}
            <div className="flex-col items-center">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="johndoe@gmail.com"
                className=" h-10 w-80 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                style={{ padding: "0.5rem" }}
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            {/* password */}
            <div className="flex-col items-center">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="******"
                className=" h-10 w-80 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                style={{ padding: "0.5rem" }}
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="rounded-md bg-blue-400 hover:bg-blue-600 text-white h-8 w-20"
              >
                {isSubmiting ? "Signing..." : "Sign In"}
              </button>
            </div>
            <div>
              <p className="text-sm text-slate-700">
                Don’t have an account ?{" "}
                <Link to="/signup" className="text-blue-600">
                  Sign up
                </Link>
              </p>
            </div>
            <div className="flex">
              <input type="checkbox" required />
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
