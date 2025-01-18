import { Color } from "cesium";

export interface WindDataPoint {
  position: {
    latitude: number;
    longitude: number;
    altitude?: number;
  };
  color: Color;
  velocity: number;
}