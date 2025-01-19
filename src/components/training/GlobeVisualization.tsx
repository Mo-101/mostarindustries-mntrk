import { cn } from "@/lib/utils";
import { Viewer, createWorldTerrainAsync } from "@cesium/engine";
import React from "react";

interface GlobeVisualizationProps {
  className?: string;
}

export const GlobeVisualization = ({ className }: GlobeVisualizationProps) => {
  // Initialize Cesium Viewer after component mounts
  React.useEffect(() => {
    // Access Token for Cesium Ion – You'll need a Cesium Ion account
    const initCesium = async () => {
      try {
        const terrainProvider = await createWorldTerrainAsync();
        
        const viewer = new Viewer("cesiumContainer", {
          terrainProvider,
      // ...other Cesium Viewer options...
        });

        // Clean up when component unmounts
        return () => {
          viewer.destroy();
        };
      } catch (error) {
        console.error("Error initializing Cesium:", error);
      }
    };

    initCesium();
  }, []);

  return (
    <div
      id="cesiumContainer"
      style={{ height: "100%", width: "100%" }}
      className={cn(
        "h-screen w-screen fixed top-0 left-0 bg-black",
        className
      )}
    />
  );
};

export default GlobeVisualization;
