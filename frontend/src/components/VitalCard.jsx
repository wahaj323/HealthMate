// frontend/src/components/VitalCard.jsx
import { Activity, Heart, Droplet, Weight, Thermometer, Wind } from "lucide-react";

const VitalCard = ({ vital }) => {
  const hasBloodPressure = vital.bloodPressure?.systolic;
  const hasBloodSugar = vital.bloodSugar?.value;
  const hasWeight = vital.weight;
  const hasHeartRate = vital.heartRate;
  const hasTemperature = vital.temperature;
  const hasOxygen = vital.oxygenLevel;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
      <div className="flex items-center space-x-2 mb-3">
        <Activity className="h-5 w-5 text-green-600" />
        <h3 className="font-semibold text-gray-900">Health Vitals</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {hasBloodPressure && (
          <VitalItem
            icon={<Heart className="h-4 w-4 text-red-600" />}
            label="Blood Pressure"
            value={`${vital.bloodPressure.systolic}/${vital.bloodPressure.diastolic}`}
            unit="mmHg"
          />
        )}

        {hasBloodSugar && (
          <VitalItem
            icon={<Droplet className="h-4 w-4 text-blue-600" />}
            label="Blood Sugar"
            value={vital.bloodSugar.value}
            unit="mg/dL"
            subtext={vital.bloodSugar.type}
          />
        )}

        {hasWeight && (
          <VitalItem
            icon={<Weight className="h-4 w-4 text-purple-600" />}
            label="Weight"
            value={vital.weight}
            unit="kg"
            subtext={vital.bmi ? `BMI: ${vital.bmi}` : null}
          />
        )}

        {hasHeartRate && (
          <VitalItem
            icon={<Heart className="h-4 w-4 text-pink-600" />}
            label="Heart Rate"
            value={vital.heartRate}
            unit="bpm"
          />
        )}

        {hasTemperature && (
          <VitalItem
            icon={<Thermometer className="h-4 w-4 text-orange-600" />}
            label="Temperature"
            value={vital.temperature}
            unit="°F"
          />
        )}

        {hasOxygen && (
          <VitalItem
            icon={<Wind className="h-4 w-4 text-cyan-600" />}
            label="Oxygen Level"
            value={vital.oxygenLevel}
            unit="%"
          />
        )}
      </div>

      {vital.symptoms && vital.symptoms.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <strong>Symptoms:</strong> {vital.symptoms.join(", ")}
          </p>
        </div>
      )}

      {vital.notes && (
        <div className="mt-2">
          <p className="text-sm text-gray-600">{vital.notes}</p>
        </div>
      )}
    </div>
  );
};

const VitalItem = ({ icon, label, value, unit, subtext }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="flex items-center space-x-2 mb-1">
        {icon}
        <span className="text-xs text-gray-600">{label}</span>
      </div>
      <p className="text-lg font-bold text-gray-900">
        {value} <span className="text-sm font-normal text-gray-500">{unit}</span>
      </p>
      {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
    </div>
  );
};

export default VitalCard;