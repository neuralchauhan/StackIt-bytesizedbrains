import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import React from "react";
import HomePage from "./components/HomePage.jsx"
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/signin" element={<SignIn />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
