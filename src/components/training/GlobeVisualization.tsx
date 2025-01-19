import { cn } from "@/lib/utils";

interface GlobeVisualizationProps {
  className?: string;
}

export const GlobeVisualization = ({ className }: GlobeVisualizationProps) => {
  return (
    <div className={cn("h-[300px] w-full rounded-lg bg-widgetcontentbg p-4", className)}>
      {/* Globe visualization content will go here */}
      <div className="flex h-full items-center justify-center text-themecyan">
        Globe Visualization Placeholder
      </div>
    </div>
  );
};
