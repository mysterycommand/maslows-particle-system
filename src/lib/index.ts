import { Vec2 } from './types';

export * from './types';

export const {
  devicePixelRatio: dpr,
  requestAnimationFrame: raf,
  cancelAnimationFrame: caf,
} = window;

export const { cos, PI: π, random, sin } = Math;
export const ππ = π * 2;

export const add: (a: Vec2, b: Vec2) => Vec2 = (a, b) => ({
  x: a.x + b.x,
  y: a.y + b.y,
});

export const sub: (a: Vec2, b: Vec2) => Vec2 = (a, b) => ({
  x: a.x - b.x,
  y: a.y - b.y,
});
