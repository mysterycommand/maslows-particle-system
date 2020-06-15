export interface Vec2 {
  x: number;
  y: number;
}

export interface Particle {
  currPos: Vec2;
  prevPos: Vec2;
}

export interface Field {
  width: number;
  height: number;
  time: number;
}
