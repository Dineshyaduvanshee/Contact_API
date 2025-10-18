import express from "express";
import { registerUser,loginUser } from "../Controllers/user.js";

const router = express.Router();

// 🧠 User Register
router.post("/register", registerUser);

// 🧠 User Login
router.post("/login", loginUser);

export default router;
