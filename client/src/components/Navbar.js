import React from "react";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", background: "#007bff", color: "white" }}>
      <h2>Role-Based App</h2>
      <div>
        {!token ? (
          <>
            <a href="/login" style={{ color: "white", marginRight: "10px" }}>Login</a>
            <a href="/signup" style={{ color: "white" }}>Sign Up</a>
          </>
        ) : (
          <button onClick={handleLogout} style={{ padding: "5px 10px", background: "#dc3545", border: "none", color: "white", borderRadius: "4px", cursor: "pointer" }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
