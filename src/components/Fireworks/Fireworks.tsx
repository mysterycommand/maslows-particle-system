import React, { FC, useEffect, useRef } from 'react';
import style from './Fireworks.module.css';

const {
  devicePixelRatio: dpr,
  requestAnimationFrame: raf,
  cancelAnimationFrame: caf,
} = window;

export const Fireworks: FC = () => {
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null | undefined>();

  useEffect(() => {
    if (!(canvasElRef.current && canvasElRef.current.parentElement)) {
      return;
    }

    contextRef.current = canvasElRef.current.getContext('2d');

    const {
      width,
      height,
    } = canvasElRef.current.parentElement.getBoundingClientRect();

    canvasElRef.current.width = width * dpr;
    canvasElRef.current.height = height * dpr;
    canvasElRef.current.style.opacity = '1';

    let frameId: number;
    const onFrame: FrameRequestCallback = (/* time: DOMHighResTimeStamp */) => {
      frameId = raf(onFrame);
    };

    frameId = raf(onFrame);
    return () => {
      caf(frameId);
    };
  }, []);

  return (
    <canvas className={style.Fireworks} ref={canvasElRef}>
      Fireworks
    </canvas>
  );
};
