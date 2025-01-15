import { useEffect, useRef, useState } from 'react';
import { Viewer, Entity, CameraFlyTo } from 'resium';
import { Cartesian3, createWorldTerrainAsync, Ion } from '@cesium/engine';

// Initialize Ion with the provided access token
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMmRmYzcxNC0yZjM5LTQ0NzUtYWRkYi1kMjc1NzYwYTQ0NjYiLCJpZCI6MjE0OTQzLCJpYXQiOjE3MTU2NTMyNjN9.1fW--_-6R3TApPF2tAlOfXrqJadYPdwKqpPVkPetHP4';

const CesiumMap = () => {
  const viewerRef = useRef<any>(null);
  const [terrainProvider, setTerrainProvider] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize terrain provider
    createWorldTerrainAsync()
      .then((terrain) => {
        setTerrainProvider(terrain);
        setError(null);
      })
      .catch((error) => {
        console.error('Error creating terrain:', error);
        setError('Failed to load terrain. Please try again later.');
      });

    // Handle viewer widgets
    if (viewerRef.current) {
      const viewer = viewerRef.current.cesiumElement;
      if (viewer) {
        viewer.animation.container.style.visibility = 'hidden';
        viewer.timeline.container.style.visibility = 'hidden';
        viewer.fullscreenButton.container.style.visibility = 'hidden';
      }
    }

    // Cleanup function
    return () => {
      if (viewerRef.current?.cesiumElement) {
        viewerRef.current.cesiumElement.destroy();
      }
    };
  }, []);

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!terrainProvider) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading terrain...
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <Viewer
        ref={viewerRef}
        full
        terrainProvider={terrainProvider}
        scene3DOnly={true}
        homeButton={false}
        navigationHelpButton={false}
        baseLayerPicker={false}
        geocoder={false}
        className="w-full h-full"
      >
        <CameraFlyTo
          duration={0}
          destination={Cartesian3.fromDegrees(-98.35, 39.5, 9000000)}
        />
      </Viewer>
    </div>
  );
};

export default CesiumMap;