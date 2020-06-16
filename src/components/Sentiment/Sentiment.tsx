import React, { Dispatch, FC, useEffect, useRef, useState } from 'react';

import { AppAction } from '../../app';
import { caf, raf, random } from '../../lib';

import { activate, Heart, hearts, numToActivate, update } from './particles';
import style from './Sentiment.module.css';

interface Props {
  dispatch: Dispatch<AppAction>;
}

export const Sentiment: FC<Props> = ({ dispatch }) => {
  const sentimentElRef = useRef<HTMLDivElement>(null);
  const [visibleHearts, setVisibleHearts] = useState<Heart[]>([]);

  useEffect(() => {
    if (!sentimentElRef.current) {
      return;
    }

    sentimentElRef.current.style.opacity = '1';
    const { clientWidth: width, clientHeight: height } = sentimentElRef.current;

    let frameId: number;
    let firstTime = 0;
    let time = 0;

    const onFrame: FrameRequestCallback = (timeStamp: DOMHighResTimeStamp) => {
      frameId = raf(onFrame);

      firstTime || (firstTime = timeStamp);
      time = timeStamp - firstTime;

      let numActivated = 0;
      const shouldEmit = time % 80 < 16 && time < 5_000;
      const emitX = random() * width;
      const emitY = height;

      hearts.forEach((heart) => {
        if (!heart.active && shouldEmit) {
          if (numActivated < numToActivate) {
            activate(heart, emitX, emitY);
            ++numActivated;
          } else {
            return;
          }
        }

        heart.active =
          0 < heart.currPos.x &&
          heart.currPos.x < width &&
          -40 < heart.currPos.y &&
          heart.currPos.y < height + 40;

        if (!heart.active) {
          return;
        }

        update(heart, { width, height, time });
      });

      setVisibleHearts(hearts.filter(({ active }) => active));

      if (
        time > 5_000 &&
        hearts.every(({ active }) => !active) &&
        sentimentElRef.current
      ) {
        sentimentElRef.current.style.opacity = '0';
        caf(frameId);

        setTimeout(
          () =>
            dispatch({
              type: 'setIsShowingSentiment',
              payload: {
                isShowingSentiment: false,
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
  }, [dispatch]);

  return (
    <div className={style.Sentiment} ref={sentimentElRef}>
      {visibleHearts.map(({ id, currPos: { x, y }, opacity, scale }) => (
        <span
          role="img"
          aria-label="love"
          className={style.Heart}
          key={id}
          style={{
            opacity,
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
};
