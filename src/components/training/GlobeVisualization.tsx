import { Viewer } from "resium";
import { cn } from "@/lib/utils";

interface GlobeVisualizationProps {
  className?: string;
}

export const GlobeVisualization = ({ className }: GlobeVisualizationProps) => {
  return (
    <div className={cn("w-full h-[400px] rounded-lg overflow-hidden", className)}>
      <Viewer full>
        {/* Add your globe visualization content here */}
      </Viewer>
    </div>
  );
};