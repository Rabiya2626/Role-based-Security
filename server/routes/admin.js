const express = require("express");
const router = express.Router();
const User = require("../database/schema/User");
const auth = require("../middleware/auth");

// Get all users (read-only for admin)
router.get("/users", auth, async (req, res) => {
  if (req.user.type !== "admin") return res.status(403).json({ message: "Forbidden" });
  const users = await User.find({ type: "user" }).select("-password");
  res.json(users);
});

module.exports = router;
