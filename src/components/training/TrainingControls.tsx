
import { useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function TrainingControls() {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [epoch, setEpoch] = useState(0);

  const startTraining = () => {
    setIsTraining(true);
    // Simulate training progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          setEpoch((prevEpoch) => prevEpoch + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 150);
  };

  const pauseTraining = () => {
    setIsTraining(false);
  };

  const resetTraining = () => {
    setIsTraining(false);
    setProgress(0);
    setEpoch(0);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm">Status:</span>
          <span className="text-xs bg-[#1C2333] px-2 py-0.5 rounded">
            {isTraining ? "RUNNING" : "IDLE"}
          </span>
        </div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm">Progress:</span>
          <span className="text-xs">{progress}%</span>
        </div>
        <Progress value={progress} className="h-1.5 bg-[#1C2333]" indicatorColor="bg-[#3B82F6]" />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Epoch: {epoch}/100</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
        <div className="bg-[#1C2333] p-2 rounded-md">
          <div className="mb-1">Batch Size</div>
          <div className="text-white font-mono">32</div>
        </div>
        <div className="bg-[#1C2333] p-2 rounded-md">
          <div className="mb-1">Learning Rate</div>
          <div className="text-white font-mono">0.001</div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          className="flex-1 bg-[#1C2333] hover:bg-[#2A324B] text-white"
          onClick={isTraining ? pauseTraining : startTraining}
        >
          {isTraining ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isTraining ? "Pause" : "Start"}
        </Button>
        <Button
          variant="outline"
          className="border-[#2A324B] hover:bg-[#1C2333] text-gray-300"
          onClick={resetTraining}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-xs text-gray-400 bg-[#1C2333] p-2 rounded-md">
        <p>DeepSeek LLM training for prediction model</p>
      </div>
    </div>
  );
}
