import express from "express";
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from "../Controllers/contact.js"; // ✅ Correct controller
import { authenticateToken } from "../Middlewares/Auth.js";
const router = express.Router();

// 📞 Contact routes
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.post("/",authenticateToken, createContact); // ✅ POST route is '/'
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);


export default router;
