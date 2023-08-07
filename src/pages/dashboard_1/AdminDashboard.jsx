import React from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/RootLayout/RootLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Cars from "./pages/Cars";

function AdminDashboard() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/cars" element={<Cars />} />
      </Routes>
    </RootLayout>
  );
}

export default AdminDashboard;
