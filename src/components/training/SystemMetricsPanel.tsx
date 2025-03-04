
import { Cpu, MemoryStick, HardDrive } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function SystemMetricsPanel() {
  const metrics = [
    { icon: Cpu, label: "CPU Usage", value: 45 },
    { icon: MemoryStick, label: "Memory Usage", value: 66 },
    { icon: HardDrive, label: "Storage Usage", value: 75 },
  ];

  return (
    <div className="space-y-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="space-y-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <metric.icon className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-sm">{metric.label}</span>
            </div>
            <span className="text-sm font-mono">{metric.value}%</span>
          </div>
          <Progress 
            value={metric.value} 
            className="h-1.5 bg-[#1C2333]" 
            indicatorColor={`bg-${getColorForValue(metric.value)}`} 
          />
        </div>
      ))}
    </div>
  );
}

function getColorForValue(value: number): string {
  if (value < 50) return "[#3B82F6]";
  if (value < 80) return "yellow-500";
  return "red-500";
}
