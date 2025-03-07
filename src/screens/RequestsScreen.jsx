import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";

const RequestsScreen = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/posts")
      .then((res) => setRequests(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        All Requests
      </h2>

      {/* Requests List */}
      <ul className="w-full max-w-4xl">
        {requests.length > 0 ? (
          requests.map((request) => (
            <li key={request._id} className="mb-6">
              <Link to={`/requests/${request._id}`} className="block">
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition">
                  {/* Images Container */}
                  <div className="flex overflow-x-auto space-x-2 p-2">
                    {request.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={request.title}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                  
                  {/* Details */}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-white">{request.title}</h3>
                    <p className="text-gray-400">
                      <strong>Price:</strong> <span className="text-green-400">${request.price}</span>
                    </p>
                    <p className="text-gray-400">
                      <strong>Location:</strong> {request.location}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <p className="text-gray-400 text-center">No requests found.</p>
        )}
      </ul>
    </div>
  );
};

export default RequestsScreen;
