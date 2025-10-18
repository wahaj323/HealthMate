import Report from "../models/Report.js";
import cloudinary from "../config/cloudinary.js";

export const uploadReport = async (req, res) => {
  try {
    const { title, reportType, reportDate, hospitalName, doctorName, notes } = req.body;
    const userId = req.user._id;

    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.files.file;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ 
        message: "Invalid file type. Only JPG, PNG, and PDF allowed" 
      });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ 
        message: "File too large. Maximum size is 10MB" 
      });
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "healthmate/reports",
      resource_type: "auto",
      transformation: [
        { quality: "auto" },
        { fetch_format: "auto" }
      ]
    });

    // Get file extension
    const fileType = file.mimetype.split('/')[1];

    // Create report document
    const report = await Report.create({
      user: userId,
      title: title || "Medical Report",
      reportType: reportType || "other",
      fileUrl: uploadResponse.secure_url,
      cloudinaryPublicId: uploadResponse.public_id,
      fileType: fileType,
      reportDate: reportDate || new Date(),
      hospitalName,
      doctorName,
      notes
    });

    res.status(201).json({
      message: "Report uploaded successfully",
      report
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ 
      message: "Failed to upload report",
      error: error.message 
    });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const userId = req.user._id;

    const reports = await Report.find({ user: userId })
      .sort({ reportDate: -1 });

    res.json(reports);
  } catch (error) {
    console.error("Get reports error:", error);
    res.status(500).json({ 
      message: "Failed to get reports",
      error: error.message 
    });
  }
};

export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const report = await Report.findOne({ _id: id, user: userId });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(report);
  } catch (error) {
    console.error("Get report error:", error);
    res.status(500).json({ 
      message: "Failed to get report",
      error: error.message 
    });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const report = await Report.findOne({ _id: id, user: userId });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(report.cloudinaryPublicId);

    // Delete report
    await Report.findByIdAndDelete(id);

    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Delete report error:", error);
    res.status(500).json({ 
      message: "Failed to delete report",
      error: error.message 
    });
  }
};

export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const updates = req.body;

    const report = await Report.findOneAndUpdate(
      { _id: id, user: userId },
      updates,
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({
      message: "Report updated successfully",
      report
    });
  } catch (error) {
    console.error("Update report error:", error);
    res.status(500).json({ 
      message: "Failed to update report",
      error: error.message 
    });
  }
};