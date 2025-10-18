import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  },
  phone: {
    type: String
  },
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  profilePicture: {
    type: String,
    default: ""
  }
}, { 
  timestamps: true 
});

export default mongoose.model("User", userSchema);