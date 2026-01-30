// components/SideNav.jsx
import { NavLink } from "react-router-dom";

export default function SideNav() {
  return (
    <aside className="side-nav">
      <h2 className="logo">MGC Kitty Classic</h2>
      <nav>
        <NavLink to="/" > QR Code</NavLink>
        <NavLink to="/dashboard" end> Dashboard</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>
    </aside>
  );
}
