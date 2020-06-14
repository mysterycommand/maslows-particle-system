import React, { FC, useEffect, useRef, useState } from 'react';

import style from './Fireworks.module.css';

const {
  devicePixelRatio: dpr,
  requestAnimationFrame: raf,
  cancelAnimationFrame: caf,
} = window;

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
    if (!context) {
      return;
    }

    let frameId: number;
    const onFrame: FrameRequestCallback = (/* time: DOMHighResTimeStamp */) => {
      frameId = raf(onFrame);
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
