import { Cartesian3, Color } from "cesium";

export interface WindDataPoint {
  position: Cartesian3;
  color: Color;
  velocity: number;
}