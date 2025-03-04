
import React, { useEffect, useRef } from 'react';
import { Viewer, Entity } from "resium";
import { Cartesian3, Color } from "cesium";
import { Scene, createWorldTerrainAsync, Cesium3DTileset, Cesium3DTileStyle, IonResource } from "@cesium/engine";

export function TrainingMap() {
  const viewerRef = useRef<Viewer | null>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    const viewer = viewerRef.current.cesiumElement;
    if (!viewer) return;

    // Enable lighting effects
    viewer.scene.globe.enableLighting = true;
    
    // Set a dark space background
    viewer.scene.backgroundColor = Color.fromCssColorString('#0D0F1C');
    viewer.scene.globe.baseColor = Color.fromCssColorString('#081020');
    
    // Configure viewer settings
    viewer.scene.skyAtmosphere.show = true;
    viewer.scene.fog.enabled = true;
    viewer.scene.fog.density = 0.0002;
    viewer.scene.fog.screenSpaceErrorFactor = 4.0;
    
    // Add terrain
    createWorldTerrainAsync()
      .then(terrain => {
        viewer.terrainProvider = terrain;
      })
      .catch(error => {
        console.error("Error loading terrain:", error);
      });

    // Dynamic camera movement
    let lastNow = Date.now();
    viewer.clock.onTick.addEventListener(() => {
      const now = Date.now();
      const delta = (now - lastNow) / 1000;
      lastNow = now;
      
      if (viewer.camera.pitch < -0.3) {
        viewer.camera.rotateRight(0.05 * delta);
      }
    });

    // Initial view
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(9.0765, 7.3986, 1500000),
      orientation: {
        heading: 0.0,
        pitch: -0.5,
        roll: 0.0
      }
    });

    return () => {
      if (viewer && !viewer.isDestroyed()) {
        viewer.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#0D1326] relative overflow-hidden">
      <Viewer
        ref={viewerRef}
        full
        timeline={false}
        animation={false}
        baseLayerPicker={false}
        homeButton={false}
        navigationInstructionsInitiallyVisible={false}
        navigationHelpButton={false}
        sceneModePicker={false}
        selectionIndicator={false}
        infoBox={false}
        geocoder={false}
        className="cesium-viewer-dark"
      >
        {/* Data points could be added here as entities */}
      </Viewer>
      {/* Overlay gradient for better UI integration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D0F1C] to-transparent pointer-events-none" />
    </div>
  );
}
