import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [adminProfile, setAdminProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    education: "",
    employment: "",
    experience: "",
  });

  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const resAll = await axios.get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Filter only users
      setUsers(resAll.data.filter(u => u.type === "user"));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProfile = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminProfile(resProfile.data);

        await fetchUsers();
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [token]);

  const handleAdminChange = (e) => setAdminProfile({ ...adminProfile, [e.target.name]: e.target.value });

  const saveAdminProfile = async () => {
    try {
      await axios.put("http://localhost:5000/profile", adminProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Admin profile updated!");
      fetchUsers(); // Refresh users in case needed
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      {/* Admin profile section */}
      <h3>My Profile</h3>
      <div style={{ border: "1px solid gray", padding: "10px", marginBottom: "20px" }}>
        <input type="text" name="firstName" value={adminProfile.firstName} onChange={handleAdminChange} placeholder="First Name" />
        <input type="text" name="lastName" value={adminProfile.lastName} onChange={handleAdminChange} placeholder="Last Name" />
        <input type="number" name="age" value={adminProfile.age} onChange={handleAdminChange} placeholder="Age" />
        <input type="email" name="email" value={adminProfile.email} onChange={handleAdminChange} placeholder="Email" />
        <textarea name="education" value={adminProfile.education} onChange={handleAdminChange} placeholder="Education Details" />
        <textarea name="employment" value={adminProfile.employment} onChange={handleAdminChange} placeholder="Employment Details" />
        <textarea name="experience" value={adminProfile.experience} onChange={handleAdminChange} placeholder="Experience Details" />
        <br />
        <button onClick={saveAdminProfile} style={{ marginTop: "10px" }}>Save My Profile</button>
      </div>

      {/* Users list */}
      <h3>Users</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {users.map(u => (
          <div key={u._id} style={{ border: "1px solid blue", padding: "10px", borderRadius: "5px" }}>
            <p><strong>Name:</strong> {u.firstName} {u.lastName}</p>
            <p><strong>Age:</strong> {u.age}</p>
            <p><strong>Email:</strong> {u.email}</p>
            <p><strong>Education:</strong> {u.education}</p>
            <p><strong>Employment:</strong> {u.employment}</p>
            <p><strong>Experience:</strong> {u.experience}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
