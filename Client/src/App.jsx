import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import HomePage from "./pages/HomePage.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import AskQuestion from "./pages/AskQuestion.jsx"
import Question from "./pages/Question.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/ask" element={<AskQuestion />} />
          <Route path="/question/:id" element={<Question />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
