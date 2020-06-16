import { v4 as uuid } from 'uuid';

import {
  add,
  cos,
  Field,
  Particle,
  pool,
  random,
  sin,
  sub,
  Vec2,
  ππ,
} from '../../lib';

export interface Heart extends Particle {
  id: string;
  opacity: number;
  scale: number;
}

const maxInitialSpeed = 5;
const gravity: Vec2 = { x: 0, y: -0.1 };

export const numToActivate = 5;
export const hearts = pool<Heart>(50, () => ({
  id: uuid(),
  opacity: 1,
  scale: 1,
}));

export const activate: (heart: Heart, x: number, y: number) => void = (
  heart,
  x,
  y,
) => {
  const theta = random() * ππ;
  const radius = random() * maxInitialSpeed;

  const px = x + cos(theta) * radius;
  const py = y + sin(theta) * radius;

  heart.currPos = { x, y };
  heart.prevPos = { x: px, y: py };
  heart.active = true;
  heart.opacity = 1;
  heart.scale = 1;
};

export const update: (heart: Heart, field: Field) => void = (
  heart,
  { height },
) => {
  const currVel = add(sub(heart.currPos, heart.prevPos), gravity);
  const nextPos = add(heart.currPos, currVel);

  heart.prevPos = heart.currPos;
  heart.currPos = nextPos;

  heart.opacity = heart.currPos.y / height;
  heart.scale = 2 - heart.currPos.y / height;
};
