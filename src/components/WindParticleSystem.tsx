import { CustomDataSource, Entity, Viewer, Cartesian3 } from "cesium";
import { useEffect, useRef } from "react";
import { useCesium } from "resium";
import { WindDataPoint } from "@/types/wind";

interface WindParticleSystemProps {
  windData: WindDataPoint[];
}

export const WindParticleSystem = ({ windData }: WindParticleSystemProps) => {
  const { viewer } = useCesium();
  const dataSourceRef = useRef<CustomDataSource | null>(null);

  useEffect(() => {
    if (!viewer) return;

    const dataSource = new CustomDataSource("windParticles");
    viewer.dataSources.add(dataSource);
    dataSourceRef.current = dataSource;

    return () => {
      if (dataSourceRef.current) {
        viewer.dataSources.remove(dataSourceRef.current);
      }
    };
  }, [viewer]);

  useEffect(() => {
    if (!dataSourceRef.current || !viewer) return;
    
    windData.forEach((point) => {
      const entity = new Entity({
        position: Cartesian3.fromDegrees(
          point.position.longitude,
          point.position.latitude,
          point.position.altitude || 0
        ),
        point: {
          pixelSize: 5,
          color: point.color,
        }
      });
      
      if (dataSourceRef.current) {
        dataSourceRef.current.entities.add(entity);
      }
    });

    viewer.zoomTo(dataSourceRef.current);
  }, [windData, viewer]);

  return null;
};