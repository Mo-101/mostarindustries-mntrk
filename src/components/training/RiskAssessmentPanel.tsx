
import { Shield } from "lucide-react";

export function RiskAssessmentPanel() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-300">Current Risk Level</div>
        <div className="flex items-center gap-2 bg-green-500/20 text-green-500 px-3 py-1 rounded-md text-xs font-medium">
          <Shield className="w-3 h-3" />
          LOW
        </div>
      </div>

      <div className="bg-[#1C2333] p-3 rounded-md">
        <div className="text-sm text-gray-300 mb-2">Top Mitigation Measures:</div>
        <ul className="text-xs text-gray-400 space-y-1.5">
          <li>• Regular model checkpoints</li>
          <li>• Data validation and monitoring</li>
          <li>• Performance threshold alerts</li>
        </ul>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {['LOW', 'MEDIUM', 'HIGH'].map((level, index) => (
          <div 
            key={level}
            className={`p-2 rounded-md text-xs font-medium ${
              index === 0 
                ? 'bg-green-500/20 text-green-500' 
                : 'bg-[#1C2333] text-gray-400'
            }`}
          >
            {level}
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-[#2A324B]">
        <div className="text-xs text-gray-400">
          Last assessment: Today, 15:45
        </div>
      </div>
    </div>
  );
}
