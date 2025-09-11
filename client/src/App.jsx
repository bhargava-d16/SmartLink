import React from "react";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LogIn";
import { Toaster } from "react-hot-toast";
import InputPage from "./pages/InputPage";
import Analytics from "./pages/Analytics";

const App = () => {
  return (
    
    <div className="min-h-screen bg-gradient-to-tl from-gray-950 via-slate-900 to-sky-900
">

       <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/input" element={<InputPage />}></Route>
        <Route path="/analytics" element={<Analytics/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
