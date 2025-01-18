import { CustomDataSource, Entity, Viewer } from "cesium";
import { useEffect, useRef } from "react";
import { useViewer } from "resium";
import { WindDataPoint } from "@/types/wind";

interface WindParticleSystemProps {
  windData: WindDataPoint[];
}

export const WindParticleSystem = ({ windData }: WindParticleSystemProps) => {
  const viewerRef = useViewer();
  const dataSourceRef = useRef<CustomDataSource | null>(null);

  useEffect(() => {
    if (!viewerRef?.cesiumElement) return;

    const viewer = viewerRef.cesiumElement;
    dataSourceRef.current = new CustomDataSource("windParticles");
    viewer.dataSources.add(dataSourceRef.current);

    return () => {
      if (dataSourceRef.current) {
        viewer.dataSources.remove(dataSourceRef.current);
      }
    };
  }, [viewerRef]);

  useEffect(() => {
    if (!dataSourceRef.current || !viewerRef?.cesiumElement) return;

    const viewer = viewerRef.cesiumElement as Viewer;
    
    windData.forEach((point) => {
      const entity = new Entity({
        position: point.position,
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
  }, [windData, viewerRef]);

  return null;
};