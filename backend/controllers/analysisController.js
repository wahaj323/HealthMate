import ai, { modelName } from "../config/gemini.js";
import { generateMedicalReportPrompt } from "../utils/geminiPrompts.js";
import AiInsight from "../models/AiInsight.js";
import Report from "../models/Report.js";
import axios from "axios";

export const analyzeReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const userId = req.user._id;

    // 🔹 1. Get the report from DB
    const report = await Report.findOne({ _id: reportId, user: userId });
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // 🔹 2. Check if already analyzed
    const existingInsight = await AiInsight.findOne({ report: reportId });
    if (existingInsight) {
      return res.json({
        message: "Report already analyzed",
        insight: existingInsight,
      });
    }

    // 🔹 3. Download file from Cloudinary
    const fileResponse = await axios.get(report.fileUrl, {
      responseType: "arraybuffer",
    });
    const fileBuffer = Buffer.from(fileResponse.data);
    const base64File = fileBuffer.toString("base64");

    // 🔹 4. Detect file MIME type
    let mimeType = "image/jpeg";
    if (report.fileType === "pdf") mimeType = "application/pdf";
    else if (report.fileType === "png") mimeType = "image/png";

    const imagePart = {
      inlineData: {
        data: base64File,
        mimeType,
      },
    };

    // 🔹 5. Generate AI prompt
    const prompt = generateMedicalReportPrompt(report.reportType);

    // 🔹 6. Call Gemini API (NEW SDK METHOD)
    let aiResponseText;
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: [prompt, imagePart],
      });

      aiResponseText = response.text; // ✅ new SDK property
    } catch (aiError) {
      console.error("❌ Gemini API Error:", aiError);
      return res.status(500).json({
        message: "Gemini API request failed",
        error: aiError.message,
      });
    }

    // 🔹 7. Clean and parse JSON
    let cleanText = aiResponseText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    let analysisData;
    try {
      analysisData = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError);
      console.error("Raw response:", cleanText);
      return res.status(500).json({
        message: "Failed to parse AI response",
        error: parseError.message,
        rawResponse: cleanText,
      });
    }

    // 🔹 8. Save AI insight to MongoDB
    const aiInsight = await AiInsight.create({
      report: reportId,
      user: userId,
      summaryEnglish: analysisData.summaryEnglish || "Analysis completed",
      summaryUrdu: analysisData.summaryUrdu || "Tahleel mukammal ho gayi",
      keyFindings: analysisData.keyFindings || [],
      recommendations:
        analysisData.recommendations || { english: [], urdu: [] },
      doctorQuestions:
        analysisData.doctorQuestions || { english: [], urdu: [] },
      suggestions:
        analysisData.suggestions || {
          foods: [],
          lifestyle: [],
          precautions: [],
        },
      healthScore: analysisData.healthScore || 70,
    });

    // 🔹 9. Mark report as analyzed
    report.aiAnalyzed = true;
    await report.save();

    // 🔹 10. Send success response
    res.json({
      message: "Report analyzed successfully",
      insight: aiInsight,
    });
  } catch (error) {
    console.error("❌ Analysis error:", error);
    res.status(500).json({
      message: "Failed to analyze report",
      error: error.message,
    });
  }
};

// 🔹 Fetch single insight
export const getReportInsight = async (req, res) => {
  try {
    const { reportId } = req.params;
    const userId = req.user._id;

    const insight = await AiInsight.findOne({
      report: reportId,
      user: userId,
    }).populate("report");

    if (!insight) {
      return res.status(404).json({ message: "Analysis not found for this report" });
    }

    res.json(insight);
  } catch (error) {
    console.error("❌ Get insight error:", error);
    res.status(500).json({
      message: "Failed to get analysis",
      error: error.message,
    });
  }
};

// 🔹 Fetch all insights
export const getAllInsights = async (req, res) => {
  try {
    const userId = req.user._id;
    const insights = await AiInsight.find({ user: userId })
      .populate("report")
      .sort({ createdAt: -1 });

    res.json(insights);
  } catch (error) {
    console.error("❌ Get all insights error:", error);
    res.status(500).json({
      message: "Failed to get insights",
      error: error.message,
    });
  }
};
