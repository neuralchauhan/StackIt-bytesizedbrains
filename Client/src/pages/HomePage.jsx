import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api.js";
import Navbar from "../components/Navbar.jsx";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate()
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    const API_CALL = async () => {
      const res = await axios.get(
        `${API_BASE_URL}/questions/get-all-questions`,
        {
          withCredentials: true,
        }
      );
      setAllQuestions(res.data.data);
    };
    API_CALL();
  }, []);


  return (
    <div className="container max-h-screen max-w-screen">
      <Navbar />
      {/* <sidebar></sidebar> */}
      <main>
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Newest Questions</h1>

          {allQuestions.map((q) => (
            
            <div
              key={q._id}
              className="mb-6 p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <Link to={`/question/${q._id}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                {q.title}
              </h2>
              </Link>

              <p className="text-gray-700 mt-2 line-clamp-3">{q.description}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {q.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

                <div className="flex flex-row gap-10">
              <div className="mt-4 text-sm text-gray-500">
                Upvotes <span className="font-medium mr-2">{q.upvotes}</span>
                Answers <span className="font-medium">{q.answers.length}</span>
                {q.date}
              </div>
               <div className="mt-4 text-sm text-gray-500">
                Asked by <span className="font-medium">{q.author?.username}</span> on {new Date(q.createdAt).toLocaleString("en-IN")}
                {q.date}
              </div>
            </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
