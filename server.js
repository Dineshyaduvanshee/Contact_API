import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js";
import { authenticateToken } from "./Middlewares/Auth.js";
import {config} from "dotenv";
import cors from "cors";
//import { registerUser,loginUser } from "./Controllers/User.js";
import { getAllContacts,
        getContactById,
        createContact,
        updateContact,
        deleteContact,
        getContactsByUserId
        } from "./Controllers/contact.js";
const app = express();

// ✅ Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Enable CORS for all routes
app.use(cors({
  origin: true, // Allow requests from any origin
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  credentials: true, // Allow cookies and authentication headers
}));
// .env  configuration
config({path:'.env'}); // Load .env variables
// ✅ Connect to MongoDB
mongoose
  .connect(
    process.env.MongoUrl
    ,
    { dbName: "Contact_API" }
  )
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// =============================
// CRUD API Routes
// =============================

// 📌 Get All Contacts
app.get("/api/contact",authenticateToken, getAllContacts);

// 📌 Get Single Contact by ID
app.get("/api/contact/:id",authenticateToken, getContactById);
// 📌 Get Contacts by User ID
app.get("/api/contact/user/:userId",authenticateToken, getContactsByUserId);
// 📌 Create New Contact
app.post("/api/contact/add",authenticateToken, createContact);

// 📌 Update Contact
app.put("/api/contact/:id",authenticateToken, updateContact);

// 📌 Delete Contact
app.delete("/api/contact/:id",authenticateToken, deleteContact);


// user root route
app.use("/api/user", userRouter);
// contact root route
app.use('/api/contact', userRouter);
// =============================
// 🧠 User Registration
// =============================
//app.post("/api/user", registerUser);

// =============================
// 🧠 User Login
// =============================
//app.post("/api/user", loginUser);

// =============================
// 🚀 Start Server
// =============================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
