import { useEffect, useRef, useState } from 'react';
import { Viewer, Entity, CameraFlyTo } from 'resium';
import { Cartesian3, createWorldTerrainAsync, Ion } from '@cesium/engine';

// Your access token here (you can get a free one from https://cesium.com/ion/signup)
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YjE2OGU4My01NGRlLTRiYmMtOWQyYy1kYzQxNzRjZDg2ZDciLCJpZCI6MTg0NTc4LCJpYXQiOjE3MDI5MzU1Nzl9.q4EHEIZGj0QqA0n3aAKgGtL_FTu_eQCEBPkLrYPXZQE';

const CesiumMap = () => {
  const viewerRef = useRef<any>(null);
  const [terrainProvider, setTerrainProvider] = useState<any>(null);

  useEffect(() => {
    // Initialize terrain provider
    createWorldTerrainAsync()
      .then((terrain) => {
        setTerrainProvider(terrain);
      })
      .catch((error) => {
        console.error('Error creating terrain:', error);
      });

    // Handle viewer widgets
    if (viewerRef.current) {
      const viewer = viewerRef.current.cesiumElement;
      viewer.animation.container.style.visibility = 'hidden';
      viewer.timeline.container.style.visibility = 'hidden';
      viewer.fullscreenButton.container.style.visibility = 'hidden';
    }
  }, []);

  if (!terrainProvider) {
    return <div>Loading terrain...</div>;
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