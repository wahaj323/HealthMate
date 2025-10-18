import mongoose from "mongoose";

const aiInsightSchema = new mongoose.Schema({
  report: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Report",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // English Summary
  summaryEnglish: {
    type: String,
    required: true
  },
  // Roman Urdu Summary
  summaryUrdu: {
    type: String,
    required: true
  },
  // Key findings/abnormalities
  keyFindings: [{
    parameter: String,
    value: String,
    normalRange: String,
    status: {
      type: String,
      enum: ["normal", "high", "low", "critical"]
    },
    explanation: String
  }],
  // Recommendations
  recommendations: {
    english: [String],
    urdu: [String]
  },
  // Questions to ask doctor
  doctorQuestions: {
    english: [String],
    urdu: [String]
  },
  // Food/lifestyle suggestions
  suggestions: {
    foods: [String],
    lifestyle: [String],
    precautions: [String]
  },
  // Overall health score (optional)
  healthScore: {
    type: Number,
    min: 0,
    max: 100
  },
  // Disclaimer
  disclaimer: {
    type: String,
    default: "This AI analysis is for informational purposes only and should not replace professional medical advice."
  }
}, { 
  timestamps: true 
});

export default mongoose.model("AiInsight", aiInsightSchema);