import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Name: {profile.firstName} {profile.lastName}</p>
      <p>Email: {profile.email}</p>
      <p>Age: {profile.age || "-"}</p>
      <p>Education: {profile.education || "-"}</p>
      <p>Employment: {profile.employment || "-"}</p>
      <p>Experience: {profile.experience || "-"}</p>
    </div>
  );
};

export default UserDashboard;
