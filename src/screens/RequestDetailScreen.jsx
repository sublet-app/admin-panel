import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RequestDetailScreen = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/auth/post/${id}`)
      .then((res) => {
        setRequest(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleApproval = (status) => {
    axios
      .patch(`http://localhost:5000/api/auth/post/${id}`, {
        admin_accepted: status,
      })
      .then((res) => {
        setRequest(res.data);
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p>Loading...</p>;
  if (!request) return <p>No request found.</p>;

  return (
    <div>
      <h2>{request.title}</h2>
      <p>{request.description}</p>
      <p><strong>Price:</strong> ${request.price}</p>
      <p><strong>Location:</strong> {request.location}</p>
      <p><strong>Category:</strong> {request.house_category}</p>
      <p><strong>Size:</strong> {request.house_size}</p>
      <img src={request.images[0]} alt="House" width="300" />
      <br />
      <button onClick={() => handleApproval(true)}>Approve</button>
      <button onClick={() => handleApproval(false)}>Reject</button>
    </div>
  );
};

export default RequestDetailScreen;
