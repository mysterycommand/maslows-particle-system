import { Particle, Vec2 } from './types';

export * from './types';

export const {
  devicePixelRatio: dpr,
  requestAnimationFrame: raf,
  cancelAnimationFrame: caf,
} = window;

export const { atan2, cos, PI: π, random, sin } = Math;
export const ππ = π * 2;

export const add: (a: Vec2, b: Vec2) => Vec2 = (a, b) => ({
  x: a.x + b.x,
  y: a.y + b.y,
});

export const sub: (a: Vec2, b: Vec2) => Vec2 = (a, b) => ({
  x: a.x - b.x,
  y: a.y - b.y,
});

export const pool: <T extends Particle>(
  ofSize: number,
  withProps: () => any,
) => T[] = (ofSize, withProps) =>
  new Array(ofSize).fill(0).map(() => ({
    ...withProps(),
    currPos: { x: 0, y: 0 },
    prevPos: { x: 0, y: 0 },
    active: false,
  }));

export const update: <T extends Particle>(particle: T) => void = (particle) => {
  const currVel = sub(particle.currPos, particle.prevPos);
  const nextPos = add(particle.currPos, currVel);

  particle.prevPos = particle.currPos;
  particle.currPos = nextPos;
};
