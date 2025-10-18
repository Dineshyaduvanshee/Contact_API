import jwt from "jsonwebtoken";
import { User } from "../Models/users.js";

export const authenticateToken = async (req, res, next) => {
  try {
    // ✅ Extract token from Authorization header (supports "Bearer <token>")

    const authHeader = req.header("authorization");

    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    console.log("This is Token:", token);

    if (!token) {
      return res.status(400).json({ message: "Login First" });
    }

    // ✅ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // ✅ Find user from token payload
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ✅ Attach user to the request
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};
