import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout, isSystemUser, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="brand">MoneyLedger</div>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/transfer">Transfer</Link>
        {isSystemUser && <Link to="/initial-funds">Initial Funds</Link>}
      </div>

      <div className="nav-actions">
        <span className="user-pill">{user?.name || "User"}</span>
        <button type="button" className="btn btn-ghost" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
