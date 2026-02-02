import { useAuth } from "../Contexts/AuthContext";

export default function TopNav() {
  const auth = useAuth();

  // Context safety
  if (!auth) return null;

  const { user, logout } = auth;

  return (
    <header className="top-nav">
      <div className="left">
        {/* <strong>MGC Kitty Classic</strong> */}
      </div>

      <div className="right" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {!user ? (
          <>
            <button onClick={() => window.location.href = "/login"} className="nav-link">
              Login
            </button>

          </>
        ) : (
          <>
            <span className="welcome">
          {user.email}
            </span>
            <button onClick={logout} className="logout-btn" style={{ cursor: "pointer",background: "red", color: "white", font: "inherit", padding: 4, borderRadius: 4, border: "none" }}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
