import { Contact } from "../Models/contact.js";

// 📌 Get All Contacts
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get Single Contact by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Invalid contact ID" });
  }
}
// Get Contact by User ID
export const getContactsByUserId = async (req, res) => {
  const id = req.params.userId;
  try {
    const contacts = await Contact.find({ user: id });
    if (contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found for this user" });
    }
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// Create New Contact
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, user } = req.body;

    if (!name || !email || !phone || !user) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, phone, user:req.user });
    const savedContact = await newContact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}
// Update Contact
export const updateContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// Delete Contact
export const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully", deletedContact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// =====================================
// 🧠 User Authentication Middleware
// =====================================
// Protected Route Example
// Start the Server
// Listen on Port