import React, { useEffect, useState } from "react";
import axios from "axios";

const ManagerDashboard = () => {
  const [managerProfile, setManagerProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    education: "",
    employment: "",
    experience: "",
  });

  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAllUsersAndAdmins = async () => {
    try {
      const resAll = await axios.get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(resAll.data.filter((u) => u.type === "user"));
      setAdmins(resAll.data.filter((u) => u.type === "admin"));
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
        setManagerProfile(resProfile.data);
        await fetchAllUsersAndAdmins();
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [token]);

  const handleManagerChange = (e) =>
    setManagerProfile({ ...managerProfile, [e.target.name]: e.target.value });

  const saveManagerProfile = async () => {
    try {
      await axios.put("http://localhost:5000/profile", managerProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Manager profile updated!");
      await fetchAllUsersAndAdmins();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditChange = (list, id, e) => {
    const setter = list === "users" ? setUsers : setAdmins;
    const originalList = list === "users" ? users : admins;
    const updatedList = originalList.map((item) =>
      item._id === id ? { ...item, [e.target.name]: e.target.value } : item
    );
    setter(updatedList);
  };

  const saveUserAdmin = async (user, listType) => {
    try {
      await axios.put(`http://localhost:5000/users/${user._id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`${listType.slice(0, -1)} profile updated!`);
      await fetchAllUsersAndAdmins();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manager Dashboard</h2>

      {/* Manager own profile */}
      <h3>My Profile</h3>
      <div style={{ border: "1px solid gray", padding: "10px", marginBottom: "20px" }}>
        <input type="text" name="firstName" value={managerProfile.firstName} onChange={handleManagerChange} placeholder="First Name" />
        <input type="text" name="lastName" value={managerProfile.lastName} onChange={handleManagerChange} placeholder="Last Name" />
        <input type="number" name="age" value={managerProfile.age} onChange={handleManagerChange} placeholder="Age" />
        <input type="email" name="email" value={managerProfile.email} onChange={handleManagerChange} placeholder="Email" />
        <textarea name="education" value={managerProfile.education} onChange={handleManagerChange} placeholder="Education Details" />
        <textarea name="employment" value={managerProfile.employment} onChange={handleManagerChange} placeholder="Employment Details" />
        <textarea name="experience" value={managerProfile.experience} onChange={handleManagerChange} placeholder="Experience Details" />
        <br />
        <button onClick={saveManagerProfile} style={{ marginTop: "10px" }}>Save My Profile</button>
      </div>

      {/* Users list */}
      <h3>Users</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {users.map((u) => (
          <div key={u._id} style={{ border: "1px solid blue", padding: "10px", borderRadius: "5px" }}>
            <input name="firstName" value={u.firstName} onChange={(e) => handleEditChange("users", u._id, e)} />
            <input name="lastName" value={u.lastName} onChange={(e) => handleEditChange("users", u._id, e)} />
            <input type="number" name="age" value={u.age} onChange={(e) => handleEditChange("users", u._id, e)} />
            <input type="email" name="email" value={u.email} onChange={(e) => handleEditChange("users", u._id, e)} />
            <textarea name="education" value={u.education} onChange={(e) => handleEditChange("users", u._id, e)} />
            <textarea name="employment" value={u.employment} onChange={(e) => handleEditChange("users", u._id, e)} />
            <textarea name="experience" value={u.experience} onChange={(e) => handleEditChange("users", u._id, e)} />
            <br />
            <button onClick={() => saveUserAdmin(u, "users")}>Save User</button>
          </div>
        ))}
      </div>

      {/* Admins list */}
      <h3>Admins</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {admins.map((a) => (
          <div key={a._id} style={{ border: "1px solid green", padding: "10px", borderRadius: "5px" }}>
            <input name="firstName" value={a.firstName} onChange={(e) => handleEditChange("admins", a._id, e)} />
            <input name="lastName" value={a.lastName} onChange={(e) => handleEditChange("admins", a._id, e)} />
            <input type="number" name="age" value={a.age} onChange={(e) => handleEditChange("admins", a._id, e)} />
            <input type="email" name="email" value={a.email} onChange={(e) => handleEditChange("admins", a._id, e)} />
            <textarea name="education" value={a.education} onChange={(e) => handleEditChange("admins", a._id, e)} />
            <textarea name="employment" value={a.employment} onChange={(e) => handleEditChange("admins", a._id, e)} />
            <textarea name="experience" value={a.experience} onChange={(e) => handleEditChange("admins", a._id, e)} />
            <br />
            <button onClick={() => saveUserAdmin(a, "admins")}>Save Admin</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerDashboard;
