const express = require("express");
const router = express.Router();
const User = require("../database/schema/User");
const auth = require("../middleware/auth");

// Get all users + admins
router.get("/all", auth, async (req, res) => {
  if (req.user.type !== "manager") return res.status(403).json({ message: "Forbidden" });
  const users = await User.find().select("-password");
  res.json(users);
});

// Update any user/admin
router.put("/update/:id", auth, async (req, res) => {
  if (req.user.type !== "manager") return res.status(403).json({ message: "Forbidden" });
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
  res.json(updated);
});

module.exports = router;
