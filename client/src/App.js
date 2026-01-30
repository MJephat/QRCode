import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout.js";
import Settings from "./Pages/Settings.js";
import QRCodePage from "./Pages/QRCodepage.js";
import Dashboard from "./Pages/DashBoard.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All routes use the Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<QRCodePage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<h1>Users Page - To be implemented</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
