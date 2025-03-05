import { useState, useEffect } from "react";
import axios from "axios";

const UsersScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/users")
      .then(res => {
        if (res.data.success && Array.isArray(res.data.user)) {
          setUsers(res.data.user); // Set users correctly
        } else {
          console.error("Unexpected API response format", res.data);
        }
      })
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.first_name} {user.last_name} ({user.email}) - {user.user_type}
            <button>Make Admin</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersScreen;
