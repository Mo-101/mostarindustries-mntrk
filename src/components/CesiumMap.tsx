import { Viewer } from "resium";
import { WindParticleSystem } from "./WindParticleSystem";
import { Color } from "cesium";

export const CesiumMap = () => {
  const windData = [
    {
      position: {
        latitude: 35.6895,
        longitude: 139.6917,
        altitude: 0
      },
      color: Color.RED,
      velocity: 10
    },
    {
      position: {
        latitude: 34.0522,
        longitude: -118.2437,
        altitude: 0
      },
      color: Color.BLUE,
      velocity: 15
    },
    {
      position: {
        latitude: 51.5074,
        longitude: -0.1278,
        altitude: 0
      },
      color: Color.GREEN,
      velocity: 20
    }
  ];

  return (
    <div className="h-screen w-full">
      <Viewer full>
        <WindParticleSystem windData={windData} />
      </Viewer>
    </div>
  );
};