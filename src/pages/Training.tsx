
import { useState } from "react";
import { BookOpen, Cpu, Database, Network, AreaChart, Gauge, Shield, CircleCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/components/ui/use-mobile";
import { TrainingMap } from "@/components/training/TrainingMap";
import { TrainingControls } from "@/components/training/TrainingControls";
import { TrainingMetricsPanel } from "@/components/training/TrainingMetricsPanel";
import { SystemMetricsPanel } from "@/components/training/SystemMetricsPanel";
import { ApiStatusPanel } from "@/components/training/ApiStatusPanel";
import { RiskAssessmentPanel } from "@/components/training/RiskAssessmentPanel";

const Training = () => {
  const isMobile = useIsMobile();
  const [mapExpanded, setMapExpanded] = useState(false);
  
  return (
    <div className="min-h-screen bg-[#0D0F1C] text-white pb-6">
      {/* Map Area */}
      <div className={`relative w-full ${mapExpanded ? 'h-[70vh]' : 'h-[40vh]'} mb-4 transition-all duration-300`}>
        <TrainingMap />
        <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-[#0D1326]/80 p-2 rounded-md backdrop-blur-sm border border-[#2A324B]/50">
          <Label htmlFor="expand-map" className="text-xs text-gray-300">Expand Map</Label>
          <Switch 
            id="expand-map" 
            checked={mapExpanded} 
            onCheckedChange={setMapExpanded}
          />
        </div>
      </div>

      {/* Grid Panels */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Training Controls Panel */}
          <Card className="bg-[#0D1326] border-[#2A324B] shadow-[0_0_15px_rgba(42,50,75,0.3)]">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <BookOpen className="h-5 w-5 text-[#3B82F6] mr-2" />
                <h2 className="text-lg font-bold">Training Controls</h2>
                <div className="ml-auto bg-[#1C2333] text-xs px-2 py-1 rounded">ON</div>
              </div>
              <Separator className="bg-[#2A324B] mb-3" />
              <TrainingControls />
            </div>
          </Card>

          {/* Training Metrics Panel */}
          <Card className="bg-[#0D1326] border-[#2A324B] shadow-[0_0_15px_rgba(42,50,75,0.3)]">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <AreaChart className="h-5 w-5 text-[#3B82F6] mr-2" />
                <h2 className="text-lg font-bold">Training Metrics</h2>
              </div>
              <Separator className="bg-[#2A324B] mb-3" />
              <TrainingMetricsPanel />
            </div>
          </Card>

          {/* Training Information Panel */}
          <Card className="bg-[#0D1326] border-[#2A324B] shadow-[0_0_15px_rgba(42,50,75,0.3)]">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <CircleCheck className="h-5 w-5 text-[#3B82F6] mr-2" />
                <h2 className="text-lg font-bold">Training Information</h2>
              </div>
              <Separator className="bg-[#2A324B] mb-3" />
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1C2333] p-3 rounded-md">
                  <div className="text-xs text-gray-400 mb-1">Time Elapsed</div>
                  <div className="text-xl font-mono">00:08:16</div>
                </div>
                <div className="bg-[#1C2333] p-3 rounded-md">
                  <div className="text-xs text-gray-400 mb-1">Time Remaining</div>
                  <div className="text-xl font-mono">--:--:--</div>
                </div>
                <div className="col-span-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-gray-400">Accuracy</div>
                    <div className="text-xs font-mono">0.00%</div>
                  </div>
                  <Progress value={0} className="h-1.5 bg-[#1C2333]" indicatorColor="bg-[#3B82F6]" />
                </div>
                <div className="col-span-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-gray-400">Loss</div>
                    <div className="text-xs font-mono">1.0000</div>
                  </div>
                  <Progress value={100} className="h-1.5 bg-[#1C2333]" indicatorColor="bg-red-500" />
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-gray-400 mb-1">Performance Score</div>
                  <div className="flex items-center w-full h-6 bg-[#1C2333] rounded-full overflow-hidden">
                    <div className="text-[10px] text-center w-1/3">Low</div>
                    <div className="text-[10px] text-center w-1/3">Medium</div>
                    <div className="text-[10px] text-center w-1/3">High</div>
                  </div>
                  <div className="relative h-1.5 w-full bg-[#1C2333] mt-1 rounded-full overflow-hidden">
                    <div className="absolute w-1/4 h-full bg-[#3B82F6]"></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Risk Assessment Panel */}
          <Card className="bg-[#0D1326] border-[#2A324B] shadow-[0_0_15px_rgba(42,50,75,0.3)]">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <Shield className="h-5 w-5 text-[#3B82F6] mr-2" />
                <h2 className="text-lg font-bold">Risk Assessment</h2>
              </div>
              <Separator className="bg-[#2A324B] mb-3" />
              <RiskAssessmentPanel />
            </div>
          </Card>

          {/* System Metrics Panel */}
          <Card className="bg-[#0D1326] border-[#2A324B] shadow-[0_0_15px_rgba(42,50,75,0.3)]">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <Gauge className="h-5 w-5 text-[#3B82F6] mr-2" />
                <h2 className="text-lg font-bold">System Metrics</h2>
              </div>
              <Separator className="bg-[#2A324B] mb-3" />
              <SystemMetricsPanel />
            </div>
          </Card>

          {/* API Status Panel */}
          <Card className="bg-[#0D1326] border-[#2A324B] shadow-[0_0_15px_rgba(42,50,75,0.3)]">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <Network className="h-5 w-5 text-[#3B82F6] mr-2" />
                <h2 className="text-lg font-bold">API Status</h2>
              </div>
              <Separator className="bg-[#2A324B] mb-3" />
              <ApiStatusPanel />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Training;
