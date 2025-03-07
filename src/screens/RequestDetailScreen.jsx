import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";

const RequestDetailScreen = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/auth/post/${id}`)
      .then((res) => {
        setRequest(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch request details.");
        setLoading(false);
      });
  }, [id]);

  const handleApproval = () => {
    axios
      .patch(`http://localhost:5000/api/auth/post/${id}/approve`)
      .then((res) => {
        console.log("API Response:", res.data); // Debugging
        setRequest(res.data.post); // Update with the correct key
      })
      .catch((err) => {
        console.error("Approval failed:", err);
        setError("Failed to update status.");
      });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );

  if (!request)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <p>No request found.</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-900 text-white">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        {request.title}
      </h2>

      {/* Image */}
      <img
        src={request.images[0]}
        alt="House"
        className="w-80 h-60 object-cover rounded-lg shadow-md"
      />

      {/* Details */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6 w-full max-w-2xl">
        <p className="text-lg text-gray-300">{request.description}</p>
        <p className="mt-2">
          <strong className="text-green-400">Price:</strong>{" "}
          <span className="text-yellow-300">${request.price}</span>
        </p>
        <p>
          <strong className="text-blue-400">Location:</strong>{" "}
          {request.location}
        </p>
        <p>
          <strong className="text-purple-400">Category:</strong>{" "}
          {request.house_category}
        </p>
        <p>
          <strong className="text-pink-400">Size:</strong> {request.house_size}
        </p>
        <p className="mt-4">
          <strong>Status:</strong>{" "}
          {request.admin_accepted ? (
            <span className="text-green-400">Approved ✅</span>
          ) : (
            <span className="text-yellow-400">Pending ⏳</span>
          )}
        </p>

        {/* Approve Button */}
        {!request.admin_accepted && (
          <button
            onClick={handleApproval}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-2 rounded-lg font-semibold shadow-md"
          >
            Approve Request
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestDetailScreen;
