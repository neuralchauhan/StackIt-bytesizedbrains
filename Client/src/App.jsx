import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import AskQuestion from "./pages/AskQuestion.jsx";
import Question from "./pages/Question.jsx";
import { useNavigate } from "react-router-dom";

function App() {
  // useEffect(() => {
  //   localStorage.clear();
  // }, [])

  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setAuthUser(user);
  }, [authUser]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/signup"
            element={!authUser ? <SignUp /> : <HomePage />}
          />

          <Route
            path="/signin"
            element={!authUser ? <SignIn /> : <HomePage />}
          />

          <Route
            path="/ask"
            element={!authUser ? <SignIn /> : <AskQuestion />}
          />

          <Route path="/question/:id" element={<Question />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
