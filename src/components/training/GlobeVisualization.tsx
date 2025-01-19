import { cn } from "@/lib/utils";
import { createWorldTerrainAsync } from "@cesium/engine";
import { Viewer } from "@cesium/widgets";
import "cesium/Build/Cesium/Widgets/widgets.css";
import React from "react";

interface GlobeVisualizationProps {
  className?: string;
}

export const GlobeVisualization = ({ className }: GlobeVisualizationProps) => {
  // Initialize Cesium Viewer after component mounts
  React.useEffect(() => {
    // Initialize Cesium
    const initCesium = async () => {
      try {
        const terrainProvider = await createWorldTerrainAsync();
        
        const viewer = new Viewer("cesiumContainer", {
          terrainProvider,
          animation: false,
          baseLayerPicker: false,
          fullscreenButton: false,
          geocoder: false,
          homeButton: false,
          infoBox: false,
          sceneModePicker: false,
          selectionIndicator: false,
          timeline: false,
          navigationHelpButton: false,
          navigationInstructionsInitiallyVisible: false
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