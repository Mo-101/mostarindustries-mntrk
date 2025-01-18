import { useEffect, useRef } from 'react';
import { Entity, CustomDataSource } from 'resium';
import { Cartesian3, Color, ParticleSystem, Particle } from '@cesium/engine';

interface WindParticleSystemProps {
  windData?: {
    position: Cartesian3;
    direction: Cartesian3;
    speed: number;
  }[];
}

const WindParticleSystem = ({ windData = [] }: WindParticleSystemProps) => {
  const particleSystemRef = useRef<ParticleSystem | null>(null);
  const dataSourceRef = useRef<CustomDataSource | null>(null);

  useEffect(() => {
    if (!dataSourceRef.current) return;

    // Initialize particle system
    particleSystemRef.current = new ParticleSystem({
      image: '/particle.png', // You'll need to add this image
      startColor: Color.WHITE.withAlpha(0.7),
      endColor: Color.WHITE.withAlpha(0.0),
      startScale: 1.0,
      endScale: 4.0,
      minimumParticleLife: 1.0,
      maximumParticleLife: 3.0,
      minimumSpeed: 1.0,
      maximumSpeed: 4.0,
      imageSize: new Cartesian3(12.0, 12.0, 12.0),
      emissionRate: 5.0,
      lifetime: 16.0,
      updateCallback: (particle: Particle) => {
        // Update particle position based on wind data
        const windPoint = findNearestWindPoint(particle.position);
        if (windPoint) {
          const direction = Cartesian3.normalize(windPoint.direction, new Cartesian3());
          const speed = windPoint.speed;
          particle.velocity = Cartesian3.multiplyByScalar(
            direction,
            speed,
            new Cartesian3()
          );
        }
      }
    });

    return () => {
      if (particleSystemRef.current) {
        particleSystemRef.current.complete();
      }
    };
  }, []);

  useEffect(() => {
    if (!particleSystemRef.current || !windData.length) return;

    // Update particle system with new wind data
    particleSystemRef.current.modelMatrix = Cartesian3.toArray(windData[0].position);
  }, [windData]);

  return (
    <Entity>
      <CustomDataSource ref={dataSourceRef} />
    </Entity>
  );
};

// Utility function to find nearest wind data point
const findNearestWindPoint = (position: Cartesian3) => {
  // Implement nearest neighbor search for wind data points
  // This is a placeholder - you'll need to implement the actual logic
  return null;
};

export default WindParticleSystem;