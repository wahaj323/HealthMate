import mongoose from "mongoose";

const vitalsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  // Blood Pressure
  bloodPressure: {
    systolic: Number,  // Upper number
    diastolic: Number  // Lower number
  },
  // Blood Sugar
  bloodSugar: {
    value: Number,
    type: {
      type: String,
      enum: ["fasting", "random", "post_meal"]
    }
  },
  // Weight & BMI
  weight: {
    type: Number,  // in kg
  },
  height: {
    type: Number,  // in cm
  },
  bmi: {
    type: Number
  },
  // Other vitals
  heartRate: {
    type: Number  // beats per minute
  },
  temperature: {
    type: Number  // in Fahrenheit or Celsius
  },
  oxygenLevel: {
    type: Number  // SpO2 percentage
  },
  // Notes
  notes: {
    type: String
  },
  // Symptoms if any
  symptoms: [String]
}, { 
  timestamps: true 
});

// Calculate BMI before saving
vitalsSchema.pre('save', function(next) {
  if (this.weight && this.height) {
    const heightInMeters = this.height / 100;
    this.bmi = (this.weight / (heightInMeters * heightInMeters)).toFixed(1);
  }
  next();
});

// Index for faster queries
vitalsSchema.index({ user: 1, date: -1 });

export default mongoose.model("Vitals", vitalsSchema);