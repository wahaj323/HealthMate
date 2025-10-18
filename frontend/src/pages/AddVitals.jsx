// frontend/src/pages/AddVitals.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVitalsStore } from "../store/useVitalsStore";
import { Activity, Loader2 } from "lucide-react";

const AddVitals = () => {
  const navigate = useNavigate();
  const { addVitals, isAdding } = useVitalsStore();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    systolic: "",
    diastolic: "",
    bloodSugar: "",
    bloodSugarType: "fasting",
    weight: "",
    height: "",
    heartRate: "",
    temperature: "",
    oxygenLevel: "",
    notes: "",
    symptoms: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vitalsData = {
      date: formData.date,
      notes: formData.notes,
    };

    // Add blood pressure if provided
    if (formData.systolic && formData.diastolic) {
      vitalsData.bloodPressure = {
        systolic: parseInt(formData.systolic),
        diastolic: parseInt(formData.diastolic),
      };
    }

    // Add blood sugar if provided
    if (formData.bloodSugar) {
      vitalsData.bloodSugar = {
        value: parseInt(formData.bloodSugar),
        type: formData.bloodSugarType,
      };
    }

    // Add weight if provided
    if (formData.weight) {
      vitalsData.weight = parseFloat(formData.weight);
    }

    // Add height if provided
    if (formData.height) {
      vitalsData.height = parseFloat(formData.height);
    }

    // Add heart rate if provided
    if (formData.heartRate) {
      vitalsData.heartRate = parseInt(formData.heartRate);
    }

    // Add temperature if provided
    if (formData.temperature) {
      vitalsData.temperature = parseFloat(formData.temperature);
    }

    // Add oxygen level if provided
    if (formData.oxygenLevel) {
      vitalsData.oxygenLevel = parseInt(formData.oxygenLevel);
    }

    // Add symptoms if provided
    if (formData.symptoms) {
      vitalsData.symptoms = formData.symptoms.split(",").map((s) => s.trim());
    }

    const success = await addVitals(vitalsData);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add Health Vitals</h1>
          <p className="text-gray-600 mt-2">Apne health vitals record karein</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Blood Pressure */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-red-600" />
                Blood Pressure (BP)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Systolic (Upper)
                  </label>
                  <input
                    type="number"
                    name="systolic"
                    value={formData.systolic}
                    onChange={handleChange}
                    placeholder="120"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diastolic (Lower)
                  </label>
                  <input
                    type="number"
                    name="diastolic"
                    value={formData.diastolic}
                    onChange={handleChange}
                    placeholder="80"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Blood Sugar */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-600" />
                Blood Sugar
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Sugar (mg/dL)
                  </label>
                  <input
                    type="number"
                    name="bloodSugar"
                    value={formData.bloodSugar}
                    onChange={handleChange}
                    placeholder="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    name="bloodSugarType"
                    value={formData.bloodSugarType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="fasting">Fasting</option>
                    <option value="random">Random</option>
                    <option value="post_meal">Post Meal</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Weight & Height */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-600" />
                Weight & Height
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="70"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="170"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Other Vitals */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-purple-600" />
                Other Measurements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heart Rate (bpm)
                  </label>
                  <input
                    type="number"
                    name="heartRate"
                    value={formData.heartRate}
                    onChange={handleChange}
                    placeholder="72"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature (°F)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    placeholder="98.6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Oxygen Level (%)
                  </label>
                  <input
                    type="number"
                    name="oxygenLevel"
                    value={formData.oxygenLevel}
                    onChange={handleChange}
                    placeholder="98"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Symptoms (comma separated)
              </label>
              <input
                type="text"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="e.g., headache, fever, fatigue"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add any additional notes..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isAdding}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isAdding ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Activity className="h-5 w-5 mr-2" />
                    Add Vitals
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVitals;