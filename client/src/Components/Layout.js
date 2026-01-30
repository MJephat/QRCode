import { Outlet } from "react-router-dom";
import SideNav from "./SideNav.js";
import TopNav from "./TopNav.js";
import "./Layout.css"; // We'll put the watermark CSS here

export default function Layout() {
  return (
    <div className="app-layout">
      <SideNav />
      <div className="main-area">
        <TopNav />
        <div className="content watermark">
          {/* This renders page content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
