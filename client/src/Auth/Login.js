import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = () => {
    if (!email) return;
    login(email);
    navigate("/dashboard");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome to MGC ADMIN</h2>
        <p className="subtitle">Sign in to continue</p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={submit}>Login</button>

        <p className="auth-footer">
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
