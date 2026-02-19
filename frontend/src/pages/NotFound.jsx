import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="page-center">
      <div className="card auth-card">
        <h1>Page Not Found</h1>
        <p className="muted">The page you are looking for does not exist.</p>
        <Link to="/dashboard" className="btn">Go to Dashboard</Link>
      </div>
    </main>
  );
}
