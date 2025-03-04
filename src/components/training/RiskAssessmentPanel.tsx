
import { Shield } from "lucide-react";

export function RiskAssessmentPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm">Current Risk Level</div>
        <div className="flex items-center gap-2 bg-green-500/20 text-green-500 px-3 py-1 rounded-md text-sm">
          <Shield className="w-3 h-3" />
          LOW
        </div>
      </div>

      <div className="bg-[#1C2333] p-3 rounded-md">
        <div className="text-sm mb-2">Top Mitigation Measures:</div>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• Regular model checkpoints</li>
          <li>• Data validation and monitoring</li>
          <li>• Performance threshold alerts</li>
        </ul>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {['LOW', 'MEDIUM', 'HIGH'].map((level, index) => (
          <div 
            key={level}
            className={`p-2 rounded-md text-xs ${
              index === 0 
                ? 'bg-green-500/20 text-green-500' 
                : 'bg-[#1C2333] text-gray-400'
            }`}
          >
            {level}
          </div>
        ))}
      </div>
    </div>
  );
}
