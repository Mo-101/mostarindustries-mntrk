import { cn } from "@/lib/utils";
import { Ion, Viewer, createWorldTerrain } from "cesium";
import React from "react";

interface GlobeVisualizationProps {
  className?: string;
}

export const GlobeVisualization = ({ className }: GlobeVisualizationProps) => {
  // Initialize Cesium Viewer after component mounts
  React.useEffect(() => {
    // Access Token for Cesium Ion – You'll need a Cesium Ion account
    Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMmRmYzcxNC0yZjM5LTQ0NzUtYWRkYi1kMjc1NzYwYTQ0NjYiLCJpZCI6MjE0OTQzLCJpYXQiOjE3MTU2NTMyNjN9.1fW--_-6R3TApPF2tAlOfXrqJadYPdwKqpPVkPetHP4";

    const viewer = new Viewer("cesiumContainer", {
      terrainProvider: createWorldTerrain() // Or any other terrain provider
      // ...other Cesium Viewer options...
    });


    // Clean up when component unmounts
    return () => {
      viewer.destroy();
    };

  }, []);

  return (
    <div
      id="cesiumContainer" // Important: Provide a container for Cesium to render
      style={{ height: "100%", width: "100%" }}
      className={cn(
        "h-screen w-screen fixed top-0 left-0 bg-black", // Full-screen settings
        className
      )}
    >
      {/* The Cesium map will be rendered here */}
    </div>
  );
};

export default GlobeVisualization;
