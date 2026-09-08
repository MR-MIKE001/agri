import { User } from "../model/model.js";
import { comparePassword, hashPassword } from "../utili/bcrypt.js";
import { generateToken } from "../middleware/jwt.js";
import { config } from "dotenv";
config();

export const signup = async (req, res) => {
try {
const { fullName, email, password, phone, role } = req.body;


if (!fullName || !email || !password || !phone || !role) {
  return res.status(400).json({ message: "All fields are required" });
}

// Password validation
if (password.length < 6) {
  return res.status(400).json({
    message: "Password must be at least 6 characters long",
  });
}

// Role validation
const validRoles = ["admin", "buyer", "farmer", "seller"];
if (!validRoles.includes(role)) {
  return res.status(400).json({
    message: "Invalid role. Must be admin, buyer, farmer, or seller",
  });
}

// Check existing user
const existingUser = await User.findOne({
  $or: [{ email }, { phone }],
});

if (existingUser) {
  return res.status(400).json({
    message:
      existingUser.email === email
        ? "Email already exists"
        : "Phone number already exists",
  });
}

// Hash password
const hashedPassword = await hashPassword(password);

// Create user
const user = await User.create({
  fullName,
  email,
  password: hashedPassword,
  phone,
  role,
});

// Generate tokens
const { token, refreshToken } = generateToken(user);

res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
 secure: process.env.NODE_ENV === "production" ? true : false, 
  sameSite:process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

res.cookie("token", token, {
  httpOnly: true,
  secure: process.nv.NODE_ENV === "production" ? true : false, 
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
});
// Response
return res.status(201).json({
  message: "User created successfully",
  token,
  user: {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
  },
});


} catch (error) {
return res.status(500).json({
message: error.message || "Internal server error",
});
}
};


export const signin = async (req, res) => {
try {
const { phone, password } = req.body;

// Validate input
if (!phone || !password) {
  return res.status(400).json({
    message: "Phone number and password are required",
  });
}

// Find user
const user = await User.findOne({ phone });
if (!user) {
  return res.status(404).json({
    message: "User not found",
  });
}

// Compare password
const isMatch = await comparePassword(password, user.password);
if (!isMatch) {
  return res.status(400).json({
    message: "Invalid credentials",
  });
}

// Generate tokens
const { token, refreshToken } = generateToken(user);
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false, 
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false, 
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
});
// Response
return res.status(200).json({
  message: "User signed in successfully",
  token,
  user: {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
  },
});


} catch (error) {
return res.status(500).json({
message: error.message || "Internal server error",
});
}
};

