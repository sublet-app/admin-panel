import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const UsersScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/users")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.user)) {
          setUsers(res.data.user); // Set users correctly
        } else {
          console.error("Unexpected API response format", res.data);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Function to make user an admin
  const makeAdmin = async (userId) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/auth/make-admin/${userId}`);
      
      if (res.data.success) {
        alert("User has been promoted to Admin! ✅");
        
        // Update UI immediately
        setUsers(users.map(user => 
          user._id === userId ? { ...user, user_type: "admin" } : user
        ));
      } else {
        alert("Failed to make user admin ❌");
      }
    } catch (error) {
      console.error("Error making admin:", error);
      alert("An error occurred ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        All Users
      </h2>

      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-b border-gray-600 hover:bg-gray-700 transition">
                  <td className="p-4">{user.first_name} {user.last_name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.user_type}</td>
                  <td className="p-4">
                    {user.user_type === "admin" ? (
                      <span className="text-green-400 font-semibold">Admin ✅</span>
                    ) : (
                      <button 
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition text-white"
                        onClick={() => makeAdmin(user._id)}
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-400">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersScreen;
