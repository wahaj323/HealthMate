import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  reportType: {
    type: String,
    enum: ["blood_test", "x-ray", "mri", "ct_scan", "ultrasound", "prescription", "other"],
    default: "other"
  },
  fileUrl: {
    type: String,
    required: true
  },
  cloudinaryPublicId: {
    type: String,
    required: true
  },
  fileType: {
    type: String, // pdf, jpg, png, etc.
    required: true
  },
  reportDate: {
    type: Date,
    default: Date.now
  },
  hospitalName: {
    type: String
  },
  doctorName: {
    type: String
  },
  notes: {
    type: String
  },
  aiAnalyzed: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true 
});

// Index for faster queries
reportSchema.index({ user: 1, reportDate: -1 });

export default mongoose.model("Report", reportSchema);