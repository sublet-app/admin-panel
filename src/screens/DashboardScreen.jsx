import { Link } from "react-router-dom";
import { FaUsers, FaTasks, FaTachometerAlt } from "react-icons/fa";
import React from "react";

const DashboardScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4">
      
      {/* Dashboard Header */}
      <div className="w-full max-w-4xl py-6 text-center bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
        <h2 
          className="text-3xl font-extrabold flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          <FaTachometerAlt className="mr-3 text-white" /> Admin Dashboard
        </h2>
      </div>

      {/* Dashboard Navigation */}
      <nav className="mt-10 w-full max-w-3xl">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <li>
            <Link
              to="/users"
              className="flex items-center justify-center p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 hover:bg-blue-500"
            >
              <FaUsers className="mr-3 text-white text-2xl" />
              <span className="text-lg font-semibold text-white">Manage Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/requests"
              className="flex items-center justify-center p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 hover:bg-purple-500"
            >
              <FaTasks className="mr-3 text-white text-2xl" />
              <span className="text-lg font-semibold text-white">Manage Requests</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardScreen;
