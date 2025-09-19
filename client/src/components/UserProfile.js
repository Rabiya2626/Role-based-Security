import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    education: "",
    employment: "",
    experience: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      await axios.put("http://localhost:5000/profile", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Profile</h2>
      <div style={{ border: "1px solid gray", padding: "10px" }}>
        <input name="firstName" value={profile.firstName} onChange={handleChange} placeholder="First Name" />
        <input name="lastName" value={profile.lastName} onChange={handleChange} placeholder="Last Name" />
        <input type="number" name="age" value={profile.age} onChange={handleChange} placeholder="Age" />
        <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
        <textarea name="education" value={profile.education} onChange={handleChange} placeholder="Education Details" />
        <textarea name="employment" value={profile.employment} onChange={handleChange} placeholder="Employment Details" />
        <textarea name="experience" value={profile.experience} onChange={handleChange} placeholder="Experience Details" />
        <br />
        <button onClick={saveProfile} style={{ marginTop: "10px" }}>Save Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
