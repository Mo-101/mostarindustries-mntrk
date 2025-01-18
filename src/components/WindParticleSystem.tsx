import { useEffect, useRef } from 'react';
import { Color, ParticleSystem, Cartesian3, Matrix4 } from '@cesium/engine';
import { CustomDataSource } from '@cesium/engine';
import { CesiumComponentRef } from 'resium';

interface WindParticleSystemProps {
  windData: Array<{
    position: {
      x: number;
      y: number;
      z: number;
    };
    velocity: number;
  }>;
}

const WindParticleSystem = ({ windData = [] }: WindParticleSystemProps) => {
  const particleSystemRef = useRef<ParticleSystem | null>(null);
  const dataSourceRef = useRef<CesiumComponentRef<CustomDataSource> | null>(null);

  useEffect(() => {
    if (!dataSourceRef.current) return;

    // Initialize particle system
    particleSystemRef.current = new ParticleSystem({
      image: '/particle.png',
      startColor: Color.WHITE.withAlpha(0.7),
      endColor: Color.WHITE.withAlpha(0.0),
      startScale: 1.0,
      endScale: 4.0,
      minimumParticleLife: 1.2,
      maximumParticleLife: 1.2,
      minimumSpeed: 1.0,
      maximumSpeed: 4.0,
      imageSize: new Cartesian3(25.0, 25.0, 25.0),
      emissionRate: 5.0,
      lifetime: 16.0
    });

    const viewer = dataSourceRef.current.cesiumElement;
    if (viewer) {
      viewer.scene.primitives.add(particleSystemRef.current);
    }

    return () => {
      if (viewer && particleSystemRef.current) {
        viewer.scene.primitives.remove(particleSystemRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!particleSystemRef.current || !windData.length) return;

    const position = Cartesian3.fromElements(
      windData[0].position.x,
      windData[0].position.y,
      windData[0].position.z,
      new Cartesian3()
    );

    particleSystemRef.current.modelMatrix = Matrix4.fromTranslation(position);
  }, [windData]);

  return (
    <CustomDataSource ref={dataSourceRef} />
  );
};

export default WindParticleSystem;