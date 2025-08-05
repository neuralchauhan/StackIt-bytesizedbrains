import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { API_BASE_URL } from "../config/api.js";

function Question() {
  
  const { id } = useParams();
  const [question , setQuestion ] = useState({});

   useEffect( () => {
     async(id) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/questions/${id}`, {
          withCredentials : true
        })
        console.log(res)
        setQuestion(res);
    } catch (error) {
      console.log(error)
      return 
    }
  }
   }, []) 


function formatDate(createdAt) {
  const now = new Date();
  const date = new Date(createdAt);

  const isToday = now.toDateString() === date.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday = yesterday.toDateString() === date.toDateString();

  if (isToday) {
    return `today at ${date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  }

  if (isYesterday) {
    return `yesterday at ${date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  }

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}


 return (
    <div>
    <Navbar />
    <div className='flex justify-center items-center mt-15'>
       <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
      {/* Metadata */}
      <div className="text-sm text-gray-500 mb-4">
        Asked by <span className="font-medium">{question.author?.username}</span> on{" "}
        {formatDate(question.createdAt)}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {question.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Vote & Description */}
      <div className="flex gap-4 mb-6">
        {/* Upvote/Downvote */}
        <div className="flex flex-col items-center">
          <button className="text-gray-500 hover:text-green-600 text-2xl">▲</button>
          <span className="text-lg font-medium">{question.votes}</span>
          <button className="text-gray-500 hover:text-red-600 text-2xl">▼</button>
        </div>

        {/* Description */}
        <div className="text-gray-800">{question.description}</div>
      </div>

      {/* Answers */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{question.answers?.length} Answers</h2>

        {question.answers?.map((ans) => (
          <div key={ans._id} className="mb-4 border-t pt-4">
            <p className="text-gray-800">{ans.text}</p>
            <div className="text-sm text-gray-500 mt-1">
              Answered by <span className="font-medium">{ans.author}</span> on{" "}
              {formatDate(ans.createdAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  )
}
 

export default Question
