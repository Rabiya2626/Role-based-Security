const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  education: { type: String },
  employment: { type: String },
  experience: { type: String },
  type: { type: String, enum: ["user", "admin", "manager"], default: "user" },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
