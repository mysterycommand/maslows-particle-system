import {
  add,
  cos,
  Particle,
  pool,
  random,
  sin,
  sub,
  Vec2,
  π,
  ππ,
} from '../../lib';

interface Spark extends Particle {
  hue: number;
}

const maxInitialSpeed = 15;
const gravity: Vec2 = { x: 0, y: 0.2 };

export const numToActivate = 500;
export const sparks = pool<Spark>(5_000, () => ({
  hue: 0,
}));

export const activate: (spark: Spark, x: number, y: number) => void = (
  spark,
  x,
  y,
) => {
  const theta = random() * ππ;
  const radius = random() * maxInitialSpeed;

  spark.currPos = { x, y };
  spark.prevPos = { x: x + cos(theta) * radius, y: y + sin(theta) * radius };
  spark.active = true;
  spark.hue = random() * ππ * (180 / π);
};

export const update: (spark: Spark) => void = (spark) => {
  const currVel = add(sub(spark.currPos, spark.prevPos), gravity);
  const nextPos = add(spark.currPos, currVel);

  spark.prevPos = spark.currPos;
  spark.currPos = nextPos;
};

export const render: (
  context: CanvasRenderingContext2D,
  spark: Spark,
) => void = (ctx, { currPos, prevPos, hue }) => {
  ctx.fillStyle = 'white';
  ctx.fillRect(prevPos.x - 4, prevPos.y - 4, 8, 8);

  ctx.fillStyle = `hsl(${hue}, 80%, 50%)`;
  ctx.fillRect(currPos.x - 4, currPos.y - 4, 8, 8);
};
