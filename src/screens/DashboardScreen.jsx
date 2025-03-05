import { Link } from "react-router-dom";

const DashboardScreen = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/users">Manage Users</Link></li>
          <li><Link to="/requests">Manage Requests</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardScreen;
