import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../store/authStore";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedpassword, setconfirmedPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const confirmpasswordChange = (e) => {
    setconfirmedPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmedpassword) {
      toast.error("The password does not match");
      return;
    }


    setIsLoading(true);

    try{
      const response=await signup({
        email: email,
        password: password
    })
    if (response?.success) {
      toast.success("Account created successfully!");
      navigate("/input");
    } else {
      toast.error(response?.message || "Signup failed");
    }
  }
  catch(error){
      console.log(error);
  }
  finally{
     setIsLoading(false);
    }
    
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-6">
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Join SmartLink</h1>
          <p className="text-gray-400">
            Create your account and get started with us
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8">
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                required
                value={email}
                onChange={emailChange}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                required
                value={password}
                onChange={passwordChange}
                type="password"
                placeholder="Create a strong password"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                required
                value={confirmedpassword}
                onChange={confirmpasswordChange}
                type="password"
                placeholder="Re-enter your password"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="cursor-pointer w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-sm text-gray-400">or continue with</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Switch to login */}
          <div className="mt-6 text-center">
            <span className="text-gray-400">Already have an account?</span>
            <button
              type="button"
              onClick={() => {
                navigate("/login");
              }}
              className="ml-2 text-purple-400 hover:text-purple-300 font-medium transition-colors cursor-pointer"
            >
              Log in
            </button>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-sm text-gray-400 mt-6">
          By creating an account, you agree to our{" "}
          <button className="text-purple-400 hover:text-purple-300 transition-colors">
            Terms of Service
          </button>{" "}
          and{" "}
          <button className="text-purple-400 hover:text-purple-300 transition-colors">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
