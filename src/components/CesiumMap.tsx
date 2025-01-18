import { useEffect, useState } from "react";
import { Viewer, Globe, Scene } from "resium";
import { WindParticleSystem } from "./WindParticleSystem";
import { Cartesian3, Color } from "cesium";
import { WindDataPoint } from "@/types/wind";

export const CesiumMap = () => {
  const [windData, setWindData] = useState<WindDataPoint[]>([]);

  useEffect(() => {
    // Sample wind data with velocity
    const sampleData: WindDataPoint[] = [
      {
        position: Cartesian3.fromDegrees(-75.0, 40.0, 100000.0),
        color: Color.RED,
        velocity: 10
      },
      {
        position: Cartesian3.fromDegrees(-80.0, 35.0, 100000.0),
        color: Color.BLUE,
        velocity: 15
      }
    ];
    setWindData(sampleData);
  }, []);

  return (
    <Viewer full>
      <Scene />
      <Globe enableLighting />
      <WindParticleSystem windData={windData} />
    </Viewer>
  );
};