import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock, FaUserShield, FaEye, FaEyeSlash } from "react-icons/fa";
import React from "react";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl transform transition-all hover:scale-105 duration-300">
        
        {/* Admin Icon */}
        <div className="flex justify-center mb-4 text-5xl text-blue-600">
          <FaUserShield />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-700">Admin Login</h2>

        <form onSubmit={handleLogin} className="mt-6">
          {/* Email Field */}
          <div className="mb-4 relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
