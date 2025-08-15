import React, { useState, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Navbar from "../components/Navbar.jsx";
import { API_BASE_URL } from "../config/api.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "code-block", "blockquote"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list", // handles both ordered & bullet
  "link",
  "code-block",
  "blockquote",
];

export default function Editor() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const quillRef = useRef(null);

  const handleTagAdd = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleTagRemove = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get both HTML and plain text
    const plainText = quillRef.current.getEditor().getText();
    const htmlBody = body;

    const res = await axios.post(
      `${API_BASE_URL}/questions/new-question`,
      {
        title: title,
        description: htmlBody,
        plainText: plainText,
        tags: tags,
      },
      {
        withCredentials: true,
      }
    );
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="max-w-4xl mx-auto px-6 py-3 bg-white rounded-2xl shadow-lg border border-gray-200 mt-5">
          <h1 className="text-2xl font-bold mb-6">Ask a public question</h1>

          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How do I center a div in CSS?"
              className="w-full mb-6 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block mb-2 font-medium">Body</label>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={body}
              onChange={setBody}
              modules={modules}
              formats={formats}
              className="mb-6 h-[300px]" // more rows
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-medium mt-15">Tags</label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagAdd}
              placeholder="Press Enter to add a tag"
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            {/* Tag list */}
            <div className="flex flex-wrap gap-2 mt-3 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Post Button */}
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all">
            Post your question
          </button>
        </div>
      </form>
    </div>
  );
}
