import React, { Dispatch, FC, useEffect, useRef, useState } from 'react';

import { AppAction } from '../../app';
import { caf, dpr, raf, random } from '../../lib';

import style from './Fireworks.module.css';
import { activate, numToActivate, render, sparks, update } from './particles';

interface Props {
  dispatch: Dispatch<AppAction>;
}

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

      let numActivated = 0;
      const shouldEmit = time % 1_000 < 18 && time < 5_000;
      const emitX = hw / 2 + random() * hw;
      const emitY = hh / 4 + random() * hh;

      sparks.forEach((spark) => {
        if (!spark.active && shouldEmit) {
          if (numActivated < numToActivate) {
            activate(spark, emitX, emitY);
            ++numActivated;
          } else {
            return;
          }
        }

        spark.active =
          0 < spark.currPos.x &&
          spark.currPos.x < width &&
          0 < spark.currPos.y &&
          spark.currPos.y < height;

        if (!spark.active) {
          return;
        }

        update(spark);
        render(context, spark);
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
