import React, { Dispatch, FC, useEffect, useRef, useState } from 'react';

import { AppAction } from '../../app';
import {
  add,
  caf,
  cos,
  dpr,
  Particle,
  raf,
  random,
  sin,
  sub,
  Vec2,
  π,
  ππ,
  pool,
} from '../../lib';

import style from './Fireworks.module.css';

interface Props {
  dispatch: Dispatch<AppAction>;
}

interface Spark extends Particle {
  hue: number;
}

const maxInitialSpeed = 15;
const gravity: Vec2 = { x: 0, y: 0.2 };

const sparks = pool<Spark>(2_000, {
  hue: 0,
});

const activateSpark: (spark: Spark, x: number, y: number) => void = (
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

const updateSpark: (spark: Spark) => void = (spark) => {
  const currVel = add(sub(spark.currPos, spark.prevPos), gravity);
  const nextPos = add(spark.currPos, currVel);

  spark.prevPos = spark.currPos;
  spark.currPos = nextPos;
};

const renderSpark: (context: CanvasRenderingContext2D, spark: Spark) => void = (
  ctx,
  { currPos, prevPos, hue },
) => {
  ctx.fillStyle = 'white';
  ctx.fillRect(prevPos.x - 4, prevPos.y - 4, 8, 8);

  ctx.fillStyle = `hsl(${hue}, 80%, 50%)`;
  ctx.fillRect(currPos.x - 4, currPos.y - 4, 8, 8);
};

export const Fireworks: FC<Props> = ({ dispatch }) => {
  const fireworksElRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!(fireworksElRef.current && fireworksElRef.current.parentElement)) {
      return;
    }

    const {
      width,
      height,
    } = fireworksElRef.current.parentElement.getBoundingClientRect();

    fireworksElRef.current.width = width * dpr;
    fireworksElRef.current.height = height * dpr;
    fireworksElRef.current.style.opacity = '1';

    setContext(fireworksElRef.current.getContext('2d'));
  }, []);

  useEffect(() => {
    if (!(fireworksElRef.current && context)) {
      return;
    }

    const { width, height } = fireworksElRef.current;
    const hw = width / 2;
    const hh = height / 2;

    let frameId: number;
    let firstTime = 0;
    let time = 0;

    const onFrame: FrameRequestCallback = (timeStamp: DOMHighResTimeStamp) => {
      frameId = raf(onFrame);

      firstTime || (firstTime = timeStamp);
      time = timeStamp - firstTime;

      context.fillStyle = 'black';
      context.fillRect(0, 0, width, height);

      let i = 0;
      const shouldEmit = time % 1_000 < 18 && time < 5_000;
      const emitX = hw / 2 + random() * hw;
      const emitY = hh / 4 + random() * hh;

      sparks.forEach((spark) => {
        if (!spark.active && shouldEmit) {
          if (i < 200) {
            activateSpark(spark, emitX, emitY);
            ++i;
          } else {
            return;
          }
        }

        updateSpark(spark);
        renderSpark(context, spark);

        spark.active =
          0 < spark.currPos.x &&
          spark.currPos.x < width &&
          0 < spark.currPos.y &&
          spark.currPos.y < height;
      });

      if (
        time > 5_000 &&
        sparks.every(({ active }) => !active) &&
        fireworksElRef.current
      ) {
        fireworksElRef.current.style.opacity = '0';
        caf(frameId);

        setTimeout(
          () =>
            dispatch({
              type: 'setIsShowingFireworks',
              payload: {
                isShowingFireworks: false,
              },
            }),
          400,
        );
      }
    };

    frameId = raf(onFrame);
    return () => {
      caf(frameId);
    };
  }, [context, dispatch]);

  return <canvas className={style.Fireworks} ref={fireworksElRef}></canvas>;
};
