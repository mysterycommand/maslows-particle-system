import React, { FC, useEffect, useRef, useState } from 'react';

import style from './Fireworks.module.css';

interface Vec2 {
  x: number;
  y: number;
}

interface Particle {
  currPos: Vec2;
  prevPos: Vec2;
  hue: number;
}

const {
  devicePixelRatio: dpr,
  requestAnimationFrame: raf,
  cancelAnimationFrame: caf,
} = window;

const { cos, PI: π, random, sin } = Math;
const ππ = π * 2;

let particles: Particle[] = [];

const maxSpeed = 15;
const gravity: Vec2 = { x: 0, y: 0.2 };

const p: (x: number, y: number) => Particle = (x, y) => {
  const theta = random() * ππ;
  const radius = random() * maxSpeed;

  return {
    currPos: { x, y },
    prevPos: {
      x: x + cos(theta) * radius,
      y: y + sin(theta) * radius,
    },
    hue: random() * ππ * (180 / π),
  };
};

const add: (a: Vec2, b: Vec2) => Vec2 = (a, b) => ({
  x: a.x + b.x,
  y: a.y + b.y,
});

const sub: (a: Vec2, b: Vec2) => Vec2 = (a, b) => ({
  x: a.x - b.x,
  y: a.y - b.y,
});

const update: (particle: Particle) => void = (p) => {
  const currVel = add(sub(p.currPos, p.prevPos), gravity);
  const nextPos = add(p.currPos, currVel);

  p.prevPos = p.currPos;
  p.currPos = nextPos;
};

const render: (
  context: CanvasRenderingContext2D,
  particle: Particle,
) => void = (ctx, { currPos, prevPos, hue }) => {
  ctx.beginPath();
  ctx.fillStyle = `hsl(${hue}, 80%, 50%)`;
  ctx.ellipse(currPos.x, currPos.y, 5, 5, 0, 0, ππ);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = `hsl(${(hue + 180) % 360}, 80%, 50%)`;
  ctx.ellipse(prevPos.x, prevPos.y, 5, 5, 0, 0, ππ);
  ctx.fill();
};

export const Fireworks: FC = () => {
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!(canvasElRef.current && canvasElRef.current.parentElement)) {
      return;
    }

    const {
      width,
      height,
    } = canvasElRef.current.parentElement.getBoundingClientRect();

    canvasElRef.current.width = width * dpr;
    canvasElRef.current.height = height * dpr;
    canvasElRef.current.style.opacity = '1';

    setContext(canvasElRef.current.getContext('2d'));
  }, []);

  useEffect(() => {
    if (!(canvasElRef.current && context)) {
      return;
    }

    const { width: w, height: h } = canvasElRef.current;
    const hw = w / 2;
    const hh = h / 2;

    let frameId: number;
    let firstTime = 0;
    let normalTime = 0;

    const onFrame: FrameRequestCallback = (time: DOMHighResTimeStamp) => {
      frameId = raf(onFrame);

      firstTime || (firstTime = time);
      normalTime = time - firstTime;

      if (normalTime % 1_000 < 16) {
        const emitX = hw / 2 + random() * hw;
        const emitY = hh / 4 + random() * hh;

        for (let i = 0; i < 100; ++i) {
          particles.push(p(emitX, emitY));
        }
      }

      context.fillStyle = 'black';
      context.fillRect(0, 0, w, h);

      particles.forEach((particle) => {
        update(particle);
        render(context, particle);
      });

      particles = particles.reduce<Particle[]>((acc, p) => {
        const {
          currPos: { x, y },
        } = p;

        if (0 < x && x < w && 0 < y && y < h) {
          acc.push(p);
        }

        return acc;
      }, []);
    };

    frameId = raf(onFrame);
    return () => {
      caf(frameId);
    };
  }, [context]);

  return (
    <canvas className={style.Fireworks} ref={canvasElRef}>
      Fireworks
    </canvas>
  );
};
