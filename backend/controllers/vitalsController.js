import Vitals from "../models/Vitals.js";

export const addVitals = async (req, res) => {
  try {
    const userId = req.user._id;
    const vitalsData = req.body;

    const vitals = await Vitals.create({
      user: userId,
      ...vitalsData
    });

    res.status(201).json({
      message: "Vitals added successfully",
      vitals
    });
  } catch (error) {
    console.error("Add vitals error:", error);
    res.status(500).json({ 
      message: "Failed to add vitals",
      error: error.message 
    });
  }
};

export const getAllVitals = async (req, res) => {
  try {
    const userId = req.user._id;
    const { startDate, endDate, limit = 50 } = req.query;

    let query = { user: userId };

    // Filter by date range if provided
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const vitals = await Vitals.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));

    res.json(vitals);
  } catch (error) {
    console.error("Get vitals error:", error);
    res.status(500).json({ 
      message: "Failed to get vitals",
      error: error.message 
    });
  }
};

export const getVitalsById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const vitals = await Vitals.findOne({ _id: id, user: userId });

    if (!vitals) {
      return res.status(404).json({ message: "Vitals record not found" });
    }

    res.json(vitals);
  } catch (error) {
    console.error("Get vitals error:", error);
    res.status(500).json({ 
      message: "Failed to get vitals",
      error: error.message 
    });
  }
};

export const updateVitals = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const updates = req.body;

    const vitals = await Vitals.findOneAndUpdate(
      { _id: id, user: userId },
      updates,
      { new: true }
    );

    if (!vitals) {
      return res.status(404).json({ message: "Vitals record not found" });
    }

    res.json({
      message: "Vitals updated successfully",
      vitals
    });
  } catch (error) {
    console.error("Update vitals error:", error);
    res.status(500).json({ 
      message: "Failed to update vitals",
      error: error.message 
    });
  }
};

export const deleteVitals = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const vitals = await Vitals.findOneAndDelete({ _id: id, user: userId });

    if (!vitals) {
      return res.status(404).json({ message: "Vitals record not found" });
    }

    res.json({ message: "Vitals deleted successfully" });
  } catch (error) {
    console.error("Delete vitals error:", error);
    res.status(500).json({ 
      message: "Failed to delete vitals",
      error: error.message 
    });
  }
};

export const getVitalsStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const vitals = await Vitals.find({
      user: userId,
      date: { $gte: startDate }
    }).sort({ date: 1 });

    // Calculate averages and trends
    const stats = {
      totalRecords: vitals.length,
      averages: {},
      trends: {}
    };

    if (vitals.length > 0) {
      // Calculate blood pressure average
      const bpReadings = vitals.filter(v => v.bloodPressure?.systolic);
      if (bpReadings.length > 0) {
        stats.averages.bloodPressure = {
          systolic: Math.round(
            bpReadings.reduce((sum, v) => sum + v.bloodPressure.systolic, 0) / bpReadings.length
          ),
          diastolic: Math.round(
            bpReadings.reduce((sum, v) => sum + v.bloodPressure.diastolic, 0) / bpReadings.length
          )
        };
      }

      // Calculate blood sugar average
      const sugarReadings = vitals.filter(v => v.bloodSugar?.value);
      if (sugarReadings.length > 0) {
        stats.averages.bloodSugar = Math.round(
          sugarReadings.reduce((sum, v) => sum + v.bloodSugar.value, 0) / sugarReadings.length
        );
      }

      // Calculate weight average
      const weightReadings = vitals.filter(v => v.weight);
      if (weightReadings.length > 0) {
        stats.averages.weight = (
          weightReadings.reduce((sum, v) => sum + v.weight, 0) / weightReadings.length
        ).toFixed(1);
      }
    }

    res.json(stats);
  } catch (error) {
    console.error("Get vitals stats error:", error);
    res.status(500).json({ 
      message: "Failed to get vitals statistics",
      error: error.message 
    });
  }
};