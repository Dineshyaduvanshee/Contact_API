// import mongoose from "mongoose";

// const contactSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
//     },
//     phone: {
//         type: String,
//         required: true,
//         match: [/^\d{10}$/, 'Please fill a valid 10 digit phone number']
//     },
//     createdAt: { type: Date, default: Date.now },
//     user:{type: mongoose.Schema.Types.ObjectId, }
// }, { timestamps: true });
// export const Contact = mongoose.model('Contact', contactSchema);



import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Please fill a valid 10-digit phone number"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 🔹 assuming you have a User model (optional)
    },
  },
  { timestamps: true }
);

// ✅ Automatically create an index for unique fields
contactSchema.index({ email: 1 }, { unique: true });

export const Contact = mongoose.model("Contact", contactSchema);
