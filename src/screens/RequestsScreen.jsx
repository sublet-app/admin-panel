import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RequestsScreen = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/posts")
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Requests</h2>
      <ul>
        {requests.map(request => (
          <li key={request._id} style={{ marginBottom: "20px", listStyle: "none" }}>
            <Link to={`/requests/${request._id}`} style={{ textDecoration: "none", color: "black" }}>
              <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px", display: "flex", alignItems: "center", gap: "15px" }}>
                <img src={request.images[0]} alt={request.title} style={{ width: "100px", height: "80px", objectFit: "cover", borderRadius: "5px" }} />
                <div>
                  <h3>{request.title}</h3>
                  <p><strong>Price:</strong> ${request.price}</p>
                  <p><strong>Location:</strong> {request.location}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestsScreen;
