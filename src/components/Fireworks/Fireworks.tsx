import React, { Dispatch, FC, useEffect, useRef, useState } from 'react';

import { AppAction } from '../../app';
import {
  caf,
  cos,
  dpr,
  Particle,
  raf,
  random,
  sin,
  Vec2,
  π,
  ππ,
  add,
  sub,
} from '../../lib';

import style from './Fireworks.module.css';

interface Props {
  dispatch: Dispatch<AppAction>;
}

interface Spark extends Particle {
  hue: number;
}

let sparks: Spark[] = [];

const maxSpeed = 15;
const gravity: Vec2 = { x: 0, y: 0.2 };

const create: (x: number, y: number) => Spark = (x, y) => {
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

const update: (spark: Spark) => void = (p) => {
  const currVel = add(sub(p.currPos, p.prevPos), gravity);
  const nextPos = add(p.currPos, currVel);

  p.prevPos = p.currPos;
  p.currPos = nextPos;
};

const render: (context: CanvasRenderingContext2D, spark: Spark) => void = (
  ctx,
  { currPos, prevPos, hue },
) => {
  ctx.beginPath();
  ctx.fillStyle = `hsl(${hue}, 80%, 50%)`;
  ctx.ellipse(currPos.x, currPos.y, 5, 5, 0, 0, ππ);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = `hsl(${(hue + 180) % 360}, 80%, 50%)`;
  ctx.ellipse(prevPos.x, prevPos.y, 5, 5, 0, 0, ππ);
  ctx.fill();
};

export const Fireworks: FC<Props> = ({ dispatch }) => {
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

      if (normalTime % 1_000 < 16 && normalTime < 5_000) {
        const emitX = hw / 2 + random() * hw;
        const emitY = hh / 4 + random() * hh;

        for (let i = 0; i < 100; ++i) {
          sparks.push(create(emitX, emitY));
        }
      }

      context.fillStyle = 'black';
      context.fillRect(0, 0, w, h);

      sparks.forEach((particle) => {
        update(particle);
        render(context, particle);
      });

      sparks = sparks.reduce<Particle[]>((acc, p) => {
        const {
          currPos: { x, y },
        } = p;

        if (0 < x && x < w && 0 < y && y < h) {
          acc.push(p);
        }

        return acc;
      }, []);

      if (normalTime > 5_000 && sparks.length === 0 && canvasElRef.current) {
        canvasElRef.current.style.opacity = '0';
        caf(frameId);

        setTimeout(() => {
          dispatch({
            type: 'setIsShowingFireworks',
            payload: {
              isShowingFireworks: false,
            },
          });
        }, 400);
      }
    };

    frameId = raf(onFrame);
    return () => {
      caf(frameId);
    };
  }, [context, dispatch]);

  return <canvas className={style.Fireworks} ref={canvasElRef}></canvas>;
};
