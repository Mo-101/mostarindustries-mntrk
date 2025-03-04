
import { Progress } from "@/components/ui/progress";

export function TrainingMetricsPanel() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <MetricCard 
          label="Total Count" 
          value="0" 
          change="+2.4%" 
          changeColor="text-green-400"
        />
        <MetricCard 
          label="Avg. Density" 
          value="0/km²" 
          change="+0.8" 
          changeColor="text-green-400"
        />
      </div>

      <div className="bg-[#1C2333] p-3 rounded-md">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm">Habitat Coverage</span>
          <div className="flex items-center gap-1">
            <span className="text-lg font-mono">68%</span>
            <span className="text-xs text-green-400">+3.2%</span>
          </div>
        </div>
        <Progress 
          value={68} 
          className="h-1.5 bg-[#0D1326]" 
          style={{
            "--progress-indicator-color": "#10B981" // green color
          } as React.CSSProperties}
        />
      </div>

      <div className="bg-[#1C2333] p-3 rounded-md">
        <div className="text-sm mb-1">Last Observation</div>
        <div className="text-gray-400 text-xs">No data available</div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, change, changeColor }: { 
  label: string, 
  value: string, 
  change: string,
  changeColor: string
}) {
  return (
    <div className="bg-[#1C2333] p-3 rounded-md">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="flex items-baseline">
        <span className="text-xl font-mono mr-2">{value}</span>
        <span className={`text-xs ${changeColor}`}>{change}</span>
      </div>
    </div>
  );
}
